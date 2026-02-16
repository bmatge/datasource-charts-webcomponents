# EPIC: Separation of Concerns — gouv-source / gouv-query

## Objectif

Clarifier les responsabilites de chaque composant pour que :
1. **gouv-source** soit le seul composant qui parle au reseau (fetch, pagination, retry, cache)
2. **gouv-query** soit un pur transformateur de donnees (filter, group-by, aggregate, sort)
3. L'ajout d'un nouveau provider (CKAN, INSEE Melodi...) ne necessite **aucune modification** dans les composants
4. Les composants middleware (gouv-facets, gouv-search) utilisent la config provider au lieu de hardcoder des syntaxes

## Etat des lieux

### Problemes actuels

| Composant | Probleme |
|---|---|
| **gouv-query** | Fait du fetch HTTP (3 strategies), de la pagination (auto + server-side), ET du requetage. ~200 lignes de code "source" |
| **gouv-source** | Sous-utilise. Pagination hardcodee `page`/`page_size` (biais Tabular). Ne connait pas les adapters |
| **gouv-facets** | 2 builders WHERE dupliques : `_buildColonFacetWhere()` (colon) et `_buildFacetWhereExcluding()` (ODSQL) |
| **gouv-search** | Template de recherche hardcode `search("{q}")` specifique ODS |
| **Adapters** | Vivent dans `src/adapters/` mais sont importes uniquement par gouv-query. Un contributeur doit comprendre gouv-query pour ajouter un provider |

### Architecture actuelle (ce qui ne va pas)

```
gouv-source  ──[fetch basique]──► donnees brutes
                                      │
gouv-query   ──[fetch via adapter]──► donnees brutes ──[transform]──► donnees finales
                   ▲
                   │ adapters (ODS, Tabular, Grist, Generic)
```

gouv-query bypasse gouv-source et fait son propre fetch. Les deux composants ecoutent `gouv-source-command` independamment.

### Architecture cible

```
gouv-source  ──[fetch via adapter]──[paginate]──[cache]──► donnees brutes
     │                                                         │
     │ adapters (ODS, Tabular, Grist, Generic, CKAN...)        │
     │                                                         ▼
     │                                               gouv-normalize (optionnel)
     │                                                         │
     │                                                         ▼
     │                                               gouv-query [transform seulement]
     │                                               filter, group-by, aggregate, sort
     │                                                         │
     │                                    ┌────────────────────┤
     │                                    ▼                    ▼
     │                              gouv-facets          gouv-search
     │                                    │                    │
     │◄── commandes (page, where, orderBy)┘                    │
     │◄── commandes (where) ───────────────────────────────────┘
     │
     ▼
  gouv-dsfr-chart / gouv-datalist / gouv-kpi
```

**Regle** : seul gouv-source fait du fetch. Les commandes remontent vers lui via `gouv-source-command`. gouv-query ne fait jamais de requete HTTP.

---

## Contrainte de retrocompatibilite

Le HTML deploye chez les utilisateurs utilise `<gouv-query api-type="opendatasoft" ...>` en mode autonome (sans gouv-source). Ce pattern **doit continuer a fonctionner** pendant une periode de transition.

Strategie : gouv-query garde son mode fetch autonome en interne mais marque comme `@deprecated`. Les builders generent le nouveau pattern. L'ancien fonctionne toujours.

---

## ETAPE 1 : Construire les nouvelles bases (sans casser l'existant) ✅ COMPLETE

> Principe : ajouter des capacites, exporter des utilitaires, enrichir les interfaces.
> **Aucun composant existant n'est modifie dans cette etape.**

### 1.1 Enrichir l'interface ApiAdapter

**Fichier** : `src/adapters/api-adapter.ts`

Ajouter a l'interface `ApiAdapter` :

```typescript
/** Construit un WHERE clause a partir de selections de facettes */
buildFacetWhere?(selections: Map<string, Set<string>>, excludeField?: string): string;

/** Retourne le template de recherche full-text pour ce provider */
getDefaultSearchTemplate?(): string | null;  // existe deja, s'assurer qu'il est implemente

/** Retourne la config provider associee */
getProviderConfig?(): ProviderConfig;
```

**Tests** : `tests/adapters/api-adapter.test.ts`
- Verifier que chaque adapter implemente les nouvelles methodes optionnelles

### 1.2 Implementer buildFacetWhere dans chaque adapter

**Fichiers** :
- `src/adapters/opendatasoft-adapter.ts` : syntaxe ODSQL (`field = "value"`, `field IN ("a", "b")`, separateur ` AND `)
- `src/adapters/tabular-adapter.ts` : syntaxe colon (`field:eq:value`, `field:in:a|b`, separateur `, `)
- `src/adapters/grist-adapter.ts` : syntaxe colon (meme que tabular)
- `src/adapters/generic-adapter.ts` : syntaxe colon (fallback)

La logique est extraite de `gouv-facets.ts` lignes 328-340 (`_buildColonFacetWhere`) et lignes 535-554 (`_buildFacetWhereExcluding`).

**Tests** : `tests/adapters/facet-where.test.ts` (nouveau)
- ODS: `buildFacetWhere(Map{region: Set{"IDF"}})` → `region = "IDF"`
- ODS: multi-valeurs → `region IN ("IDF", "OCC")`
- ODS: multi-champs → `region = "IDF" AND dept = "75"`
- ODS: exclude field → omet le champ exclu
- Tabular: meme tests avec syntaxe colon
- Echappement des guillemets dans les valeurs

### 1.3 Implementer getDefaultSearchTemplate dans chaque adapter

**Fichiers** :
- `src/adapters/opendatasoft-adapter.ts` : retourne `'search("{q}")'` (existe deja, verifier)
- `src/adapters/tabular-adapter.ts` : retourne `null`
- `src/adapters/grist-adapter.ts` : retourne `null`
- `src/adapters/generic-adapter.ts` : retourne `null`

**Tests** : `tests/adapters/api-adapter.test.ts`
- Verifier la valeur retournee par chaque adapter

### 1.4 Creer un utilitaire partage de pagination

**Fichier** : `src/utils/pagination.ts` (nouveau)

```typescript
import type { ProviderConfig } from '@gouv-widgets/shared';

export interface PaginationState {
  currentPage: number;
  totalCount: number;
  hasMore: boolean;
}

/**
 * Construit les parametres de pagination pour une URL selon le type de provider.
 * Lit ProviderConfig.pagination pour determiner offset vs page vs cursor.
 */
export function buildPaginationParams(
  config: ProviderConfig,
  page: number,
  pageSize: number
): Record<string, string> {
  const { type, params } = config.pagination;

  if (type === 'offset') {
    const offset = (page - 1) * pageSize;
    return {
      [params.offset || 'offset']: String(offset),
      [params.limit || 'limit']: String(pageSize),
    };
  }

  if (type === 'page') {
    return {
      [params.page || 'page']: String(page),
      [params.pageSize || 'page_size']: String(pageSize),
    };
  }

  // type === 'none' ou 'cursor'
  return {};
}

/**
 * Extrait les metadonnees de pagination d'une reponse JSON
 * selon la config provider.
 */
export function extractPaginationMeta(
  json: unknown,
  config: ProviderConfig
): PaginationMeta | null {
  // Utilise config.pagination.serverMeta ou config.response.totalCountPath
}
```

**Tests** : `tests/utils/pagination.test.ts` (nouveau)
- ODS offset: page=3, pageSize=100 → `{ offset: "200", limit: "100" }`
- Tabular page: page=3, pageSize=100 → `{ page: "3", page_size: "100" }`
- Grist none: retourne `{}`
- extractPaginationMeta avec chaque format de reponse

### 1.5 Creer un utilitaire partage de response parsing

**Fichier** : `src/utils/response-parser.ts` (nouveau)

```typescript
import type { ProviderConfig } from '@gouv-widgets/shared';
import { getByPath } from './json-path.js';

/**
 * Extrait les donnees d'une reponse JSON selon la config provider.
 * Gere dataPath, nestedDataKey, requiresFlatten.
 */
export function extractData(json: unknown, config: ProviderConfig): unknown[] {
  let data = config.response.dataPath
    ? getByPath(json, config.response.dataPath)
    : json;

  if (!Array.isArray(data)) data = [data];

  // Flatten nested structures (ex: Grist records[].fields)
  if (config.response.requiresFlatten && config.response.nestedDataKey) {
    data = data.map((r: Record<string, unknown>) => {
      const nested = r[config.response.nestedDataKey!] as Record<string, unknown>;
      return nested ? { ...nested } : r;
    });
  }

  return data;
}

/**
 * Extrait le total count d'une reponse JSON.
 */
export function extractTotalCount(json: unknown, config: ProviderConfig): number | null {
  if (!config.response.totalCountPath) return null;
  const count = getByPath(json, config.response.totalCountPath);
  return typeof count === 'number' ? count : null;
}
```

**Tests** : `tests/utils/response-parser.test.ts` (nouveau)
- ODS: `{ results: [...], total_count: 42 }` → extraire results + count
- Tabular: `{ data: [...], meta: { total: 100 } }` → extraire data + count
- Grist: `{ records: [{ id: 1, fields: { col: "val" } }] }` → extraire + flatten
- Generic: tableau brut → retourner tel quel

### 1.6 Enrichir ProviderConfig pour la recherche

**Fichier** : `packages/shared/src/providers/provider-config.ts`

Ajouter dans la section `query` :

```typescript
query: {
  whereFormat: 'odsql' | 'colon';
  whereSeparator: string;
  aggregationSyntax: string;
  /** Template de recherche full-text. Ex: 'search("{q}")' pour ODS. null si pas de recherche serveur. */
  searchTemplate?: string | null;
  /** Mapping des operateurs generiques vers la syntaxe du provider */
  operatorMapping?: Record<string, string>;
};
```

Mettre a jour chaque config provider :
- `opendatasoft.ts` : `searchTemplate: 'search("{q}")'`
- `tabular.ts` : `searchTemplate: null`
- `grist.ts` : `searchTemplate: null`
- `generic.ts` : `searchTemplate: null`

Ajouter `operatorMapping` dans `tabular.ts` :
```typescript
operatorMapping: {
  eq: 'exact', neq: 'differs', gt: 'strictly_greater', gte: 'greater',
  lt: 'strictly_less', lte: 'less', contains: 'contains', notcontains: 'notcontains',
  in: 'in', notin: 'notin', isnull: 'isnull', isnotnull: 'isnotnull',
}
```

**Tests** : `tests/shared/providers/provider-config.test.ts`
- Verifier que chaque provider a les nouveaux champs
- Verifier la coherence searchTemplate ↔ capabilities.serverSearch

### 1.7 Deplacer le registre d'adapters vers un module autonome

**Fichier** : `src/adapters/adapter-registry.ts` (nouveau, extrait de `api-adapter.ts`)

```typescript
import type { ApiAdapter } from './api-adapter.js';
import { GenericAdapter } from './generic-adapter.js';
import { OpenDataSoftAdapter } from './opendatasoft-adapter.js';
import { TabularAdapter } from './tabular-adapter.js';
import { GristAdapter } from './grist-adapter.js';

const ADAPTER_REGISTRY = new Map<string, ApiAdapter>([
  ['generic', new GenericAdapter()],
  ['opendatasoft', new OpenDataSoftAdapter()],
  ['tabular', new TabularAdapter()],
  ['grist', new GristAdapter()],
]);

export function getAdapter(apiType: string): ApiAdapter { ... }
export function registerAdapter(adapter: ApiAdapter): void { ... }
```

`api-adapter.ts` re-exporte pour backward compat :
```typescript
export { getAdapter, registerAdapter } from './adapter-registry.js';
```

Cela permet a gouv-source d'importer le registre sans dependre de gouv-query.

**Tests** : Les tests existants `tests/adapters/api-adapter.test.ts` doivent continuer a passer sans modification.

### 1.8 Ajouter `api-type` et les attributs adapter a gouv-source (nouveau mode)

**Fichier** : `src/components/gouv-source.ts`

Ajouter les proprietes necessaires pour le mode "adapter-driven" :

```typescript
/** Type d'API — active le mode adapter si != 'generic' */
@property({ type: String, attribute: 'api-type' })
apiType: ApiType = 'generic';

/** URL de base de l'API (pour ODS, Tabular) */
@property({ type: String, attribute: 'base-url' })
baseUrl = '';

/** ID du dataset (pour ODS, Tabular) */
@property({ type: String, attribute: 'dataset-id' })
datasetId = '';

/** ID de la ressource (pour Tabular) */
@property({ type: String })
resource = '';

/** Clause WHERE statique */
@property({ type: String })
where = '';

/** Clause SELECT (pour ODS) */
@property({ type: String })
select = '';

/** Group-by (pour les APIs qui le supportent) */
@property({ type: String, attribute: 'group-by' })
groupBy = '';

/** Agregation (pour les APIs qui le supportent) */
@property({ type: String })
aggregate = '';

/** Order-by */
@property({ type: String, attribute: 'order-by' })
orderBy = '';

/** Mode pagination serveur (datalist, tableaux) */
@property({ type: Boolean, attribute: 'server-side' })
serverSide = false;

/** Taille de page pour la pagination serveur */
@property({ type: Number, attribute: 'page-size' })  // existe deja
pageSize = 20;

/** Limite du nombre de resultats */
@property({ type: Number })
limit = 0;

/** Headers HTTP supplementaires (JSON string) */
@property({ type: String })  // existe deja
headers = '';
```

**Comportement** :
- Si `apiType === 'generic'` (defaut) : comportement actuel inchange (fetch URL brute)
- Si `apiType !== 'generic'` : utilise l'adapter via `getAdapter(apiType)` pour construire l'URL, paginer, parser la reponse
- Ecoute `gouv-source-command` pour `page`, `where`, `orderBy` (overlay server-side)
- Utilise `buildPaginationParams()` et `extractData()` des nouveaux utilitaires
- Expose `getAdapter()` et `getEffectiveWhere()` pour que gouv-facets/search puissent acceder a l'adapter

**Tests** : `tests/components/gouv-source-adapter.test.ts` (nouveau)
- Mode generic : comportement identique a l'actuel
- Mode ODS : construit l'URL avec offset/limit, parse results + total_count
- Mode Tabular : construit l'URL avec page/page_size, auto-pagine via links.next
- Mode Grist : fetch unique, flatten records[].fields
- Commandes : where/orderBy/page modifient le prochain fetch
- getEffectiveWhere() retourne le merge static + dynamic

### 1.9 Mettre a jour les ProviderConfig.codeGen

**Fichier** : Chaque provider config dans `packages/shared/src/providers/`

Mettre a jour `codeGen` pour que les builders generent le nouveau pattern :

```typescript
// opendatasoft.ts
codeGen: {
  usesGouvSource: true,   // CHANGE: true (avant: false)
  usesGouvQuery: true,    // inchange, pour les transformations client
  ...
}
```

**Attention** : Ce changement affectera les builders (code-generator.ts) dans l'etape 2. Pour l'etape 1, on ajoute un nouveau champ sans modifier l'ancien :

```typescript
codeGen: {
  usesGouvSource: false,  // legacy : inchange
  usesGouvQuery: true,    // legacy : inchange
  /** Nouveau pattern (etape 2) */
  v2: {
    usesGouvSource: true,
    usesGouvQuery: true,
    sourceApiType: 'opendatasoft',
  },
  ...
}
```

### 1.10 Tests d'integration etape 1

**Fichier** : `tests/integration/source-adapter.test.ts` (nouveau)

Tests bout-en-bout (mock fetch) :
- `<gouv-source api-type="opendatasoft" ...>` → emet les bonnes donnees
- `<gouv-source api-type="tabular" ...>` → auto-pagination multi-pages
- `<gouv-source api-type="grist" ...>` → flatten records[].fields
- `<gouv-source api-type="opendatasoft" ...>` + commande `{ where: 'search("Paris")' }` → re-fetch avec WHERE
- `<gouv-source api-type="tabular" ...>` + commande `{ page: 3 }` → fetch page 3

### Verification etape 1

```bash
npm run test:run    # Tous les tests existants passent + nouveaux tests
npm run build:all   # Tout compile
```

**Critere de completion** : aucun test existant ne casse, aucun composant existant ne change de comportement, les nouveaux utilitaires et le nouveau mode de gouv-source fonctionnent.

---

## ETAPE 2 : Nettoyer le legacy et normaliser les composants ✅ COMPLETE

> Principe : migrer les composants vers les nouvelles bases, supprimer le code duplique.
> A la fin de cette etape, gouv-query ne fait plus aucun fetch HTTP.

### 2.1 Migrer gouv-query : supprimer tout le code fetch

**Fichier** : `src/components/gouv-query.ts`

**Supprimer** (~200 lignes) :
- `_fetchFromApi()` (lignes ~637-673)
- `_fetchAllDelegated()` (lignes ~678-695)
- `_fetchServerSideDelegated()` (lignes ~700-732)
- `_fetchSinglePage()` (lignes ~737-766)
- `_setupServerSideListener()` (lignes ~809-856) — la partie pagination/where/orderBy
- `_getAdapterParams()` (lignes ~784-800)
- Import de `getAdapter` et des types adapter

**Modifier** `_initialize()` :
- Si `apiType !== 'generic'` ET pas de `source` : afficher un warning de deprecation dans la console, puis creer en interne un `<gouv-source>` shadow avec les memes attributs (backward compat)
- Si `source` est defini : s'abonner a la source (comportement actuel du mode generic)
- Dans tous les cas, appliquer les transformations client-side sur les donnees recues

**Conserver** :
- `_processClientSide()` — filter, group-by, aggregate, sort, limit
- `_applyFilters()`, `_parseFilters()`, `_matchesFilter()`
- `_applyGroupByAndAggregate()`, `_parseAggregates()`, `_computeAggregate()`
- `_applySort()`
- `getEffectiveWhere()` — pour que gouv-facets puisse lire le WHERE merge
- L'ecoute de `gouv-source-command` pour le re-dispatch vers la source upstream

**Backward compat** : Si l'utilisateur ecrit `<gouv-query api-type="opendatasoft" base-url="..." dataset-id="...">` sans gouv-source, le composant cree un gouv-source interne invisible et lui delegue le fetch. Warning console : "gouv-query mode autonome est deprecie, utilisez gouv-source + gouv-query."

**Tests** : Mettre a jour `tests/apps/builder/code-generator.test.ts` et `tests/components/gouv-query.test.ts`
- Tous les tests existants doivent passer (backward compat)
- Nouveaux tests : gouv-query recoit les donnees d'un gouv-source externe

### 2.2 Migrer gouv-facets : utiliser adapter.buildFacetWhere()

**Fichier** : `src/components/gouv-facets.ts`

**Supprimer** :
- `_buildColonFacetWhere()` (lignes ~328-340)
- `_buildFacetWhereExcluding()` (lignes ~535-554)

**Remplacer par** :
```typescript
private _buildFacetWhere(excludeField?: string): string {
  const sourceEl = document.getElementById(this.source);
  const adapter = (sourceEl as any)?.getAdapter?.();
  if (adapter?.buildFacetWhere) {
    return adapter.buildFacetWhere(this._activeSelections, excludeField);
  }
  // Fallback : colon syntax par defaut
  return this._buildColonFacetWhereFallback(excludeField);
}
```

**Tests** : Mettre a jour `tests/components/gouv-facets.test.ts`
- Verifier que les WHERE sont generes via l'adapter
- Verifier le fallback colon si pas d'adapter

### 2.3 Migrer gouv-search : lire le searchTemplate depuis le provider

**Fichier** : `src/components/gouv-search.ts`

**Modifier** :
- Le `searchTemplate` par defaut passe de `'search("{q}")'` a `''` (vide)
- A l'initialisation, si `searchTemplate` est vide et `serverSearch` est true :
  ```typescript
  const sourceEl = document.getElementById(this.source);
  const adapter = (sourceEl as any)?.getAdapter?.();
  if (adapter?.getDefaultSearchTemplate) {
    this.searchTemplate = adapter.getDefaultSearchTemplate() || '';
  }
  ```
- Si `searchTemplate` est explicitement defini par l'utilisateur, ne pas le surcharger

**Tests** : Mettre a jour `tests/components/gouv-search.test.ts`
- Verifier que le template est lu depuis l'adapter
- Verifier qu'un template explicite n'est pas surcharge

### 2.4 Migrer les builders vers le nouveau pattern

**Fichiers** :
- `apps/builder/src/ui/code-generator.ts`
- `apps/builder-ia/src/ui/code-generator.ts`
- `apps/dashboard/src/ui/code-generator.ts`

**Pattern genere (avant)** :
```html
<gouv-query id="data" api-type="opendatasoft" base-url="..." dataset-id="..." ...></gouv-query>
<gouv-dsfr-chart source="data" ...></gouv-dsfr-chart>
```

**Pattern genere (apres)** :
```html
<gouv-source id="src" api-type="opendatasoft" base-url="..." dataset-id="..." ...></gouv-source>
<gouv-query id="data" source="src" group-by="..." aggregate="..." ...></gouv-query>
<gouv-dsfr-chart source="data" ...></gouv-dsfr-chart>
```

Quand gouv-query n'a aucune transformation (pas de filter/group-by/aggregate/sort), on peut l'omettre :
```html
<gouv-source id="src" api-type="opendatasoft" ...></gouv-source>
<gouv-dsfr-chart source="src" ...></gouv-dsfr-chart>
```

#### Simplification du code generator : unifier les 3 chemins en 1

Aujourd'hui le code generator a 3 fonctions distinctes pour generer la partie fetch+query
selon le provider. Apres l'epic, le pattern est le meme pour tous : `source + query`.
Cela permet de **supprimer** les fonctions specifiques et de factoriser.

**Supprimer** (~160 lignes) :
- `generateOdsQueryCode()` (~90 lignes) -- genere `<gouv-query api-type="opendatasoft" ...>`
- `generateTabularQueryCode()` (~70 lignes) -- genere `<gouv-query api-type="tabular" ...>`

**Creer** (~40 lignes) :
- `generateSourceElement(provider, resourceIds, options)` -- genere le `<gouv-source>` avec
  les attributs adaptes au provider (api-type, base-url, dataset-id, resource, where, select,
  order-by, server-side, page-size). Utilise `ProviderConfig.codeGen` pour determiner les
  attributs pertinents.

**Reutiliser** (inchange) :
- `generateGouvQueryCode(sourceId, labelFieldPath, valueFieldPath)` -- genere le `<gouv-query>`
  avec les transformations client (group-by, aggregate, filter, order-by). Cette fonction
  existe deja et fait exactement ce qu'il faut : elle prend un `sourceId` et genere un
  `<gouv-query source="...">`.

**Simplifier** :
- `generateDynamicCodeForApi()` : supprimer le branchement if/else ODS/Tabular/generic.
  Le flux devient lineaire : `generateSourceElement()` + `generateGouvQueryCode()` pour
  tous les providers.

**Bilan** :
```
Avant (3 chemins, ~230 lignes) :
  ODS       -> generateOdsQueryCode()      ~90 lignes
  Tabular   -> generateTabularQueryCode()  ~70 lignes
  Grist/Gen -> generateGouvQueryCode()     ~70 lignes

Apres (1 chemin + 1 helper, ~110 lignes) :
  Tous      -> generateSourceElement()     ~40 lignes (nouveau)
            +  generateGouvQueryCode()     ~70 lignes (existant, inchange)
```

Resultat net : **~120 lignes en moins** dans le code generator.

**Tests** : Mettre a jour les tests existants des code generators + tests d'alignement

### 2.5 Migrer les skills builder-IA

**Fichier** : `apps/builder-ia/src/skills.ts`

Mettre a jour les skills `gouvSource`, `gouvQuery` et `apiProviders` pour refleter :
- gouv-source a maintenant `api-type`, `base-url`, `dataset-id`, `resource`, `where`, `select`, `group-by`, `aggregate`, `order-by`
- gouv-query n'a plus `api-type`, `base-url`, `dataset-id`, `resource` (deprecated)
- Le pattern recommande est `source → query → chart`

**Tests** : `tests/apps/builder-ia/skills.test.ts` doit etre mis a jour

### 2.6 Migrer le MCP server

**Fichier** : `mcp-server/src/index.ts`

Mettre a jour la spec de generation de code pour utiliser le nouveau pattern source + query.

### 2.7 Mettre a jour le guide et les exemples

**Fichiers** :
- `guide/*.html` — exemples avec le nouveau pattern
- `apps/playground/src/main.ts` — exemples par defaut

### 2.8 Nettoyer le code mort

- Supprimer `codeGen.v2` des ProviderConfig (remplacer par les valeurs finales)
- Supprimer les re-exports de backward compat dans `api-adapter.ts` si plus utilises
- Supprimer le type `ApiType` de `gouv-query.ts` (le deplacer vers `gouv-source.ts` ou `api-adapter.ts`)
- Deprecation warnings dans gouv-query si `api-type` est utilise directement

### Verification etape 2

```bash
npm run test:run      # Tous les tests passent
npm run build:all     # Tout compile
npm run test:coverage # Couverture stable ou en hausse
```

**Critere de completion** :
- gouv-query ne contient plus aucun `fetch()` ni import d'adapter
- gouv-facets n'a plus de WHERE builder inline
- gouv-search lit le template depuis l'adapter
- Les builders generent le nouveau pattern `source → query → chart`
- L'ancien pattern `<gouv-query api-type="...">` fonctionne toujours (deprecated)
- Tous les tests passent

---

## Matrice des modifications par fichier

| Fichier | Etape 1 | Etape 2 |
|---|---|---|
| `src/adapters/api-adapter.ts` | Interface enrichie | Re-exports cleanup |
| `src/adapters/adapter-registry.ts` | **Nouveau** | — |
| `src/adapters/opendatasoft-adapter.ts` | +buildFacetWhere | — |
| `src/adapters/tabular-adapter.ts` | +buildFacetWhere | — |
| `src/adapters/grist-adapter.ts` | +buildFacetWhere | — |
| `src/adapters/generic-adapter.ts` | +buildFacetWhere | — |
| `src/utils/pagination.ts` | **Nouveau** | — |
| `src/utils/response-parser.ts` | **Nouveau** | — |
| `src/components/gouv-source.ts` | +api-type, +adapter mode | — |
| `src/components/gouv-query.ts` | — | Supprimer fetch, mode compat |
| `src/components/gouv-facets.ts` | — | Utiliser adapter.buildFacetWhere |
| `src/components/gouv-search.ts` | — | Lire searchTemplate depuis adapter |
| `packages/shared/src/providers/*.ts` | +searchTemplate, +operatorMapping, +codeGen.v2 | Cleanup v2 |
| `apps/builder/src/ui/code-generator.ts` | — | Supprimer generateOds/TabularQueryCode, creer generateSourceElement (~120 lignes en moins) |
| `apps/builder-ia/src/ui/code-generator.ts` | — | Idem builder (meme refactoring) |
| `apps/builder-ia/src/skills.ts` | — | Mise a jour skills |
| `apps/dashboard/src/ui/code-generator.ts` | — | Nouveau pattern |
| `mcp-server/src/index.ts` | — | Mise a jour |
| `guide/*.html` | — | Nouveaux exemples |
| `tests/apps/playground/examples.test.ts` | — | Mise a jour des 41 exemples |
| `e2e/*.spec.ts` | — | Verifier backward compat |
| `CLAUDE.md` | — | Architecture section mise a jour |
| `src/utils/beacon.ts` | +api-type dans beacon | — |
| `apps/sources/src/` | — | Pas de modif (futur Phase 3) |

---

## Elements stables (pas de modification)

Ces fichiers/modules ne sont **pas** touches par cet epic :

| Element | Raison |
|---|---|
| `src/utils/source-subscriber.ts` (mixin) | Les composants downstream (gouv-dsfr-chart, gouv-datalist, gouv-kpi) souscrivent via ce mixin. Il ecoute `gouv-data-loaded` qui est emis identiquement par gouv-source et gouv-query. Aucun changement necessaire. |
| `src/utils/data-bridge.ts` | L'interface `SourceCommandEvent` (page, where, whereKey, orderBy) est deja complete pour les besoins de gouv-source enrichi. Pas de nouveau champ necessaire. |
| `vite.config.ts` (proxy) | Les regles proxy (`/grist-proxy`, `/tabular-proxy`, etc.) sont utilisees de maniere identique par gouv-source et gouv-query. Aucun changement. |
| `index.html` (hub) | Page d'accueil marketing, ne reference pas de pattern technique. |
| `apps/sources/` | L'app Sources gere les connexions API independamment. Pas dans le scope de cet epic. Opportunite future (Phase 3) : detecter le provider via `detectProvider()` pour guider l'utilisateur. |

---

## Details supplementaires etape 1

### 1.8.1 Beacon gouv-source avec api-type

**Fichier** : `src/utils/beacon.ts`

Quand `gouv-source` est en mode adapter (`apiType !== 'generic'`), le beacon doit inclure le type de provider :

```typescript
sendWidgetBeacon('gouv-source', this.apiType); // ex: 'opendatasoft'
```

Cela permet au monitoring de savoir quels providers sont deployes en production.

---

## Details supplementaires etape 2

### 2.4.1 Algorithme de generation de code (builders)

Quand le code generator genere pour une source API :

**1. Emettre `<gouv-source>`** avec :
- `id`, `api-type`, `base-url`, `dataset-id`, `resource`, `headers`
- `where` : uniquement les clauses WHERE statiques (pas les facettes dynamiques)
- `select` : (ODS seulement)
- `server-side` + `page-size` : si pagination serveur active (datalist, tableaux)

**2. Emettre `<gouv-query>`** SEULEMENT si une transformation client est necessaire :
- `group-by`, `aggregate` : si le provider ne supporte pas l'aggregation serveur (Tabular, Grist, Generic)
- `filter` : si filtre client-side
- `order-by` : si tri client-side (providers sans serverOrderBy)
- `limit` : si limitation client

**3. Omettre `<gouv-query>`** quand :
- Le provider gere tout server-side (ODS avec select/group-by/order-by) ET
- Pas de facettes NI recherche en aval

**Exemples concrets** :

```html
<!-- ODS sans transformation client : source → chart -->
<gouv-source id="src" api-type="opendatasoft" base-url="..." dataset-id="..."
  select="sum(population) as total, region" group-by="region" order-by="total:desc">
</gouv-source>
<gouv-dsfr-chart source="src" type="bar" ...></gouv-dsfr-chart>

<!-- Tabular avec aggregation client : source → query → chart -->
<gouv-source id="src" api-type="tabular" base-url="..." resource="..."></gouv-source>
<gouv-query id="data" source="src" group-by="region" aggregate="population:sum" order-by="population__sum:desc"></gouv-query>
<gouv-dsfr-chart source="data" type="bar" ...></gouv-dsfr-chart>

<!-- Datalist pagine : source (server-side) → datalist -->
<gouv-source id="src" api-type="tabular" base-url="..." resource="..." server-side page-size="50"></gouv-source>
<gouv-datalist source="src" ...></gouv-datalist>

<!-- Generic (CSV) : source → chart (pas de query) -->
<gouv-source id="src" url="https://example.com/data.json" transform="data"></gouv-source>
<gouv-dsfr-chart source="src" type="bar" ...></gouv-dsfr-chart>
```

### 2.5.1 Contenu detaille des skills mis a jour

**Skill `gouvSource` (enrichi)** :
```
Attributs :
  api-type     : Type de provider (opendatasoft, tabular, grist, generic)
  base-url     : URL de base de l'API
  dataset-id   : ID du dataset (ODS, Tabular)
  resource     : ID de la ressource (Tabular)
  url          : URL brute (mode generic, comme avant)
  transform    : Chemin JSON pour extraire les donnees (mode generic)
  where        : Clause WHERE statique
  select       : Clause SELECT (ODS seulement)
  group-by     : Group-by serveur (si supporte par le provider)
  aggregate    : Aggregation serveur (si supporte par le provider)
  order-by     : Tri serveur (si supporte par le provider)
  server-side  : Active la pagination serveur (pour datalist/tableaux)
  page-size    : Taille de page serveur
  refresh      : Intervalle de rafraichissement (secondes)
  headers      : Headers HTTP supplementaires (JSON)

Pattern recommande :
  <gouv-source id="src" api-type="opendatasoft" base-url="..." dataset-id="...">
  </gouv-source>
  <gouv-query id="data" source="src" group-by="..." aggregate="..."></gouv-query>
  <gouv-dsfr-chart source="data" type="bar" ...></gouv-dsfr-chart>
```

**Skill `gouvQuery` (simplifie)** :
```
@deprecated : api-type, base-url, dataset-id, resource
  → Utiliser gouv-source a la place pour le fetch.
  → gouv-query ne fait que transformer les donnees.

Attributs conserves :
  source, group-by, aggregate, filter, order-by, limit, where
```

### 2.7.1 Checklist des fichiers guide

| Fichier | Action Phase 2 |
|---|---|
| `guide/guide-exemples-source.html` | Ajouter section "gouv-source avec api-type" |
| `guide/guide-exemples-query.html` | Marquer [DEPRECIE] les exemples avec `api-type`, ajouter pattern source+query |
| `guide/guide-exemples-facets.html` | Migrer vers source → query → facets |
| `guide/guide-exemples-search.html` | Migrer recherche serveur vers source + search |
| `guide/guide-exemples-display.html` | Migrer vers source → datalist |
| `guide/guide-exemples-normalize.html` | Deja correct (source → normalize), verifier |
| `guide/guide-exemples-avances.html` | Refactorer le pipeline multi-zone |
| `guide/USER-GUIDE.md` | Mettre a jour la section architecture |

### 2.7.2 Strategie exemples playground

**Etat actuel** : 41 exemples dans `apps/playground/src/examples/examples-data.ts`
- ~60% utilisent deja `gouv-source` (pattern correct)
- ~40% utilisent `<gouv-query api-type="...">` (pattern a migrer)

**Phase 2** :
- Migrer tous les `query-*` exemples vers le pattern source + query
- Ajouter des exemples "nouveau pattern" pour chaque provider (ODS, Tabular, Grist)
- Conserver les exemples anciens marques "[LEGACY]" pour reference
- Mettre a jour `tests/apps/playground/examples.test.ts` en consequence

### 2.9 Mettre a jour CLAUDE.md

**Fichier** : `CLAUDE.md`

Mettre a jour la section "Architecture" pour refleter :
- `gouv-source` est le composant de fetch (supporte `api-type` pour ODS, Tabular, Grist)
- `gouv-query` est un pur transformateur (ne fait plus de fetch HTTP)
- Les adapters sont dans `src/adapters/`, importes par gouv-source
- ProviderConfig dans `packages/shared/src/providers/`

Ajouter une note dans la section "Skills builder-IA" :
- gouv-source a de nouveaux attributs (api-type, base-url, etc.)
- gouv-query api-type est deprecie

---

## Strategie de tests

### Tests unitaires (Vitest)

| Quand | Quoi | Fichier |
|---|---|---|
| Etape 1 | Utilitaires pagination | `tests/utils/pagination.test.ts` (nouveau) |
| Etape 1 | Utilitaires response-parser | `tests/utils/response-parser.test.ts` (nouveau) |
| Etape 1 | Adapter buildFacetWhere | `tests/adapters/facet-where.test.ts` (nouveau) |
| Etape 1 | gouv-source mode adapter | `tests/components/gouv-source-adapter.test.ts` (nouveau) |
| Etape 1 | Integration source+adapter | `tests/integration/source-adapter.test.ts` (nouveau) |
| Etape 2 | gouv-query sans fetch | `tests/components/gouv-query.test.ts` (mis a jour) |
| Etape 2 | gouv-facets avec adapter | `tests/components/gouv-facets.test.ts` (mis a jour) |
| Etape 2 | gouv-search template adapter | `tests/components/gouv-search.test.ts` (mis a jour) |
| Etape 2 | Code generators (3 builders) | `tests/apps/builder/code-generator.test.ts` (mis a jour) |
| Etape 2 | Skills alignement | `tests/apps/builder-ia/skills.test.ts` (mis a jour) |
| Etape 2 | Exemples playground | `tests/apps/playground/examples.test.ts` (mis a jour) |

### Tests E2E (Playwright)

| Quand | Quoi |
|---|---|
| Etape 1 | Les tests E2E existants passent sans modification |
| Etape 2 | `e2e/grist-widgets.spec.ts` : verifier backward compat `<gouv-query api-type="grist">` |
| Etape 2 | Nouveau : tester le pattern `<gouv-source api-type="...">` en E2E |

### Commandes de verification

```bash
# Etape 1
npm run test:run        # Tous les tests unitaires
npm run build:all       # Build complet

# Etape 2
npm run test:run        # Tous les tests unitaires (mis a jour)
npm run build:all       # Build complet
npx playwright test     # Tests E2E
```

---

## Test du nouveau provider (CKAN)

Apres cet epic, ajouter CKAN necessite :

1. `packages/shared/src/providers/ckan.ts` — ProviderConfig declaratif
2. `src/adapters/ckan-adapter.ts` — buildUrl, fetchAll, fetchPage, buildFacetWhere
3. `registerProvider(CKAN_CONFIG)` dans `providers/index.ts`
4. `registerAdapter(new CkanAdapter())` dans `adapter-registry.ts`
5. **Zero modification** dans gouv-source, gouv-query, gouv-facets, gouv-search, les builders

---

## Opportunites futures (Phase 3+)

- **Apps/Sources** : integrer `detectProvider()` dans l'UI de connexion pour guider l'utilisateur
- **Beacon api-type** : dashboard monitoring par provider
- **Cursor-based pagination** : ajouter le support dans `buildPaginationParams()` quand un provider le necessite
- **Supprimer le mode autonome de gouv-query** : une fois que tout le code deploye a ete migre

---

## Verification finale

En fin d'epic, avant qu'il ne soit considere comme 'done', assure toi d'avoir relu tout l'epic et double-checke que :
- [x] gouv-source est le seul composant qui fait du fetch HTTP
- [x] gouv-query ne contient aucun `fetch()` ni import d'adapter
- [x] gouv-facets utilise `adapter.buildFacetWhere()` au lieu de builders inline
- [x] gouv-search lit `searchTemplate` depuis l'adapter
- [x] L'ancien pattern `<gouv-query api-type="...">` fonctionne (deprecated, warning console)
- [x] Les builders generent le nouveau pattern
- [x] Tous les tests unitaires passent (`npm run test:run`)
- [ ] Tous les tests E2E passent (`npx playwright test`)
- [ ] Toutes les apps buildent (`npm run build:all`)
- [x] Le guide contient des exemples a jour
- [x] CLAUDE.md est a jour
- [x] Les skills builder-IA sont a jour
- [ ] Les exemples playground sont migres
