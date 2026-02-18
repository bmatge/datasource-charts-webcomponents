# Bug Report : Exemples casses sur les pages specs et guides

**Date** : 2026-02-18
**Severite** : Haute - Multiples exemples live non fonctionnels sur les pages de documentation

---

## Resume

Suite au commit `988e875` ("feat: decommission shadow source from gouv-query"), de nombreux exemples live dans les pages de specifications et du guide utilisateur ne fonctionnent plus. La cause principale est l'utilisation de l'ancien pattern `<gouv-query api-type="..." resource="...">` qui a ete supprime lors de la decommission de la "shadow source" de `gouv-query`.

Un second probleme potentiel concerne `gouv-world-map` avec des donnees inline (`data` attribute) qui pourrait etre lie a un probleme de timing dans le cycle de vie Lit.

---

## Cause racine principale : Pattern `<gouv-query api-type>` deprecie

### Contexte

Le commit `988e875` a supprime de `gouv-query` les attributs suivants :
- `api-type`
- `base-url`
- `dataset-id`
- `resource`
- `select`
- `headers`

Ainsi que le mecanisme interne de "shadow source" qui permettait a `gouv-query` de creer implicitement un `<gouv-source>` cache pour effectuer des requetes HTTP.

**Avant** (ancien pattern, maintenant casse) :
```html
<gouv-query id="data"
  api-type="tabular"
  resource="2876a346-...">
</gouv-query>
```

**Apres** (pattern correct) :
```html
<gouv-source id="data"
  api-type="tabular"
  resource="2876a346-...">
</gouv-source>
```

Le commit `91657db` a corrige les references textuelles (commentaires, docs, prompts IA) mais n'a pas corrige les exemples HTML live dans les pages specs et guides.

---

## Inventaire complet des fichiers impactes

### A. Pages de specification (specs/) - Elements HTML live casses

#### 1. `specs/components/gouv-normalize.html` (lignes 24-28)

**Symptome** : Exemple "conversion numerique + renommage" - les donnees brutes et normalisees ne s'affichent pas.

**Code casse** :
```html
<gouv-query
  id="demo-raw"
  api-type="tabular"
  resource="2876a346-d50c-4911-934e-19ee07b0e503">
</gouv-query>
```

**Correctif** : Remplacer `gouv-query` par `gouv-source` (meme attributs).

**Impact en cascade** : `gouv-normalize id="demo-clean"` et les deux `gouv-datalist` en aval ne recoivent jamais de donnees.

---

#### 2. `specs/components/gouv-facets.html` (lignes 28-31)

**Symptome** : Exemples 1, 4, 5, 6 - les donnees ne s'affichent pas. (Exemples 2 et 3 fonctionnent car ils utilisent `gouv-source` avec `url=`.)

**Code casse** :
```html
<gouv-query id="elus-raw"
  api-type="tabular"
  resource="2876a346-d50c-4911-934e-19ee07b0e503">
</gouv-query>
```

**Correctif** : Remplacer `gouv-query` par `gouv-source`.

**Impact en cascade** : `gouv-normalize id="elus-clean"` ne recoit rien, donc tous les `gouv-facets` qui s'y branchent (`elus-filtered`, `elus-display-demo`, `elus-hide-counts-demo`, `elus-cols-demo`) restent vides, ainsi que les `gouv-datalist` en aval.

**Egalement** : Le code block de l'exemple 1 (lignes 159-161) montre aussi l'ancien pattern `<gouv-query>` au lieu de `<gouv-source>` - a mettre a jour pour la coherence documentaire.

---

#### 3. `specs/components/gouv-search.html` (lignes 28-31)

**Symptome** : Exemples 1 et 2 - les donnees ne s'affichent pas.

**Code casse** :
```html
<gouv-query id="elus-raw"
  api-type="tabular"
  resource="2876a346-d50c-4911-934e-19ee07b0e503">
</gouv-query>
```

**Correctif** : Remplacer `gouv-query` par `gouv-source`.

**Impact en cascade** : `gouv-normalize id="elus-clean"` ne recoit rien, donc `gouv-search`, `gouv-facets`, `gouv-datalist`, `gouv-display` en aval restent vides. L'exemple 3 (Industrie du futur) fonctionne car il utilise deja `gouv-source url="..."`.

---

#### 4. `specs/components/gouv-world-map.html` (lignes 120-145)

**Symptome** : Exemple "Carte simple avec donnees embarquees" - la carte ne s'affiche pas.

**Code** :
```html
<gouv-source id="demo-pib" data='[{"code":"US","pib":25462}, ...]'></gouv-source>
<gouv-world-map source="demo-pib" code-field="code" value-field="pib" ...></gouv-world-map>
```

**Cause possible** : Race condition potentielle dans le cycle de vie Lit. `gouv-world-map` s'abonne dans `connectedCallback()` et verifie le cache, mais `gouv-source` ne dispatche les donnees inline que dans `updated()` (microtask). En principe, l'event listener devrait capter l'evenement, mais il est possible qu'un probleme specifique a `gouv-world-map` (rendu SVG asynchrone, chargement lazy de d3-geo/topojson) interfere.

**Investigation necessaire** : Verifier dans la console du navigateur si `gouv-world-map` recoit bien les donnees ou s'il y a une erreur JavaScript. Le probleme pourrait etre un bug propre au composant worldmap (non lie au decommissionnement de la shadow source).

---

### B. Pages du guide (guide/) - Code blocks injectes comme HTML live

Les pages du guide utilisent un mecanisme de lazy-loading : un `IntersectionObserver` extrait le contenu des blocs `<pre class="example-code">` et l'injecte comme HTML live via `container.innerHTML`. Par consequent, les code blocks contenant l'ancien pattern deviennent des elements HTML fonctionnels casses.

#### 5. `guide/guide-exemples-source.html` (lignes 294-296)

**Exemple impacte** : "Tableau — Maires de France" (dernier exemple de la section gouv-source directe)

**Code casse dans le bloc** :
```html
<gouv-query id="data"
  api-type="tabular"
  resource="2876a346-d50c-4911-934e-19ee07b0e503"></gouv-query>
```

**Correctif** : Remplacer `gouv-query` par `gouv-source` dans le code block.

---

#### 6. `guide/guide-exemples-normalize.html` (lignes 169-171)

**Exemple impacte** : "Tableau — Renommage de champs accentes"

**Code casse dans le bloc** :
```html
<gouv-query id="data"
  api-type="tabular"
  resource="2876a346-d50c-4911-934e-19ee07b0e503"></gouv-query>
```

**Correctif** : Remplacer `gouv-query` par `gouv-source` dans le code block.

---

#### 7. `guide/guide-exemples-search.html` (lignes 179-181)

**Exemple impacte** : "Recherche + facettes + cartes"

**Code casse dans le bloc** :
```html
<gouv-query id="raw"
  api-type="tabular"
  resource="2876a346-d50c-4911-934e-19ee07b0e503"></gouv-query>
```

**Correctif** : Remplacer `gouv-query` par `gouv-source` dans le code block.

---

### C. Pages non impactees (verification effectuee)

Les fichiers suivants ont ete verifies et utilisent correctement `gouv-source` :

- `guide/guide-exemples-query.html` - Tous les exemples utilisent `<gouv-source>` correctement
- `guide/guide-exemples-facets.html` - Tous les exemples utilisent `<gouv-source>` correctement
- `guide/guide-exemples-avances.html` - Elements live avec `<gouv-source>` correct
- `guide/guide-exemples-display.html` - OK
- `guide/guide-exemples-raw-data.html` - OK
- `guide/guide-exemples-maires.html` - OK
- `guide/guide-exemples-ghibli.html` - OK
- `guide/guide-exemples-insee-erfs.html` - OK
- `specs/components/gouv-source.html` - OK
- `specs/components/gouv-query.html` - OK
- `specs/components/gouv-dsfr-chart.html` - OK
- `specs/apis/*.html` - OK (pas d'exemples live avec l'ancien pattern)
- `specs/charts/*.html` - OK

---

## Synthese des correctifs

### Correctifs rapides (remplacement `gouv-query` -> `gouv-source`)

| # | Fichier | Lignes | Type | Correction |
|---|---------|--------|------|------------|
| 1 | `specs/components/gouv-normalize.html` | 24-28 | HTML live | `<gouv-query>` -> `<gouv-source>` |
| 2 | `specs/components/gouv-facets.html` | 28-31 | HTML live | `<gouv-query>` -> `<gouv-source>` |
| 3 | `specs/components/gouv-facets.html` | 159-162 | Code block | `<gouv-query>` -> `<gouv-source>` (doc) |
| 4 | `specs/components/gouv-search.html` | 28-31 | HTML live | `<gouv-query>` -> `<gouv-source>` |
| 5 | `guide/guide-exemples-source.html` | 294-296 | Code block (live) | `<gouv-query>` -> `<gouv-source>` |
| 6 | `guide/guide-exemples-normalize.html` | 169-171 | Code block (live) | `<gouv-query>` -> `<gouv-source>` |
| 7 | `guide/guide-exemples-search.html` | 179-181 | Code block (live) | `<gouv-query>` -> `<gouv-source>` |

### Investigation supplementaire requise

| # | Fichier | Probleme |
|---|---------|----------|
| 8 | `specs/components/gouv-world-map.html` | Carte avec `data` inline ne s'affiche pas - verifier timing Lit ou bug propre au composant |

---

## Impact utilisateur

- **7 exemples live casses** sur les pages de specification (gouv-normalize, gouv-facets x5, gouv-search x2)
- **3 exemples live casses** dans le guide (gouv-source datalist, gouv-normalize datalist, gouv-search facets)
- **1 exemple a investiguer** (gouv-world-map)
- Les exemples non impactes fonctionnent correctement (gouv-query guide, facets guide, avances, display, raw-data, maires, ghibli, INSEE)

---

## Proposition de resolution

1. **Correction immediate** : Remplacer `<gouv-query>` par `<gouv-source>` dans les 7 occurrences identifiees (3 elements HTML live + 1 code block doc + 3 code blocks live)
2. **Investigation worldmap** : Tester l'exemple worldmap en local pour identifier la cause exacte
3. **Prevention** : Ajouter un test de regression (grep dans les fichiers HTML) pour detecter toute utilisation de `<gouv-query api-type=` (hors blocs de texte informatif) avant chaque release
