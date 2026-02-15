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
export { fetchWithTimeout, httpErrorMessage } from './api/fetch-helpers.js';

// Storage
export { loadFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from './storage/local-storage.js';

// Storage adapter (async API — supports localStorage and remote backends)
export type { StorageAdapter } from './storage/storage-adapter.js';
export { LocalStorageAdapter } from './storage/storage-adapter.js';
export { ApiStorageAdapter } from './storage/api-storage-adapter.js';
export { setStorageAdapter, getStorageAdapter, loadData, saveData, removeData } from './storage/storage-provider.js';

// Auth
export type { User, AuthState, LoginRequest, RegisterRequest, ShareTarget, ShareInfo } from './auth/auth-types.js';
export {
  setAuthBaseUrl, isDbMode, checkAuth, login, register, logout,
  onAuthChange, getAuthState, getUser, isAuthenticated,
} from './auth/auth-service.js';

// UI
export { openModal, closeModal, setupModalOverlayClose, confirmDialog } from './ui/modal.js';
export { showToast, toastSuccess, toastError, toastWarning, toastInfo } from './ui/toast.js';
export { appHref, navigateTo } from './ui/navigation.js';
