import { createSignal, onMount, For, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import { ManagementStore } from "~/lib/login/store";
import PrivateLayout from "~/components/common/PrivateLayout";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import Modal from "~/components/common/Modal";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { getLoginUsersNav } from "~/lib/users/nav";
import { useT } from "~/lib/common/i18n";

export default function GroupsPage() {
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [showAddGroup, setShowAddGroup] = createSignal(false);
  const [newGroupName, setNewGroupName] = createSignal("");
  const [newGroupDesc, setNewGroupDesc] = createSignal("");
  const t = useT("login");

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().groupsTitle} icon="lucide:folder" slug="superapp" sections={getLoginUsersNav(t)}>
        <div class="pb-12">
          <div class="flex items-center gap-3 mb-2">
            <AppIcon icon="lucide:folder" size={32} style={{ color: "var(--color-brand)" }} />
            <h1 class="text-2xl font-bold">{t().groupsTitle}</h1>
          </div>
          <p class="text-text-secondary mb-8">{t().manageGroups}</p>

          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">{t().allGroups}</h2>
            <Button variant="primary" size="sm" icon="lucide:folder-plus" onClick={() => setShowAddGroup(true)}>
              {t().addGroup}
            </Button>
          </div>

          <Modal open={showAddGroup()} onClose={() => setShowAddGroup(false)} title={t().addGroup} icon="lucide:folder-plus">
            <div class="space-y-3">
              <Input placeholder={t().groupName} onInput={(v) => setNewGroupName(v)} />
              <Input placeholder={t().description} onInput={(v) => setNewGroupDesc(v)} />
              <div class="flex justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddGroup(false)}>{t().cancel}</Button>
                <Button variant="primary" size="sm">{t().createGroup}</Button>
              </div>
            </div>
          </Modal>

          <div class="grid grid-cols-2 gap-4">
            <For each={ManagementStore.groups()}>
              {(g) => (
                <div class="bg-surface-1 rounded-lg border border-surface-2 p-4">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-medium">{g.name}</h3>
                    <div class="flex gap-2">
                      <Button variant="ghost" size="sm">{t().edit}</Button>
                      <Button variant="danger" size="sm" onClick={() => ManagementStore.deleteGroup(g.id)}>{t().delete}</Button>
                    </div>
                  </div>
                  <p class="text-text-muted text-sm mb-3">{g.description}</p>
                  <div class="flex items-center gap-1.5 text-text-secondary text-sm">
                    <AppIcon icon="lucide:users" size={16} style={{ color: "var(--color-text-secondary)" }} />
                    <span>{g.memberCount} {t().members}</span>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </PrivateLayout>
    </Show>
  );
}
