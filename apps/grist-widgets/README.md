# Widgets Grist DSFR

Custom widgets conformes DSFR pour [Grist](https://www.getgrist.com/), permettant de visualiser vos données avec des graphiques, KPI, cartes et tableaux conformes au Design System de l'État français.

## Utilisation dans Grist

Les widgets sont déployés automatiquement sur GitHub Pages à chaque push sur `main`.

### URLs de production

Utilisez ces URLs dans Grist (Menu widget → Custom → URL) :

| Widget | URL | Description |
|--------|-----|-------------|
| **Graphique** | `https://bmatge.github.io/datasource-charts-webcomponents/chart/` | Graphiques DSFR (barres, lignes, camembert, radar, jauge) |
| **KPI** | `https://bmatge.github.io/datasource-charts-webcomponents/kpi/` | Indicateur clé de performance avec agrégation |
| **Carte** | `https://bmatge.github.io/datasource-charts-webcomponents/map/` | Carte choroplèthe de France (départements/régions) |
| **Tableau** | `https://bmatge.github.io/datasource-charts-webcomponents/datalist/` | Tableau avec recherche, tri, pagination, export CSV |

### Configuration des colonnes

Dans les options du widget Grist, mappez vos colonnes :

#### Graphique
- **Label** : colonne texte (axe X ou légendes)
- **Value** : colonne numérique (axe Y principal)
- **Value2** : colonne numérique optionnelle (axe Y secondaire pour graphiques multi-séries)

#### KPI
- **Value** : colonne numérique à agréger (moyenne, somme, min, max, comptage)

#### Carte
- **Code** : colonne texte avec codes INSEE départementaux (ex: "75", "13", "69")
- **Value** : colonne numérique à afficher
- **Label** : colonne texte optionnelle (nom du département/région)

#### Tableau
- Aucun mapping requis - affiche automatiquement toutes les colonnes

### Options du widget

Cliquez sur l'icône ⚙️ dans Grist pour configurer :

- **Type de graphique** : barre, ligne, camembert, radar, nuage de points, jauge
- **Palette de couleurs** : catégorique, séquentielle ascendante/descendante, divergente
- **Titre** : titre du graphique (optionnel)
- **Format des valeurs** : entier, décimal, pourcentage, euros

## Développement local

### Prérequis

```bash
npm run build              # Build la lib principale (génère le UMD)
npm run build:shared       # Build le package shared
```

### Lancer le serveur de dev

```bash
npm run dev --workspace=@gouv-widgets/app-grist-widgets
```

Le serveur démarre sur `http://localhost:5173/` (ou 5174 si le port est occupé).

### URLs de dev

- Test local sans Grist : http://localhost:5173/test-local.html
- Widget Chart : http://localhost:5173/chart/index.html
- Widget KPI : http://localhost:5173/kpi/index.html
- Widget Map : http://localhost:5173/map/index.html
- Widget Datalist : http://localhost:5173/datalist/index.html

### Tester dans Grist en local

1. Créez une table avec des données dans Grist
2. Ajoutez un widget Custom
3. Dans "Custom URL", utilisez : `http://localhost:5173/chart/index.html`
4. Mappez les colonnes
5. Testez le panneau d'options

## Build et déploiement

### Build local

```bash
npm run build --workspace=@gouv-widgets/app-grist-widgets
```

Génère le dossier `dist/` avec :
- `chart/`, `kpi/`, `map/`, `datalist/` : HTML des widgets
- `assets/` : JavaScript et CSS bundlés
- `lib/gouv-widgets.umd.js` : build UMD de la bibliothèque
- `manifest.json` : manifeste Grist

### Déploiement automatique

Le workflow `.github/workflows/deploy-grist-widgets.yml` déploie automatiquement sur GitHub Pages lors :
- De push sur `main` modifiant `apps/grist-widgets/**`, `src/**` ou `packages/shared/**`
- De déclenchement manuel (workflow_dispatch)

Le déploiement :
1. Build le package `@gouv-widgets/shared`
2. Build la lib principale (génère `dist/gouv-widgets.umd.js`)
3. Build les grist-widgets
4. Déploie `apps/grist-widgets/dist/` sur GitHub Pages

## Architecture

```
apps/grist-widgets/
├── chart/index.html          # Widget Graphique
├── kpi/index.html            # Widget KPI
├── map/index.html            # Widget Carte
├── datalist/index.html       # Widget Tableau
├── src/
│   ├── chart.ts              # Entry point Chart
│   ├── kpi.ts                # Entry point KPI
│   ├── map.ts                # Entry point Map
│   ├── datalist.ts           # Entry point Datalist
│   └── grist-options-panel.ts # Panneau d'options partagé
├── test-local.html           # Page de test sans Grist
├── manifest.json             # Manifeste Grist (déployé sur Pages)
└── vite.config.ts            # Config Vite
```

## API Grist

Les widgets utilisent l'API Plugin Grist :

```js
import grist from 'grist-plugin-api';

// Écouter les changements de données
grist.ready();
grist.onRecords((records) => {
  // Dispatcher les données vers les composants gouv-*
  GouvWidgets.dispatchDataLoaded('grist', records);
});

// Afficher le panneau d'options
grist.onEditOptions(() => {
  // Afficher le panneau de configuration
});
```

## Dépendances

- **@gouvfr/dsfr** : Design System de l'État Français
- **@gouvfr/dsfr-chart** : Composants Vue de graphiques DSFR
- **gouv-widgets** : Web Components Lit (build UMD)
- **grist-plugin-api** : API Plugin Grist

## Licence

Voir LICENSE à la racine du projet.
