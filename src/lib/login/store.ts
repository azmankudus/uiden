import { createSignal } from "solid-js";

const now = () => new Date().toISOString().replace("T", " ").slice(0, 19);
const nextId = (arr: { id: string }[]) => String(Math.max(0, ...arr.map(a => Number(a.id))) + 1);

export interface ManagedUser {
  id: string;
  fullName: string;
  description: string;
  email: string;
  provider: string;
  status: "active" | "locked";
  roleIds: string[];
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface ManagedRole {
  id: string;
  name: string;
  description: string;
  permissionIds: string[];
  memberCount: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface ManagedPermission {
  id: string;
  name: string;
  description: string;
  scope: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface LocalLogin {
  id: string;
  username: string;
  email: string;
  fullName: string;
  status: "active" | "locked";
  lastLogin: string;
  lastPasswordChange: string;
  userId: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface AuthProvider {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  userCount: number;
  lastSync: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

const [users, setUsers] = createSignal<ManagedUser[]>([
  { id: "1", fullName: "Administrator", description: "System administrator", email: "admin@kentut.io", provider: "Local", status: "active", roleIds: ["1"], createdBy: "system", createdAt: "2025-01-15 08:00", updatedBy: "admin", updatedAt: "2025-04-30 09:12" },
  { id: "2", fullName: "Sarah Director", description: "Director of operations", email: "director@kentut.io", provider: "LDAP", status: "active", roleIds: ["2"], createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-04-29 14:30" },
  { id: "3", fullName: "Mike Manager", description: "Team manager", email: "manager@kentut.io", provider: "LDAP", status: "active", roleIds: ["3"], createdBy: "admin", createdAt: "2025-01-22 09:30", updatedBy: "admin", updatedAt: "2025-03-15 16:00" },
  { id: "4", fullName: "Jane Staff", description: "Staff member", email: "staff@kentut.io", provider: "Local", status: "active", roleIds: ["4"], createdBy: "admin", createdAt: "2025-02-01 14:00", updatedBy: "admin", updatedAt: "2025-03-15 08:00" },
  { id: "5", fullName: "Audit Bot", description: "Automated auditor", email: "auditor@kentut.io", provider: "Local", status: "locked", roleIds: ["5"], createdBy: "admin", createdAt: "2025-02-10 11:00", updatedBy: "admin", updatedAt: "2025-04-01 16:22" },
]);

const [roles, setRoles] = createSignal<ManagedRole[]>([
  { id: "1", name: "Administrators", description: "Full system access", permissionIds: ["1", "2", "3", "4", "5"], memberCount: 2, createdBy: "system", createdAt: "2025-01-15 08:00", updatedBy: "admin", updatedAt: "2025-02-10 09:00" },
  { id: "2", name: "Directors", description: "Read and update all resources", permissionIds: ["1", "2", "3", "4", "5"], memberCount: 1, createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-03-01 12:00" },
  { id: "3", name: "Managers", description: "Manage teams and reports", permissionIds: ["1", "2", "3"], memberCount: 5, createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-04-15 11:00" },
  { id: "4", name: "Staff", description: "Standard operational access", permissionIds: ["1", "2"], memberCount: 23, createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-04-15 11:00" },
  { id: "5", name: "Auditors", description: "Read-only compliance access", permissionIds: ["1", "2", "3", "4", "5"], memberCount: 3, createdBy: "admin", createdAt: "2025-02-10 11:00", updatedBy: "admin", updatedAt: "2025-04-01 16:00" },
]);

const [permissions, setPermissions] = createSignal<ManagedPermission[]>([
  { id: "1", name: "View Dashboard", description: "Access to main dashboard", scope: "Dashboard", canRead: true, canCreate: false, canUpdate: false, canDelete: false, createdBy: "system", createdAt: "2025-01-15 08:00", updatedBy: "admin", updatedAt: "2025-02-10 09:00" },
  { id: "2", name: "Manage HR", description: "HR portal access", scope: "HR Portal", canRead: true, canCreate: true, canUpdate: true, canDelete: false, createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-03-01 12:00" },
  { id: "3", name: "Finance Access", description: "Financial data access", scope: "Finance", canRead: true, canCreate: true, canUpdate: true, canDelete: true, createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-04-15 11:00" },
  { id: "4", name: "View Reports", description: "Access to reports module", scope: "Reports", canRead: true, canCreate: false, canUpdate: false, canDelete: false, createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-04-15 11:00" },
  { id: "5", name: "Audit Log", description: "View audit logs", scope: "Audit Log", canRead: true, canCreate: false, canUpdate: false, canDelete: false, createdBy: "admin", createdAt: "2025-02-10 11:00", updatedBy: "admin", updatedAt: "2025-04-01 16:00" },
]);

const [localLogins, setLocalLogins] = createSignal<LocalLogin[]>([
  { id: "1", username: "admin", email: "admin@kentut.io", fullName: "Administrator", status: "active", lastLogin: "2025-04-30 09:12", lastPasswordChange: "2025-04-01 08:00", userId: "1", createdBy: "system", createdAt: "2025-01-15 08:00", updatedBy: "admin", updatedAt: "2025-04-30 09:12" },
  { id: "2", username: "jstaff", email: "staff@kentut.io", fullName: "Jane Staff", status: "active", lastLogin: "2025-03-15 08:00", lastPasswordChange: "2025-02-01 14:00", userId: "4", createdBy: "admin", createdAt: "2025-02-01 14:00", updatedBy: "admin", updatedAt: "2025-03-15 08:00" },
  { id: "3", username: "auditor", email: "auditor@kentut.io", fullName: "Audit Bot", status: "locked", lastLogin: "2025-04-01 16:22", lastPasswordChange: "2025-03-01 10:00", userId: "5", createdBy: "admin", createdAt: "2025-02-10 11:00", updatedBy: "admin", updatedAt: "2025-04-01 16:22" },
]);

const [authProviders, setAuthProviders] = createSignal<AuthProvider[]>([
  { id: "1", name: "Local Authentication", type: "Local", enabled: true, userCount: 30, lastSync: "Always active", createdBy: "system", createdAt: "2025-01-15 08:00", updatedBy: "admin", updatedAt: "2025-04-30 08:00" },
  { id: "2", name: "Active Directory / LDAP", type: "LDAP", enabled: true, userCount: 12, lastSync: "2025-04-30 08:00", createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-04-30 08:00" },
  { id: "3", name: "Google Workspace SSO", type: "OAuth 2.0", enabled: false, userCount: 0, lastSync: "Never", createdBy: "admin", createdAt: "2025-02-15 14:00", updatedBy: "admin", updatedAt: "2025-02-15 14:00" },
  { id: "4", name: "Microsoft Entra ID", type: "SAML 2.0", enabled: false, userCount: 0, lastSync: "Never", createdBy: "admin", createdAt: "2025-02-15 14:00", updatedBy: "admin", updatedAt: "2025-02-15 14:00" },
]);

export const ManagementStore = {
  users, roles, permissions, localLogins, authProviders,

  addUser: (fullName: string, description: string, email: string, provider: string, roleIds: string[], by: string) => {
    setUsers(prev => [...prev, {
      id: nextId(prev), fullName, description, email, provider, status: "active" as const, roleIds,
      createdBy: by, createdAt: now(), updatedBy: by, updatedAt: now(),
    }]);
  },
  editUser: (id: string, fullName: string, description: string, email: string, provider: string, status: "active" | "locked", roleIds: string[], by: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, fullName, description, email, provider, status, roleIds, updatedBy: by, updatedAt: now() } : u));
  },
  deleteUser: (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  },

  addRole: (name: string, description: string, permissionIds: string[], by: string) => {
    setRoles(prev => [...prev, {
      id: nextId(prev), name, description, permissionIds, memberCount: 0,
      createdBy: by, createdAt: now(), updatedBy: by, updatedAt: now(),
    }]);
  },
  editRole: (id: string, name: string, description: string, permissionIds: string[], by: string) => {
    setRoles(prev => prev.map(r => r.id === id ? { ...r, name, description, permissionIds, updatedBy: by, updatedAt: now() } : r));
  },
  deleteRole: (id: string) => {
    setRoles(prev => prev.filter(r => r.id !== id));
  },

  addPermission: (name: string, description: string, scope: string, canRead: boolean, canCreate: boolean, canUpdate: boolean, canDelete: boolean, by: string) => {
    setPermissions(prev => [...prev, {
      id: nextId(prev), name, description, scope, canRead, canCreate, canUpdate, canDelete,
      createdBy: by, createdAt: now(), updatedBy: by, updatedAt: now(),
    }]);
  },
  editPermission: (id: string, name: string, description: string, scope: string, canRead: boolean, canCreate: boolean, canUpdate: boolean, canDelete: boolean, by: string) => {
    setPermissions(prev => prev.map(p => p.id === id ? { ...p, name, description, scope, canRead, canCreate, canUpdate, canDelete, updatedBy: by, updatedAt: now() } : p));
  },
  deletePermission: (id: string) => {
    setPermissions(prev => prev.filter(p => p.id !== id));
  },

  addLocalLogin: (username: string, email: string, fullName: string, password: string, by: string) => {
    setLocalLogins(prev => [...prev, {
      id: nextId(prev), username, email, fullName, status: "active" as const,
      lastLogin: now(), lastPasswordChange: now(), userId: "",
      createdBy: by, createdAt: now(), updatedBy: by, updatedAt: now(),
    }]);
  },
  editLocalLogin: (id: string, username: string, email: string, fullName: string, by: string) => {
    setLocalLogins(prev => prev.map(l => l.id === id ? { ...l, username, email, fullName, updatedBy: by, updatedAt: now() } : l));
  },
  deleteLocalLogin: (id: string) => {
    setLocalLogins(prev => prev.filter(l => l.id !== id));
  },
  toggleLocalLoginStatus: (id: string, by: string) => {
    setLocalLogins(prev => prev.map(l => l.id === id ? { ...l, status: (l.status === "active" ? "locked" : "active") as "active" | "locked", updatedBy: by, updatedAt: now() } : l));
  },

  addProvider: (name: string, type: string, by: string) => {
    setAuthProviders(prev => [...prev, {
      id: nextId(prev), name, type, enabled: false, userCount: 0, lastSync: "Never",
      createdBy: by, createdAt: now(), updatedBy: by, updatedAt: now(),
    }]);
  },
  editProvider: (id: string, name: string, type: string, by: string) => {
    setAuthProviders(prev => prev.map(p => p.id === id ? { ...p, name, type, updatedBy: by, updatedAt: now() } : p));
  },
  deleteProvider: (id: string) => {
    setAuthProviders(prev => prev.filter(p => p.id !== id));
  },
  toggleProvider: (id: string, by: string) => {
    setAuthProviders(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled, updatedBy: by, updatedAt: now() } : p));
  },
};
