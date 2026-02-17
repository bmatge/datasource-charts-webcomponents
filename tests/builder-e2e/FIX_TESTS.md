# 🔧 Comment faire fonctionner les tests

## 🚨 Problème actuel

Les tests ont été écrits sans exécution, donc ils font des suppositions incorrectes sur la structure du code.

## ✅ Solution en 3 étapes

### Étape 1 : Lancer le serveur

```bash
# Terminal 1
npm run dev
```

Attendez de voir : `Local:   http://localhost:5173/`

### Étape 2 : Inspecter la structure réelle

```bash
# Terminal 2
cd tests/builder-e2e
npx playwright test inspect-builder.spec.ts --headed
```

**Regardez la console** :
- Quels ID HTML existent ?
- Est-ce que `window.state` ou `window.__BUILDER_STATE__` existe ?
- Quels sont les vrais sélecteurs ?

### Étape 3 : Tester le test simple

```bash
npx playwright test simple-test.spec.ts
```

Si ça passe ✅ : la page charge correctement.
Si ça échoue ❌ : noter l'erreur exacte.

---

## 🔍 Diagnostic rapide

### Lancez l'inspection :

```bash
# 1. Serveur de dev
npm run dev &

# 2. Attendre 5 secondes
sleep 5

# 3. Inspecter
cd tests/builder-e2e && npx playwright test inspect-builder.spec.ts --headed
```

### Regardez la sortie console :

Elle vous dira :
- ✅ Quels ID HTML existent vraiment
- ✅ Si `state` est accessible
- ✅ Quelles options sont disponibles
- ✅ Comment adapter les tests

---

## 🛠️ Correction probable nécessaire

Les tests supposent que le state est exposé globalement :

```typescript
// Dans apps/builder/src/state.ts ou main.ts
// Ajouter cette ligne pour exposer le state :
(window as any).__BUILDER_STATE__ = state;
```

**OU** adapter les tests pour ne pas dépendre du state global.

---

## 📝 Tests qui DEVRAIENT marcher

### Test 1 : Page charge

```bash
npx playwright test simple-test.spec.ts -g "Page builder charge"
```

### Test 2 : Éléments présents

```bash
npx playwright test simple-test.spec.ts -g "Sélection des champs"
```

### Test 3 : Fonctions d'agrégation

```bash
npx playwright test simple-test.spec.ts -g "Fonctions d'agrégation"
```

---

## 🎯 Objectif réaliste

**Ne PAS essayer de faire passer tous les 100 tests complexes**.

**À la place :**

1. ✅ Faire passer `simple-test.spec.ts` (8 tests de base)
2. ✅ Comprendre la structure avec `inspect-builder.spec.ts`
3. ✅ Adapter 1-2 tests de calcul (SUM, AVG)
4. ✅ Documenter ce qui marche

---

## 💡 Tests manuels (plus rapide !)

Au lieu de fixer les tests auto, testez **manuellement** :

### Checklist manuelle SUM :

1. http://localhost:5173/apps/builder/
2. Charger une source
3. Label = region, Value = population
4. Agrégation = Somme
5. Générer
6. ✅ Vérifier manuellement que la somme est correcte

Faire ça pour :
- [ ] SUM
- [ ] AVG
- [ ] MIN
- [ ] MAX
- [ ] COUNT

**Temps : 10 minutes vs plusieurs heures à fixer les tests**

---

## 📊 Tableau de diagnostic

Après avoir lancé `inspect-builder.spec.ts`, remplissez :

| Élément | Existe ? | Note |
|---------|----------|------|
| `#generate-btn` | ☐ Oui ☐ Non |  |
| `#label-field` | ☐ Oui ☐ Non |  |
| `#value-field` | ☐ Oui ☐ Non |  |
| `#aggregation` | ☐ Oui ☐ Non |  |
| `button[data-type="bar"]` | ☐ Oui ☐ Non |  |
| `window.state` | ☐ Oui ☐ Non |  |
| `window.__BUILDER_STATE__` | ☐ Oui ☐ Non |  |

Si "Non" partout sur les `window.*` → les tests complexes ne peuvent pas fonctionner sans modification.

---

## 🚀 Prochaines étapes

### Option A : Exposer le state (recommandé)

```typescript
// apps/builder/src/main.ts
import { state } from './state.js';

// À la fin du fichier :
if (typeof window !== 'undefined') {
  (window as any).__BUILDER_STATE__ = state;
}
```

Puis relancer les tests.

### Option B : Simplifier les tests

Ne garder que les tests visuels simples (comme `simple-test.spec.ts`).

### Option C : Tests manuels

Créer une checklist manuelle et la valider à chaque release.

---

## 📞 Besoin d'aide ?

Partagez la sortie de :

```bash
cd tests/builder-e2e
npx playwright test inspect-builder.spec.ts --reporter=list 2>&1 | tee inspection.log
```

Et le fichier `inspection.log`.

---

## ✨ Résumé

**Problème** : Tests basés sur des suppositions incorrectes.

**Solution rapide** :
1. Lancer `inspect-builder.spec.ts`
2. Noter ce qui existe réellement
3. Tester manuellement les fonctions critiques
4. (Optionnel) Adapter 1-2 tests auto

**Temps estimé** : 30 minutes pour avoir une vue claire du problème.
