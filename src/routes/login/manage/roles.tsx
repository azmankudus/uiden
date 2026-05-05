import { createSignal, onMount, For, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import Modal from "~/components/common/Modal";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import { ManagementStore, type ManagedRole } from "~/lib/login/store";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useAuth } from "~/lib/common/auth";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

export default function RolesPage() {
  const t = useT("login");
  const auth = useAuth();
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [editRole, setEditRole] = createSignal<ManagedRole | null>(null);
  const [isNew, setIsNew] = createSignal(false);
  const [infoRole, setInfoRole] = createSignal<ManagedRole | null>(null);

  const [fName, setFName] = createSignal("");
  const [fDesc, setFDesc] = createSignal("");

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const by = () => auth.user()?.username || "admin";

  const openNew = () => { setIsNew(true); setEditRole(null); setFName(""); setFDesc(""); };
  const openEdit = (r: ManagedRole) => { setIsNew(false); setEditRole(r); setFName(r.name); setFDesc(r.description); };

  const save = () => {
    if (!fName().trim()) return;
    if (isNew()) {
      ManagementStore.addRole(fName(), fDesc(), [], by());
    } else {
      const r = editRole();
      if (r) ManagementStore.editRole(r.id, fName(), fDesc(), r.permissionIds, by());
    }
    setEditRole(null);
  };

  const permCount = (r: ManagedRole) => r.permissionIds.length;

  const permNames = (r: ManagedRole) => {
    const perms = ManagementStore.permissions();
    return r.permissionIds.map(id => perms.find(p => p.id === id)?.name || id);
  };

  const memberUsers = (r: ManagedRole) => {
    return ManagementStore.users().filter(u => u.roleIds.includes(r.id));
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().groupsTitle} icon="lucide:crown" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12 space-y-4">
          <PageHeader title={t().groupsTitle} icon="lucide:crown" description={t().manageGroups}>
            <Button icon="lucide:plus" onClick={openNew}>{t().addGroup}</Button>
          </PageHeader>

          <div class="bg-surface-1 rounded-xl border border-surface-3/30 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-surface-2/50 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3 font-medium">{t().groupName}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().description}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colPermissions}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colMembers}</th>
                  <th class="text-left px-4 py-3 font-medium w-12">{t().colInfo}</th>
                  <th class="text-left px-4 py-3 font-medium w-24">{t().colActions}</th>
                </tr>
              </thead>
              <tbody>
                <For each={ManagementStore.roles()}>
                  {(r) => (
                    <tr class="border-t border-surface-3/30 hover:bg-surface-0/50 transition-colors">
                      <td class="px-4 py-3 font-medium text-text-primary">{r.name}</td>
                      <td class="px-4 py-3 text-text-secondary">{r.description}</td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-1.5 text-text-secondary">
                          <AppIcon icon="lucide:shield" size={14} />
                          <span>{permCount(r)}</span>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-1.5 text-text-secondary">
                          <AppIcon icon="lucide:users" size={14} />
                          <span>{r.memberCount}</span>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <button type="button" onClick={() => setInfoRole(r)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                          <AppIcon icon="lucide:info" size={16} />
                        </button>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-1">
                          <button type="button" onClick={() => openEdit(r)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                            <AppIcon icon="lucide:pencil" size={14} />
                          </button>
                          <button type="button" onClick={() => ManagementStore.deleteRole(r.id)} class="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
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

        <Modal open={!!editRole() || isNew()} onClose={() => setEditRole(null)} title={isNew() ? t().addGroup : t().editGroup} icon="lucide:crown" size="lg">
          <div class="space-y-4">
            <Input label={t().groupName} value={fName()} onInput={setFName} placeholder={t().phGroupName} />
            <Input label={t().description} value={fDesc()} onInput={setFDesc} placeholder={t().phGroupDesc} />
            <div class="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setEditRole(null)}>{t().cancel}</Button>
              <Button onClick={save}>{isNew() ? t().createGroup : t().saveGroup}</Button>
            </div>
          </div>
        </Modal>

        <Modal open={!!infoRole()} onClose={() => setInfoRole(null)} title={t().infoTitle} icon="lucide:crown" size="lg">
          <Show when={infoRole()}>
            {(r) => (
              <div class="space-y-4">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                  <AppIcon icon="lucide:crown" size={20} style={{ color: "var(--color-brand)" }} />
                  <div>
                    <p class="font-medium text-text-primary">{r().name}</p>
                    <p class="text-xs text-text-muted">{r().description}</p>
                  </div>
                </div>
                <dl class="space-y-2">
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">ID</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{r().id}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoCreatedBy}</dt>
                    <dd class="text-sm text-text-primary">{r().createdBy}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoCreatedAt}</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{r().createdAt}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoUpdatedBy}</dt>
                    <dd class="text-sm text-text-primary">{r().updatedBy}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoUpdatedAt}</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{r().updatedAt}</dd>
                  </div>
                </dl>

                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">{t().colPermissions} ({permCount(r())})</p>
                  <div class="space-y-1">
                    <For each={permNames(r())}>
                      {(pn) => (
                        <div class="flex items-center gap-2 p-2 rounded-lg bg-surface-0 border border-surface-3/30 text-sm text-text-secondary">
                          <AppIcon icon="lucide:shield" size={12} class="text-text-muted" />
                          {pn}
                        </div>
                      )}
                    </For>
                  </div>
                </div>

                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">{t().colMembers} ({memberUsers(r()).length})</p>
                  <div class="space-y-1">
                    <For each={memberUsers(r()).slice(0, 10)}>
                      {(mu) => (
                        <div class="flex items-center gap-2 p-2 rounded-lg bg-surface-0 border border-surface-3/30 text-sm text-text-secondary">
                          <AppIcon icon="lucide:user" size={12} class="text-text-muted" />
                          <span class="text-text-primary">{mu.fullName}</span>
                          <span class="text-text-muted text-xs ml-auto">{mu.email}</span>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            )}
          </Show>
        </Modal>
      </PrivateLayout>
    </Show>
  );
}
