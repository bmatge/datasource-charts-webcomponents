# apps/

Applications web du projet gouv-widgets. Chaque app est un workspace npm independant avec son propre `package.json` et sa config Vite.

## Applications

| Dossier | Package | Description |
|---------|---------|-------------|
| `builder/` | `@gouv-widgets/app-builder` | Generateur visuel de graphiques (assistant etape par etape) |
| `builder-ia/` | `@gouv-widgets/app-builder-ia` | Generateur de graphiques par IA (conversation avec Albert) |
| `dashboard/` | `@gouv-widgets/app-dashboard` | Editeur visuel de tableaux de bord (grille, preview, save/delete) |
| `sources/` | `@gouv-widgets/app-sources` | Gestionnaire de sources de donnees (API, CSV, Grist) |
| `playground/` | `@gouv-widgets/app-playground` | Editeur de code interactif avec preview en direct |
| `favorites/` | `@gouv-widgets/app-favorites` | Gestion des favoris (sauvegarde et consultation) |
| `monitoring/` | `@gouv-widgets/app-monitoring` | Monitoring et statistiques d'usage des widgets |
| `grist-widgets/` | `@gouv-widgets/app-grist-widgets` | Widgets personnalises pour l'integration Grist |

## Commandes

```bash
# Dev d'une app individuelle
npm run dev --workspace=@gouv-widgets/app-builder

# Build de toutes les apps
npm run build:apps
```

## Structure commune

Chaque app contient :

```
app-name/
  package.json      # Config workspace
  vite.config.ts    # Config Vite (proxy, build)
  index.html        # Point d'entree HTML
  src/              # Code source TypeScript
  dist/             # Build output (genere)
```
