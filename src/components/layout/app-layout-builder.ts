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
 * <app-layout-builder left-width="400">
 *   <div slot="left">Configuration panel</div>
 *   <div slot="right">Preview panel</div>
 * </app-layout-builder>
 */
@customElement('app-layout-builder')
export class AppLayoutBuilder extends LitElement {
  /**
   * Largeur initiale du panneau gauche en pixels
   */
  @property({ type: Number, attribute: 'left-width' })
  leftWidth = 400;

  /**
   * Largeur minimale du panneau gauche
   */
  @property({ type: Number, attribute: 'min-left-width' })
  minLeftWidth = 280;

  /**
   * Largeur minimale du panneau droit
   */
  @property({ type: Number, attribute: 'min-right-width' })
  minRightWidth = 300;

  @state()
  private _isResizing = false;

  @state()
  private _currentLeftWidth = 400;

  // Éléments enfants à projeter (sauvegardés avant le rendu)
  private _leftContent: Element[] = [];
  private _rightContent: Element[] = [];
  private _contentMoved = false;

  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this._currentLeftWidth = this.leftWidth;
    this._setupResizer();
    // Sauvegarder les éléments enfants avant le premier rendu
    this._saveSlotContent();
  }

  /**
   * Sauvegarde les éléments enfants avec slot="left" et slot="right"
   * pour les déplacer après le rendu (Light DOM n'a pas de slots natifs)
   */
  private _saveSlotContent() {
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

  private _moveContent() {
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

  private _boundMouseMove: ((e: MouseEvent) => void) | null = null;
  private _boundMouseUp: (() => void) | null = null;

  private _setupResizer() {
    this._boundMouseMove = this._handleMouseMove.bind(this);
    this._boundMouseUp = this._handleMouseUp.bind(this);
  }

  private _cleanupResizer() {
    if (this._boundMouseMove) {
      document.removeEventListener('mousemove', this._boundMouseMove);
    }
    if (this._boundMouseUp) {
      document.removeEventListener('mouseup', this._boundMouseUp);
    }
  }

  private _handleMouseDown(e: MouseEvent) {
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

  private _handleMouseMove(e: MouseEvent) {
    if (!this._isResizing) return;

    const container = this.querySelector('.builder-layout-container') as HTMLElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    let newWidth = e.clientX - containerRect.left;

    // Contraintes min/max
    newWidth = Math.max(this.minLeftWidth, Math.min(newWidth, containerRect.width - this.minRightWidth));

    this._currentLeftWidth = newWidth;
    this.requestUpdate();
  }

  private _handleMouseUp() {
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
    return html`
      <div class="builder-layout-container">
        <aside class="builder-layout-left" style="width: ${this._currentLeftWidth}px">
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
          flex-shrink: 0;
          overflow-y: auto;
          overflow-x: hidden;
          border-right: 1px solid var(--border-default-grey);
          background: var(--background-alt-grey);
          display: flex;
          flex-direction: column;
          min-height: 0;
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
}

declare global {
  interface HTMLElementTagNameMap {
    'app-layout-builder': AppLayoutBuilder;
  }
}
