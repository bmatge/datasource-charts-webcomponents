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
│   ├── dashboard/           # Editeur visuel de tableaux de bord (grille par ligne, preview, save/delete)
│   ├── sources/             # Gestionnaire de sources de donnees
│   ├── playground/          # Environnement de code interactif
│   ├── favorites/           # Gestion des favoris
│   └── monitoring/          # Monitoring et logs
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
npm run dev --workspace=@gouv-widgets/app-monitoring
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

## Skills builder-IA (alignement composants)

Le builder-IA (`apps/builder-ia/`) utilise un systeme de skills : des blocs de connaissances injectes dans le prompt de l'IA selon le contexte. Les skills sont definis dans `apps/builder-ia/src/skills.ts`.

**Regle importante** : quand on ajoute/modifie un attribut, un type de graphique, un operateur de filtre ou une fonction d'agregation dans un composant `gouv-*`, il faut mettre a jour le skill correspondant dans `skills.ts`.

Les tests d'alignement dans `tests/apps/builder-ia/skills.test.ts` verifient automatiquement que :
- Chaque attribut HTML d'un composant est documente dans son skill (via introspection Lit `elementProperties`)
- Tous les types de graphiques, operateurs de filtre et fonctions d'agregation sont couverts
- Chaque composant data a un skill correspondant

Si un attribut est ajoute a un composant sans maj du skill, le test echouera.

## Release Tauri

La release est declenchee par un tag git :
```bash
git tag v0.2.0
git push origin v0.2.0
```
Le workflow `.github/workflows/release.yml` build automatiquement sur macOS (ARM + x86), Linux (deb + AppImage) et Windows (NSIS + MSI).

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

## Beacon de tracking

Chaque composant `gouv-*` envoie un beacon fire-and-forget a l'initialisation (`connectedCallback`) via `sendWidgetBeacon()` dans `src/utils/beacon.ts`. Le beacon transmet le nom du composant et le type de graphique au proxy nginx qui les enregistre dans `beacon.log`. Un script periodique (`scripts/parse-beacon-logs.sh`) transforme ces logs en `monitoring-data.json` consomme par l'app monitoring.

- Deduplication par `Set` en memoire (1 beacon par composant+type par page)
- Skip en dev (localhost/127.0.0.1)
- Utilise `fetch()` avec `mode: 'no-cors'` (pas `navigator.sendBeacon()` qui cause des erreurs CORS)

## Build : esbuild keepNames

Le `vite.config.ts` contient `esbuild: { keepNames: true }`. Cette option est **obligatoire** :
sans elle, esbuild supprime les methodes privees non-decorees des prototypes de classes Lit
lors de la minification (ex: `_processMapData`, `_createChartElement`), ce qui casse le
fonctionnement des composants en production. Overhead negligeable (~2 Ko).

## DSFR Chart : attributs differes (deferred)

Les composants DSFR Chart (`map-chart`, `map-chart-reg`) sont des Web Components Vue qui
ecrasent certains attributs (`value`, `date`) avec leurs valeurs par defaut lors du montage Vue.
`gouv-dsfr-chart` utilise un mecanisme de `setTimeout(500ms)` pour re-appliquer ces attributs
apres le montage Vue (voir `_createChartElement` dans `src/components/gouv-dsfr-chart.ts`).

Si un nouveau composant DSFR Chart presente le meme comportement, ajouter les attributs
concernes dans l'objet `deferred` retourne par `_getTypeSpecificAttributes()`.

## Tauri : zoom par defaut

L'app desktop Tauri applique un zoom de 80% au demarrage via `window.set_zoom(0.8)` dans
`src-tauri/src/lib.rs`. Cela permet d'afficher plus de contenu dans la fenetre sans
modifier le CSS des composants. Le zoom est applique cote Rust dans le hook `setup`.

## Communication inter-apps (sessionStorage)

Les builders et les favoris envoient du code au playground via `sessionStorage` :
1. L'app source stocke le code dans `sessionStorage.setItem('playground-code', code)`
2. Elle navigue vers le playground avec un parametre `?from=builder` (ou `builder-ia`, `favorites`)
3. Le playground lit le parametre `from`, charge le code depuis sessionStorage, et le supprime

Le parametre `from` doit etre l'un de : `builder`, `builder-ia`, `favorites`.

## Notes importantes

- Les fichiers `.js` dans `/src/` sont des artefacts de build, ne pas les modifier
- Toujours lancer `npm run build` apres modification des composants
- Docker : `docker compose up -d --build` (utilise un volume `beacon-logs` pour persister les donnees de monitoring entre redemarrages)
