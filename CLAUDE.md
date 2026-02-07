# CLAUDE.md - Configuration du projet gouv-widgets

## Contexte du projet

Bibliothèque de Web Components de dataviz pour sites gouvernementaux français.
Composants Lit conformes DSFR (Design System de l'État).

## Architecture actuelle

- `/src/` - Code source TypeScript des composants
- `/dist/` - Build output (ESM + UMD)
- `/demo/` - Pages de démonstration
- `/tests/` - Tests Vitest

### Apps HTML (à migrer vers TypeScript)
- `builder.html` - Générateur visuel de graphiques (~2000 lignes JS inline)
- `builderIA.html` - Générateur IA avec Albert (~1700 lignes JS inline)
- `sources.html` - Gestionnaire de sources de données (~1850 lignes JS inline)
- `playground.html` - Environnement de code interactif (~1200 lignes JS inline)
- `favoris.html` - Gestion des favoris (~300 lignes JS inline)

## Commandes disponibles

```bash
npm run dev        # Serveur de dev Vite (port 5173)
npm run build      # Build TypeScript + Vite
npm run test       # Tests Vitest en watch mode
npm run test:run   # Tests une seule fois
npm run preview    # Preview du build
```

## Conventions de code

- TypeScript strict mode
- Composants Lit (LitElement, html, css)
- Nommage : `gouv-*` pour les composants publics, `app-*` pour les layouts
- Tests : fichiers `*.test.ts` dans `/tests/`
- Pas d'emoji dans le code sauf demande explicite

## Refactorisation en cours

### Objectif
Migrer les apps HTML avec JS inline vers une structure monorepo professionnelle :

```
/apps/{app-name}/src/  → Code TypeScript des apps
/packages/shared/      → Utilitaires partagés
/packages/gouv-widgets/ → Bibliothèque existante
```

### Code à factoriser (dupliqué)
- `escapeHtml()` → packages/shared/src/utils/escape-html.ts
- `formatKPIValue()` → packages/shared/src/utils/formatters.ts
- `toNumber()` → packages/shared/src/utils/number-parser.ts
- `isValidDeptCode()` → packages/shared/src/utils/dept-codes.ts
- Palettes DSFR → packages/shared/src/constants/dsfr-palettes.ts
- Logique proxy Grist → packages/shared/src/api/proxy.ts

### Ordre de migration
1. favorites (simple, validation setup)
2. playground (pattern établi)
3. sources (complexité moyenne)
4. builder-ia
5. builder (le plus complexe)

## APIs externes utilisées

- Grist : docs.getgrist.com, grist.numerique.gouv.fr
- Albert IA : albert.api.etalab.gouv.fr
- OpenDataSoft : *.opendatasoft.com
- Tabular API : tabular-api.data.gouv.fr

## Notes importantes

- Les fichiers `.js` dans `/src/` sont des artefacts de build, ne pas les modifier
- Toujours lancer `npm run build` après modification des composants
- Utiliser le proxy externe `https://chartsbuilder.matge.com` pour la production
