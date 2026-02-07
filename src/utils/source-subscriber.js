import { subscribeToSource, getDataCache } from './data-bridge.js';
/**
 * Mixin qui ajoute la logique d'abonnement à une source de données.
 *
 * Le composant hôte doit :
 * - déclarer `@property({ type: String }) source = ''`
 * - implémenter `onSourceData(data)` pour réagir aux nouvelles données
 */
export function SourceSubscriberMixin(superClass) {
    class SourceSubscriberElement extends superClass {
        constructor() {
            super(...arguments);
            this._sourceLoading = false;
            this._sourceData = null;
            this._sourceError = null;
            this._unsubscribeSource = null;
        }
        /**
         * Hook appelé quand de nouvelles données arrivent.
         * À surcharger dans le composant hôte.
         */
        onSourceData(_data) {
            // default: no-op
        }
        connectedCallback() {
            super.connectedCallback();
            this._subscribeToSource();
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._cleanupSubscription();
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has('source')) {
                this._subscribeToSource();
            }
        }
        _subscribeToSource() {
            this._cleanupSubscription();
            const source = this.source;
            if (!source)
                return;
            // Récupère les données en cache
            const cachedData = getDataCache(source);
            if (cachedData !== undefined) {
                this._sourceData = cachedData;
                this.onSourceData(cachedData);
            }
            this._unsubscribeSource = subscribeToSource(source, {
                onLoaded: (data) => {
                    this._sourceData = data;
                    this._sourceLoading = false;
                    this._sourceError = null;
                    this.onSourceData(data);
                    this.requestUpdate();
                },
                onLoading: () => {
                    this._sourceLoading = true;
                    this.requestUpdate();
                },
                onError: (error) => {
                    this._sourceError = error;
                    this._sourceLoading = false;
                    this.requestUpdate();
                },
            });
        }
        _cleanupSubscription() {
            if (this._unsubscribeSource) {
                this._unsubscribeSource();
                this._unsubscribeSource = null;
            }
        }
    }
    return SourceSubscriberElement;
}
