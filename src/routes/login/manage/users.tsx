import { createSignal, onMount, For, Show, createMemo } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import Modal from "~/components/common/Modal";
import Button from "~/components/common/Button";
import Select from "~/components/common/Select";
import Badge from "~/components/common/Badge";
import { ManagementStore, type ManagedUser } from "~/lib/login/store";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useAuth } from "~/lib/common/auth";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

export default function UsersPage() {
  const t = useT("login");
  const auth = useAuth();
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [filterProvider, setFilterProvider] = createSignal("");
  const [editUser, setEditUser] = createSignal<ManagedUser | null>(null);
  const [infoUser, setInfoUser] = createSignal<ManagedUser | null>(null);

  const [fName, setFName] = createSignal("");
  const [fDesc, setFDesc] = createSignal("");
  const [fEmail, setFEmail] = createSignal("");
  const [fProvider, setFProvider] = createSignal("Local");
  const [fStatus, setFStatus] = createSignal<"active" | "locked">("active");

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

  const filteredUsers = createMemo(() => {
    let list = ManagementStore.users();
    const p = filterProvider();
    if (p) list = list.filter(u => u.provider === p);
    return list;
  });

  const statusBadge = (s: string) => s === "active" ? "success" : "danger";
  const statusLabel = (s: string) => s === "active" ? t().statusActive : t().statusLocked;
  const providerBadge = (p: string) => {
    if (p === "Local") return "default";
    if (p === "LDAP") return "info";
    return "warning";
  };

  const roleNames = (u: ManagedUser) => {
    const roles = ManagementStore.roles();
    return u.roleIds.map(id => roles.find(r => r.id === id)?.name || id);
  };

  const openEdit = (u: ManagedUser) => {
    setEditUser(u); setFName(u.fullName); setFDesc(u.description); setFEmail(u.email); setFProvider(u.provider); setFStatus(u.status);
  };

  const save = () => {
    const u = editUser();
    if (!u || !fName().trim()) return;
    ManagementStore.editUser(u.id, fName(), fDesc(), fEmail(), fProvider(), fStatus(), u.roleIds, by());
    setEditUser(null);
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().manageUsersTitle} icon="lucide:users" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12 space-y-4">
          <PageHeader title={t().manageUsersTitle} icon="lucide:users" description={t().manageUsersSubtitle} />

          <div class="flex items-center gap-3">
            <Select value={filterProvider()} onChange={setFilterProvider} options={providerOptions()} />
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
                    <th class="text-left px-4 py-3 font-medium">{t().description}</th>
                    <th class="text-left px-4 py-3 font-medium">{t().colProvider}</th>
                    <th class="text-left px-4 py-3 font-medium">{t().colStatus}</th>
                    <th class="text-left px-4 py-3 font-medium">{t().colRoleCount}</th>
                    <th class="text-left px-4 py-3 font-medium w-12">{t().colInfo}</th>
                    <th class="text-left px-4 py-3 font-medium w-24">{t().colActions}</th>
                  </tr>
                </thead>
                <tbody>
                  <For each={filteredUsers()}>
                    {(u) => (
                      <tr class="border-t border-surface-3/30 hover:bg-surface-0/50 transition-colors">
                        <td class="px-4 py-3">
                          <div class="font-medium text-text-primary">{u.fullName}</div>
                          <div class="text-text-muted text-xs">{u.email}</div>
                        </td>
                        <td class="px-4 py-3 text-text-secondary">{u.description}</td>
                        <td class="px-4 py-3"><Badge label={u.provider} variant={providerBadge(u.provider)} /></td>
                        <td class="px-4 py-3"><Badge label={statusLabel(u.status)} variant={statusBadge(u.status)} /></td>
                        <td class="px-4 py-3">
                          <div class="flex items-center gap-1.5 text-text-secondary">
                            <AppIcon icon="lucide:crown" size={14} />
                            <span>{u.roleIds.length}</span>
                          </div>
                        </td>
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
          </Show>
        </div>

        <Modal open={!!editUser()} onClose={() => setEditUser(null)} title={t().editUser} icon="lucide:user" size="lg">
          <div class="space-y-4">
            <Input label={t().labelName} value={fName()} onInput={setFName} placeholder={t().phUserName} />
            <Input label={t().description} value={fDesc()} onInput={setFDesc} placeholder={t().phUserDesc} />
            <Input label={t().labelEmail} value={fEmail()} onInput={setFEmail} placeholder={t().phUserEmail} />
            <Select label={t().colProvider} value={fProvider()} onChange={setFProvider} options={providers().map(p => ({ label: p, value: p }))} />
            <Select label={t().labelStatus} value={fStatus()} onChange={(v) => setFStatus(v as any)} options={[
              { label: t().statusActive, value: "active" },
              { label: t().statusLocked, value: "locked" },
            ]} />
            <div class="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setEditUser(null)}>{t().cancel}</Button>
              <Button onClick={save}>{t().saveUser}</Button>
            </div>
          </div>
        </Modal>

        <Modal open={!!infoUser()} onClose={() => setInfoUser(null)} title={t().infoTitle} icon="lucide:info" size="lg">
          <Show when={infoUser()}>
            {(u) => (
              <div class="space-y-4">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                  <AppIcon icon="lucide:user" size={20} style={{ color: "var(--color-brand)" }} />
                  <div>
                    <p class="font-medium text-text-primary">{u().fullName}</p>
                    <p class="text-xs text-text-muted">{u().email} · {u().provider}</p>
                  </div>
                </div>
                <dl class="space-y-2">
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">ID</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{u().id}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().description}</dt>
                    <dd class="text-sm text-text-primary">{u().description}</dd>
                  </div>
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

                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">{t().colRoleCount} ({u().roleIds.length})</p>
                  <div class="space-y-1">
                    <For each={roleNames(u())}>
                      {(rn) => (
                        <div class="flex items-center gap-2 p-2 rounded-lg bg-surface-0 border border-surface-3/30 text-sm text-text-secondary">
                          <AppIcon icon="lucide:crown" size={12} class="text-text-muted" />
                          {rn}
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
