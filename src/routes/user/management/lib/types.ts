export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  groups: string[];
  lastLogin: string | null;
  createdAt: string;
}

// Alias for compatibility
export type ManagedUser = User;

export interface Group {
  id: string;
  name: string;
  description: string;
  roles: string[];
  memberCount: number;
  createdAt: string;
}

export interface Permission {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  granted: boolean;
}

export interface AuthProviderConfig {
  id: string;
  type: "local" | "ad-ldap" | "saml2" | "oidc";
  name: string;
  enabled: boolean;
  config: Record<string, string>;
  lastTested: string | null;
  lastTestResult: "success" | "failure" | null;
}

export const ROLES = ["Admin", "Director", "Manager", "Staff", "Auditor"] as const;
export type Role = (typeof ROLES)[number];

export const USER_STATUSES = ["active", "inactive", "suspended"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];
