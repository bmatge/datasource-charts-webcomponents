# Matrice de tests exhaustive du Builder

Ce document liste **tous les paramètres** disponibles dans le builder et comment les vérifier.

## 🎯 Objectif

S'assurer que chaque paramètre :
1. ✅ Modifie correctement le **preview**
2. ✅ Génère le bon **code HTML**
3. ✅ Produit des **valeurs cohérentes** avec les données source

---

## 📊 Dataset de test recommandé

```json
[
  { "region": "Ile-de-France", "population": 12000, "budget": 500, "code": "75" },
  { "region": "Provence", "population": 5000, "budget": 200, "code": "13" },
  { "region": "Bretagne", "population": 3000, "budget": 150, "code": "35" },
  { "region": "Normandie", "population": 3300, "budget": 180, "code": "14" }
]
```

### Valeurs attendues par fonction d'agrégation

| Fonction | population | budget |
|----------|------------|--------|
| **sum** | 23300 | 1030 |
| **avg** | 5825 | 257.5 |
| **count** | 4 | 4 |
| **min** | 3000 | 150 |
| **max** | 12000 | 500 |

---

## 1️⃣ Source de données

| Paramètre | Valeurs | Vérification |
|-----------|---------|--------------|
| Saved source | Dropdown | Charge les fields correctement |

**Test manuel** :
1. Sélectionner une source
2. Cliquer sur "Charger"
3. ✅ Les dropdowns label-field et value-field sont remplis
4. ✅ Le status affiche "Champs chargés"

---

## 2️⃣ Mode de génération

| Paramètre | Valeurs | Code généré attendu |
|-----------|---------|---------------------|
| Mode | `embedded` / `dynamic` | `<gouv-source>` si dynamic |
| Refresh interval | 0-3600 (secondes) | `refresh="XX"` si > 0 |

**Test manuel** :
1. Sélectionner mode "dynamic"
2. Définir refresh = 60
3. ✅ Code contient `<gouv-source>`
4. ✅ Code contient `refresh="60"`

---

## 3️⃣ Nettoyage des données (gouv-normalize)

| Paramètre | Type | Code attendu |
|-----------|------|--------------|
| `normalize-enabled` | toggle | `<gouv-normalize>` |
| `flatten` | text | `flatten="..."` |
| `trim` | checkbox | `trim` |
| `numeric-auto` | checkbox | `numeric-auto` |
| `numeric` | text | `numeric="..."` |
| `rename` | text | `rename="..."` |
| `strip-html` | checkbox | `strip-html` |
| `replace` | text | `replace="..."` |
| `lowercase-keys` | checkbox | `lowercase-keys` |

**Test manuel** :
1. Activer normalize
2. Cocher "trim" et "numeric-auto"
3. Remplir flatten = "fields"
4. ✅ Code contient `<gouv-normalize id="normalized-data" ... trim numeric-auto flatten="fields">`

---

## 4️⃣ Filtres à facettes (gouv-facets)

| Paramètre | Type | Code attendu |
|-----------|------|--------------|
| `facets-enabled` | toggle | `<gouv-facets>` |
| Fields configuration | modal | `fields="..."` |
| `max-values` | number (2-50) | `max-values="..."` |
| `sort` | select | `sort="count/-count/alpha/-alpha"` |
| `hide-empty` | checkbox | `hide-empty` |

**Test manuel** :
1. Activer facets
2. Configurer 2 champs (region, code)
3. Définir max-values = 10, sort = "alpha"
4. ✅ Code contient `<gouv-facets ... fields="region, code" max-values="10" sort="alpha">`

---

## 5️⃣ Types de graphiques (11 types)

| Type | Tag DSFR attendu | Attributs spéciaux | Canvas Chart.js |
|------|------------------|-------------------|----------------|
| `bar` | `<bar-chart>` | - | Non |
| `horizontalBar` | `<bar-chart>` | `horizontal` | Non |
| `line` | `<line-chart>` | - | Non |
| `pie` | `<pie-chart>` | `fill` | Non |
| `doughnut` | `<pie-chart>` | - | Non |
| `radar` | `<radar-chart>` | - | Non |
| `scatter` | `<scatter-chart>` | - | Non |
| `gauge` | `<gauge-chart>` | `percent` | Non |
| `kpi` | `<div class="kpi-card">` | variant classes | Non |
| `map` | `<map-chart>` | `data`, `value`, `date` | Non |
| `datalist` | `<gouv-datalist>` | `colonnes`, `pagination` | Non |

**Test manuel pour chaque type** :
1. Sélectionner le type
2. Générer
3. ✅ Preview affiche le bon composant visuel
4. ✅ Code contient le bon tag
5. ✅ Attributs spéciaux présents

### ⚠️ Problèmes connus
- [ ] **horizontalBar** : vérifier que `horizontal` est bien présent
- [ ] **pie** : vérifier que `fill` est bien présent
- [ ] **map** : vérifier que `value` et `date` sont appliqués après délai (deferred)

---

## 6️⃣ Configuration des données

### Champs

| Paramètre | Utilisation | Obligatoire |
|-----------|-------------|-------------|
| `label-field` | Axe X / Categories | Oui (sauf KPI) |
| `value-field` | Axe Y / Valeurs | Oui |
| `value-field-2` | Série 2 | Non |
| `code-field` | Code dept (maps) | Oui pour maps |

**Test manuel** :
1. Sélectionner label-field = "region"
2. Sélectionner value-field = "population"
3. ✅ Preview affiche 4 barres (4 régions)
4. ✅ Code contient `label-field="region"` et `value-field="..."`

### Agrégations ⚠️ **CRITIQUE**

| Fonction | Formule | Valeur attendue (population) |
|----------|---------|------------------------------|
| `avg` | moyenne | 5825 |
| `sum` | somme | 23300 |
| `count` | comptage | 4 |
| `min` | minimum | 3000 |
| `max` | maximum | 12000 |

**Test manuel EXHAUSTIF** :
1. Pour **chaque fonction** (avg, sum, count, min, max) :
   - Sélectionner la fonction
   - Générer
   - ✅ Vérifier la valeur dans le preview (données brutes)
   - ✅ Vérifier que le code contient `sum(population)` ou `avg(population)`
   - ✅ **COMPARER** la valeur affichée avec le calcul manuel

### Exemple de vérification pour SUM
```javascript
// Dataset
const data = [12000, 5000, 3000, 3300];
const expectedSum = 23300;

// Dans le preview, vérifier que la somme totale = 23300
```

### Tri

| Valeur | Ordre attendu |
|--------|---------------|
| `desc` | Décroissant (12000 → 3000) |
| `asc` | Croissant (3000 → 12000) |

**Test manuel** :
1. Sélectionner tri = "desc"
2. Générer
3. ✅ Les barres sont triées de la plus haute à la plus basse
4. ✅ Code contient `order-by="...:desc"`

---

## 7️⃣ Mode avancé

| Paramètre | Format | Code attendu |
|-----------|--------|--------------|
| `query-filter` | `field:op:value` | `filter="..."` ou `where="..."` |
| `query-group-by` | `field1, field2` | `group-by="..."` |
| `query-aggregate` | `field:func` | `aggregate="..."` |

### Opérateurs de filtre supportés

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| `eq` | égal | `status:eq:actif` |
| `neq` | différent | `status:neq:inactif` |
| `gt` | supérieur strict | `population:gt:5000` |
| `gte` | supérieur ou égal | `population:gte:5000` |
| `lt` | inférieur strict | `budget:lt:200` |
| `lte` | inférieur ou égal | `budget:lte:200` |
| `contains` | contient | `region:contains:France` |
| `in` | dans liste | `code:in:75\|13\|35` |
| `isnull` | est null | `budget:isnull:` |
| `isnotnull` | n'est pas null | `budget:isnotnull:` |

**Test manuel pour les filtres** :
1. Activer mode avancé
2. Saisir `population:gte:4000`
3. Générer
4. ✅ Preview affiche seulement 2 régions (Ile-de-France, Provence)
5. ✅ Code contient `filter=` ou `where=`

**⚠️ VÉRIFICATION CRITIQUE** : Le nombre de résultats doit correspondre au filtre !

---

## 8️⃣ Options Datalist

| Paramètre | Code attendu |
|-----------|--------------|
| `datalist-recherche` | `recherche` |
| `datalist-filtres` | `filtres="..."` |
| `datalist-export` (CSV) | `export="csv"` |
| `datalist-export-html` | `export="csv,html"` |
| Colonnes (modal) | `colonnes="field:label, ..."` |

**Test manuel** :
1. Sélectionner type = "datalist"
2. Cocher "Recherche" et "Export CSV"
3. ✅ Code contient `recherche` et `export="csv"`

---

## 9️⃣ Apparence

| Paramètre | Code attendu |
|-----------|--------------|
| `chart-title` | `<h2>...</h2>` ou `name="..."` |
| `chart-subtitle` | `<p class="fr-text--sm">...</p>` |

### Palettes (7 palettes)

| Palette | Usage recommandé |
|---------|------------------|
| `default` | Bleu France (par défaut) |
| `categorical` | Graphiques avec plusieurs catégories distinctes |
| `sequentialAscending` | Cartes choroplèthes (valeurs croissantes) |
| `sequentialDescending` | Cartes choroplèthes (valeurs décroissantes) |
| `divergentAscending` | Données avec point central (ex: -100 à +100) |
| `divergentDescending` | Idem, ordre inversé |
| `neutral` | Tons neutres |

**Test manuel** :
1. Pour chaque palette :
   - Sélectionner la palette
   - Générer
   - ✅ Code contient `selected-palette="..."`
   - ✅ Preview affiche les bonnes couleurs

### Options KPI

| Paramètre | Valeurs | Code attendu |
|-----------|---------|--------------|
| `kpi-variant` | `''` / `info` / `success` / `warning` / `error` | `kpi-card--variant` |
| `kpi-unit` | `€`, `%`, texte libre | Formatage dans la valeur |

**Test manuel** :
1. Type = KPI
2. Variant = "success", Unit = "€"
3. ✅ Code contient `kpi-card--success`
4. ✅ Valeur formatée en euros (ex: "23 300 €")

---

## 🔟 Accessibilité

| Paramètre | Code attendu |
|-----------|--------------|
| `raw-data-toggle` | `<gouv-raw-data for="..." source="...">` |

**Test manuel** :
1. Cocher "Ajouter téléchargement CSV"
2. ✅ Code contient `<gouv-raw-data>`

---

## 🧪 Stratégie de tests automatisés

### Tests unitaires (Playwright)

```bash
# Lancer tous les tests exhaustifs
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts

# Lancer uniquement les tests d'agrégation
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts -g "agrégation"

# Lancer avec interface graphique (debug)
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts --ui
```

### Checklist de vérification manuelle

Avant chaque release, vérifier :

- [ ] Les 5 fonctions d'agrégation (avg, sum, count, min, max) avec **calcul manuel**
- [ ] Les 11 types de graphiques
- [ ] Les 7 palettes de couleurs
- [ ] Les 2 ordres de tri (asc, desc)
- [ ] Le mode avancé avec filtres
- [ ] Les séries multiples (value-field-2)
- [ ] Les options KPI (5 variants + unités)
- [ ] Les options Datalist (recherche, export, colonnes)
- [ ] Le mode normalization (9 options)
- [ ] Les filtres à facettes

**Total : ~100 combinaisons critiques à vérifier**

---

## 🐛 Bugs connus à surveiller

### Fonctions d'agrégation
- [ ] `min` / `max` : vérifier qu'ils ne retournent pas toujours 0
- [ ] `avg` : vérifier la précision (arrondi à 2 décimales)
- [ ] `count` : vérifier qu'il compte bien les lignes, pas les valeurs

### Types de graphiques
- [ ] `horizontalBar` : attribut `horizontal` présent
- [ ] `pie` : attribut `fill` présent
- [ ] `map` : attributs `value` et `date` appliqués (deferred)
- [ ] `gauge` : valeur entre 0 et 100

### Mode avancé
- [ ] Opérateurs `contains`, `in`, `isnull` fonctionnent
- [ ] Les filtres multiples sont combinés avec AND

### Palettes
- [ ] Les palettes séquentielles/divergentes sont utilisées pour les maps

---

## 📝 Template de rapport de bug

```markdown
**Paramètre** : [nom du paramètre]
**Valeur configurée** : [valeur]
**Comportement attendu** : [description]
**Comportement observé** : [description]
**Données de test** : [dataset utilisé]
**Code généré** : [extrait du code]
**Screenshot** : [capture d'écran si applicable]
```

---

## 🎯 Priorisation des tests

### P0 - Critique (bloquant)
- Fonctions d'agrégation (avg, sum, count, min, max)
- Types de graphiques principaux (bar, line, pie, kpi, datalist)

### P1 - Important
- Mode avancé (filtres)
- Palettes de couleurs
- Tri des données

### P2 - Nice to have
- Normalization
- Facettes
- KPI variants
- Séries multiples

