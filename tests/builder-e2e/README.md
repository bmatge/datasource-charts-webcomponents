# Tests exhaustifs du Builder

Ce dossier contient une suite complète de tests pour vérifier **tous les paramètres** disponibles dans le builder gouv-widgets.

## 📁 Fichiers

- **`comprehensive-test.spec.ts`** : Tests Playwright exhaustifs de tous les paramètres
- **`aggregation-consistency.spec.ts`** : Tests de cohérence des données (source vs rendu)
- **`data-consistency-checker.ts`** : Utilitaire de vérification de cohérence
- **`TESTING_MATRIX.md`** : Matrice complète des paramètres et stratégie de tests
- **`playwright.config.ts`** : Configuration Playwright existante

## 🚀 Lancement rapide

### Pré-requis

```bash
# 1. Serveur de dev doit tourner (port 5173)
npm run dev

# 2. Playwright doit être installé
npx playwright install
```

### Lancer tous les tests

```bash
# Tests exhaustifs (tous les paramètres)
npx playwright test --config tests/builder-e2e/playwright.config.ts tests/builder-e2e/comprehensive-test.spec.ts

# Tests de cohérence (agrégations)
npx playwright test --config tests/builder-e2e/playwright.config.ts tests/builder-e2e/aggregation-consistency.spec.ts

# Tous les tests du builder
npx playwright test --config tests/builder-e2e/playwright.config.ts
```

### Lancer des tests spécifiques

```bash
# Seulement les tests d'agrégation
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts -g "agrégation"

# Seulement les types de graphiques
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts -g "types de graphiques"

# Seulement les palettes
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts -g "palettes"

# Tests de cohérence SUM
npx playwright test tests/builder-e2e/aggregation-consistency.spec.ts -g "SUM"
```

### Mode interactif (debug)

```bash
# Lancer avec l'UI Playwright pour voir les tests en direct
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts --ui

# Lancer avec le navigateur visible
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts --headed

# Lancer avec le debugger
npx playwright test tests/builder-e2e/comprehensive-test.spec.ts --debug
```

## 📊 Couverture des tests

### ✅ Paramètres couverts

| Catégorie | Paramètres testés | Nombre |
|-----------|-------------------|--------|
| **Agrégations** | avg, sum, count, min, max | 5 |
| **Types de graphiques** | bar, horizontalBar, line, pie, doughnut, radar, scatter, gauge, kpi, map, datalist | 11 |
| **Palettes** | default, categorical, sequential (2), divergent (2), neutral | 7 |
| **Tri** | asc, desc | 2 |
| **Séries** | simple, double | 2 |
| **Mode avancé** | filtres, group-by, aggregate | 3 |
| **KPI** | variants (5), unités | 6 |
| **Datalist** | recherche, filtres, export CSV/HTML | 4 |

**Total : ~100 combinaisons testées**

### ⚠️ Paramètres non couverts (à ajouter)

- [ ] Normalization (gouv-normalize)
- [ ] Facettes (gouv-facets)
- [ ] Mode de génération (embedded vs dynamic)
- [ ] Refresh interval
- [ ] Raw data toggle

## 🧪 Tests de cohérence

Les tests de cohérence vérifient que les valeurs calculées correspondent exactement aux données source.

### Dataset de test

```json
[
  { "region": "Ile-de-France", "population": 12000, "budget": 500 },
  { "region": "Provence", "population": 5000, "budget": 200 },
  { "region": "Bretagne", "population": 3000, "budget": 150 },
  { "region": "Normandie", "population": 3300, "budget": 180 }
]
```

### Valeurs attendues

| Agrégation | population | budget |
|------------|------------|--------|
| **SUM** | 23300 | 1030 |
| **AVG** | 5825 | 257.5 |
| **COUNT** | 4 | 4 |
| **MIN** | 3000 | 150 |
| **MAX** | 12000 | 500 |

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
