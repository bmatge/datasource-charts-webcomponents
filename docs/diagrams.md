# Diagrammes d'architecture -- gouv-widgets

## 1. Fonctionnement d'un graphique dynamique (avec API)

Ce diagramme montre le parcours complet des donnees depuis l'API externe jusqu'au graphique rendu sur le site hote, en passant par la couche proxy.

```mermaid
flowchart TB
    subgraph SITE_HOTE["Site hote (gouv.fr, collectivite, etc.)"]
        direction TB
        HTML["Page HTML<br/><small>Inclut gouv-widgets.esm.js via CDN ou bundle</small>"]

        subgraph COMPOSANTS["Web Components gouv-widgets"]
            direction TB
            SRC["&lt;gouv-source&gt;<br/><small>url='proxy/api/...'<br/>transform='results.records'<br/>refresh='60'</small>"]
            NORM["&lt;gouv-normalize&gt;<br/><small>source='raw'<br/>numeric='population'<br/>rename='nom:Ville'</small>"]
            QUERY["&lt;gouv-query&gt;<br/><small>source='clean'<br/>group-by='region'<br/>aggregate='population:sum'</small>"]
            CHART["&lt;gouv-dsfr-chart&gt;<br/><small>source='stats'<br/>type='bar'<br/>label-field='region'<br/>value-field='population__sum'</small>"]
        end

        RENDU["Graphique DSFR rendu<br/><small>bar-chart / line-chart / pie-chart / map-chart</small>"]
    end

    subgraph PROXY["Couche Proxy (contournement CORS)"]
        direction TB

        subgraph DEV["Dev (localhost:5173)"]
            VITE["Vite dev server<br/><small>proxy inverse configure<br/>dans vite.config.ts</small>"]
        end

        subgraph PROD["Production"]
            NGINX["nginx<br/><small>chartsbuilder.matge.com<br/>ou VITE_PROXY_URL</small>"]
            NGINX_DETAIL["<small>- CORS headers ajoutes<br/>- Cache GET 60s<br/>- OPTIONS pre-flight gere<br/>- Origin/Referer supprimes</small>"]
        end

        subgraph TAURI_PROXY["Tauri (desktop)"]
            TAURI_P["Proxy distant<br/><small>Detecte via window.__TAURI__<br/>Utilise le proxy production</small>"]
        end

        DETECT["getProxyConfig()<br/><small>Detection auto de l'environnement</small>"]
    end

    subgraph APIS["APIs externes"]
        direction TB
        ODS["OpenDataSoft<br/><small>*.opendatasoft.com<br/>API v2.1 + ODSQL</small>"]
        TABULAR["Tabular API<br/><small>tabular-api.data.gouv.fr<br/>data.gouv.fr datasets</small>"]
        GRIST["Grist<br/><small>docs.getgrist.com<br/>grist.numerique.gouv.fr</small>"]
        OTHER_API["Autre API REST<br/><small>via /api-proxy<br/>+ header X-Target-URL</small>"]
    end

    subgraph BEACON_BLOCK["Tracking (beacon)"]
        BEACON["sendWidgetBeacon()<br/><small>fetch no-cors vers<br/>/beacon?c=gouv-dsfr-chart&t=bar</small>"]
        BEACON_LOG["beacon.log<br/><small>nginx return 204</small>"]
        MONITORING["App Monitoring<br/><small>monitoring-data.json</small>"]
    end

    %% Flux principal
    HTML --> SRC
    SRC -->|"fetch() via proxy"| DETECT
    DETECT -->|"localhost"| VITE
    DETECT -->|"production"| NGINX
    DETECT -->|"__TAURI__"| TAURI_P
    NGINX --- NGINX_DETAIL

    VITE -->|"/grist-proxy/*"| GRIST
    VITE -->|"/tabular-proxy/*"| TABULAR
    VITE -->|"/api-proxy/*"| OTHER_API
    NGINX --> ODS
    NGINX --> TABULAR
    NGINX --> GRIST
    NGINX --> OTHER_API
    TAURI_P --> NGINX

    ODS -->|"JSON response"| PROXY
    TABULAR -->|"JSON response"| PROXY
    GRIST -->|"JSON response"| PROXY

    SRC -->|"gouv-data-loaded"| NORM
    NORM -->|"gouv-data-loaded"| QUERY
    QUERY -->|"gouv-data-loaded"| CHART
    CHART --> RENDU

    %% Beacon
    SRC -.->|"connectedCallback"| BEACON
    CHART -.->|"connectedCallback"| BEACON
    BEACON -.-> BEACON_LOG
    BEACON_LOG -.->|"parse-beacon-logs.sh"| MONITORING

    %% Styles
    classDef site fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef proxy fill:#fff3e0,stroke:#e65100,color:#bf360c
    classDef api fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
    classDef beacon fill:#f3e5f5,stroke:#6a1b9a,color:#4a148c
    classDef component fill:#e8eaf6,stroke:#283593,color:#1a237e

    class SITE_HOTE site
    class PROXY proxy
    class APIS api
    class BEACON_BLOCK beacon
    class COMPOSANTS component
```

---

## 2. Chainages des composants gouv-*

Ce diagramme montre comment les differents composants s'enchainent, leur role, et les mecanismes de communication (events, data-bridge, commands).

```mermaid
flowchart TB
    subgraph LEGENDE["Legende"]
        direction LR
        L_INVIS["Composant invisible<br/>(pas de rendu DOM)"]
        L_VISU["Composant visuel<br/>(rendu DSFR)"]
        L_EVENT["--- evenement data-bridge"]
        L_CMD["-.- commande upstream"]
        style L_INVIS fill:#fff9c4,stroke:#f9a825
        style L_VISU fill:#c8e6c9,stroke:#2e7d32
    end

    subgraph DATA_BRIDGE["data-bridge.ts -- Bus d'evenements"]
        direction LR
        CACHE["dataCache<br/><small>Map&lt;sourceId, data[]&gt;</small>"]
        META["metaCache<br/><small>Map&lt;sourceId, {page, total, pageSize}&gt;</small>"]
        EVENTS["CustomEvents sur document<br/><small>gouv-data-loaded<br/>gouv-data-loading<br/>gouv-data-error<br/>gouv-source-command</small>"]
    end

    subgraph PIPELINE["Pipeline de donnees"]
        direction TB

        subgraph SOURCES["Etape 1 : Acquisition"]
            direction TB
            SRC["gouv-source<br/><small>Composant invisible</small>"]
            SRC_DETAIL["<small>- Fetch HTTP (GET/POST)<br/>- Headers + auth<br/>- Pagination serveur (paginate)<br/>- JSON path (transform)<br/>- Auto-refresh (refresh)<br/>- Cache data-bridge</small>"]
            SRC --- SRC_DETAIL
        end

        subgraph NORMALISATION["Etape 2 : Normalisation"]
            direction TB
            NORM["gouv-normalize<br/><small>Composant invisible</small>"]
            NORM_DETAIL["<small>- flatten (objets imbriques)<br/>- numeric / numeric-auto<br/>- rename (champ:NouveauNom)<br/>- trim, strip-html<br/>- lowercase-keys<br/>- replace</small>"]
            NORM --- NORM_DETAIL
        end

        subgraph REQUETAGE["Etape 3 : Requetage / Aggregation"]
            direction TB
            QUERY["gouv-query<br/><small>Composant invisible</small>"]
            QUERY_DETAIL["<small>- filter (champ:operateur:valeur)<br/>- group-by + aggregate<br/>- order-by, limit<br/>- Mode serveur (server-side)<br/>- 3 adapters : Generic, ODS, Tabular</small>"]
            QUERY --- QUERY_DETAIL

            subgraph ADAPTERS["Adapters API"]
                direction LR
                GENERIC["GenericAdapter<br/><small>Client-side<br/>Pas de fetch</small>"]
                ODS_A["OpenDataSoftAdapter<br/><small>ODSQL natif<br/>Facets serveur<br/>Pagination serveur</small>"]
                TAB_A["TabularAdapter<br/><small>data.gouv.fr<br/>Fetch serveur<br/>Pas de facets serveur</small>"]
            end
            QUERY --> ADAPTERS
        end

        subgraph FILTRAGE["Etape 4 : Filtres interactifs (optionnel)"]
            direction TB
            SEARCH["gouv-search<br/><small>Composant VISUEL</small>"]
            SEARCH_DETAIL["<small>- Barre de recherche DSFR<br/>- Modes : contains, starts, words<br/>- Client ou server-search<br/>- Debounce configurable<br/>- URL sync<br/>- Compteur de resultats</small>"]
            SEARCH --- SEARCH_DETAIL

            FACETS["gouv-facets<br/><small>Composant VISUEL</small>"]
            FACETS_DETAIL["<small>- Filtres a facettes (checkboxes)<br/>- Client ou server-facets<br/>- Disjonctif (OR) / conjonctif (AND)<br/>- Tri : count, alpha<br/>- Max valeurs + 'voir plus'<br/>- URL sync</small>"]
            FACETS --- FACETS_DETAIL
        end

        subgraph AFFICHAGE["Etape 5 : Rendu"]
            direction TB
            DISPLAY["gouv-display<br/><small>Composant VISUEL</small>"]
            DISPLAY_DETAIL["<small>- Template HTML ({{field}})<br/>- Grille CSS 1-6 colonnes<br/>- Pagination client/serveur<br/>- Message vide</small>"]
            DISPLAY --- DISPLAY_DETAIL

            DATALIST["gouv-datalist<br/><small>Composant VISUEL</small>"]
            DATALIST_DETAIL["<small>- Tableau de donnees DSFR<br/>- Tri par colonne<br/>- Export CSV/HTML<br/>- Pagination</small>"]
            DATALIST --- DATALIST_DETAIL

            KPI["gouv-kpi<br/><small>Composant VISUEL</small>"]
            KPI_DETAIL["<small>- Indicateur chiffre cle<br/>- Agregation (avg, sum, count)<br/>- Format (nombre, %, euro)<br/>- Seuils couleur<br/>- Tendance (up/down)</small>"]
            KPI --- KPI_DETAIL

            DSFR_CHART["gouv-dsfr-chart<br/><small>Composant VISUEL</small>"]
            DSFR_DETAIL["<small>- Wrapper DSFR Chart (Vue)<br/>- Types : line, bar, pie, radar,<br/>  gauge, scatter, bar-line,<br/>  map, map-reg<br/>- Palette DSFR<br/>- Attributs differes (setTimeout 500ms)</small>"]
            DSFR_CHART --- DSFR_DETAIL
        end
    end

    %% Flux de donnees (evenements)
    SRC ==>|"gouv-data-loaded<br/>{sourceId, data}"| NORM
    NORM ==>|"gouv-data-loaded<br/>{sourceId, data}"| QUERY
    QUERY ==>|"gouv-data-loaded<br/>{sourceId, data}"| SEARCH
    SEARCH ==>|"gouv-data-loaded<br/>{sourceId, data}"| FACETS
    FACETS ==>|"gouv-data-loaded"| DISPLAY
    FACETS ==>|"gouv-data-loaded"| DATALIST
    FACETS ==>|"gouv-data-loaded"| KPI
    FACETS ==>|"gouv-data-loaded"| DSFR_CHART

    %% Raccourcis possibles (sans search/facets)
    QUERY -.->|"raccourci<br/>sans filtres"| DISPLAY
    QUERY -.->|"raccourci"| DATALIST
    QUERY -.->|"raccourci"| KPI
    QUERY -.->|"raccourci"| DSFR_CHART

    %% Commandes upstream (server-side)
    DISPLAY -.->|"gouv-source-command<br/>{page: N}"| QUERY
    DATALIST -.->|"gouv-source-command<br/>{orderBy: ...}"| QUERY
    SEARCH -.->|"gouv-source-command<br/>{where: 'search(...)'}"| QUERY
    FACETS -.->|"gouv-source-command<br/>{where: 'field=val'}"| QUERY

    %% Mixin
    MIXIN["SourceSubscriberMixin<br/><small>Mixin Lit partage par tous les<br/>composants consommateurs.<br/>Gere l'abonnement, le cache,<br/>et le lifecycle.</small>"]
    MIXIN -.-> NORM
    MIXIN -.-> QUERY
    MIXIN -.-> SEARCH
    MIXIN -.-> FACETS
    MIXIN -.-> DISPLAY
    MIXIN -.-> DATALIST
    MIXIN -.-> KPI
    MIXIN -.-> DSFR_CHART

    %% Styles
    classDef invisible fill:#fff9c4,stroke:#f9a825,color:#4a4a00
    classDef visual fill:#c8e6c9,stroke:#2e7d32,color:#1b5e20
    classDef bridge fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef adapter fill:#f3e5f5,stroke:#6a1b9a,color:#4a148c
    classDef mixin fill:#fce4ec,stroke:#c62828,color:#b71c1c

    class SRC,NORM,QUERY invisible
    class SEARCH,FACETS,DISPLAY,DATALIST,KPI,DSFR_CHART visual
    class DATA_BRIDGE,CACHE,META,EVENTS bridge
    class GENERIC,ODS_A,TAB_A adapter
    class MIXIN mixin
```

---

## 3. Exemple concret : pipeline complet en HTML

Voici comment les composants se chainent dans une page reelle :

```html
<!-- Etape 1 : Charger les donnees depuis OpenDataSoft -->
<gouv-source id="raw"
  url="https://proxy/api-proxy/data.opendatasoft.com/api/explore/v2.1/catalog/datasets/communes/records"
  transform="results" />

<!-- Etape 2 : Nettoyer les donnees -->
<gouv-normalize id="clean" source="raw"
  numeric="population"
  rename="nom_commune:Commune | code_region:Region"
  trim />

<!-- Etape 3 : Agreger par region -->
<gouv-query id="stats" source="clean"
  group-by="Region"
  aggregate="population:sum"
  order-by="population__sum:desc"
  limit="10" />

<!-- Etape 4a : Recherche textuelle -->
<gouv-search id="searched" source="stats" fields="Region" />

<!-- Etape 4b : Filtres a facettes -->
<gouv-facets id="filtered" source="searched" fields="Region" />

<!-- Etape 5 : Affichage -->
<gouv-dsfr-chart source="filtered"
  type="bar"
  label-field="Region"
  value-field="population__sum"
  palette="green" />

<!-- Ou en parallele, d'autres vues sur les memes donnees -->
<gouv-kpi source="stats"
  valeur="sum:population__sum"
  label="Population totale"
  format="nombre" />

<gouv-datalist source="filtered"
  columns="Region, population__sum:Population"
  pagination="5" />
```

```mermaid
flowchart LR
    A["gouv-source<br/><small>id='raw'</small>"] --> B["gouv-normalize<br/><small>id='clean'<br/>source='raw'</small>"]
    B --> C["gouv-query<br/><small>id='stats'<br/>source='clean'</small>"]
    C --> D["gouv-search<br/><small>id='searched'<br/>source='stats'</small>"]
    D --> E["gouv-facets<br/><small>id='filtered'<br/>source='searched'</small>"]
    E --> F["gouv-dsfr-chart<br/><small>source='filtered'</small>"]
    E --> G["gouv-datalist<br/><small>source='filtered'</small>"]
    C --> H["gouv-kpi<br/><small>source='stats'</small>"]

    classDef invisible fill:#fff9c4,stroke:#f9a825
    classDef visual fill:#c8e6c9,stroke:#2e7d32

    class A,B,C invisible
    class D,E,F,G,H visual
```
