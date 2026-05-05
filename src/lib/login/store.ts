import { createSignal } from "solid-js";

const now = () => new Date().toISOString().replace("T", " ").slice(0, 19);
const nextId = (arr: { id: string }[]) => String(Math.max(0, ...arr.map(a => Number(a.id))) + 1);

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface ManagedGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
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
  { id: "1", name: "Administrator", email: "admin@kentut.io", role: "Admin", status: "active", lastLogin: "2025-04-30 09:12", createdBy: "system", createdAt: "2025-01-15 08:00", updatedBy: "admin", updatedAt: "2025-04-30 09:12" },
  { id: "2", name: "Sarah Director", email: "director@kentut.io", role: "Director", status: "active", lastLogin: "2025-04-29 14:30", createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-04-29 14:30" },
  { id: "3", name: "Mike Manager", email: "manager@kentut.io", role: "Manager", status: "active", lastLogin: "2025-04-28 11:45", createdBy: "admin", createdAt: "2025-01-22 09:30", updatedBy: "admin", updatedAt: "2025-03-15 16:00" },
  { id: "4", name: "Jane Staff", email: "staff@kentut.io", role: "Staff", status: "inactive", lastLogin: "2025-03-15 08:00", createdBy: "admin", createdAt: "2025-02-01 14:00", updatedBy: "admin", updatedAt: "2025-03-15 08:00" },
  { id: "5", name: "Audit Bot", email: "auditor@kentut.io", role: "Auditor", status: "suspended", lastLogin: "2025-04-01 16:22", createdBy: "admin", createdAt: "2025-02-10 11:00", updatedBy: "admin", updatedAt: "2025-04-01 16:22" },
]);

const [groups, setGroups] = createSignal<ManagedGroup[]>([
  { id: "1", name: "Administrators", description: "Full system access", memberCount: 2, createdBy: "system", createdAt: "2025-01-15 08:00", updatedBy: "admin", updatedAt: "2025-02-10 09:00" },
  { id: "2", name: "Managers", description: "Manage teams and reports", memberCount: 5, createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-03-01 12:00" },
  { id: "3", name: "Staff", description: "Standard operational access", memberCount: 23, createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-04-15 11:00" },
  { id: "4", name: "Auditors", description: "Read-only compliance access", memberCount: 3, createdBy: "admin", createdAt: "2025-02-10 11:00", updatedBy: "admin", updatedAt: "2025-04-01 16:00" },
]);

const [authProviders, setAuthProviders] = createSignal<AuthProvider[]>([
  { id: "1", name: "Local Authentication", type: "Local", enabled: true, userCount: 30, lastSync: "Always active", createdBy: "system", createdAt: "2025-01-15 08:00", updatedBy: "admin", updatedAt: "2025-04-30 08:00" },
  { id: "2", name: "Active Directory / LDAP", type: "LDAP", enabled: true, userCount: 12, lastSync: "2025-04-30 08:00", createdBy: "admin", createdAt: "2025-01-20 10:00", updatedBy: "admin", updatedAt: "2025-04-30 08:00" },
  { id: "3", name: "Google Workspace SSO", type: "OAuth 2.0", enabled: false, userCount: 0, lastSync: "Never", createdBy: "admin", createdAt: "2025-02-15 14:00", updatedBy: "admin", updatedAt: "2025-02-15 14:00" },
  { id: "4", name: "Microsoft Entra ID", type: "SAML 2.0", enabled: false, userCount: 0, lastSync: "Never", createdBy: "admin", createdAt: "2025-02-15 14:00", updatedBy: "admin", updatedAt: "2025-02-15 14:00" },
]);

const ACTIONS = ["Read", "Write", "Delete", "Update"] as const;
const DEFAULT_RESOURCES = ["Dashboard", "HR Portal", "Finance", "Reports", "Audit Log"];

const [permRoles, setPermRoles] = createSignal<string[]>(["Admin", "Director", "Manager", "Staff", "Auditor"]);
const [permResources, setPermResources] = createSignal<string[]>([...DEFAULT_RESOURCES]);
const [permMatrix, setPermMatrix] = createSignal<Record<string, Record<string, Record<string, boolean>>>>({
  Admin: Object.fromEntries(DEFAULT_RESOURCES.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, true]))])),
  Director: Object.fromEntries(DEFAULT_RESOURCES.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, a === "Read" || a === "Update"]))])),
  Manager: Object.fromEntries(DEFAULT_RESOURCES.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, a === "Read" || a === "Write"]))])),
  Staff: Object.fromEntries(DEFAULT_RESOURCES.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, a === "Read"]))])),
  Auditor: Object.fromEntries(DEFAULT_RESOURCES.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, a === "Read"]))])),
});

export const ManagementStore = {
  users, groups, authProviders,
  permRoles, permResources, permMatrix,
  ACTIONS,

  addUser: (name: string, email: string, role: string, by: string) => {
    setUsers(prev => [...prev, {
      id: nextId(prev), name, email, role, status: "active" as const, lastLogin: now(),
      createdBy: by, createdAt: now(), updatedBy: by, updatedAt: now(),
    }]);
  },
  editUser: (id: string, name: string, email: string, role: string, status: "active" | "inactive" | "suspended", by: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, name, email, role, status, updatedBy: by, updatedAt: now() } : u));
  },
  deleteUser: (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  },

  addGroup: (name: string, description: string, by: string) => {
    setGroups(prev => [...prev, {
      id: nextId(prev), name, description, memberCount: 0,
      createdBy: by, createdAt: now(), updatedBy: by, updatedAt: now(),
    }]);
  },
  editGroup: (id: string, name: string, description: string, by: string) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, name, description, updatedBy: by, updatedAt: now() } : g));
  },
  deleteGroup: (id: string) => {
    setGroups(prev => prev.filter(g => g.id !== id));
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

  addPermRole: (role: string) => {
    setPermRoles(prev => [...prev, role]);
    setPermMatrix(prev => ({
      ...prev,
      [role]: Object.fromEntries(permResources().map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, false]))])),
    }));
  },
  deletePermRole: (role: string) => {
    setPermRoles(prev => prev.filter(r => r !== role));
    setPermMatrix(prev => { const next = { ...prev }; delete next[role]; return next; });
  },
  addPermResource: (resource: string) => {
    setPermResources(prev => [...prev, resource]);
    setPermMatrix(prev => {
      const next = { ...prev };
      for (const role of Object.keys(next)) {
        next[role] = { ...next[role], [resource]: Object.fromEntries(ACTIONS.map(a => [a, false])) };
      }
      return next;
    });
  },
  deletePermResource: (resource: string) => {
    setPermResources(prev => prev.filter(r => r !== resource));
    setPermMatrix(prev => {
      const next = { ...prev };
      for (const role of Object.keys(next)) {
        const roleEntry = { ...next[role] };
        delete roleEntry[resource];
        next[role] = roleEntry;
      }
      return next;
    });
  },
  togglePerm: (role: string, resource: string, action: string) => {
    setPermMatrix(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [resource]: {
          ...prev[role]?.[resource],
          [action]: !prev[role]?.[resource]?.[action],
        },
      },
    }));
  },
};
