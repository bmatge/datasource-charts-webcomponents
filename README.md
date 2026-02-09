# gouv-widgets

Bibliotheque de Web Components de dataviz pour sites gouvernementaux francais, conformes au DSFR (Design System de l'Etat).

## Pourquoi ce projet

Les sites gouvernementaux ont regulierement besoin d'integrer des graphiques dans leurs articles : barres, camemberts, courbes, cartes, indicateurs chiffres cles. En pratique, les equipes de communication recourent souvent a des captures d'ecran, des infographies statiques ou des donnees saisies manuellement dans le CMS. Le resultat est statique, non accessible, non responsive et difficile a maintenir.

Les plateformes open data et les outils de dataviz existants comme Chartsgoug / Superset couvrent d'autres besoins — stockage et diffusion de jeux de donnees, analyse interne, reporting et publication de tableaux de bords complets et autonomes. 

A l'heure actuelle aucun ne semble proposer de solution simple pour **embarquer un graphique dynamique et accessible directement dans une page web**, sans dependance a une plateforme tierce et sans ecrire de code JavaScript.

**gouv-widgets vise à courir ce besoin**. La bibliotheque s'appuie sur les **Web Components**, un standard HTML5 natif qui fonctionne dans n'importe quel environnement : Drupal, WordPress, page statique ou application JavaScript. Un integrateur web peut creer un graphique connecte a une API open data en quelques lignes de HTML. Les graphiques produits utilisent [DSFR Chart](https://github.com/GouvernementFR/dsfr-chart), la bibliotheque officielle du Design System de l'Etat : ils sont conformes DSFR, accessibles (RGAA) et responsive par defaut.

Pour les profils non techniques, le projet inclut des applications de creation : un **builder visuel** pas-a-pas, un **builder IA** par conversation, et un **playground** pour editer le code en temps reel.

## A qui ca s'adresse

- **Integrateurs web** des sites gouvernementaux — embarquer des graphiques dynamiques via copier-coller de HTML
- **Communicants** — creer des visualisations via les builders sans ecrire de code
- **Producteurs de donnees** — valoriser des jeux de donnees open data par des graphiques interactifs

## Principes

- **Declaratif** : tout se configure via des attributs HTML, pas de JavaScript a ecrire cote integrateur
- **Agnostique** : fonctionne avec n'importe quelle API REST, pas verrouille sur un fournisseur
- **DSFR-natif** : utilise les tokens CSS, les couleurs illustratives et la grille du DSFR
- **Leger** : un seul fichier JS a charger

## Composants

| Composant | Description |
|-----------|-------------|
| `gouv-source` | Connecteur de donnees : charge depuis une API REST et distribue aux autres composants |
| `gouv-normalize` | Normalisation : conversion numerique, renommage de colonnes, trim, remplacement |
| `gouv-query` | Requetage : filtre, tri, regroupement et agregation des donnees |
| `gouv-facets` | Filtres a facettes interactifs sur les donnees d'une source |
| `gouv-datalist` | Tableau avec recherche, filtres, tri, pagination et export CSV |
| `gouv-kpi` | Indicateur chiffre cle avec formatage, couleurs conditionnelles et icones |
| `gouv-dsfr-chart` | Wrapper graphique : connecte les graphiques DSFR Chart au systeme de donnees dynamiques |

Les composants se chainent de facon declarative :

```
gouv-source → gouv-normalize → gouv-query → gouv-dsfr-chart / gouv-kpi / gouv-datalist
                                           → gouv-facets (filtres interactifs)
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
| **Favorites** | Gestion des graphiques favoris |
| **Monitoring** | Suivi des deployements de widgets en production |

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
├── demo/                # Pages de demonstration des composants
├── docs/                # Guide utilisateur et documentation
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

- [Guide utilisateur](docs/USER-GUIDE.md) — Parcours, exemples, reference des composants
- [Architecture](docs/architecture.md) — Architecture technique detaillee
- [Contribuer](docs/CONTRIBUTING.md) — Guide de contribution

## Licence

MIT
