export interface ManagedUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  appCount: number;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface ManagedGroup {
  id: string;
  name: string;
  description: string;
  users: string[];
  createdAt: string;
}

export interface RolePermission {
  role: string;
  resource: string;
  permissions: Record<string, boolean>;
}

export interface AuthProvider {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  userCount: number;
  lastSync: string | null;
}

export interface ManagedApp {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  userCount: number;
  roleAccess: string[];
}
