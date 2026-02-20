# Specifications : gouv-orgchart

## 1. Vue d'ensemble

**Nom** : `gouv-orgchart`
**Type** : Web Component autonome (Lit)
**Projet** : Repo separe, integration possible dans gouv-widgets ulterieurement
**Objectif** : Afficher un organigramme hierarchique a partir de donnees tabulaires plates, avec un rendu conforme DSFR

### Livrables

1. **Web Component `<gouv-orgchart>`** — composant d'affichage autonome
2. **Plugin Grist** — widget custom Grist deploye via GitHub Pages
3. **Page de demo** — exemples statiques et dynamiques

---

## 2. Format des donnees en entree

### 2.1 Principe : donnees tabulaires plates

Le composant consomme un **tableau d'objets plats** (JSON array), identique au format de sortie de `gouv-source`. Chaque ligne represente une personne/poste. La hierarchie est encodee par une **reference au parent** (pattern adjacency list).

### 2.2 Colonnes obligatoires

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `string \| number` | Identifiant unique du poste/personne |
| `parent_id` | `string \| number \| null` | Identifiant du N+1. `null` pour la racine |
| `nom` | `string` | Nom de la personne ou intitule du poste |

### 2.3 Colonnes optionnelles

| Colonne | Type | Description | Defaut |
|---------|------|-------------|--------|
| `prenom` | `string` | Prenom | — |
| `fonction` | `string` | Intitule du poste / fonction | — |
| `direction` | `string` | Direction / service / departement | — |
| `role_type` | `string` | Type de role (voir 2.4) | `"standard"` |
| `image` | `string` | URL de la photo ou avatar | Pictogramme DSFR |
| `email` | `string` | Email de contact | — |
| `telephone` | `string` | Telephone | — |
| `vacant` | `boolean` | Poste vacant | `false` |
| `interim` | `string` | Nom de l'interimaire | — |
| `badge` | `string` | Texte du badge affiché sur le noeud | — |
| `badge_type` | `string` | Couleur DSFR du badge (voir 2.5) | `"info"` |
| `lien` | `string` | URL de lien associe au noeud | — |
| `ordre` | `number` | Ordre d'affichage parmi les freres | Auto (ordre des donnees) |

### 2.4 Types de role (`role_type`)

Les types de role controlent le **positionnement et le style visuel** du noeud dans l'arbre :

| Valeur | Comportement | Cas d'usage |
|--------|-------------|-------------|
| `"standard"` | Enfant normal dans la hierarchie | Sous-directeur, chef de bureau |
| `"assistant"` | Affiche a cote du parent, lien en pointille | Adjoint, secretaire general adjoint |
| `"transversal"` | Affiche sous le parent mais visuellement distinct (decale, lien en pointille) | Charge de mission, conseiller technique |
| `"vacant"` | Style grise, icone "poste vacant" | Equivalent a `vacant=true` |

### 2.5 Couleurs de badge DSFR

Correspondance avec les classes `fr-badge--*` :

| Valeur `badge_type` | Classe DSFR | Couleur |
|---------------------|-------------|---------|
| `"success"` | `fr-badge--success` | Vert |
| `"error"` | `fr-badge--error` | Rouge |
| `"warning"` | `fr-badge--warning` | Orange |
| `"info"` | `fr-badge--info` | Bleu |
| `"new"` | `fr-badge--new` | — |
| `"green-emeraude"` | `fr-badge--green-emeraude` | Emeraude |
| `"purple-glycine"` | `fr-badge--purple-glycine` | Violet |
| `"pink-macaron"` | `fr-badge--pink-macaron` | Rose |
| ... | ... | (toutes les couleurs DSFR illustratives) |

### 2.6 Exemple de donnees

```json
[
  {
    "id": 1,
    "parent_id": null,
    "nom": "Martin",
    "prenom": "Sophie",
    "fonction": "Directrice generale",
    "direction": "Direction generale",
    "role_type": "standard",
    "image": "https://example.com/photos/martin.jpg",
    "badge": "DG",
    "badge_type": "info"
  },
  {
    "id": 2,
    "parent_id": 1,
    "nom": "Durand",
    "prenom": "Pierre",
    "fonction": "Secretaire general adjoint",
    "role_type": "assistant",
    "badge": "SGA",
    "badge_type": "purple-glycine"
  },
  {
    "id": 3,
    "parent_id": 1,
    "nom": "Bernard",
    "prenom": "Marie",
    "fonction": "Directrice des ressources humaines",
    "direction": "DRH",
    "role_type": "standard",
    "badge": "Directrice",
    "badge_type": "green-emeraude"
  },
  {
    "id": 4,
    "parent_id": 1,
    "nom": "Lefevre",
    "prenom": "Jean",
    "fonction": "Conseiller numerique",
    "role_type": "transversal",
    "badge": "Mission",
    "badge_type": "warning"
  },
  {
    "id": 5,
    "parent_id": 3,
    "nom": "",
    "fonction": "Chef de bureau recrutement",
    "direction": "DRH",
    "vacant": true,
    "badge": "Vacant",
    "badge_type": "error"
  }
]
```

### 2.7 Regles de validation

- **Exactement une racine** : un seul enregistrement avec `parent_id === null`
- **Pas de cycles** : le graphe parent-enfant doit etre un arbre (DAG)
- **Pas d'orphelins** : tout `parent_id` non-null doit correspondre a un `id` existant
- **Unicite des ids** : chaque `id` doit etre unique
- En cas de violation, le composant affiche un message d'erreur explicite (pas de crash silencieux)

---

## 3. API du Web Component

### 3.1 Attributs HTML

```html
<gouv-orgchart
  id-field="id"
  parent-field="parent_id"
  name-field="nom"
  firstname-field="prenom"
  role-field="fonction"
  direction-field="direction"
  role-type-field="role_type"
  image-field="image"
  badge-field="badge"
  badge-type-field="badge_type"
  link-field="lien"
  order-field="ordre"
  vacant-field="vacant"
  interim-field="interim"
  email-field="email"
  phone-field="telephone"

  orientation="top-to-bottom"
  node-style="card"
  compact="false"
  searchable="true"
  collapsible="true"
  expand-level="2"
  highlight-path="true"
  zoom="true"
  min-zoom="0.3"
  max-zoom="2"

  title="Organigramme"
  empty-message="Aucune donnee"
  responsive-breakpoint="768"
>
</gouv-orgchart>
```

#### Mapping des champs (attributs `*-field`)

Tous les attributs `*-field` permettent de mapper les colonnes du jeu de donnees vers les proprietes attendues. Cela rend le composant agnostique au nommage des colonnes source.

| Attribut | Defaut | Description |
|----------|--------|-------------|
| `id-field` | `"id"` | Colonne identifiant |
| `parent-field` | `"parent_id"` | Colonne reference au parent |
| `name-field` | `"nom"` | Colonne nom |
| `firstname-field` | `"prenom"` | Colonne prenom |
| `role-field` | `"fonction"` | Colonne fonction/poste |
| `direction-field` | `"direction"` | Colonne direction/service |
| `role-type-field` | `"role_type"` | Colonne type de role |
| `image-field` | `"image"` | Colonne URL photo |
| `badge-field` | `"badge"` | Colonne texte badge |
| `badge-type-field` | `"badge_type"` | Colonne couleur badge |
| `link-field` | `"lien"` | Colonne URL lien |
| `order-field` | `"ordre"` | Colonne ordre d'affichage |
| `vacant-field` | `"vacant"` | Colonne poste vacant |
| `interim-field` | `"interim"` | Colonne interimaire |
| `email-field` | `"email"` | Colonne email |
| `phone-field` | `"telephone"` | Colonne telephone |

#### Options d'affichage

| Attribut | Type | Defaut | Description |
|----------|------|--------|-------------|
| `orientation` | `string` | `"top-to-bottom"` | Direction de l'arbre : `top-to-bottom`, `left-to-right` |
| `node-style` | `string` | `"card"` | Style des noeuds : `card` (carte DSFR), `compact` (minimal), `detailed` (avec photo + contact) |
| `compact` | `boolean` | `false` | Mode compact : reduit l'espacement entre les noeuds |
| `searchable` | `boolean` | `true` | Affiche la barre de recherche |
| `collapsible` | `boolean` | `true` | Permet de plier/deplier les sous-arbres |
| `expand-level` | `number` | `2` | Nombre de niveaux deployes au chargement (0 = tout deploye) |
| `highlight-path` | `boolean` | `true` | Surligne le chemin jusqu'a la racine au clic |
| `zoom` | `boolean` | `true` | Active le zoom molette/pinch |
| `min-zoom` | `number` | `0.3` | Zoom minimum |
| `max-zoom` | `number` | `2` | Zoom maximum |
| `title` | `string` | `""` | Titre affiche au-dessus de l'organigramme |
| `empty-message` | `string` | `"Aucune donnee"` | Message si donnees vides |
| `responsive-breakpoint` | `number` | `768` | Seuil (px) pour passer en mode vertical |

### 3.2 Proprietes JavaScript

```typescript
interface GouvOrgchartElement extends HTMLElement {
  /** Donnees tabulaires a afficher */
  data: Record<string, unknown>[];

  /** Noeuds actuellement selectionnes (lecture seule) */
  readonly selectedNodes: OrgNode[];

  /** Methodes publiques */
  expandAll(): void;
  collapseAll(): void;
  expandToLevel(level: number): void;
  focusNode(id: string | number): void;
  highlightPath(id: string | number): void;
  clearHighlight(): void;
  search(query: string): OrgNode[];
  exportSVG(): string;
  exportPNG(): Promise<Blob>;
}
```

### 3.3 Evenements

| Evenement | Detail | Description |
|-----------|--------|-------------|
| `node-click` | `{ node: OrgNode }` | Clic sur un noeud |
| `node-expand` | `{ node: OrgNode, expanded: boolean }` | Noeud deplie/plie |
| `search-result` | `{ query: string, results: OrgNode[] }` | Resultat de recherche |
| `data-error` | `{ type: string, message: string }` | Erreur de validation des donnees |

### 3.4 Alimentation en donnees

Trois modes d'alimentation :

#### Mode 1 : Donnees inline (attribut `data`)

```html
<gouv-orgchart id="org" node-style="card"></gouv-orgchart>
<script>
  document.getElementById('org').data = [
    { id: 1, parent_id: null, nom: "Dupont", fonction: "Directeur" },
    { id: 2, parent_id: 1, nom: "Martin", fonction: "Adjoint" }
  ];
</script>
```

#### Mode 2 : Donnees JSON inline (attribut HTML)

```html
<gouv-orgchart data='[{"id":1,"parent_id":null,"nom":"Dupont"}]'>
</gouv-orgchart>
```

#### Mode 3 : Pipeline gouv-source (integration gouv-widgets)

```html
<gouv-source id="src" api-type="grist"
  base-url="https://grist.numerique.gouv.fr"
  dataset-id="DOC_ID" resource="TABLE_ID">
</gouv-source>
<gouv-orgchart source="src"
  id-field="id" parent-field="N_plus_1"
  name-field="Nom" role-field="Fonction">
</gouv-orgchart>
```

---

## 4. Rendu visuel

### 4.1 Strategie de layout : CSS Flexbox + pseudo-elements

**Choix technique** : approche CSS-only de type Treeflex (pas de D3 pour le layout).

**Justification** :
- Zero dependance externe pour le layout
- Compatible Shadow DOM (CSS encapsule)
- Rendu semantique (`<ul>/<li>` imbriques) bon pour l'accessibilite
- Dimensionnement en `em` pour le scaling responsif
- Complexite maitrisee (~80 lignes CSS pour les connecteurs)

**Structure HTML generee** :

```html
<div class="orgchart" role="tree" aria-label="Organigramme">
  <ul class="orgchart__level">
    <li class="orgchart__branch" role="treeitem" aria-expanded="true">
      <div class="orgchart__node orgchart__node--standard">
        <!-- Contenu du noeud (voir 4.2) -->
      </div>
      <ul class="orgchart__level" role="group">
        <li class="orgchart__branch orgchart__branch--assistant" role="treeitem">
          <div class="orgchart__node orgchart__node--assistant">...</div>
        </li>
        <li class="orgchart__branch" role="treeitem" aria-expanded="true">
          <div class="orgchart__node orgchart__node--standard">...</div>
          <ul class="orgchart__level" role="group">
            <li class="orgchart__branch" role="treeitem">
              <div class="orgchart__node orgchart__node--standard">...</div>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
```

**Connecteurs CSS** :

```
    ┌─────────┐
    │  Racine  │
    └────┬─────┘
         │
    ┌────┴─────────────────┐
    │                      │
┌───┴───┐  ┌──────┐  ┌────┴────┐
│Adjoint│··│Mission│  │Dir. DRH │
└───────┘  └──────┘  └────┬────┘
                          │
                    ┌─────┴─────┐
                    │           │
               ┌────┴───┐ ┌────┴───┐
               │Chef bur│ │Chef bur│
               └────────┘ └────────┘

Legende :
─── lien hierarchique (border-top/left solid)
··· lien assistant/transversal (border dashed)
```

Les connecteurs utilisent `::before` et `::after` avec des borders :
- **Vertical parent→enfants** : `::before` sur le `<ul>` avec `border-left`
- **Horizontal entre freres** : `::before` sur les `<li>` avec `border-top`
- **Demi-connecteurs** : premier/dernier enfant avec `width: 50%` + positionnement
- **Pointilles** : `.orgchart__branch--assistant ::before` avec `border-style: dashed`

### 4.2 Style des noeuds

#### Mode `card` (defaut) — inspire `fr-card`

```
┌──────────────────────────┐
│ ┌────┐                   │
│ │    │  Sophie MARTIN     │
│ │ 📷 │  Directrice gen.   │
│ └────┘  ┌──────────────┐ │
│         │ DG  │ Info   │ │
│         └──────────────┘ │
│  Direction generale       │
└──────────────────────────┘
```

HTML interne du noeud (inspiré `fr-card--horizontal` + `fr-card--sm`) :

```html
<div class="orgchart__node" data-node-id="1">
  <div class="orgchart__node-img">
    <img src="photo.jpg" alt="Sophie Martin" />
  </div>
  <div class="orgchart__node-content">
    <p class="orgchart__node-name">Sophie MARTIN</p>
    <p class="orgchart__node-role">Directrice generale</p>
    <div class="orgchart__node-badges">
      <span class="orgchart__badge orgchart__badge--info">DG</span>
    </div>
    <p class="orgchart__node-direction">Direction generale</p>
  </div>
</div>
```

On utilise des classes propres (`orgchart__*`) plutot que les classes DSFR directement, pour :
- Fonctionner en Shadow DOM sans charger tout le CSS DSFR
- Garder le controle sur le dimensionnement (les cartes DSFR ont des tailles minimales trop grandes pour un organigramme)
- S'inspirer du look DSFR (couleurs, typographie, arrondis) sans en dependre

Les custom properties CSS permettent de personnaliser le theme :

```css
gouv-orgchart {
  --orgchart-node-bg: var(--background-default-grey, #fff);
  --orgchart-node-border: var(--border-default-grey, #ddd);
  --orgchart-node-radius: 0.25rem;
  --orgchart-connector-color: var(--border-default-grey, #ddd);
  --orgchart-connector-width: 2px;
  --orgchart-node-width: 220px;
  --orgchart-node-gap: 1.5em;
  --orgchart-level-gap: 2em;
  --orgchart-font-family: "Marianne", arial, sans-serif;
  --orgchart-name-color: var(--text-title-grey, #161616);
  --orgchart-role-color: var(--text-mention-grey, #666);
  --orgchart-highlight-color: var(--background-action-high-blue-france, #000091);
  --orgchart-vacant-opacity: 0.5;
}
```

#### Mode `compact` — minimal

```
┌──────────────────┐
│ Sophie MARTIN     │
│ Directrice gen.  │
└──────────────────┘
```

Pas de photo, pas de badge, juste nom + fonction. Pour les grands organigrammes (50+ noeuds).

#### Mode `detailed` — avec coordonnees

```
┌──────────────────────────────┐
│ ┌────┐                       │
│ │    │  Sophie MARTIN         │
│ │ 📷 │  Directrice generale   │
│ └────┘  ┌──────┐             │
│         │ DG   │             │
│         └──────┘             │
│  Direction generale           │
│  ✉ sophie.martin@gouv.fr     │
│  ☎ 01 23 45 67 89            │
└──────────────────────────────┘
```

### 4.3 Styles speciaux

| `role_type` | Style visuel |
|-------------|-------------|
| `standard` | Carte normale, connecteur solid |
| `assistant` | Carte avec bordure gauche coloree, position decalee a gauche du parent, connecteur dashed |
| `transversal` | Carte avec fond legerement different, position decalee a droite du parent, connecteur dashed |
| `vacant` | Carte avec opacite reduite, icone "poste vacant", texte "(vacant)" |

### 4.4 Responsive

**Au-dessus du breakpoint** (>768px par defaut) :
- Layout horizontal classique (arbre de haut en bas ou gauche a droite)
- Zoom actif pour naviguer dans les grands organigrammes
- Scroll horizontal si l'arbre deborde

**En-dessous du breakpoint** (<=768px) :
- Basculement en **liste indentee** (tree view vertical)
- Chaque niveau est indente par un `padding-left`
- Connecteurs simplifies (trait vertical a gauche)
- Les noeuds prennent toute la largeur
- Pas de zoom, scroll natif

```
▼ Sophie MARTIN — Directrice generale [DG]
  ├── Pierre DURAND — SGA [Adjoint]
  ├── Jean LEFEVRE — Conseiller numerique [Mission]
  ▼ Marie BERNARD — DRH [Directrice]
    ├── (Vacant) — Chef de bureau recrutement
    └── Paul ROUX — Chef de bureau formation
```

---

## 5. Interactions

### 5.1 Navigation

| Action | Comportement |
|--------|-------------|
| Clic sur un noeud | Selectionne le noeud, emet `node-click`, surligne le chemin vers la racine si `highlight-path` |
| Clic sur le bouton expand/collapse | Deplie/plie le sous-arbre du noeud |
| Molette / pinch | Zoom avant/arriere (si `zoom` actif) |
| Clic + drag | Pan de la vue (si `zoom` actif) |
| Double-clic | Recentre la vue sur le noeud clique |

### 5.2 Recherche

Si `searchable` est actif, une barre de recherche est affichee au-dessus de l'organigramme.

- Recherche par nom, prenom, fonction, direction (insensible a la casse, insensible aux accents)
- Les noeuds correspondants sont surlignés et les branches parentes sont automatiquement depliees
- L'arbre se recentre sur le premier resultat
- Un compteur affiche le nombre de resultats
- Les resultats sont navigables (boutons precedent/suivant ou fleches clavier)

### 5.3 Accessibilite

- Structure ARIA : `role="tree"`, `role="treeitem"`, `role="group"`, `aria-expanded`
- Navigation clavier : fleches haut/bas pour naviguer entre noeuds du meme niveau, gauche/droite pour plier/deplier
- Focus visible sur le noeud actif
- `aria-label` sur le composant et descriptions sur chaque noeud
- Contrast des couleurs conforme WCAG 2.1 AA (garanti par les couleurs DSFR)
- Alternative au zoom : boutons +/- en plus du geste molette

---

## 6. Architecture technique

### 6.1 Structure du projet

```
gouv-orgchart/
├── src/
│   ├── gouv-orgchart.ts          # Composant principal (LitElement)
│   ├── orgchart-node.ts          # Sous-composant noeud
│   ├── orgchart-search.ts        # Sous-composant recherche
│   ├── tree-builder.ts           # Conversion donnees plates → arbre
│   ├── tree-validator.ts         # Validation des donnees
│   ├── styles/
│   │   ├── orgchart.css          # Layout arbre + connecteurs
│   │   ├── node-card.css         # Style noeud mode card
│   │   ├── node-compact.css      # Style noeud mode compact
│   │   ├── node-detailed.css     # Style noeud mode detailed
│   │   └── responsive.css        # Media queries + mode mobile
│   └── types.ts                  # Types TypeScript
├── grist-plugin/
│   ├── index.html                # Page du widget Grist
│   ├── plugin.js                 # Integration Grist Plugin API
│   └── config.html               # Panneau de configuration (optionnel)
├── demo/
│   ├── index.html                # Page de demo avec exemples
│   ├── data-simple.json          # Donnees exemple simple (5 noeuds)
│   ├── data-ministere.json       # Donnees exemple ministere (~30 noeuds)
│   └── data-roles.json           # Donnees exemple avec roles speciaux
├── tests/
│   ├── tree-builder.test.ts      # Tests conversion donnees
│   ├── tree-validator.test.ts    # Tests validation
│   └── orgchart.test.ts          # Tests composant
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 6.2 Dependances

| Dependance | Version | Justification |
|------------|---------|---------------|
| `lit` | ^3.x | Framework Web Components |
| `vite` | ^5.x | Build + dev server |
| `typescript` | ^5.x | Typage |
| `vitest` | ^1.x | Tests unitaires |

**Pas de D3.** Le layout est gere en CSS pur. La construction de l'arbre (conversion flat→tree) est une fonction TypeScript simple (~30 lignes).

### 6.3 Algorithme de construction de l'arbre

```typescript
interface OrgNode {
  id: string | number;
  parentId: string | number | null;
  data: Record<string, unknown>;
  children: OrgNode[];
  assistants: OrgNode[];    // role_type === "assistant"
  transversals: OrgNode[];  // role_type === "transversal"
  depth: number;
  isLeaf: boolean;
}

function buildTree(
  records: Record<string, unknown>[],
  fieldMapping: FieldMapping
): OrgNode {
  // 1. Creer une Map id → noeud
  const nodeMap = new Map<string | number, OrgNode>();
  for (const record of records) {
    const id = record[fieldMapping.id];
    nodeMap.set(id, {
      id,
      parentId: record[fieldMapping.parent],
      data: record,
      children: [],
      assistants: [],
      transversals: [],
      depth: 0,
      isLeaf: true,
    });
  }

  // 2. Construire les relations parent-enfant
  let root: OrgNode | null = null;
  for (const node of nodeMap.values()) {
    if (node.parentId === null || node.parentId === '') {
      root = node;
    } else {
      const parent = nodeMap.get(node.parentId);
      if (!parent) throw new Error(`Parent ${node.parentId} introuvable pour ${node.id}`);
      const roleType = node.data[fieldMapping.roleType] || 'standard';
      if (roleType === 'assistant') {
        parent.assistants.push(node);
      } else if (roleType === 'transversal') {
        parent.transversals.push(node);
      } else {
        parent.children.push(node);
      }
      parent.isLeaf = false;
    }
  }

  // 3. Calculer les profondeurs
  function setDepth(node: OrgNode, depth: number) {
    node.depth = depth;
    for (const child of [...node.assistants, ...node.transversals, ...node.children]) {
      setDepth(child, depth + 1);
    }
  }
  if (root) setDepth(root, 0);

  // 4. Trier les enfants par ordre
  function sortChildren(node: OrgNode) {
    const orderField = fieldMapping.order;
    if (orderField) {
      const sortFn = (a: OrgNode, b: OrgNode) =>
        (Number(a.data[orderField]) || 0) - (Number(b.data[orderField]) || 0);
      node.children.sort(sortFn);
      node.assistants.sort(sortFn);
      node.transversals.sort(sortFn);
    }
    node.children.forEach(sortChildren);
  }
  if (root) sortChildren(root);

  return root!;
}
```

### 6.4 Rendu Lit

```typescript
@customElement('gouv-orgchart')
export class GouvOrgchart extends LitElement {
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ attribute: 'id-field' }) idField = 'id';
  @property({ attribute: 'parent-field' }) parentField = 'parent_id';
  // ... autres field mappings

  @property({ attribute: 'node-style' }) nodeStyle: 'card' | 'compact' | 'detailed' = 'card';
  @property({ type: Boolean }) searchable = true;
  @property({ type: Boolean }) collapsible = true;
  @property({ attribute: 'expand-level', type: Number }) expandLevel = 2;

  @state() private _tree: OrgNode | null = null;
  @state() private _searchQuery = '';
  @state() private _highlightedPath: Set<string | number> = new Set();
  @state() private _collapsedNodes: Set<string | number> = new Set();

  // Construction de l'arbre a chaque changement de data
  willUpdate(changed: PropertyValues) {
    if (changed.has('data') && this.data?.length) {
      try {
        this._tree = buildTree(this.data, this._getFieldMapping());
        this._initCollapsedState();
      } catch (e) {
        this.dispatchEvent(new CustomEvent('data-error', {
          detail: { type: 'validation', message: (e as Error).message }
        }));
      }
    }
  }

  render() {
    if (!this._tree) {
      return html`<p class="orgchart__empty">${this.emptyMessage}</p>`;
    }
    return html`
      ${this.title ? html`<h2 class="orgchart__title">${this.title}</h2>` : ''}
      ${this.searchable ? html`<orgchart-search
        @search=${this._onSearch}
      ></orgchart-search>` : ''}
      <div class="orgchart__viewport" role="tree" aria-label="${this.title || 'Organigramme'}">
        <ul class="orgchart__level">
          ${this._renderNode(this._tree)}
        </ul>
      </div>
    `;
  }

  private _renderNode(node: OrgNode): TemplateResult {
    const isCollapsed = this._collapsedNodes.has(node.id);
    const isHighlighted = this._highlightedPath.has(node.id);
    const hasChildren = node.children.length > 0 || node.assistants.length > 0 || node.transversals.length > 0;

    return html`
      <li class="orgchart__branch ${classMap({
        'orgchart__branch--highlighted': isHighlighted,
        'orgchart__branch--collapsed': isCollapsed,
      })}"
        role="treeitem"
        aria-expanded=${hasChildren ? !isCollapsed : nothing}
      >
        <!-- Assistants (positionnes a gauche) -->
        ${node.assistants.map(a => html`
          <div class="orgchart__aside orgchart__aside--left">
            <orgchart-node .node=${a} style=${this.nodeStyle}
              ?highlighted=${this._highlightedPath.has(a.id)}
              @click=${() => this._onNodeClick(a)}
            ></orgchart-node>
          </div>
        `)}

        <!-- Noeud principal -->
        <orgchart-node .node=${node} style=${this.nodeStyle}
          ?highlighted=${isHighlighted}
          ?collapsible=${this.collapsible && hasChildren}
          ?collapsed=${isCollapsed}
          @click=${() => this._onNodeClick(node)}
          @toggle=${() => this._toggleNode(node.id)}
        ></orgchart-node>

        <!-- Transversaux (positionnes a droite) -->
        ${node.transversals.map(t => html`
          <div class="orgchart__aside orgchart__aside--right">
            <orgchart-node .node=${t} style=${this.nodeStyle}
              ?highlighted=${this._highlightedPath.has(t.id)}
              @click=${() => this._onNodeClick(t)}
            ></orgchart-node>
          </div>
        `)}

        <!-- Enfants -->
        ${hasChildren && !isCollapsed ? html`
          <ul class="orgchart__level" role="group">
            ${node.children.map(child => this._renderNode(child))}
          </ul>
        ` : ''}
      </li>
    `;
  }
}
```

---

## 7. Plugin Grist

### 7.1 Fonctionnement

Le plugin Grist est un **widget custom** (page HTML) deploye sur GitHub Pages. Il utilise le Grist Plugin API pour :
1. Lire les donnees de la table selectionnee
2. Mapper les colonnes via `grist.ready({ columns: [...] })`
3. Instancier le composant `<gouv-orgchart>` avec les donnees

### 7.2 Mapping des colonnes Grist

```javascript
const columnsMappingOptions = [
  { name: "id",        title: "Identifiant unique",           optional: false, type: "Int",  allowMultiple: false },
  { name: "parentId",  title: "Identifiant du N+1",           optional: false, type: "Ref",  allowMultiple: false },
  { name: "nom",       title: "Nom de la personne",           optional: false, type: "Text", allowMultiple: false },
  { name: "prenom",    title: "Prenom",                       optional: true,  type: "Text", allowMultiple: false },
  { name: "fonction",  title: "Fonction / poste",             optional: true,  type: "Text", allowMultiple: false },
  { name: "direction", title: "Direction / service",           optional: true,  type: "Text", allowMultiple: false },
  { name: "roleType",  title: "Type de role (standard/assistant/transversal)", optional: true, type: "Choice", allowMultiple: false },
  { name: "image",     title: "Photo",                        optional: true,  type: "Attachments", allowMultiple: false },
  { name: "badge",     title: "Badge / etiquette",            optional: true,  type: "Text", allowMultiple: false },
  { name: "vacant",    title: "Poste vacant",                 optional: true,  type: "Bool", allowMultiple: false },
  { name: "email",     title: "Email",                        optional: true,  type: "Text", allowMultiple: false },
  { name: "telephone", title: "Telephone",                    optional: true,  type: "Text", allowMultiple: false },
  { name: "ordre",     title: "Ordre d'affichage",            optional: true,  type: "Int",  allowMultiple: false },
];
```

### 7.3 Configuration persistante

Le plugin stocke ses options via `grist.setOption()` / `grist.getOption()` :
- `titre` : titre de l'organigramme
- `nodeStyle` : style des noeuds (card/compact/detailed)
- `orientation` : direction de l'arbre
- `expandLevel` : niveaux deployes par defaut

### 7.4 Deploiement

```
gouv-orgchart/
├── grist-plugin/
│   ├── index.html        ← Widget URL pour Grist
│   └── ...
```

Deploye via GitHub Pages sur `https://<user>.github.io/gouv-orgchart/grist-plugin/`

L'utilisateur Grist ajoute le widget custom avec cette URL dans la configuration de sa page.

---

## 8. Gestion du zoom et du pan

### 8.1 Approche : CSS transform

Le zoom et le pan sont geres **sans D3** via CSS `transform` sur le viewport :

```typescript
@state() private _zoom = 1;
@state() private _panX = 0;
@state() private _panY = 0;

private _onWheel(e: WheelEvent) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  this._zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this._zoom + delta));
}

private _onPointerDown(e: PointerEvent) { /* debut du drag */ }
private _onPointerMove(e: PointerEvent) { /* pan */ }

// Dans le template :
// <div class="orgchart__viewport"
//   style="transform: translate(${this._panX}px, ${this._panY}px) scale(${this._zoom})">
```

### 8.2 Controles de zoom

```html
<div class="orgchart__controls">
  <button @click=${this._zoomIn} aria-label="Zoom avant">+</button>
  <button @click=${this._zoomOut} aria-label="Zoom arriere">-</button>
  <button @click=${this._zoomReset} aria-label="Reinitialiser la vue">⟲</button>
  <button @click=${this._fitToView} aria-label="Ajuster a la vue">◻</button>
</div>
```

---

## 9. Plan d'implementation

### Phase 1 : MVP (arbre strict)
1. Setup projet (Vite + Lit + TypeScript)
2. `tree-builder.ts` + `tree-validator.ts` avec tests
3. Composant `gouv-orgchart` : rendu arbre CSS, mode `card`
4. Connecteurs CSS (solid uniquement)
5. Expand/collapse
6. Page de demo avec donnees statiques

### Phase 2 : Interactions
7. Recherche avec surlignage
8. Zoom / pan
9. Highlight du chemin vers la racine
10. Navigation clavier
11. Mode responsive (liste indentee)

### Phase 3 : Roles speciaux
12. Positionnement assistant (gauche du parent)
13. Positionnement transversal (droite du parent)
14. Connecteurs en pointilles
15. Style "vacant"
16. Mode `compact` et `detailed`

### Phase 4 : Plugin Grist
17. Integration Grist Plugin API
18. Mapping colonnes
19. Configuration persistante
20. Deploiement GitHub Pages
21. Documentation utilisateur

### Phase 5 : Integration gouv-widgets (optionnel)
22. Mode `source="..."` compatible pipeline gouv-source
23. Alignement avec le systeme de build gouv-widgets
24. Tests d'integration

---

## 10. Questions ouvertes

1. **Multi-racine** : faut-il gerer les organigrammes avec plusieurs arbres independants (ex: groupe avec plusieurs entites) ? Si oui, on peut ajouter un noeud racine virtuel invisible.

2. **Lien fonctionnel** : au-dela de assistant/transversal, faut-il modeliser des liens fonctionnels (pointilles) entre deux noeuds quelconques ? Cela casse le modele d'arbre et necessite un overlay SVG pour les connecteurs arbitraires.

3. **Impression** : faut-il un mode d'impression specifique (CSS `@media print`) ? Les organigrammes larges sont difficiles a imprimer.

4. **Export** : SVG et PNG sont prevus. Faut-il aussi un export PDF ?

5. **Theming** : les custom properties CSS suffisent-elles ou faut-il un systeme de themes plus structure (light/dark, DSFR strict vs custom) ?

6. **Taille maximale** : quel est le nombre de noeuds maximal vise ? 50 ? 200 ? 500+ ? Cela conditionne le choix CSS-only vs D3 pour le layout (CSS commence a souffrir au-dela de ~100 noeuds).
