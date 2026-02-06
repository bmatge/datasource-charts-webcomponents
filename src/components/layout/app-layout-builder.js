var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * <app-layout-builder> - Layout deux colonnes avec resizer
 *
 * Affiche un layout à deux colonnes (gauche: config, droite: preview)
 * avec un resizer draggable entre les deux.
 *
 * Note: Utilise Light DOM pour hériter des styles DSFR.
 * Les éléments avec slot="left" et slot="right" sont déplacés
 * manuellement dans les conteneurs après le rendu.
 *
 * @example
 * <app-layout-builder left-ratio="40">
 *   <div slot="left">Configuration panel</div>
 *   <div slot="right">Preview panel</div>
 * </app-layout-builder>
 */
let AppLayoutBuilder = class AppLayoutBuilder extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Ratio initial du panneau gauche en pourcentage (ex: 40 pour 40%)
         */
        this.leftRatio = 40;
        /**
         * Largeur minimale du panneau gauche en pixels
         */
        this.minLeftWidth = 280;
        /**
         * Largeur minimale du panneau droit en pixels
         */
        this.minRightWidth = 300;
        this._isResizing = false;
        this._currentLeftRatio = 40;
        // Éléments enfants à projeter (sauvegardés avant le rendu)
        this._leftContent = [];
        this._rightContent = [];
        this._contentMoved = false;
        this._boundMouseMove = null;
        this._boundMouseUp = null;
    }
    // Light DOM pour hériter des styles DSFR
    createRenderRoot() {
        return this;
    }
    connectedCallback() {
        super.connectedCallback();
        this._currentLeftRatio = this.leftRatio;
        this._setupResizer();
        // Sauvegarder les éléments enfants avant le premier rendu
        this._saveSlotContent();
    }
    /**
     * Sauvegarde les éléments enfants avec slot="left" et slot="right"
     * pour les déplacer après le rendu (Light DOM n'a pas de slots natifs)
     */
    _saveSlotContent() {
        this._leftContent = Array.from(this.querySelectorAll('[slot="left"]'));
        this._rightContent = Array.from(this.querySelectorAll('[slot="right"]'));
    }
    /**
     * Déplace le contenu sauvegardé dans les conteneurs après le rendu
     */
    firstUpdated() {
        this._moveContent();
    }
    updated() {
        // S'assurer que le contenu est toujours dans les bons conteneurs
        if (!this._contentMoved) {
            this._moveContent();
        }
    }
    _moveContent() {
        const leftContainer = this.querySelector('.builder-layout-left');
        const rightContainer = this.querySelector('.builder-layout-right');
        if (leftContainer && rightContainer) {
            this._leftContent.forEach(el => leftContainer.appendChild(el));
            this._rightContent.forEach(el => rightContainer.appendChild(el));
            this._contentMoved = true;
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._cleanupResizer();
    }
    _setupResizer() {
        this._boundMouseMove = this._handleMouseMove.bind(this);
        this._boundMouseUp = this._handleMouseUp.bind(this);
    }
    _cleanupResizer() {
        if (this._boundMouseMove) {
            document.removeEventListener('mousemove', this._boundMouseMove);
        }
        if (this._boundMouseUp) {
            document.removeEventListener('mouseup', this._boundMouseUp);
        }
    }
    _handleMouseDown(e) {
        e.preventDefault();
        this._isResizing = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        if (this._boundMouseMove) {
            document.addEventListener('mousemove', this._boundMouseMove);
        }
        if (this._boundMouseUp) {
            document.addEventListener('mouseup', this._boundMouseUp);
        }
    }
    _handleMouseMove(e) {
        if (!this._isResizing)
            return;
        const container = this.querySelector('.builder-layout-container');
        if (!container)
            return;
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        let newWidth = e.clientX - containerRect.left;
        // Contraintes min/max en pixels
        newWidth = Math.max(this.minLeftWidth, Math.min(newWidth, containerWidth - this.minRightWidth));
        // Convertir en ratio
        this._currentLeftRatio = (newWidth / containerWidth) * 100;
        this.requestUpdate();
    }
    _handleMouseUp() {
        if (this._isResizing) {
            this._isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            if (this._boundMouseMove) {
                document.removeEventListener('mousemove', this._boundMouseMove);
            }
            if (this._boundMouseUp) {
                document.removeEventListener('mouseup', this._boundMouseUp);
            }
        }
    }
    render() {
        return html `
      <div class="builder-layout-container">
        <aside class="builder-layout-left" style="flex: 0 0 ${this._currentLeftRatio}%">
          <!-- Contenu slot="left" sera déplacé ici -->
        </aside>

        <div class="builder-layout-resizer ${this._isResizing ? 'dragging' : ''}"
             @mousedown="${this._handleMouseDown}">
        </div>

        <main class="builder-layout-right">
          <!-- Contenu slot="right" sera déplacé ici -->
        </main>
      </div>

      <style>
        app-layout-builder {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }

        .builder-layout-container {
          display: flex;
          flex: 1;
          min-height: 0;
        }

        .builder-layout-left {
          overflow-y: auto;
          overflow-x: hidden;
          border-right: 1px solid var(--border-default-grey);
          background: var(--background-alt-grey);
          display: flex;
          flex-direction: column;
          min-height: 0;
          min-width: 280px;
        }

        .builder-layout-resizer {
          width: 6px;
          background: var(--border-default-grey);
          cursor: col-resize;
          flex-shrink: 0;
          transition: background 0.15s;
        }

        .builder-layout-resizer:hover,
        .builder-layout-resizer.dragging {
          background: var(--border-action-high-blue-france);
        }

        .builder-layout-right {
          flex: 1;
          overflow: auto;
          background: var(--background-default-grey);
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        /* Responsive: stack vertical on mobile */
        @media (max-width: 900px) {
          .builder-layout-container {
            flex-direction: column;
          }

          .builder-layout-left {
            width: 100% !important;
            max-height: 50vh;
            border-right: none;
            border-bottom: 1px solid var(--border-default-grey);
          }

          .builder-layout-resizer {
            display: none;
          }

          .builder-layout-right {
            height: 50vh;
          }
        }
      </style>
    `;
    }
};
__decorate([
    property({ type: Number, attribute: 'left-ratio' })
], AppLayoutBuilder.prototype, "leftRatio", void 0);
__decorate([
    property({ type: Number, attribute: 'min-left-width' })
], AppLayoutBuilder.prototype, "minLeftWidth", void 0);
__decorate([
    property({ type: Number, attribute: 'min-right-width' })
], AppLayoutBuilder.prototype, "minRightWidth", void 0);
__decorate([
    state()
], AppLayoutBuilder.prototype, "_isResizing", void 0);
__decorate([
    state()
], AppLayoutBuilder.prototype, "_currentLeftRatio", void 0);
AppLayoutBuilder = __decorate([
    customElement('app-layout-builder')
], AppLayoutBuilder);
export { AppLayoutBuilder };
