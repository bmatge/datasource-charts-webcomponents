# Guide utilisateur — gouv-widgets

Ce guide presente les principaux parcours d'utilisation de **gouv-widgets**, une bibliotheque de Web Components de dataviz pour les sites gouvernementaux francais, conforme au DSFR.

Chaque parcours est presente comme une **user story** :

> **Pour** [objectif metier], **je dois** [etapes concretes], **afin de** [resultat d'integration].

---

## Vue d'ensemble de l'interface

L'application est accessible depuis la page d'accueil qui regroupe tous les outils :

![Page d'accueil](images/guide-hub.png)

Les outils disponibles sont :
- **Sources** : connecter et gerer les sources de donnees (Grist, API, manuelles)
- **Builder** : generateur visuel de graphiques pas-a-pas
- **Builder IA** : generateur de graphiques par conversation avec l'IA Albert
- **Playground** : editeur de code interactif avec apercu temps reel
- **Dashboard** : editeur visuel de tableaux de bord multi-widgets
- **Monitoring** : suivi des deployements de widgets en production

---

## Parcours A : Creer un graphique a partir de donnees locales

> **Pour** afficher un graphique en barres du PIB par region sur mon site,
> **je dois** creer une source de donnees manuelle dans Sources puis configurer le graphique dans le Builder,
> **afin d'** obtenir un code HTML copier-coller integrable dans n'importe quelle page web.

### Etape 1 — Ouvrir la page Sources

Naviguez vers **Sources** depuis le menu. La page affiche les connexions existantes (Grist, API) et les sources sauvegardees. Cliquez sur **"Creer une source manuelle"**.

![Page Sources — vue d'ensemble](images/guide-A1-sources-overview.png)

### Etape 2 — Saisir les donnees

La modale de creation s'ouvre avec trois modes de saisie : **Tableau** (saisie directe), **JSON** (coller du JSON) ou **CSV** (importer un fichier).

1. Donnez un nom a la source (ex: "Statistiques regions")
2. Remplissez le tableau avec vos donnees
3. Cliquez sur **Sauvegarder**

![Modale de source manuelle](images/guide-A2-sources-manual-modal.png)

### Etape 3 — Ouvrir le Builder et charger la source

Naviguez vers le **Builder**. Dans la section "Source de donnees", selectionnez votre source dans la dropdown puis cliquez sur **Charger**. Les champs disponibles apparaissent dans les selecteurs.

![Builder — source chargee](images/guide-A3-builder-source-loaded.png)

### Etape 4 — Choisir le type de graphique

La section "Type de graphique" propose une grille de 11 types de graphiques : barres, lignes, camembert, radar, carte, KPI, tableau, etc. Cliquez sur le type souhaite (ici **Barres**).

### Etape 5 — Configurer et generer

Completez la configuration :
- **Axe X** : le champ de categorie (ex: `region`)
- **Axe Y** : le champ numerique (ex: `PIB`)
- **Agregation** : moyenne, somme, comptage, min, max
- **Titre et sous-titre** dans l'onglet Apparence

Puis cliquez sur **Generer le graphique**.

![Builder — configuration complete](images/guide-A5-builder-generated.png)

### Etape 6 — Copier le code genere

Basculez sur l'onglet **Code genere** dans le panneau de droite. Le code HTML complet est affiche, pret a etre copie. Cliquez sur **Copier le code** pour l'integrer dans votre page.

![Builder — code genere](images/guide-A7-builder-code.png)

Le code genere est autonome : il inclut les balises DSFR Chart avec les donnees en attributs, ainsi que les liens vers les CSS et JS necessaires.

---

## Parcours B : Creer un graphique dynamique depuis Grist

> **Pour** afficher un graphique alimente en temps reel par une table Grist,
> **je dois** connecter mon instance Grist dans Sources puis generer un graphique en mode dynamique dans le Builder,
> **afin d'** obtenir un widget HTML qui se met a jour automatiquement depuis Grist.

### Etape 1 — Creer une connexion Grist

Dans **Sources**, cliquez sur **Nouvelle connexion**. Selectionnez le type **Grist** et renseignez :

1. Le nom de la connexion
2. L'URL du serveur Grist (ex: `https://grist.numerique.gouv.fr`)
3. Cochez "Document public" si le document est partage publiquement, sinon entrez votre cle API

Cliquez sur **Tester et sauvegarder**.

![Connexion Grist](images/guide-B1-sources-grist-modal.png)

### Etape 2 — Explorer les donnees Grist

Une fois connecte, cliquez sur la connexion dans la barre laterale. L'explorateur affiche les documents et tables disponibles. L'onglet **Apercu** permet de previsualiser les donnees.

### Etape 3 — Activer le mode dynamique dans le Builder

Dans le **Builder**, selectionnez la source Grist et chargez les champs. Une section supplementaire apparait : **Mode de generation**. Selectionnez **Chargement dynamique** pour que le code genere interroge Grist en temps reel.

- **Donnees integrees** : les donnees sont copiees en dur dans le HTML (statique)
- **Chargement dynamique** : utilise `<gouv-source>` + `<gouv-query>` + `<gouv-dsfr-chart>` pour charger les donnees en temps reel

En mode dynamique, deux sections supplementaires apparaissent :
- **Nettoyage des donnees** : configure `<gouv-normalize>` pour nettoyer les donnees (trim, conversion numerique, renommage de champs, remplacement de valeurs)
- **Filtres a facettes** : configure `<gouv-facets>` pour ajouter des filtres interactifs (cases a cocher, listes deroulantes, multi-selection)

### Etape 4 — Code genere avec composants dynamiques

Apres avoir configure et genere le graphique, le code genere contient les Web Components gouv-widgets :

![Code dynamique Grist](images/guide-B4-builder-grist-code.png)

```html
<gouv-source id="data" url="https://grist.numerique.gouv.fr/api/docs/xxx/tables/yyy/records"
             transform="records[].fields"></gouv-source>
<gouv-query id="query-result" source="data" group-by="Pays" aggregate="PIB:avg" order-by="value:desc"></gouv-query>
<gouv-dsfr-chart source="query-result" type="bar" label-field="Pays" value-field="PIB"
                 title="PIB par pays"></gouv-dsfr-chart>
```

---

## Parcours C : Generer un graphique avec l'IA (Builder IA)

> **Pour** generer rapidement un graphique en decrivant ce que je veux en langage naturel,
> **je dois** selectionner une source de donnees puis discuter avec l'assistant Albert IA,
> **afin d'** obtenir un graphique et son code sans ecrire de configuration manuelle.

### Etape 1 — Charger une source et ouvrir le chat

Dans le **Builder IA**, selectionnez une source de donnees et cliquez sur **Charger**. L'interface se compose de deux zones :

1. Le panneau de configuration et le **chat IA** a gauche
2. Le panneau d'**apercu**, **code** et **donnees** a droite

![Builder IA — vue d'ensemble](images/guide-C1-builder-ia-overview.png)

### Etape 2 — Decrire le graphique souhaite

Ecrivez dans le chat ce que vous souhaitez, en langage naturel. Par exemple :

> "Fais-moi un graphique en barres des beneficiaires par region"

L'IA analyse les champs disponibles dans vos donnees et genere la configuration correspondante. Elle propose ensuite des **suggestions** pour affiner le resultat.

### Etape 3 — Iterer et exporter

L'IA repond avec :
- Le graphique genere dans l'**apercu**
- L'action executee (en JSON)
- Des **suggestions** pour modifier le graphique ("Passe en camembert", "Filtre sur IDF", etc.)

Vous pouvez continuer la conversation pour ajuster le graphique, puis copier le code depuis l'onglet **Code genere**.

![Builder IA — resultat](images/guide-C3-builder-ia-result.png)

> **Note** : le Builder IA utilise l'API Albert (IA souveraine de l'Etat). Un token API Albert est necessaire, configurable dans la section "Configuration Albert IA".

---

## Parcours D : Prototyper avec le Playground

> **Pour** tester et modifier du code de composants gouv-widgets en temps reel,
> **je dois** utiliser le Playground avec ses exemples precharges ou ecrire mon propre code,
> **afin de** prototyper rapidement des visualisations avant de les integrer.

### Etape 1 — Charger un exemple

Le **Playground** est un editeur de code split avec un apercu en temps reel. Un selecteur d'exemples propose des modeles classes en 2 categories :

- **Composants gouv-widgets** : `gouv-source` + `gouv-query` + `gouv-dsfr-chart` (barres, camembert, lignes), `gouv-kpi`, `gouv-datalist`, dashboard complet
- **DSFR Chart natifs** : composants DSFR (barres, lignes, camembert, jauge, radar, carte)

![Playground — vue d'ensemble](images/guide-D1-playground-overview.png)

### Etape 2 — Executer et visualiser

Selectionnez un exemple et cliquez sur **Executer**. Le code a gauche est rendu en temps reel dans l'apercu a droite.

### Etape 3 — Modifier et sauvegarder

Modifiez le code dans l'editeur (theme Dracula), puis :
1. Cliquez sur **Executer** (ou `Ctrl+Entree`) pour voir le resultat
2. Cliquez sur **Copier** pour copier le code
3. Cliquez sur **Favoris** pour sauvegarder dans vos favoris

---

## Parcours E : Composer un tableau de bord

> **Pour** assembler plusieurs visualisations dans un tableau de bord,
> **je dois** utiliser l'editeur de Dashboard pour glisser-deposer des widgets et les configurer,
> **afin d'** obtenir une page de dashboard exportable en HTML.

### Etape 1 — Decouvrir l'editeur de dashboard

Le **Dashboard** est un editeur visuel avec :
- A gauche : la **bibliotheque de widgets** (KPI, Graphique, Tableau, Texte), les **favoris** sauvegardes, et les reglages de **grille**
- Au centre : la **grille de placement** avec des zones de depot

### Etape 2 — Placer des widgets

Glissez un widget depuis la bibliotheque ou un favori vers une cellule de la grille. Chaque widget peut etre configure en cliquant dessus.

La barre d'outils permet de :
- **Nouveau** / **Ouvrir** / **Sauvegarder** un dashboard
- **Exporter HTML** : telecharger le dashboard en page HTML autonome
- **Apercu** : voir le rendu final dans un navigateur

### Etape 3 — Configurer la grille

La section **Grille** dans la barre laterale permet d'ajuster :
- Le nombre de **colonnes** (1 a 4)
- L'**espacement** entre les widgets (Normal ou Sans)

Chaque ligne peut avoir un nombre de colonnes different, permettant des layouts complexes (ex: 3 KPI en ligne 1, 2 graphiques en ligne 2).

Les onglets **Code genere** et **JSON** permettent de recuperer le code HTML ou la configuration JSON du dashboard.

---

## Parcours F : Connecter une API REST externe

> **Pour** afficher des donnees issues d'une API publique (data.economie.gouv.fr, data.gouv.fr, etc.),
> **je dois** creer une connexion API dans Sources puis utiliser le Builder pour configurer le graphique,
> **afin de** creer un widget qui interroge l'API en temps reel.

### Etape 1 — Creer une connexion API

Dans **Sources**, cliquez sur **Nouvelle connexion** et selectionnez le type **API REST/JSON** :

1. Selectionnez le type **API**
2. Entrez l'**URL de l'API** (ex: `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records`)
3. Indiquez le **chemin vers les donnees** dans la reponse JSON (ex: `results` pour OpenDataSoft, `data` pour tabular-api.data.gouv.fr)
4. Cliquez sur **Tester et sauvegarder**

> **APIs testees** :
> - OpenDataSoft : `data.economie.gouv.fr` (chemin : `results`)
> - Tabular API : `tabular-api.data.gouv.fr` (chemin : `data`)
> - Grist API : `grist.numerique.gouv.fr` (chemin : `records[].fields`)

### Etape 2 — Generer le graphique

Dans le **Builder**, selectionnez la source API, choisissez un type de graphique et configurez les champs.

### Etape 3 — Recuperer le code

Le code genere inclut soit un fetch direct vers l'API, soit les composants `<gouv-source>` et `<gouv-dsfr-chart>` pour un chargement dynamique.

---

## Parcours G : Suivre les deployements dans le Monitoring

> **Pour** connaitre quels widgets sont deployes et sur quels sites gouvernementaux,
> **je dois** consulter la page Monitoring qui agrege les beacons envoyes par les composants,
> **afin d'** avoir une vue d'ensemble de l'utilisation en production.

### Vue d'ensemble

La page **Monitoring** affiche automatiquement les donnees collectees par le systeme de beacons. Chaque composant gouv-widgets envoie un signal au deploiement, permettant de suivre l'utilisation.

### KPIs de suivi

Quatre indicateurs en haut de page resument l'activite :
- **Sites deployes** : nombre de domaines uniques utilisant les widgets
- **Widgets actifs** : nombre total d'instances de composants
- **Appels totaux** : volume cumule de chargements de pages
- **Derniere mise a jour** : horodatage de la derniere collecte

### Filtrer et exporter

Le tableau detaille liste chaque deploiement avec le site, la page, le composant utilise, le type de graphique, et les dates d'activite. Vous pouvez :
- **Filtrer** par composant ou type de graphique
- **Rechercher** un domaine specifique
- **Exporter en CSV** pour analyse
- **Actualiser** pour recharger les donnees

---

## Exemples d'implementations

Exemples prets a l'emploi, organises par mode de construction. Trois sources de donnees publiques sont utilisees :

- **Fiscalite locale** — Taux de taxes foncieres et d'habitation par commune (data.economie.gouv.fr)
- **Elus municipaux** — Repertoire national des elus (tabular-api.data.gouv.fr)
- **Industrie du futur** — Beneficiaires et investissements par region (data.economie.gouv.fr)

### Mode direct : gouv-source → composant

Les donnees de la source sont transmises directement au composant de visualisation, sans transformation intermediaire.

#### Barres — Taux de taxe fonciere par commune

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=15"
  transform="results"></gouv-source>

<gouv-dsfr-chart source="data" type="bar"
  label-field="libcom" value-field="taux_global_tfb"
  unit-tooltip="%" selected-palette="categorical">
</gouv-dsfr-chart>
```

#### Courbe — Beneficiaires Industrie du futur

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=20"
  transform="results"></gouv-source>

<gouv-dsfr-chart source="data" type="line"
  label-field="nom_departement" value-field="nombre_beneficiaires">
</gouv-dsfr-chart>
```

#### Camembert — Poids demographique

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=8"
  transform="results"></gouv-source>

<gouv-dsfr-chart source="data" type="pie"
  label-field="libcom" value-field="mpoid">
</gouv-dsfr-chart>
```

#### Radar — Beneficiaires par region

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=6"
  transform="results"></gouv-source>

<gouv-dsfr-chart source="data" type="radar"
  label-field="nom_region" value-field="nombre_beneficiaires">
</gouv-dsfr-chart>
```

#### Jauge — Taux de taxe fonciere

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=1"
  transform="results"></gouv-source>

<gouv-dsfr-chart source="data" type="gauge"
  value-field="taux_global_tfb">
</gouv-dsfr-chart>
```

#### Nuage — Investissement vs participation

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
  transform="results"></gouv-source>

<gouv-dsfr-chart source="data" type="scatter"
  label-field="montant_investissement"
  value-field="montant_participation_etat">
</gouv-dsfr-chart>
```

#### Barres + ligne — Investissements

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=15"
  transform="results"></gouv-source>

<gouv-dsfr-chart source="data" type="bar-line"
  label-field="nom_departement"
  value-field="montant_investissement"
  value-field-2="montant_participation_etat"
  name='["Investissement", "Participation Etat"]'>
</gouv-dsfr-chart>
```

#### Carte — Beneficiaires par departement

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
  transform="results"></gouv-source>

<gouv-dsfr-chart source="data" type="map"
  code-field="code_departement" value-field="nombre_beneficiaires"
  selected-palette="sequentialAscending">
</gouv-dsfr-chart>
```

#### KPI — Indicateurs Industrie du futur

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
  transform="results"></gouv-source>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
  <gouv-kpi source="data" valeur="sum:nombre_beneficiaires"
    label="Total beneficiaires" format="nombre"></gouv-kpi>
  <gouv-kpi source="data" valeur="avg:nombre_beneficiaires"
    label="Moyenne" format="decimal"></gouv-kpi>
  <gouv-kpi source="data" valeur="max:montant_investissement"
    label="Investissement max" format="euro" couleur="vert"></gouv-kpi>
  <gouv-kpi source="data" valeur="count"
    label="Enregistrements" format="nombre"></gouv-kpi>
</div>
```

#### Tableau — Maires de France

```html
<gouv-source id="data"
  url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=50"
  transform="data"></gouv-source>

<gouv-datalist source="data"
  colonnes="Nom de l'élu:Nom, Prénom de l'élu:Prenom, Libellé du département:Departement, Libellé de la commune:Commune"
  recherche="true" filtres="Libellé du département"
  tri="Nom de l'élu:asc" pagination="10" export="csv">
</gouv-datalist>
```

### Avec normalisation : gouv-source → gouv-normalize → composant

Les donnees passent par `gouv-normalize` qui nettoie les valeurs (conversion numerique, renommage, trim) avant de les transmettre au composant de visualisation ou a `gouv-query`.

#### Barres — Conversion numerique + renommage

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
  transform="results"></gouv-source>

<gouv-normalize id="clean" source="data"
  numeric="nombre_beneficiaires, montant_investissement"
  rename="nom_region:Region | nombre_beneficiaires:Beneficiaires | montant_investissement:Investissement"
  trim>
</gouv-normalize>

<gouv-query id="stats" source="clean"
  group-by="Region"
  aggregate="Beneficiaires:sum"
  order-by="Beneficiaires__sum:desc"
  limit="10">
</gouv-query>

<gouv-dsfr-chart source="stats" type="bar"
  label-field="Region" value-field="Beneficiaires__sum"
  selected-palette="categorical">
</gouv-dsfr-chart>
```

#### Tableau — Renommage de champs accentes

```html
<gouv-source id="data"
  url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=50"
  transform="data"></gouv-source>

<gouv-normalize id="clean" source="data"
  trim
  rename="Nom de l'élu:Nom | Prénom de l'élu:Prenom | Libellé du département:Departement | Libellé de la commune:Commune | Code sexe:Sexe">
</gouv-normalize>

<gouv-datalist source="clean"
  colonnes="Nom, Prenom, Commune, Departement, Sexe"
  recherche pagination="10" export="csv">
</gouv-datalist>
```

### Avec requete : gouv-source → gouv-query → composant

Les donnees passent par `gouv-query` qui les filtre, regroupe et/ou agrege avant de les transmettre au composant de visualisation.

#### Barres — Beneficiaires agreges par region

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
  transform="results"></gouv-source>

<gouv-query id="q" source="data"
  group-by="nom_region"
  aggregate="nombre_beneficiaires:sum:beneficiaires"
  order-by="beneficiaires:desc" limit="10">
</gouv-query>

<gouv-dsfr-chart source="q" type="bar"
  label-field="nom_region" value-field="beneficiaires">
</gouv-dsfr-chart>
```

#### Courbe — Taux moyen TFB par region

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=100"
  transform="results"></gouv-source>

<gouv-query id="q" source="data"
  group-by="libreg"
  aggregate="taux_global_tfb:avg:taux_moyen"
  order-by="taux_moyen:desc">
</gouv-query>

<gouv-dsfr-chart source="q" type="line"
  label-field="libreg" value-field="taux_moyen" unit-tooltip="%">
</gouv-dsfr-chart>
```

#### Camembert — Maires par categorie socio-pro

```html
<gouv-source id="data"
  url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=100"
  transform="data"></gouv-source>

<gouv-query id="q" source="data"
  group-by="Libellé de la catégorie socio-professionnelle"
  aggregate="Code sexe:count:nombre"
  order-by="nombre:desc" limit="8">
</gouv-query>

<gouv-dsfr-chart source="q" type="pie"
  label-field="Libellé de la catégorie socio-professionnelle"
  value-field="nombre">
</gouv-dsfr-chart>
```

#### Carte — Taux TFB par departement

```html
<gouv-source id="data"
  url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=100"
  transform="results"></gouv-source>

<gouv-query id="q" source="data"
  group-by="dep"
  aggregate="taux_global_tfb:avg:taux">
</gouv-query>

<gouv-dsfr-chart source="q" type="map"
  code-field="dep" value-field="taux"
  selected-palette="sequentialAscending">
</gouv-dsfr-chart>
```

#### KPI — Statistiques des maires avec filtre

```html
<gouv-source id="data"
  url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=100"
  transform="data"></gouv-source>

<gouv-query id="q-femmes" source="data"
  filter="Code sexe:eq:F">
</gouv-query>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
  <gouv-kpi source="data" valeur="count"
    label="Total des maires" format="nombre"></gouv-kpi>
  <gouv-kpi source="q-femmes" valeur="count"
    label="Dont femmes" format="nombre" couleur="bleu"></gouv-kpi>
</div>
```

#### Tableau — Maires filtres par departement

```html
<gouv-source id="data"
  url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=100"
  transform="data"></gouv-source>

<gouv-query id="q" source="data"
  filter="Libellé du département:contains:Ain">
</gouv-query>

<gouv-datalist source="q"
  colonnes="Nom de l'élu:Nom, Prénom de l'élu:Prenom, Libellé de la commune:Commune, Libellé du département:Departement"
  recherche="true" tri="Nom de l'élu:asc" pagination="10" export="csv">
</gouv-datalist>
```

---

## Ressources

- **Code source** : [github.com/bmatge/datasource-charts-webcomponents](https://github.com/bmatge/datasource-charts-webcomponents)
- **Demo composants** : section Composants de l'application
- **Documentation DSFR Chart** : [github.com/GouvernementFR/dsfr-chart](https://github.com/GouvernementFR/dsfr-chart)
- **API Albert** : [albert.api.etalab.gouv.fr](https://albert.api.etalab.gouv.fr)
