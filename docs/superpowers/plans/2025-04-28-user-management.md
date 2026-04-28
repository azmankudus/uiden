# User Management & Auth Configuration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete internal user management system with Users CRUD, Groups & Permissions, Auth Config (AD/LDAP, SAML2, OIDC) — all UI-first with mock data and localStorage persistence.

**Architecture:** Single `/user/management` page with 4 tabs (Users, Groups, Permissions, Auth Config). Shared types in `src/routes/user/management/lib/`. Each tab is a self-contained component. Mock data persisted in localStorage. Admin-only access.

**Tech Stack:** SolidStart 1.x, SolidJS reactivity, Tailwind CSS v4, localStorage for persistence. No backend.

---

## File Structure

```
src/routes/user/management/
├── index.tsx                    # Main page - tab router + PrivateLayout wrapper
├── lib/
│   ├── types.ts                 # Shared types (ManagedUser, Group, Permission, AuthConfig)
│   ├── store.ts                 # localStorage CRUD operations for all entities
│   ├── mock-data.ts             # Seed data (users, groups, permissions, auth configs)
│   └── constants.ts             # Role definitions, status options, provider templates
├── components/
│   ├── UsersTab.tsx             # Users list + CRUD modal
│   ├── UserForm.tsx             # User create/edit form (used in modal)
│   ├── GroupsTab.tsx            # Groups list + CRUD
│   ├── GroupForm.tsx            # Group create/edit form
│   ├── PermissionsTab.tsx       # Role-permission matrix grid
│   ├── AuthConfigTab.tsx        # Auth provider cards + config forms
│   └── StatusBadge.tsx          # Reusable status badge component
```

---

### Task 1: Shared Types & Constants

**Files:**
- Create: `src/routes/user/management/lib/types.ts`
- Create: `src/routes/user/management/lib/constants.ts`

- [ ] **Step 1: Create types.ts**

```ts
export interface ManagedUser {
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
export type Role = typeof ROLES[number];

export const USER_STATUSES = ["active", "inactive", "suspended"] as const;
export type UserStatus = typeof USER_STATUSES[number];
```

- [ ] **Step 2: Create constants.ts**

```ts
import type { AuthProviderConfig } from "./types";

export const STORE_KEY = "kentutsuperapp_management";

export const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  Admin: { bg: "bg-red-500/15", text: "text-red-400" },
  Director: { bg: "bg-purple-500/15", text: "text-purple-400" },
  Manager: { bg: "bg-blue-500/15", text: "text-blue-400" },
  Staff: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  Auditor: { bg: "bg-amber-500/15", text: "text-amber-400" },
};

export const STATUS_STYLES: Record<string, { dot: string; text: string }> = {
  active: { dot: "bg-emerald-400", text: "text-emerald-400" },
  inactive: { dot: "bg-text-muted", text: "text-text-muted" },
  suspended: { dot: "bg-red-400", text: "text-red-400" },
};

export const PROVIDER_TEMPLATES: Omit<AuthProviderConfig, "id" | "lastTested" | "lastTestResult">[] = [
  {
    type: "ad-ldap",
    name: "AD / LDAP",
    enabled: false,
    config: {
      serverUrl: "",
      bindDN: "",
      bindPassword: "",
      searchBase: "",
      searchFilter: "(sAMAccountName={username})",
      useSSL: "true",
      port: "636",
    },
  },
  {
    type: "saml2",
    name: "SAML2 (Microsoft Entra ID)",
    enabled: false,
    config: {
      entryPoint: "https://login.microsoftonline.com/<tenant-id>/saml2",
      issuer: "",
      callbackUrl: "",
      cert: "",
      signatureAlgorithm: "sha256",
      wantAssertionsSigned: "true",
    },
  },
  {
    type: "oidc",
    name: "OIDC (GitHub)",
    enabled: false,
    config: {
      issuerUrl: "https://github.com",
      clientId: "",
      clientSecret: "",
      callbackUrl: "",
      scope: "openid email profile",
      authorizationUrl: "https://github.com/login/oauth/authorize",
      tokenUrl: "https://github.com/login/oauth/access_token",
      userInfoUrl: "https://api.github.com/user",
    },
  },
];

export const PERMISSION_CATEGORIES = [
  { id: "users", name: "User Management", permissions: [
    { id: "users.view", name: "View Users", description: "View user list and details" },
    { id: "users.create", name: "Create Users", description: "Create new user accounts" },
    { id: "users.edit", name: "Edit Users", description: "Modify user profiles and roles" },
    { id: "users.delete", name: "Delete Users", description: "Remove user accounts" },
    { id: "users.suspend", name: "Suspend Users", description: "Suspend/activate user accounts" },
  ]},
  { id: "groups", name: "Group Management", permissions: [
    { id: "groups.view", name: "View Groups", description: "View group list and members" },
    { id: "groups.create", name: "Create Groups", description: "Create new groups" },
    { id: "groups.edit", name: "Edit Groups", description: "Modify groups and assignments" },
    { id: "groups.delete", name: "Delete Groups", description: "Remove groups" },
  ]},
  { id: "apps", name: "App Access", permissions: [
    { id: "apps.view", name: "View Apps", description: "View app catalog" },
    { id: "apps.assign", name: "Assign Apps", description: "Assign apps to users/groups" },
    { id: "apps.configure", name: "Configure Apps", description: "Modify app settings" },
  ]},
  { id: "system", name: "System", permissions: [
    { id: "system.auth", name: "Manage Auth", description: "Configure authentication providers" },
    { id: "system.audit", name: "View Audit Log", description: "View system audit trail" },
    { id: "system.settings", name: "System Settings", description: "Modify global system settings" },
  ]},
];
```

- [ ] **Step 3: Build and verify**

Run: `bun run build`
Expected: Success (types are not imported yet but syntax must be valid)

- [ ] **Step 4: Commit**

```bash
git add src/routes/user/management/lib/types.ts src/routes/user/management/lib/constants.ts
git commit -m "feat(user-mgmt): add shared types and constants"
```

---

### Task 2: Mock Data & Store

**Files:**
- Create: `src/routes/user/management/lib/mock-data.ts`
- Create: `src/routes/user/management/lib/store.ts`

- [ ] **Step 1: Create mock-data.ts with seed users, groups, default permissions, and auth configs**

Generate 10 dummy users with realistic data, 4 default groups (matching roles), flatten PERMISSION_CATEGORIES into Permission[], create default role-permission mappings (Admin gets all, others get subsets), and seed one local auth provider always-enabled.

- [ ] **Step 2: Create store.ts with localStorage CRUD**

```ts
// Generic localStorage store with signals
// Functions: getUsers, saveUsers, getGroups, saveGroups,
//            getRolePermissions, saveRolePermissions,
//            getAuthProviders, saveAuthProviders,
//            initializeStore (seeds mock data if empty)
// Uses STORE_KEY prefix with sub-keys: _users, _groups, _perms, _auth
```

Each getter parses from localStorage, each setter serializes to localStorage. `initializeStore()` checks if data exists; if not, seeds from mock-data.

- [ ] **Step 3: Build and verify**

Run: `bun run build`

- [ ] **Step 4: Commit**

```bash
git add src/routes/user/management/lib/mock-data.ts src/routes/user/management/lib/store.ts
git commit -m "feat(user-mgmt): add mock data and localStorage store"
```

---

### Task 3: Reusable Components

**Files:**
- Create: `src/routes/user/management/components/StatusBadge.tsx`

- [ ] **Step 1: Create StatusBadge component**

A small pill component that takes a status string ("active" | "inactive" | "suspended") and renders a colored dot + text using STATUS_STYLES from constants.

- [ ] **Step 2: Build and verify**

- [ ] **Step 3: Commit**

```bash
git add src/routes/user/management/components/StatusBadge.tsx
git commit -m "feat(user-mgmt): add StatusBadge component"
```

---

### Task 4: Users Tab

**Files:**
- Create: `src/routes/user/management/components/UserForm.tsx`
- Create: `src/routes/user/management/components/UsersTab.tsx`

- [ ] **Step 1: Create UserForm.tsx**

Modal form for creating/editing users. Fields: username, displayName, email, role (dropdown from ROLES), status (dropdown). Props: `user?: ManagedUser` (edit mode), `onSave`, `onCancel`. Validates required fields.

- [ ] **Step 2: Create UsersTab.tsx**

Features:
- Table/card list of all users with columns: name, email, role badge, status badge, last login, actions
- Search/filter by name or email
- "Add User" button opens UserForm modal in create mode
- Edit button per row opens UserForm in edit mode
- Delete button with confirmation dialog
- Toggle status (activate/suspend) inline action
- Uses store functions for CRUD

- [ ] **Step 3: Build and verify**

- [ ] **Step 4: Commit**

```bash
git add src/routes/user/management/components/UserForm.tsx src/routes/user/management/components/UsersTab.tsx
git commit -m "feat(user-mgmt): add Users tab with CRUD"
```

---

### Task 5: Groups Tab

**Files:**
- Create: `src/routes/user/management/components/GroupForm.tsx`
- Create: `src/routes/user/management/components/GroupsTab.tsx`

- [ ] **Step 1: Create GroupForm.tsx**

Modal form for creating/editing groups. Fields: name, description, roles (multi-select checkboxes from ROLES). Shows member count (read-only, computed from users in store).

- [ ] **Step 2: Create GroupsTab.tsx**

Features:
- Card grid of groups showing name, description, roles as badges, member count
- "Add Group" button
- Edit/Delete per group
- Click group to expand and see members (users in that group)

- [ ] **Step 3: Build and verify**

- [ ] **Step 4: Commit**

```bash
git add src/routes/user/management/components/GroupForm.tsx src/routes/user/management/components/GroupsTab.tsx
git commit -m "feat(user-mgmt): add Groups tab with CRUD"
```

---

### Task 6: Permissions Tab

**Files:**
- Create: `src/routes/user/management/components/PermissionsTab.tsx`

- [ ] **Step 1: Create PermissionsTab.tsx**

Features:
- Matrix grid: rows = roles (Admin, Director, Manager, Staff, Auditor), columns = permissions grouped by category
- Each cell is a toggle checkbox (granted/denied)
- Category headers with expand/collapse
- "Save" button persists changes to store
- Visual: role headers use ROLE_COLORS, checkmarks use brand color

This is the most complex visual component. Use a table with sticky first column for permission names.

- [ ] **Step 2: Build and verify**

- [ ] **Step 3: Commit**

```bash
git add src/routes/user/management/components/PermissionsTab.tsx
git commit -m "feat(user-mgmt): add Permissions matrix tab"
```

---

### Task 7: Auth Config Tab

**Files:**
- Create: `src/routes/user/management/components/AuthConfigTab.tsx`

- [ ] **Step 1: Create AuthConfigTab.tsx**

Features:
- Card for each auth provider: Local (always enabled, read-only), AD/LDAP, SAML2, OIDC
- Each card shows: provider name, enabled/disabled toggle, status indicator, "Configure" button
- Click "Configure" opens inline form with provider-specific fields from PROVIDER_TEMPLATES
- "Test Connection" button (mock: simulates 2s delay, randomly succeeds/fails, updates lastTested/lastTestResult)
- "Save" persists to store
- Visual: enabled cards have brand-colored border, disabled are muted
- SAML2 card shows "Microsoft Entra ID" branding hint
- OIDC card shows "GitHub" branding hint

- [ ] **Step 2: Build and verify**

- [ ] **Step 3: Commit**

```bash
git add src/routes/user/management/components/AuthConfigTab.tsx
git commit -m "feat(user-mgmt): add Auth Config tab with providers"
```

---

### Task 8: Main Page Assembly

**Files:**
- Modify: `src/routes/user/management/index.tsx` (replace existing 536 lines)

- [ ] **Step 1: Rewrite index.tsx as tab router**

Replace the existing file with:
- PrivateLayout wrapper (admin-only guard)
- 4 tabs: Users, Groups, Permissions, Auth Config
- Tab state via `createSignal<string>`
- SideNav config pointing to management tabs
- SearchItems for search bar integration
- Calls `initializeStore()` from store.ts on mount

Tab bar styling: horizontal tabs below header, active tab has brand underline, consistent with existing settings page pattern.

- [ ] **Step 2: Clean up duplicate `/user/manage` route**

Delete `src/routes/user/manage/index.tsx` and replace with redirect stub to `/user/management`.

- [ ] **Step 3: Build and verify**

- [ ] **Step 4: Commit**

```bash
git add src/routes/user/management/index.tsx src/routes/user/manage/index.tsx
git commit -m "feat(user-mgmt): assemble management page with 4 tabs"
```

---

### Task 9: Integration & Testing

**Files:**
- Test: Manual Playwright test of full management flow

- [ ] **Step 1: Start dev server**

Run: `bun run dev`

- [ ] **Step 2: Test Users tab**

Login as admin → navigate to `/user/management` → verify users list renders → add new user → edit user → toggle status → delete user → verify all persist after page reload.

- [ ] **Step 3: Test Groups tab**

Create group → assign roles → edit group → delete group → verify persistence.

- [ ] **Step 4: Test Permissions tab**

Toggle permission checkboxes → save → reload page → verify checkboxes retain state.

- [ ] **Step 5: Test Auth Config tab**

View all 4 provider cards → enable AD/LDAP → configure fields → test connection → save → verify persistence. Enable SAML2 → configure Microsoft fields → save. Enable OIDC → configure GitHub fields → save.

- [ ] **Step 6: Test non-admin access**

Login as staff → verify `/user/management` is not accessible (redirect or hidden).

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat(user-mgmt): complete user management system"
```

---

## Self-Review Checklist

1. **Spec coverage:** Users CRUD ✓, Groups CRUD ✓, Permissions matrix ✓, Auth Config (AD/LDAP, SAML2/Microsoft, OIDC/GitHub) ✓
2. **Placeholder scan:** All steps contain actual type definitions, no TBD/TODO
3. **Type consistency:** ManagedUser, Group, Permission, AuthProviderConfig defined in Task 1, used consistently in all subsequent tasks
