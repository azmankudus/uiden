import { createSignal, onMount, onCleanup, Show, For, createMemo } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import { useAuth } from "~/shell/context/auth";
import PrivateLayout from "~/shell/layouts/PrivateLayout";
import { APPS, appColor } from "~/gateway/lib/apps";

interface ManagedUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  appCount: number;
  assignedApps: number[];
  lastLogin: string;
}

interface RoleGroup {
  id: string;
  name: string;
  color: string;
  icon: string;
  appRange: [number, number];
  permissions: string[];
}

const ROLE_GROUPS: RoleGroup[] = [
  { id: "admin", name: "Administrator", color: "#f43f5e", icon: "lucide:crown", appRange: [0, 100], permissions: ["full_access", "user_management", "app_management", "audit_log", "system_config"] },
  { id: "director", name: "Director", color: "#8b5cf6", icon: "lucide:user-check", appRange: [0, 30], permissions: ["full_access", "user_management", "audit_log"] },
  { id: "manager", name: "Manager", color: "#3b82f6", icon: "lucide:shield-half", appRange: [0, 20], permissions: ["app_access", "user_read", "reporting"] },
  { id: "staff", name: "Staff", color: "#06d6a0", icon: "lucide:user", appRange: [0, 10], permissions: ["app_access", "self_service"] },
];

const DEFAULT_USERS: ManagedUser[] = [
  { id: "u1", username: "admin", displayName: "Administrator", email: "admin@kentut.superapp", role: "admin", status: "active", appCount: 100, assignedApps: Array.from({ length: 100 }, (_, i) => i), lastLogin: "Just now" },
  { id: "u2", username: "director", displayName: "Director", email: "director@kentut.superapp", role: "director", status: "active", appCount: 30, assignedApps: Array.from({ length: 30 }, (_, i) => i), lastLogin: "5 min ago" },
  { id: "u3", username: "manager", displayName: "Manager", email: "manager@kentut.superapp", role: "manager", status: "active", appCount: 20, assignedApps: Array.from({ length: 20 }, (_, i) => i), lastLogin: "1 hour ago" },
  { id: "u4", username: "staff", displayName: "Staff", email: "staff@kentut.superapp", role: "staff", status: "active", appCount: 10, assignedApps: Array.from({ length: 10 }, (_, i) => i), lastLogin: "2 hours ago" },
  { id: "u5", username: "budi.santoso", displayName: "Budi Santoso", email: "budi@kentut.superapp", role: "staff", status: "active", appCount: 10, assignedApps: Array.from({ length: 10 }, (_, i) => i), lastLogin: "3 hours ago" },
  { id: "u6", username: "siti.rahayu", displayName: "Siti Rahayu", email: "siti@kentut.superapp", role: "manager", status: "active", appCount: 15, assignedApps: Array.from({ length: 15 }, (_, i) => i), lastLogin: "Yesterday" },
  { id: "u7", username: "ahmad.w", displayName: "Ahmad Wijaya", email: "ahmad@kentut.superapp", role: "staff", status: "inactive", appCount: 10, assignedApps: Array.from({ length: 10 }, (_, i) => i), lastLogin: "3 days ago" },
  { id: "u8", username: "dewi.l", displayName: "Dewi Lestari", email: "dewi@kentut.superapp", role: "director", status: "active", appCount: 30, assignedApps: Array.from({ length: 30 }, (_, i) => i), lastLogin: "30 min ago" },
  { id: "u9", username: "reza.p", displayName: "Reza Pratama", email: "reza@kentut.superapp", role: "staff", status: "suspended", appCount: 5, assignedApps: [0, 1, 2, 3, 4], lastLogin: "1 week ago" },
  { id: "u10", username: "maya.k", displayName: "Maya Kusuma", email: "maya@kentut.superapp", role: "manager", status: "active", appCount: 20, assignedApps: Array.from({ length: 20 }, (_, i) => i), lastLogin: "6 hours ago" },
];

function StatusBadge(props: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "Active" },
    inactive: { bg: "bg-surface-3/30", text: "text-text-muted", label: "Inactive" },
    suspended: { bg: "bg-red-500/15", text: "text-red-400", label: "Suspended" },
  };
  const c = () => config[props.status] || config.inactive;
  return (
    <span class={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium ${c().bg} ${c().text}`}>
      <span class={`w-1.5 h-1.5 rounded-full ${props.status === "active" ? "bg-emerald-400" : props.status === "suspended" ? "bg-red-400" : "bg-text-muted"}`} />
      {c().label}
    </span>
  );
}

function RoleBadge(props: { roleId: string }) {
  const role = () => ROLE_GROUPS.find((r) => r.id === props.roleId);
  return (
    <Show when={role()}>
      {(r) => (
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium" style={{ background: `${r().color}20`, color: r().color }}>
          <AppIcon icon={r().icon} size={11} />
          {r().name}
        </span>
      )}
    </Show>
  );
}

const STORE_KEY = "kentutsuperapp_management";

export default function UserManagePage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal("users");
  const [users, setUsers] = createSignal<ManagedUser[]>([]);
  const [searchFilter, setSearchFilter] = createSignal("");
  const [roleFilter, setRoleFilter] = createSignal("all");
  const [statusFilter, setStatusFilter] = createSignal("all");
  const [showAddUser, setShowAddUser] = createSignal(false);
  const [editingUser, setEditingUser] = createSignal<ManagedUser | null>(null);
  const [expandedRole, setExpandedRole] = createSignal<string | null>(null);
  const [showAppMapping, setShowAppMapping] = createSignal(false);
  const [mappingUser, setMappingUser] = createSignal<ManagedUser | null>(null);

  const [newUsername, setNewUsername] = createSignal("");
  const [newDisplayName, setNewDisplayName] = createSignal("");
  const [newEmail, setNewEmail] = createSignal("");
  const [newRole, setNewRole] = createSignal("staff");

  onMount(() => {
    if (!auth.isLoggedIn()) { navigate("/user/login", { replace: true }); return; }
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
      try { setUsers(JSON.parse(stored)); } catch { setUsers(DEFAULT_USERS); }
    } else {
      setUsers(DEFAULT_USERS);
    }
    const syncHash = () => {
      const h = window.location.hash.slice(1) || "users";
      setActiveTab(h);
      if (!window.location.hash) window.history.replaceState(null, "", "/user/manage#users");
    };
    syncHash();
    requestAnimationFrame(() => setMounted(true));
    window.addEventListener("hashchange", syncHash);
    onCleanup(() => window.removeEventListener("hashchange", syncHash));
  });

  const persist = (u: ManagedUser[]) => {
    setUsers(u);
    localStorage.setItem(STORE_KEY, JSON.stringify(u));
  };

  const filteredUsers = createMemo(() => {
    const q = searchFilter().toLowerCase();
    const rf = roleFilter();
    const sf = statusFilter();
    return users().filter((u) => {
      if (q && !u.username.toLowerCase().includes(q) && !u.displayName.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
      if (rf !== "all" && u.role !== rf) return false;
      if (sf !== "all" && u.status !== sf) return false;
      return true;
    });
  });

  const addUser = () => {
    const id = `u${Date.now()}`;
    const role = ROLE_GROUPS.find((r) => r.id === newRole());
    const appCount = role ? role.appRange[1] : 10;
    const user: ManagedUser = {
      id, username: newUsername(), displayName: newDisplayName(), email: newEmail(),
      role: newRole(), status: "active", appCount,
      assignedApps: Array.from({ length: appCount }, (_, i) => i), lastLogin: "Never",
    };
    persist([...users(), user]);
    setNewUsername(""); setNewDisplayName(""); setNewEmail(""); setNewRole("staff");
    setShowAddUser(false);
  };

  const removeUser = (id: string) => {
    persist(users().filter((u) => u.id !== id));
  };

  const toggleUserStatus = (id: string) => {
    persist(users().map((u) => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } as ManagedUser : u));
  };

  const toggleAppAssignment = (userId: string, appIdx: number) => {
    persist(users().map((u) => {
      if (u.id !== userId) return u;
      const apps = u.assignedApps.includes(appIdx)
        ? u.assignedApps.filter((a) => a !== appIdx)
        : [...u.assignedApps, appIdx].sort((a, b) => a - b);
      return { ...u, assignedApps: apps, appCount: apps.length } as ManagedUser;
    }));
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/50 transition-colors";

  const tabs = [
    { id: "users", label: "Users", icon: "lucide:users" },
    { id: "roles", label: "Roles & Permissions", icon: "lucide:shield-half" },
    { id: "app-access", label: "App Access Map", icon: "lucide:layout-grid" },
  ];

  const managementNav = [
    { label: "Users", icon: "lucide:users", path: "/user/manage#users", onClick: () => setActiveTab("users") },
    { label: "Roles & Permissions", icon: "lucide:shield-half", path: "/user/manage#roles", onClick: () => setActiveTab("roles") },
    { label: "App Access Map", icon: "lucide:layout-grid", path: "/user/manage#app-access", onClick: () => setActiveTab("app-access") },
  ];

  const managementSearch = [
    { label: "User Management", path: "/user/manage", icon: "lucide:user-cog", section: "Admin" },
    { label: "User Settings", path: "/user/setting", icon: "lucide:settings", section: "Settings" },
  ];

  return (
    <Show when={mounted()}>
      <PrivateLayout name="User Management" icon="lucide:user-cog" slug="ayam-goreng" nav={managementNav} searchItems={managementSearch}>
        <div class="page-enter">
          <div class="mb-8">
            <button type="button" onClick={() => navigate(-1)} class="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary mb-4">
              <AppIcon icon="lucide:arrow-left" size={14} /> Back
            </button>
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-brand-dim border border-brand/20 flex items-center justify-center">
                <AppIcon icon="lucide:user-cog" size={32} style={{ color: "var(--color-brand)" }} />
              </div>
              <div>
                <h1 class="font-display text-2xl font-bold text-text-primary">User & App Management</h1>
                <p class="text-sm text-text-secondary">Manage users, roles, permissions, and app access assignments.</p>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mb-6 border-b border-surface-3/30 pb-0">
            <For each={tabs}>
              {(tab) => (
                <button type="button" onClick={() => setActiveTab(tab.id)}
                  class="flex items-center gap-2 px-4 pb-3 text-sm font-medium border-b-2 transition-colors -mb-px"
                  classList={{
                    "border-brand text-brand": activeTab() === tab.id,
                    "border-transparent text-text-secondary hover:text-text-primary": activeTab() !== tab.id,
                  }}>
                  <AppIcon icon={tab.icon} size={16} /> {tab.label}
                </button>
              )}
            </For>
          </div>

          <Show when={activeTab() === "users"}>
            <div class="space-y-4">
              <div class="flex flex-wrap items-center gap-3">
                <div class="relative flex-1 min-w-[200px]">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><AppIcon icon="lucide:search" size={16} /></span>
                  <input type="text" placeholder="Search users..." value={searchFilter()} onInput={(e) => setSearchFilter(e.currentTarget.value)} class={inputCls + " pl-9"} />
                </div>
                <select value={roleFilter()} onChange={(e) => setRoleFilter(e.currentTarget.value)} class={inputCls + " w-auto min-w-[130px] appearance-none"}>
                  <option value="all">All Roles</option>
                  <For each={ROLE_GROUPS}>{(r) => <option value={r.id}>{r.name}</option>}</For>
                </select>
                <select value={statusFilter()} onChange={(e) => setStatusFilter(e.currentTarget.value)} class={inputCls + " w-auto min-w-[130px] appearance-none"}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
                <button type="button" onClick={() => setShowAddUser(true)}
                  class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110 transition-all">
                  <AppIcon icon="lucide:plus" size={16} /> Add User
                </button>
              </div>

              <Show when={showAddUser()}>
                <div class="p-5 rounded-2xl bg-surface-1 border border-brand/20 animate-slide-in-right">
                  <h3 class="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <AppIcon icon="lucide:user-plus" size={16} style={{ color: "var(--color-brand)" }} /> New User
                  </h3>
                  <div class="grid sm:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label class="block text-xs font-medium text-text-secondary mb-1">Username</label>
                      <input type="text" placeholder="username" value={newUsername()} onInput={(e) => setNewUsername(e.currentTarget.value)} class={inputCls} />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-secondary mb-1">Display Name</label>
                      <input type="text" placeholder="Full Name" value={newDisplayName()} onInput={(e) => setNewDisplayName(e.currentTarget.value)} class={inputCls} />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-secondary mb-1">Email</label>
                      <input type="email" placeholder="user@company.com" value={newEmail()} onInput={(e) => setNewEmail(e.currentTarget.value)} class={inputCls} />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-secondary mb-1">Role</label>
                      <select value={newRole()} onChange={(e) => setNewRole(e.currentTarget.value)} class={inputCls + " appearance-none"}>
                        <For each={ROLE_GROUPS}>{(r) => <option value={r.id}>{r.name}</option>}</For>
                      </select>
                    </div>
                  </div>
                  <div class="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddUser(false)} class="px-4 py-2 rounded-xl text-sm text-text-secondary hover:bg-surface-2">Cancel</button>
                    <button type="button" onClick={addUser} class="px-4 py-2 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">Create User</button>
                  </div>
                </div>
              </Show>

              <div class="rounded-2xl bg-surface-1 border border-surface-3/30 overflow-hidden">
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b border-surface-3/30">
                        <th class="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">User</th>
                        <th class="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Role</th>
                        <th class="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                        <th class="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Apps</th>
                        <th class="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Last Login</th>
                        <th class="text-right px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <For each={filteredUsers()}>
                        {(user, i) => (
                          <tr class="border-b border-surface-3/10 hover:bg-surface-2/30 transition-colors" classList={{ "animate-scale-in": mounted() }} style={{ "animation-delay": `${i() * 30}ms` }}>
                            <td class="px-4 py-3">
                              <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-xl bg-brand-dim border border-brand/20 flex items-center justify-center shrink-0">
                                  <AppIcon icon="lucide:circle-user" size={18} style={{ color: "var(--color-brand)" }} />
                                </div>
                                <div class="min-w-0">
                                  <p class="text-sm font-medium text-text-primary truncate">{user.displayName}</p>
                                  <p class="text-[11px] text-text-muted truncate">@{user.username}</p>
                                </div>
                              </div>
                            </td>
                            <td class="px-4 py-3"><RoleBadge roleId={user.role} /></td>
                            <td class="px-4 py-3"><StatusBadge status={user.status} /></td>
                            <td class="px-4 py-3">
                              <button type="button" onClick={() => { setMappingUser(user); setShowAppMapping(true); }}
                                class="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-brand transition-colors">
                                <AppIcon icon="lucide:layout-grid" size={13} /> {user.appCount} apps
                              </button>
                            </td>
                            <td class="px-4 py-3 text-xs text-text-muted">{user.lastLogin}</td>
                            <td class="px-4 py-3">
                              <div class="flex items-center justify-end gap-1">
                                <button type="button" onClick={() => { setMappingUser(user); setShowAppMapping(true); }}
                                  class="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors" title="Manage apps">
                                  <AppIcon icon="lucide:layout-grid" size={15} />
                                </button>
                                <button type="button" onClick={() => toggleUserStatus(user.id)}
                                  class="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
                                  title={user.status === "active" ? "Suspend" : "Activate"}>
                                  <AppIcon icon={user.status === "active" ? "lucide:user-x" : "lucide:user-check"} size={15} />
                                </button>
                                <button type="button" onClick={() => removeUser(user.id)}
                                  class="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Remove">
                                  <AppIcon icon="lucide:trash-2" size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </For>
                    </tbody>
                  </table>
                </div>
                <Show when={filteredUsers().length === 0}>
                  <div class="py-12 text-center">
                    <AppIcon icon="lucide:search-x" size={40} class="text-text-muted mx-auto" />
                    <p class="mt-3 text-sm text-text-muted">No users match your filters</p>
                  </div>
                </Show>
                <div class="px-4 py-3 border-t border-surface-3/30 flex items-center justify-between">
                  <p class="text-xs text-text-muted">{filteredUsers().length} of {users().length} users</p>
                  <div class="flex items-center gap-2 text-xs text-text-muted">
                    <span>{users().filter((u) => u.status === "active").length} active</span>
                    <span class="text-surface-3">·</span>
                    <span>{users().filter((u) => u.status === "suspended").length} suspended</span>
                  </div>
                </div>
              </div>
            </div>
          </Show>

          <Show when={activeTab() === "roles"}>
            <div class="space-y-4">
              <For each={ROLE_GROUPS}>
                {(role) => {
                  const usersInRole = createMemo(() => users().filter((u) => u.role === role.id));
                  const isExpanded = () => expandedRole() === role.id;
                  return (
                    <div class="rounded-2xl bg-surface-1 border border-surface-3/30 overflow-hidden">
                      <button type="button" onClick={() => setExpandedRole(isExpanded() ? null : role.id)}
                        class="w-full flex items-center gap-4 p-5 hover:bg-surface-2/20 transition-colors">
                        <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${role.color}20`, border: `1px solid ${role.color}30` }}>
                          <AppIcon icon={role.icon} size={20} style={{ color: role.color }} />
                        </div>
                        <div class="flex-1 text-left">
                          <div class="flex items-center gap-2">
                            <h3 class="font-display text-sm font-semibold text-text-primary">{role.name}</h3>
                            <span class="text-[10px] px-2 py-0.5 rounded-lg font-medium" style={{ background: `${role.color}15`, color: role.color }}>
                              {usersInRole().length} user{usersInRole().length !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <p class="text-xs text-text-muted mt-0.5">Access to {role.appRange[1]} apps · {role.permissions.length} permissions</p>
                        </div>
                        <AppIcon icon="lucide:chevron-down" size={18}
                          class="text-text-muted transition-transform duration-200"
                          style={{ transform: isExpanded() ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </button>
                      <Show when={isExpanded()}>
                        <div class="px-5 pb-5 pt-0 border-t border-surface-3/20 animate-slide-in-right">
                          <div class="mt-4 mb-4">
                            <h4 class="text-xs font-medium text-text-secondary mb-2">Permissions</h4>
                            <div class="flex flex-wrap gap-1.5">
                              <For each={role.permissions}>
                                {(perm) => (
                                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-surface-2 text-text-secondary border border-surface-3/20">
                                    <AppIcon icon="lucide:check" size={10} style={{ color: "var(--color-brand)" }} />
                                    {perm.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                  </span>
                                )}
                              </For>
                            </div>
                          </div>
                          <div>
                            <h4 class="text-xs font-medium text-text-secondary mb-2">Users in this role</h4>
                            <div class="space-y-1.5">
                              <For each={usersInRole()}>
                                {(u) => (
                                  <div class="flex items-center justify-between py-1.5 px-3 rounded-xl bg-surface-2/50">
                                    <div class="flex items-center gap-2.5">
                                      <div class="w-7 h-7 rounded-lg bg-brand-dim flex items-center justify-center">
                                        <AppIcon icon="lucide:circle-user" size={14} style={{ color: "var(--color-brand)" }} />
                                      </div>
                                      <div>
                                        <p class="text-xs font-medium text-text-primary">{u.displayName}</p>
                                        <p class="text-[10px] text-text-muted">@{u.username}</p>
                                      </div>
                                    </div>
                                    <StatusBadge status={u.status} />
                                  </div>
                                )}
                              </For>
                            </div>
                          </div>
                        </div>
                      </Show>
                    </div>
                  );
                }}
              </For>
            </div>
          </Show>

          <Show when={activeTab() === "app-access"}>
            <div class="space-y-4">
              <div class="flex items-center gap-3 mb-2">
                <p class="text-sm text-text-secondary flex-1">Select a user to view and modify their app access assignments.</p>
                <select value={mappingUser()?.id || ""} onChange={(e) => {
                  const u = users().find((u) => u.id === e.currentTarget.value);
                  setMappingUser(u || null);
                  setShowAppMapping(!!u);
                }} class={inputCls + " w-auto min-w-[180px] appearance-none"}>
                  <option value="">Select user...</option>
                  <For each={users()}>{(u) => <option value={u.id}>{u.displayName}</option>}</For>
                </select>
              </div>

              <Show when={showAppMapping() && mappingUser()}>
                {(mu) => (
                  <div class="rounded-2xl bg-surface-1 border border-surface-3/30 p-5 animate-scale-in">
                    <div class="flex items-center gap-3 mb-4">
                      <div class="w-10 h-10 rounded-xl bg-brand-dim border border-brand/20 flex items-center justify-center">
                        <AppIcon icon="lucide:circle-user" size={20} style={{ color: "var(--color-brand)" }} />
                      </div>
                      <div>
                        <h3 class="text-sm font-semibold text-text-primary">{mu().displayName}</h3>
                        <p class="text-xs text-text-muted">{mu().assignedApps.length} of {APPS.length} apps assigned</p>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[400px] overflow-y-auto p-1">
                      <For each={APPS}>
                        {(app, i) => {
                          const isAssigned = () => mu().assignedApps.includes(i());
                          return (
                            <button type="button" onClick={() => toggleAppAssignment(mu().id, i())}
                              class="flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all"
                              classList={{
                                "border-brand/40 bg-brand-dim/30": isAssigned(),
                                "border-surface-3/30 bg-surface-2/30 hover:border-surface-3": !isAssigned(),
                              }}>
                              <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: appColor(app._i).bg, border: `1px solid ${appColor(app._i).border}` }}>
                                <AppIcon icon={app.icon} size={14} style={{ color: appColor(app._i).text }} />
                              </div>
                              <span class="text-[11px] leading-tight truncate" classList={{ "text-text-primary font-medium": isAssigned(), "text-text-muted": !isAssigned() }}>
                                {app.name}
                              </span>
                              <Show when={isAssigned()}>
                                <AppIcon icon="lucide:check" size={12} style={{ color: "var(--color-brand)", "margin-left": "auto", flex_shrink: 0 }} />
                              </Show>
                            </button>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                )}
              </Show>

              <Show when={!showAppMapping()}>
                <div class="py-16 text-center">
                  <AppIcon icon="lucide:layout-grid" size={48} class="text-text-muted mx-auto" />
                  <p class="mt-3 text-sm text-text-muted">Select a user above to manage their app access</p>
                </div>
              </Show>
            </div>
          </Show>

          <Show when={showAppMapping() && activeTab() === "users" && mappingUser()}>
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => { setShowAppMapping(false); setMappingUser(null); }}>
              <div class="bg-surface-1 border border-surface-3 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
                <div class="flex items-center justify-between p-5 border-b border-surface-3/30">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-brand-dim border border-brand/20 flex items-center justify-center">
                      <AppIcon icon="lucide:circle-user" size={20} style={{ color: "var(--color-brand)" }} />
                    </div>
                    <div>
                      <h3 class="text-sm font-semibold text-text-primary">App Access: {mappingUser()!.displayName}</h3>
                      <p class="text-xs text-text-muted">{mappingUser()!.assignedApps.length} of {APPS.length} apps assigned</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => { setShowAppMapping(false); setMappingUser(null); }} class="p-2 rounded-xl hover:bg-surface-2 text-text-muted hover:text-text-primary">
                    <AppIcon icon="lucide:x" size={18} />
                  </button>
                </div>
                <div class="p-5 overflow-y-auto max-h-[calc(80vh-80px)]">
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    <For each={APPS}>
                      {(app, i) => {
                        const isAssigned = () => mappingUser()?.assignedApps.includes(i()) ?? false;
                        return (
                          <button type="button" onClick={() => toggleAppAssignment(mappingUser()!.id, i())}
                            class="flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all"
                            classList={{
                              "border-brand/40 bg-brand-dim/30": isAssigned(),
                              "border-surface-3/30 bg-surface-2/30 hover:border-surface-3": !isAssigned(),
                            }}>
                            <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: appColor(app._i).bg, border: `1px solid ${appColor(app._i).border}` }}>
                              <AppIcon icon={app.icon} size={14} style={{ color: appColor(app._i).text }} />
                            </div>
                            <span class="text-[11px] leading-tight truncate" classList={{ "text-text-primary font-medium": isAssigned(), "text-text-muted": !isAssigned() }}>
                              {app.name}
                            </span>
                            <Show when={isAssigned()}>
                              <AppIcon icon="lucide:check" size={12} style={{ color: "var(--color-brand)", "margin-left": "auto", flex_shrink: 0 }} />
                            </Show>
                          </button>
                        );
                      }}
                    </For>
                  </div>
                </div>
              </div>
            </div>
          </Show>
        </div>
      </PrivateLayout>
    </Show>
  );
}
