import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * <app-header> - Header DSFR avec navigation
 *
 * Affiche le header conforme DSFR avec logo, titre du service,
 * et menu de navigation. La page active est mise en surbrillance.
 *
 * @example
 * <app-header current-page="builder" base-path=""></app-header>
 * <app-header current-page="composants" base-path="../"></app-header>
 */
@customElement('app-header')
export class AppHeader extends LitElement {
  /**
   * Page courante pour mettre en surbrillance dans la nav
   * Valeurs: 'accueil' | 'composants' | 'builder' | 'builder-ia' | 'dashboard' | 'playground' | 'favoris' | 'sources'
   */
  @property({ type: String, attribute: 'current-page' })
  currentPage = '';

  /**
   * Chemin de base pour les liens (ex: '', '../', '../../')
   */
  @property({ type: String, attribute: 'base-path' })
  basePath = '';

  @state()
  private _favCount = 0;

  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    // Read favorites count
    try {
      const favs = JSON.parse(localStorage.getItem('gouv-widgets-favorites') || '[]');
      this._favCount = Array.isArray(favs) ? favs.length : 0;
    } catch { /* ignore */ }
    // Inject active page style once
    if (!document.getElementById('app-header-active-style')) {
      const style = document.createElement('style');
      style.id = 'app-header-active-style';
      style.textContent = `.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}`;
      document.head.appendChild(style);
    }
  }

  private _getNavItems() {
    return [
      { id: 'accueil', label: 'Accueil', href: 'index.html' },
      { id: 'composants', label: 'Composants', href: 'demo/index.html' },
      { id: 'builder', label: 'Builder', href: 'apps/builder/index.html' },
      { id: 'builder-ia', label: 'Builder IA', href: 'apps/builder-ia/index.html' },
      { id: 'dashboard', label: 'Dashboard', href: 'apps/dashboard/index.html' },
      { id: 'playground', label: 'Playground', href: 'apps/playground/index.html' },
      { id: 'favoris', label: 'Favoris', href: 'apps/favorites/index.html' },
      { id: 'sources', label: 'Sources', href: 'apps/sources/index.html' },
      { id: 'monitoring', label: 'Monitoring', href: 'apps/monitoring/index.html' },
    ];
  }

  render() {
    const navItems = this._getNavItems();

    return html`
      <div class="fr-skiplinks">
        <nav class="fr-container" role="navigation" aria-label="Accès rapide">
          <ul class="fr-skiplinks__list">
            <li><a class="fr-link" href="#main-content">Contenu</a></li>
            <li><a class="fr-link" href="#header-navigation">Menu</a></li>
          </ul>
        </nav>
      </div>
      <header role="banner" class="fr-header">
        <div class="fr-header__body">
          <div class="fr-container">
            <div class="fr-header__body-row">
              <div class="fr-header__brand fr-enlarge-link">
                <div class="fr-header__brand-top">
                  <div class="fr-header__logo">
                    <p class="fr-logo">
                      République<br>Française
                    </p>
                  </div>
                  <div class="fr-header__navbar">
                    <button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-menu" aria-haspopup="menu" id="button-menu" title="Menu">
                      Menu
                    </button>
                  </div>
                </div>
                <div class="fr-header__service">
                  <a href="${this.basePath}index.html" title="Accueil - Charts builder">
                    <p class="fr-header__service-title">Charts builder</p>
                  </a>
                  <p class="fr-header__service-tagline">Création de visualisations dynamiques conformes DSFR</p>
                </div>
              </div>
              <div class="fr-header__tools">
                <div class="fr-header__tools-links">
                  <ul class="fr-btns-group">
                    <li>
                      <a class="fr-btn fr-btn--secondary fr-icon-star-fill" href="${this.basePath}apps/favorites/index.html">
                        Favoris${this._favCount > 0 ? html` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>` : nothing}
                      </a>
                    </li>
                    <li>
                      <a class="fr-btn fr-icon-github-fill" href="https://github.com/bmatge/datasource-charts-webcomponents" target="_blank" rel="noopener">
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fr-header__menu fr-modal" id="modal-menu" aria-labelledby="button-menu">
          <div class="fr-container">
            <button class="fr-btn--close fr-btn" aria-controls="modal-menu" title="Fermer">
              Fermer
            </button>
            <div class="fr-header__menu-links"></div>
            <nav class="fr-nav" id="header-navigation" role="navigation" aria-label="Menu principal">
              <ul class="fr-nav__list">
                ${navItems.map(item => html`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this.basePath}${item.href}"
                       ${this.currentPage === item.id ? html`aria-current="page"` : ''}>
                      ${item.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
