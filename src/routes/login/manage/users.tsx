import { createSignal, onMount, For, Show, createMemo } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import Modal from "~/components/common/Modal";
import Button from "~/components/common/Button";
import Select from "~/components/common/Select";
import Badge from "~/components/common/Badge";
import { ManagementStore } from "~/lib/login/store";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useAuth } from "~/lib/common/auth";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

const ROLES = ["Admin", "Director", "Manager", "Staff", "Auditor"];

export default function UsersPage() {
  const t = useT("login");
  const auth = useAuth();
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [filterProvider, setFilterProvider] = createSignal("");
  const [filterRole, setFilterRole] = createSignal("");
  const [assignUserId, setAssignUserId] = createSignal<string | null>(null);
  const [assignRole, setAssignRole] = createSignal("Staff");

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const by = () => auth.user()?.username || "admin";

  const providers = createMemo(() => {
    const set = new Set(ManagementStore.users().map(u => u.provider));
    return Array.from(set).sort();
  });

  const providerOptions = createMemo(() => [
    { label: t().filterAllProviders, value: "" },
    ...providers().map(p => ({ label: p, value: p })),
  ]);

  const roleOptions = createMemo(() => [
    { label: t().filterAllRoles, value: "" },
    ...ROLES.map(r => ({ label: roleLabel(r), value: r })),
  ]);

  const assignRoleOptions = () => ROLES.map(r => ({ label: roleLabel(r), value: r }));

  const filteredUsers = createMemo(() => {
    let list = ManagementStore.users();
    const p = filterProvider();
    const r = filterRole();
    if (p) list = list.filter(u => u.provider === p);
    if (r) list = list.filter(u => u.role === r);
    return list;
  });

  const roleLabel = (r: string) => {
    const map: Record<string, string> = { Admin: t().roleAdmin, Director: t().roleDirector, Manager: t().roleManager, Staff: t().roleStaff, Auditor: t().roleAuditor };
    return map[r] || r;
  };

  const statusBadge = (s: string) => s === "active" ? "success" : s === "suspended" ? "danger" : "default";
  const statusLabel = (s: string) => {
    const map: Record<string, string> = { active: t().statusActive, inactive: t().statusInactive, suspended: t().statusSuspended };
    return map[s] || s;
  };

  const providerBadge = (p: string) => {
    if (p === "Local") return "default";
    if (p === "LDAP") return "info";
    return "warning";
  };

  const openAssign = (userId: string, currentRole: string) => {
    setAssignUserId(userId);
    setAssignRole(currentRole);
  };

  const saveAssign = () => {
    const uid = assignUserId();
    if (uid) ManagementStore.assignUserRole(uid, assignRole(), by());
    setAssignUserId(null);
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().manageUsersTitle} icon="lucide:users" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12 space-y-4">
          <PageHeader title={t().manageUsersTitle} icon="lucide:users" description={t().manageUsersSubtitle} />

          <div class="flex items-center gap-3">
            <Select value={filterProvider()} onChange={setFilterProvider} options={providerOptions()} />
            <Select value={filterRole()} onChange={setFilterRole} options={roleOptions()} />
            <span class="text-xs text-text-muted ml-auto">{filteredUsers().length} {t().usersLabel}</span>
          </div>

          <Show when={filteredUsers().length > 0} fallback={
            <div class="text-center py-12 text-text-muted">
              <AppIcon icon="lucide:search-x" size={24} class="mx-auto mb-2" />
              <p class="text-sm">{t().noUsersMatch}</p>
            </div>
          }>
            <div class="bg-surface-1 rounded-xl border border-surface-3/30 overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-surface-2/50 text-text-muted">
                  <tr>
                    <th class="text-left px-4 py-3 font-medium">{t().colUser}</th>
                    <th class="text-left px-4 py-3 font-medium">{t().colProvider}</th>
                    <th class="text-left px-4 py-3 font-medium">{t().colRole}</th>
                    <th class="text-left px-4 py-3 font-medium">{t().colStatus}</th>
                    <th class="text-left px-4 py-3 font-medium">{t().colLastLogin}</th>
                    <th class="text-left px-4 py-3 font-medium w-28">{t().colActions}</th>
                  </tr>
                </thead>
                <tbody>
                  <For each={filteredUsers()}>
                    {(u) => (
                      <tr class="border-t border-surface-3/30 hover:bg-surface-0/50 transition-colors">
                        <td class="px-4 py-3">
                          <div class="font-medium text-text-primary">{u.name}</div>
                          <div class="text-text-muted text-xs">{u.email}</div>
                        </td>
                        <td class="px-4 py-3"><Badge label={u.provider} variant={providerBadge(u.provider)} /></td>
                        <td class="px-4 py-3"><Badge label={roleLabel(u.role)} /></td>
                        <td class="px-4 py-3"><Badge label={statusLabel(u.status)} variant={statusBadge(u.status)} /></td>
                        <td class="px-4 py-3 text-text-muted text-xs">{u.lastLogin}</td>
                        <td class="px-4 py-3">
                          <button type="button" onClick={() => openAssign(u.id, u.role)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                            <AppIcon icon="lucide:pencil" size={14} />
                          </button>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </Show>
        </div>

        <Modal open={!!assignUserId()} onClose={() => setAssignUserId(null)} title={t().assignRole} icon="lucide:shield" size="md">
          <Show when={assignUserId()}>
            {() => {
              const user = () => ManagementStore.users().find(u => u.id === assignUserId());
              return (
                <div class="space-y-4">
                  <Show when={user()}>
                    {(u) => (
                      <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                        <AppIcon icon="lucide:user" size={20} style={{ color: "var(--color-brand)" }} />
                        <div>
                          <p class="font-medium text-text-primary">{u().name}</p>
                          <p class="text-xs text-text-muted">{u().email} · {u().provider}</p>
                        </div>
                      </div>
                    )}
                  </Show>
                  <Select label={t().labelRole} value={assignRole()} onChange={setAssignRole} options={assignRoleOptions()} />
                  <div class="flex justify-end gap-2 pt-2">
                    <Button variant="secondary" onClick={() => setAssignUserId(null)}>{t().cancel}</Button>
                    <Button onClick={saveAssign}>{t().saveUser}</Button>
                  </div>
                </div>
              );
            }}
          </Show>
        </Modal>
      </PrivateLayout>
    </Show>
  );
}
