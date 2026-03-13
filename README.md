# gouv-widgets

Bibliotheque de Web Components pour integrer des graphiques dynamiques, accessibles et conformes DSFR dans les sites gouvernementaux francais. Voir la [fiche produit](roadmap/DATASHEET.md) pour le positionnement detaille.

## Le probleme

Les sites gouvernementaux illustrent leurs donnees avec des captures d'ecran Excel, des infographies statiques ou des donnees saisies manuellement dans le CMS. Le resultat est non accessible, non interactif et difficile a maintenir.

Les plateformes BI (Metabase, Superset, Chartsgouv) repondent a un autre besoin : exploration de donnees, reporting interne, publication de dashboards autonomes. Elles ne proposent pas de solution simple pour **embarquer un graphique directement dans une page web existante** -- leur modele repose sur l'iframe, isole du DOM de la page (pas d'heritage CSS, pas d'accessibilite unifiee, pas de responsive naturel).

## La solution

gouv-widgets resout le **dernier kilometre** : permettre a un agent public non technique de transformer une donnee ouverte en graphique conforme, accessible et dynamique, embarque dans son site, **sans plateforme, sans developpeur, sans infra**.

Le projet s'articule en **deux volets independants** :

### Volet 1 -- Composants web (pour developpeurs et integrateurs)

Des balises HTML `<gouv-*>` qui s'enchainent pour former un pipeline de donnees declaratif :

```
Source de donnees -> Nettoyage -> Requetage -> Visualisation
```

- **Zero JavaScript a ecrire** -- tout se configure via des attributs HTML
- **Agnostique** -- fonctionne dans Drupal, WordPress, page statique, React, Vue, Angular
- **Un seul fichier a charger** -- ~50 Ko gzippe
- **Connecteurs integres** -- OpenDataSoft, Tabular API (data.gouv.fr), Grist, INSEE Melodi, toute API REST
- **DSFR-natif** -- utilise [DSFR Chart](https://github.com/GouvernementFR/dsfr-chart), la bibliotheque officielle du Design System de l'Etat
- **Accessible par defaut** -- conforme RGAA/WCAG 2 AA
- **Open source** -- MIT, mutualisable entre administrations

### Volet 2 -- Applications de creation (pour non-developpeurs)

Une suite d'outils web pour **generer le code HTML du volet 1 sans le connaitre** : builder visuel pas-a-pas, builder IA par conversation, playground interactif, editeur de tableaux de bord. La cible : les redacteurs web et communicants qui illustrent des articles avec des donnees publiques.

## A qui ca s'adresse

- **Redacteurs web / communicants** -- creer des graphiques via les builders, copier-coller le code dans le CMS
- **Integrateurs web** -- embarquer des graphiques dynamiques en quelques lignes de HTML
- **Producteurs de donnees** -- valoriser des jeux de donnees open data par des visualisations interactives

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
| `gouv-chart-a11y` | Companion d'accessibilite unifie (tableau, CSV, description) |

Les composants se chainent de facon declarative :

```
gouv-source -> gouv-normalize -> gouv-query -> gouv-dsfr-chart / gouv-kpi / gouv-datalist / gouv-display / gouv-world-map
                                             -> gouv-facets / gouv-search (filtres interactifs)
                                             -> gouv-chart-a11y (accessibilite : tableau, CSV, description)
```

## Utilisation

### Integration via CDN

```html
<!-- DSFR -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<!-- DSFR Chart -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"></script>
<!-- gouv-widgets (remplacer par l'URL de votre instance) -->
<script type="module" src="https://<votre-domaine>/dist/gouv-widgets.esm.js"></script>
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
├── proxy/               # Proxy CORS autonome (nginx) deployable independamment
├── mcp-server/          # Serveur MCP pour connecteurs IA (Claude, etc.)
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
| INSEE Melodi | api.insee.fr/melodi | Catalogue de donnees INSEE |

## Proxy CORS

Les APIs externes n'autorisent pas toutes les appels cross-origin. Un proxy CORS est necessaire en production.

**Trois modes, determines automatiquement :**

| Mode | Detection | Proxy | Configuration |
|------|-----------|-------|---------------|
| **Developpement** | `localhost` avec port non-standard | Proxy Vite integre (`vite.config.ts`) | Aucune |
| **Production** | Par defaut | Proxy nginx externe | `VITE_PROXY_URL` |
| **Tauri** | `window.__TAURI__` | Proxy nginx externe | Idem production |

**Routes du proxy :**

| Route | API cible | Usage |
|-------|-----------|-------|
| `/grist-proxy/` | docs.getgrist.com | Grist SaaS (community) |
| `/grist-gouv-proxy/` | grist.numerique.gouv.fr | Grist instance souveraine |
| `/albert-proxy/` | albert.api.etalab.gouv.fr | IA Albert (DINUM) |
| `/tabular-proxy/` | tabular-api.data.gouv.fr | Tabular API data.gouv.fr |
| `/ia-proxy` | URL dynamique (header `X-Target-URL`) | Proxy generique IA |
| `/cors-proxy/` | URL dynamique | Proxy CORS generique |

Le proxy peut aussi etre deploye seul (sans le frontend) -- voir [proxy/README.md](proxy/README.md).

## Deploiement

### Variables d'environnement

Copier `.env.example` en `.env` et adapter :

```bash
cp .env.example .env
```

| Variable | Portee | Description | Defaut |
|----------|--------|-------------|--------|
| `APP_DOMAIN` | Docker / scripts | Nom de domaine de production (Traefik) | `chartsbuilder.matge.com` |
| `VITE_PROXY_URL` | Build frontend | URL du proxy CORS pour la production | `https://${APP_DOMAIN}` |
| `JWT_SECRET` | Serveur (mode DB) | Cle de signature des tokens JWT | Auto-genere |
| `VITE_ALBERT_API_KEY` | Build frontend | Token API Albert pour le Builder IA | -- |

`VITE_PROXY_URL` est la variable cle pour le deploiement sur un nouveau domaine. Elle est injectee au build time par Vite et determine :

- L'URL de base du proxy CORS pour les appels API
- L'URL du fichier JS de la bibliotheque dans le code genere par les builders
- L'URL du beacon de tracking des widgets deployes

### Deploiement Docker (recommande)

**Pre-requis** : Docker, Docker Compose, et un reverse proxy TLS (Traefik, Caddy, nginx).

```bash
# 1. Configurer le domaine
cp .env.example .env
# Editer .env : APP_DOMAIN=mon-domaine.gouv.fr
#               VITE_PROXY_URL=https://mon-domaine.gouv.fr

# 2. Build et lancement
docker compose up -d --build
```

Le conteneur expose le port 80. Le fichier `docker-compose.yml` inclut des labels Traefik preconfigures (HTTPS, redirection, TLS Let's Encrypt). Si vous utilisez un autre reverse proxy, retirez les labels Traefik et configurez votre propre termineur TLS.

Deux modes de deploiement :

| Mode | Script | Stockage | Auth |
|------|--------|----------|------|
| **Statique** | `./deploy.sh` | localStorage (client) | Non |
| **Serveur** | `./deploy-server.sh` | SQLite (serveur) | JWT |

Le mode statique convient pour un usage mono-utilisateur ou en interne. Le mode serveur ajoute l'authentification et le stockage centralise.

### Deploiement sur un nouveau domaine -- checklist

1. **DNS** : Faire pointer le domaine vers le serveur
2. **`.env`** : Definir `APP_DOMAIN` et `VITE_PROXY_URL`
3. **TLS** : Configurer le certificat (Let's Encrypt via Traefik, ou autre)
4. **Build** : `docker compose up -d --build` (le build injecte `VITE_PROXY_URL`)
5. **CSP** : Si des widgets sont deployes sur des sites tiers, les domaines sources doivent autoriser `connect-src` vers votre proxy
6. **Beacon** : Les widgets deployes envoient un pixel de tracking vers `<votre-domaine>/beacon` -- la route est configuree dans `nginx.conf`
7. **MCP** : Le serveur MCP est accessible sur `<votre-domaine>/mcp` pour les connecteurs IA

### Deploiement du proxy seul

Si vous n'avez besoin que du proxy CORS (sans le frontend) :

```bash
cd proxy/nginx
docker compose up -d
```

Voir [proxy/README.md](proxy/README.md) pour la configuration detaillee.

### Build sans Docker

```bash
# 1. Configurer l'URL du proxy
export VITE_PROXY_URL=https://mon-domaine.gouv.fr

# 2. Build complet
npm run build:all

# 3. Assembler pour production
node scripts/build-app.js

# 4. Servir app-dist/ avec nginx ou tout autre serveur statique
#    Utiliser nginx.conf comme reference pour la configuration du proxy
```

## Documentation

- [Guide utilisateur](guide/USER-GUIDE.md) -- Parcours, exemples, reference des composants
- [Architecture](guide/architecture.md) -- Architecture technique detaillee
- [Contribuer](guide/CONTRIBUTING.md) -- Guide de contribution
- [Proxy CORS](proxy/README.md) -- Deploiement du proxy seul

## Licence

MIT
