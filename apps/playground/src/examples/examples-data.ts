/**
 * Playground examples data
 *
 * 20 exemples organises en 2 modes de construction x 10 types de visualisation.
 *
 * Mode direct  : gouv-source → composant (gouv-dsfr-chart / gouv-kpi / gouv-datalist)
 * Mode requete : gouv-source → gouv-query → composant
 *
 * Sources de donnees alternees :
 *  - API 1 : Fiscalite locale des particuliers (data.economie.gouv.fr)
 *  - API 2 : Registre des elus municipaux (tabular-api.data.gouv.fr)
 *  - API 3 : Industrie du futur (data.economie.gouv.fr)
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
  Tableau — Registre des elus municipaux
  Mode direct : gouv-source → gouv-datalist
  Source : Registre des elus municipaux (tabular-api)
  Affiche un tableau avec recherche, filtres, tri et export
-->

<div class="fr-container fr-my-4w">
  <h2>Registre des elus municipaux</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/a595be27-cfab-4810-b9d4-22e193bffe35/data/?__pageSize=50"
    transform="data">
  </gouv-source>

  <gouv-datalist source="data"
    colonnes="Nom de l'elu:Nom, Prenom de l'elu:Prenom, Libelle de la fonction:Fonction, Libelle du departement:Departement, Libelle de la categorie socio-professionnelle:Categorie"
    recherche="true"
    filtres="Libelle du departement"
    tri="Nom de l'elu:asc"
    pagination="10"
    export="csv">
  </gouv-datalist>
</div>`,

  // =====================================================================
  // MODE AVEC REQUETE — gouv-source → gouv-query → composant
  // Les donnees passent par gouv-query qui les filtre, regroupe
  // et/ou agrege avant de les transmettre au composant de visualisation.
  // =====================================================================

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
  Camembert — Elus par categorie socio-professionnelle
  Mode requete : gouv-source → gouv-query → gouv-dsfr-chart (pie)
  Source : Registre des elus municipaux (tabular-api)
  gouv-query regroupe par categorie et compte le nombre d'elus
-->

<div class="fr-container fr-my-4w">
  <h2>Elus par categorie socio-professionnelle</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/a595be27-cfab-4810-b9d4-22e193bffe35/data/?__pageSize=100"
    transform="data">
  </gouv-source>

  <gouv-query id="q-pie" source="data"
    group-by="Libelle de la categorie socio-professionnelle"
    aggregate="Code sexe:count:nombre"
    order-by="nombre:desc"
    limit="8">
  </gouv-query>

  <div style="max-width: 500px; margin: 0 auto;">
    <gouv-dsfr-chart source="q-pie"
      type="pie"
      label-field="Libelle de la categorie socio-professionnelle"
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
  KPI — Statistiques des elus avec filtre
  Mode requete : gouv-source → gouv-query (filtre) → gouv-kpi
  Source : Registre des elus municipaux (tabular-api)
  Combine des KPI sur les donnees brutes et sur un sous-ensemble filtre
-->

<div class="fr-container fr-my-4w">
  <h2>Statistiques des elus municipaux</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/a595be27-cfab-4810-b9d4-22e193bffe35/data/?__pageSize=100"
    transform="data">
  </gouv-source>

  <!-- Filtre : uniquement les Maires -->
  <gouv-query id="q-maires" source="data"
    filter="Libelle de la fonction:contains:Maire">
  </gouv-query>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
    <gouv-kpi source="data"
      valeur="count"
      label="Total des elus"
      format="nombre">
    </gouv-kpi>

    <gouv-kpi source="q-maires"
      valeur="count"
      label="Dont Maires"
      format="nombre"
      couleur="bleu">
    </gouv-kpi>
  </div>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__text">
      Le filtre <code>Libelle de la fonction:contains:Maire</code>
      isole un sous-ensemble, chaque KPI souscrit a sa propre source.
    </p>
  </div>
</div>`,

  'query-datalist': `<!--
  Tableau — Elus filtres par region
  Mode requete : gouv-source → gouv-query (filtre) → gouv-datalist
  Source : Registre des elus municipaux (tabular-api)
  gouv-query filtre les elus d'une region specifique
-->

<div class="fr-container fr-my-4w">
  <h2>Elus municipaux — Ile-de-France</h2>
  <p class="fr-text--sm fr-text--light">
    Source : tabular-api.data.gouv.fr — Repertoire national des elus
  </p>

  <gouv-source id="data"
    url="https://tabular-api.data.gouv.fr/api/resources/a595be27-cfab-4810-b9d4-22e193bffe35/data/?__pageSize=100"
    transform="data">
  </gouv-source>

  <gouv-query id="q-datalist" source="data"
    filter="Libelle de la region:contains:Ile">
  </gouv-query>

  <gouv-datalist source="q-datalist"
    colonnes="Nom de l'elu:Nom, Prenom de l'elu:Prenom, Libelle de la fonction:Fonction, Libelle du departement:Departement"
    recherche="true"
    tri="Nom de l'elu:asc"
    pagination="10"
    export="csv">
  </gouv-datalist>
</div>`,

};
