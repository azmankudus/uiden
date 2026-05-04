import { createSignal } from "solid-js";

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
}

export interface ManagedGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

export interface ManagedApp {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  userCount: number;
  roles: string[];
}

export interface AuthProvider {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  userCount: number;
  lastSync: string;
}

const [users, setUsers] = createSignal<ManagedUser[]>([
  { id: "1", name: "Administrator", email: "admin@kentut.io", role: "Admin", status: "active", lastLogin: "2025-04-30 09:12" },
  { id: "2", name: "Sarah Director", email: "director@kentut.io", role: "Director", status: "active", lastLogin: "2025-04-29 14:30" },
  { id: "3", name: "Mike Manager", email: "manager@kentut.io", role: "Manager", status: "active", lastLogin: "2025-04-28 11:45" },
  { id: "4", name: "Jane Staff", email: "staff@kentut.io", role: "Staff", status: "inactive", lastLogin: "2025-03-15 08:00" },
  { id: "5", name: "Audit Bot", email: "auditor@kentut.io", role: "Auditor", status: "suspended", lastLogin: "2025-04-01 16:22" },
]);

const [groups, setGroups] = createSignal<ManagedGroup[]>([
  { id: "1", name: "Administrators", description: "Full system access", memberCount: 2 },
  { id: "2", name: "Managers", description: "Manage teams and reports", memberCount: 5 },
  { id: "3", name: "Staff", description: "Standard operational access", memberCount: 23 },
  { id: "4", name: "Auditors", description: "Read-only compliance access", memberCount: 3 },
]);

const [managedApps, setManagedApps] = createSignal<ManagedApp[]>([
  { id: "1", name: "Dashboard", slug: "dashboard", enabled: true, userCount: 30, roles: ["Admin", "Director"] },
  { id: "2", name: "HR Portal", slug: "hr-portal", enabled: true, userCount: 25, roles: ["Admin", "Manager", "Staff"] },
  { id: "3", name: "Finance", slug: "finance", enabled: true, userCount: 10, roles: ["Admin", "Director"] },
  { id: "4", name: "Reports", slug: "reports", enabled: false, userCount: 0, roles: ["Admin"] },
  { id: "5", name: "Audit Log", slug: "audit-log", enabled: true, userCount: 5, roles: ["Admin", "Auditor"] },
]);

const [authProviders, setAuthProviders] = createSignal<AuthProvider[]>([
  { id: "1", name: "Local Authentication", type: "Local", enabled: true, userCount: 30, lastSync: "Always active" },
  { id: "2", name: "Active Directory / LDAP", type: "LDAP", enabled: true, userCount: 12, lastSync: "2025-04-30 08:00" },
  { id: "3", name: "Google Workspace SSO", type: "OAuth 2.0", enabled: false, userCount: 0, lastSync: "Never" },
  { id: "4", name: "Microsoft Entra ID", type: "SAML 2.0", enabled: false, userCount: 0, lastSync: "Never" },
]);

export const ManagementStore = {
  users,
  setUsers,
  groups,
  setGroups,
  managedApps,
  setManagedApps,
  authProviders,
  setAuthProviders,
  toggleApp: (id: string) => {
    setManagedApps(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  },
  toggleProvider: (id: string) => {
    setAuthProviders(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  },
  deleteUser: (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  },
  deleteGroup: (id: string) => {
    setGroups(prev => prev.filter(g => g.id !== id));
  },
};
