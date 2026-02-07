import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  DEFAULT_PROXY_CONFIG,
  isViteDevMode,
  isTauriMode,
  getProxyConfig,
} from '../../packages/shared/src/api/proxy-config';

describe('proxy-config', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('DEFAULT_PROXY_CONFIG', () => {
    it('should have the production base URL', () => {
      expect(DEFAULT_PROXY_CONFIG.baseUrl).toBe('https://chartsbuilder.matge.com');
    });

    it('should have all endpoint paths', () => {
      expect(DEFAULT_PROXY_CONFIG.endpoints.grist).toBe('/grist-proxy');
      expect(DEFAULT_PROXY_CONFIG.endpoints.gristGouv).toBe('/grist-gouv-proxy');
      expect(DEFAULT_PROXY_CONFIG.endpoints.albert).toBe('/albert-proxy');
      expect(DEFAULT_PROXY_CONFIG.endpoints.tabular).toBe('/tabular-proxy');
    });
  });

  describe('isViteDevMode', () => {
    it('should return false in test environment (jsdom)', () => {
      // jsdom defaults to about:blank, not localhost:5173
      expect(isViteDevMode()).toBe(false);
    });
  });

  describe('isTauriMode', () => {
    it('should return false when __TAURI__ is not defined', () => {
      expect(isTauriMode()).toBe(false);
    });

    it('should return true when __TAURI__ is defined', () => {
      (window as Record<string, unknown>).__TAURI__ = {};
      expect(isTauriMode()).toBe(true);
      delete (window as Record<string, unknown>).__TAURI__;
    });
  });

  describe('getProxyConfig', () => {
    it('should return production config in non-dev, non-Tauri environment', () => {
      const config = getProxyConfig();
      expect(config.baseUrl).toBe(DEFAULT_PROXY_CONFIG.baseUrl);
      expect(config.endpoints).toEqual(DEFAULT_PROXY_CONFIG.endpoints);
    });

    it('should return Tauri config when __TAURI__ is set', () => {
      (window as Record<string, unknown>).__TAURI__ = {};
      const config = getProxyConfig();
      expect(config.baseUrl).toBe(DEFAULT_PROXY_CONFIG.baseUrl);
      delete (window as Record<string, unknown>).__TAURI__;
    });
  });
});
