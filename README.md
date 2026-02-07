# gouv-widgets

Bibliotheque de Web Components de dataviz pour sites gouvernementaux francais, conformes au DSFR (Design System de l'Etat).

Construite avec [Lit](https://lit.dev/), TypeScript, Vite et Vitest.

## Structure du monorepo

```
/
├── apps/
│   ├── builder/        # Generateur visuel de graphiques
│   ├── builder-ia/     # Generateur IA avec Albert
│   ├── sources/        # Gestionnaire de sources de donnees
│   ├── playground/     # Environnement de code interactif
│   └── favorites/      # Gestion des favoris
├── packages/
│   └── shared/         # Utilitaires partages (@gouv-widgets/shared)
├── src/                # Composants web (gouv-chart, gouv-kpi, etc.)
├── dist/               # Build output (ESM + UMD)
├── demo/               # Pages de demonstration
├── tests/              # Tests Vitest
├── src-tauri/          # Application desktop Tauri
└── scripts/            # Scripts de build
```

## Prerequis

- Node.js >= 18
- npm >= 9

## Installation

```bash
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
npm run build:app     # Build app-dist pour Tauri
```

### Tests

```bash
npm run test          # Tests Vitest en watch mode
npm run test:run      # Tests une seule fois
npm run test:coverage # Tests avec couverture
```

### Tauri (application desktop)

```bash
npm run tauri:dev     # Dev Tauri
npm run tauri:build   # Build Tauri production
```

### Developpement d'une app individuelle

```bash
npm run dev --workspace=@gouv-widgets/app-builder
npm run dev --workspace=@gouv-widgets/app-builder-ia
npm run dev --workspace=@gouv-widgets/app-sources
npm run dev --workspace=@gouv-widgets/app-playground
npm run dev --workspace=@gouv-widgets/app-favorites
```

## Utilisation

### Integration via CDN

```html
<script type="module" src="https://chartsbuilder.matge.com/dist/gouv-widgets.js"></script>

<gouv-chart
  type="bar"
  title="Exemple"
  data='[{"label":"A","value":10},{"label":"B","value":20}]'>
</gouv-chart>
```

### Integration via npm

```bash
npm install gouv-widgets
```

```js
import 'gouv-widgets';
```

## Composants disponibles

| Composant       | Description                              |
|-----------------|------------------------------------------|
| `gouv-chart`    | Graphiques (barres, lignes, camembert...) |
| `gouv-kpi`      | Indicateurs chiffres cles                |
| `gouv-query`    | Filtrage et agregation de donnees        |

## APIs externes

| Service       | URL                              |
|---------------|----------------------------------|
| Grist         | docs.getgrist.com, grist.numerique.gouv.fr |
| Albert IA     | albert.api.etalab.gouv.fr       |
| OpenDataSoft  | *.opendatasoft.com               |
| Tabular API   | tabular-api.data.gouv.fr        |

## Proxy

- **Production** : `https://chartsbuilder.matge.com`
- **Developpement** : proxy Vite integre (configure dans `vite.config.ts`)

## Docker

```bash
docker build -t gouv-widgets .
docker run -p 8080:80 gouv-widgets
```

## Licence

MIT
