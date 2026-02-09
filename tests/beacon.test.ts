import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Tests for the beacon utility.
 *
 * Since the module uses a module-level `sent` Set for deduplication,
 * we re-import the module for each test to get a fresh Set.
 */
describe('sendWidgetBeacon', () => {
  let originalFetch: typeof globalThis.fetch;
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    fetchSpy = vi.fn().mockResolvedValue(new Response());
    globalThis.fetch = fetchSpy;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
    vi.resetModules();
  });

  async function loadBeacon() {
    const mod = await import('../src/utils/beacon.js');
    return mod.sendWidgetBeacon;
  }

  it('skips on localhost', async () => {
    // jsdom defaults to localhost
    const sendWidgetBeacon = await loadBeacon();
    sendWidgetBeacon('gouv-kpi');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('skips on 127.0.0.1', async () => {
    const originalLocation = window.location.hostname;
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: '127.0.0.1' },
      writable: true,
    });

    const sendWidgetBeacon = await loadBeacon();
    sendWidgetBeacon('gouv-kpi');
    expect(fetchSpy).not.toHaveBeenCalled();

    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: originalLocation },
      writable: true,
    });
  });

  it('skips on chartsbuilder.matge.com', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'chartsbuilder.matge.com' },
      writable: true,
    });

    const sendWidgetBeacon = await loadBeacon();
    sendWidgetBeacon('gouv-kpi');
    expect(fetchSpy).not.toHaveBeenCalled();

    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'localhost' },
      writable: true,
    });
  });

  it('sends beacon on external host', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'example.gouv.fr' },
      writable: true,
    });

    const sendWidgetBeacon = await loadBeacon();
    sendWidgetBeacon('gouv-kpi');

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const url = fetchSpy.mock.calls[0][0] as string;
    expect(url).toContain('/beacon');
    expect(url).toContain('c=gouv-kpi');

    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'localhost' },
      writable: true,
    });
  });

  it('includes subtype in beacon URL', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'example.gouv.fr' },
      writable: true,
    });

    const sendWidgetBeacon = await loadBeacon();
    sendWidgetBeacon('gouv-dsfr-chart', 'bar');

    const url = fetchSpy.mock.calls[0][0] as string;
    expect(url).toContain('c=gouv-dsfr-chart');
    expect(url).toContain('t=bar');

    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'localhost' },
      writable: true,
    });
  });

  it('deduplicates by component+type', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'example.gouv.fr' },
      writable: true,
    });

    const sendWidgetBeacon = await loadBeacon();
    sendWidgetBeacon('gouv-kpi');
    sendWidgetBeacon('gouv-kpi');
    sendWidgetBeacon('gouv-kpi');

    expect(fetchSpy).toHaveBeenCalledTimes(1);

    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'localhost' },
      writable: true,
    });
  });

  it('sends separate beacons for different components', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'example.gouv.fr' },
      writable: true,
    });

    const sendWidgetBeacon = await loadBeacon();
    sendWidgetBeacon('gouv-kpi');
    sendWidgetBeacon('gouv-datalist');

    expect(fetchSpy).toHaveBeenCalledTimes(2);

    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'localhost' },
      writable: true,
    });
  });

  it('sends separate beacons for same component with different subtypes', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'example.gouv.fr' },
      writable: true,
    });

    const sendWidgetBeacon = await loadBeacon();
    sendWidgetBeacon('gouv-dsfr-chart', 'bar');
    sendWidgetBeacon('gouv-dsfr-chart', 'line');

    expect(fetchSpy).toHaveBeenCalledTimes(2);

    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'localhost' },
      writable: true,
    });
  });

  it('uses no-cors mode', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'example.gouv.fr' },
      writable: true,
    });

    const sendWidgetBeacon = await loadBeacon();
    sendWidgetBeacon('gouv-kpi');

    const options = fetchSpy.mock.calls[0][1];
    expect(options.mode).toBe('no-cors');
    expect(options.method).toBe('GET');
    expect(options.keepalive).toBe(true);

    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'localhost' },
      writable: true,
    });
  });
});
