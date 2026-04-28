import type { ManagedUser, User, Group, RolePermission, AuthProviderConfig } from "./types";
import { STORE_KEY } from "./constants";
import {
  SEED_USERS,
  SEED_GROUPS,
  getDefaultRolePermissions,
  getDefaultAuthProviders,
} from "./mock-data";

function lsGet<T>(subKey: string, fallback: T): T {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`${STORE_KEY}_${subKey}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet(subKey: string, data: unknown) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(`${STORE_KEY}_${subKey}`, JSON.stringify(data));
}

export function isInitialized(): boolean {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem(`${STORE_KEY}_init`) === "true";
}

export function initializeStore() {
  if (isInitialized()) return;
  saveUsers(SEED_USERS);
  saveGroups(SEED_GROUPS);
  saveRolePermissions(getDefaultRolePermissions());
  saveAuthProviders(getDefaultAuthProviders());
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(`${STORE_KEY}_init`, "true");
  }
}

export function getUsers(): ManagedUser[] {
  return lsGet<ManagedUser[]>("users", SEED_USERS);
}

export function saveUsers(users: ManagedUser[]) {
  lsSet("users", users);
}

export function getGroups(): Group[] {
  return lsGet<Group[]>("groups", SEED_GROUPS);
}

export function saveGroups(groups: Group[]) {
  lsSet("groups", groups);
}

export function getRolePermissions(): RolePermission[] {
  return lsGet<RolePermission[]>("perms", getDefaultRolePermissions());
}

export function saveRolePermissions(perms: RolePermission[]) {
  lsSet("perms", perms);
}

export function getAuthProviders(): AuthProviderConfig[] {
  return lsGet<AuthProviderConfig[]>("auth", getDefaultAuthProviders());
}

export function saveAuthProviders(providers: AuthProviderConfig[]) {
  lsSet("auth", providers);
}

export function resetStore() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(`${STORE_KEY}_init`);
  localStorage.removeItem(`${STORE_KEY}_users`);
  localStorage.removeItem(`${STORE_KEY}_groups`);
  localStorage.removeItem(`${STORE_KEY}_perms`);
  localStorage.removeItem(`${STORE_KEY}_auth`);
}

// Unified store object for components
export const MANAGEMENT_STORE = {
  // User operations
  getAllUsers: getUsers,
  getUser: (id: string) => getUsers().find(u => u.id === id),
  createUser: (userData: Omit<User, "id" | "createdAt" | "lastLoginAt">) => {
    const users = getUsers();
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastLoginAt: null,
    };
    saveUsers([...users, newUser]);
    return newUser;
  },
  updateUser: (id: string, userData: Partial<Omit<User, "id" | "createdAt" | "lastLoginAt">>) => {
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    const updated = { ...users[index], ...userData, id };
    users[index] = updated;
    saveUsers(users);
    return updated;
  },
  deleteUser: (id: string) => {
    const users = getUsers();
    const filtered = users.filter(u => u.id !== id);
    if (filtered.length === users.length) return false;
    saveUsers(filtered);
    return true;
  },

  // Group operations
  getAllGroups: getGroups,
  getGroup: (id: string) => getGroups().find(g => g.id === id),
  createGroup: (groupData: Omit<Group, "id" | "createdAt">) => {
    const groups = getGroups();
    const newGroup: Group = {
      ...groupData,
      id: `group_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    saveGroups([...groups, newGroup]);
    return newGroup;
  },
  updateGroup: (id: string, groupData: Partial<Omit<Group, "id" | "createdAt">>) => {
    const groups = getGroups();
    const index = groups.findIndex(g => g.id === id);
    if (index === -1) return null;
    const updated = { ...groups[index], ...groupData, id };
    groups[index] = updated;
    saveGroups(groups);
    return updated;
  },
  deleteGroup: (id: string) => {
    const groups = getGroups();
    const filtered = groups.filter(g => g.id !== id);
    if (filtered.length === groups.length) return false;
    saveGroups(filtered);
    return true;
  },

  // Permission operations
  getAllRolePermissions: getRolePermissions,
  getRolePermission: (role: string, resource: string) => {
    const perms = getRolePermissions();
    return perms.find(p => p.role === role && p.resource === resource);
  },
  updateRolePermission: (role: string, resource: string, action: string) => {
    const perms = getRolePermissions();
    const index = perms.findIndex(p => p.role === role && p.resource === resource);
    if (index === -1) {
      const newPerm: RolePermission = {
        role,
        resource,
        permissions: { [action]: true },
      };
      saveRolePermissions([...perms, newPerm]);
      return newPerm;
    } else {
      const updated = {
        ...perms[index],
        permissions: { ...perms[index].permissions, [action]: !perms[index].permissions[action] },
      };
      perms[index] = updated;
      saveRolePermissions(perms);
      return updated;
    }
  },

  // Auth provider operations
  getAllAuthProviders: getAuthProviders,
  getAuthProvider: (id: string) => getAuthProviders().find(p => p.id === id),
  createAuthProvider: (providerData: Omit<AuthProviderConfig, "id" | "createdAt" | "enabled">) => {
    const providers = getAuthProviders();
    const newProvider: AuthProviderConfig = {
      ...providerData,
      id: `auth_${Date.now()}`,
      enabled: true,
      createdAt: new Date().toISOString(),
      lastTested: null,
      lastTestResult: null,
    };
    saveAuthProviders([...providers, newProvider]);
    return newProvider;
  },
  updateAuthProvider: (id: string, providerData: Partial<Omit<AuthProviderConfig, "id" | "createdAt" | "enabled">>) => {
    const providers = getAuthProviders();
    const index = providers.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...providers[index], ...providerData, id };
    providers[index] = updated;
    saveAuthProviders(providers);
    return updated;
  },
  toggleAuthProvider: (id: string) => {
    const providers = getAuthProviders();
    const index = providers.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...providers[index], enabled: !providers[index].enabled };
    providers[index] = updated;
    saveAuthProviders(providers);
    return updated;
  },
  deleteAuthProvider: (id: string) => {
    const providers = getAuthProviders();
    const filtered = providers.filter(p => p.id !== id);
    if (filtered.length === providers.length) return false;
    saveAuthProviders(filtered);
    return true;
  },
};
