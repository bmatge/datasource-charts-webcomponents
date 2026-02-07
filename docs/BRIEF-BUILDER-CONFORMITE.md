# Brief : Conformite Builder & Playground avec les composants Demo

## Contexte

Le projet `gouv-widgets` dispose de composants web conformes DSFR :
- `<gouv-source>` : source de donnees (API/fichier)
- `<gouv-kpi>` : indicateurs cles
- `<gouv-datalist>` : tableaux avec filtres, recherche, tri, pagination, export
- `<gouv-dsfr-chart>` : wrapper pour les charts DSFR

Les pages de demo `/demo/` servent de reference pour l'implementation correcte.

---

## Objectif

S'assurer que le **Builder** (normal et IA) et le **Playground** generent du code **100% conforme** aux specifications des composants documentees dans `/demo/`.

---

## Composants a verifier

### 1. gouv-source

**Reference** : `/demo/components/gouv-source.html`

```html
<gouv-source
  id="ma-source"
  url="/api/data.json"
  transform="items">
</gouv-source>
```

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| `id` | String | Oui | Identifiant unique pour le data-bridge |
| `url` | String | Oui | URL de l'API ou fichier JSON |
| `transform` | String | Non | Chemin vers les donnees (ex: `data.items`) |

---

### 2. gouv-kpi

**Reference** : `/demo/components/gouv-kpi.html`

```html
<gouv-kpi
  source="sites"
  valeur="avg:score_rgaa"
  label="Score RGAA moyen"
  format="pourcentage"
  icone="ri-award-line"
  couleur="vert"
  seuil-vert="80"
  seuil-orange="50">
</gouv-kpi>
```

| Attribut | Type | Description |
|----------|------|-------------|
| `source` | String | ID de la gouv-source (requis) |
| `valeur` | String | Expression de calcul : `champ`, `avg:champ`, `sum:champ`, `min:champ`, `max:champ`, `count:champ:valeur` |
| `label` | String | Libelle affiche sous la valeur |
| `format` | String | Format : `nombre`, `pourcentage`, `euro`, `decimal` |
| `icone` | String | Classe Remix Icon (ex: `ri-global-line`) |
| `couleur` | String | Couleur forcee : `vert`, `orange`, `rouge`, `bleu` |
| `seuil-vert` | Number | Seuil au-dessus duquel la couleur est verte |
| `seuil-orange` | Number | Seuil au-dessus duquel la couleur est orange |

**Expressions de calcul :**
- `champ` : Valeur directe d'un champ (pour objet unique)
- `avg:champ` : Moyenne des valeurs du champ
- `sum:champ` : Somme des valeurs
- `min:champ` / `max:champ` : Min/max
- `count:champ:valeur` : Compte les occurrences ou champ = valeur

---

### 3. gouv-datalist

**Reference** : `/demo/components/gouv-datalist.html`

```html
<gouv-datalist
  source="ma-source"
  colonnes="nom:Nom du site, ministere:Ministere, score_rgaa:RGAA (%)"
  recherche="true"
  filtres="ministere,statut"
  tri="score_rgaa:desc"
  pagination="10"
  export="csv">
</gouv-datalist>
```

| Attribut | Type | Description |
|----------|------|-------------|
| `source` | String | ID de la gouv-source |
| `colonnes` | String | Definition : `cle:Label, cle2:Label2` |
| `recherche` | Boolean | Active la barre de recherche |
| `filtres` | String | Colonnes filtrables : `col1,col2` |
| `tri` | String | Tri par defaut : `colonne:asc` ou `colonne:desc` |
| `pagination` | Number | Nombre d'elements par page (0 = desactive) |
| `export` | String | Formats d'export : `csv` |

**Structure HTML generee** (a respecter) :
```
.gouv-datalist
├── .gouv-datalist__filters     <- CSS Grid pour les filtres
│   └── .fr-select-group (x n)
├── .gouv-datalist__toolbar     <- Flexbox recherche + export
│   ├── .fr-search-bar
│   └── .fr-btn (export)
├── <p> (compteur resultats)
├── .fr-table.fr-table--bordered
│   └── <table>
└── .fr-pagination (si pagination > 0)
```

---

### 4. gouv-dsfr-chart

**Reference** : `/demo/components/gouv-dsfr-chart.html`

Wrapper qui connecte les graphiques officiels DSFR Chart au systeme `gouv-source` pour une alimentation dynamique des donnees.

```html
<gouv-dsfr-chart
  source="sites"
  type="bar"
  label-field="nom"
  value-field="score_rgaa"
  selected-palette="categorical"
  unit-tooltip="%">
</gouv-dsfr-chart>
```

| Attribut | Type | Description |
|----------|------|-------------|
| `source` | String | ID de la gouv-source (requis) |
| `type` | String | `line`, `bar`, `pie`, `radar`, `gauge`, `scatter`, `bar-line`, `map` |
| `label-field` | String | Chemin vers le champ label dans les donnees (ex: `nom`, `fields.categorie`) |
| `value-field` | String | Chemin vers le champ valeur dans les donnees |
| `selected-palette` | String | `default`, `categorical`, `sequentialAscending`, `sequentialDescending`, `divergentAscending`, `divergentDescending`, `neutral` |
| `unit-tooltip` | String | Unite affichee dans les tooltips |
| `horizontal` | Boolean | Barres horizontales (bar chart uniquement) |
| `stacked` | Boolean | Barres empilees (bar chart uniquement) |
| `fill` | Boolean | Remplissage plein (pie chart) |
| `gauge-value` | Number | Valeur pour la jauge (gauge chart uniquement) |

**Difference avec les charts DSFR natifs :**
- `gouv-dsfr-chart` prend des **chemins de champs** (`label-field`, `value-field`) et transforme les donnees JSON automatiquement
- Les charts DSFR natifs prennent des **donnees pre-formatees** en JSON (`x="[[...]]"`, `y="[[...]]"`)

---

## Charts DSFR natifs (utilisation directe)

**Reference** : `/demo/charts/`

### line-chart
```html
<line-chart
  x="[[2020, 2021, 2022, 2023]]"
  y="[[65, 72, 78, 85]]"
  selected-palette="default"
  unit-tooltip="%">
</line-chart>
```

### bar-chart
```html
<bar-chart
  x='[["Cat A", "Cat B", "Cat C"]]'
  y="[[65, 72, 78]]"
  name='["Serie 1"]'
  selected-palette="categorical"
  horizontal="false"
  stacked="false"
  unit-tooltip="%">
</bar-chart>
```

### pie-chart
```html
<pie-chart
  x='[["Label 1", "Label 2", "Label 3"]]'
  y="[[30, 50, 20]]"
  selected-palette="categorical"
  unit-tooltip="%">
</pie-chart>
```

### radar-chart
```html
<radar-chart
  x='[["Axe 1", "Axe 2", "Axe 3", "Axe 4"]]'
  y="[[85, 90, 75, 95]]"
  selected-palette="default">
</radar-chart>
```

### gauge-chart
```html
<gauge-chart
  percent="82"
  init="0"
  target="100">
</gauge-chart>
```

**ATTENTION** : Ne pas utiliser `value`, utiliser `percent` + `init` + `target`

### scatter-chart
```html
<scatter-chart
  x="[[10, 20, 30, 40]]"
  y="[[25, 35, 20, 45]]"
  selected-palette="categorical">
</scatter-chart>
```

### map-chart (departementale)
```html
<map-chart
  data='{"75": 95, "13": 82, "69": 78}'
  date="2024-01-15"
  name="Score RGAA"
  value-nat="78"
  selected-palette="sequentialAscending">
</map-chart>
```

**ATTENTION** : `map-chart-reg` (regionale) a des bugs dans DSFR Chart v2.0.4

---

## Points de verification

### Builder Normal (`builder.html`)
Le Builder Normal genere du code **Chart.js brut** (pas de composants gouv-widgets).
- [x] Genere des graphiques Chart.js fonctionnels
- [x] Respecte les couleurs DSFR
- [x] Supporte les sources API OpenDataSoft et manuelles

**Note** : Ne genere PAS de code utilisant gouv-source/gouv-dsfr-chart. C'est un choix de conception pour du code autonome.

### Builder IA (`builderIA.html`)
Le Builder IA genere egalement du code **Chart.js brut**.
- [x] Comprend les requetes en langage naturel
- [x] Genere des agregations ODSQL correctes
- [x] Supporte les types bar, line, pie, radar, kpi
- [x] Utilise les bonnes palettes DSFR

**Note** : Comme le Builder normal, genere du code Chart.js autonome.

### Playground (`playground.html`)
Environnement de test interactif avec exemples.
- [x] Preview temps reel fonctionnel
- [x] Exemples Chart.js avec API OpenDataSoft
- [x] **NOUVEAU** : Exemples DSFR Chart natifs (bar-chart, line-chart, pie-chart, gauge-chart, radar-chart)
- [x] **NOUVEAU** : Exemples gouv-widgets (gouv-source + gouv-dsfr-chart, gouv-kpi, gouv-datalist, dashboard complet)

### Composants gouv-widgets
- [x] `gouv-source` : attributs `id`, `url`, `transform` documentes
- [x] `gouv-kpi` : attributs `valeur` (avec expressions avg/sum/count), `format`, `seuil-*`, `couleur`
- [x] `gouv-datalist` : attributs `colonnes`, `recherche`, `filtres`, `tri`, `pagination`, `export`
- [x] `gouv-dsfr-chart` : attributs `label-field`, `value-field`, `selected-palette`, `unit-tooltip`
- [x] **CORRIGE** : `gauge-chart` utilise maintenant `percent/init/target` (pas `value`)

---

## Fichiers de reference

| Composant | Documentation | Code source |
|-----------|---------------|-------------|
| gouv-source | `/demo/components/gouv-source.html` | `/src/components/gouv-source.ts` |
| gouv-kpi | `/demo/components/gouv-kpi.html` | `/src/components/gouv-kpi.ts` |
| gouv-datalist | `/demo/components/gouv-datalist.html` | `/src/components/gouv-datalist.ts` |
| gouv-dsfr-chart | `/demo/components/gouv-dsfr-chart.html` | `/src/components/gouv-dsfr-chart.ts` |
| Charts DSFR | `/demo/charts/*.html` | `@gouvfr/dsfr-chart` (externe) |

---

## Donnees de test

Fichier : `/public/mock-api/data.json`

Structure attendue :
```json
{
  "sites": [
    {
      "nom": "example.gouv.fr",
      "ministere": "Economie et Finances",
      "score_rgaa": 87,
      "score_dsfr": 92,
      "statut": "actif",
      "certificat": true
    }
  ]
}
```
