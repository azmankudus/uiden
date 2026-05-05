import { createSignal, onMount, For, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import Modal from "~/components/common/Modal";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import Select from "~/components/common/Select";
import Badge from "~/components/common/Badge";
import { ManagementStore, type ManagedUser } from "~/lib/login/store";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useAuth } from "~/lib/common/auth";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

const ROLES = ["Admin", "Director", "Manager", "Staff", "Auditor"];
const STATUSES: { value: "active" | "inactive" | "suspended"; labelKey: string }[] = [
  { value: "active", labelKey: "statusActive" },
  { value: "inactive", labelKey: "statusInactive" },
  { value: "suspended", labelKey: "statusSuspended" },
];

export default function LocalLogin() {
  const t = useT("login");
  const auth = useAuth();
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [editUser, setEditUser] = createSignal<ManagedUser | null>(null);
  const [isNew, setIsNew] = createSignal(false);
  const [infoUser, setInfoUser] = createSignal<ManagedUser | null>(null);

  const [fName, setFName] = createSignal("");
  const [fEmail, setFEmail] = createSignal("");
  const [fRole, setFRole] = createSignal("Staff");
  const [fStatus, setFStatus] = createSignal<"active" | "inactive" | "suspended">("active");

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const openNew = () => { setIsNew(true); setEditUser(null); setFName(""); setFEmail(""); setFRole("Staff"); setFStatus("active"); };
  const openEdit = (u: ManagedUser) => { setIsNew(false); setEditUser(u); setFName(u.name); setFEmail(u.email); setFRole(u.role); setFStatus(u.status); };
  const by = () => auth.user()?.username || "admin";

  const save = () => {
    if (!fName().trim()) return;
    if (isNew()) {
      ManagementStore.addUser(fName(), fEmail(), fRole(), by());
    } else {
      const u = editUser();
      if (u) ManagementStore.editUser(u.id, fName(), fEmail(), fRole(), fStatus(), by());
    }
    setEditUser(null);
  };

  const roleLabel = (r: string) => {
    const map: Record<string, string> = { Admin: t().roleAdmin, Director: t().roleDirector, Manager: t().roleManager, Staff: t().roleStaff, Auditor: t().roleAuditor };
    return map[r] || r;
  };

  const statusBadge = (s: string) => s === "active" ? "success" : s === "suspended" ? "danger" : "default";
  const statusLabel = (s: string) => {
    const map: Record<string, string> = { active: t().statusActive, inactive: t().statusInactive, suspended: t().statusSuspended };
    return map[s] || s;
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().localManageTitle} icon="lucide:user" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12 space-y-4">
          <PageHeader title={t().localManageTitle} icon="lucide:user" description={t().localManageSubtitle}>
            <Button icon="lucide:user-plus" onClick={openNew}>{t().addUser}</Button>
          </PageHeader>

          <div class="bg-surface-1 rounded-xl border border-surface-3/30 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-surface-2/50 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3 font-medium">{t().colUser}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colRole}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colStatus}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colLastLogin}</th>
                  <th class="text-left px-4 py-3 font-medium w-12">{t().colInfo}</th>
                  <th class="text-left px-4 py-3 font-medium w-24">{t().colActions}</th>
                </tr>
              </thead>
              <tbody>
                <For each={ManagementStore.users()}>
                  {(u) => (
                    <tr class="border-t border-surface-3/30 hover:bg-surface-0/50 transition-colors">
                      <td class="px-4 py-3">
                        <div class="font-medium text-text-primary">{u.name}</div>
                        <div class="text-text-muted text-xs">{u.email}</div>
                      </td>
                      <td class="px-4 py-3"><Badge label={roleLabel(u.role)} /></td>
                      <td class="px-4 py-3"><Badge label={statusLabel(u.status)} variant={statusBadge(u.status)} /></td>
                      <td class="px-4 py-3 text-text-muted text-xs">{u.lastLogin}</td>
                      <td class="px-4 py-3">
                        <button type="button" onClick={() => setInfoUser(u)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                          <AppIcon icon="lucide:info" size={16} />
                        </button>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-1">
                          <button type="button" onClick={() => openEdit(u)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                            <AppIcon icon="lucide:pencil" size={14} />
                          </button>
                          <button type="button" onClick={() => ManagementStore.deleteUser(u.id)} class="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
                            <AppIcon icon="lucide:trash-2" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>

        <Modal open={!!editUser() || isNew()} onClose={() => setEditUser(null)} title={isNew() ? t().addUser : t().editUser} icon="lucide:user" size="lg">
          <div class="space-y-4">
            <Input label={t().labelName} value={fName()} onInput={setFName} placeholder={t().phUserName} />
            <Input label={t().labelEmail} value={fEmail()} onInput={setFEmail} placeholder={t().phUserEmail} />
            <Select label={t().labelRole} value={fRole()} onChange={setFRole} options={ROLES.map(r => ({ label: roleLabel(r), value: r }))} />
            <Show when={!isNew()}>
              <Select label={t().labelStatus} value={fStatus()} onChange={(v) => setFStatus(v as any)} options={STATUSES.map(s => ({ label: statusLabel(s.value), value: s.value }))} />
            </Show>
            <div class="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setEditUser(null)}>{t().cancel}</Button>
              <Button onClick={save}>{isNew() ? t().createUser : t().saveUser}</Button>
            </div>
          </div>
        </Modal>

        <Modal open={!!infoUser()} onClose={() => setInfoUser(null)} title={t().infoTitle} icon="lucide:info" size="md">
          <Show when={infoUser()}>
            {(u) => (
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                  <AppIcon icon="lucide:user" size={20} style={{ color: "var(--color-brand)" }} />
                  <div>
                    <p class="font-medium text-text-primary">{u().name}</p>
                    <p class="text-xs text-text-muted">{u().email}</p>
                  </div>
                </div>
                <dl class="space-y-2">
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoCreatedBy}</dt>
                    <dd class="text-sm text-text-primary">{u().createdBy}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoCreatedAt}</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{u().createdAt}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoUpdatedBy}</dt>
                    <dd class="text-sm text-text-primary">{u().updatedBy}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoUpdatedAt}</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{u().updatedAt}</dd>
                  </div>
                </dl>
              </div>
            )}
          </Show>
        </Modal>
      </PrivateLayout>
    </Show>
  );
}
