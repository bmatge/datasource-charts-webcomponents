/**
 * Chat functionality - message rendering, AI communication, action handling
 */

import { state } from '../state.js';
import type { Message, ChartConfig } from '../state.js';
import { getIAConfig } from '../ia/ia-config.js';
import type { IAConfig } from '../ia/ia-config.js';
import { SKILLS, getRelevantSkills, buildSkillsContext } from '../skills.js';
import { applyChartConfig } from '../ui/chart-renderer.js';
import { analyzeFields, updateFieldsList, updateRawData } from '../sources.js';
import { fetchWithTimeout, httpErrorMessage } from '@gouv-widgets/shared';

/**
 * Add a message to the chat UI and state
 */
export function addMessage(role: 'user' | 'assistant', content: string, suggestions: string[] = []): HTMLElement {
  const container = document.getElementById('chat-messages') as HTMLElement;

  const messageEl = document.createElement('div');
  messageEl.className = `chat-message ${role}`;

  // Simple markdown-like formatting
  let html = content
    .replace(/```json\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  messageEl.innerHTML = html;

  // Add suggestions if any
  if (suggestions.length > 0 && role === 'assistant') {
    const suggestionsEl = document.createElement('div');
    suggestionsEl.className = 'chat-suggestions';
    suggestions.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'chat-suggestion';
      btn.textContent = s;
      btn.onclick = () => {
        (document.getElementById('chat-input') as HTMLTextAreaElement).value = s;
        sendMessage();
      };
      suggestionsEl.appendChild(btn);
    });
    messageEl.appendChild(suggestionsEl);
  }

  container.appendChild(messageEl);
  container.scrollTop = container.scrollHeight;

  state.messages.push({ role, content } as Message);

  // Persist conversation
  try { sessionStorage.setItem('builder-ia-messages', JSON.stringify(state.messages)); } catch { /* ignore */ }

  return messageEl;
}

/**
 * Show a thinking/loading indicator in chat
 */
export function addThinkingMessage(): HTMLElement {
  const container = document.getElementById('chat-messages') as HTMLElement;
  const messageEl = document.createElement('div');
  messageEl.className = 'chat-message assistant thinking';
  messageEl.id = 'thinking-message';
  messageEl.innerHTML = '<i class="ri-loader-4-line"></i> Reflexion en cours...';
  container.appendChild(messageEl);
  container.scrollTop = container.scrollHeight;
  return messageEl;
}

/**
 * Remove the thinking indicator
 */
export function removeThinkingMessage(): void {
  const el = document.getElementById('thinking-message');
  if (el) el.remove();
}

/**
 * Main send message handler - validates input, calls AI, handles response actions
 */
export async function sendMessage(): Promise<void> {
  const input = document.getElementById('chat-input') as HTMLTextAreaElement;
  const message = input.value.trim();

  if (!message || state.isThinking) return;

  // Add user message
  addMessage('user', message);
  input.value = '';
  input.style.height = 'auto';

  // Check if we have a token
  const config = getIAConfig();
  if (!config.token) {
    addMessage('assistant', `Je n'ai pas de token API configure. Veuillez ouvrir "Configuration Albert IA" et entrer votre token.

En attendant, je peux vous aider avec des commandes simples. Essayez :
- "barres [champ_label] [champ_valeur]"
- "pie [champ_label] [champ_valeur]"
- "ligne [champ_label] [champ_valeur]"`, [
      'Configurer le token',
      'Creer un graphique simple',
    ]);
    return;
  }

  // Show thinking
  state.isThinking = true;
  (document.getElementById('chat-send-btn') as HTMLButtonElement).disabled = true;
  addThinkingMessage();

  try {
    const response = await callAlbertAPI(message, config);
    removeThinkingMessage();

    // Check if response contains an action
    const action = extractAction(response);
    const textWithoutJson = response.replace(/```json[\s\S]*?```/g, '').trim();

    if (action?.action === 'createChart' && action.config) {
      applyChartConfig(action.config as ChartConfig);
      const chartConfig = action.config as ChartConfig;
      const suggestions = chartConfig.type === 'datalist'
        ? ['Modifier les colonnes', 'Ajouter un filtre', 'Changer la pagination']
        : ['Changer le type', 'Modifier les couleurs', 'Ajuster le tri'];
      addMessage('assistant', textWithoutJson || (chartConfig.type === 'datalist' ? 'Voici votre tableau !' : 'Voici votre graphique !'), suggestions);
    } else if (action?.action === 'reloadData') {
      const success = await handleReloadData(action);
      if (success) {
        addMessage('assistant', textWithoutJson || (action.reason as string) || 'Donnees rechargees avec les filtres.', [
          'Barres',
          'Camembert',
          'Courbe',
        ]);
      } else {
        addMessage('assistant', textWithoutJson || 'Impossible de recharger les donnees avec ces filtres.');
      }
    } else {
      addMessage('assistant', response);
    }

  } catch (error: unknown) {
    removeThinkingMessage();
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('API Error:', error);
    addMessage('assistant', `Erreur : ${errMsg}`, ['Reessayer']);
    const retryInput = document.getElementById('chat-input') as HTMLTextAreaElement;
    if (retryInput) retryInput.value = message;
  }

  state.isThinking = false;
  (document.getElementById('chat-send-btn') as HTMLButtonElement).disabled = false;
}

/**
 * Call the Albert API with the user message, conversation history, and skills context
 */
async function callAlbertAPI(userMessage: string, config: IAConfig): Promise<string> {
  // Build context with data info
  let dataContext = '';
  if (state.localData && state.fields.length > 0) {
    dataContext = `\n\nDonnees actuelles (${state.localData.length} enregistrements) :
Champs : ${state.fields.map(f => `${f.name} (${f.type})`).join(', ')}
Exemple d'enregistrement : ${JSON.stringify(state.localData[0])}`;
  }

  // Inject relevant skills based on the user message
  const relevantSkills = getRelevantSkills(userMessage, state.source);
  const skillsContext = buildSkillsContext(relevantSkills);

  // Build available skills list for the system prompt
  const skillsList = Object.values(SKILLS).map(s => `- ${s.name}: ${s.description}`).join('\n');

  const actionReminder = `\n\n---\nRAPPEL IMPORTANT: Pour afficher un graphique ou KPI dans l'apercu, genere TOUJOURS un SEUL bloc \`\`\`json avec {"action": "createChart", "config": {...}}. Utilise config.where pour filtrer (ex: "code_departement:eq:48"). Les composants HTML (gouv-source, gouv-query, etc.) sont UNIQUEMENT pour le code embarquable dans l'onglet Code, PAS pour l'apercu.`;

  const systemPromptWithSkills = config.systemPrompt +
    `\n\nSKILLS DISPONIBLES (seront injectes si pertinents):\n${skillsList}` +
    dataContext +
    skillsContext +
    actionReminder;

  const messages = [
    { role: 'system', content: systemPromptWithSkills },
    ...state.messages.slice(-10).map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    })),
    { role: 'user', content: userMessage },
  ];

  // Use proxy for Albert API to avoid CORS
  let apiUrl = config.apiUrl;
  if (apiUrl.includes('albert.api.etalab.gouv.fr')) {
    apiUrl = apiUrl.replace('https://albert.api.etalab.gouv.fr', '/albert-proxy');
  }

  const response = await fetchWithTimeout(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.token}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  }, 15000);

  if (!response.ok) {
    throw new Error(httpErrorMessage(response.status));
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Parse the AI response text for a JSON code block containing an action field
 */
function extractAction(text: string): Record<string, unknown> | null {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      if (parsed.action) {
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse action:', e);
    }
  }
  return null;
}

/**
 * Handle reloadData action from the AI: rebuild API URL with ODSQL params, fetch new data
 */
async function handleReloadData(actionData: Record<string, unknown>): Promise<boolean> {
  if (!state.source?.url) {
    addMessage('assistant', "Je ne peux pas recharger les donnees car aucune URL source n'est disponible.");
    return false;
  }

  const infoEl = document.getElementById('saved-source-info') as HTMLElement;
  infoEl.innerHTML = '<i class="ri-loader-4-line"></i> Rechargement avec filtres...';

  try {
    // Build query URL
    const url = new URL(state.source.url);
    const query = (actionData.query || {}) as Record<string, unknown>;

    if (query.select) url.searchParams.set('select', String(query.select));
    if (query.where) url.searchParams.set('where', String(query.where));
    if (query.group_by) url.searchParams.set('group_by', String(query.group_by));
    if (query.order_by) url.searchParams.set('order_by', String(query.order_by));
    if (query.limit) url.searchParams.set('limit', String(query.limit));

    const response = await fetchWithTimeout(url.toString());
    const json = await response.json();
    const records: Record<string, unknown>[] = json.results || json.records || [];

    if (records.length === 0) {
      infoEl.innerHTML = '<span style="color: orange;">Aucun resultat avec ces filtres</span>';
      return false;
    }

    state.localData = records.map(r => {
      const fields = r.fields;
      return (fields && typeof fields === 'object' ? fields : r) as Record<string, unknown>;
    });
    analyzeFields();
    updateFieldsList();
    updateRawData();

    infoEl.innerHTML = `<span class="source-badge source-badge-api">API</span> ${state.localData.length} resultats (filtre)`;

    return true;
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    infoEl.innerHTML = `<span style="color: red;">Erreur: ${errMsg}</span>`;
    return false;
  }
}
