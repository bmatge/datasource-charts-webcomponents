/**
 * Playground examples data
 *
 * Each entry is a template literal string containing HTML + JS code
 * that can be loaded into the playground editor.
 *
 * Les exemples gouv-widgets utilisent le dataset "industrie-du-futur"
 * de data.economie.gouv.fr, en coherence avec la documentation utilisateur
 * (docs/guide.html > Integration rapide).
 */
export const examples: Record<string, string> = {

  // ---------------------------------------------------------
  // COMPOSANTS gouv-widgets
  // Exemples alignes avec la documentation utilisateur
  // ---------------------------------------------------------

  'gouv-bar': `<!--
  EXEMPLE : Source + Query + Graphique en barres

  Charge les donnees depuis l'API OpenDataSoft (industrie-du-futur),
  les regroupe par region avec une somme des beneficiaires,
  et affiche un graphique en barres conforme DSFR.

  C'est l'exemple de reference de la documentation
  (Guide > Integration rapide).
-->

<div class="fr-container fr-my-4w">
  <h2>Beneficiaires Industrie du futur par region</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Dataset industrie-du-futur
  </p>

  <!-- Source de donnees -->
  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <!-- Filtrage et agregation -->
  <gouv-query id="query-result" source="data"
    group-by="nom_region"
    aggregate="nombre_beneficiaires:sum"
    order-by="value:desc"
    limit="10">
  </gouv-query>

  <!-- Graphique DSFR -->
  <gouv-dsfr-chart source="query-result"
    type="bar"
    label-field="nom_region"
    value-field="nombre_beneficiaires"
    title="Beneficiaires par region"
    palette="categorical">
  </gouv-dsfr-chart>
</div>`,

  'gouv-pie': `<!--
  EXEMPLE : Source + Query + Camembert

  Meme source de donnees que l'exemple en barres,
  affichee en graphique circulaire.
-->

<div class="fr-container fr-my-4w">
  <h2>Repartition des beneficiaires par region</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Dataset industrie-du-futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="query-result" source="data"
    group-by="nom_region"
    aggregate="nombre_beneficiaires:sum"
    order-by="value:desc"
    limit="8">
  </gouv-query>

  <div style="max-width: 500px; margin: 0 auto;">
    <gouv-dsfr-chart source="query-result"
      type="pie"
      label-field="nom_region"
      value-field="nombre_beneficiaires"
      title="Repartition par region"
      palette="categorical">
    </gouv-dsfr-chart>
  </div>
</div>`,

  'gouv-line': `<!--
  EXEMPLE : Source + Query + Graphique en lignes

  Meme source de donnees, affichee en courbe.
-->

<div class="fr-container fr-my-4w">
  <h2>Beneficiaires par region (courbe)</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Dataset industrie-du-futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="query-result" source="data"
    group-by="nom_region"
    aggregate="nombre_beneficiaires:sum"
    order-by="value:desc">
  </gouv-query>

  <gouv-dsfr-chart source="query-result"
    type="line"
    label-field="nom_region"
    value-field="nombre_beneficiaires"
    title="Beneficiaires par region"
    palette="default">
  </gouv-dsfr-chart>
</div>`,

  'gouv-kpi': `<!--
  EXEMPLE : Indicateurs cles (KPI)

  Affiche des chiffres cles calcules depuis l'API :
  somme, moyenne, maximum, comptage.
-->

<div class="fr-container fr-my-4w">
  <h2>Indicateurs cles — Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Dataset industrie-du-futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
    <gouv-kpi
      source="data"
      valeur="sum:nombre_beneficiaires"
      label="Total beneficiaires"
      format="nombre">
    </gouv-kpi>

    <gouv-kpi
      source="data"
      valeur="avg:nombre_beneficiaires"
      label="Moyenne"
      format="nombre">
    </gouv-kpi>

    <gouv-kpi
      source="data"
      valeur="max:nombre_beneficiaires"
      label="Maximum"
      couleur="vert">
    </gouv-kpi>

    <gouv-kpi
      source="data"
      valeur="count"
      label="Enregistrements"
      format="nombre">
    </gouv-kpi>
  </div>

  <div class="fr-callout fr-mt-4w">
    <p class="fr-callout__title">Expressions de calcul</p>
    <ul>
      <li><code>champ</code> — Valeur directe</li>
      <li><code>avg:champ</code> — Moyenne</li>
      <li><code>sum:champ</code> — Somme</li>
      <li><code>min:champ</code> / <code>max:champ</code> — Min/Max</li>
      <li><code>count</code> — Comptage total</li>
      <li><code>count:champ:valeur</code> — Comptage conditionnel</li>
    </ul>
  </div>
</div>`,

  'gouv-datalist': `<!--
  EXEMPLE : Tableau de donnees

  Affiche les donnees brutes dans un tableau avec
  recherche, filtres, tri et export CSV.
-->

<div class="fr-container fr-my-4w">
  <h2>Donnees Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Dataset industrie-du-futur
  </p>

  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-datalist
    source="data"
    colonnes="nom_region:Region, nombre_beneficiaires:Beneficiaires"
    recherche="true"
    filtres="nom_region"
    tri="nombre_beneficiaires:desc"
    pagination="10"
    export="csv">
  </gouv-datalist>
</div>`,

  'gouv-dashboard': `<!--
  EXEMPLE : Dashboard complet

  Combine KPIs, graphiques (barres + camembert) et tableau
  dans un tableau de bord unifie.
-->

<div class="fr-container fr-my-4w">
  <h2>Tableau de bord — Industrie du futur</h2>
  <p class="fr-text--sm fr-text--light">
    Source : data.economie.gouv.fr — Dataset industrie-du-futur
  </p>

  <!-- Source de donnees partagee -->
  <gouv-source id="data"
    url="https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=100"
    transform="results">
  </gouv-source>

  <gouv-query id="query-result" source="data"
    group-by="nom_region"
    aggregate="nombre_beneficiaires:sum"
    order-by="value:desc"
    limit="10">
  </gouv-query>

  <!-- KPIs -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
    <gouv-kpi source="data" valeur="sum:nombre_beneficiaires" label="Total beneficiaires" format="nombre"></gouv-kpi>
    <gouv-kpi source="data" valeur="avg:nombre_beneficiaires" label="Moyenne" format="nombre"></gouv-kpi>
    <gouv-kpi source="data" valeur="count" label="Enregistrements" format="nombre"></gouv-kpi>
  </div>

  <!-- Graphiques -->
  <div class="fr-grid-row fr-grid-row--gutters" style="margin-bottom: 2rem;">
    <div class="fr-col-12 fr-col-md-6">
      <h3>Par region (barres)</h3>
      <gouv-dsfr-chart source="query-result"
        type="bar"
        label-field="nom_region"
        value-field="nombre_beneficiaires"
        title="Beneficiaires par region"
        palette="categorical">
      </gouv-dsfr-chart>
    </div>
    <div class="fr-col-12 fr-col-md-6">
      <h3>Repartition (camembert)</h3>
      <gouv-dsfr-chart source="query-result"
        type="pie"
        label-field="nom_region"
        value-field="nombre_beneficiaires"
        title="Repartition par region"
        palette="categorical">
      </gouv-dsfr-chart>
    </div>
  </div>

  <!-- Tableau -->
  <h3>Detail des donnees</h3>
  <gouv-datalist
    source="data"
    colonnes="nom_region:Region, nombre_beneficiaires:Beneficiaires"
    recherche="true"
    filtres="nom_region"
    tri="nombre_beneficiaires:desc"
    pagination="10"
    export="csv">
  </gouv-datalist>
</div>`,

  // ---------------------------------------------------------
  // DSFR CHART NATIFS
  // Format officiel avec x="[[...]]" et y="[[...]]"
  // ---------------------------------------------------------
  'dsfr-bar': `<!--
  EXEMPLE : DSFR Bar Chart (natif)

  Utilise le composant officiel bar-chart de @gouvfr/dsfr-chart
  Les donnees sont au format JSON stringifie : x="[[...]]" y="[[...]]"
-->

<div class="fr-container fr-my-4w">
  <h2>Score RGAA par ministere</h2>
  <p class="fr-text--sm fr-text--light">Conformite accessibilite en pourcentage</p>

  <!-- Bar chart vertical -->
  <bar-chart
    x='[["Economie", "Education", "Interieur", "Sante", "Culture"]]'
    y="[[87, 92, 78, 85, 91]]"
    name='["Score RGAA"]'
    selected-palette="categorical"
    unit-tooltip="%">
  </bar-chart>

  <h3 class="fr-mt-4w">Barres horizontales</h3>
  <bar-chart
    x='[["Economie", "Education", "Interieur", "Sante", "Culture"]]'
    y="[[87, 92, 78, 85, 91]]"
    name='["Score RGAA"]'
    selected-palette="sequentialAscending"
    horizontal="true"
    unit-tooltip="%">
  </bar-chart>
</div>`,

  'dsfr-line': `<!--
  EXEMPLE : DSFR Line Chart (natif)

  Graphique en ligne avec evolution temporelle
-->

<div class="fr-container fr-my-4w">
  <h2>Evolution du score RGAA</h2>
  <p class="fr-text--sm fr-text--light">Progression sur 4 ans</p>

  <line-chart
    x='[["2021", "2022", "2023", "2024"]]'
    y="[[65, 72, 78, 85]]"
    name='["Score RGAA"]'
    selected-palette="default"
    unit-tooltip="%">
  </line-chart>

  <h3 class="fr-mt-4w">Plusieurs series</h3>
  <line-chart
    x='[["2021", "2022", "2023", "2024"], ["2021", "2022", "2023", "2024"]]'
    y="[[65, 72, 78, 85], [70, 75, 82, 91]]"
    name='["RGAA", "DSFR"]'
    selected-palette="categorical"
    unit-tooltip="%">
  </line-chart>
</div>`,

  'dsfr-pie': `<!--
  EXEMPLE : DSFR Pie Chart (natif)

  Diagramme circulaire / camembert
-->

<div class="fr-container fr-my-4w">
  <h2>Repartition par statut</h2>

  <div style="max-width: 400px; margin: 0 auto;">
    <pie-chart
      x='[["Actifs", "Inactifs", "En maintenance"]]'
      y="[[75, 15, 10]]"
      selected-palette="categorical"
      unit-tooltip="%">
    </pie-chart>
  </div>

  <h3 class="fr-mt-4w">Variante donut (fill=false par defaut)</h3>
  <div style="max-width: 400px; margin: 0 auto;">
    <pie-chart
      x='[["Conformes", "Partiels", "Non conformes"]]'
      y="[[60, 30, 10]]"
      selected-palette="sequentialDescending"
      unit-tooltip="%">
    </pie-chart>
  </div>
</div>`,

  'dsfr-gauge': `<!--
  EXEMPLE : DSFR Gauge Chart (natif)

  ATTENTION : Utiliser percent/init/target, PAS value !
-->

<div class="fr-container fr-my-4w">
  <h2>Jauges de conformite</h2>
  <p class="fr-text--sm fr-text--light">Progression vers l'objectif 100%</p>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
    <div>
      <p><strong>Score RGAA</strong></p>
      <!-- percent = valeur actuelle, init = minimum, target = maximum -->
      <gauge-chart percent="82" init="0" target="100"></gauge-chart>
    </div>
    <div>
      <p><strong>Score DSFR</strong></p>
      <gauge-chart percent="91" init="0" target="100"></gauge-chart>
    </div>
    <div>
      <p><strong>Performance</strong></p>
      <gauge-chart percent="65" init="0" target="100"></gauge-chart>
    </div>
  </div>

  <div class="fr-callout fr-callout--brown-caramel fr-mt-4w">
    <p class="fr-callout__text">
      <strong>Important :</strong> Ne pas utiliser l'attribut <code>value</code>.
      Utiliser <code>percent</code> + <code>init</code> + <code>target</code>.
    </p>
  </div>
</div>`,

  'dsfr-radar': `<!--
  EXEMPLE : DSFR Radar Chart (natif)

  Graphique radar pour comparaisons multi-criteres
-->

<div class="fr-container fr-my-4w">
  <h2>Profil de conformite</h2>
  <p class="fr-text--sm fr-text--light">Evaluation multi-criteres</p>

  <div style="max-width: 500px; margin: 0 auto;">
    <radar-chart
      x='[["RGAA", "DSFR", "Performance", "SEO", "Securite"]]'
      y="[[85, 90, 75, 80, 95]]"
      name='["Site principal"]'
      selected-palette="default">
    </radar-chart>
  </div>

  <h3 class="fr-mt-4w">Comparaison de plusieurs sites</h3>
  <div style="max-width: 500px; margin: 0 auto;">
    <radar-chart
      x='[["RGAA", "DSFR", "Performance", "SEO", "Securite"], ["RGAA", "DSFR", "Performance", "SEO", "Securite"]]'
      y="[[85, 90, 75, 80, 95], [70, 85, 90, 75, 80]]"
      name='["Site A", "Site B"]'
      selected-palette="categorical">
    </radar-chart>
  </div>
</div>`,

  'dsfr-map': `<!--
  EXEMPLE : DSFR Map Chart (natif)

  Carte de France avec donnees par departement
  Utilise le composant map-chart de @gouvfr/dsfr-chart
-->

<div class="fr-container fr-my-4w">
  <h2>Taux de conformite RGAA par departement</h2>
  <p class="fr-text--sm fr-text--light">Donnees fictives pour demonstration</p>

  <map-chart
    data='{"01": 85, "02": 72, "03": 91, "04": 65, "05": 78, "06": 88, "07": 70, "08": 83, "09": 67, "10": 75, "11": 82, "12": 89, "13": 94, "14": 71, "15": 68, "16": 77, "17": 86, "18": 73, "19": 80, "21": 92, "22": 69, "23": 64, "24": 76, "25": 81, "26": 87, "27": 74, "28": 79, "29": 90, "30": 84, "31": 93, "32": 66, "33": 95, "34": 88, "35": 82, "36": 71, "37": 85, "38": 91, "39": 69, "40": 77, "41": 73, "42": 86, "43": 68, "44": 92, "45": 80, "46": 65, "47": 74, "48": 62, "49": 83, "50": 70, "51": 78, "52": 67, "53": 75, "54": 84, "55": 66, "56": 81, "57": 87, "58": 72, "59": 96, "60": 79, "61": 71, "62": 85, "63": 88, "64": 76, "65": 69, "66": 82, "67": 93, "68": 90, "69": 97, "70": 68, "71": 77, "72": 74, "73": 86, "74": 91, "75": 98, "76": 83, "77": 80, "78": 89, "79": 73, "80": 76, "81": 70, "82": 67, "83": 84, "84": 78, "85": 81, "86": 75, "87": 72, "88": 69, "89": 79, "90": 66, "91": 87, "92": 94, "93": 85, "94": 88, "95": 82, "2A": 71, "2B": 68}'
    name="Score RGAA"
    date="2024-01-15"
    value-nat="79"
    selected-palette="sequentialAscending">
  </map-chart>

  <div class="fr-callout fr-callout--blue-ecume fr-mt-4w">
    <p class="fr-callout__text">
      <strong>Format des donnees :</strong> L'attribut <code>data</code> attend un objet JSON
      ou les cles sont les codes departement (ex: "75", "2A") et les valeurs les donnees a afficher.
    </p>
  </div>
</div>`,
};
