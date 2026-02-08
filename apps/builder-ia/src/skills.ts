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

  // ---------------------------------------------------------------------------
  // Composants gouv-widgets
  // ---------------------------------------------------------------------------

  gouvSource: {
    id: 'gouvSource',
    name: 'gouv-source',
    description: 'Composant de connexion aux donnees (API REST)',
    trigger: ['source', 'charger', 'connecter', 'rafraichir', 'url', 'api', 'donnees'],
    content: `## <gouv-source> - Connexion aux donnees

Composant invisible qui recupere des donnees depuis une API REST et les distribue aux autres composants.

### Attributs
| Attribut | Type | Description |
|----------|------|-------------|
| id | String | Identifiant unique (requis). Les autres composants s'y abonnent. |
| url | String | URL de l'API (GET par defaut) |
| method | String | Methode HTTP : GET ou POST |
| headers | String | En-tetes HTTP en JSON : \`{"Authorization": "Bearer xxx"}\` |
| params | String | Parametres query ou body POST en JSON |
| transform | String | Chemin JSONPath pour extraire les donnees : \`"data.items"\` ou \`"results"\` |
| refresh | Number | Rafraichissement auto en secondes (0 = desactive) |

### Evenements emis
- \`gouv-data-loaded\` : donnees chargees
- \`gouv-data-loading\` : chargement en cours
- \`gouv-data-error\` : erreur

### Methodes publiques
- \`reload()\` : force le rechargement
- \`getData()\` : retourne les donnees actuelles

### Exemples
\`\`\`html
<!-- API OpenDataSoft -->
<gouv-source id="prix" url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/mon-dataset/records" transform="results"></gouv-source>

<!-- API avec authentification et refresh -->
<gouv-source id="api-privee" url="https://mon-api.gouv.fr/data" method="POST" headers='{"Authorization": "Bearer TOKEN"}' params='{"limit": 100}' transform="data.items" refresh="60"></gouv-source>

<!-- API Tabular data.gouv.fr -->
<gouv-source id="communes" url="https://tabular-api.data.gouv.fr/api/resources/RESOURCE_ID/data/?page_size=50" transform="data"></gouv-source>
\`\`\``,
  },

  gouvQuery: {
    id: 'gouvQuery',
    name: 'gouv-query',
    description: 'Filtrage, agregation et tri declaratif des donnees',
    trigger: ['filtre', 'filtrer', 'grouper', 'agreger', 'trier', 'transformer', 'query', 'requete', 'top', 'moyenne', 'somme', 'compter', 'seulement', 'uniquement', 'plus de', 'moins de', 'departement', 'region', 'dans le', 'pour le'],
    content: `## <gouv-query> - Transformation de donnees

Composant invisible intermediaire entre <gouv-source> et les visualisations.
Filtre, groupe, agrege et trie les donnees de facon declarative.

### 3 modes (attribut api-type)
- **generic** (defaut) : traitement client-side des donnees d'une gouv-source existante
- **opendatasoft** : requete serveur vers API OpenDataSoft (ODSQL)
- **tabular** : requete serveur vers API Tabular data.gouv.fr

### Attributs
| Attribut | Type | Description |
|----------|------|-------------|
| id | String | Identifiant unique (requis) |
| api-type | String | Mode : generic (defaut), opendatasoft, tabular |
| source | String | ID de la gouv-source (mode generic) |
| base-url | String | URL de base API (opendatasoft/tabular) |
| dataset-id | String | ID du dataset (opendatasoft/tabular) |
| resource | String | ID ressource (tabular uniquement) |
| select | String | Clause SELECT ODSQL (opendatasoft) |
| where | String | Filtres (voir operateurs ci-dessous) |
| filter | String | Alias pour where |
| group-by | String | Champs de groupement (virgule) |
| aggregate | String | Agregations : \`"champ:fonction"\` |
| order-by | String | Tri : \`"champ:direction"\` |
| limit | Number | Limite de resultats (0 = illimite) |
| transform | String | Chemin JSONPath dans la reponse API |
| refresh | Number | Rafraichissement en secondes |

### Operateurs de filtre (mode generic/tabular)
Format : \`"champ:operateur:valeur"\`
- eq, neq, gt, gte, lt, lte
- contains, notcontains (insensible a la casse)
- in, notin (separateur |) : \`"region:in:IDF|OCC|BRE"\`
- isnull, isnotnull

Filtres multiples separes par virgule (logique ET) :
\`where="population:gte:10000, region:in:IDF|OCC"\`

### Fonctions d'agregation
Format : \`"champ:fonction"\` ou \`"champ:fonction:alias"\`
Fonctions : count, sum, avg, min, max
Nommage auto : \`champ__fonction\` (ex: population__sum)

### Exemples
\`\`\`html
<!-- Filtrer et trier -->
<gouv-query id="filtered" source="raw-data" where="population:gt:5000" order-by="nom:asc" limit="10"></gouv-query>

<!-- Grouper et agreger -->
<gouv-query id="stats" source="communes" group-by="region" aggregate="population:sum, population:count" order-by="population__sum:desc" limit="10"></gouv-query>

<!-- Requete OpenDataSoft serveur -->
<gouv-query id="ods" api-type="opendatasoft" dataset-id="mon-dataset" base-url="https://data.opendatasoft.com" select="sum(population) as total, region" where="population > 5000" group-by="region" order-by="total:desc" limit="15"></gouv-query>

<!-- Requete Tabular API -->
<gouv-query id="tab" api-type="tabular" resource="RESOURCE_ID" group-by="departement" aggregate="population:sum" order-by="population__sum:desc"></gouv-query>
\`\`\`

Un gouv-query peut etre la source d'un autre gouv-query (chainabilite).`,
  },

  gouvKpi: {
    id: 'gouvKpi',
    name: 'gouv-kpi',
    description: 'Composant KPI avec agregation, seuils et tendances',
    trigger: ['kpi', 'indicateur', 'chiffre', 'valeur', 'tendance', 'seuil', 'pourcentage', 'euro', 'metrique'],
    content: `## <gouv-kpi> - Indicateur chiffre cle

Affiche une valeur numerique mise en avant avec formatage, couleur conditionnelle, icone et tendance.

### Attributs
| Attribut | Type | Description |
|----------|------|-------------|
| source | String | ID de la gouv-source ou gouv-query |
| valeur | String | Expression : \`"champ"\`, \`"avg:champ"\`, \`"sum:champ"\`, \`"min:champ"\`, \`"max:champ"\`, \`"count:champ:valeur"\` |
| label | String | Libelle sous la valeur |
| description | String | Description pour accessibilite |
| icone | String | Classe Remix Icon : \`ri-global-line\`, \`ri-money-euro-circle-line\`, etc. |
| format | String | nombre (defaut), pourcentage, euro, decimal |
| tendance | String | Expression de tendance (ex: \`"+3.2"\`) |
| couleur | String | Forcer : vert, orange, rouge, bleu |
| seuil-vert | Number | Seuil au-dessus duquel couleur = vert |
| seuil-orange | Number | Seuil au-dessus duquel couleur = orange (en-dessous = rouge) |

### Expressions d'agregation (attribut valeur)
- \`"score_rgaa"\` : valeur directe du champ
- \`"avg:score"\` : moyenne
- \`"sum:montant"\` : somme
- \`"count:status:active"\` : compte les items ou status = "active"
- \`"min:prix"\`, \`"max:prix"\` : extremes

### Exemples
\`\`\`html
<!-- KPI simple -->
<gouv-kpi source="stats" valeur="sum:montant" label="CA total" format="euro" icone="ri-money-euro-circle-line"></gouv-kpi>

<!-- KPI avec seuils de couleur automatiques -->
<gouv-kpi source="audit" valeur="avg:score_rgaa" label="Score RGAA moyen" format="pourcentage" seuil-vert="80" seuil-orange="50"></gouv-kpi>

<!-- KPI avec couleur forcee et tendance -->
<gouv-kpi source="data" valeur="count:status:active" label="Sites actifs" couleur="bleu" tendance="+12"></gouv-kpi>
\`\`\``,
  },

  gouvDsfrChart: {
    id: 'gouvDsfrChart',
    name: 'gouv-dsfr-chart',
    description: 'Wrapper DSFR Chart connecte aux sources de donnees',
    trigger: ['graphique', 'chart', 'visualisation', 'barres', 'camembert', 'ligne', 'radar', 'nuage', 'scatter', 'carte', 'map', 'jauge', 'gauge', 'departement', 'region'],
    content: `## <gouv-dsfr-chart> - Graphiques DSFR

Wrapper connectant les composants DSFR Chart officiels au systeme gouv-source/gouv-query.

### Types supportes
line, bar, pie, radar, scatter, gauge, bar-line, map, map-reg

### Attributs
| Attribut | Type | Description |
|----------|------|-------------|
| source | String | ID de la source ou query |
| type | String | Type de graphique (voir ci-dessus) |
| label-field | String | Chemin vers les labels dans les donnees |
| value-field | String | Chemin vers les valeurs |
| value-field-2 | String | 2e serie de valeurs (bar-line uniquement) |
| name | String | Noms des series JSON : \`'["Serie 1","Serie 2"]'\` |
| selected-palette | String | Palette de couleurs (voir ci-dessous) |
| unit-tooltip | String | Unite dans les tooltips (%, euro, etc.) |
| unit-tooltip-bar | String | Unite des barres (bar-line) |
| horizontal | Boolean | Barres horizontales (type bar) |
| stacked | Boolean | Barres empilees (type bar) |
| fill | Boolean | true=camembert plein, false=anneau (type pie) |
| highlight-index | String | Indices a mettre en avant : \`"[0, 2]"\` |
| x-min / x-max | String | Limites axe X |
| y-min / y-max | String | Limites axe Y |
| gauge-value | Number | Valeur pour jauge (0-100) |
| map-highlight | String | Departements a surligner |

### Palettes DSFR Chart
- **categorical** (defaut) : couleurs distinctes pour comparer des groupes
- **sequentialAscending** : gradient clair -> fonce (cartes, classements)
- **sequentialDescending** : gradient fonce -> clair
- **divergentAscending** / **divergentDescending** : echelles divergentes
- **neutral** : neutre avec mise en avant possible
- **default** : bleu France seul

### Exemples
\`\`\`html
<!-- Barres verticales -->
<gouv-dsfr-chart source="stats" type="bar" label-field="region" value-field="population" selected-palette="categorical"></gouv-dsfr-chart>

<!-- Barres horizontales empilees -->
<gouv-dsfr-chart source="data" type="bar" label-field="categorie" value-field="valeur" horizontal stacked></gouv-dsfr-chart>

<!-- Combine barres + ligne -->
<gouv-dsfr-chart source="data" type="bar-line" label-field="mois" value-field="ca" value-field-2="objectif" name='["CA","Objectif"]' unit-tooltip="EUR" unit-tooltip-bar="EUR"></gouv-dsfr-chart>

<!-- Camembert (donut) -->
<gouv-dsfr-chart source="repartition" type="pie" label-field="categorie" value-field="montant" unit-tooltip="%"></gouv-dsfr-chart>

<!-- Camembert plein -->
<gouv-dsfr-chart source="repartition" type="pie" label-field="categorie" value-field="montant" fill></gouv-dsfr-chart>

<!-- Carte par departement -->
<gouv-dsfr-chart source="dept-data" type="map" label-field="nom_dept" value-field="valeur" selected-palette="sequentialAscending"></gouv-dsfr-chart>

<!-- Carte par region -->
<gouv-dsfr-chart source="reg-data" type="map-reg" label-field="nom_reg" value-field="valeur"></gouv-dsfr-chart>

<!-- Jauge -->
<gouv-dsfr-chart type="gauge" gauge-value="73"></gouv-dsfr-chart>
\`\`\``,
  },

  gouvDatalist: {
    id: 'gouvDatalist',
    name: 'gouv-datalist',
    description: 'Tableau de donnees avec recherche, filtres, tri, pagination et export CSV',
    trigger: ['tableau', 'table', 'liste', 'colonnes', 'pagination', 'exporter', 'csv', 'recherche', 'datalist'],
    content: `## <gouv-datalist> - Tableau de donnees

Affiche un tableau DSFR filtrable, triable, paginable avec export CSV.

### Attributs
| Attribut | Type | Description |
|----------|------|-------------|
| source | String | ID de la source ou query |
| colonnes | String | Definition des colonnes : \`"key:Label, key2:Label2"\` |
| recherche | Boolean | Afficher la barre de recherche |
| filtres | String | Colonnes filtrables (dropdown) : \`"col1,col2"\` |
| tri | String | Tri par defaut : \`"col:asc"\` ou \`"col:desc"\` |
| pagination | Number | Lignes par page (0 = tout afficher) |
| export | String | Formats d'export : \`"csv"\` |

### Exemples
\`\`\`html
<!-- Tableau simple -->
<gouv-datalist source="data" colonnes="nom:Nom, email:Email, ville:Ville"></gouv-datalist>

<!-- Tableau complet -->
<gouv-datalist source="sites" colonnes="nom:Nom du site, ministere:Ministere, score_rgaa:Score RGAA" recherche filtres="ministere" tri="score_rgaa:desc" pagination="20" export="csv"></gouv-datalist>
\`\`\``,
  },

  // ---------------------------------------------------------------------------
  // Composants DSFR Chart natifs
  // ---------------------------------------------------------------------------

  dsfrChartNative: {
    id: 'dsfrChartNative',
    name: 'Composants DSFR Chart natifs',
    description: 'Attributs detailles des composants line-chart, bar-chart, pie-chart, etc.',
    trigger: ['dsfr', 'natif', 'officiel', 'accessibilite', 'rgaa', 'bar-chart', 'line-chart', 'pie-chart', 'map-chart', 'gauge-chart'],
    content: `## Composants DSFR Chart natifs

Les composants DSFR Chart acceptent des donnees au format JSON stringifie (tableaux imbriques).

### Format des donnees
\`\`\`html
x='[["Jan","Fev","Mar"]]'     <!-- Labels (tableau imbrique) -->
y='[[100, 200, 150]]'         <!-- Valeurs (tableau imbrique) -->
<!-- Multi-series -->
x='[["Jan","Fev"],["Jan","Fev"]]'
y='[[100, 200],[150, 180]]'
name='["Serie A","Serie B"]'
\`\`\`

### <bar-chart>
- horizontal : barres horizontales
- stacked : barres empilees
- highlight-index='[3]' : mettre en avant une barre

### <line-chart>
- x-min, x-max, y-min, y-max : limites des axes

### <pie-chart>
- fill="true" : camembert plein (defaut: anneau/donut)

### <gauge-chart>
- percent : valeur actuelle (0-100)
- init : valeur de depart
- target : valeur cible

### <scatter-chart>
- x, y : coordonnees des points

### <radar-chart>
- Multi-series pour comparer des profils

### <map-chart> (carte par departement)
- data='{"75": 95, "69": 78, "2A": 60}' : JSON code_dept -> valeur
- Codes valides : 01-95, 2A, 2B, 971-976
- name : nom de l'indicateur
- value-nat : valeur nationale de reference
- selected-palette : palette de couleurs

### <map-chart-reg> (carte par region)
- Meme format que map-chart avec codes region

### Attributs communs
- selected-palette : categorical, sequentialAscending, sequentialDescending, divergentAscending, divergentDescending, neutral, default
- unit-tooltip : unite dans les info-bulles
- name : noms des series en JSON`,
  },

  // ---------------------------------------------------------------------------
  // Patterns de composition
  // ---------------------------------------------------------------------------

  compositionPatterns: {
    id: 'compositionPatterns',
    name: 'Patterns de composition',
    description: 'Assembler source, query et visualisations en dashboards',
    trigger: ['dashboard', 'tableau de bord', 'assembler', 'combiner', 'pipeline', 'plusieurs', 'ensemble', 'complet', 'page', 'embarquer', 'integrer'],
    content: `## Patterns de composition gouv-widgets

### Pipeline standard : Source -> Query -> Visualisation
\`\`\`html
<gouv-source id="data" url="https://api.exemple.fr/records" transform="results"></gouv-source>

<gouv-query id="top10" source="data" group-by="region" aggregate="population:sum" order-by="population__sum:desc" limit="10"></gouv-query>

<gouv-dsfr-chart source="top10" type="bar" label-field="region" value-field="population__sum" selected-palette="categorical"></gouv-dsfr-chart>
\`\`\`

### Multi-consommation : 1 source -> N visualisations
\`\`\`html
<gouv-source id="sites" url="https://api.fr/sites" transform="results"></gouv-source>

<!-- KPIs -->
<gouv-kpi source="sites" valeur="count:status:active" label="Sites actifs" couleur="vert"></gouv-kpi>
<gouv-kpi source="sites" valeur="avg:score_rgaa" label="Score RGAA moyen" format="pourcentage" seuil-vert="80" seuil-orange="50"></gouv-kpi>

<!-- Graphique -->
<gouv-dsfr-chart source="sites" type="bar" label-field="ministere" value-field="score_rgaa" selected-palette="categorical"></gouv-dsfr-chart>

<!-- Tableau -->
<gouv-datalist source="sites" colonnes="nom:Nom, ministere:Ministere, score_rgaa:Score" recherche filtres="ministere" tri="score_rgaa:desc" pagination="20" export="csv"></gouv-datalist>
\`\`\`

### Chainabilite des queries
\`\`\`html
<gouv-source id="raw" url="..." transform="data"></gouv-source>
<gouv-query id="actifs" source="raw" where="status:eq:active"></gouv-query>
<gouv-query id="top5" source="actifs" group-by="region" aggregate="montant:sum" order-by="montant__sum:desc" limit="5"></gouv-query>
<gouv-dsfr-chart source="top5" type="pie" label-field="region" value-field="montant__sum"></gouv-dsfr-chart>
\`\`\`

### Dependances CDN requises
\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
<script type="module" src="https://chartsbuilder.matge.com/dist/gouv-widgets.esm.js"><\/script>
\`\`\``,
  },

  // ---------------------------------------------------------------------------
  // Skills existants (mis a jour)
  // ---------------------------------------------------------------------------

  odsql: {
    id: 'odsql',
    name: 'ODSQL (OpenDataSoft Query Language)',
    description: 'Syntaxe de requetes pour les APIs OpenDataSoft',
    trigger: ['odsql', 'opendatasoft'],
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
    trigger: ['version', 'v1', 'v2', 'v2.1', 'migration'],
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
    trigger: ['quel graphique', 'quel type', 'quel chart', 'recommand'],
    content: `## Choix du type de graphique

### KPI (kpi)
- Afficher une valeur unique importante (indicateur cle, total)
- **Champs requis** : valueField uniquement (PAS de labelField)
- **Options** : variant (info|success|warning|error), unit (EUR, %, etc.)

### Jauge (gauge)
- Progression vers un objectif (0-100%)
- **Champs requis** : valueField uniquement (PAS de labelField)

### Barres verticales (bar)
- Comparer des categories (5-15 ideal)
- **Champs requis** : labelField (categories), valueField
- **Options** : horizontal (barres horizontales), stacked (empile)
- **Supporte** : valueField2, limit, sortOrder

### Lignes (line)
- Evolution temporelle, tendances
- **Champs requis** : labelField (dates/temps), valueField
- **Supporte** : valueField2 pour comparaisons

### Combine barres + ligne (bar-line)
- Comparer 2 metriques differentes (ex: CA en barres + objectif en ligne)
- **Champs requis** : labelField, valueField (barres), valueField2 (ligne)
- **Options** : unit (barres), unit2 (ligne)

### Nuage de points (scatter)
- Correlation entre deux variables numeriques
- **Champs requis** : labelField (axe X numerique), valueField (axe Y)

### Camembert / Anneau (pie)
- Parts d'un tout (100%), max 5-7 segments
- **Champs requis** : labelField, valueField
- **Options** : fill (true = camembert plein, false = anneau)

### Radar
- Profils multicriteres
- **Champs requis** : labelField (criteres), valueField (scores)
- **Supporte** : valueField2 pour comparer 2 profils

### Carte departements (map)
- Donnees par departement francais
- **Champs requis** : codeField (code INSEE: 01-95, 2A, 2B, 971-976), valueField
- **labelField optionnel** : nom du departement

### Carte regions (map-reg)
- Donnees par region francaise
- **Champs requis** : codeField (code region), valueField

## Series multiples (bar, line, bar-line, radar)
Utilise valueField2 pour une seconde serie avec color2.`,
  },

  dsfrColors: {
    id: 'dsfrColors',
    name: 'Couleurs DSFR',
    description: "Palette officielle du Design System de l'Etat",
    trigger: ['couleur', 'color', 'palette', 'style'],
    content: `## Couleurs et palettes DSFR

### Couleurs hex principales
- **Bleu France**: #000091 (couleur par defaut)
- **Emeraude**: #009081 (succes)
- **Marianne**: #C9191E (erreur)
- **Orange**: #FF9940 (avertissement)
- **Violet**: #A558A0
- **Bleu ciel**: #417DC4
- **Vert foret**: #18753C

### Palettes DSFR Chart (attribut selected-palette)
| Palette | Usage |
|---------|-------|
| categorical | Comparer des groupes distincts (defaut) |
| sequentialAscending | Gradient clair -> fonce (cartes, classements) |
| sequentialDescending | Gradient fonce -> clair |
| divergentAscending | Echelle divergente (ecarts positifs/negatifs) |
| divergentDescending | Echelle divergente inversee |
| neutral | Neutre avec highlight-index pour mise en avant |
| default | Bleu France seul |

### Bonnes pratiques
- Utiliser categorical pour pie/doughnut/radar
- Utiliser sequentialAscending pour les cartes
- Utiliser neutral + highlight-index pour mettre en avant 1 barre
- Assurer un contraste suffisant (RGAA)
- Eviter le rouge/vert seuls (daltonisme)`,
  },

  apiQuery: {
    id: 'apiQuery',
    name: 'Requetes API avancees',
    description: "Filtrer et agreger les donnees via l'API",
    trigger: ['recharger', 'reloaddata', 'nouveaux parametres'],
    content: `## Action reloadData

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

### Exemples
- Top 10 : \`{ "order_by": "valeur DESC", "limit": 10 }\`
- Filtrer : \`{ "where": "prix > 50" }\`
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

  // Always include composition patterns for dashboard/integration requests
  if (lowerMsg.match(/dashboard|tableau de bord|integrer|embarquer|page/) &&
      !relevant.find(s => s.id === 'compositionPatterns')) {
    relevant.push(SKILLS.compositionPatterns);
  }

  // Always include ODSQL if we have an API source
  if (currentSource?.type === 'api') {
    if (!relevant.find(s => s.id === 'odsql')) {
      relevant.push(SKILLS.odsql);
    }
    if (!relevant.find(s => s.id === 'odsApiVersions')) {
      relevant.push(SKILLS.odsApiVersions);
    }
  }

  // Always include gouvSource and gouvDsfrChart for chart-related requests
  if (lowerMsg.match(/graphique|chart|visualis|barres|ligne|camembert|kpi|carte|map|jauge|gauge|tableau|datalist/)) {
    if (!relevant.find(s => s.id === 'gouvSource')) {
      relevant.push(SKILLS.gouvSource);
    }
    if (!relevant.find(s => s.id === 'gouvDsfrChart')) {
      relevant.push(SKILLS.gouvDsfrChart);
    }
  }

  // Auto-include gouvQuery when visualization + filtering context detected
  if (lowerMsg.match(/kpi|indicateur|graphique|chart|barres|camembert/) &&
      lowerMsg.match(/departement|region|filtre|uniquement|seulement|dans le|pour le|ou\b|quand/)) {
    if (!relevant.find(s => s.id === 'gouvQuery')) {
      relevant.push(SKILLS.gouvQuery);
    }
  }

  return relevant;
}

/**
 * Build the skills context string to inject into the AI prompt
 */
export function buildSkillsContext(relevantSkills: Skill[]): string {
  if (relevantSkills.length === 0) return '';

  return '\n\n---\nCONNAISSANCES DISPONIBLES (reference pour le code embarquable, PAS pour l\'action createChart):\n' +
    relevantSkills.map(s => s.content).join('\n\n');
}
