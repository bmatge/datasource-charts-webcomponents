# Contribuer a gouv-widgets

## Prerequis

- Node.js >= 20
- npm >= 9

## Installation

```bash
git clone https://github.com/bmatge/datasource-charts-webcomponents.git
cd datasource-charts-webcomponents
npm install
```

## Developpement

### Bibliotheque de composants

```bash
npm run dev          # Serveur de dev (port 5173)
npm run build        # Build lib (ESM + UMD)
```

### Apps individuelles

Chaque app peut etre developpee independamment :

```bash
npm run dev --workspace=@gouv-widgets/app-builder
npm run dev --workspace=@gouv-widgets/app-builder-ia
npm run dev --workspace=@gouv-widgets/app-sources
npm run dev --workspace=@gouv-widgets/app-playground
npm run dev --workspace=@gouv-widgets/app-favorites
```

### Package shared

```bash
npm run build:shared
```

### Build complet

```bash
npm run build:all    # shared + lib + toutes les apps
```

## Tests

```bash
npm run test         # Watch mode
npm run test:run     # Execution unique
npm run test:coverage
```

Les tests sont dans `/tests/` et suivent la structure des sources :
- `tests/shared/` - Tests du package shared
- `tests/apps/` - Tests des apps
- `tests/components/` - Tests des composants

## Conventions

### TypeScript

- Mode strict active
- Pas de `any` sauf cas justifie
- Types explicites pour les signatures de fonctions publiques

### Nommage

- Composants web : prefixe `gouv-` (public) ou `app-` (layout interne)
- Fichiers : kebab-case (`chart-renderer.ts`)
- Interfaces/types : PascalCase (`ChartConfig`, `AppState`)
- Fonctions : camelCase (`renderChart`, `loadSavedSources`)

### Structure des apps

Chaque app dans `apps/` suit la meme structure :

```
apps/{name}/
  index.html          # Point d'entree HTML
  package.json         # Dependances (@gouv-widgets/shared)
  tsconfig.json        # Herite de tsconfig.base.json
  vite.config.ts       # Config Vite avec alias @gouv-widgets/shared
  src/
    main.ts            # Point d'entree JS
    state.ts           # Etat de l'app
    styles/            # CSS
    ui/                # Modules UI (optionnel)
```

### Imports partages

Utiliser les imports depuis `@gouv-widgets/shared` pour le code partage :

```typescript
import { escapeHtml, formatKPIValue, DSFR_COLORS } from '@gouv-widgets/shared';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@gouv-widgets/shared';
import { getProxiedUrl, isViteDevMode } from '@gouv-widgets/shared';
```

### Tests

- Fichiers de test : `*.test.ts`
- Environnement : jsdom (via Vitest)
- Reinitialiser le DOM dans `beforeEach`
- Nettoyer localStorage/sessionStorage dans `afterEach`

## Docker

```bash
docker build -t gouv-widgets .
docker run -p 8080:80 gouv-widgets
```

## Proxy

En dev, les proxys CORS sont geres par Vite (`vite.config.ts`).
En production, ils sont geres par nginx (`nginx.conf`).
L'URL du proxy est configurable via la variable d'environnement `VITE_PROXY_URL`.
