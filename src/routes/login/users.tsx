import { createSignal, onMount, For, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import { ManagementStore } from "~/lib/login/store";
import PrivateLayout from "~/components/common/PrivateLayout";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import Select from "~/components/common/Select";
import Badge from "~/components/common/Badge";
import Modal from "~/components/common/Modal";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { getLoginUsersNav } from "~/lib/users/nav";
import { useT } from "~/lib/common/i18n";

const ROLE_KEYS = ["Admin", "Director", "Manager", "Staff", "Auditor"];

export default function UsersPage() {
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [showAddUser, setShowAddUser] = createSignal(false);
  const [newName, setNewName] = createSignal("");
  const [newEmail, setNewEmail] = createSignal("");
  const [newRole, setNewRole] = createSignal("Staff");
  const t = useT("login");

  const roleLabel = (): Record<string, string> => ({
    Admin: t().roleAdmin,
    Director: t().roleDirector,
    Manager: t().roleManager,
    Staff: t().roleStaff,
    Auditor: t().roleAuditor,
  });

  const statusLabel = (): Record<string, string> => ({
    active: t().statusActive,
    inactive: t().statusInactive,
    suspended: t().statusSuspended,
  });

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().usersTitle} icon="lucide:users" slug="superapp" sections={getLoginUsersNav(t)}>
        <div class="pb-12">
          <div class="flex items-center gap-3 mb-2">
            <AppIcon icon="lucide:users" size={32} style={{ color: "var(--color-brand)" }} />
            <h1 class="text-2xl font-bold">{t().usersTitle}</h1>
          </div>
          <p class="text-text-secondary mb-8">{t().manageUsers}</p>

          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">{t().allUsers}</h2>
            <Button variant="primary" size="sm" icon="lucide:user-plus" onClick={() => setShowAddUser(true)}>
              {t().addUser}
            </Button>
          </div>

          <Modal open={showAddUser()} onClose={() => setShowAddUser(false)} title={t().addUser} icon="lucide:user-plus">
            <div class="space-y-3">
              <Input placeholder={t().fullName} onInput={(v) => setNewName(v)} />
              <Input placeholder={t().email} onInput={(v) => setNewEmail(v)} />
              <Select options={ROLE_KEYS.map(r => ({ label: roleLabel()[r], value: r }))} value={newRole()} onChange={setNewRole} />
              <div class="flex justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddUser(false)}>{t().cancel}</Button>
                <Button variant="primary" size="sm">{t().createUser}</Button>
              </div>
            </div>
          </Modal>

          <div class="bg-surface-1 rounded-lg border border-surface-2 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-surface-2 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3">{t().colUser}</th>
                  <th class="text-left px-4 py-3">{t().colRole}</th>
                  <th class="text-left px-4 py-3">{t().colStatus}</th>
                  <th class="text-left px-4 py-3">{t().colLastLogin}</th>
                  <th class="text-right px-4 py-3">{t().colActions}</th>
                </tr>
              </thead>
              <tbody>
                <For each={ManagementStore.users()}>
                  {(u) => (
                    <tr class="border-t border-surface-2 hover:bg-surface-0/50 transition-colors">
                      <td class="px-4 py-3">
                        <div class="font-medium">{u.name}</div>
                        <div class="text-text-muted text-xs">{u.email}</div>
                      </td>
                      <td class="px-4 py-3">
                        <Badge label={roleLabel()[u.role]} variant="default" />
                      </td>
                      <td class="px-4 py-3">
                        <Badge label={statusLabel()[u.status]} variant={u.status === "active" ? "success" : u.status === "suspended" ? "danger" : "default"} />
                      </td>
                      <td class="px-4 py-3 text-text-muted">{u.lastLogin}</td>
                      <td class="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" class="mr-2">{t().edit}</Button>
                        <Button variant="danger" size="sm" onClick={() => ManagementStore.deleteUser(u.id)}>{t().delete}</Button>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </PrivateLayout>
    </Show>
  );
}
