# Tests de validation du Builder

Ce dossier contient une suite complète de tests E2E Playwright pour vérifier que **tous les paramètres** du builder gouv-widgets fonctionnent correctement et génèrent le code attendu.

## 📁 Fichiers

### Tests principaux
- **`quick-audit.spec.ts`** : Tests critiques de validation (11/12 passent) - agrégations, graphiques, palettes, tri
- **`simple-test.spec.ts`** : Tests de base des éléments UI (7/8 passent)
- **`inspect-builder.spec.ts`** : Outil de diagnostic de la structure du builder
- **`comprehensive-test.spec.ts`** : Tests exhaustifs de toutes les combinaisons (~100 tests)
- **`aggregation-consistency.spec.ts`** : Tests de cohérence des données (source vs rendu)

### Utilitaires
- **`data-consistency-checker.ts`** : Fonctions de calcul et vérification de cohérence

### Documentation
- **`README.md`** : Ce fichier - guide d'utilisation
- **`RESULTAT_TESTS.md`** : Résultats détaillés des tests (5/5 agrégations validées)
- **`QUICK_START.md`** : Démarrage rapide et troubleshooting
- **`FIX_TESTS.md`** : Guide de résolution des problèmes
- **`SYNTHESE.md`** : Synthèse et vue d'ensemble
- **`TESTING_MATRIX.md`** : Matrice complète des paramètres à tester

### Configuration
- **`playwright.config.ts`** : Configuration Playwright

## 🚀 Lancement rapide

### Pré-requis

```bash
# 1. Serveur de dev doit tourner (port 5173)
npm run dev

# 2. Playwright doit être installé
npx playwright install
```

### Lancer les tests critiques (recommandé)

```bash
# Aller dans le dossier des tests
cd tests/builder-e2e

# Tests critiques - 12 tests de validation (11/12 passent)
npx playwright test quick-audit.spec.ts

# Tests de base - éléments UI (7/8 passent)
npx playwright test simple-test.spec.ts

# Inspection de la structure - diagnostic
npx playwright test inspect-builder.spec.ts --headed
```

### Lancer tous les tests

```bash
# Depuis la racine du projet
npx playwright test --config tests/builder-e2e/playwright.config.ts

# Ou depuis tests/builder-e2e/
cd tests/builder-e2e
npx playwright test
```

### Lancer des tests spécifiques

```bash
# Seulement les tests d'agrégation
npx playwright test quick-audit.spec.ts -g "calcul correct"

# Seulement un type de graphique
npx playwright test quick-audit.spec.ts -g "HorizontalBar"

# Seulement les palettes
npx playwright test quick-audit.spec.ts -g "Palette"

# Test du tri
npx playwright test quick-audit.spec.ts -g "Tri"
```

### Mode interactif (debug)

```bash
# Lancer avec l'UI Playwright pour voir les tests en direct
npx playwright test quick-audit.spec.ts --ui

# Lancer avec le navigateur visible
npx playwright test quick-audit.spec.ts --headed

# Lancer avec le debugger
npx playwright test quick-audit.spec.ts --debug
```

## 📊 Couverture des tests

### ✅ Tests critiques validés (quick-audit.spec.ts)

**Résultat : 11/12 tests passent (91.7%)**

| Test | Statut | Description |
|------|--------|-------------|
| **SUM** | ✅ | Calcul de somme correct (valeur attendue: 23300) |
| **AVG** | ✅ | Calcul de moyenne correct (valeur attendue: 5825) |
| **MIN** | ✅ | Calcul de minimum correct (valeur attendue: 3000) |
| **MAX** | ✅ | Calcul de maximum correct (valeur attendue: 12000) |
| **COUNT** | ✅ | Comptage correct (valeur attendue: 4) |
| **HorizontalBar** | ✅ | Attribut `horizontal` présent dans le code |
| **Pie** | ✅ | Attribut `fill` présent dans le code |
| **KPI** | ✅ | Type kpi génère le bon composant |
| **Tri DESC** | ✅ | Attribut `order-by` avec `:desc` |
| **Filtre avancé** | ✅ | Mode avancé activable |
| **Palette** | ✅ | Attribut `chart-palette` appliqué |
| **Série 2** | ❌ | value-field-2 non visible (nécessite source chargée) |

### ✅ Tests de base validés (simple-test.spec.ts)

**Résultat : 7/8 tests passent**

- Page builder charge correctement ✅
- Sélection des champs disponibles ✅
- Fonctions d'agrégation disponibles ✅
- Types de graphiques disponibles ✅
- Palettes de couleurs disponibles ✅
- Bouton générer cliquable ✅
- Zone de code généré existe ✅
- Preview canvas existe (test basique) ⚠️

### 📋 Paramètres testés par les tests exhaustifs (comprehensive-test.spec.ts)

| Catégorie | Paramètres testés | Nombre |
|-----------|-------------------|--------|
| **Agrégations** | avg, sum, count, min, max | 5 |
| **Types de graphiques** | bar, horizontalBar, line, pie, doughnut, radar, scatter, gauge, kpi, map, datalist | 11 |
| **Palettes** | default, categorical, sequential (2), divergent (2), neutral | 7 |
| **Tri** | asc, desc | 2 |
| **Séries** | simple, double | 2 |
| **Mode avancé** | filtres, group-by, aggregate | 3 |

**Total : ~100 combinaisons à tester**

### ⚠️ Paramètres à valider manuellement

- [ ] KPI : variants (info, success, warning, error) et unités
- [ ] Map : attributs deferred (value, date)
- [ ] Datalist : colonnes configurables, recherche, export
- [ ] Normalization (gouv-normalize) : flatten, trim, rename
- [ ] Facettes (gouv-facets)
- [ ] Mode de génération (embedded vs dynamic)
- [ ] Refresh interval
- [ ] Raw data toggle

## 🧪 Tests de cohérence des données

Les tests vérifient que les valeurs calculées par les fonctions d'agrégation correspondent exactement aux données source.

### Dataset de test

Les tests utilisent un dataset avec valeurs connues pour permettre la vérification automatique :

```json
[
  { "region": "Ile-de-France", "population": 12000, "budget": 500, "code": "75" },
  { "region": "Provence", "population": 5000, "budget": 200, "code": "13" },
  { "region": "Bretagne", "population": 3000, "budget": 150, "code": "35" },
  { "region": "Normandie", "population": 3300, "budget": 180, "code": "14" }
]
```

### Valeurs attendues et résultats

**Pour le champ `population` (testé dans quick-audit.spec.ts) :**

| Agrégation | Valeur attendue | Résultat test | Statut |
|------------|-----------------|---------------|--------|
| **SUM** | 23300 | 23300 | ✅ PASSE |
| **AVG** | 5825 | 5825 | ✅ PASSE |
| **MIN** | 3000 | 3000 | ✅ PASSE |
| **MAX** | 12000 | 12000 | ✅ PASSE |
| **COUNT** | 4 | 4 | ✅ PASSE |

**Pour le champ `budget` (valeurs de référence) :**

| Agrégation | Valeur attendue |
|------------|-----------------|
| **SUM** | 1030 |
| **AVG** | 257.5 |
| **MIN** | 150 |
| **MAX** | 500 |
| **COUNT** | 4 |

### Exposition du state pour les tests (REQUIS)

Les tests nécessitent que le state du builder soit exposé globalement. Cette modification a été apportée dans `apps/builder/src/main.ts` :

```typescript
// Expose state for E2E tests
(window as any).__BUILDER_STATE__ = state;
```

**Pourquoi c'est nécessaire ?**
- Permet aux tests d'injecter des données de test directement dans le state
- Permet de vérifier que les agrégations calculent les bonnes valeurs
- Permet de comparer les résultats affichés avec les valeurs attendues

**Note** : Cette exposition n'est utilisée QUE par les tests E2E et n'affecte pas le fonctionnement normal du builder.

### Exemple d'utilisation

```typescript
import { verifyConsistency, PRESET_DATASETS } from './data-consistency-checker';

const dataset = {
  ...PRESET_DATASETS.regions,
  aggregation: 'sum',
};

const result = await verifyConsistency(page, dataset);

if (!result.passed) {
  console.error(formatConsistencyReport(result));
}
```

## 📝 Ajouter de nouveaux tests

### 1. Tester un nouveau paramètre

```typescript
test('Mon nouveau paramètre - fonctionne correctement', async ({ page }) => {
  await page.goto('http://localhost:5173/apps/builder/');
  await loadLocalData(page, TEST_DATA);

  // Configurer le paramètre
  await page.selectOption('#mon-parametre', 'ma-valeur');

  // Générer
  await page.click('#generate-btn');
  await page.waitForTimeout(500);

  // Vérifier le code généré
  const hasParameter = await checkGeneratedCode(page, 'mon-parametre="ma-valeur"');
  expect(hasParameter).toBeTruthy();

  // Vérifier le preview
  const emptyState = await page.locator('#empty-state').isVisible();
  expect(emptyState).toBeFalsy();
});
```

### 2. Tester une nouvelle fonction d'agrégation

```typescript
test('Agrégation MEDIAN - calcul correct', async ({ page }) => {
  const dataset: TestDataset = {
    data: TEST_DATA,
    groupByField: 'region',
    valueField: 'population',
    aggregation: 'median', // Nouvelle fonction
  };

  await loadDatasetIntoBuilder(page, dataset);
  await page.selectOption('#aggregation', 'median');
  await page.click('#generate-btn');

  // Vérifier la cohérence
  const result = await verifyConsistency(page, dataset);
  expect(result.passed).toBeTruthy();
});
```

## 🐛 Détecter les bugs

### Bugs fréquents

1. **Agrégations incorrectes**
   - `min` / `max` retournent 0
   - `avg` n'arrondit pas correctement
   - `count` compte les valeurs au lieu des lignes

2. **Attributs manquants**
   - `horizontal` manquant pour horizontalBar
   - `fill` manquant pour pie
   - `value` et `date` non appliqués pour map (deferred)

3. **Filtres non fonctionnels**
   - Opérateurs `contains`, `in`, `isnull` ne marchent pas
   - Filtres multiples non combinés

### Comment investiguer

```bash
# Lancer le test en mode headed pour voir ce qui se passe
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts --headed -g "AVG"

# Lancer avec le debugger
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts --debug -g "AVG"

# Voir les traces
npx playwright show-trace trace.zip
```

## 📊 Rapport de couverture

Pour générer un rapport complet :

```bash
# Lancer tous les tests avec rapport HTML
npx playwright test --config tests/builder-e2e/playwright.config.ts --reporter=html

# Ouvrir le rapport
npx playwright show-report
```

## 🎯 Checklist avant release

Avant chaque release, vérifier :

### Tests automatisés
- [ ] Tous les tests d'agrégation passent
- [ ] Tous les types de graphiques se génèrent
- [ ] Toutes les palettes s'appliquent
- [ ] Les tris fonctionnent (asc, desc)
- [ ] Les filtres avancés marchent

### Tests manuels critiques
- [ ] KPI : variants et unités
- [ ] Map : attributs deferred (value, date)
- [ ] Datalist : colonnes configurables
- [ ] Mode avancé : agrégations multiples
- [ ] Normalization : flatten + rename

### Vérification visuelle
- [ ] Preview affiche le bon type de graphique
- [ ] Couleurs correspondent aux palettes
- [ ] Code généré est bien formaté
- [ ] Pas d'erreurs console

## 💡 Conseils

### Performance

- Les tests sont parallélisés par défaut (Playwright)
- Pour accélérer, utiliser `--workers=4` (nombre de CPUs)
- Pour debug, utiliser `--workers=1`

### Stabilité

- Les `waitForTimeout(500)` permettent au builder de calculer
- Pour des tests plus stables, augmenter à 1000ms
- En prod CI/CD, ajouter `--retries=2`

### Debugging

```typescript
// Afficher l'état du builder
await page.evaluate(() => {
  console.log((window as any).__BUILDER_STATE__);
});

// Prendre un screenshot
await page.screenshot({ path: 'debug.png', fullPage: true });

// Pause pour inspecter
await page.pause();
```

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev/)
- [CLAUDE.md - Architecture du projet](../../CLAUDE.md)
- [TESTING_MATRIX.md - Matrice complète](./TESTING_MATRIX.md)
- [Tests E2E existants](./builder-e2e-test.spec.ts)

## 🤝 Contribuer

Pour ajouter de nouveaux tests :

1. Consulter `TESTING_MATRIX.md` pour identifier les paramètres non couverts
2. Ajouter les tests dans `comprehensive-test.spec.ts`
3. Si test de cohérence, utiliser `data-consistency-checker.ts`
4. Mettre à jour cette documentation
5. Vérifier que tous les tests passent

```bash
# Avant commit
npm run test:run
npx playwright test --config tests/builder-e2e/playwright.config.ts
```
