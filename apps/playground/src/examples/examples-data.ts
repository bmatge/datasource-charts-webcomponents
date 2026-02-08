/**
 * Playground examples data
 *
 * Each entry is a template literal string containing HTML + JS code
 * that can be loaded into the playground editor.
 */
export const examples: Record<string, string> = {

  // ---------------------------------------------------------
  // EXEMPLE 1 : Graphique en barres
  // Prix moyen du contrôle technique par région
  // ---------------------------------------------------------
  'bar-chart': `<!--
  EXEMPLE : Graphique en barres DSFR

  Ce code récupère les prix moyens du contrôle technique
  par région depuis l'API OpenDataSoft et les affiche
  dans un graphique en barres conforme DSFR.

  L'API utilisée : data.economie.gouv.fr
  Dataset : prix-controle-technique
-->

<div class="fr-container fr-my-4w">
  <h2>Prix moyen du contrôle technique par région</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Prix du contrôle technique
  </p>

  <!-- Conteneur du graphique -->
  <div id="chart-container" style="height: 400px; position: relative;">
    <p id="loading">Chargement des données...</p>
  </div>

  <!-- Tableau alternatif pour l'accessibilité (RGAA) -->
  <details class="fr-accordion fr-mt-2w">
    <summary class="fr-accordion__btn">
      Voir les données en tableau (accessibilité)
    </summary>
    <div class="fr-accordion__content">
      <table class="fr-table" id="data-table">
        <thead>
          <tr>
            <th>Région</th>
            <th>Prix moyen (€)</th>
          </tr>
        </thead>
        <tbody id="table-body"></tbody>
      </table>
    </div>
  </details>
</div>

<script>
// ============================================================
// ÉTAPE 1 : Configuration de l'API
// ============================================================

// URL de base de l'API OpenDataSoft
const API_BASE = 'https://data.economie.gouv.fr/api/explore/v2.1';

// Identifiant du dataset
const DATASET = 'prix-controle-technique';

// On construit une requête avec agrégation :
// - group_by : on groupe par région
// - avg(prix_visite) : on calcule la moyenne des prix
// - limit : on limite à 20 résultats
const API_URL = \`\${API_BASE}/catalog/datasets/\${DATASET}/records?\` + new URLSearchParams({
  select: 'nom_region, avg(prix_visite) as prix_moyen',
  group_by: 'nom_region',
  order_by: 'prix_moyen desc',
  limit: '20'
});

// ============================================================
// ÉTAPE 2 : Récupération des données
// ============================================================

async function fetchData() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(\`Erreur HTTP: \${response.status}\`);
    }

    const json = await response.json();

    // La réponse contient un tableau "results"
    // Chaque élément a : nom_region et prix_moyen
    return json.results;

  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    document.getElementById('loading').textContent =
      'Erreur de chargement. Vérifiez la console.';
    return [];
  }
}

// ============================================================
// ÉTAPE 3 : Création du graphique avec Chart.js
// (dsfr-chart utilise Chart.js en interne)
// ============================================================

async function createChart() {
  const data = await fetchData();

  if (data.length === 0) return;

  // Masquer le message de chargement
  document.getElementById('loading').style.display = 'none';

  // Préparer les données pour Chart.js
  // labels : noms des régions
  // values : prix moyens arrondis à 2 décimales
  const labels = data.map(d => d.nom_region || 'Non renseigné');
  const values = data.map(d => Math.round(d.prix_moyen * 100) / 100);

  // Créer le canvas pour Chart.js
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label',
    'Graphique en barres montrant le prix moyen du contrôle technique par région');
  document.getElementById('chart-container').appendChild(canvas);

  // Configuration du graphique
  // On utilise les couleurs DSFR
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Prix moyen (€)',
        data: values,
        // Couleur DSFR : bleu france
        backgroundColor: '#000091',
        borderColor: '#000091',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (ctx) => \`\${ctx.parsed.y.toFixed(2)} €\`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Prix moyen (€)'
          }
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });

  // Remplir le tableau pour l'accessibilité
  const tbody = document.getElementById('table-body');
  data.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = \`
      <td>\${d.nom_region || 'Non renseigné'}</td>
      <td>\${d.prix_moyen?.toFixed(2) || '—'} €</td>
    \`;
    tbody.appendChild(tr);
  });
}

// Lancer la création du graphique
createChart();
<\/script>`,

  // ---------------------------------------------------------
  // EXEMPLE 2 : Graphique circulaire (camembert)
  // Répartition des centres par type d'énergie
  // ---------------------------------------------------------
  'pie-chart': `<!--
  EXEMPLE : Graphique circulaire DSFR

  Répartition des contrôles techniques par type d'énergie
  (Essence, Diesel, Électrique, etc.)
-->

<div class="fr-container fr-my-4w">
  <h2>Répartition par type d'énergie</h2>
  <p class="fr-text--sm fr-text--light">
    Nombre de tarifs enregistrés par catégorie d'énergie
  </p>

  <div style="max-width: 500px; margin: 0 auto;">
    <div id="chart-container" style="height: 400px; position: relative;">
      <p id="loading">Chargement des données...</p>
    </div>
  </div>

  <!-- Légende accessible -->
  <div id="legend-container" class="fr-mt-2w"></div>
</div>

<script>
// Configuration de l'API avec agrégation par type d'énergie
const API_URL = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-controle-technique/records?' +
  new URLSearchParams({
    select: 'cat_energie_libelle, count(*) as total',
    group_by: 'cat_energie_libelle',
    order_by: 'total desc',
    limit: '10'
  });

// Palette de couleurs DSFR (couleurs illustratives)
// Source : https://www.systeme-de-design.gouv.fr/fondamentaux/couleurs-palette
const DSFR_COLORS = [
  '#000091', // Bleu France
  '#6A6AF4', // Bleu cumulus
  '#009081', // Vert émeraude
  '#C9191E', // Rouge marianne
  '#FF9940', // Orange terre battue
  '#A558A0', // Violet glycine
  '#417DC4', // Bleu écume
  '#716043', // Brun caramel
  '#3A3A3A', // Gris
  '#18753C', // Vert bourgeon
];

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Erreur:', error);
    document.getElementById('loading').textContent = 'Erreur de chargement';
    return [];
  }
}

async function createChart() {
  const data = await fetchData();
  if (data.length === 0) return;

  document.getElementById('loading').style.display = 'none';

  const labels = data.map(d => d.cat_energie_libelle || 'Non renseigné');
  const values = data.map(d => d.total);

  const canvas = document.createElement('canvas');
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Graphique circulaire de répartition par énergie');
  document.getElementById('chart-container').appendChild(canvas);

  new Chart(canvas, {
    type: 'doughnut', // ou 'pie' pour un camembert plein
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: DSFR_COLORS.slice(0, data.length),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        }
      }
    }
  });

  // Créer une légende accessible sous forme de liste
  const legendHtml = data.map((d, i) => \`
    <span class="fr-badge" style="background-color: \${DSFR_COLORS[i]}; color: white; margin: 0.25rem;">
      \${d.cat_energie_libelle}: \${d.total.toLocaleString('fr-FR')}
    </span>
  \`).join('');

  document.getElementById('legend-container').innerHTML = legendHtml;
}

createChart();
<\/script>`,

  // ---------------------------------------------------------
  // EXEMPLE 3 : Graphique en ligne
  // Evolution du prix moyen par departement (top 10)
  // ---------------------------------------------------------
  'line-chart': `<!--
  EXEMPLE : Graphique en ligne DSFR

  Ce code recupere le prix moyen du controle technique
  par departement et l'affiche en graphique en ligne.

  L'API utilisee : data.economie.gouv.fr
  Dataset : prix-controle-technique
-->

<div class="fr-container fr-my-4w">
  <h2>Prix moyen du controle technique par departement</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Top 15 departements
  </p>

  <div id="chart-container" style="height: 400px; position: relative;">
    <p id="loading">Chargement des donnees...</p>
  </div>

  <!-- Tableau alternatif pour l'accessibilite (RGAA) -->
  <details class="fr-accordion fr-mt-2w">
    <summary class="fr-accordion__btn">
      Voir les donnees en tableau (accessibilite)
    </summary>
    <div class="fr-accordion__content">
      <table class="fr-table" id="data-table">
        <thead>
          <tr>
            <th>Departement</th>
            <th>Prix moyen</th>
          </tr>
        </thead>
        <tbody id="table-body"></tbody>
      </table>
    </div>
  </details>
</div>

<script>
// URL de base de l'API OpenDataSoft
const API_BASE = 'https://data.economie.gouv.fr/api/explore/v2.1';
const DATASET = 'prix-controle-technique';

// Requete : prix moyen par departement, top 15
const API_URL = \`\${API_BASE}/catalog/datasets/\${DATASET}/records?\` + new URLSearchParams({
  select: 'nom_departement, avg(prix_visite) as prix_moyen',
  group_by: 'nom_departement',
  order_by: 'prix_moyen desc',
  limit: '15'
});

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(\`Erreur HTTP: \${response.status}\`);
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    document.getElementById('loading').textContent =
      'Erreur de chargement. Verifiez la console.';
    return [];
  }
}

async function createChart() {
  const data = await fetchData();
  if (data.length === 0) return;

  document.getElementById('loading').style.display = 'none';

  const labels = data.map(d => d.nom_departement || 'Non renseigne');
  const values = data.map(d => Math.round(d.prix_moyen * 100) / 100);

  const canvas = document.createElement('canvas');
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label',
    'Graphique en ligne montrant le prix moyen du controle technique par departement');
  document.getElementById('chart-container').appendChild(canvas);

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Prix moyen',
        data: values,
        // Couleur DSFR : bleu france
        borderColor: '#000091',
        backgroundColor: 'rgba(0, 0, 145, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#000091',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => \`\${ctx.parsed.y.toFixed(2)} \u20ac\`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: 'Prix moyen (\u20ac)' }
        },
        x: {
          ticks: { maxRotation: 45, minRotation: 45 }
        }
      }
    }
  });

  // Remplir le tableau pour l'accessibilite
  const tbody = document.getElementById('table-body');
  data.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = \`
      <td>\${d.nom_departement || 'Non renseigne'}</td>
      <td>\${d.prix_moyen?.toFixed(2) || '\u2014'} \u20ac</td>
    \`;
    tbody.appendChild(tr);
  });
}

createChart();
<\/script>`,

  // ---------------------------------------------------------
  // EXEMPLE 4 : Dashboard avec KPIs
  // Statistiques générales
  // ---------------------------------------------------------
  'kpi-dashboard': `<!--
  EXEMPLE : Dashboard avec KPIs

  Affiche des indicateurs clés calculés depuis l'API
  sans utiliser de graphique, juste des chiffres clés.
-->

<div class="fr-container fr-my-4w">
  <h2>Statistiques du contrôle technique en France</h2>

  <!-- Grille de KPIs style DSFR -->
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-4w">

    <div class="fr-col-6 fr-col-md-3">
      <div id="kpi-total" class="kpi-card">
        <span class="kpi-value">—</span>
        <span class="kpi-label">Centres référencés</span>
      </div>
    </div>

    <div class="fr-col-6 fr-col-md-3">
      <div id="kpi-prix-moyen" class="kpi-card kpi-card--info">
        <span class="kpi-value">—</span>
        <span class="kpi-label">Prix moyen</span>
      </div>
    </div>

    <div class="fr-col-6 fr-col-md-3">
      <div id="kpi-prix-min" class="kpi-card kpi-card--success">
        <span class="kpi-value">—</span>
        <span class="kpi-label">Prix minimum</span>
      </div>
    </div>

    <div class="fr-col-6 fr-col-md-3">
      <div id="kpi-prix-max" class="kpi-card kpi-card--error">
        <span class="kpi-value">—</span>
        <span class="kpi-label">Prix maximum</span>
      </div>
    </div>

  </div>

  <!-- Deuxième ligne : stats par département -->
  <h3>Top 5 des départements les moins chers</h3>
  <div id="top-departements" class="fr-mb-4w">
    <p>Chargement...</p>
  </div>
</div>

<style>
  .kpi-card {
    background: var(--background-default-grey);
    border-left: 4px solid var(--border-default-grey);
    padding: 1.5rem;
    text-align: center;
  }
  .kpi-card--info { border-left-color: #0063CB; }
  .kpi-card--success { border-left-color: #18753C; }
  .kpi-card--error { border-left-color: #C9191E; }

  .kpi-value {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-title-grey);
  }
  .kpi-label {
    font-size: 0.875rem;
    color: var(--text-mention-grey);
  }
</style>

<script>
const API_BASE = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-controle-technique/records?';

// Fonction utilitaire pour les appels API
async function fetchAPI(params) {
  const url = API_BASE + new URLSearchParams(params);
  const response = await fetch(url);
  return response.json();
}

// Fonction pour formater les nombres en français
function formatNumber(n) {
  return new Intl.NumberFormat('fr-FR').format(n);
}

function formatPrice(n) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(n);
}

async function loadDashboard() {
  try {
    // ========================================
    // KPI 1 : Nombre total (depuis metadata)
    // ========================================
    const countData = await fetchAPI({
      select: 'count(*) as total',
      limit: '1'
    });
    document.querySelector('#kpi-total .kpi-value').textContent =
      formatNumber(countData.results[0]?.total || 0);

    // ========================================
    // KPI 2, 3, 4 : Stats sur les prix
    // ========================================
    const statsData = await fetchAPI({
      select: 'avg(prix_visite) as moyenne, min(prix_visite) as minimum, max(prix_visite) as maximum',
      where: 'prix_visite > 0 and prix_visite < 500',
      limit: '1'
    });

    const stats = statsData.results[0];
    if (stats) {
      document.querySelector('#kpi-prix-moyen .kpi-value').textContent =
        formatPrice(stats.moyenne);
      document.querySelector('#kpi-prix-min .kpi-value').textContent =
        formatPrice(stats.minimum);
      document.querySelector('#kpi-prix-max .kpi-value').textContent =
        formatPrice(stats.maximum);
    }

    // ========================================
    // Top 5 des départements les moins chers
    // ========================================
    const deptData = await fetchAPI({
      select: 'nom_departement, avg(prix_visite) as prix_moyen',
      where: 'prix_visite > 0',
      group_by: 'nom_departement',
      order_by: 'prix_moyen asc',
      limit: '5'
    });

    const topHtml = deptData.results.map((d, i) => \`
      <div class="fr-badge fr-badge--sm" style="margin: 0.25rem;">
        <strong>\${i + 1}.</strong> \${d.nom_departement} — \${formatPrice(d.prix_moyen)}
      </div>
    \`).join('');

    document.getElementById('top-departements').innerHTML = topHtml || 'Aucune donnée';

  } catch (error) {
    console.error('Erreur:', error);
  }
}

loadDashboard();
<\/script>`,

  // ---------------------------------------------------------
  // EXEMPLES DSFR CHART NATIFS
  // Format officiel avec x="[[...]]" et y="[[...]]"
  // ---------------------------------------------------------
  'dsfr-bar': `<!--
  EXEMPLE : DSFR Bar Chart (natif)

  Utilise le composant officiel bar-chart de @gouvfr/dsfr-chart
  Les donnees sont au format JSON stringifie : x="[[...]]" y="[[...]]"
-->

<!-- Dependances DSFR Chart -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Score RGAA par ministere</h2>
  <p class="fr-text--sm fr-text--light">Conformite accessibilite en pourcentage</p>

  <!-- Bar chart vertical -->
  <bar-chart
    x='[["Economie", "Education", "Interieur", "Sante", "Culture"]]'
    y="[[87, 92, 78, 85, 91]]"
    name='["Score RGAA"]'
    selected-palette="categorical"
    unit-tooltip="%">
  </bar-chart>

  <h3 class="fr-mt-4w">Barres horizontales</h3>
  <bar-chart
    x='[["Economie", "Education", "Interieur", "Sante", "Culture"]]'
    y="[[87, 92, 78, 85, 91]]"
    name='["Score RGAA"]'
    selected-palette="sequentialAscending"
    horizontal="true"
    unit-tooltip="%">
  </bar-chart>
</div>`,

  'dsfr-line': `<!--
  EXEMPLE : DSFR Line Chart (natif)

  Graphique en ligne avec evolution temporelle
-->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Evolution du score RGAA</h2>
  <p class="fr-text--sm fr-text--light">Progression sur 4 ans</p>

  <line-chart
    x='[["2021", "2022", "2023", "2024"]]'
    y="[[65, 72, 78, 85]]"
    name='["Score RGAA"]'
    selected-palette="default"
    unit-tooltip="%">
  </line-chart>

  <h3 class="fr-mt-4w">Plusieurs series</h3>
  <line-chart
    x='[["2021", "2022", "2023", "2024"], ["2021", "2022", "2023", "2024"]]'
    y="[[65, 72, 78, 85], [70, 75, 82, 91]]"
    name='["RGAA", "DSFR"]'
    selected-palette="categorical"
    unit-tooltip="%">
  </line-chart>
</div>`,

  'dsfr-pie': `<!--
  EXEMPLE : DSFR Pie Chart (natif)

  Diagramme circulaire / camembert
-->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Repartition par statut</h2>

  <div style="max-width: 400px; margin: 0 auto;">
    <pie-chart
      x='[["Actifs", "Inactifs", "En maintenance"]]'
      y="[[75, 15, 10]]"
      selected-palette="categorical"
      unit-tooltip="%">
    </pie-chart>
  </div>

  <h3 class="fr-mt-4w">Variante donut (fill=false par defaut)</h3>
  <div style="max-width: 400px; margin: 0 auto;">
    <pie-chart
      x='[["Conformes", "Partiels", "Non conformes"]]'
      y="[[60, 30, 10]]"
      selected-palette="sequentialDescending"
      unit-tooltip="%">
    </pie-chart>
  </div>
</div>`,

  'dsfr-gauge': `<!--
  EXEMPLE : DSFR Gauge Chart (natif)

  ATTENTION : Utiliser percent/init/target, PAS value !
-->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Jauges de conformite</h2>
  <p class="fr-text--sm fr-text--light">Progression vers l'objectif 100%</p>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
    <div>
      <p><strong>Score RGAA</strong></p>
      <!-- percent = valeur actuelle, init = minimum, target = maximum -->
      <gauge-chart percent="82" init="0" target="100"></gauge-chart>
    </div>
    <div>
      <p><strong>Score DSFR</strong></p>
      <gauge-chart percent="91" init="0" target="100"></gauge-chart>
    </div>
    <div>
      <p><strong>Performance</strong></p>
      <gauge-chart percent="65" init="0" target="100"></gauge-chart>
    </div>
  </div>

  <div class="fr-callout fr-callout--brown-caramel fr-mt-4w">
    <p class="fr-callout__text">
      <strong>Important :</strong> Ne pas utiliser l'attribut <code>value</code>.
      Utiliser <code>percent</code> + <code>init</code> + <code>target</code>.
    </p>
  </div>
</div>`,

  'dsfr-radar': `<!--
  EXEMPLE : DSFR Radar Chart (natif)

  Graphique radar pour comparaisons multi-criteres
-->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Profil de conformite</h2>
  <p class="fr-text--sm fr-text--light">Evaluation multi-criteres</p>

  <div style="max-width: 500px; margin: 0 auto;">
    <radar-chart
      x='[["RGAA", "DSFR", "Performance", "SEO", "Securite"]]'
      y="[[85, 90, 75, 80, 95]]"
      name='["Site principal"]'
      selected-palette="default">
    </radar-chart>
  </div>

  <h3 class="fr-mt-4w">Comparaison de plusieurs sites</h3>
  <div style="max-width: 500px; margin: 0 auto;">
    <radar-chart
      x='[["RGAA", "DSFR", "Performance", "SEO", "Securite"], ["RGAA", "DSFR", "Performance", "SEO", "Securite"]]'
      y="[[85, 90, 75, 80, 95], [70, 85, 90, 75, 80]]"
      name='["Site A", "Site B"]'
      selected-palette="categorical">
    </radar-chart>
  </div>
</div>`,

  'dsfr-map': `<!--
  EXEMPLE : DSFR Map Chart (natif)

  Carte de France avec donnees par departement
  Utilise le composant map-chart de @gouvfr/dsfr-chart
-->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Taux de conformite RGAA par departement</h2>
  <p class="fr-text--sm fr-text--light">Donnees fictives pour demonstration</p>

  <map-chart
    data='{"01": 85, "02": 72, "03": 91, "04": 65, "05": 78, "06": 88, "07": 70, "08": 83, "09": 67, "10": 75, "11": 82, "12": 89, "13": 94, "14": 71, "15": 68, "16": 77, "17": 86, "18": 73, "19": 80, "21": 92, "22": 69, "23": 64, "24": 76, "25": 81, "26": 87, "27": 74, "28": 79, "29": 90, "30": 84, "31": 93, "32": 66, "33": 95, "34": 88, "35": 82, "36": 71, "37": 85, "38": 91, "39": 69, "40": 77, "41": 73, "42": 86, "43": 68, "44": 92, "45": 80, "46": 65, "47": 74, "48": 62, "49": 83, "50": 70, "51": 78, "52": 67, "53": 75, "54": 84, "55": 66, "56": 81, "57": 87, "58": 72, "59": 96, "60": 79, "61": 71, "62": 85, "63": 88, "64": 76, "65": 69, "66": 82, "67": 93, "68": 90, "69": 97, "70": 68, "71": 77, "72": 74, "73": 86, "74": 91, "75": 98, "76": 83, "77": 80, "78": 89, "79": 73, "80": 76, "81": 70, "82": 67, "83": 84, "84": 78, "85": 81, "86": 75, "87": 72, "88": 69, "89": 79, "90": 66, "91": 87, "92": 94, "93": 85, "94": 88, "95": 82, "2A": 71, "2B": 68}'
    name="Score RGAA"
    date="2024-01-15"
    value-nat="79"
    selected-palette="sequentialAscending">
  </map-chart>

  <div class="fr-callout fr-callout--blue-ecume fr-mt-4w">
    <p class="fr-callout__text">
      <strong>Format des donnees :</strong> L'attribut <code>data</code> attend un objet JSON
      ou les cles sont les codes departement (ex: "75", "2A") et les valeurs les donnees a afficher.
    </p>
  </div>
</div>`,

  // ---------------------------------------------------------
  // EXEMPLES COMPOSANTS gouv-widgets
  // ---------------------------------------------------------
  'gouv-source-chart': `<!--
  EXEMPLE : gouv-source + gouv-dsfr-chart

  Les composants gouv-widgets permettent de connecter
  une source de donnees JSON a des graphiques DSFR.
-->

<!-- Composants gouv-widgets -->
<script type="module" src="https://chartsbuilder.matge.com/dist/gouv-widgets.esm.js"><\/script>

<!-- DSFR Chart (requis par gouv-dsfr-chart) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Graphiques dynamiques avec gouv-source</h2>

  <!-- Source de donnees -->
  <gouv-source
    id="demo-sites"
    url="/mock-api/data.json"
    transform="sites">
  </gouv-source>

  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-6">
      <h3>Barres verticales</h3>
      <gouv-dsfr-chart
        source="demo-sites"
        type="bar"
        label-field="nom"
        value-field="score_rgaa"
        selected-palette="categorical"
        unit-tooltip="%">
      </gouv-dsfr-chart>
    </div>

    <div class="fr-col-12 fr-col-md-6">
      <h3>Camembert</h3>
      <gouv-dsfr-chart
        source="demo-sites"
        type="pie"
        label-field="ministere"
        value-field="score_rgaa"
        selected-palette="categorical"
        unit-tooltip="%">
      </gouv-dsfr-chart>
    </div>
  </div>

  <div class="code-block fr-mt-2w">
    <h4>Code source</h4>
    <pre>&lt;gouv-source
  id="demo-sites"
  url="/mock-api/data.json"
  transform="sites"&gt;
&lt;/gouv-source&gt;

&lt;gouv-dsfr-chart
  source="demo-sites"
  type="bar"
  label-field="nom"
  value-field="score_rgaa"
  selected-palette="categorical"
  unit-tooltip="%"&gt;
&lt;/gouv-dsfr-chart&gt;</pre>
  </div>
</div>

<style>
.code-block { background: #f5f5f5; padding: 1rem; border-radius: 4px; }
.code-block pre { margin: 0; font-size: 0.8rem; white-space: pre-wrap; }
</style>`,

  'gouv-kpi': `<!--
  EXEMPLE : gouv-kpi

  Affichage d'indicateurs cles avec calculs automatiques
-->

<script type="module" src="https://chartsbuilder.matge.com/dist/gouv-widgets.esm.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Indicateurs cles (KPI)</h2>

  <!-- Sources de donnees -->
  <gouv-source id="kpi-sites" url="/mock-api/data.json" transform="sites"></gouv-source>
  <gouv-source id="kpi-meta" url="/mock-api/data.json" transform="metadata"></gouv-source>

  <div class="kpi-grid">
    <!-- Valeur directe depuis metadata -->
    <gouv-kpi
      source="kpi-meta"
      valeur="total"
      label="Sites suivis"
      icone="ri-global-line"
      format="nombre">
    </gouv-kpi>

    <!-- Moyenne avec seuils de couleur -->
    <gouv-kpi
      source="kpi-sites"
      valeur="avg:score_rgaa"
      label="Score RGAA moyen"
      format="pourcentage"
      seuil-vert="80"
      seuil-orange="50">
    </gouv-kpi>

    <!-- Comptage conditionnel -->
    <gouv-kpi
      source="kpi-sites"
      valeur="count:statut:actif"
      label="Sites actifs"
      icone="ri-checkbox-circle-line"
      couleur="vert">
    </gouv-kpi>

    <!-- Min/Max -->
    <gouv-kpi
      source="kpi-sites"
      valeur="max:score_rgaa"
      label="Meilleur score"
      format="pourcentage"
      couleur="vert">
    </gouv-kpi>
  </div>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__title">Expressions de calcul</p>
    <ul>
      <li><code>champ</code> - Valeur directe</li>
      <li><code>avg:champ</code> - Moyenne</li>
      <li><code>sum:champ</code> - Somme</li>
      <li><code>min:champ</code> / <code>max:champ</code> - Min/Max</li>
      <li><code>count:champ:valeur</code> - Comptage conditionnel</li>
    </ul>
  </div>
</div>

<style>
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
</style>`,

  'gouv-datalist': `<!--
  EXEMPLE : gouv-datalist

  Tableau de donnees avec filtres, recherche, tri et export
-->

<script type="module" src="https://chartsbuilder.matge.com/dist/gouv-widgets.esm.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Liste des sites suivis</h2>

  <!-- Source de donnees -->
  <gouv-source
    id="datalist-sites"
    url="/mock-api/data.json"
    transform="sites">
  </gouv-source>

  <!-- Tableau avec toutes les fonctionnalites -->
  <gouv-datalist
    source="datalist-sites"
    colonnes="nom:Nom du site, ministere:Ministere, score_rgaa:RGAA (%), score_dsfr:DSFR (%)"
    recherche="true"
    filtres="ministere,statut"
    tri="score_rgaa:desc"
    pagination="5"
    export="csv">
  </gouv-datalist>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__title">Attributs disponibles</p>
    <ul>
      <li><code>colonnes</code> - Definition : cle:Label, cle2:Label2</li>
      <li><code>recherche</code> - Active la barre de recherche</li>
      <li><code>filtres</code> - Colonnes filtrables : col1,col2</li>
      <li><code>tri</code> - Tri par defaut : colonne:asc ou colonne:desc</li>
      <li><code>pagination</code> - Nombre d'elements par page (0 = desactive)</li>
      <li><code>export</code> - Formats d'export : csv</li>
    </ul>
  </div>
</div>`,

  'gouv-dashboard': `<!--
  EXEMPLE : Dashboard complet gouv-widgets

  Combine KPIs, graphiques et tableau de donnees
-->

<script type="module" src="https://chartsbuilder.matge.com/dist/gouv-widgets.esm.js"><\/script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>Tableau de bord - Conformite des sites</h2>

  <!-- Sources de donnees partagees -->
  <gouv-source id="dash-sites" url="/mock-api/data.json" transform="sites"></gouv-source>
  <gouv-source id="dash-meta" url="/mock-api/data.json" transform="metadata"></gouv-source>

  <!-- KPIs -->
  <div class="kpi-grid fr-mb-4w">
    <gouv-kpi source="dash-meta" valeur="total" label="Sites suivis" icone="ri-global-line" format="nombre"></gouv-kpi>
    <gouv-kpi source="dash-sites" valeur="avg:score_rgaa" label="RGAA moyen" format="pourcentage" seuil-vert="80" seuil-orange="50"></gouv-kpi>
    <gouv-kpi source="dash-sites" valeur="avg:score_dsfr" label="DSFR moyen" format="pourcentage" seuil-vert="80" seuil-orange="50"></gouv-kpi>
    <gouv-kpi source="dash-sites" valeur="count:statut:actif" label="Sites actifs" icone="ri-checkbox-circle-line" couleur="vert"></gouv-kpi>
  </div>

  <!-- Graphiques -->
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-4w">
    <div class="fr-col-12 fr-col-md-6">
      <h3>Scores par site</h3>
      <gouv-dsfr-chart
        source="dash-sites"
        type="bar"
        label-field="nom"
        value-field="score_rgaa"
        selected-palette="categorical"
        unit-tooltip="%">
      </gouv-dsfr-chart>
    </div>
    <div class="fr-col-12 fr-col-md-6">
      <h3>Repartition par ministere</h3>
      <gouv-dsfr-chart
        source="dash-sites"
        type="pie"
        label-field="ministere"
        value-field="score_rgaa"
        selected-palette="categorical"
        unit-tooltip="%">
      </gouv-dsfr-chart>
    </div>
  </div>

  <!-- Tableau -->
  <h3>Detail des sites</h3>
  <gouv-datalist
    source="dash-sites"
    colonnes="nom:Site, ministere:Ministere, score_rgaa:RGAA (%), statut:Statut"
    recherche="true"
    filtres="ministere"
    tri="score_rgaa:desc"
    pagination="5"
    export="csv">
  </gouv-datalist>
</div>

<style>
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
</style>`,
};
