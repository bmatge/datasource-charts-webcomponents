import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  DATA_EVENTS,
  setDataCache,
  getDataCache,
  clearDataCache,
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading,
  subscribeToSource
} from '../src/utils/data-bridge.js';

describe('data-bridge', () => {
  beforeEach(() => {
    // Nettoie le cache avant chaque test
    clearDataCache('test-source');
  });

  describe('cache', () => {
    it('stocke et récupère des données', () => {
      const data = { items: [1, 2, 3] };
      setDataCache('test-source', data);
      expect(getDataCache('test-source')).toEqual(data);
    });

    it('retourne undefined pour une source inexistante', () => {
      expect(getDataCache('unknown')).toBeUndefined();
    });

    it('supprime les données du cache', () => {
      setDataCache('test-source', { test: true });
      clearDataCache('test-source');
      expect(getDataCache('test-source')).toBeUndefined();
    });
  });

  describe('events', () => {
    it('dispatch un événement data-loaded', () => {
      const handler = vi.fn();
      document.addEventListener(DATA_EVENTS.LOADED, handler);

      dispatchDataLoaded('test-source', { result: 'ok' });

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0] as CustomEvent;
      expect(event.detail.sourceId).toBe('test-source');
      expect(event.detail.data).toEqual({ result: 'ok' });

      document.removeEventListener(DATA_EVENTS.LOADED, handler);
    });

    it('dispatch un événement data-error', () => {
      const handler = vi.fn();
      document.addEventListener(DATA_EVENTS.ERROR, handler);

      const error = new Error('Test error');
      dispatchDataError('test-source', error);

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0] as CustomEvent;
      expect(event.detail.sourceId).toBe('test-source');
      expect(event.detail.error).toBe(error);

      document.removeEventListener(DATA_EVENTS.ERROR, handler);
    });

    it('dispatch un événement data-loading', () => {
      const handler = vi.fn();
      document.addEventListener(DATA_EVENTS.LOADING, handler);

      dispatchDataLoading('test-source');

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0] as CustomEvent;
      expect(event.detail.sourceId).toBe('test-source');

      document.removeEventListener(DATA_EVENTS.LOADING, handler);
    });
  });

  describe('subscribeToSource', () => {
    it('appelle le callback onLoaded pour la bonne source', () => {
      const onLoaded = vi.fn();
      const unsubscribe = subscribeToSource('my-source', { onLoaded });

      dispatchDataLoaded('my-source', { items: [] });
      expect(onLoaded).toHaveBeenCalledWith({ items: [] });

      dispatchDataLoaded('other-source', { other: true });
      expect(onLoaded).toHaveBeenCalledTimes(1);

      unsubscribe();
    });

    it('appelle le callback onError pour la bonne source', () => {
      const onError = vi.fn();
      const unsubscribe = subscribeToSource('my-source', { onError });

      const error = new Error('Test');
      dispatchDataError('my-source', error);
      expect(onError).toHaveBeenCalledWith(error);

      unsubscribe();
    });

    it('appelle le callback onLoading pour la bonne source', () => {
      const onLoading = vi.fn();
      const unsubscribe = subscribeToSource('my-source', { onLoading });

      dispatchDataLoading('my-source');
      expect(onLoading).toHaveBeenCalled();

      unsubscribe();
    });

    it('permet de se désabonner', () => {
      const onLoaded = vi.fn();
      const unsubscribe = subscribeToSource('my-source', { onLoaded });

      unsubscribe();

      dispatchDataLoaded('my-source', {});
      expect(onLoaded).not.toHaveBeenCalled();
    });
  });
});
