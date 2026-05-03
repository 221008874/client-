// ─── ADMIN PANEL COLLECTION NAMESPACES ─────────────────────────────────────
// This file exists ONLY in the Admin Panel codebase.
// Community App has its own separate collections.js with COMM_* constants.

export const COLLECTIONS = {
  // SaaS Admin scope (admin panel only)
  TENANTS: "saas_tenants",
  DOCTORS: "saas_doctors",
  LICENSES: "saas_licenses",
  SETTINGS: "saas_settings",
  
  // Cross-service audit (admin read-only)
  AUDIT_EVENTS: "saas_audit_events",
  INVALID_REPORTS: "invalid_reports",
  
  // Sync infrastructure (admin monitors, doesn't write directly)
  SYNC_QUEUE: "sync_queue",
  SERVERS: "clinic_servers",
};

// ─── Helper: Validate collection name is allowed for admin ─────────────────
export function isAdminCollection(name) {
  return Object.values(COLLECTIONS).includes(name);
}