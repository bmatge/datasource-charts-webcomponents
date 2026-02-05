# Brief POC : gouv-widgets — Bibliothèque de widgets de dataviz pour sites gouvernementaux

## Contexte

Ce projet est un POC (Proof of Concept) d'une bibliothèque de **Web Components** dédiée à la visualisation de données pour les sites gouvernementaux français. L'objectif est de proposer des widgets légers, agnostiques (en source de données et en environnement d'intégration), conformes au DSFR (Système de Design de l'État) et compatibles RGAA.

### Pourquoi ce projet ?

Les sites ministériels ont besoin d'afficher des KPI, des graphiques et des listes de données alimentées par des API (OpenDataSoft, API REST internes, data.gouv.fr, etc.). Aujourd'hui les options sont :
- Les widgets OpenDataSoft (basés sur AngularJS 1.x, obsolète et verrouillés sur l'écosystème ODS)
- Des développements React/Vue custom (lourds à intégrer dans Drupal ou d'autres CMS)

L'idée est de créer des composants Web natifs (Web Components) qu'un intégrateur ou éditeur de contenu peut poser sur n'importe quelle page HTML, Drupal, WordPress, etc., simplement en ajoutant des balises HTML avec des attributs — sans build, sans framework.

### Philosophie

- **Déclaratif** : tout se configure via des attributs HTML, pas de JavaScript à écrire côté intégrateur
- **Agnostique** : fonctionne avec n'importe quelle API REST, pas verrouillé sur un fournisseur
- **DSFR-natif** : utilise les tokens CSS, les couleurs illustratives et la grille du DSFR
- **Accessible** : chaque visualisation doit proposer une alternative textuelle/tabulaire (RGAA)
- **Léger** : un seul fichier JS + CSS à charger

---

## Stack technique

| Couche | Technologie | Justification |
|--------|------------|---------------|
| Web Components | **Lit** (by Google) | ~5 Ko, standard W3C, DX agréable, compilation en Web Components natifs |
| Charts | **@gouvfr/dsfr-chart** | Bibliothèque officielle DSFR de dataviz (Vue.js compilé en Web Components + Chart.js) |
| Build | **Vite** | Rapide, simple, bon support Lit |
| Langage | **TypeScript** | Typage pour la robustesse |
| Style | **DSFR tokens CSS** | Variables CSS du Design System de l'État |
| Tests | **Vitest** + **@open-wc/testing** | Tests unitaires des composants |

---

## Architecture des composants

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                    gouv-widgets                          │
│                                                         │
│  ┌──────────────┐   ┌──────────┐   ┌────────────────┐  │
│  │ gouv-source  │──→│ gouv-kpi │   │ gouv-datalist  │  │
│  │ (connecteur  │──→│          │   │ (liste filtrable│  │
│  │  API)        │──→│          │   │  + recherche)   │  │
│  └──────────────┘   └──────────┘   └────────────────┘  │
│         │                                               │
│         │           ┌──────────────────┐                │
│         └──────────→│   dsfr-chart     │                │
│                     │ (charts officiels │                │
│                     │  du DSFR - déjà   │                │
│                     │  des Web Comp.)   │                │
│                     └──────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

### Composant 1 : `<gouv-source>` — Le connecteur de données

Composant **invisible** (pas de rendu). Son rôle :
- Se connecter à une API REST
- Récupérer les données
- Les normaliser en format interne (tableau d'objets JSON)
- Les mettre en cache
- Les rafraîchir périodiquement (attribut `refresh`)
- Dispatcher un événement custom quand les données changent

**Attributs :**
| Attribut | Type | Description |
|----------|------|-------------|
| `id` | string | Identifiant unique, utilisé par les autres widgets pour se connecter |
| `url` | string | URL de l'API |
| `method` | string | `GET` (défaut) ou `POST` |
| `headers` | string (JSON) | Headers HTTP (ex : `'{"Authorization": "Bearer xxx"}'`) |
| `params` | string (JSON) | Paramètres de requête |
| `refresh` | number | Intervalle de rafraîchissement en secondes (0 = pas de refresh) |
| `transform` | string | Chemin JSON vers les données dans la réponse (ex : `results.items`, `records`) |

**Événements émis :**
- `gouv-data-loaded` : données chargées (detail: { sourceId, data })
- `gouv-data-error` : erreur de chargement (detail: { sourceId, error })
- `gouv-data-loading` : chargement en cours (detail: { sourceId })

### Composant 2 : `<gouv-kpi>` — Indicateur chiffré

Affiche une valeur numérique mise en avant, type "chiffre clé".

**Attributs :**
| Attribut | Type | Description |
|----------|------|-------------|
| `source` | string | ID du `<gouv-source>` à écouter |
| `valeur` | string | Clé JSON de la valeur à afficher (ex : `total_sites`) |
| `label` | string | Libellé affiché sous le chiffre |
| `description` | string | Description détaillée (pour l'accessibilité) |
| `icone` | string | Classe d'icône Remix Icon (ex : `ri-global-line`) |
| `format` | string | `nombre`, `pourcentage`, `euro` |
| `tendance` | string | Clé JSON pour l'évolution (ex : `+3.2` → flèche verte ↑) |
| `seuil-vert` | number | Seuil au-dessus duquel la valeur est verte |
| `seuil-orange` | number | Seuil au-dessus duquel la valeur est orange |
| `couleur` | string | Couleur forcée : `vert`, `orange`, `rouge`, `bleu` |

**Rendu attendu :**
- Tuile DSFR (classes `fr-tile` ou custom s'inspirant des tuiles)
- Chiffre principal en grand
- Icône à gauche ou au-dessus
- Flèche de tendance si applicable
- Couleur conditionnelle selon les seuils

### Composant 3 : `<gouv-datalist>` — Liste filtrable et cherchable

Affiche un tableau de données avec recherche, filtres et pagination.

**Attributs :**
| Attribut | Type | Description |
|----------|------|-------------|
| `source` | string | ID du `<gouv-source>` |
| `colonnes` | string | Définition des colonnes : `cle:Label, cle2:Label2` |
| `recherche` | boolean | Afficher un champ de recherche |
| `filtres` | string | Colonnes filtrables : `ministere,statut` |
| `tri` | string | Tri par défaut : `score:desc` |
| `pagination` | number | Nombre d'éléments par page |
| `export` | string | Formats d'export disponibles : `csv` |

**Rendu attendu :**
- Champ de recherche DSFR (classe `fr-search-bar`)
- Filtres sous forme de selects DSFR (classe `fr-select`)
- Tableau DSFR (classe `fr-table`)
- Pagination DSFR
- Indicateur de chargement pendant les requêtes

---

## Structure du repo

```
gouv-widgets/
├── README.md                  # Documentation d'utilisation
├── package.json
├── tsconfig.json
├── vite.config.ts             # Config Vite pour build Web Components
├── index.html                 # Page de démo
├── src/
│   ├── index.ts               # Point d'entrée — enregistre tous les composants
│   ├── components/
│   │   ├── gouv-source.ts     # Connecteur de données
│   │   ├── gouv-kpi.ts        # Widget KPI
│   │   └── gouv-datalist.ts   # Widget liste filtrable
│   ├── utils/
│   │   ├── data-bridge.ts     # Système d'événements inter-composants
│   │   ├── formatters.ts      # Formatage nombres, pourcentages, etc.
│   │   └── json-path.ts       # Extraction de données via chemin JSON
│   └── styles/
│       └── dsfr-tokens.css    # Variables CSS DSFR utilisées par les composants
├── demo/
│   ├── index.html             # Page de démo complète
│   ├── mock-api/              # Serveur mock pour les démos
│   │   └── data.json          # Données fictives
│   └── examples/
│       ├── kpi-dashboard.html
│       ├── datalist.html
│       └── full-dashboard.html
└── tests/
    ├── gouv-source.test.ts
    ├── gouv-kpi.test.ts
    └── gouv-datalist.test.ts
```

---

## Page de démo attendue

La page de démo `demo/index.html` doit simuler un mini-dashboard de monitoring de sites gouvernementaux, avec :

1. **Données mockées** via un fichier JSON local (simulant une API REST) contenant une liste de ~20 sites avec les champs : `nom`, `url`, `ministere`, `score_rgaa`, `score_dsfr`, `statut` (actif/inactif), `certificat_valide` (true/false), `date_derniere_analyse`

2. **Ligne de 4 KPIs** :
   - Nombre total de sites
   - Score RGAA moyen (en %)
   - Nombre de certificats expirés
   - Nombre de sites conformes DSFR (en %)

3. **Liste filtrable** avec :
   - Recherche textuelle
   - Filtre par ministère
   - Filtre par statut
   - Tri par score RGAA
   - Pagination à 10 éléments

4. **Intégration dsfr-chart** (si possible dans le POC, sinon en placeholder) :
   - Un graphique en barres des scores RGAA par ministère

---

## Données mock

Voici la structure du fichier `demo/mock-api/data.json` :

```json
{
  "metadata": {
    "total": 20,
    "derniere_mise_a_jour": "2025-02-05T10:00:00Z"
  },
  "sites": [
    {
      "nom": "economie.gouv.fr",
      "url": "https://www.economie.gouv.fr",
      "ministere": "Économie et Finances",
      "score_rgaa": 87,
      "score_dsfr": 92,
      "statut": "actif",
      "certificat_valide": true,
      "date_derniere_analyse": "2025-01-28"
    }
  ]
}
```

Génère ~20 sites fictifs mais réalistes couvrant les principaux ministères français.

---

## Consignes pour le développement

### Priorités

1. **D'abord** : `gouv-source` + le système d'événements (c'est le cœur)
2. **Ensuite** : `gouv-kpi` (le plus simple visuellement)
3. **Ensuite** : `gouv-datalist` (le plus riche fonctionnellement)
4. **Bonus** : intégration `dsfr-chart` pour un graphique

### Style

- Utiliser les classes CSS du DSFR quand elles existent (fr-table, fr-input, fr-select, fr-btn, fr-tile, etc.)
- Pour le POC, on charge le DSFR via CDN dans la page de démo
- Les composants utilisent le Shadow DOM mais avec `::part()` pour permettre la personnalisation
- Utiliser les couleurs illustratives du DSFR pour les seuils KPI

### Accessibilité (RGAA)

- Chaque KPI doit avoir un `aria-label` descriptif
- Le tableau doit avoir un `caption` et des `scope` sur les headers
- La recherche doit avoir un label associé
- Les mises à jour dynamiques doivent utiliser `aria-live="polite"`
- Les graphiques doivent proposer une alternative tabulaire

### Tests

- Tester que `gouv-source` émet bien les événements avec les bonnes données
- Tester que `gouv-kpi` affiche la bonne valeur formatée
- Tester que `gouv-datalist` filtre et trie correctement

---

## Exemple d'utilisation finale attendue

```html
<!DOCTYPE html>
<html lang="fr" data-fr-theme>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr/dist/dsfr.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr/dist/utility/utility.min.css">
  <script type="module" src="gouv-widgets.esm.js"></script>
</head>
<body>
  <div class="fr-container fr-my-4w">
    <h1>Tableau de bord — Écosystème web ministériel</h1>

    <!-- Source de données -->
    <gouv-source
      id="sites"
      url="./mock-api/data.json"
      transform="sites"
      refresh="0">
    </gouv-source>

    <gouv-source
      id="meta"
      url="./mock-api/data.json"
      transform="metadata">
    </gouv-source>

    <!-- KPIs -->
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-4w">
      <div class="fr-col-12 fr-col-md-3">
        <gouv-kpi source="meta" valeur="total" label="Sites suivis"
                  icone="ri-global-line" format="nombre"></gouv-kpi>
      </div>
      <div class="fr-col-12 fr-col-md-3">
        <gouv-kpi source="sites" valeur="avg:score_rgaa" label="Score RGAA moyen"
                  format="pourcentage" seuil-vert="80" seuil-orange="50"></gouv-kpi>
      </div>
      <div class="fr-col-12 fr-col-md-3">
        <gouv-kpi source="sites" valeur="count:certificat_valide:false"
                  label="Certificats expirés" icone="ri-shield-cross-line"
                  couleur="rouge"></gouv-kpi>
      </div>
      <div class="fr-col-12 fr-col-md-3">
        <gouv-kpi source="sites" valeur="avg:score_dsfr" label="Conformité DSFR"
                  format="pourcentage" seuil-vert="80" seuil-orange="50"></gouv-kpi>
      </div>
    </div>

    <!-- Liste filtrable -->
    <gouv-datalist
      source="sites"
      colonnes="nom:Nom du site, ministere:Ministère, score_rgaa:RGAA, score_dsfr:DSFR, statut:Statut"
      recherche="true"
      filtres="ministere,statut"
      tri="score_rgaa:desc"
      pagination="10">
    </gouv-datalist>
  </div>
</body>
</html>
```

---

## Pour démarrer

```bash
# Initialiser le projet
npm create vite@latest gouv-widgets -- --template lit-ts
cd gouv-widgets
npm install

# Dépendances additionnelles
npm install lit
npm install -D typescript vite

# Lancer le dev server
npm run dev
```

## Notes importantes

- Ce POC n'intègre pas encore `@gouvfr/dsfr-chart` pour les graphiques — on se concentre sur les 3 composants de base. L'intégration dsfr-chart sera l'étape suivante.
- Le Shadow DOM peut poser des soucis avec les styles DSFR. Si c'est le cas, on peut utiliser `createRenderRoot() { return this; }` dans Lit pour désactiver le Shadow DOM et utiliser le Light DOM à la place. C'est un compromis acceptable pour le POC.
- Pour les expressions d'agrégation dans les KPIs (avg:, count:, sum:), il faut prévoir un mini-parser dans gouv-kpi qui sait interpréter ces expressions sur le tableau de données reçu du source.