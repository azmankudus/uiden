import type { ManagedUser, ManagedGroup, RolePermission, AuthProvider, ManagedApp } from "~/lib/common/types";

export const MOCK_USERS: ManagedUser[] = [
  { id: "u1", username: "admin", email: "admin@kentut.superapp", displayName: "Administrator", role: "Admin", status: "active", appCount: 27, createdAt: "2024-01-01", lastLoginAt: "2025-04-30" },
  { id: "u2", username: "director", email: "director@kentut.superapp", displayName: "Director", role: "Director", status: "active", appCount: 15, createdAt: "2024-01-15", lastLoginAt: "2025-04-29" },
  { id: "u3", username: "manager", email: "manager@kentut.superapp", displayName: "Manager", role: "Manager", status: "active", appCount: 10, createdAt: "2024-02-01", lastLoginAt: "2025-04-28" },
  { id: "u4", username: "staff", email: "staff@kentut.superapp", displayName: "Staff", role: "Staff", status: "active", appCount: 5, createdAt: "2024-03-01", lastLoginAt: "2025-04-27" },
  { id: "u5", username: "auditor", email: "auditor@kentut.superapp", displayName: "Auditor", role: "Auditor", status: "active", appCount: 20, createdAt: "2024-03-15", lastLoginAt: "2025-04-25" },
  { id: "u6", username: "guest", email: "guest@kentut.superapp", displayName: "Guest User", role: "Guest", status: "inactive", appCount: 2, createdAt: "2024-04-01", lastLoginAt: null },
  { id: "u7", username: "contractor", email: "contractor@external.com", displayName: "Contractor", role: "Staff", status: "suspended", appCount: 3, createdAt: "2024-05-01", lastLoginAt: "2025-03-15" },
];

export const MOCK_GROUPS: ManagedGroup[] = [
  { id: "g1", name: "Infrastructure Team", description: "Full access to infra management tools", users: ["u1", "u2", "u3"], createdAt: "2024-01-01" },
  { id: "g2", name: "Security Team", description: "Access to security and compliance tools", users: ["u1", "u5"], createdAt: "2024-01-15" },
  { id: "g3", name: "Developers", description: "Access to development and deployment tools", users: ["u3", "u4"], createdAt: "2024-02-01" },
  { id: "g4", name: "Read Only", description: "View-only access across all apps", users: ["u6"], createdAt: "2024-03-01" },
];

export const MOCK_PERMISSIONS: RolePermission[] = [
  { role: "Admin", resource: "users", permissions: { read: true, write: true, delete: true, update: true } },
  { role: "Admin", resource: "groups", permissions: { read: true, write: true, delete: true, update: true } },
  { role: "Admin", resource: "settings", permissions: { read: true, write: true, delete: true, update: true } },
  { role: "Admin", resource: "apps", permissions: { read: true, write: true, delete: true, update: true } },
  { role: "Director", resource: "users", permissions: { read: true, write: false, delete: false, update: true } },
  { role: "Director", resource: "groups", permissions: { read: true, write: true, delete: false, update: true } },
  { role: "Director", resource: "settings", permissions: { read: true, write: false, delete: false, update: false } },
  { role: "Director", resource: "apps", permissions: { read: true, write: true, delete: false, update: true } },
  { role: "Manager", resource: "users", permissions: { read: true, write: false, delete: false, update: true } },
  { role: "Manager", resource: "groups", permissions: { read: true, write: false, delete: false, update: false } },
  { role: "Manager", resource: "settings", permissions: { read: true, write: false, delete: false, update: false } },
  { role: "Manager", resource: "apps", permissions: { read: true, write: true, delete: false, update: true } },
  { role: "Staff", resource: "users", permissions: { read: false, write: false, delete: false, update: false } },
  { role: "Staff", resource: "groups", permissions: { read: false, write: false, delete: false, update: false } },
  { role: "Staff", resource: "settings", permissions: { read: false, write: false, delete: false, update: false } },
  { role: "Staff", resource: "apps", permissions: { read: true, write: false, delete: false, update: false } },
];

export const MOCK_AUTH_PROVIDERS: AuthProvider[] = [
  { id: "p1", name: "Microsoft Entra ID", type: "SAML 2.0", enabled: true, userCount: 3, lastSync: "2025-04-30T10:00:00Z" },
  { id: "p2", name: "GitHub OAuth", type: "OIDC", enabled: true, userCount: 2, lastSync: "2025-04-29T15:00:00Z" },
  { id: "p3", name: "Okta", type: "SAML 2.0", enabled: false, userCount: 0, lastSync: null },
  { id: "p4", name: "Local Database", type: "Internal", enabled: true, userCount: 7, lastSync: null },
];

export const MOCK_MANAGED_APPS: ManagedApp[] = [
  { id: "a1", name: "Share-Insight", slug: "share-insight", enabled: true, userCount: 5, roleAccess: ["Admin", "Director", "Auditor"] },
  { id: "a2", name: "Base-Insight", slug: "base-insight", enabled: true, userCount: 4, roleAccess: ["Admin", "Director"] },
  { id: "a3", name: "Middle-Hub", slug: "middle-hub", enabled: true, userCount: 3, roleAccess: ["Admin", "Manager"] },
  { id: "a4", name: "Web-Hub", slug: "web-hub", enabled: true, userCount: 4, roleAccess: ["Admin", "Director", "Manager"] },
  { id: "a5", name: "Cert-Hub", slug: "cert-hub", enabled: true, userCount: 6, roleAccess: ["Admin", "Director", "Manager", "Staff"] },
  { id: "a6", name: "Auto-Hub", slug: "auto-hub", enabled: false, userCount: 2, roleAccess: ["Admin"] },
  { id: "a7", name: "Software-Hub", slug: "software-hub", enabled: true, userCount: 5, roleAccess: ["Admin", "Manager"] },
  { id: "a8", name: "DR-Hub", slug: "dr-hub", enabled: true, userCount: 3, roleAccess: ["Admin", "Director"] },
];
