# gouv-widgets

Bibliotheque de Web Components pour integrer des graphiques dynamiques, accessibles et conformes DSFR dans les sites gouvernementaux francais. Voir la [fiche produit](DATASHEET.md) pour le positionnement detaille.

## Le probleme

Les sites gouvernementaux illustrent leurs donnees avec des captures d'ecran Excel, des infographies statiques ou des donnees saisies manuellement dans le CMS. Le resultat est non accessible, non interactif et difficile a maintenir.

Les plateformes BI (Metabase, Superset, Chartsgouv) repondent a un autre besoin : exploration de donnees, reporting interne, publication de dashboards autonomes. Elles ne proposent pas de solution simple pour **embarquer un graphique directement dans une page web existante** — leur modele repose sur l'iframe, isole du DOM de la page (pas d'heritage CSS, pas d'accessibilite unifiee, pas de responsive naturel).

## La solution

gouv-widgets resout le **dernier kilometre** : permettre a un agent public non technique de transformer une donnee ouverte en graphique conforme, accessible et dynamique, embarque dans son site, **sans plateforme, sans developpeur, sans infra**.

Le projet s'articule en **deux volets independants** :

### Volet 1 — Composants web (pour developpeurs et integrateurs)

Des balises HTML `<gouv-*>` qui s'enchainent pour former un pipeline de donnees declaratif :

```
Source de donnees → Nettoyage → Requetage → Visualisation
```

- **Zero JavaScript a ecrire** — tout se configure via des attributs HTML
- **Agnostique** — fonctionne dans Drupal, WordPress, page statique, React, Vue, Angular
- **Un seul fichier a charger** — ~50 Ko gzippe
- **Connecteurs integres** — OpenDataSoft, Tabular API (data.gouv.fr), Grist, toute API REST
- **DSFR-natif** — utilise [DSFR Chart](https://github.com/GouvernementFR/dsfr-chart), la bibliotheque officielle du Design System de l'Etat
- **Accessible par defaut** — conforme RGAA/WCAG 2 AA
- **Open source** — MIT, mutualisable entre administrations

### Volet 2 — Applications de creation (pour non-developpeurs)

Une suite d'outils web pour **generer le code HTML du volet 1 sans le connaitre** : builder visuel pas-a-pas, builder IA par conversation, playground interactif, editeur de tableaux de bord. La cible : les redacteurs web et communicants qui illustrent des articles avec des donnees publiques.

## A qui ca s'adresse

- **Redacteurs web / communicants** — creer des graphiques via les builders, copier-coller le code dans le CMS
- **Integrateurs web** — embarquer des graphiques dynamiques en quelques lignes de HTML
- **Producteurs de donnees** — valoriser des jeux de donnees open data par des visualisations interactives

## Composants

| Composant | Description |
|-----------|-------------|
| `gouv-source` | Connecteur de donnees : charge depuis une API REST et distribue aux autres composants |
| `gouv-normalize` | Normalisation : conversion numerique, renommage de colonnes, trim, remplacement |
| `gouv-query` | Requetage : filtre, tri, regroupement et agregation des donnees |
| `gouv-facets` | Filtres a facettes interactifs sur les donnees d'une source |
| `gouv-search` | Barre de recherche textuelle avec filtrage client ou server-side |
| `gouv-dsfr-chart` | Wrapper graphique : connecte les graphiques DSFR Chart au systeme de donnees dynamiques |
| `gouv-datalist` | Tableau avec recherche, filtres, tri, pagination et export CSV |
| `gouv-kpi` | Indicateur chiffre cle avec formatage, couleurs conditionnelles et icones |
| `gouv-display` | Affichage libre de donnees via template HTML personnalise |
| `gouv-world-map` | Carte du monde coloree par valeurs (choropleth) |
| `gouv-raw-data` | Bouton de telechargement CSV des donnees (companion accessibilite) |

Les composants se chainent de facon declarative :

```
gouv-source → gouv-normalize → gouv-query → gouv-dsfr-chart / gouv-kpi / gouv-datalist / gouv-display / gouv-world-map
                                           → gouv-facets / gouv-search (filtres interactifs)
                                           → gouv-raw-data (telechargement CSV accessible)
```

## Utilisation

### Integration via CDN

```html
<!-- DSFR -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<!-- DSFR Chart -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"></script>
<!-- gouv-widgets -->
<script type="module" src="https://chartsbuilder.matge.com/dist/gouv-widgets.esm.js"></script>
```

### Exemple minimal

```html
<!-- Source de donnees -->
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
  transform="results">
</gouv-source>

<!-- Agregation par region -->
<gouv-query id="q" source="data"
  group-by="nom_region"
  aggregate="nombre_beneficiaires:sum:beneficiaires"
  order-by="beneficiaires:desc" limit="10">
</gouv-query>

<!-- Graphique en barres -->
<gouv-dsfr-chart source="q" type="bar"
  label-field="nom_region" value-field="beneficiaires">
</gouv-dsfr-chart>
```

### Integration via npm

```bash
npm install gouv-widgets
```

```js
import 'gouv-widgets';
```

## Applications

Le projet inclut sept applications web pour creer et gerer des visualisations :

| Application | Description |
|-------------|-------------|
| **Sources** | Connecter et gerer les sources de donnees (Grist, API REST, manuelles) |
| **Builder** | Generateur visuel de graphiques pas-a-pas |
| **Builder IA** | Generateur de graphiques par conversation avec l'IA Albert |
| **Playground** | Editeur de code interactif avec apercu temps reel |
| **Dashboard** | Editeur visuel de tableaux de bord multi-widgets |
| **Favoris** | Gestion des graphiques favoris |
| **Monitoring** | Suivi des deploiements de widgets en production |

## Structure du monorepo

```
/
├── src/                 # Composants web Lit (gouv-source, gouv-kpi, etc.)
├── dist/                # Build output (ESM + UMD)
├── apps/
│   ├── builder/         # Generateur visuel de graphiques
│   ├── builder-ia/      # Generateur IA avec Albert
│   ├── dashboard/       # Editeur visuel de tableaux de bord
│   ├── sources/         # Gestionnaire de sources de donnees
│   ├── playground/      # Environnement de code interactif
│   ├── favorites/       # Gestion des favoris
│   └── monitoring/      # Suivi des deployements
├── packages/
│   └── shared/          # Utilitaires partages (@gouv-widgets/shared)
├── specs/               # Specifications des composants
├── guide/               # Guide utilisateur et exemples
├── tests/               # Tests unitaires Vitest
├── e2e/                 # Tests E2E Playwright
├── src-tauri/           # Application desktop Tauri
└── scripts/             # Scripts de build et monitoring
```

## Prerequis

- Node.js >= 20
- npm >= 9

## Installation

```bash
git clone https://github.com/bmatge/datasource-charts-webcomponents.git
cd datasource-charts-webcomponents
npm install
```

## Commandes

### Developpement

```bash
npm run dev           # Serveur de dev Vite (port 5173)
npm run preview       # Preview du build
```

### Build

```bash
npm run build         # Build bibliotheque TypeScript + Vite
npm run build:shared  # Build du package shared
npm run build:apps    # Build de toutes les apps
npm run build:all     # Build complet (shared + lib + apps)
```

### Tests

```bash
npm run test          # Tests Vitest en watch mode
npm run test:run      # Tests une seule fois
npm run test:coverage # Tests avec couverture
npm run test:e2e      # Tests E2E Playwright
```

### Tauri (application desktop)

```bash
npm run tauri:dev     # Dev Tauri
npm run tauri:build   # Build Tauri production
```

### Dev d'une app individuelle

```bash
npm run dev --workspace=@gouv-widgets/app-builder
npm run dev --workspace=@gouv-widgets/app-builder-ia
npm run dev --workspace=@gouv-widgets/app-dashboard
npm run dev --workspace=@gouv-widgets/app-sources
npm run dev --workspace=@gouv-widgets/app-playground
npm run dev --workspace=@gouv-widgets/app-favorites
npm run dev --workspace=@gouv-widgets/app-monitoring
```

## APIs externes

| Service | URL | Usage |
|---------|-----|-------|
| OpenDataSoft | data.economie.gouv.fr | Donnees economiques ouvertes |
| Tabular API | tabular-api.data.gouv.fr | Donnees data.gouv.fr |
| Grist | grist.numerique.gouv.fr | Tableur collaboratif |
| Albert IA | albert.api.etalab.gouv.fr | IA souveraine (Builder IA) |

## Proxy

- **Developpement** : proxy Vite integre (configure dans `vite.config.ts`)
- **Production** : `https://chartsbuilder.matge.com` (nginx)
- **Tauri** : proxy distant via detection `window.__TAURI__`
- Configurable via `VITE_PROXY_URL`

## Docker

```bash
docker compose up -d --build   # Build et lancement
```

Le conteneur sert l'application sur le port 80 et persiste les logs de monitoring via un volume Docker.

## Documentation

- [Guide utilisateur](guide/USER-GUIDE.md) — Parcours, exemples, reference des composants
- [Architecture](guide/architecture.md) — Architecture technique detaillee
- [Contribuer](guide/CONTRIBUTING.md) — Guide de contribution

## Licence

MIT
