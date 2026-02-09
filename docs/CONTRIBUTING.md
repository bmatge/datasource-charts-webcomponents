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
npm run dev --workspace=@gouv-widgets/app-dashboard
npm run dev --workspace=@gouv-widgets/app-sources
npm run dev --workspace=@gouv-widgets/app-playground
npm run dev --workspace=@gouv-widgets/app-favorites
npm run dev --workspace=@gouv-widgets/app-monitoring
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

### Tests unitaires (Vitest)

```bash
npm run test         # Watch mode
npm run test:run     # Execution unique
npm run test:coverage
```

### Tests E2E (Playwright)

```bash
npm run test:e2e
```

### Structure des tests

```
tests/
  gouv-source.test.ts          Composant gouv-source
  gouv-query.test.ts           Composant gouv-query
  gouv-normalize.test.ts       Composant gouv-normalize
  gouv-facets.test.ts          Composant gouv-facets
  gouv-datalist.test.ts        Composant gouv-datalist
  aggregations.test.ts         Fonctions d'agregation
  chart-data.test.ts           Traitement des donnees graphiques
  data-bridge.test.ts          Bus d'evenements inter-composants
  formatters.test.ts           Formatage (src/utils)
  json-path.test.ts            Acces par chemin JSON
  integration.test.ts          Tests d'integration inter-composants
  source-subscriber.test.ts    Mixin SourceSubscriber
  shared/                      Tests @gouv-widgets/shared
    dept-codes.test.ts
    dsfr-palettes.test.ts
    escape-html.test.ts
    formatters.test.ts
    local-storage.test.ts
    modal.test.ts
    navigation.test.ts
    number-parser.test.ts
    proxy-config.test.ts
    toast.test.ts
  apps/                        Tests des applications
    builder/
    builder-ia/
    dashboard/
    favorites/
    playground/
    sources/
e2e/                           Tests E2E Playwright
```

### Alignement des skills (Builder IA)

Le builder IA utilise un systeme de skills (blocs de connaissances injectes dans le prompt). Les tests dans `tests/apps/builder-ia/skills.test.ts` verifient automatiquement que :

- Chaque attribut HTML d'un composant est documente dans son skill (via introspection Lit)
- Tous les types de graphiques, operateurs de filtre et fonctions d'agregation sont couverts

Quand on ajoute ou modifie un attribut dans un composant `gouv-*`, il faut mettre a jour le skill correspondant dans `apps/builder-ia/src/skills.ts`.

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
import { toastSuccess, toastWarning } from '@gouv-widgets/shared';
import { appHref, navigateTo } from '@gouv-widgets/shared';
```

### Tests

- Fichiers de test : `*.test.ts`
- Environnement : jsdom (via Vitest)
- Reinitialiser le DOM dans `beforeEach`
- Nettoyer localStorage/sessionStorage dans `afterEach`

## Docker

```bash
docker compose up -d --build
```

Le conteneur utilise un volume `beacon-logs` pour persister les donnees de monitoring entre redemarrages.

## Proxy

En dev, les proxys CORS sont geres par Vite (`vite.config.ts`).
En production, ils sont geres par nginx (`nginx.conf`).
L'URL du proxy est configurable via la variable d'environnement `VITE_PROXY_URL`.

## Release

La release est declenchee par un tag git :

```bash
git tag v0.2.0
git push origin v0.2.0
```

Le workflow `.github/workflows/release.yml` build automatiquement sur macOS (ARM + x86), Linux (deb + AppImage) et Windows (NSIS + MSI).
