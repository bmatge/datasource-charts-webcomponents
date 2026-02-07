# CLAUDE.md - Configuration du projet gouv-widgets

## Contexte du projet

Bibliotheque de Web Components de dataviz pour sites gouvernementaux francais.
Composants Lit conformes DSFR (Design System de l'Etat).
Architecture monorepo avec npm workspaces.

## Architecture

```
/
├── index.html               # Hub (page d'accueil)
├── apps/                    # Applications TypeScript
│   ├── builder/             # Generateur visuel de graphiques
│   ├── builder-ia/          # Generateur IA avec Albert
│   ├── dashboard/           # Editeur de tableaux de bord
│   ├── sources/             # Gestionnaire de sources de donnees
│   ├── playground/          # Environnement de code interactif
│   └── favorites/           # Gestion des favoris
├── packages/
│   └── shared/              # Utilitaires partages (@gouv-widgets/shared)
├── src/                     # Composants web gouv-widgets (Lit)
├── dist/                    # Build output (ESM + UMD)
├── demo/                    # Pages de demonstration
├── tests/                   # Tests Vitest + Playwright E2E
├── e2e/                     # Tests E2E Playwright
├── src-tauri/               # App desktop Tauri
├── scripts/                 # Scripts de build
└── app-dist/                # Build output pour Tauri (genere)
```

## Commandes disponibles

```bash
npm run dev           # Serveur de dev Vite (port 5173)
npm run build         # Build bibliotheque TypeScript + Vite
npm run build:shared  # Build du package shared
npm run build:apps    # Build de toutes les apps
npm run build:all     # Build complet (shared + lib + apps)
npm run build:app     # Assembler app-dist/ pour Tauri
npm run test          # Tests Vitest en watch mode
npm run test:run      # Tests une seule fois
npm run test:coverage # Tests avec couverture
npm run preview       # Preview du build
npm run tauri:dev     # Dev Tauri (app desktop)
npm run tauri:build   # Build Tauri production (build:all + build:app + tauri build)
```

### Dev d'une app individuelle

```bash
npm run dev --workspace=@gouv-widgets/app-builder
npm run dev --workspace=@gouv-widgets/app-builder-ia
npm run dev --workspace=@gouv-widgets/app-dashboard
npm run dev --workspace=@gouv-widgets/app-sources
npm run dev --workspace=@gouv-widgets/app-playground
npm run dev --workspace=@gouv-widgets/app-favorites
```

## Conventions de code

- TypeScript strict mode
- Composants Lit (LitElement, html, css)
- Nommage : `gouv-*` pour les composants publics, `app-*` pour les layouts
- Tests : fichiers `*.test.ts` dans `/tests/`
- Pas d'emoji dans le code sauf demande explicite
- Imports partages via `@gouv-widgets/shared`

## Package shared (@gouv-widgets/shared)

Utilitaires partages entre toutes les apps :
- `escapeHtml()` - Echappement HTML
- `formatKPIValue()`, `formatDateShort()` - Formatage
- `toNumber()`, `looksLikeNumber()` - Parsing numerique
- `isValidDeptCode()` - Validation codes departementaux
- `DSFR_COLORS`, `PALETTE_COLORS` - Palettes DSFR
- `getProxyConfig()`, `getProxiedUrl()` - Configuration proxy
- `loadFromStorage()`, `saveToStorage()`, `STORAGE_KEYS` - localStorage
- `openModal()`, `closeModal()` - Modales DSFR
- `toastWarning()`, `toastSuccess()` - Notifications toast DSFR
- `appHref()`, `navigateTo()` - Navigation inter-apps

## APIs externes utilisees

- Grist : docs.getgrist.com, grist.numerique.gouv.fr
- Albert IA : albert.api.etalab.gouv.fr
- OpenDataSoft : *.opendatasoft.com
- Tabular API : tabular-api.data.gouv.fr

## Proxy

- Dev : Vite proxy (configure dans vite.config.ts de chaque app)
- Production : chartsbuilder.matge.com (nginx)
- Tauri : proxy distant via detection `window.__TAURI__`
- Configurable via `VITE_PROXY_URL`

## Notes importantes

- Les fichiers `.js` dans `/src/` sont des artefacts de build, ne pas les modifier
- Toujours lancer `npm run build` apres modification des composants
- Docker : `docker build -t gouv-widgets . && docker run -p 8080:80 gouv-widgets`
