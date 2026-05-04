import { onMount, Show, createSignal, For } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import Modal from "~/components/common/Modal";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { APPS, type AppDef } from "~/lib/apps/apps";
import { appManageNav } from "~/lib/apps/nav";
import { useT } from "~/lib/common/i18n";

export default function ManageRegistration() {
  const t = useT("apps");
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [apps, setApps] = createSignal<AppDef[]>([...APPS]);
  const [editApp, setEditApp] = createSignal<AppDef | null>(null);
  const [infoApp, setInfoApp] = createSignal<AppDef | null>(null);
  const [isNew, setIsNew] = createSignal(false);

  const [formName, setFormName] = createSignal("");
  const [formIcon, setFormIcon] = createSignal("");
  const [formDesc, setFormDesc] = createSignal("");
  const [formPrefix, setFormPrefix] = createSignal("");

  const inputCls = "w-full bg-surface-0 border border-surface-3 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition";

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const openNew = () => {
    setIsNew(true);
    setEditApp(null);
    setFormName(""); setFormIcon("lucide:box"); setFormDesc(""); setFormPrefix("");
  };

  const openEdit = (app: AppDef) => {
    setIsNew(false);
    setEditApp(app);
    setFormName(app.name); setFormIcon(app.icon); setFormDesc(app.desc); setFormPrefix(app.permissionPrefix);
  };

  const saveApp = () => {
    const name = formName().trim();
    if (!name) return;
    if (isNew()) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const newApp: AppDef = {
        name, slug, icon: formIcon() || "lucide:box", desc: formDesc(),
        brandColor: "#6366f1", category: "Custom", permissionPrefix: formPrefix(),
        status: "ok", createdBy: "admin", createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        updatedBy: "admin", updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        _i: apps().length,
      };
      setApps(prev => [...prev, newApp]);
      APPS.push(newApp);
    } else {
      const target = editApp();
      if (!target) return;
      setApps(prev => prev.map(a => a.slug === target.slug ? {
        ...a, name, icon: formIcon() || a.icon, desc: formDesc(), permissionPrefix: formPrefix(),
        updatedBy: "admin", updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
      } : a));
      const idx = APPS.findIndex(a => a.slug === target.slug);
      if (idx >= 0) {
        APPS[idx] = { ...APPS[idx], name, icon: formIcon() || APPS[idx].icon, desc: formDesc(), permissionPrefix: formPrefix() };
      }
    }
    setEditApp(null);
  };

  const deleteApp = (slug: string) => {
    setApps(prev => prev.filter(a => a.slug !== slug));
    const idx = APPS.findIndex(a => a.slug === slug);
    if (idx >= 0) APPS.splice(idx, 1);
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().manageTitle} icon="lucide:boxes" slug="superapp" sections={appManageNav}>
        <div class="pb-12 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-brand-dim flex items-center justify-center">
                <AppIcon icon="lucide:clipboard-list" size={20} style={{ color: "var(--color-brand)" }} />
              </div>
              <div>
                <h1 class="font-display text-xl font-bold text-text-primary">{t().registrationTitle}</h1>
                <p class="text-xs text-text-muted">{apps().length} {t().registeredCount}</p>
              </div>
            </div>
            <button type="button" onClick={openNew}
              class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110 shadow-lg shadow-brand/20 transition-all">
              <AppIcon icon="lucide:plus" size={16} />
              {t().addApp}
            </button>
          </div>

          <div class="bg-surface-1 rounded-xl border border-surface-3/30 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-surface-2/50 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3 font-medium">{t().colAppName}</th>
                  <th class="text-left px-4 py-3 font-medium w-12">{t().colIcon}</th>
                  <th class="text-left px-4 py-3 font-medium">{t().colDescription}</th>
                  <th class="text-left px-4 py-3 font-medium w-40">{t().colPermissionPrefix}</th>
                  <th class="text-left px-4 py-3 font-medium w-12">{t().colInfo}</th>
                  <th class="text-left px-4 py-3 font-medium w-24">{t().colActions}</th>
                </tr>
              </thead>
              <tbody>
                <For each={apps()}>
                  {(app) => (
                    <tr class="border-t border-surface-3/30 hover:bg-surface-0/50 transition-colors">
                      <td class="px-4 py-3 font-medium text-text-primary">{app.name}</td>
                      <td class="px-4 py-3"><AppIcon icon={app.icon} size={18} style={{ color: app.brandColor }} /></td>
                      <td class="px-4 py-3 text-text-secondary max-w-xs truncate">{app.desc}</td>
                      <td class="px-4 py-3 font-mono text-xs text-text-muted">{app.permissionPrefix}</td>
                      <td class="px-4 py-3">
                        <button type="button" onClick={() => setInfoApp(app)} class="text-text-muted hover:text-brand transition-colors">
                          <AppIcon icon="lucide:info" size={16} />
                        </button>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-1">
                          <button type="button" onClick={() => openEdit(app)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                            <AppIcon icon="lucide:pencil" size={14} />
                          </button>
                          <button type="button" onClick={() => deleteApp(app.slug)} class="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
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

        <Modal open={!!editApp() || isNew()} onClose={() => { setEditApp(null); setIsNew(false); }} title={isNew() ? t().addApp : t().editApp} icon="lucide:pencil" size="lg">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().labelAppName}</label>
              <input type="text" value={formName()} onInput={e => setFormName(e.currentTarget.value)} placeholder={t().placeholderAppName} class={inputCls} />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().labelAppIcon}</label>
              <input type="text" value={formIcon()} onInput={e => setFormIcon(e.currentTarget.value)} placeholder={t().placeholderAppIcon} class={inputCls} />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().labelDescription}</label>
              <textarea value={formDesc()} onInput={e => setFormDesc(e.currentTarget.value)} placeholder={t().placeholderDescription} rows={3} class={inputCls + " resize-none"} />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().labelPermissionPrefix}</label>
              <input type="text" value={formPrefix()} onInput={e => setFormPrefix(e.currentTarget.value)} placeholder={t().placeholderPermissionPrefix} class={inputCls} />
            </div>
            <div class="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => { setEditApp(null); setIsNew(false); }} class="px-4 py-2 rounded-xl text-sm bg-surface-2 border border-surface-3 text-text-secondary hover:text-text-primary transition">
                {t().cancel}
              </button>
              <button type="button" onClick={saveApp} class="px-4 py-2 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110 transition">
                {isNew() ? t().create : t().save}
              </button>
            </div>
          </div>
        </Modal>

        <Modal open={!!infoApp()} onClose={() => setInfoApp(null)} title={t().appDetails} icon="lucide:info" size="md">
          <Show when={infoApp()}>
            {(app) => (
              <dl class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <dt class="text-text-muted">{t().detailIdSlug}</dt>
                <dd class="text-text-primary font-mono text-xs">{app().slug}</dd>
                <dt class="text-text-muted">{t().detailName}</dt>
                <dd class="text-text-primary">{app().name}</dd>
                <dt class="text-text-muted">{t().detailCategory}</dt>
                <dd class="text-text-primary">{app().category}</dd>
                <dt class="text-text-muted">{t().detailPermissionPrefix}</dt>
                <dd class="text-text-primary font-mono text-xs">{app().permissionPrefix}</dd>
                <dt class="text-text-muted">{t().detailCreatedBy}</dt>
                <dd class="text-text-primary">{app().createdBy}</dd>
                <dt class="text-text-muted">{t().detailCreatedAt}</dt>
                <dd class="text-text-primary">{app().createdAt}</dd>
                <dt class="text-text-muted">{t().detailUpdatedBy}</dt>
                <dd class="text-text-primary">{app().updatedBy}</dd>
                <dt class="text-text-muted">{t().detailUpdatedAt}</dt>
                <dd class="text-text-primary">{app().updatedAt}</dd>
              </dl>
            )}
          </Show>
        </Modal>
      </PrivateLayout>
    </Show>
  );
}
