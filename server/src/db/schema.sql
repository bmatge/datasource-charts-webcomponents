-- gouv-widgets SQLite schema v1

-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor',  -- admin | editor | viewer
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Groups
CREATE TABLE IF NOT EXISTS groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS group_members (
  group_id TEXT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',  -- admin | member
  PRIMARY KEY (group_id, user_id)
);

-- Sources
CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,  -- grist | api | manual
  config_json TEXT NOT NULL,
  data_json TEXT,
  record_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Connections
CREATE TABLE IF NOT EXISTS connections (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,  -- grist | api
  config_json TEXT NOT NULL,
  api_key_encrypted TEXT,
  status TEXT DEFAULT 'unknown',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  chart_type TEXT,
  code TEXT NOT NULL,
  builder_state_json TEXT,
  source_app TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Dashboards
CREATE TABLE IF NOT EXISTS dashboards (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  layout_json TEXT NOT NULL,
  widgets_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Sharing (polymorphic)
CREATE TABLE IF NOT EXISTS shares (
  id TEXT PRIMARY KEY,
  resource_type TEXT NOT NULL,  -- source | connection | favorite | dashboard
  resource_id TEXT NOT NULL,
  target_type TEXT NOT NULL,  -- user | group | global
  target_id TEXT,  -- user_id or group_id (NULL if global)
  permission TEXT NOT NULL DEFAULT 'read',  -- read | write
  granted_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(resource_type, resource_id, target_type, target_id)
);

-- Data cache (API fallback)
CREATE TABLE IF NOT EXISTS data_cache (
  source_id TEXT NOT NULL PRIMARY KEY,
  data_json TEXT NOT NULL,
  data_hash TEXT,
  record_count INTEGER DEFAULT 0,
  fetched_at TEXT NOT NULL DEFAULT (datetime('now')),
  ttl_seconds INTEGER DEFAULT 3600
);

-- Monitoring (centralized, replaces beacon logs)
CREATE TABLE IF NOT EXISTS monitoring (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  component TEXT NOT NULL,
  chart_type TEXT,
  origin TEXT NOT NULL,
  first_seen TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen TEXT NOT NULL DEFAULT (datetime('now')),
  call_count INTEGER DEFAULT 1,
  UNIQUE(component, chart_type, origin)
);

-- Schema version (for future migrations)
CREATE TABLE IF NOT EXISTS schema_version (
  version INTEGER PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);
INSERT OR IGNORE INTO schema_version (version) VALUES (1);
