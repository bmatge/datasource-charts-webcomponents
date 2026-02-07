// Utils
export { escapeHtml } from './utils/escape-html.js';
export { formatKPIValue, formatDateShort } from './utils/formatters.js';
export { toNumber, looksLikeNumber } from './utils/number-parser.js';
export { isValidDeptCode } from './utils/dept-codes.js';

// Constants
export { DSFR_COLORS, PALETTE_PRIMARY_COLOR, PALETTE_COLORS } from './constants/dsfr-palettes.js';
export type { PaletteType } from './constants/dsfr-palettes.js';

// API / Proxy
export { getProxyConfig, isViteDevMode, isTauriMode, DEFAULT_PROXY_CONFIG } from './api/proxy-config.js';
export type { ProxyConfig } from './api/proxy-config.js';
export { getProxyUrl, getProxiedUrl, getExternalProxyUrl } from './api/proxy.js';

// Storage
export { loadFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from './storage/local-storage.js';

// UI
export { openModal, closeModal, setupModalOverlayClose } from './ui/modal.js';
