import { createSignal, onMount, For, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import Modal from "~/components/common/Modal";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import { ManagementStore, type AuthProvider } from "~/lib/login/store";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useAuth } from "~/lib/common/auth";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

export default function RemoteProviders() {
  const t = useT("login");
  const auth = useAuth();
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [editProvider, setEditProvider] = createSignal<AuthProvider | null>(null);
  const [isNew, setIsNew] = createSignal(false);
  const [infoProvider, setInfoProvider] = createSignal<AuthProvider | null>(null);

  const [fName, setFName] = createSignal("");
  const [fType, setFType] = createSignal("");

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const openNew = () => { setIsNew(true); setEditProvider(null); setFName(""); setFType(""); };
  const openEdit = (p: AuthProvider) => { setIsNew(false); setEditProvider(p); setFName(p.name); setFType(p.type); };
  const by = () => auth.user()?.username || "admin";

  const save = () => {
    if (!fName().trim()) return;
    if (isNew()) {
      ManagementStore.addProvider(fName(), fType(), by());
    } else {
      const p = editProvider();
      if (p) ManagementStore.editProvider(p.id, fName(), fType(), by());
    }
    setEditProvider(null);
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().providersTitle} icon="lucide:globe-lock" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12 space-y-4">
          <PageHeader title={t().providersTitle} icon="lucide:globe-lock" description={t().providersSubtitle}>
            <Button icon="lucide:plus" onClick={openNew}>{t().addProvider}</Button>
          </PageHeader>

          <div class="space-y-3">
            <For each={ManagementStore.authProviders()}>
              {(p) => (
                <div class="bg-surface-1 rounded-xl border border-surface-3/30 p-4 flex items-center justify-between hover:border-surface-3/60 transition-colors">
                  <div class="flex items-center gap-4">
                    <div class={`w-10 h-10 rounded-lg flex items-center justify-center ${p.enabled ? "bg-brand-dim" : "bg-surface-2"}`}>
                      <AppIcon
                        icon={p.type === "Local" ? "lucide:database" : p.type === "LDAP" ? "lucide:server" : "lucide:globe-lock"}
                        size={20}
                        style={{ color: p.enabled ? "var(--color-brand)" : "var(--color-text-muted)" }}
                      />
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-text-primary">{p.name}</h3>
                      <div class="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                        <span class="px-1.5 py-0.5 rounded bg-surface-2 border border-surface-3/50 text-text-secondary">{p.type}</span>
                        <span>{p.userCount} {t().usersLabel}</span>
                        <Show when={p.lastSync && p.lastSync !== "Never"}>
                          <span>{t().lastSync}: {p.lastSync}</span>
                        </Show>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <button type="button" onClick={() => setInfoProvider(p)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                      <AppIcon icon="lucide:info" size={16} />
                    </button>
                    <button type="button" onClick={() => openEdit(p)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                      <AppIcon icon="lucide:pencil" size={14} />
                    </button>
                    <button type="button" onClick={() => ManagementStore.deleteProvider(p.id)} class="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <AppIcon icon="lucide:trash-2" size={14} />
                    </button>
                    <button
                      class={`relative w-10 h-5 rounded-full transition-colors ${p.enabled ? "bg-brand" : "bg-surface-3"}`}
                      onClick={() => ManagementStore.toggleProvider(p.id, by())}
                    >
                      <span class={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${p.enabled ? "left-5" : "left-0.5"}`} />
                    </button>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>

        <Modal open={!!editProvider() || isNew()} onClose={() => setEditProvider(null)} title={isNew() ? t().addProvider : t().editProvider} icon="lucide:globe-lock" size="lg">
          <div class="space-y-4">
            <Input label={t().providerName} value={fName()} onInput={setFName} placeholder={t().phProviderName} />
            <Input label={t().providerType} value={fType()} onInput={setFType} placeholder={t().phProviderType} />
            <div class="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setEditProvider(null)}>{t().cancel}</Button>
              <Button onClick={save}>{isNew() ? t().createProvider : t().saveProvider}</Button>
            </div>
          </div>
        </Modal>

        <Modal open={!!infoProvider()} onClose={() => setInfoProvider(null)} title={t().infoTitle} icon="lucide:info" size="md">
          <Show when={infoProvider()}>
            {(p) => (
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                  <AppIcon icon="lucide:globe-lock" size={20} style={{ color: "var(--color-brand)" }} />
                  <div>
                    <p class="font-medium text-text-primary">{p().name}</p>
                    <p class="text-xs text-text-muted">{p().type}</p>
                  </div>
                </div>
                <dl class="space-y-2">
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
