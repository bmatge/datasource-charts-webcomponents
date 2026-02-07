var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
let AppHeader = class AppHeader extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Page courante pour mettre en surbrillance dans la nav
         * Valeurs: 'accueil' | 'composants' | 'builder' | 'builder-ia' | 'playground' | 'favoris' | 'sources'
         */
        this.currentPage = '';
        /**
         * Chemin de base pour les liens (ex: '', '../', '../../')
         */
        this.basePath = '';
    }
    // Light DOM pour hériter des styles DSFR
    createRenderRoot() {
        return this;
    }
    _getNavItems() {
        return [
            { id: 'accueil', label: 'Accueil', href: 'index.html' },
            { id: 'composants', label: 'Composants', href: 'demo/index.html' },
            { id: 'builder', label: 'Builder', href: 'builder.html' },
            { id: 'builder-ia', label: 'Builder IA', href: 'builderIA.html' },
            { id: 'playground', label: 'Playground', href: 'playground.html' },
            { id: 'favoris', label: 'Favoris', href: 'favoris.html' },
            { id: 'sources', label: 'Sources', href: 'sources.html' },
        ];
    }
    render() {
        const navItems = this._getNavItems();
        return html `
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
                ${navItems.map(item => html `
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this.basePath}${item.href}"
                       ${this.currentPage === item.id ? html `aria-current="page"` : ''}>
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
};
__decorate([
    property({ type: String, attribute: 'current-page' })
], AppHeader.prototype, "currentPage", void 0);
__decorate([
    property({ type: String, attribute: 'base-path' })
], AppHeader.prototype, "basePath", void 0);
AppHeader = __decorate([
    customElement('app-header')
], AppHeader);
export { AppHeader };
