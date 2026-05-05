import { createSignal, onMount, For, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import Modal from "~/components/common/Modal";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import Badge from "~/components/common/Badge";
import { ManagementStore, type LocalLogin } from "~/lib/login/store";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useAuth } from "~/lib/common/auth";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

export default function LocalLogin() {
  const t = useT("login");
  const auth = useAuth();
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [editLogin, setEditLogin] = createSignal<LocalLogin | null>(null);
  const [isNew, setIsNew] = createSignal(false);
  const [infoLogin, setInfoLogin] = createSignal<LocalLogin | null>(null);

  const [fUsername, setFUsername] = createSignal("");
  const [fEmail, setFEmail] = createSignal("");
  const [fFullName, setFFullName] = createSignal("");
  const [fPassword, setFPassword] = createSignal("");

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const by = () => auth.user()?.username || "admin";

  const openNew = () => {
    setIsNew(true); setEditLogin(null); setFUsername(""); setFEmail(""); setFFullName(""); setFPassword("");
  };
  const openEdit = (l: LocalLogin) => {
    setIsNew(false); setEditLogin(l); setFUsername(l.username); setFEmail(l.email); setFFullName(l.fullName); setFPassword("");
  };

  const save = () => {
    if (!fUsername().trim()) return;
    if (isNew()) {
      if (!fPassword().trim()) return;
      ManagementStore.addLocalLogin(fUsername(), fEmail(), fFullName(), fPassword(), by());
    } else {
      const l = editLogin();
      if (l) ManagementStore.editLocalLogin(l.id, fUsername(), fEmail(), fFullName(), by());
    }
    setEditLogin(null);
  };

  const statusBadge = (s: string) => s === "active" ? "success" : "danger";
  const statusLabel = (s: string) => s === "active" ? t().statusActive : t().statusLocked;

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().localManageTitle} icon="lucide:user" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12 space-y-4">
          <PageHeader title={t().localManageTitle} icon="lucide:user" description={t().localManageSubtitle}>
            <Button icon="lucide:user-plus" onClick={openNew}>{t().addLogin}</Button>
          </PageHeader>

          <div class="bg-surface-1 rounded-xl border border-surface-3/30 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-surface-2/50 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3 font-medium">{t().colUsername}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().labelEmail}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colFullName}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colStatus}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colLastLogin}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colLastPwChange}</th>
                  <th class="text-left px-4 py-3 font-medium w-12">{t().colInfo}</th>
                  <th class="text-left px-4 py-3 font-medium w-24">{t().colActions}</th>
                </tr>
              </thead>
              <tbody>
                <For each={ManagementStore.localLogins()}>
                  {(l) => (
                    <tr class="border-t border-surface-3/30 hover:bg-surface-0/50 transition-colors">
                      <td class="px-4 py-3 font-medium text-text-primary">{l.username}</td>
                      <td class="px-4 py-3 text-text-secondary">{l.email}</td>
                      <td class="px-4 py-3 text-text-secondary">{l.fullName}</td>
                      <td class="px-4 py-3"><Badge label={statusLabel(l.status)} variant={statusBadge(l.status)} /></td>
                      <td class="px-4 py-3 text-text-muted text-xs">{l.lastLogin}</td>
                      <td class="px-4 py-3 text-text-muted text-xs">{l.lastPasswordChange}</td>
                      <td class="px-4 py-3">
                        <button type="button" onClick={() => setInfoLogin(l)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                          <AppIcon icon="lucide:info" size={16} />
                        </button>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-1">
                          <button type="button" onClick={() => openEdit(l)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                            <AppIcon icon="lucide:pencil" size={14} />
                          </button>
                          <button type="button" onClick={() => ManagementStore.toggleLocalLoginStatus(l.id, by())} class="p-1.5 rounded-lg text-text-muted hover:text-amber-400 hover:bg-amber-500/10 transition-colors" title={l.status === "active" ? t().statusLocked : t().statusActive}>
                            <AppIcon icon={l.status === "active" ? "lucide:lock" : "lucide:unlock"} size={14} />
                          </button>
                          <button type="button" onClick={() => ManagementStore.deleteLocalLogin(l.id)} class="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
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

        <Modal open={!!editLogin() || isNew()} onClose={() => setEditLogin(null)} title={isNew() ? t().addLogin : t().editLogin} icon="lucide:user" size="lg">
          <div class="space-y-4">
            <Input label={t().colUsername} value={fUsername()} onInput={setFUsername} placeholder={t().phUsername} />
            <Input label={t().labelEmail} value={fEmail()} onInput={setFEmail} placeholder={t().phUserEmail} />
            <Input label={t().colFullName} value={fFullName()} onInput={setFFullName} placeholder={t().phUserName} />
            <Show when={isNew()}>
              <Input label={t().labelPassword} value={fPassword()} onInput={setFPassword} placeholder={t().phPassword} type="password" />
            </Show>
            <div class="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setEditLogin(null)}>{t().cancel}</Button>
              <Button onClick={save}>{isNew() ? t().createLogin : t().saveLogin}</Button>
            </div>
          </div>
        </Modal>

        <Modal open={!!infoLogin()} onClose={() => setInfoLogin(null)} title={t().infoTitle} icon="lucide:info" size="md">
          <Show when={infoLogin()}>
            {(l) => (
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                  <AppIcon icon="lucide:user" size={20} style={{ color: "var(--color-brand)" }} />
                  <div>
                    <p class="font-medium text-text-primary">{l().fullName}</p>
                    <p class="text-xs text-text-muted">{l().username} · {l().email}</p>
                  </div>
                </div>
                <dl class="space-y-2">
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">ID</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{l().id}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().colStatus}</dt>
                    <dd class="text-sm text-text-primary"><Badge label={statusLabel(l().status)} variant={statusBadge(l().status)} /></dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoCreatedBy}</dt>
                    <dd class="text-sm text-text-primary">{l().createdBy}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoCreatedAt}</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{l().createdAt}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoUpdatedBy}</dt>
                    <dd class="text-sm text-text-primary">{l().updatedBy}</dd>
                  </div>
                  <div class="flex justify-between p-2.5 rounded-lg bg-surface-0 border border-surface-3/30">
                    <dt class="text-sm text-text-muted">{t().infoUpdatedAt}</dt>
                    <dd class="text-sm text-text-primary font-mono text-xs">{l().updatedAt}</dd>
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
