/**
 * Menu structure for the guide pages.
 * Used by <app-sidemenu section="guide">.
 * Edit this file to add/remove/rename guide menu entries.
 */
(window.__APP_MENUS__ = window.__APP_MENUS__ || {}).guide = [
  {
    title: "Guide utilisateur",
    items: [
      { id: "overview", label: "Vue d'ensemble", href: "guide.html" },
      { id: "grist-widgets", label: "Widgets Grist", href: "guide.html#grist-widgets" },
      { id: "parcours", label: "Parcours utilisateur", href: "guide-parcours.html" },
      { id: "exemples-source", label: "gouv-source", href: "guide-exemples-source.html" },
      { id: "exemples-normalize", label: "gouv-normalize", href: "guide-exemples-normalize.html" },
      { id: "exemples-query", label: "gouv-query", href: "guide-exemples-query.html" },
      { id: "exemples-search", label: "gouv-search", href: "guide-exemples-search.html" },
      { id: "exemples-facets", label: "gouv-facets", href: "guide-exemples-facets.html" },
      { id: "exemples-display", label: "gouv-display", href: "guide-exemples-display.html" },
      { id: "exemples-raw-data", label: "gouv-raw-data", href: "guide-exemples-raw-data.html" }
    ]
  },
  {
    title: "Exemples avances",
    items: [
      { id: "world-map", label: "Dashboard Huwise", href: "guide-exemples-world-map.html" },
      { id: "exemple-ods", label: "Recherche Huwise", href: "guide-exemple-ODS.html" },
      { id: "insee-erfs", label: "Dashboard INSEE", href: "guide-exemples-insee-erfs.html" },
      { id: "maires", label: "Dashboard Tabular (data.gouv)", href: "guide-exemples-maires.html" },
      { id: "ghibli", label: "Dashboard generic (ghibli)", href: "guide-exemples-ghibli.html" }
    ]
  }
];
