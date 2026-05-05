import { createSignal, onMount, For, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import Modal from "~/components/common/Modal";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import { ManagementStore } from "~/lib/login/store";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

export default function PermissionsPage() {
  const t = useT("login");
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [showAddRole, setShowAddRole] = createSignal(false);
  const [showAddResource, setShowAddResource] = createSignal(false);
  const [newRole, setNewRole] = createSignal("");
  const [newResource, setNewResource] = createSignal("");

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const actionLabel = (a: string) => {
    const map: Record<string, string> = { Read: t().actionRead, Write: t().actionWrite, Delete: t().actionDelete, Update: t().actionUpdate };
    return map[a] || a;
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().permissionsTitle} icon="lucide:shield" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12 space-y-4">
          <PageHeader title={t().permissionsTitle} icon="lucide:shield" description={t().managePermissions}>
            <Button icon="lucide:plus" onClick={() => setShowAddRole(true)}>{t().addRole}</Button>
          </PageHeader>

          <div class="flex gap-2 mb-2">
            <Button variant="secondary" size="sm" icon="lucide:plus" onClick={() => setShowAddResource(true)}>{t().addResource}</Button>
          </div>

          <div class="bg-surface-1 rounded-xl border border-surface-3/30 overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-surface-2/50 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3 font-medium">{t().colRole}</th>
                  <For each={ManagementStore.permResources()}>
                    {(resource) => (
                      <th class="text-center px-2 py-3 text-xs">
                        <div class="flex items-center justify-center gap-1">
                          <span>{resource}</span>
                          <button type="button" onClick={() => ManagementStore.deletePermResource(resource)} class="text-text-muted hover:text-red-400 transition-colors">
                            <AppIcon icon="lucide:x" size={12} />
                          </button>
                        </div>
                      </th>
                    )}
                  </For>
                </tr>
              </thead>
              <tbody>
                <For each={ManagementStore.permRoles()}>
                  {(role) => (
                    <tr class="border-t border-surface-3/30">
                      <td class="px-4 py-3 font-medium text-text-primary">
                        <div class="flex items-center gap-2">
                          <span>{role}</span>
                          <button type="button" onClick={() => ManagementStore.deletePermRole(role)} class="text-text-muted hover:text-red-400 transition-colors">
                            <AppIcon icon="lucide:x" size={12} />
                          </button>
                        </div>
                      </td>
                      <For each={ManagementStore.permResources()}>
                        {(resource) => (
                          <td class="px-2 py-3">
                            <div class="flex flex-wrap justify-center gap-1">
                              <For each={ManagementStore.ACTIONS}>
                                {(action) => (
                                  <button
                                    class={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${ManagementStore.permMatrix()[role]?.[resource]?.[action] ? "bg-brand/20 text-brand" : "bg-surface-2 text-text-muted"}`}
                                    onClick={() => ManagementStore.togglePerm(role, resource, action)}
                                  >
                                    {actionLabel(action)}
                                  </button>
                                )}
                              </For>
                            </div>
                          </td>
                        )}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>

        <Modal open={showAddRole()} onClose={() => setShowAddRole(false)} title={t().addRole} icon="lucide:shield" size="sm">
          <div class="space-y-4">
            <Input label={t().roleName} value={newRole()} onInput={setNewRole} placeholder={t().roleName} />
            <div class="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowAddRole(false)}>{t().cancel}</Button>
              <Button onClick={() => { if (newRole().trim()) { ManagementStore.addPermRole(newRole().trim()); setShowAddRole(false); setNewRole(""); } }}>{t().createRole}</Button>
            </div>
          </div>
        </Modal>

        <Modal open={showAddResource()} onClose={() => setShowAddResource(false)} title={t().addResource} icon="lucide:box" size="sm">
          <div class="space-y-4">
            <Input label={t().resourceName} value={newResource()} onInput={setNewResource} placeholder={t().resourceName} />
            <div class="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowAddResource(false)}>{t().cancel}</Button>
              <Button onClick={() => { if (newResource().trim()) { ManagementStore.addPermResource(newResource().trim()); setShowAddResource(false); setNewResource(""); } }}>{t().createResource}</Button>
            </div>
          </div>
        </Modal>
      </PrivateLayout>
    </Show>
  );
}
