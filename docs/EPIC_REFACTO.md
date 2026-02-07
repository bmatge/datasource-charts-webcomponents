# EPIC : Refactorisation du repository gouv-widgets

> **Objectif** : Transformer un projet avec des apps HTML monolithiques (JS inline) en une architecture monorepo professionnelle, modulaire et maintenable.

---

## 📋 Résumé exécutif

| Métrique | Avant | Après |
|----------|-------|-------|
| Lignes JS inline | ~7000 | 0 |
| Code dupliqué | ~500 lignes | 0 (factorisé) |
| Couverture tests apps | 0% | >80% |
| TypeScript apps | 0% | 100% |
| Structure | Monolithique | Monorepo modulaire |
| Tauri desktop | Partiel | 100% fonctionnel |
| Proxy | Couplé | Découplé, déployable séparément |

**Charge estimée** : ~90 heures (incluant Tauri + proxy)

---

## 🎯 Objectifs

### Objectifs principaux
1. **Modularité** : Séparer les 5 apps HTML en modules TypeScript indépendants
2. **Réutilisabilité** : Factoriser le code dupliqué dans un package `shared`
3. **Testabilité** : Couverture de tests >80% sur tout le code migré
4. **Maintenabilité** : IDE support complet (autocomplete, refactoring, types)
5. **Qualité** : TypeScript strict, linting, CI/CD

### Objectifs secondaires
- **Tauri 100% fonctionnel** : L'app desktop doit fonctionner sans modification de la logique applicative (pas de hacks ou contournements)
- **Proxy découplé** : Séparer la configuration du proxy (chartsbuilder.matge.com) de l'app builder pour permettre un déploiement autonome sur un autre serveur/domaine
- Améliorer les performances de build (cache Vite)
- Documenter l'architecture
- Faciliter les contributions externes

---

## 🔌 Architecture Proxy (découplée)

### Problématique actuelle
L'app utilise un proxy externe (`chartsbuilder.matge.com`) pour contourner les restrictions CORS des APIs :
- Grist (docs.getgrist.com, grist.numerique.gouv.fr)
- Albert IA (albert.api.etalab.gouv.fr)
- Tabular API (tabular-api.data.gouv.fr)

Ce proxy est actuellement codé en dur dans le code applicatif.

### Architecture cible

```
┌─────────────────────────────────────────────────────────────────┐
│                        APPS (Frontend)                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Builder │ │BuilderIA│ │ Sources │ │Playground│ │Favorites│   │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘   │
│       │           │           │           │           │         │
│       └───────────┴───────────┼───────────┴───────────┘         │
│                               ▼                                  │
│                    ┌──────────────────┐                         │
│                    │  @shared/api     │                         │
│                    │  proxy-config.ts │                         │
│                    └────────┬─────────┘                         │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PROXY SERVER (Backend)                       │
│                                                                  │
│  Déployable indépendamment sur :                                │
│  - chartsbuilder.matge.com (actuel)                             │
│  - proxy.mon-domaine.gouv.fr (futur)                            │
│  - localhost:3000 (dev)                                          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    nginx.conf / Node.js                  │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │  /grist-proxy/*      → https://docs.getgrist.com/*      │    │
│  │  /grist-gouv-proxy/* → https://grist.numerique.gouv.fr/*│    │
│  │  /albert-proxy/*     → https://albert.api.etalab.gouv.fr│    │
│  │  /tabular-proxy/*    → https://tabular-api.data.gouv.fr │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Configuration externalisée

```typescript
// packages/shared/src/api/proxy-config.ts

export interface ProxyConfig {
  baseUrl: string;           // URL du serveur proxy
  endpoints: {
    grist: string;           // /grist-proxy
    gristGouv: string;       // /grist-gouv-proxy
    albert: string;          // /albert-proxy
    tabular: string;         // /tabular-proxy
  };
}

// Configuration par défaut (production)
export const DEFAULT_PROXY_CONFIG: ProxyConfig = {
  baseUrl: 'https://chartsbuilder.matge.com',
  endpoints: {
    grist: '/grist-proxy',
    gristGouv: '/grist-gouv-proxy',
    albert: '/albert-proxy',
    tabular: '/tabular-proxy',
  }
};

// Détection automatique du mode
export function getProxyConfig(): ProxyConfig {
  // Mode Vite dev : utiliser le proxy local
  if (import.meta.env.DEV) {
    return {
      baseUrl: '',  // Relatif, géré par vite.config.ts
      endpoints: { ... }
    };
  }

  // Mode Tauri : utiliser le proxy distant
  if (window.__TAURI__) {
    return DEFAULT_PROXY_CONFIG;
  }

  // Mode production web : configurable via env ou défaut
  return {
    baseUrl: import.meta.env.VITE_PROXY_URL || DEFAULT_PROXY_CONFIG.baseUrl,
    endpoints: { ... }
  };
}
```

### Déploiement du proxy (documentation)

```
/proxy/
├── README.md              # Instructions de déploiement
├── nginx/
│   ├── nginx.conf         # Config Nginx standalone
│   └── docker-compose.yml # Déploiement Docker
└── node/
    ├── server.js          # Alternative Node.js/Express
    └── package.json
```

---

## 📦 Périmètre

### IN SCOPE (inclus)

#### Apps à migrer
| App | Fichier source | Lignes JS | Priorité |
|-----|---------------|-----------|----------|
| Favoris | `favoris.html` | ~300 | 1 (validation) |
| Playground | `playground.html` | ~1200 | 2 |
| Sources | `sources.html` | ~1850 | 3 |
| Builder IA | `builderIA.html` | ~1700 | 4 |
| Builder | `builder.html` | ~2000 | 5 (dernier) |

#### Code à factoriser
| Fonction/Module | Occurrences | Destination |
|-----------------|-------------|-------------|
| `escapeHtml()` | 4 fichiers | `packages/shared/src/utils/escape-html.ts` |
| `formatKPIValue()` | 2 fichiers (×2 chacun) | `packages/shared/src/utils/formatters.ts` |
| `toNumber()` | 2 fichiers | `packages/shared/src/utils/number-parser.ts` |
| `isValidDeptCode()` | 2 fichiers | `packages/shared/src/utils/dept-codes.ts` |
| Palettes DSFR | 2 fichiers | `packages/shared/src/constants/dsfr-palettes.ts` |
| Logique proxy Grist | 2 fichiers | `packages/shared/src/api/proxy.ts` |
| Gestion localStorage | 3 fichiers | `packages/shared/src/storage/local-storage.ts` |
| Modal patterns | 3 fichiers | `packages/shared/src/ui/modal.ts` |

#### Infrastructure
- Setup monorepo (npm workspaces)
- Configuration Vite multi-apps
- Configuration TypeScript partagée
- CI/CD (GitHub Actions)
- Docker adaptation

### OUT OF SCOPE (exclus)

- Migration des composants `/src/components/` (déjà en TypeScript)
- Migration des utilitaires `/src/utils/` (déjà en TypeScript)
- Refonte UI/UX des apps
- Nouvelles fonctionnalités
- Migration vers un autre framework (reste Lit + vanilla TS)

---

## 🏗️ Architecture cible

```
/
├── apps/
│   ├── builder/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── src/
│   │       ├── main.ts
│   │       ├── state.ts
│   │       ├── chart-renderer.ts
│   │       ├── code-generator.ts
│   │       ├── ui/
│   │       │   ├── config-panel.ts
│   │       │   └── preview-panel.ts
│   │       └── styles/
│   │           └── builder.css
│   │
│   ├── builder-ia/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── src/
│   │       ├── main.ts
│   │       ├── state.ts
│   │       ├── chat/
│   │       │   ├── chat-manager.ts
│   │       │   └── message-parser.ts
│   │       ├── ia/
│   │       │   ├── albert-client.ts
│   │       │   └── config-parser.ts
│   │       └── styles/
│   │
│   ├── sources/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── src/
│   │       ├── main.ts
│   │       ├── state.ts
│   │       ├── connections/
│   │       │   ├── connection-manager.ts
│   │       │   ├── grist-explorer.ts
│   │       │   └── api-explorer.ts
│   │       ├── parsers/
│   │       │   ├── csv-parser.ts
│   │       │   └── json-parser.ts
│   │       ├── editors/
│   │       │   └── table-editor.ts
│   │       └── styles/
│   │
│   ├── playground/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── src/
│   │       ├── main.ts
│   │       ├── editor.ts
│   │       ├── examples/
│   │       │   └── examples-data.ts
│   │       ├── preview.ts
│   │       └── styles/
│   │
│   └── favorites/
│       ├── index.html
│       ├── package.json
│       ├── vite.config.ts
│       └── src/
│           ├── main.ts
│           ├── favorites-manager.ts
│           ├── preview.ts
│           └── styles/
│
├── packages/
│   ├── gouv-widgets/          # Existant (inchangé)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── shared/                # NOUVEAU
│       ├── src/
│       │   ├── utils/
│       │   │   ├── escape-html.ts
│       │   │   ├── formatters.ts
│       │   │   ├── number-parser.ts
│       │   │   └── dept-codes.ts
│       │   ├── constants/
│       │   │   └── dsfr-palettes.ts
│       │   ├── api/
│       │   │   ├── proxy.ts
│       │   │   └── grist-client.ts
│       │   ├── storage/
│       │   │   └── local-storage.ts
│       │   ├── ui/
│       │   │   └── modal.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── tests/                     # Tests existants + nouveaux
│   ├── unit/
│   │   ├── shared/           # Tests package shared
│   │   └── apps/             # Tests apps
│   └── e2e/                  # Tests end-to-end (futurs)
│
├── package.json              # Workspace root
├── tsconfig.base.json        # Config TS partagée
├── vite.config.shared.ts     # Config Vite partagée
├── vitest.workspace.ts       # Config tests workspace
└── turbo.json                # (optionnel) Turborepo pour le cache
```

---

## 📝 Phases et tâches

### Phase 0 : Préparation (pré-requis)
- [ ] **0.1** Nettoyer les fichiers `.js` compilés dans `/src/` (ajouter au .gitignore)
- [ ] **0.2** Documenter l'état actuel des tests existants
- [ ] **0.3** Créer une branche `refacto/monorepo`

### Phase 1 : Infrastructure (~9h)

#### 1.1 Setup monorepo
- [ ] **1.1.1** Configurer npm workspaces dans `package.json` racine
- [ ] **1.1.2** Créer `tsconfig.base.json` partagé
- [ ] **1.1.3** Créer structure de dossiers `apps/` et `packages/`

#### 1.2 Package shared
- [ ] **1.2.1** Créer `packages/shared/package.json`
- [ ] **1.2.2** Créer `packages/shared/tsconfig.json`
- [ ] **1.2.3** Créer `packages/shared/vite.config.ts`

#### 1.3 Extraction des utilitaires partagés
- [ ] **1.3.1** Extraire `escapeHtml()` + tests
- [ ] **1.3.2** Extraire `formatKPIValue()` + `formatNumber()` + tests
- [ ] **1.3.3** Extraire `toNumber()` + `looksLikeNumber()` + tests
- [ ] **1.3.4** Extraire `isValidDeptCode()` + tests
- [ ] **1.3.5** Extraire palettes DSFR (`DSFR_COLORS`, `PALETTE_*`) + tests
- [ ] **1.3.6** Extraire logique proxy (`getProxyUrl()`, `isViteDevMode()`) + tests
- [ ] **1.3.7** Extraire helpers localStorage + tests

#### 1.4 Configuration proxy découplée
- [ ] **1.4.1** Créer `packages/shared/src/api/proxy-config.ts` avec config externalisée
- [ ] **1.4.2** Implémenter détection automatique du mode (dev/prod/Tauri)
- [ ] **1.4.3** Rendre l'URL du proxy configurable via `VITE_PROXY_URL`
- [ ] **1.4.4** Créer `/proxy/README.md` avec instructions de déploiement standalone
- [ ] **1.4.5** Créer `/proxy/nginx/nginx.conf` pour déploiement Nginx indépendant
- [ ] **1.4.6** Créer `/proxy/nginx/docker-compose.yml` pour déploiement Docker
- [ ] **1.4.7** Tests : proxy config fonctionne en mode dev
- [ ] **1.4.8** Tests : proxy config fonctionne en mode production
- [ ] **1.4.9** Tests : proxy config fonctionne en mode Tauri

#### 1.6 Validation Phase 1
- [ ] **1.6.1** Tous les tests passent
- [ ] **1.6.2** Build du package shared fonctionne
- [ ] **1.6.3** Le package est importable
- [ ] **1.6.4** Proxy config fonctionne dans les 3 modes (dev/prod/Tauri)

---

### Phase 2 : Migration des apps (~48h)

> ⚠️ **RÈGLE CRITIQUE** : Avant chaque migration d'app, suivre ce processus :
>
> 1. **Écrire les tests** pour le code existant (HTML inline) SI ils n'existent pas
> 2. **Valider** que tous les tests passent sur le code actuel
> 3. **Migrer** le code vers TypeScript
> 4. **Valider** que tous les tests passent après migration
> 5. **Merger** seulement si 100% des tests passent

#### 2.1 App Favorites (~3h) — VALIDATION DU SETUP
```
Ordre: Tests → Migration → Validation
```

##### 2.1.0 Tests pré-migration
- [ ] **2.1.0.1** Identifier les fonctions à tester dans `favoris.html`
- [ ] **2.1.0.2** Écrire tests unitaires : `tests/apps/favorites/favorites-manager.test.ts`
- [ ] **2.1.0.3** Écrire tests unitaires : `tests/apps/favorites/preview.test.ts`
- [ ] **2.1.0.4** Valider que les tests passent (contre le code inline extrait temporairement)

##### 2.1.1 Migration
- [ ] **2.1.1.1** Créer structure `apps/favorites/`
- [ ] **2.1.1.2** Extraire JS vers `src/main.ts`
- [ ] **2.1.1.3** Extraire CSS vers `src/styles/`
- [ ] **2.1.1.4** Convertir en TypeScript
- [ ] **2.1.1.5** Importer depuis `@gouv-widgets/shared`
- [ ] **2.1.1.6** Créer `index.html` minimal

##### 2.1.2 Validation post-migration
- [ ] **2.1.2.1** Tous les tests unitaires passent
- [ ] **2.1.2.2** L'app fonctionne manuellement (test visuel)
- [ ] **2.1.2.3** Build production fonctionne

---

#### 2.2 App Playground (~6h)

##### 2.2.0 Tests pré-migration
- [ ] **2.2.0.1** Identifier les fonctions à tester dans `playground.html`
- [ ] **2.2.0.2** Écrire tests : `tests/apps/playground/editor.test.ts`
- [ ] **2.2.0.3** Écrire tests : `tests/apps/playground/examples.test.ts`
- [ ] **2.2.0.4** Écrire tests : `tests/apps/playground/preview.test.ts`
- [ ] **2.2.0.5** Valider que les tests passent

##### 2.2.1 Migration
- [ ] **2.2.1.1** Créer structure `apps/playground/`
- [ ] **2.2.1.2** Extraire et convertir le code
- [ ] **2.2.1.3** Gérer l'intégration CodeMirror
- [ ] **2.2.1.4** Extraire les exemples dans `examples-data.ts`

##### 2.2.2 Validation post-migration
- [ ] **2.2.2.1** Tests unitaires passent
- [ ] **2.2.2.2** Test manuel : exemples fonctionnent
- [ ] **2.2.2.3** Test manuel : preview fonctionne
- [ ] **2.2.2.4** Build production OK

---

#### 2.3 App Sources (~12h)

##### 2.3.0 Tests pré-migration
- [ ] **2.3.0.1** Tests : `tests/apps/sources/connection-manager.test.ts`
- [ ] **2.3.0.2** Tests : `tests/apps/sources/grist-explorer.test.ts`
- [ ] **2.3.0.3** Tests : `tests/apps/sources/api-explorer.test.ts`
- [ ] **2.3.0.4** Tests : `tests/apps/sources/csv-parser.test.ts`
- [ ] **2.3.0.5** Tests : `tests/apps/sources/json-parser.test.ts`
- [ ] **2.3.0.6** Tests : `tests/apps/sources/table-editor.test.ts`
- [ ] **2.3.0.7** Valider que les tests passent

##### 2.3.1 Migration
- [ ] **2.3.1.1** Créer structure `apps/sources/`
- [ ] **2.3.1.2** Migrer gestion des connexions
- [ ] **2.3.1.3** Migrer explorateur Grist
- [ ] **2.3.1.4** Migrer explorateur API
- [ ] **2.3.1.5** Migrer parsers CSV/JSON
- [ ] **2.3.1.6** Migrer éditeur de tableau
- [ ] **2.3.1.7** Migrer gestion sources/favoris

##### 2.3.2 Validation post-migration
- [ ] **2.3.2.1** Tests unitaires passent
- [ ] **2.3.2.2** Test manuel : connexion Grist
- [ ] **2.3.2.3** Test manuel : import CSV
- [ ] **2.3.2.4** Test manuel : import JSON
- [ ] **2.3.2.5** Test manuel : saisie manuelle
- [ ] **2.3.2.6** Build production OK

---

#### 2.4 App Builder IA (~12h)

##### 2.4.0 Tests pré-migration
- [ ] **2.4.0.1** Tests : `tests/apps/builder-ia/chat-manager.test.ts`
- [ ] **2.4.0.2** Tests : `tests/apps/builder-ia/message-parser.test.ts`
- [ ] **2.4.0.3** Tests : `tests/apps/builder-ia/albert-client.test.ts`
- [ ] **2.4.0.4** Tests : `tests/apps/builder-ia/config-parser.test.ts`
- [ ] **2.4.0.5** Tests : `tests/apps/builder-ia/chart-renderer.test.ts`
- [ ] **2.4.0.6** Tests : `tests/apps/builder-ia/code-generator.test.ts`
- [ ] **2.4.0.7** Valider que les tests passent

##### 2.4.1 Migration
- [ ] **2.4.1.1** Créer structure `apps/builder-ia/`
- [ ] **2.4.1.2** Migrer logique de chat
- [ ] **2.4.1.3** Migrer client Albert API
- [ ] **2.4.1.4** Migrer parsing des réponses IA
- [ ] **2.4.1.5** Migrer génération de graphiques
- [ ] **2.4.1.6** Migrer génération de code

##### 2.4.2 Validation post-migration
- [ ] **2.4.2.1** Tests unitaires passent
- [ ] **2.4.2.2** Test manuel : chat avec Albert
- [ ] **2.4.2.3** Test manuel : génération graphique
- [ ] **2.4.2.4** Build production OK

---

#### 2.5 App Builder (~15h)

##### 2.5.0 Tests pré-migration
- [ ] **2.5.0.1** Tests : `tests/apps/builder/state.test.ts`
- [ ] **2.5.0.2** Tests : `tests/apps/builder/source-loader.test.ts`
- [ ] **2.5.0.3** Tests : `tests/apps/builder/chart-renderer.test.ts`
- [ ] **2.5.0.4** Tests : `tests/apps/builder/code-generator.test.ts`
- [ ] **2.5.0.5** Tests : `tests/apps/builder/code-generator-dynamic.test.ts`
- [ ] **2.5.0.6** Tests : `tests/apps/builder/code-generator-local.test.ts`
- [ ] **2.5.0.7** Tests : `tests/apps/builder/aggregations.test.ts`
- [ ] **2.5.0.8** Valider que les tests passent

##### 2.5.1 Migration
- [ ] **2.5.1.1** Créer structure `apps/builder/`
- [ ] **2.5.1.2** Migrer state management
- [ ] **2.5.1.3** Migrer chargement des sources
- [ ] **2.5.1.4** Migrer configuration des graphiques
- [ ] **2.5.1.5** Migrer rendu des graphiques
- [ ] **2.5.1.6** Migrer génération de code (embedded)
- [ ] **2.5.1.7** Migrer génération de code (dynamic)
- [ ] **2.5.1.8** Migrer mode avancé (gouv-query)

##### 2.5.2 Validation post-migration
- [ ] **2.5.2.1** Tests unitaires passent
- [ ] **2.5.2.2** Test manuel : tous types de graphiques
- [ ] **2.5.2.3** Test manuel : mode embedded
- [ ] **2.5.2.4** Test manuel : mode dynamic
- [ ] **2.5.2.5** Test manuel : mode avancé
- [ ] **2.5.2.6** Build production OK

---

### Phase 3 : Finalisation (~14h)

#### 3.1 Configuration build
- [ ] **3.1.1** Configurer Vite pour build multi-apps
- [ ] **3.1.2** Configurer output paths pour compatibilité URLs
- [ ] **3.1.3** Créer scripts npm pour build global

#### 3.2 Redirects et compatibilité
- [ ] **3.2.1** Configurer redirects (anciens URLs → nouveaux)
- [ ] **3.2.2** Mettre à jour `index.html` hub
- [ ] **3.2.3** Tester tous les liens internes

#### 3.3 CI/CD
- [ ] **3.3.1** Créer/adapter GitHub Actions workflow
- [ ] **3.3.2** Ajouter job de tests
- [ ] **3.3.3** Ajouter job de build
- [ ] **3.3.4** Ajouter job de déploiement

#### 3.4 Docker
- [ ] **3.4.1** Adapter Dockerfile pour monorepo
- [ ] **3.4.2** Tester build Docker
- [ ] **3.4.3** Tester docker-compose

#### 3.5 Documentation
- [ ] **3.5.1** Mettre à jour README
- [ ] **3.5.2** Documenter l'architecture dans `/docs/`
- [ ] **3.5.3** Ajouter CONTRIBUTING.md

#### 3.6 Tests E2E
- [ ] **3.6.1** Setup Playwright ou Cypress
- [ ] **3.6.2** Tests E2E : navigation entre apps
- [ ] **3.6.3** Tests E2E : workflow complet (source → builder → export)

#### 3.7 Tauri (app desktop)
> ⚠️ **RÈGLE** : L'app Tauri doit fonctionner SANS modification de la logique applicative.
> Pas de hacks, pas de contournements, pas de code spécifique Tauri dans la logique métier.

- [ ] **3.7.1** Adapter `src-tauri/tauri.conf.json` pour la nouvelle structure monorepo
- [ ] **3.7.2** Mettre à jour `scripts/build-app.js` pour copier les apps depuis `/apps/`
- [ ] **3.7.3** Configurer le proxy-config pour détecter le mode Tauri (`window.__TAURI__`)
- [ ] **3.7.4** Vérifier que les APIs externes fonctionnent via le proxy distant
- [ ] **3.7.5** Test : `npm run tauri:dev` démarre correctement
- [ ] **3.7.6** Test : navigation entre toutes les apps dans Tauri
- [ ] **3.7.7** Test : chargement de données depuis Grist (via proxy)
- [ ] **3.7.8** Test : chat Albert IA (via proxy)
- [ ] **3.7.9** Test : génération de graphiques
- [ ] **3.7.10** Test : export de code
- [ ] **3.7.11** Test : gestion des favoris (localStorage)
- [ ] **3.7.12** Build production : `npm run tauri:build`
- [ ] **3.7.13** Test : app packagée fonctionne sur macOS
- [ ] **3.7.14** Test : app packagée fonctionne sur Windows (si applicable)
- [ ] **3.7.15** Documenter le process de build Tauri

#### 3.8 Validation finale
- [ ] **3.8.1** Toutes les apps fonctionnent en mode web (dev)
- [ ] **3.8.2** Toutes les apps fonctionnent en mode web (production)
- [ ] **3.8.3** Toutes les apps fonctionnent en mode Tauri
- [ ] **3.8.4** Le proxy peut être déployé indépendamment
- [ ] **3.8.5** La documentation est complète

---

## 🔄 Processus de migration (à suivre pour chaque app)

```
┌─────────────────────────────────────────────────────────────┐
│                    PROCESSUS DE MIGRATION                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. TESTS PRÉ-MIGRATION                                     │
│     ├── Identifier toutes les fonctions du fichier HTML    │
│     ├── Écrire les tests unitaires                         │
│     ├── Extraire temporairement le JS pour le tester       │
│     └── ✅ Valider : tous les tests passent                │
│                                                             │
│  2. MIGRATION                                               │
│     ├── Créer la structure apps/{app-name}/                │
│     ├── Extraire le JS vers src/                           │
│     ├── Convertir en TypeScript                            │
│     ├── Remplacer le code dupliqué par imports @shared     │
│     └── Créer index.html minimal                           │
│                                                             │
│  3. VALIDATION POST-MIGRATION                               │
│     ├── ✅ Tests unitaires passent                         │
│     ├── ✅ Test manuel : l'app fonctionne                  │
│     ├── ✅ Build production fonctionne                     │
│     └── ✅ Pas de régression                               │
│                                                             │
│  4. MERGE                                                   │
│     └── Seulement si 100% des validations passent          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚠️ Risques et mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Régression fonctionnelle | Moyenne | Élevé | Tests pré/post migration obligatoires |
| Perte de fonctionnalité | Faible | Élevé | Tests manuels systématiques |
| Conflits de state | Moyenne | Moyen | Garder le pattern actuel initialement |
| URLs cassées | Faible | Moyen | Redirects + tests de liens |
| Performance dégradée | Faible | Moyen | Benchmarks avant/après |

---

## 📊 Métriques de succès

### Obligatoires (bloquants)
- [ ] 0 régression fonctionnelle
- [ ] 100% des tests passent
- [ ] Toutes les apps fonctionnent en mode web
- [ ] **Tauri 100% fonctionnel** (sans hack ni contournement)
- [ ] **Proxy déployable indépendamment** (documentation + config)
- [ ] Build production OK
- [ ] Docker OK

### Souhaitées
- [ ] Couverture tests >80%
- [ ] 0 code dupliqué
- [ ] Temps de build < 30s
- [ ] Bundle size équivalent ou inférieur
- [ ] Proxy testable en local (docker-compose up)

---

## 📅 Planning indicatif

| Semaine | Phase | Livrables |
|---------|-------|-----------|
| S1 | Phase 0 + Phase 1 | Infrastructure + package shared |
| S2 | Phase 2.1 + 2.2 | Apps favorites + playground |
| S3 | Phase 2.3 | App sources |
| S4 | Phase 2.4 | App builder-ia |
| S5 | Phase 2.5 | App builder |
| S6 | Phase 3 | Finalisation + docs + CI/CD |

---

## 📝 Notes

- Ce document est la référence unique pour la refactorisation
- Cocher les cases au fur et à mesure de l'avancement
- En cas de blocage, documenter dans la section correspondante
- Les estimations de temps sont indicatives

---

*Dernière mise à jour : 2025-02-07*
