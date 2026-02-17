# 🚀 Démarrage rapide - Tests Builder

## ⚠️ Les tests ne passent pas ? Suivez ce guide !

### Étape 1 : Lancer le serveur de dev

**OBLIGATOIRE** : Les tests ont besoin que le serveur tourne sur `localhost:5173`

```bash
# Dans un terminal
npm run dev
```

Attendez de voir :
```
VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
```

### Étape 2 : Lancer le test simple

Dans **un autre terminal** :

```bash
cd tests/builder-e2e
npx playwright test simple-test.spec.ts
```

Si ça passe ✅, le problème vient de la structure des tests complexes.
Si ça échoue ❌, le problème est plus profond.

---

## 🔍 Diagnostic : Pourquoi les tests échouent ?

### Problème 1 : Serveur non lancé

**Erreur** :
```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173
```

**Solution** : Lancer `npm run dev` dans un terminal séparé.

### Problème 2 : Les sélecteurs ne correspondent pas

**Erreur** :
```
Error: Timeout waiting for selector "#generate-btn"
```

**Solution** : Vérifiez que le HTML du builder a bien les ID attendus :
```bash
# Vérifier les ID dans le HTML
grep -o 'id="[^"]*"' apps/builder/index.html | sort | uniq
```

### Problème 3 : `__BUILDER_STATE__` n'existe pas

**Erreur** :
```
Error: Cannot read property 'data' of undefined
```

**Solution** : Les tests supposent que `state` est exposé globalement. Vérifier dans [`apps/builder/src/state.ts`](../../apps/builder/src/state.ts).

---

## 🧪 Tester manuellement chaque fonction

### Test manuel : SUM

1. Ouvrir http://localhost:5173/apps/builder/
2. Sélectionner une source avec des données
3. Cliquer "Charger"
4. Sélectionner un champ label (ex: region)
5. Sélectionner un champ valeur (ex: population)
6. Sélectionner "Somme" dans Agrégation
7. Cliquer "Générer"

**Vérifier** :
- Le graphique s'affiche ✅
- Les valeurs sont cohérentes avec la source ✅
- Le code généré contient `sum(population)` ✅

Répéter pour : AVG, MIN, MAX, COUNT

---

## 📝 Créer un test qui fonctionne

Voici un template de test minimal qui s'adapte à votre code :

```typescript
import { test, expect } from '@playwright/test';

test('Test basique', async ({ page }) => {
  // 1. Aller sur le builder
  await page.goto('http://localhost:5173/apps/builder/');

  // 2. Attendre que la page charge
  await page.waitForLoadState('networkidle');

  // 3. Vérifier qu'un élément existe
  await expect(page.locator('#generate-btn')).toBeVisible();

  // 4. Prendre un screenshot pour debug
  await page.screenshot({ path: 'debug.png', fullPage: true });
});
```

---

## 🐛 Debugger un test qui échoue

### Méthode 1 : Mode UI (recommandé)

```bash
npx playwright test simple-test.spec.ts --ui
```

Vous verrez le navigateur et pourrez inspecter chaque étape.

### Méthode 2 : Mode headed (navigateur visible)

```bash
npx playwright test simple-test.spec.ts --headed --timeout=0
```

Le navigateur reste ouvert, vous pouvez interagir avec.

### Méthode 3 : Screenshots automatiques

```bash
npx playwright test simple-test.spec.ts --screenshot=on
```

Les screenshots seront dans `test-results/`.

### Méthode 4 : Debug console

Ajouter dans le test :

```typescript
// Afficher l'état du builder
await page.evaluate(() => {
  console.log('State:', (window as any).state);
  console.log('URL:', window.location.href);
});

// Pause pour inspecter
await page.pause();
```

---

## 🔧 Adapter les tests à votre code

### Étape 1 : Inspecter la structure

```bash
# Ouvrir le builder dans Chrome
open http://localhost:5173/apps/builder/

# Ouvrir DevTools (F12)
# Console :
state
state.data
state.fields
```

### Étape 2 : Vérifier les ID HTML

Dans DevTools, tapez :
```javascript
document.getElementById('generate-btn')
document.getElementById('label-field')
document.getElementById('value-field')
```

Si `null`, l'ID n'existe pas → adapter le test.

### Étape 3 : Vérifier comment charger des données

Dans `apps/builder/src/sources.ts`, cherchez :
```typescript
// Comment state.localData est rempli ?
// Comment state.fields est peuplé ?
```

### Étape 4 : Créer un test adapté

```typescript
test('SUM adapté', async ({ page }) => {
  await page.goto('http://localhost:5173/apps/builder/');

  // TODO: Adapter selon votre code
  // Comment injecter des données de test ?

  await page.selectOption('#aggregation', 'sum');
  await page.click('#generate-btn');

  // Vérifier le résultat (à adapter)
  const code = await page.locator('#generated-code').textContent();
  expect(code).toContain('sum');
});
```

---

## 📞 Besoin d'aide immédiate ?

### Partager les infos pour diagnostiquer :

```bash
# 1. Vérifier que le serveur tourne
curl http://localhost:5173/apps/builder/ | head -20

# 2. Lancer le test simple avec debug
npx playwright test simple-test.spec.ts --reporter=list

# 3. Prendre un screenshot
npx playwright test simple-test.spec.ts --screenshot=on --headed
```

Partagez :
- La sortie de ces commandes
- Le screenshot dans `test-results/`
- Les erreurs exactes

---

## ✅ Checklist de dépannage

- [ ] Serveur de dev lancé (`npm run dev`)
- [ ] URL accessible : http://localhost:5173/apps/builder/
- [ ] Test simple passe : `npx playwright test simple-test.spec.ts`
- [ ] Playwright installé : `npx playwright install`
- [ ] Pas d'erreurs console dans le builder
- [ ] Les ID HTML existent bien (`#generate-btn`, etc.)

Si tout est ✅ et que ça ne marche toujours pas, le problème vient de la logique des tests complexes.

---

## 🎯 Prochaine étape

Une fois que `simple-test.spec.ts` passe :

1. **Inspecter** comment le builder stocke l'état
2. **Adapter** les tests pour utiliser la vraie structure
3. **Tester** une fonction à la fois (SUM, puis AVG, etc.)
4. **Documenter** ce qui marche et ce qui ne marche pas

**Objectif** : Avoir un test qui **vérifie réellement les calculs**, pas juste que la page charge.
