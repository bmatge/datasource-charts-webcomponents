import { describe, it, expect } from 'vitest';
import { getAdapter, registerAdapter } from '../../src/adapters/api-adapter.js';
import type { ApiAdapter, AdapterCapabilities, AdapterParams, FetchResult, ServerSideOverlay } from '../../src/adapters/api-adapter.js';

describe('API Adapter Factory', () => {
  it('returns opendatasoft adapter', () => {
    const adapter = getAdapter('opendatasoft');
    expect(adapter.type).toBe('opendatasoft');
  });

  it('returns tabular adapter', () => {
    const adapter = getAdapter('tabular');
    expect(adapter.type).toBe('tabular');
  });

  it('returns generic adapter', () => {
    const adapter = getAdapter('generic');
    expect(adapter.type).toBe('generic');
  });

  it('throws for unknown api type', () => {
    expect(() => getAdapter('unknown')).toThrow('Type d\'API non supporte: unknown');
  });

  it('allows registering custom adapters', () => {
    const customAdapter: ApiAdapter = {
      type: 'custom',
      capabilities: {
        serverFetch: true,
        serverFacets: false,
        serverSearch: false,
        serverGroupBy: false,
        serverOrderBy: false,
        whereFormat: 'colon',
      },
      validate: () => null,
      fetchAll: () => Promise.resolve({ data: [], totalCount: 0, needsClientProcessing: false }),
      fetchPage: () => Promise.resolve({ data: [], totalCount: 0, needsClientProcessing: false }),
      buildUrl: () => '',
      buildServerSideUrl: () => '',
    };

    registerAdapter(customAdapter);
    expect(getAdapter('custom').type).toBe('custom');
  });
});

describe('Adapter Capabilities', () => {
  it('opendatasoft has full server capabilities', () => {
    const caps = getAdapter('opendatasoft').capabilities;
    expect(caps.serverFetch).toBe(true);
    expect(caps.serverFacets).toBe(true);
    expect(caps.serverSearch).toBe(true);
    expect(caps.serverGroupBy).toBe(true);
    expect(caps.serverOrderBy).toBe(true);
    expect(caps.whereFormat).toBe('odsql');
  });

  it('tabular has limited server capabilities', () => {
    const caps = getAdapter('tabular').capabilities;
    expect(caps.serverFetch).toBe(true);
    expect(caps.serverFacets).toBe(false);
    expect(caps.serverSearch).toBe(false);
    expect(caps.serverGroupBy).toBe(false);
    expect(caps.serverOrderBy).toBe(true);
    expect(caps.whereFormat).toBe('colon');
  });

  it('generic has no server capabilities', () => {
    const caps = getAdapter('generic').capabilities;
    expect(caps.serverFetch).toBe(false);
    expect(caps.serverFacets).toBe(false);
    expect(caps.serverSearch).toBe(false);
    expect(caps.serverGroupBy).toBe(false);
    expect(caps.serverOrderBy).toBe(false);
    expect(caps.whereFormat).toBe('odsql');
  });
});

describe('GenericAdapter', () => {
  const adapter = getAdapter('generic');

  it('validate returns null (no requirements)', () => {
    expect(adapter.validate({} as AdapterParams)).toBeNull();
  });

  it('fetchAll throws', () => {
    expect(() => adapter.fetchAll({} as AdapterParams, new AbortController().signal)).toThrow();
  });

  it('fetchPage throws', () => {
    expect(() => adapter.fetchPage({} as AdapterParams, {} as ServerSideOverlay, new AbortController().signal)).toThrow();
  });

  it('buildUrl throws', () => {
    expect(() => adapter.buildUrl({} as AdapterParams)).toThrow();
  });

  it('buildServerSideUrl throws', () => {
    expect(() => adapter.buildServerSideUrl({} as AdapterParams, {} as ServerSideOverlay)).toThrow();
  });
});
