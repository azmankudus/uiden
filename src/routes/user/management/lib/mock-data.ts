import type { ManagedUser, Group, Permission, RolePermission, AuthProviderConfig } from "./types";
import { PERMISSION_CATEGORIES } from "./constants";

export const SEED_USERS: ManagedUser[] = [
  { id: "u1", username: "admin", displayName: "Administrator", email: "admin@kentut.superapp", role: "Admin", status: "active", groups: ["g1", "g2"], lastLogin: "Just now", createdAt: "2025-01-01T00:00:00Z" },
  { id: "u2", username: "director", displayName: "Director", email: "director@kentut.superapp", role: "Director", status: "active", groups: ["g2"], lastLogin: "5 min ago", createdAt: "2025-01-02T00:00:00Z" },
  { id: "u3", username: "manager", displayName: "Manager", email: "manager@kentut.superapp", role: "Manager", status: "active", groups: ["g3"], lastLogin: "1 hour ago", createdAt: "2025-01-03T00:00:00Z" },
  { id: "u4", username: "staff", displayName: "Staff", email: "staff@kentut.superapp", role: "Staff", status: "active", groups: ["g4"], lastLogin: "2 hours ago", createdAt: "2025-01-04T00:00:00Z" },
  { id: "u5", username: "budi.santoso", displayName: "Budi Santoso", email: "budi@kentut.superapp", role: "Staff", status: "active", groups: ["g4"], lastLogin: "3 hours ago", createdAt: "2025-02-01T00:00:00Z" },
  { id: "u6", username: "siti.rahayu", displayName: "Siti Rahayu", email: "siti@kentut.superapp", role: "Manager", status: "active", groups: ["g3", "g4"], lastLogin: "Yesterday", createdAt: "2025-02-15T00:00:00Z" },
  { id: "u7", username: "ahmad.w", displayName: "Ahmad Wijaya", email: "ahmad@kentut.superapp", role: "Staff", status: "inactive", groups: [], lastLogin: "3 days ago", createdAt: "2025-03-01T00:00:00Z" },
  { id: "u8", username: "dewi.l", displayName: "Dewi Lestari", email: "dewi@kentut.superapp", role: "Director", status: "active", groups: ["g2", "g3"], lastLogin: "30 min ago", createdAt: "2025-03-10T00:00:00Z" },
  { id: "u9", username: "reza.p", displayName: "Reza Pratama", email: "reza@kentut.superapp", role: "Staff", status: "suspended", groups: [], lastLogin: "1 week ago", createdAt: "2025-04-01T00:00:00Z" },
  { id: "u10", username: "maya.k", displayName: "Maya Kusuma", email: "maya@kentut.superapp", role: "Auditor", status: "active", groups: ["g5"], lastLogin: "6 hours ago", createdAt: "2025-04-15T00:00:00Z" },
];

export const SEED_GROUPS: Group[] = [
  { id: "g1", name: "System Administrators", description: "Full system access and configuration", roles: ["Admin"], memberCount: 1, createdAt: "2025-01-01T00:00:00Z" },
  { id: "g2", name: "Leadership", description: "Executive access to all resources", roles: ["Admin", "Director"], memberCount: 3, createdAt: "2025-01-01T00:00:00Z" },
  { id: "g3", name: "Project Managers", description: "Manage projects and team assignments", roles: ["Manager"], memberCount: 2, createdAt: "2025-01-15T00:00:00Z" },
  { id: "g4", name: "Operations", description: "Day-to-day operational access", roles: ["Staff"], memberCount: 3, createdAt: "2025-02-01T00:00:00Z" },
  { id: "g5", name: "Audit Team", description: "Read-only audit and compliance review", roles: ["Auditor"], memberCount: 1, createdAt: "2025-03-01T00:00:00Z" },
];

export function getAllPermissions(): Permission[] {
  return PERMISSION_CATEGORIES.flatMap((cat) =>
    cat.permissions.map((p) => ({ ...p, slug: p.id, category: cat.id }))
  );
}

export function getDefaultRolePermissions(): RolePermission[] {
  const allPerms = getAllPermissions();
  const result: RolePermission[] = [];
  const rolePermMap: Record<string, string[]> = {
    Admin: allPerms.map((p) => p.id),
    Director: ["users.view", "users.create", "users.edit", "users.suspend", "groups.view", "groups.create", "groups.edit", "apps.view", "apps.assign", "system.audit"],
    Manager: ["users.view", "groups.view", "apps.view", "apps.assign"],
    Staff: ["users.view", "apps.view"],
    Auditor: ["users.view", "groups.view", "apps.view", "system.audit"],
  };
  for (const [role, permIds] of Object.entries(rolePermMap)) {
    for (const pid of permIds) {
      result.push({ roleId: role, permissionId: pid, granted: true });
    }
  }
  return result;
}

export function getDefaultAuthProviders(): AuthProviderConfig[] {
  return [
    {
      id: "local",
      type: "local",
      name: "Local Authentication",
      enabled: true,
      config: {},
      lastTested: null,
      lastTestResult: null,
    },
  ];
}
