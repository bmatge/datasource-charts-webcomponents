/**
 * Playground examples data
 *
 * 30 exemples organises en 5 modes de construction :
 *
 * Mode direct       : gouv-source → composant (gouv-dsfr-chart / gouv-kpi / gouv-datalist)
 * Mode requete      : gouv-source → gouv-query → composant
 * Mode normalisation : gouv-source → gouv-normalize → gouv-query → composant
 * Mode facettes     : gouv-source → gouv-normalize → gouv-facets → composant
 * Mode display      : gouv-source → gouv-display (template HTML dynamique)
 *
 * Sources de donnees alternees :
 *  - API 1 : Fiscalite locale des particuliers (data.economie.gouv.fr)
 *  - API 2 : Registre des elus municipaux (tabular-api.data.gouv.fr)
 *  - API 3 : Industrie du futur (data.economie.gouv.fr)
 *  - API 4 : LOVAC logements vacants (tabular-api.data.gouv.fr)
 */
export const examples: Record<string, string> = {

  // =====================================================================
  // MODE DIRECT — gouv-source → composant
  // Les donnees de la source sont transmises directement au composant
  // de visualisation, sans transformation intermediaire.
  // =====================================================================

  'direct-bar': `<!--
  Barres — Taux de taxe fonciere par commune
  Mode direct : gouv-source → gouv-dsfr-chart (bar)
  Source : Fiscalite locale des particuliers
-->

<div class="fr-container fr-my-4w">
  <h2>Taux de taxe fonciere par commune</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Fiscalite locale des particuliers
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=15"
    transform="results">
  </gouv-source>

  <gouv-dsfr-chart source="data"
    type="bar"
    label-field="libcom"
    value-field="taux_global_tfb"
    unit-tooltip="%"
    selected-palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  'direct-line': `<!--
  Courbe — Beneficiaires Industrie du futur par departement
  Mode direct : gouv-source → gouv-dsfr-chart (line)
  Source : Industrie du futur
-->

<div class="fr-container fr-my-4w">
  <h2>Beneficiaires Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=20"
    transform="results">
  </gouv-source>

  <gouv-dsfr-chart source="data"
    type="line"
    label-field="nom_departement"
    value-field="nombre_beneficiaires"
    selected-palette="default">
  </gouv-dsfr-chart>
</div>`,

  'direct-pie': `<!--
  Camembert — Poids demographique par commune
  Mode direct : gouv-source → gouv-dsfr-chart (pie)
  Source : Fiscalite locale des particuliers
-->

<div class="fr-container fr-my-4w">
  <h2>Poids demographique par commune</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Fiscalite locale des particuliers
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=8"
    transform="results">
  </gouv-source>

  <div style="max-width: 500px; margin: 0 auto;">
    <gouv-dsfr-chart source="data"
      type="pie"
      label-field="libcom"
      value-field="mpoid"
      selected-palette="categorical">
    </gouv-dsfr-chart>
  </div>
</div>`,

  'direct-radar': `<!--
  Radar — Beneficiaires par region
  Mode direct : gouv-source → gouv-dsfr-chart (radar)
  Source : Industrie du futur
-->

<div class="fr-container fr-my-4w">
  <h2>Profil des beneficiaires par region</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=6"
    transform="results">
  </gouv-source>

  <div style="max-width: 500px; margin: 0 auto;">
    <gouv-dsfr-chart source="data"
      type="radar"
      label-field="nom_region"
      value-field="nombre_beneficiaires"
      selected-palette="default">
    </gouv-dsfr-chart>
  </div>
</div>`,

  'direct-gauge': `<!--
  Jauge — Taux de taxe fonciere d'une commune
  Mode direct : gouv-source → gouv-dsfr-chart (gauge)
  Source : Fiscalite locale des particuliers (1 enregistrement)
-->

<div class="fr-container fr-my-4w">
  <h2>Taux de taxe fonciere</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Fiscalite locale des particuliers
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=1"
    transform="results">
  </gouv-source>

  <div style="max-width: 300px; margin: 0 auto;">
    <gouv-dsfr-chart source="data"
      type="gauge"
      value-field="taux_global_tfb">
    </gouv-dsfr-chart>
  </div>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      La jauge utilise la valeur du premier enregistrement.
      Ici le taux de taxe fonciere (0-100%) est naturellement adapte.
    </p>
  </div>
</div>`,

  'direct-scatter': `<!--
  Nuage de points — Investissement vs participation de l'Etat
  Mode direct : gouv-source → gouv-dsfr-chart (scatter)
  Source : Industrie du futur
-->

<div class="fr-container fr-my-4w">
  <h2>Investissement vs participation de l'Etat</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-dsfr-chart source="data"
    type="scatter"
    label-field="montant_investissement"
    value-field="montant_participation_etat"
    selected-palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  'direct-barline': `<!--
  Barres + ligne — Investissement et participation par departement
  Mode direct : gouv-source → gouv-dsfr-chart (bar-line)
  Source : Industrie du futur
  Utilise value-field (barres) et value-field-2 (ligne)
-->

<div class="fr-container fr-my-4w">
  <h2>Investissement et participation de l'Etat</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=15"
    transform="results">
  </gouv-source>

  <gouv-dsfr-chart source="data"
    type="bar-line"
    label-field="nom_departement"
    value-field="montant_investissement"
    value-field-2="montant_participation_etat"
    name='["Investissement", "Participation Etat"]'
    unit-tooltip="EUR"
    selected-palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  'direct-map': `<!--
  Carte — Beneficiaires par departement
  Mode direct : gouv-source → gouv-dsfr-chart (map)
  Source : Industrie du futur
  Utilise code-field pour les codes departement
-->

<div class="fr-container fr-my-4w">
  <h2>Beneficiaires Industrie du futur par departement</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-dsfr-chart source="data"
    type="map"
    code-field="code_departement"
    value-field="nombre_beneficiaires"
    selected-palette="sequentialAscending">
  </gouv-dsfr-chart>
</div>`,

  'direct-kpi': `<!--
  KPI — Indicateurs cles Industrie du futur
  Mode direct : gouv-source → gouv-kpi (x4)
  Source : Industrie du futur
  Chaque KPI calcule une agregation sur les donnees brutes
-->

<div class="fr-container fr-my-4w">
  <h2>Indicateurs cles — Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
    <gouv-kpi source="data"
      valeur="sum:nombre_beneficiaires"
      label="Total beneficiaires"
      format="nombre">
    </gouv-kpi>

    <gouv-kpi source="data"
      valeur="avg:nombre_beneficiaires"
      label="Moyenne par enregistrement"
      format="decimal">
    </gouv-kpi>

    <gouv-kpi source="data"
      valeur="max:montant_investissement"
      label="Investissement max"
      format="euro"
      couleur="vert">
    </gouv-kpi>

    <gouv-kpi source="data"
      valeur="count"
      label="Enregistrements"
      format="nombre">
    </gouv-kpi>
  </div>
</div>`,

  'direct-datalist': `<!--
  Tableau — Maires de France
  Mode direct : gouv-source → gouv-datalist
  Source : Registre des maires (tabular-api)
  Affiche un tableau avec recherche, filtres, tri et export
-->

<div class="fr-container fr-my-4w">
  <h2>Maires de France</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=50"
    transform="data">
  </gouv-source>

  <gouv-datalist source="data"
    colonnes="Nom de l'élu:Nom, Prénom de l'élu:Prenom, Libellé du département:Departement, Libellé de la commune:Commune"
    recherche="true"
    filtres="Libellé du département"
    tri="Nom de l'élu:asc"
    pagination="10"
    export="csv">
  </gouv-datalist>
</div>`,

  // =====================================================================
  // PAGINATION SERVEUR — gouv-source paginate → composant
  // gouv-source gere la pagination cote serveur : chaque changement
  // de page declenche un nouvel appel API avec page=N&page_size=M.
  // =====================================================================

  'server-paginate-datalist': `<!--
  Tableau avec pagination serveur — Maires de France (34 874 records)
  Mode direct : gouv-source (paginate) → gouv-datalist
  Source : Registre des maires (tabular-api)
  Chaque page est chargee depuis l'API, pas de chargement complet en memoire
-->

<div class="fr-container fr-my-4w">
  <h2>Maires de France — Pagination serveur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
    <br>34 874 enregistrements navigables page par page via l'API
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/"
    paginate page-size="20">
  </gouv-source>

  <gouv-datalist source="data"
    colonnes="Nom de l'élu:Nom, Prénom de l'élu:Prenom, Libellé du département:Departement, Libellé de la commune:Commune"
    recherche="true"
    tri="Nom de l'élu:asc"
    pagination="20">
  </gouv-datalist>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      Avec <code>paginate</code> et <code>page-size="20"</code>, <code>gouv-source</code>
      injecte <code>?page=N&amp;page_size=20</code> dans l'URL. Pas besoin de <code>transform="data"</code> :
      en mode pagination, les donnees sont auto-extraites depuis <code>json.data</code>.
      Cliquer sur une page declenche un nouvel appel API.
    </p>
  </div>
</div>`,

  'server-paginate-display': `<!--
  Cartes avec pagination serveur — Maires de France
  Mode direct : gouv-source (paginate) → gouv-display (cartes)
  Source : Registre des maires (tabular-api)
  Naviguez dans les 34 874 maires avec des cartes DSFR, page par page
-->

<div class="fr-container fr-my-4w">
  <h2>Maires de France — Cartes paginee serveur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
    <br>Pagination cote serveur : chaque page = un appel API
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/"
    paginate page-size="12">
  </gouv-source>

  <gouv-display source="data" cols="3" pagination="12">
    <template>
      <div class="fr-card fr-card--shadow">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h3 class="fr-card__title">{{Nom de l'élu}} {{Prénom de l'élu}}</h3>
            <p class="fr-card__desc">{{Libellé de la commune}}</p>
            <div class="fr-card__start">
              <p class="fr-badge fr-badge--sm fr-badge--green-emeraude">
                {{Libellé du département}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </gouv-display>
</div>`,

  'paginate-kpi-global': `<!--
  Pagination serveur + KPI globaux — Maires de France
  Double source : gouv-source (paginate) pour navigation + gouv-query (tabular) pour KPI
  Source : Registre des maires (tabular-api) — 34 874 records
  La datalist navigue page par page, les KPI portent sur le dataset complet
-->

<div class="fr-container fr-my-4w">
  <h2>Maires de France — Pagination + KPI globaux</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
    <br>Double source : pagination serveur pour la navigation, agregation globale pour les KPI
  </p>

  <!-- Source 1 : pagination serveur pour la navigation -->
  <gouv-source id="browse"
    url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/"
    paginate page-size="20">
  </gouv-source>

  <!-- Source 2 : chargement complet pour les KPI globaux -->
  <gouv-query id="global-stats"
    api-type="tabular"
    resource="2876a346-d50c-4911-934e-19ee07b0e503"
    aggregate="Nom de l'\u00e9lu:count:total">
  </gouv-query>

  <gouv-query id="global-femmes"
    api-type="tabular"
    resource="2876a346-d50c-4911-934e-19ee07b0e503"
    filter="Code sexe:eq:F"
    aggregate="Nom de l'\u00e9lu:count:total_femmes">
  </gouv-query>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
    <gouv-kpi source="global-stats"
      valeur="sum:total"
      label="Total des maires"
      format="nombre">
    </gouv-kpi>

    <gouv-kpi source="global-femmes"
      valeur="sum:total_femmes"
      label="Dont femmes"
      format="nombre"
      couleur="bleu">
    </gouv-kpi>
  </div>

  <gouv-datalist source="browse"
    colonnes="Nom de l'\u00e9lu:Nom, Pr\u00e9nom de l'\u00e9lu:Prenom, Libell\u00e9 du d\u00e9partement:Departement, Libell\u00e9 de la commune:Commune"
    tri="Nom de l'\u00e9lu:asc"
    pagination="20">
  </gouv-datalist>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      <strong>Pattern double source :</strong> <code>gouv-source paginate</code> charge une page a la fois
      pour la navigation (20 records). En parallele, <code>gouv-query api-type="tabular"</code>
      charge et agrege le dataset complet (34 874 records) pour les KPI globaux.
      Les deux sources fonctionnent independamment.
    </p>
  </div>
</div>`,

  // =====================================================================
  // MODE AVEC REQUETE — gouv-source → gouv-query → composant
  // Les donnees passent par gouv-query qui les filtre, regroupe
  // et/ou agrege avant de les transmettre au composant de visualisation.
  // =====================================================================

  'query-tabular-pie': `<!--
  Camembert — Tous les maires par categorie (dataset complet, multi-page)
  Mode requete : gouv-query (api-type="tabular") → gouv-dsfr-chart (pie)
  Source : Registre des maires (tabular-api) — 34 874 records
  gouv-query charge automatiquement TOUTES les pages (par tranches de 100)
  puis compte par categorie socio-professionnelle.
  Permet d'agreger sur l'ensemble d'un dataset, pas seulement les 100 premiers.
-->

<div class="fr-container fr-my-4w">
  <h2>Maires par categorie — Dataset complet (34 874)</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
    <br>Chargement multi-page automatique : toutes les pages sont recuperees avant aggregation
  </p>

  <gouv-query id="q"
    api-type="tabular"
    resource="2876a346-d50c-4911-934e-19ee07b0e503"
    group-by="Libellé de la catégorie socio-professionnelle"
    aggregate="Nom de l'élu:count:nombre"
    order-by="nombre:desc"
    limit="10">
  </gouv-query>

  <div style="max-width: 500px; margin: 0 auto;">
    <gouv-dsfr-chart source="q"
      type="pie"
      label-field="Libellé de la catégorie socio-professionnelle"
      value-field="nombre"
      selected-palette="categorical">
    </gouv-dsfr-chart>
  </div>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      Avec <code>api-type="tabular"</code>, <code>gouv-query</code> recupere automatiquement
      toutes les pages du dataset (100 records par page). Le chargement peut prendre quelques secondes
      pour les gros datasets. Les agregations (group-by, count, sum...) sont ensuite appliquees
      sur l'ensemble des donnees.
    </p>
  </div>
</div>`,

  'query-bar': `<!--
  Barres — Beneficiaires agreges par region
  Mode requete : gouv-source → gouv-query → gouv-dsfr-chart (bar)
  Source : Industrie du futur
  gouv-query regroupe par region et somme les beneficiaires
-->

<div class="fr-container fr-my-4w">
  <h2>Beneficiaires Industrie du futur par region</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="q-bar" source="data"
    group-by="nom_region"
    aggregate="nombre_beneficiaires:sum:beneficiaires"
    order-by="beneficiaires:desc"
    limit="10">
  </gouv-query>

  <gouv-dsfr-chart source="q-bar"
    type="bar"
    label-field="nom_region"
    value-field="beneficiaires"
    selected-palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  'query-line': `<!--
  Courbe — Taux moyen de taxe fonciere par region
  Mode requete : gouv-source → gouv-query → gouv-dsfr-chart (line)
  Source : Fiscalite locale des particuliers
  gouv-query calcule la moyenne du taux TFB par region
-->

<div class="fr-container fr-my-4w">
  <h2>Taux moyen de taxe fonciere par region</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Fiscalite locale des particuliers
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="q-line" source="data"
    group-by="libreg"
    aggregate="taux_global_tfb:avg:taux_moyen"
    order-by="taux_moyen:desc">
  </gouv-query>

  <gouv-dsfr-chart source="q-line"
    type="line"
    label-field="libreg"
    value-field="taux_moyen"
    unit-tooltip="%"
    selected-palette="default">
  </gouv-dsfr-chart>
</div>`,

  'query-pie': `<!--
  Camembert — Maires par categorie socio-professionnelle
  Mode requete : gouv-source → gouv-query → gouv-dsfr-chart (pie)
  Source : Registre des maires (tabular-api)
  gouv-query regroupe par categorie et compte le nombre de maires
-->

<div class="fr-container fr-my-4w">
  <h2>Maires par categorie socio-professionnelle</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=100"
    transform="data">
  </gouv-source>

  <gouv-query id="q-pie" source="data"
    group-by="Libellé de la catégorie socio-professionnelle"
    aggregate="Code sexe:count:nombre"
    order-by="nombre:desc"
    limit="8">
  </gouv-query>

  <div style="max-width: 500px; margin: 0 auto;">
    <gouv-dsfr-chart source="q-pie"
      type="pie"
      label-field="Libellé de la catégorie socio-professionnelle"
      value-field="nombre"
      selected-palette="categorical">
    </gouv-dsfr-chart>
  </div>
</div>`,

  'query-radar': `<!--
  Radar — Investissement moyen par region
  Mode requete : gouv-source → gouv-query → gouv-dsfr-chart (radar)
  Source : Industrie du futur
  gouv-query calcule l'investissement moyen par region
-->

<div class="fr-container fr-my-4w">
  <h2>Investissement moyen par region</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="q-radar" source="data"
    group-by="nom_region"
    aggregate="montant_investissement:avg:investissement"
    limit="6">
  </gouv-query>

  <div style="max-width: 500px; margin: 0 auto;">
    <gouv-dsfr-chart source="q-radar"
      type="radar"
      label-field="nom_region"
      value-field="investissement"
      selected-palette="default">
    </gouv-dsfr-chart>
  </div>
</div>`,

  'query-gauge': `<!--
  Jauge — Taux moyen TFB le plus eleve par region
  Mode requete : gouv-source → gouv-query → gouv-dsfr-chart (gauge)
  Source : Fiscalite locale des particuliers
  gouv-query calcule la moyenne par region et prend le max (limit=1)
-->

<div class="fr-container fr-my-4w">
  <h2>Region au taux moyen TFB le plus eleve</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Fiscalite locale des particuliers
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="q-gauge" source="data"
    group-by="libreg"
    aggregate="taux_global_tfb:avg:taux_moyen"
    order-by="taux_moyen:desc"
    limit="1">
  </gouv-query>

  <div style="max-width: 300px; margin: 0 auto;">
    <gouv-dsfr-chart source="q-gauge"
      type="gauge"
      value-field="taux_moyen">
    </gouv-dsfr-chart>
  </div>
</div>`,

  'query-scatter': `<!--
  Nuage de points — TFB vs TH moyens par departement
  Mode requete : gouv-source → gouv-query → gouv-dsfr-chart (scatter)
  Source : Fiscalite locale des particuliers
  gouv-query calcule les moyennes TFB et TH par departement
-->

<div class="fr-container fr-my-4w">
  <h2>Taux TFB vs TH par departement</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Fiscalite locale des particuliers
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="q-scatter" source="data"
    group-by="libdep"
    aggregate="taux_global_tfb:avg:tfb, taux_global_th:avg:th"
    limit="30">
  </gouv-query>

  <gouv-dsfr-chart source="q-scatter"
    type="scatter"
    label-field="tfb"
    value-field="th"
    selected-palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  'query-barline': `<!--
  Barres + ligne — TFB et TH moyens par region
  Mode requete : gouv-source → gouv-query → gouv-dsfr-chart (bar-line)
  Source : Fiscalite locale des particuliers
  gouv-query calcule les moyennes TFB (barres) et TH (ligne) par region
-->

<div class="fr-container fr-my-4w">
  <h2>Taux moyens TFB et TH par region</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Fiscalite locale des particuliers
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="q-barline" source="data"
    group-by="libreg"
    aggregate="taux_global_tfb:avg:tfb, taux_global_th:avg:th"
    order-by="tfb:desc">
  </gouv-query>

  <gouv-dsfr-chart source="q-barline"
    type="bar-line"
    label-field="libreg"
    value-field="tfb"
    value-field-2="th"
    name='["Taxe fonciere (TFB)", "Taxe habitation (TH)"]'
    unit-tooltip="%"
    selected-palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  'query-map': `<!--
  Carte — Taux TFB moyen par departement
  Mode requete : gouv-source → gouv-query → gouv-dsfr-chart (map)
  Source : Fiscalite locale des particuliers
  gouv-query calcule la moyenne TFB par departement (code dep)
-->

<div class="fr-container fr-my-4w">
  <h2>Taux moyen de taxe fonciere par departement</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Fiscalite locale des particuliers
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="q-map" source="data"
    group-by="dep"
    aggregate="taux_global_tfb:avg:taux">
  </gouv-query>

  <gouv-dsfr-chart source="q-map"
    type="map"
    code-field="dep"
    value-field="taux"
    selected-palette="sequentialAscending">
  </gouv-dsfr-chart>
</div>`,

  'query-kpi': `<!--
  KPI — Statistiques des maires avec filtre
  Mode requete : gouv-source → gouv-query (filtre) → gouv-kpi
  Source : Registre des maires (tabular-api)
  Compare le total des maires au nombre de femmes maires
-->

<div class="fr-container fr-my-4w">
  <h2>Statistiques des maires</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=100"
    transform="data">
  </gouv-source>

  <!-- Filtre client-side : uniquement les femmes -->
  <gouv-query id="q-femmes" source="data"
    filter="Code sexe:eq:F">
  </gouv-query>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
    <gouv-kpi source="data"
      valeur="count"
      label="Total des maires"
      format="nombre">
    </gouv-kpi>

    <gouv-kpi source="q-femmes"
      valeur="count"
      label="Dont femmes"
      format="nombre"
      couleur="bleu">
    </gouv-kpi>
  </div>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      <code>gouv-query</code> filtre cote client avec <code>Code sexe:eq:F</code>
      pour isoler les femmes maires. Les deux KPI partagent la meme source.
    </p>
  </div>
</div>`,

  'query-datalist': `<!--
  Tableau — Maires filtres par departement
  Mode requete : gouv-source → gouv-query → gouv-datalist
  Source : Registre des maires (tabular-api)
  gouv-query filtre les maires d'un departement
-->

<div class="fr-container fr-my-4w">
  <h2>Maires — Departement de l'Ain</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=100"
    transform="data">
  </gouv-source>

  <gouv-query id="q-datalist" source="data"
    filter="Libellé du département:contains:Ain">
  </gouv-query>

  <gouv-datalist source="q-datalist"
    colonnes="Nom de l'élu:Nom, Prénom de l'élu:Prenom, Libellé de la commune:Commune"
    recherche="true"
    tri="Nom de l'élu:asc"
    pagination="10"
    export="csv">
  </gouv-datalist>
</div>`,

  // =====================================================================
  // MODE AVEC NORMALISATION — gouv-source → gouv-normalize → gouv-query → composant
  // Les donnees passent par gouv-normalize pour etre nettoyees
  // (conversion numerique, renommage, trim) avant traitement par gouv-query.
  // =====================================================================

  'normalize-bar': `<!--
  Barres — Logements vacants par departement (donnees LOVAC nettoyees)
  Pipeline : gouv-source → gouv-normalize → gouv-query → gouv-dsfr-chart (bar)
  Source : LOVAC - Logements vacants (tabular-api)
  Probleme : les cles ont des espaces (" DEP ", " LIB_DEP ") et les
  nombres sont en string avec separateurs milliers (" 19 805   ").
  gouv-normalize nettoie les cles (trim), convertit les nombres (numeric-auto)
  et renomme les colonnes cryptiques en noms lisibles.
-->

<div class="fr-container fr-my-4w">
  <h2>Top 15 departements par logements vacants (2025)</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — LOVAC, logements vacants du parc prive
    <br>Pipeline : gouv-source → <strong>gouv-normalize</strong> → gouv-query → gouv-dsfr-chart
  </p>

  <gouv-source id="raw"
    url="https://tabular-api.data.gouv.fr/api/resources/42a34c0a-7c97-4463-b00e-5913ea5f7077/data/?page_size=101"
    transform="data">
  </gouv-source>

  <!-- Nettoyage :
    - trim nettoie les cles (" DEP " → "DEP") ET les valeurs (" Ain " → "Ain")
    - numeric-auto convertit " 19 805   " → 19805 (detecte les nombres avec espaces)
    - rename donne des noms lisibles aux colonnes -->
  <gouv-normalize id="clean" source="raw"
    trim
    numeric-auto
    rename="LIB_DEP:Departement | pp_vacant_25:Vacants 2025">
  </gouv-normalize>

  <gouv-query id="top" source="clean"
    order-by="Vacants 2025:desc"
    limit="15">
  </gouv-query>

  <gouv-dsfr-chart source="top"
    type="bar"
    label-field="Departement"
    value-field="Vacants 2025"
    selected-palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  'normalize-pie': `<!--
  Camembert — Part des logements vacants de longue duree
  Pipeline : gouv-source → gouv-normalize → gouv-query → gouv-dsfr-chart (pie)
  Source : LOVAC - Logements vacants (tabular-api)
  Montre la proportion de logements vacants >2 ans parmi les top departements.
-->

<div class="fr-container fr-my-4w">
  <h2>Top 8 departements — Vacants longue duree (>2 ans)</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — LOVAC, logements vacants du parc prive
    <br>Pipeline : gouv-source → <strong>gouv-normalize</strong> → gouv-query → gouv-dsfr-chart
  </p>

  <gouv-source id="raw"
    url="https://tabular-api.data.gouv.fr/api/resources/42a34c0a-7c97-4463-b00e-5913ea5f7077/data/?page_size=101"
    transform="data">
  </gouv-source>

  <!-- Nettoyage : trim (cles + valeurs), conversion numerique explicite, renommage -->
  <gouv-normalize id="clean" source="raw"
    trim
    numeric="pp_vacant_plus_2ans_25"
    rename="LIB_DEP:Departement | pp_vacant_plus_2ans_25:Vacants longue duree">
  </gouv-normalize>

  <gouv-query id="top" source="clean"
    order-by="Vacants longue duree:desc"
    limit="8">
  </gouv-query>

  <div style="max-width: 500px; margin: 0 auto;">
    <gouv-dsfr-chart source="top"
      type="pie"
      label-field="Departement"
      value-field="Vacants longue duree"
      selected-palette="categorical">
    </gouv-dsfr-chart>
  </div>
</div>`,

  'normalize-line': `<!--
  Courbe — Parc total de logements prives par departement
  Pipeline : gouv-source → gouv-normalize → gouv-query → gouv-dsfr-chart (line)
  Source : LOVAC - Logements vacants (tabular-api)
  Montre les 20 plus grands parcs de logements departementaux.
  Les nombres bruts sont en string avec milliers espaces (" 293 837   ").
-->

<div class="fr-container fr-my-4w">
  <h2>Parc de logements prives par departement (top 20)</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — LOVAC, logements vacants du parc prive
    <br>Pipeline : gouv-source → <strong>gouv-normalize</strong> → gouv-query → gouv-dsfr-chart
  </p>

  <gouv-source id="raw"
    url="https://tabular-api.data.gouv.fr/api/resources/42a34c0a-7c97-4463-b00e-5913ea5f7077/data/?page_size=101"
    transform="data">
  </gouv-source>

  <!-- Nettoyage : trim cles/valeurs + conversion numerique ciblee + renommage -->
  <gouv-normalize id="clean" source="raw"
    trim
    numeric="pp_total_24, pp_vacant_25"
    rename="LIB_DEP:Departement | pp_total_24:Logements 2024 | pp_vacant_25:Vacants 2025">
  </gouv-normalize>

  <gouv-query id="top" source="clean"
    order-by="Logements 2024:desc"
    limit="20">
  </gouv-query>

  <gouv-dsfr-chart source="top"
    type="line"
    label-field="Departement"
    value-field="Logements 2024"
    selected-palette="default">
  </gouv-dsfr-chart>
</div>`,

  'normalize-datalist': `<!--
  Tableau — Donnees LOVAC nettoyees et lisibles
  Pipeline : gouv-source → gouv-normalize → gouv-datalist
  Source : LOVAC - Logements vacants (tabular-api)
  Les donnees brutes ont des cles avec espaces (" DEP ", " LIB_DEP "),
  des nombres en string (" 19 805   ") et des noms de colonnes cryptiques.
  gouv-normalize nettoie tout avant l'affichage en tableau.
-->

<div class="fr-container fr-my-4w">
  <h2>LOVAC — Logements vacants par departement</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — LOVAC, logements vacants du parc prive
    <br>Pipeline : gouv-source → <strong>gouv-normalize</strong> → gouv-datalist
  </p>

  <gouv-source id="raw"
    url="https://tabular-api.data.gouv.fr/api/resources/42a34c0a-7c97-4463-b00e-5913ea5f7077/data/?page_size=101"
    transform="data">
  </gouv-source>

  <!-- Nettoyage complet :
    - trim : nettoie les espaces dans les cles ET les valeurs
    - numeric-auto : detecte et convertit tous les champs numeriques
    - rename : noms lisibles pour le tableau -->
  <gouv-normalize id="clean" source="raw"
    trim
    numeric-auto
    rename="DEP:Code | LIB_DEP:Departement | pp_vacant_25:Vacants 2025 | pp_vacant_plus_2ans_25:Vacants >2 ans | pp_total_24:Total logements 2024 | pp_vacant_24:Vacants 2024">
  </gouv-normalize>

  <gouv-datalist source="clean"
    colonnes="Code, Departement, Vacants 2025, Vacants >2 ans, Total logements 2024, Vacants 2024"
    recherche="true"
    tri="Vacants 2025:desc"
    pagination="15"
    export="csv">
  </gouv-datalist>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      Les donnees LOVAC brutes ont des cles avec espaces (<code>" DEP "</code>),
      des nombres en texte avec separateurs milliers (<code>" 19 805   "</code>),
      et des noms de colonnes techniques. Avec <code>trim</code> + <code>numeric-auto</code>
      + <code>rename</code>, les donnees deviennent propres et lisibles.
    </p>
  </div>
</div>`,

  // =====================================================================
  // MODE FACETTES — gouv-source → gouv-normalize → gouv-facets → composant
  // Les donnees passent par gouv-facets qui affiche des filtres interactifs.
  // L'utilisateur selectionne des valeurs et les composants en aval
  // se mettent a jour automatiquement.
  // =====================================================================

  'facets-datalist': `<!--
  Tableau filtrable — Maires avec facettes
  Pipeline : gouv-source → gouv-normalize → gouv-facets → gouv-datalist
  Source : Registre des maires (tabular-api)
  gouv-facets affiche des filtres interactifs par departement et categorie
-->

<div class="fr-container fr-my-4w">
  <h2>Maires de France — exploration par facettes</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
    <br>Pipeline : gouv-source → gouv-normalize → <strong>gouv-facets</strong> → gouv-datalist
  </p>

  <gouv-source id="raw"
    url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=100"
    transform="data">
  </gouv-source>

  <gouv-normalize id="clean" source="raw"
    rename="Nom de l'élu:Nom | Prénom de l'élu:Prenom | Libellé du département:Departement | Libellé de la commune:Commune | Libellé de la catégorie socio-professionnelle:Categorie | Code sexe:Sexe"
    trim>
  </gouv-normalize>

  <!-- Facettes : filtres interactifs sur Departement, Categorie et Sexe -->
  <gouv-facets id="filtered" source="clean"
    fields="Departement, Categorie, Sexe"
    labels="Departement:Departement | Categorie:Categorie socio-pro | Sexe:Sexe"
    searchable="Departement"
    disjunctive="Departement"
    max-values="8">
  </gouv-facets>

  <gouv-datalist source="filtered"
    colonnes="Nom, Prenom, Commune, Departement, Categorie"
    recherche="true"
    tri="Nom:asc"
    pagination="10"
    export="csv">
  </gouv-datalist>
</div>`,

  'facets-bar': `<!--
  Barres — Beneficiaires Industrie du futur filtres par region
  Pipeline : gouv-source → gouv-normalize → gouv-facets → gouv-query → gouv-dsfr-chart (bar)
  Source : Industrie du futur
  gouv-facets filtre par region, gouv-query agrege ensuite les donnees filtrees
-->

<div class="fr-container fr-my-4w">
  <h2>Beneficiaires Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
    <br>Pipeline : gouv-source → gouv-normalize → <strong>gouv-facets</strong> → gouv-query → gouv-dsfr-chart
  </p>

  <gouv-source id="raw"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-normalize id="clean" source="raw"
    numeric="montant_investissement, montant_participation_etat, nombre_beneficiaires"
    rename="nom_region:Region | nom_departement:Departement"
    trim>
  </gouv-normalize>

  <!-- Facettes : filtrer par region avant aggregation -->
  <gouv-facets id="filtered" source="clean"
    fields="Region"
    disjunctive="Region"
    sort="alpha"
    max-values="8">
  </gouv-facets>

  <gouv-query id="stats" source="filtered"
    group-by="Departement"
    aggregate="nombre_beneficiaires:sum:Beneficiaires"
    order-by="Beneficiaires:desc"
    limit="15">
  </gouv-query>

  <gouv-dsfr-chart source="stats"
    type="bar"
    label-field="Departement"
    value-field="Beneficiaires"
    selected-palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  // =====================================================================
  // MODE DISPLAY — gouv-source → gouv-display (template HTML dynamique)
  // gouv-display repete un template HTML pour chaque element de donnees,
  // ideal pour creer des cartes DSFR, tuiles ou tout motif repetitif.
  // =====================================================================

  'direct-display': `<!--
  Cartes DSFR — Beneficiaires Industrie du futur (pagination serveur)
  Pipeline : gouv-query (server-side) → gouv-display
  Source : OpenDataSoft — Industrie du futur
  Pagination serveur : chaque page = un appel API
-->

<div class="fr-container fr-my-4w">
  <h2>Beneficiaires Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
    <br>Pipeline : <strong>gouv-query server-side</strong> → gouv-display
  </p>

  <gouv-query id="q" api-type="opendatasoft"
    dataset-id="industrie-du-futur"
    base-url="https://data.economie.gouv.fr"
    server-side page-size="6">
  </gouv-query>

  <gouv-display source="q" cols="3" pagination="6">
    <template>
      <div class="fr-card">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h3 class="fr-card__title">{{nom_departement}}</h3>
            <p class="fr-card__desc">
              Region : {{nom_region}}<br>
              Beneficiaires : {{nombre_beneficiaires}}
            </p>
          </div>
          <div class="fr-card__footer">
            <p class="fr-badge fr-badge--sm fr-badge--blue-ecume">
              Investissement : {{montant_investissement}} EUR
            </p>
          </div>
        </div>
      </div>
    </template>
  </gouv-display>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      <strong>Pagination serveur</strong> : <code>gouv-query server-side</code> ne charge qu'une page a la fois.
      Chaque clic sur la pagination declenche un nouvel appel API.
      Le template <code>&lt;template&gt;</code> est repete pour chaque element de la page.
    </p>
  </div>
</div>`,

  'query-display': `<!--
  Cartes DSFR — Communes de l'Ain (pagination serveur)
  Pipeline : gouv-query (server-side, Tabular) → gouv-display
  Source : Tabular API — Code officiel geographique (communes)
  Filtre server-side par departement, pagination serveur
-->

<div class="fr-container fr-my-4w">
  <h2>Communes — Departement de l'Ain</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Code officiel geographique (communes)
    <br>Pipeline : <strong>gouv-query server-side</strong> (Tabular, filter) → gouv-display
  </p>

  <gouv-query id="q" api-type="tabular"
    resource="8ef8bb8f-1507-4a3a-9942-c51f0c6a0b5d"
    filter="DEP:eq:01"
    server-side page-size="8">
  </gouv-query>

  <gouv-display source="q" cols="4" pagination="8">
    <template>
      <div class="fr-card fr-card--shadow">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h3 class="fr-card__title">{{LIBELLE}}</h3>
            <p class="fr-card__desc">
              Code commune : {{COM}}
            </p>
            <div class="fr-card__start">
              <p class="fr-badge fr-badge--sm fr-badge--green-emeraude">
                Dept. {{DEP}} — Region {{REG}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </gouv-display>
</div>`,

  'normalize-display': `<!--
  Tuiles DSFR — LOVAC logements vacants (donnees nettoyees)
  Pipeline : gouv-source → gouv-normalize → gouv-query → gouv-display (tuiles)
  Source : LOVAC - Logements vacants (tabular-api)
  Les donnees brutes sont nettoyees puis affichees sous forme de tuiles DSFR
-->

<div class="fr-container fr-my-4w">
  <h2>Top 9 departements — Logements vacants (2025)</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — LOVAC, logements vacants du parc prive
    <br>Pipeline : gouv-source → <strong>gouv-normalize</strong> → gouv-query → gouv-display
  </p>

  <gouv-source id="raw"
    url="https://tabular-api.data.gouv.fr/api/resources/42a34c0a-7c97-4463-b00e-5913ea5f7077/data/?page_size=101"
    transform="data">
  </gouv-source>

  <gouv-normalize id="clean" source="raw"
    trim
    numeric-auto
    rename="LIB_DEP:Departement | pp_vacant_25:Vacants | pp_total_24:Total logements | DEP:Code">
  </gouv-normalize>

  <gouv-query id="top" source="clean"
    order-by="Vacants:desc"
    limit="9">
  </gouv-query>

  <gouv-display source="top" cols="3">
    <template>
      <div class="fr-tile">
        <div class="fr-tile__body">
          <div class="fr-tile__content">
            <h3 class="fr-tile__title">{{Departement}}</h3>
            <p class="fr-tile__detail">Dept. {{Code}}</p>
            <p class="fr-tile__desc">
              {{Vacants}} logements vacants
              sur {{Total logements}} au total
            </p>
          </div>
        </div>
      </div>
    </template>
  </gouv-display>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      Les donnees LOVAC brutes ont des cles avec espaces et des nombres en texte.
      <code>gouv-normalize</code> nettoie tout avant l'affichage en tuiles DSFR
      via <code>gouv-display</code>.
    </p>
  </div>
</div>`,

  // =====================================================================
  // MODE RECHERCHE — gouv-source → gouv-normalize → gouv-search → composant
  // gouv-search affiche un champ de recherche DSFR et filtre les donnees
  // en amont. Se combine naturellement avec gouv-facets et gouv-display.
  // =====================================================================

  'search-datalist': `<!--
  Tableau filtrable — Rappels de produits avec recherche serveur
  Pipeline : gouv-query (server-side) → gouv-search (server-search) → gouv-datalist (server-tri)
  Source : OpenDataSoft — RappelConso
  Recherche full-text deleguee au serveur, tri et pagination serveur
-->

<div class="fr-container fr-my-4w">
  <h2>Recherche serveur — Rappels de produits</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — RappelConso
    <br>Pipeline : <strong>gouv-query server-side</strong> → gouv-search server-search → gouv-datalist server-tri
  </p>

  <gouv-query id="q" api-type="opendatasoft"
    dataset-id="rappelconso0"
    base-url="https://data.economie.gouv.fr"
    server-side page-size="20"
    order-by="date_de_publication:desc">
  </gouv-query>

  <gouv-search id="s" source="q"
    server-search
    placeholder="Rechercher un produit rappele..."
    min-length="2"
    count>
  </gouv-search>

  <gouv-datalist source="q"
    colonnes="noms_des_modeles_ou_references:Produit, categorie_de_produit:Categorie, nom_de_la_marque_du_produit:Marque, date_de_publication:Date"
    server-tri
    pagination="20">
  </gouv-datalist>
</div>`,

  'search-display': `<!--
  Cartes avec recherche serveur — Industrie du futur
  Pipeline : gouv-query (server-side) → gouv-search (server-search) → gouv-display
  Source : OpenDataSoft — Industrie du futur
  Recherche full-text deleguee au serveur, pagination serveur
-->

<div class="fr-container fr-my-4w">
  <h2>Recherche serveur — Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
    <br>Pipeline : <strong>gouv-query server-side</strong> → gouv-search server-search → gouv-display
  </p>

  <gouv-query id="q" api-type="opendatasoft"
    dataset-id="industrie-du-futur"
    base-url="https://data.economie.gouv.fr"
    server-side page-size="9">
  </gouv-query>

  <gouv-search id="s" source="q"
    server-search
    placeholder="Entreprise, region ou departement..."
    count>
  </gouv-search>

  <gouv-display source="q" cols="3" pagination="9">
    <template>
      <div class="fr-card">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h3 class="fr-card__title">{{nom_entreprise}}</h3>
            <p class="fr-card__desc">
              {{nom_departement}} — {{nom_region}}<br>
              Beneficiaires : {{nombre_beneficiaires}}
            </p>
          </div>
          <div class="fr-card__footer">
            <p class="fr-badge fr-badge--sm fr-badge--blue-ecume">
              {{montant_investissement}} EUR
            </p>
          </div>
        </div>
      </div>
    </template>
  </gouv-display>
</div>`,

  'search-facets-display': `<!--
  Recherche + facettes + cartes — Maires
  Pipeline : gouv-source → gouv-normalize → gouv-search → gouv-facets → gouv-display
  Source : Registre des maires (tabular-api)
  gouv-search reduit le jeu de donnees, gouv-facets affine, gouv-display affiche
-->

<div class="fr-container fr-my-4w">
  <h2>Recherche + facettes — Maires de France</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus (maires)
    <br>Pipeline : gouv-source → gouv-normalize → <strong>gouv-search</strong> → gouv-facets → gouv-display
  </p>

  <gouv-source id="raw"
    url="https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/?page_size=100"
    transform="data">
  </gouv-source>

  <gouv-normalize id="clean" source="raw"
    rename="Nom de l'élu:Nom | Prénom de l'élu:Prenom | Libellé du département:Departement | Libellé de la commune:Commune | Libellé de la catégorie socio-professionnelle:Categorie"
    trim>
  </gouv-normalize>

  <gouv-search id="searched" source="clean"
    fields="Nom, Prenom, Departement, Commune"
    placeholder="Rechercher un maire..."
    operator="words"
    count>
  </gouv-search>

  <gouv-facets id="filtered" source="searched"
    fields="Departement, Categorie"
    labels="Departement:Departement | Categorie:Categorie socio-pro"
    max-values="6">
  </gouv-facets>

  <gouv-display source="filtered" cols="3" pagination="9">
    <template>
      <div class="fr-card">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h3 class="fr-card__title">{{Prenom}} {{Nom}}</h3>
            <p class="fr-card__desc">{{Commune}}</p>
          </div>
          <div class="fr-card__footer">
            <p class="fr-badge fr-badge--sm fr-badge--blue-france">{{Departement}}</p>
          </div>
        </div>
      </div>
    </template>
  </gouv-display>
</div>`,

  'search-kpi-chart': `<!--
  Recherche + KPI + graphique — Industrie du futur
  Pipeline : gouv-source → gouv-normalize → gouv-search → gouv-kpi + gouv-query → gouv-dsfr-chart
  Source : Industrie du futur
  Les KPI et le graphique se recalculent en temps reel selon la recherche
-->

<div class="fr-container fr-my-4w">
  <h2>Recherche dynamique — Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Industrie du futur
    <br>Pipeline : gouv-source → gouv-normalize → <strong>gouv-search</strong> → KPI + graphique
  </p>

  <gouv-source id="raw"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-normalize id="clean" source="raw"
    numeric="montant_investissement, montant_participation_etat, nombre_beneficiaires"
    rename="nom_region:Region | nom_departement:Departement | nom_entreprise:Entreprise"
    trim>
  </gouv-normalize>

  <gouv-search id="searched" source="clean"
    fields="Entreprise, Region, Departement"
    placeholder="Entreprise, region, departement..."
    operator="words"
    count>
  </gouv-search>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
    <gouv-kpi source="searched"
      valeur="count"
      label="Projets"
      couleur="bleu">
    </gouv-kpi>

    <gouv-kpi source="searched"
      valeur="sum:montant_investissement"
      label="Investissement total"
      format="euro">
    </gouv-kpi>

    <gouv-kpi source="searched"
      valeur="sum:nombre_beneficiaires"
      label="Beneficiaires"
      format="nombre">
    </gouv-kpi>
  </div>

  <gouv-query id="stats" source="searched"
    group-by="Region"
    aggregate="nombre_beneficiaires:sum:Beneficiaires"
    order-by="Beneficiaires:desc"
    limit="10">
  </gouv-query>

  <gouv-dsfr-chart source="stats"
    type="bar"
    label-field="Region"
    value-field="Beneficiaires"
    selected-palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  'facets-map': `<!--
  Carte + KPI — Fiscalite locale filtree par region et departement
  Pipeline : gouv-source → gouv-normalize → gouv-facets → gouv-query → gouv-dsfr-chart (map) + gouv-kpi
  Source : Fiscalite locale des particuliers
  gouv-facets filtre par region, la carte et les KPI refletent les donnees filtrees
-->

<div class="fr-container fr-my-4w">
  <h2>Fiscalite locale — exploration par region</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Fiscalite locale des particuliers
    <br>Pipeline : gouv-source → gouv-normalize → <strong>gouv-facets</strong> → gouv-query → carte + KPI
  </p>

  <gouv-source id="raw"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-normalize id="clean" source="raw"
    numeric="taux_global_tfb, taux_global_th, mpoid"
    rename="libreg:Region | libdep:Departement | libcom:Commune"
    trim>
  </gouv-normalize>

  <!-- Facettes : filtrer par region -->
  <gouv-facets id="filtered" source="clean"
    fields="Region"
    disjunctive="Region"
    sort="alpha">
  </gouv-facets>

  <!-- KPI sur les donnees filtrees -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
    <gouv-kpi source="filtered"
      valeur="count"
      label="Communes"
      format="nombre">
    </gouv-kpi>

    <gouv-kpi source="filtered"
      valeur="avg:taux_global_tfb"
      label="Taux TFB moyen"
      format="pourcentage">
    </gouv-kpi>

    <gouv-kpi source="filtered"
      valeur="avg:taux_global_th"
      label="Taux TH moyen"
      format="pourcentage">
    </gouv-kpi>
  </div>

  <!-- Carte sur les donnees filtrees et agregees -->
  <gouv-query id="stats" source="filtered"
    group-by="dep"
    aggregate="taux_global_tfb:avg:taux">
  </gouv-query>

  <gouv-dsfr-chart source="stats"
    type="map"
    code-field="dep"
    value-field="taux"
    selected-palette="sequentialAscending">
  </gouv-dsfr-chart>
</div>`,

  // ────────────────────────────────────────────────────────────────────
  // Server-side mode
  // ────────────────────────────────────────────────────────────────────

  'server-side-ods': `<!--
  Server-side ODS — Recherche + pagination serveur
  Mode: gouv-query (server-side) -> gouv-search (server-search) -> gouv-display
  Source: OpenDataSoft - RappelConso (rappels de produits)
-->

<div class="fr-container fr-my-4w">
  <h2>Recherche serveur — Rappels de produits</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Mode server-side avec recherche full-text ODS
  </p>

  <gouv-query id="q" api-type="opendatasoft"
    dataset-id="rappelconso0"
    base-url="https://data.economie.gouv.fr"
    server-side page-size="10"
    order-by="date_de_publication:desc">
  </gouv-query>

  <gouv-search id="s" source="q"
    server-search
    placeholder="Rechercher un produit..."
    url-search-param="q" url-sync
    count>
  </gouv-search>

  <gouv-display source="q" cols="1" pagination="10"
    url-sync url-page-param="page">
    <template>
      <div class="fr-card fr-card--horizontal fr-card--sm fr-mb-2w">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h3 class="fr-card__title">{{noms_des_modeles_ou_references}}</h3>
            <p class="fr-card__desc">
              <strong>{{categorie_de_produit}}</strong> — {{nom_de_la_marque_du_produit}}<br>
              Publie le {{date_de_publication}}
            </p>
          </div>
        </div>
      </div>
    </template>
  </gouv-display>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      <strong>Mode server-side</strong> : gouv-query server-side ne charge qu'une page a la fois.
      La recherche est deleguee au serveur via <code>gouv-search server-search</code>.
      La pagination est geree par <code>gouv-display</code> via les metadonnees server.
    </p>
  </div>
</div>`,

  'server-side-tabular-tri': `<!--
  Server-side Tabular — Tri serveur
  Mode: gouv-query (server-side tabular) -> gouv-datalist (server-tri)
  Source: Tabular API data.gouv.fr - Base Sirene (etablissements)
-->

<div class="fr-container fr-my-4w">
  <h2>Tri serveur — Communes</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Mode server-side avec tri par colonne
  </p>

  <gouv-query id="q" api-type="tabular"
    resource="8ef8bb8f-1507-4a3a-9942-c51f0c6a0b5d"
    server-side page-size="20">
  </gouv-query>

  <gouv-datalist source="q"
    colonnes="COM:Code commune, LIBELLE:Commune, DEP:Departement, REG:Region"
    server-tri
    pagination="20"
    url-sync>
  </gouv-datalist>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      <strong>Mode server-side + tri</strong> : gouv-query server-side charge une page,
      <code>gouv-datalist server-tri</code> delegue le tri au serveur.
      Chaque clic sur un en-tete de colonne declenche un re-fetch avec le bon \`orderBy\`.
    </p>
  </div>
</div>`,

  'server-facets-display': `<!--
  Server-facets ODS — Recherche + facettes + cartes
  Mode: gouv-query (server-side ODS) + gouv-search (server-search) + gouv-facets (server-facets) -> gouv-display
  Source: OpenDataSoft - Industrie du futur (data.economie.gouv.fr)
-->

<div class="fr-container fr-my-4w">
  <h2>Facettes serveur ODS — Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Facettes dynamiques + recherche full-text, pagination serveur
  </p>

  <gouv-query id="q" server-side page-size="12"
    api-type="opendatasoft"
    dataset-id="industrie-du-futur"
    base-url="https://data.economie.gouv.fr">
  </gouv-query>

  <gouv-search source="q" server-search
    placeholder="Rechercher une entreprise..."
    count>
  </gouv-search>

  <gouv-facets id="filtered" source="q"
    server-facets
    fields="nom_region,type_aide"
    labels="nom_region:Region | type_aide:Type d'aide"
    max-values="8">
  </gouv-facets>

  <gouv-display source="filtered" cols="3" pagination="12">
    <template>
      <div class="fr-card fr-card--shadow">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h3 class="fr-card__title">{{nom_entreprise}}</h3>
            <p class="fr-card__desc">{{nom_departement}} — {{nom_region}}</p>
            <div class="fr-card__start">
              <p class="fr-badge fr-badge--sm fr-badge--green-emeraude">{{type_aide}}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </gouv-display>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      <strong>Facettes serveur ODS</strong> : <code>gouv-facets server-facets</code> fetche les valeurs
      de facettes depuis l'API ODS <code>/facets</code>. Les compteurs se mettent a jour dynamiquement
      selon la recherche et les selections cross-facet. Chaque selection declenche un re-fetch serveur.
    </p>
  </div>
</div>`,

};
