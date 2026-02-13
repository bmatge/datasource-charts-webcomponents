import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toNumber, looksLikeNumber } from '@gouv-widgets/shared';
import { sendWidgetBeacon } from '../utils/beacon.js';
import {
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading,
  clearDataCache,
  clearDataMeta,
  subscribeToSource,
  getDataCache,
  getDataMeta,
  setDataMeta,
  subscribeToPageRequests,
  dispatchPageRequest
} from '../utils/data-bridge.js';

/**
 * <gouv-normalize> - Composant de normalisation de donnees
 *
 * S'insere entre une source (gouv-source) et un consommateur (gouv-query, gouv-dsfr-chart, etc.)
 * pour nettoyer et normaliser les donnees avant traitement.
 *
 * Position recommandee : AVANT gouv-query pour que les filtres/agregations
 * travaillent sur des donnees propres.
 *
 * @example
 * <gouv-source id="raw" url="https://api.example.com/data" transform="results"></gouv-source>
 * <gouv-normalize
 *   id="clean"
 *   source="raw"
 *   numeric="population, budget"
 *   rename="pop_tot:Population totale | lib_dep:Departement"
 *   trim
 *   replace="N/A: | n.d.:"
 * ></gouv-normalize>
 * <gouv-query id="stats" source="clean" group-by="Departement" aggregate="population:sum"></gouv-query>
 * <gouv-dsfr-chart source="stats" type="bar" label-field="Departement" value-field="population__sum"></gouv-dsfr-chart>
 */
@customElement('gouv-normalize')
export class GouvNormalize extends LitElement {
  /** ID de la source de donnees a ecouter */
  @property({ type: String })
  source = '';

  /** Champs a convertir en nombre (virgule-separes). Ex: "population, surface" */
  @property({ type: String })
  numeric = '';

  /** Detection automatique des champs numeriques via looksLikeNumber() */
  @property({ type: Boolean, attribute: 'numeric-auto' })
  numericAuto = false;

  /** Renommage de cles. Format: "ancien:nouveau | ancien2:nouveau2" */
  @property({ type: String })
  rename = '';

  /** Supprime les espaces en debut/fin de toutes les cles et valeurs string */
  @property({ type: Boolean })
  trim = false;

  /** Supprime les balises HTML des valeurs string */
  @property({ type: Boolean, attribute: 'strip-html' })
  stripHtml = false;

  /** Remplacement de valeurs. Format: "pattern:remplacement | pattern2:remplacement2" */
  @property({ type: String })
  replace = '';

  /** Cle du sous-objet a aplatir au premier niveau. Supporte la dot notation (ex: "data.attributes"). */
  @property({ type: String })
  flatten = '';

  /** Met toutes les cles en minuscules */
  @property({ type: Boolean, attribute: 'lowercase-keys' })
  lowercaseKeys = false;

  private _unsubscribe: (() => void) | null = null;
  private _unsubscribePageRequests: (() => void) | null = null;

  createRenderRoot() {
    return this;
  }

  render() {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-normalize');
    this._initialize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    if (this._unsubscribePageRequests) {
      this._unsubscribePageRequests();
      this._unsubscribePageRequests = null;
    }
    if (this.id) {
      clearDataCache(this.id);
      clearDataMeta(this.id);
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // Re-initialiser si source change
    if (changedProperties.has('source')) {
      this._initialize();
      return;
    }

    // Re-traiter si les regles de normalisation changent
    const normalizationAttrs = ['flatten', 'numeric', 'numericAuto', 'rename', 'trim', 'stripHtml', 'replace', 'lowercaseKeys'];
    const hasNormalizationChange = normalizationAttrs.some(attr => changedProperties.has(attr));
    if (hasNormalizationChange) {
      const cachedData = this.source ? getDataCache(this.source) : undefined;
      if (cachedData !== undefined) {
        this._processData(cachedData);
      }
    }
  }

  private _initialize() {
    if (!this.id) {
      console.warn('gouv-normalize: attribut "id" requis pour identifier la sortie');
      return;
    }

    if (!this.source) {
      console.warn('gouv-normalize: attribut "source" requis');
      return;
    }

    // Se desabonner de l'ancienne source
    if (this._unsubscribe) {
      this._unsubscribe();
    }
    if (this._unsubscribePageRequests) {
      this._unsubscribePageRequests();
      this._unsubscribePageRequests = null;
    }

    // Verifier le cache avant de s'abonner (evite une race condition
    // si la source a deja emis ses donnees avant l'abonnement)
    const cachedData = getDataCache(this.source);
    if (cachedData !== undefined) {
      this._processData(cachedData);
    }

    // S'abonner a la nouvelle source
    this._unsubscribe = subscribeToSource(this.source, {
      onLoaded: (data: unknown) => {
        this._processData(data);
      },
      onLoading: () => {
        dispatchDataLoading(this.id);
      },
      onError: (error: Error) => {
        dispatchDataError(this.id, error);
      }
    });

    // Relayer les demandes de page vers la source upstream
    this._unsubscribePageRequests = subscribeToPageRequests(this.id, (page: number) => {
      dispatchPageRequest(this.source, page);
    });
  }

  private _processData(rawData: unknown) {
    try {
      dispatchDataLoading(this.id);

      let rows = Array.isArray(rawData) ? rawData : [rawData];

      // Flatten: extract nested sub-object keys to top level (before all other transforms)
      if (this.flatten) {
        rows = rows.map(row => {
          if (row === null || row === undefined || typeof row !== 'object' || Array.isArray(row)) {
            return row;
          }
          return this._flattenRow(row as Record<string, unknown>, this.flatten);
        });
      }

      const numericFields = this._parseNumericFields();
      const renameMap = this._parsePipeMap(this.rename);
      const replaceMap = this._parsePipeMap(this.replace);

      const result = rows.map(row => {
        if (row === null || row === undefined || typeof row !== 'object') {
          return row;
        }
        return this._normalizeRow(row as Record<string, unknown>, numericFields, renameMap, replaceMap);
      });

      dispatchDataLoaded(this.id, result);

      // Pass-through de la meta de pagination de la source upstream
      const sourceMeta = getDataMeta(this.source);
      if (sourceMeta) {
        setDataMeta(this.id, sourceMeta);
      }
    } catch (error) {
      dispatchDataError(this.id, error as Error);
      console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, error);
    }
  }

  private _normalizeRow(
    row: Record<string, unknown>,
    numericFields: Set<string>,
    renameMap: Map<string, string>,
    replaceMap: Map<string, string>
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [rawKey, value] of Object.entries(row)) {
      // 0. Trim key (when trim is enabled, also clean key names)
      const key = this.trim ? rawKey.trim() : rawKey;
      let normalizedValue = value;

      // 1. Trim value
      if (this.trim && typeof normalizedValue === 'string') {
        normalizedValue = normalizedValue.trim();
      }

      // 2. Strip HTML
      if (this.stripHtml && typeof normalizedValue === 'string') {
        normalizedValue = (normalizedValue as string).replace(/<[^>]*>/g, '');
      }

      // 3. Replace
      if (replaceMap.size > 0 && typeof normalizedValue === 'string') {
        for (const [pattern, replacement] of replaceMap) {
          if (normalizedValue === pattern) {
            normalizedValue = replacement;
            break;
          }
        }
      }

      // 4. Numeric conversion (uses trimmed key for field matching)
      if (numericFields.has(key)) {
        normalizedValue = toNumber(normalizedValue);
      } else if (this.numericAuto && typeof normalizedValue === 'string' && looksLikeNumber(normalizedValue)) {
        const num = toNumber(normalizedValue, true);
        if (num !== null) {
          normalizedValue = num;
        }
      }

      // 5. Rename key (uses trimmed key for map lookup)
      const finalKey = renameMap.get(key) ?? key;

      // 6. Lowercase keys
      const outputKey = this.lowercaseKeys ? finalKey.toLowerCase() : finalKey;

      result[outputKey] = normalizedValue;
    }

    return result;
  }

  /** Aplatit un sous-objet au premier niveau d'un enregistrement */
  private _flattenRow(row: Record<string, unknown>, path: string): Record<string, unknown> {
    const nested = this._resolvePath(row, path);

    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      const result = { ...row };
      this._deleteByPath(result, path);
      Object.assign(result, nested as Record<string, unknown>);
      return result;
    }

    return row;
  }

  /** Resout un chemin en dot notation sur un objet */
  private _resolvePath(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce<unknown>((acc, key) => {
      return acc != null && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined;
    }, obj);
  }

  /** Supprime une cle par chemin dot notation (supprime aussi la racine du chemin) */
  private _deleteByPath(obj: Record<string, unknown>, path: string): void {
    const parts = path.split('.');
    // Always delete the top-level key to remove the entire nested path
    delete obj[parts[0]];
  }

  /** Parse l'attribut numeric en Set de noms de champs */
  _parseNumericFields(): Set<string> {
    if (!this.numeric) return new Set();
    return new Set(
      this.numeric.split(',').map(f => f.trim()).filter(Boolean)
    );
  }

  /** Parse un attribut pipe-separe en Map cle:valeur */
  _parsePipeMap(attr: string): Map<string, string> {
    const map = new Map<string, string>();
    if (!attr) return map;

    const pairs = attr.split('|');
    for (const pair of pairs) {
      const colonIndex = pair.indexOf(':');
      if (colonIndex === -1) continue;
      const key = pair.substring(0, colonIndex).trim();
      const value = pair.substring(colonIndex + 1).trim();
      if (key) {
        map.set(key, value);
      }
    }
    return map;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-normalize': GouvNormalize;
  }
}
