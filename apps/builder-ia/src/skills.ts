/**
 * AI Skills - knowledge modules injected into the prompt based on context
 */

import type { Source } from './state.js';

/** A single skill definition */
export interface Skill {
  id: string;
  name: string;
  description: string;
  trigger: string[];
  content: string;
}

/** All available skills, keyed by ID */
export const SKILLS: Record<string, Skill> = {
  odsql: {
    id: 'odsql',
    name: 'ODSQL (OpenDataSoft Query Language)',
    description: 'Syntaxe de requetes pour les APIs OpenDataSoft',
    trigger: ['api', 'requete', 'query', 'filtre', 'agregation', 'opendatasoft'],
    content: `## ODSQL - OpenDataSoft Query Language

### Parametres de requete
- **select**: Champs a retourner. Ex: \`select=nom,population\` ou avec alias \`select=avg(prix) as prix_moyen\`
- **where**: Filtres. Ex: \`where=population>10000\` ou \`where=nom like "Paris%"\`
- **group_by**: Groupement. Ex: \`group_by=region\`
- **order_by**: Tri. Ex: \`order_by=population DESC\` ou \`order_by=nom ASC\`
- **limit**: Nombre max de resultats. Ex: \`limit=100\` (defaut: 10, max: 100)
- **offset**: Pagination. Ex: \`offset=20\`

### Fonctions d'agregation
- count(*), count(champ)
- sum(champ), avg(champ), min(champ), max(champ)
- percentile(champ, 50) pour la mediane

### Operateurs WHERE
- Comparaison: =, !=, <, >, <=, >=
- Texte: like, not like (% = wildcard)
- Liste: in, not in. Ex: \`region in ("IDF","PACA")\`
- Null: is null, is not null
- Logique: and, or, not

### Fonctions sur les dates
- year(date), month(date), day(date)
- date_format(date, "YYYY-MM")

### Exemple complet
\`?select=region,avg(prix) as prix_moyen&where=annee>=2020&group_by=region&order_by=prix_moyen DESC&limit=10\``,
  },

  odsApiVersions: {
    id: 'odsApiVersions',
    name: 'Versions API OpenDataSoft',
    description: 'Differences entre v1, v2 et v2.1',
    trigger: ['version', 'v1', 'v2', 'v2.1', 'api', 'migration'],
    content: `## Versions des APIs OpenDataSoft

### API v2.1 (recommandee)
- URL: \`/api/explore/v2.1/catalog/datasets/{dataset_id}/records\`
- Reponse: \`{ results: [...], total_count: N }\`
- ODSQL complet supporte
- Pagination: limit + offset

### API v2.0
- URL: \`/api/v2/catalog/datasets/{dataset_id}/records\`
- Similaire a v2.1, quelques fonctions ODSQL manquantes
- Deprecie, preferer v2.1

### API v1 (legacy)
- URL: \`/api/records/1.0/search/?dataset={dataset_id}\`
- Reponse: \`{ records: [{ fields: {...}, recordid: "..." }] }\`
- Parametres differents: q (recherche), refine, exclude, rows, start
- Les donnees sont dans record.fields

### Detection automatique
- Si l'URL contient \`/v2.1/\` -> v2.1
- Si l'URL contient \`/v2/\` -> v2
- Si l'URL contient \`/1.0/\` ou \`rows=\` -> v1
- Par defaut essayer v2.1

### Migration v1 -> v2.1
| v1 | v2.1 |
|---|---|
| rows=N | limit=N |
| start=N | offset=N |
| q=texte | where=search(champ,"texte") |
| refine.champ=val | where=champ="val" |
| record.fields.X | record.X |`,
  },

  chartTypes: {
    id: 'chartTypes',
    name: 'Types de graphiques',
    description: 'Quand utiliser quel type de graphique',
    trigger: ['graphique', 'chart', 'visualisation', 'barres', 'camembert', 'ligne', 'kpi', 'indicateur', 'chiffre', 'jauge', 'nuage', 'scatter', 'carte', 'map', 'departement'],
    content: `## Choix du type de graphique

### KPI (kpi)
- Afficher une valeur unique importante (indicateur cle, total)
- **Champs requis** : valueField uniquement (PAS de labelField)
- **Options** : variant (info|success|warning|error), unit (EUR, %, etc.)
- Ex: nombre total d'utilisateurs, CA annuel

### Jauge (gauge)
- Progression vers un objectif (0-100%)
- **Champs requis** : valueField uniquement (PAS de labelField)
- Ex: score de conformite, avancement projet

### Barres verticales (bar)
- Comparer des categories (5-15 ideal)
- **Champs requis** : labelField (categories), valueField
- **Supporte** : valueField2 pour 2 series, limit, sortOrder
- Ex: ventes par region, scores par equipe

### Barres horizontales (horizontalBar)
- Categories avec noms longs, classements
- **Champs requis** : labelField, valueField
- **Supporte** : valueField2 pour 2 series, limit, sortOrder
- Ex: top 10 des villes

### Lignes (line)
- Evolution temporelle, tendances
- **Champs requis** : labelField (dates/temps), valueField
- **Supporte** : valueField2 pour comparaisons, limit, sortOrder
- Ex: CA par mois, temperature par annee

### Nuage de points (scatter)
- Correlation entre deux variables numeriques
- **Champs requis** : labelField (axe X numerique), valueField (axe Y numerique)
- **PAS de** : valueField2, sortOrder
- Ex: prix vs surface, age vs revenu

### Camembert (pie)
- Parts d'un tout (100%), max 5-7 segments
- **Champs requis** : labelField (segments), valueField
- **PAS de** : valueField2
- **limit recommande** : 7 max
- Ex: repartition budget

### Anneau (doughnut)
- Comme pie, plus lisible
- **Champs requis** : labelField, valueField
- **PAS de** : valueField2
- Ex: repartition par categorie

### Radar
- Profils multicriteres
- **Champs requis** : labelField (criteres), valueField (scores)
- **Supporte** : valueField2 pour comparer 2 profils
- **PAS de** : sortOrder
- Ex: evaluation competences

### Carte de France (map)
- Donnees par departement
- **Champs requis** : codeField (code INSEE: 01-95, 2A, 2B, 971-976), valueField
- **labelField optionnel** : nom du departement pour affichage
- **PAS de** : valueField2, limit, sortOrder
- Ex: prix immobilier par departement

## Series multiples (bar, horizontalBar, line, radar uniquement)
Pour comparer 2 metriques, utilise valueField2:
- valueField: premiere serie (couleur principale)
- valueField2: seconde serie (couleur secondaire)`,
  },

  dsfrColors: {
    id: 'dsfrColors',
    name: 'Couleurs DSFR',
    description: "Palette officielle du Design System de l'Etat",
    trigger: ['couleur', 'color', 'dsfr', 'palette', 'style'],
    content: `## Palette DSFR (Design System de l'Etat)

### Couleurs principales
- **Bleu France**: #000091 (couleur par defaut)
- **Bleu France clair**: #6A6AF4
- **Emeraude**: #009081 (succes, positif)
- **Marianne**: #C9191E (erreur, alerte)

### Couleurs secondaires
- **Orange**: #FF9940 (avertissement)
- **Violet**: #A558A0
- **Bleu ciel**: #417DC4
- **Marron**: #716043
- **Vert foret**: #18753C
- **Gris**: #3A3A3A

### Bonnes pratiques
- Utiliser #000091 par defaut pour graphiques mono-couleur
- Pour pie/doughnut, utiliser la palette complete
- Assurer un contraste suffisant (accessibilite RGAA)
- Eviter le rouge/vert seuls (daltonisme)`,
  },

  apiQuery: {
    id: 'apiQuery',
    name: 'Requetes API avancees',
    description: "Filtrer et agreger les donnees via l'API",
    trigger: ['filtre', 'filtrer', 'seulement', 'uniquement', 'plus de', 'moins de', 'entre', 'top', 'recherche'],
    content: `## Requetes API avancees

Tu peux suggerer de recharger les donnees avec des filtres en generant:
\`\`\`json
{
  "action": "reloadData",
  "query": {
    "where": "condition ODSQL",
    "select": "champs a selectionner",
    "group_by": "champ de groupement",
    "order_by": "champ ASC|DESC",
    "limit": 100
  },
  "reason": "Explication pour l'utilisateur"
}
\`\`\`

### Exemples de filtres
- Top 10 : \`{ "order_by": "valeur DESC", "limit": 10 }\`
- Filtrer par valeur : \`{ "where": "prix > 50" }\`
- Filtrer par texte : \`{ "where": "region like 'Ile%'" }\`
- Agreger : \`{ "select": "region, avg(prix) as prix_moyen", "group_by": "region" }\`

Note: Cette action recharge les donnees depuis l'API avec les nouveaux parametres.`,
  },
};

/**
 * Get skills relevant to the current user message and source context
 */
export function getRelevantSkills(message: string, currentSource: Source | null): Skill[] {
  const relevant: Skill[] = [];
  const lowerMsg = message.toLowerCase();

  for (const [, skill] of Object.entries(SKILLS)) {
    const triggered = skill.trigger.some(t => lowerMsg.includes(t.toLowerCase()));
    if (triggered) {
      relevant.push(skill);
    }
  }

  // Always include ODSQL if we have an API source
  if (currentSource?.type === 'api' && !relevant.find(s => s.id === 'odsql')) {
    relevant.push(SKILLS.odsql);
    relevant.push(SKILLS.odsApiVersions);
  }

  return relevant;
}

/**
 * Build the skills context string to inject into the AI prompt
 */
export function buildSkillsContext(relevantSkills: Skill[]): string {
  if (relevantSkills.length === 0) return '';

  return '\n\n---\nCONNAISSANCES DISPONIBLES:\n' +
    relevantSkills.map(s => s.content).join('\n\n');
}
