# EPIC : Micro-features et ameliorations UX

> Audit produit du 7 fevrier 2026 — gouv-widgets monorepo
> Focus : micro-features, stabilite, parcours utilisateur
> Hors perimetre : grosses features (auth, collab, real-time sync)

---

## Vue d'ensemble

654 tests, 6 apps TypeScript, build stable. Le socle technique est solide.
Cet EPIC liste les **ameliorations a fort impact utilisateur et faible effort** identifiees par un audit complet de chaque app, du parcours inter-apps, des composants web et de l'infrastructure.

**Legende effort :** XS (< 1h) | S (1-3h) | M (3-8h) | L (1-2j)

---

## Phase 1 — Fiabilite et feedback utilisateur

> *Use case : "Je fais une action et je ne sais pas si ca a marche"*

### 1.1 Timeouts sur tous les appels API [S]
**Probleme :** Aucun `AbortController` sur les fetch. Si une API ne repond pas, l'app freeze sans feedback.
**Fichiers :** `apps/builder/src/sources.ts:259`, `apps/builder-ia/src/chat.ts:195`, `apps/sources/src/grist-explorer.ts`, `apps/sources/src/api-explorer.ts`
**Solution :** Wrapper fetch avec timeout 10s dans `packages/shared` + message "La requete a expire, verifiez la connexion."

### 1.2 Retry sur erreur API [S]
**Probleme :** Un appel echoue → message d'erreur, l'utilisateur doit tout refaire.
**Fichiers :** `apps/builder-ia/src/chat.ts:143-150`, `apps/builder/src/sources.ts:284`
**Solution :** Bouton "Reessayer" dans le message d'erreur. Pour builder-ia, re-envoyer le dernier prompt.

### 1.3 Differencier les types d'erreur [S]
**Probleme :** "Erreur de communication" que ce soit un 401, un 429, un CORS ou un timeout.
**Fichiers :** `apps/builder/src/sources.ts:262`, `apps/builder-ia/src/chat.ts:210`
**Solution :** Mapper les codes HTTP vers des messages explicites :
- 401/403 → "Cle API invalide ou expiree"
- 429 → "Trop de requetes, reessayez dans quelques secondes"
- 0/TypeError → "Impossible de joindre le serveur (reseau ou CORS)"

### 1.4 Toast apres export HTML (dashboard) [XS]
**Probleme :** `exportHTML()` declenche le telechargement sans aucun feedback.
**Fichier :** `apps/dashboard/src/dashboards.ts:87-96`
**Solution :** `toastSuccess('Fichier HTML telecharge')` apres le click.

### 1.5 Validation des champs IA avant rendu [S]
**Probleme :** Si l'IA hallucine un nom de champ (ex: "region" au lieu de "nom"), le graphique est vide sans message.
**Fichier :** `apps/builder-ia/src/chart-renderer.ts:32-128`
**Solution :** Verifier que `labelField` et `valueField` existent dans les donnees. Sinon toast "Le champ 'region' n'existe pas dans les donnees. Champs disponibles : nom, population..."

### 1.6 Gestion quota localStorage [S]
**Probleme :** Aucune verification d'espace. 50 dashboards avec 10 widgets = ~5MB. Au-dela, `saveToStorage` echoue silencieusement.
**Fichier :** `packages/shared/src/storage/local-storage.ts`
**Solution :** Catch `QuotaExceededError` dans `saveToStorage()` → `toastError('Espace de stockage plein. Supprimez des elements pour continuer.')`.

---

## Phase 2 — Parcours inter-apps

> *Use case : "Je navigue entre les apps et je perds le fil / mes donnees"*

### 2.1 Indicateur visuel de la page active [XS]
**Probleme :** Le header affiche les liens mais aucun n'est visuellement actif. `aria-current="page"` est pose mais pas style.
**Fichier :** `src/components/layout/app-header.ts:102-110`
**Solution :** Ajouter `font-weight: bold` + `border-bottom` sur `[aria-current="page"]` via le style du composant.

### 2.2 Badge compteur sur le bouton Favoris [S]
**Probleme :** Le bouton "Favoris" du header ne dit pas si j'ai des favoris ni combien.
**Fichier :** `src/components/layout/app-header.ts:78-82`
**Solution :** Lire `STORAGE_KEYS.FAVORITES` au render, afficher un badge DSFR `<span class="fr-badge">3</span>` a cote du label.

### 2.3 Lien "Retour" contextuel [S]
**Probleme :** Quand on arrive dans le playground depuis le builder (param `from=builder`), pas de lien retour explicite.
**Fichiers :** `apps/playground/src/main.ts`, `apps/favorites/src/main.ts`
**Solution :** Si `URLSearchParams` contient `from`, afficher un bandeau "← Retour au Builder" en haut de page.

### 2.4 Sauvegarde automatique du brouillon builder [M]
**Probleme :** Un refresh accidentel = perte totale de la configuration en cours.
**Fichier :** `apps/builder/src/state.ts`
**Solution :** `debounce` de 2s qui sauvegarde l'etat dans `sessionStorage`. Au chargement, proposer "Reprendre la session precedente ?" si un brouillon existe.

### 2.5 Tuile Favoris sur le hub [XS]
**Probleme :** Le hub (index.html) a 6 tuiles mais pas de tuile Favoris. L'utilisateur doit utiliser le header.
**Fichier :** `index.html:166-268`
**Solution :** Ajouter une 7e tuile "Mes favoris" avec l'icone `ri-star-line`.

### 2.6 Deep link dashboard → builder [S]
**Probleme :** Depuis le dashboard, impossible d'ouvrir un widget chart dans le builder pour l'editer.
**Fichiers :** `apps/dashboard/src/widgets.ts`, `apps/builder/src/sources.ts`
**Solution :** Sur les widgets "chart from favorite", ajouter un bouton "Editer dans le Builder" qui passe le `builderState` via sessionStorage.

---

## Phase 3 — Micro-features apps

> *Use case : "Je fais une tache repetitive qui pourrait etre simplifiee"*

### 3.1 Copier le code avec feedback toast [XS]
**Probleme :** Le bouton "Copier" change de texte 2s mais c'est subtil. Pas de toast.
**Fichiers :** `apps/builder/src/ui-helpers.ts:111-124`, `apps/playground/src/main.ts`
**Solution :** Ajouter `toastSuccess('Code copie dans le presse-papiers')` en complement du changement de texte.

### 3.2 Renommer un favori [S]
**Probleme :** Impossible de renommer un favori sans le supprimer et le re-sauvegarder.
**Fichier :** `apps/favorites/src/main.ts`
**Solution :** Double-clic ou bouton "Renommer" sur le nom → input inline editable → save.

### 3.3 Recherche dans les favoris [S]
**Probleme :** Avec 20+ favoris, impossible de retrouver un graphique rapidement.
**Fichier :** `apps/favorites/src/main.ts:14-44`
**Solution :** Input de recherche au-dessus de la liste, filtrage en temps reel sur le nom.

### 3.4 Dupliquer un widget dashboard [XS]
**Probleme :** Pour creer un widget similaire, il faut tout reconfigurer de zero.
**Fichier :** `apps/dashboard/src/widgets.ts:79-86`
**Solution :** Bouton "Dupliquer" (icone `ri-file-copy-line`) dans les actions du widget. Clone le widget avec un nouvel ID dans la prochaine cellule vide.

### 3.5 Templates de dashboard pre-configures [M]
**Probleme :** L'utilisateur part toujours d'un dashboard vide.
**Fichier :** `apps/dashboard/src/main.ts`
**Solution :** Bouton "Templates" dans la toolbar. 3-4 templates : "3 KPIs + 1 graphique", "2 graphiques cote a cote", "Dashboard complet (4 widgets)". Applique un layout pre-rempli avec des widgets placeholder.

### 3.6 Historique de conversation builder-ia [S]
**Probleme :** Refresh = perte de toute la conversation avec l'IA.
**Fichier :** `apps/builder-ia/src/state.ts:62`
**Solution :** Sauvegarder `state.messages` dans `sessionStorage` a chaque message. Restaurer au chargement. Bouton "Effacer la conversation".

### 3.7 Raccourci clavier Ctrl+S dans le playground [XS]
**Probleme :** Seul Ctrl+Enter (run) existe. Pas de Ctrl+S (sauvegarder en favori).
**Fichier :** `apps/playground/src/main.ts:92-97`
**Solution :** Ajouter `Ctrl+S` → sauvegarde en favori (avec modal nom).

### 3.8 Tri des favoris [S]
**Probleme :** Les favoris sont affiches dans l'ordre de creation, pas de tri possible.
**Fichier :** `apps/favorites/src/main.ts`
**Solution :** Select DSFR "Trier par" : Date (recent), Date (ancien), Nom (A-Z), Type.

### 3.9 Exporter les favoris en JSON [S]
**Probleme :** Impossible de sauvegarder/partager ses favoris hors du navigateur.
**Fichier :** `apps/favorites/src/main.ts`
**Solution :** Bouton "Exporter tout" → download JSON. Bouton "Importer" → input file → merge avec les favoris existants.

### 3.10 Previsualisation avant chargement d'un exemple playground [XS]
**Probleme :** Cliquer sur un exemple ecrase le code actuel sans prevenir.
**Fichier :** `apps/playground/src/main.ts:21-26`
**Solution :** Si l'editeur n'est pas vide, `confirm('Remplacer le code actuel par cet exemple ?')`.

---

## Phase 4 — Composants web

> *Use case : "Le graphique ne rend pas bien / manque d'info"*

### 4.1 Message utilisateur si Chart.js absent [XS]
**Probleme :** Si le CDN Chart.js ne charge pas, `gouv-chart` affiche un conteneur vide. Seul `console.error` est appele.
**Fichier :** `src/components/gouv-chart.ts:145-148`
**Solution :** Afficher dans le composant : "Erreur : la bibliotheque Chart.js n'a pas pu etre chargee."

### 4.2 Standardiser les etats vides [S]
**Probleme :** `gouv-chart` retourne silencieusement si 0 labels. `gouv-datalist` affiche "Aucune donnee". `gouv-dsfr-chart` affiche icone + message. 3 patterns differents.
**Fichiers :** `src/components/gouv-chart.ts:153`, `src/components/gouv-datalist.ts:338`, `src/components/gouv-dsfr-chart.ts:283`
**Solution :** Creer un helper `renderEmptyState(message)` dans shared qui retourne un template HTML standard (icone + message + suggestion).

### 4.3 Hauteur responsive des charts [S]
**Probleme :** `gouv-chart` a une hauteur fixe de 350px. Sur mobile c'est trop grand, sur desktop c'est parfois trop petit.
**Fichier :** `src/components/gouv-chart.ts:87-88`
**Solution :** Attribut `height="auto"` qui utilise le ratio 16:9 du conteneur parent. Garder 350px comme fallback.

### 4.4 Export image pour les graphiques [M]
**Probleme :** Aucun moyen de telecharger un graphique en PNG pour une presentation.
**Fichier :** `src/components/gouv-chart.ts`
**Solution :** Bouton discret "Telecharger" (icone `ri-download-line`) sous le graphique. Utilise `canvas.toDataURL('image/png')` → download.

### 4.5 Page demo manquante pour gouv-chart [S]
**Probleme :** Tous les composants ont une page demo sauf `gouv-chart` (le wrapper Chart.js).
**Fichier :** `demo/` — manque `components/gouv-chart.html`
**Solution :** Creer une page demo avec 4-5 exemples (bar, line, pie, radar, avec source dynamique).

---

## Phase 5 — Qualite et accessibilite

> *Use case : "J'utilise un lecteur d'ecran ou je navigue au clavier"*

### 5.1 Skip link dans le header [XS]
**Probleme :** Pas de lien "Aller au contenu" pour les utilisateurs clavier.
**Fichier :** `src/components/layout/app-header.ts`
**Solution :** Ajouter `<a class="fr-skiplinks" href="#main-content">Contenu</a>` en premier element du header. Ajouter `id="main-content"` sur le `<main>` de chaque app.

### 5.2 Focus visible sur les boutons de type de graphique [XS]
**Probleme :** Les boutons de selection de type dans le builder sont icon-only sans `:focus-visible`.
**Fichier :** `apps/builder/index.html:119-158`
**Solution :** Ajouter `outline: 2px solid var(--border-action-high-blue-france)` sur `:focus-visible` + `title` descriptif sur chaque bouton.

### 5.3 aria-live pour les mises a jour de statut [S]
**Probleme :** Quand une source se charge ou qu'un badge "Succes" apparait, les lecteurs d'ecran ne sont pas notifies.
**Fichiers :** `apps/builder/src/sources.ts:227-230`, `apps/sources/src/grist-explorer.ts`
**Solution :** Envelopper les zones de statut dans `<div aria-live="polite">`.

### 5.4 Accessible table pour gouv-chart [XS]
**Probleme :** Le composant a un accordion "Voir les donnees" qui affiche une table accessible. Mais le `<canvas>` n'a pas de `aria-label` dynamique.
**Fichier :** `src/components/gouv-chart.ts:233-243`
**Solution :** Generer un `aria-label` du type "Graphique barres : Population par region, 12 valeurs" base sur le type et les donnees.

### 5.5 Tester l'accessibilite automatiquement [M]
**Probleme :** Aucun test d'accessibilite automatise.
**Fichier :** `e2e/smoke.spec.ts`
**Solution :** Ajouter `@axe-core/playwright` aux tests E2E. Un test par app : charge la page + `checkA11y()`. Detecte les violations WCAG AA.

---

## Phase 6 — Infrastructure et production

> *Use case : "L'app est deployee et doit etre fiable"*

### 6.1 Headers CSP dans nginx [S]
**Probleme :** CSP delegue a Traefik mais absent du nginx.conf. Si Traefik change, zero protection.
**Fichier :** `nginx.conf:138`
**Solution :** Ajouter un CSP de base : `default-src 'self'; script-src 'self' cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' cdn.jsdelivr.net;`

### 6.2 Restreindre CORS origin [S]
**Probleme :** `Access-Control-Allow-Origin: *` sur tous les proxys. N'importe quel site peut utiliser le proxy.
**Fichier :** `nginx.conf:29,44,64,79`
**Solution :** Remplacer `*` par `$http_origin` avec whitelist, ou au minimum par le domaine de production.

### 6.3 SRI sur les scripts CDN [S]
**Probleme :** Les scripts externes (DSFR, Chart.js, Remixicon) charges sans `integrity`. Supply-chain attack possible.
**Fichiers :** Tous les `index.html` des apps
**Solution :** Generer les hashes SRI et ajouter `integrity="sha384-..."` + `crossorigin="anonymous"` sur chaque `<script>` et `<link>` CDN.

### 6.4 HEALTHCHECK Docker [XS]
**Probleme :** Pas de healthcheck. Docker ne detecte pas si nginx crash.
**Fichier :** `Dockerfile:30`
**Solution :** Ajouter `HEALTHCHECK --interval=30s CMD curl -f http://localhost/ || exit 1`.

### 6.5 Cache proxy pour les APIs GET [S]
**Probleme :** `proxy_no_cache 1` sur tous les proxys. Chaque requete front touche l'API upstream.
**Fichier :** `nginx.conf:55-56`
**Solution :** Cache 60s pour les requetes GET Grist/ODS. Garder no-cache pour Albert (IA generative).

---

## Matrice de priorisation

| # | Feature | Effort | Impact UX | Phase |
|---|---------|--------|-----------|-------|
| 2.1 | Page active dans le header | XS | Fort | 2 |
| 1.4 | Toast apres export dashboard | XS | Moyen | 1 |
| 3.1 | Toast apres copie code | XS | Moyen | 3 |
| 4.1 | Message si Chart.js absent | XS | Fort | 4 |
| 5.1 | Skip link header | XS | Fort | 5 |
| 5.2 | Focus visible type graphique | XS | Moyen | 5 |
| 6.4 | HEALTHCHECK Docker | XS | Moyen | 6 |
| 2.5 | Tuile favoris hub | XS | Moyen | 2 |
| 3.4 | Dupliquer widget dashboard | XS | Moyen | 3 |
| 3.10 | Confirm avant ecrasement playground | XS | Moyen | 3 |
| 3.7 | Ctrl+S playground | XS | Faible | 3 |
| 5.4 | aria-label dynamique charts | XS | Moyen | 5 |
| 1.1 | Timeouts API | S | Fort | 1 |
| 1.2 | Retry sur erreur | S | Fort | 1 |
| 1.3 | Messages d'erreur differencies | S | Fort | 1 |
| 1.5 | Validation champs IA | S | Fort | 1 |
| 1.6 | Gestion quota localStorage | S | Moyen | 1 |
| 2.2 | Badge compteur favoris | S | Moyen | 2 |
| 2.3 | Lien retour contextuel | S | Moyen | 2 |
| 2.6 | Deep link dashboard → builder | S | Moyen | 2 |
| 3.2 | Renommer favori | S | Moyen | 3 |
| 3.3 | Recherche favoris | S | Moyen | 3 |
| 3.6 | Historique conversation IA | S | Moyen | 3 |
| 3.8 | Tri des favoris | S | Moyen | 3 |
| 3.9 | Export/import favoris JSON | S | Moyen | 3 |
| 4.2 | Etats vides standardises | S | Moyen | 4 |
| 4.3 | Hauteur responsive charts | S | Moyen | 4 |
| 4.5 | Page demo gouv-chart | S | Faible | 4 |
| 5.3 | aria-live statut | S | Moyen | 5 |
| 6.1 | CSP nginx | S | Fort | 6 |
| 6.2 | CORS restreint | S | Fort | 6 |
| 6.3 | SRI scripts CDN | S | Fort | 6 |
| 6.5 | Cache proxy GET | S | Moyen | 6 |
| 2.4 | Auto-save brouillon builder | M | Fort | 2 |
| 3.5 | Templates dashboard | M | Moyen | 3 |
| 4.4 | Export image graphique | M | Moyen | 4 |
| 5.5 | Tests accessibilite axe-core | M | Fort | 5 |

---

## Parcours utilisateur cibles

### Parcours 1 : "Je decouvre l'outil"
`Hub → Documentation → Playground (exemple) → Builder → Exporter`

**Friction actuelle :** Aucune tuile favoris sur le hub (2.5), pas de skip link (5.1), pas de page active (2.1), exemples playground ecrasent le code sans prevenir (3.10).

### Parcours 2 : "Je cree un graphique depuis mes donnees"
`Sources → connecter API → Builder → configurer → previsualiser → sauvegarder en favori`

**Friction actuelle :** Pas de timeout sur les API (1.1), erreurs non differenciees (1.3), pas d'auto-save si refresh accidentel (2.4), copier le code n'a pas de toast (3.1).

### Parcours 3 : "Je compose un dashboard"
`Favoris → Dashboard → drag widgets → configurer → exporter HTML`

**Friction actuelle :** Pas de recherche dans les favoris (3.3), pas de duplication de widget (3.4), export HTML silencieux (1.4), pas de templates pour demarrer (3.5).

### Parcours 4 : "Je genere un graphique par IA"
`Sources → Builder-IA → decrire → generer → ajuster → sauvegarder`

**Friction actuelle :** L'IA peut halluciner des champs inexistants (1.5), pas de retry (1.2), conversation perdue au refresh (3.6), pas de lien vers le builder pour editer manuellement (2.6).

### Parcours 5 : "Je retrouve et reutilise mes graphiques"
`Favoris → chercher → previsualiser → ouvrir dans playground/builder`

**Friction actuelle :** Pas de recherche (3.3), pas de tri (3.8), pas de renommage (3.2), pas d'export pour partager (3.9).

---

## Metriques de succes

- **Fiabilite :** Zero `alert()` natif, zero erreur silencieuse, toutes les actions async ont un feedback
- **Navigation :** L'utilisateur sait toujours ou il est (page active) et comment revenir (lien retour)
- **Autonomie :** L'utilisateur peut retrouver, organiser et exporter ses creations sans aide
- **Accessibilite :** Score axe-core 0 violations sur toutes les apps
- **Production :** CSP + CORS + SRI en place, healthcheck Docker operationnel
