import { createSignal, onMount, For, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import Modal from "~/components/common/Modal";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import Checkbox from "~/components/common/Toggle";
import { ManagementStore, type ManagedPermission } from "~/lib/login/store";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useAuth } from "~/lib/common/auth";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

export default function PermissionsPage() {
  const t = useT("login");
  const auth = useAuth();
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [editPerm, setEditPerm] = createSignal<ManagedPermission | null>(null);
  const [isNew, setIsNew] = createSignal(false);
  const [infoPerm, setInfoPerm] = createSignal<ManagedPermission | null>(null);

  const [fName, setFName] = createSignal("");
  const [fDesc, setFDesc] = createSignal("");
  const [fScope, setFScope] = createSignal("");
  const [fRead, setFRead] = createSignal(false);
  const [fCreate, setFCreate] = createSignal(false);
  const [fUpdate, setFUpdate] = createSignal(false);
  const [fDelete, setFDelete] = createSignal(false);

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const by = () => auth.user()?.username || "admin";

  const openNew = () => {
    setIsNew(true); setEditPerm(null); setFName(""); setFDesc(""); setFScope("");
    setFRead(false); setFCreate(false); setFUpdate(false); setFDelete(false);
  };
  const openEdit = (p: ManagedPermission) => {
    setIsNew(false); setEditPerm(p); setFName(p.name); setFDesc(p.description); setFScope(p.scope);
    setFRead(p.canRead); setFCreate(p.canCreate); setFUpdate(p.canUpdate); setFDelete(p.canDelete);
  };

  const save = () => {
    if (!fName().trim()) return;
    if (isNew()) {
      ManagementStore.addPermission(fName(), fDesc(), fScope(), fRead(), fCreate(), fUpdate(), fDelete(), by());
    } else {
      const p = editPerm();
      if (p) ManagementStore.editPermission(p.id, fName(), fDesc(), fScope(), fRead(), fCreate(), fUpdate(), fDelete(), by());
    }
    setEditPerm(null);
  };

  const typeBadges = (p: ManagedPermission) => {
    const types: string[] = [];
    if (p.canRead) types.push(t().typeRead);
    if (p.canCreate) types.push(t().typeCreate);
    if (p.canUpdate) types.push(t().typeUpdate);
    if (p.canDelete) types.push(t().typeDelete);
    return types;
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().permissionsTitle} icon="lucide:shield" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12 space-y-4">
          <PageHeader title={t().permissionsTitle} icon="lucide:shield" description={t().managePermissions}>
            <Button icon="lucide:plus" onClick={openNew}>{t().addPermission}</Button>
          </PageHeader>

          <div class="bg-surface-1 rounded-xl border border-surface-3/30 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-surface-2/50 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3 font-medium">{t().colPermName}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().description}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colScope}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colTypes}</th>
                  <th class="text-left px-4 py-3 font-medium w-12">{t().colInfo}</th>
                  <th class="text-left px-4 py-3 font-medium w-24">{t().colActions}</th>
                </tr>
              </thead>
              <tbody>
                <For each={ManagementStore.permissions()}>
                  {(p) => (
                    <tr class="border-t border-surface-3/30 hover:bg-surface-0/50 transition-colors">
                      <td class="px-4 py-3 font-medium text-text-primary">{p.name}</td>
                      <td class="px-4 py-3 text-text-secondary">{p.description}</td>
                      <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-md bg-surface-2 text-xs text-text-secondary">{p.scope}</span></td>
                      <td class="px-4 py-3">
                        <div class="flex flex-wrap gap-1">
                          <For each={typeBadges(p)}>
                            {(tb) => <span class="px-1.5 py-0.5 rounded text-[10px] bg-brand/15 text-brand">{tb}</span>}
                          </For>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <button type="button" onClick={() => setInfoPerm(p)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                          <AppIcon icon="lucide:info" size={16} />
                        </button>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-1">
                          <button type="button" onClick={() => openEdit(p)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                            <AppIcon icon="lucide:pencil" size={14} />
                          </button>
                          <button type="button" onClick={() => ManagementStore.deletePermission(p.id)} class="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
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

        <Modal open={!!editPerm() || isNew()} onClose={() => setEditPerm(null)} title={isNew() ? t().addPermission : t().editPermission} icon="lucide:shield" size="lg">
          <div class="space-y-4">
            <Input label={t().permName} value={fName()} onInput={setFName} placeholder={t().phPermName} />
            <Input label={t().description} value={fDesc()} onInput={setFDesc} placeholder={t().phPermDesc} />
            <Input label={t().scope} value={fScope()} onInput={setFScope} placeholder={t().phPermScope} />
            <div class="flex flex-wrap gap-4 p-3 rounded-xl bg-surface-0 border border-surface-3/30">
              <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" checked={fRead()} onChange={(e) => setFRead(e.currentTarget.checked)} class="accent-brand" />
                {t().typeRead}
              </label>
              <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" checked={fCreate()} onChange={(e) => setFCreate(e.currentTarget.checked)} class="accent-brand" />
                {t().typeCreate}
              </label>
              <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" checked={fUpdate()} onChange={(e) => setFUpdate(e.currentTarget.checked)} class="accent-brand" />
                {t().typeUpdate}
              </label>
              <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" checked={fDelete()} onChange={(e) => setFDelete(e.currentTarget.checked)} class="accent-brand" />
                {t().typeDelete}
              </label>
            </div>
            <div class="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setEditPerm(null)}>{t().cancel}</Button>
              <Button onClick={save}>{isNew() ? t().createPermission : t().savePermission}</Button>
            </div>
          </div>
        </Modal>

        <Modal open={!!infoPerm()} onClose={() => setInfoPerm(null)} title={t().infoTitle} icon="lucide:info" size="md">
          <Show when={infoPerm()}>
            {(p) => (
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                  <AppIcon icon="lucide:shield" size={20} style={{ color: "var(--color-brand)" }} />
                  <div>
                    <p class="font-medium text-text-primary">{p().name}</p>
                    <p class="text-xs text-text-muted">{p().description}</p>
                  </div>
                </div>
                <dl class="space-y-2">
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">ID</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{p().id}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().colScope}</dt>
                    <dd class="text-sm text-text-primary">{p().scope}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoCreatedBy}</dt>
                    <dd class="text-sm text-text-primary">{p().createdBy}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoCreatedAt}</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{p().createdAt}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoUpdatedBy}</dt>
                    <dd class="text-sm text-text-primary">{p().updatedBy}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoUpdatedAt}</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{p().updatedAt}</dd>
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
