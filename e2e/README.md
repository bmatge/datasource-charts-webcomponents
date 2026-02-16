# e2e/

Tests end-to-end (E2E) avec Playwright.

## Contenu

| Fichier | Description |
|---------|-------------|
| `smoke.spec.ts` | Tests de fonctionnement de base |
| `accessibility.spec.ts` | Tests d'accessibilite WCAG (Axe) |
| `auth.db.spec.ts` | Tests d'authentification (mode base de donnees) |
| `sharing.db.spec.ts` | Tests de partage entre utilisateurs |
| `migration.db.spec.ts` | Tests de migration localStorage vers BDD |
| `grist-widgets.spec.ts` | Tests d'integration Grist |
| `industrie-du-futur.spec.ts` | Test avec donnees reelles |
| `screenshots/` | Captures d'ecran generees par les tests |

## Pre-requis

- Le serveur de dev doit tourner sur le port 5173 (`npm run dev`)
- Playwright doit etre installe (`npx playwright install`)

## Lancer les tests

```bash
npm run dev                                    # Dans un terminal separe
npx playwright test                            # Tous les tests E2E
npx playwright test e2e/smoke.spec.ts          # Un test specifique
```

Voir aussi `tests/builder-e2e/` pour les tests exhaustifs du builder (110 combinaisons).
