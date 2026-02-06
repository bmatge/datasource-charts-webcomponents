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
  source="ma-source"
  valeur="score_rgaa"
  label="Score RGAA"
  unite="%"
  icone="ri-award-line"
  tendance="hausse"
  description="Taux de conformite">
</gouv-kpi>
```

| Attribut | Type | Description |
|----------|------|-------------|
| `source` | String | ID de la gouv-source |
| `valeur` | String | Cle du champ a afficher |
| `label` | String | Libelle affiche |
| `unite` | String | Unite (%, EUR, etc.) |
| `icone` | String | Classe Remix Icon |
| `tendance` | String | `hausse` / `baisse` / `stable` |
| `description` | String | Description complementaire |

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

```html
<gouv-dsfr-chart
  source="ma-source"
  type="bar"
  x="ministere"
  y="score_rgaa"
  palette="categorical"
  unit="%">
</gouv-dsfr-chart>
```

| Attribut | Type | Valeurs possibles |
|----------|------|-------------------|
| `source` | String | ID de la gouv-source |
| `type` | String | `line`, `bar`, `pie`, `radar`, `gauge`, `scatter` |
| `x` | String | Cle pour l'axe X / labels |
| `y` | String | Cle pour l'axe Y / valeurs |
| `palette` | String | `default`, `categorical`, `sequentialAscending`, `sequentialDescending`, `divergentAscending`, `divergentDescending`, `neutral` |
| `unit` | String | Unite pour les tooltips |

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

### Builder Normal
- [ ] Genere les attributs corrects pour chaque composant
- [ ] Respecte les types de donnees (String, Number, Boolean)
- [ ] Format JSON correct pour les charts (`[[...]]` pour x/y)
- [ ] Utilise les bonnes palettes DSFR
- [ ] Genere `gauge-chart` avec `percent/init/target` (pas `value`)

### Builder IA
- [ ] Comprend les specifications des composants
- [ ] Propose des configurations valides
- [ ] Evite les attributs deprecies ou incorrects
- [ ] Suggere les bonnes palettes selon le contexte

### Playground
- [ ] Preview temps reel fonctionnel
- [ ] Validation des attributs
- [ ] Messages d'erreur clairs pour configurations invalides
- [ ] Export du code conforme

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
