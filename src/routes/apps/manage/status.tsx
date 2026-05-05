import { onMount, Show, createSignal, For } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import Modal from "~/components/common/Modal";
import Select from "~/components/common/Select";
import Input from "~/components/common/Input";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useAuth } from "~/lib/common/auth";
import { APPS, type AppDef } from "~/lib/apps/apps";
import { AppStatusStore, type ManageStatus } from "~/lib/apps/status-store";
import { appManageNav } from "~/lib/apps/nav";
import { useT } from "~/lib/common/i18n";

const STATUS_DOT: Record<ManageStatus, string> = {
  online: "bg-emerald-400",
  error: "bg-orange-400",
  down: "bg-red-400",
  hide: "bg-slate-400",
  maintenance: "bg-amber-400",
};

const STATUS_BG: Record<ManageStatus, string> = {
  online: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  error: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  down: "bg-red-500/10 text-red-400 border-red-500/20",
  hide: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  maintenance: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function ManageStatus() {
  const t = useT("apps");
  const auth = useAuth();
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [infoApp, setInfoApp] = createSignal<AppDef | null>(null);

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const statusOptions = () => [
    { label: t().statusOnline, value: "online" as ManageStatus },
    { label: t().statusError, value: "error" as ManageStatus },
    { label: t().statusDown, value: "down" as ManageStatus },
    { label: t().statusHide, value: "hide" as ManageStatus },
    { label: t().statusMaintenance, value: "maintenance" as ManageStatus },
  ];

  const statusLabel = (s: ManageStatus) => {
    const map: Record<ManageStatus, string> = {
      online: t().statusOnline,
      error: t().statusError,
      down: t().statusDown,
      hide: t().statusHide,
      maintenance: t().statusMaintenance,
    };
    return map[s];
  };

  const currentUser = () => auth.user()?.username || "admin";

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().manageTitle} icon="lucide:boxes" slug="superapp" sections={appManageNav}>
        <div class="pb-12 space-y-4">
          <PageHeader title={t().statusPageTitle} icon="lucide:activity" description={t().statusPageDesc} />

          <div class="bg-surface-1 rounded-xl border border-surface-3/30 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-surface-2/50 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3 font-medium">{t().colApp}</th>
                  <th class="text-left px-4 py-3 font-medium w-44">{t().colStatus}</th>
                  <th class="text-left px-4 py-3 font-medium w-48">{t().colMaintenanceFrom}</th>
                  <th class="text-left px-4 py-3 font-medium w-48">{t().colMaintenanceTo}</th>
                  <th class="text-left px-4 py-3 font-medium w-12">{t().colHistory}</th>
                </tr>
              </thead>
              <tbody>
                <For each={APPS}>
                  {(app) => {
                    const st = () => AppStatusStore.getStatus(app.slug);
                    const isMaintenance = () => st().status === "maintenance";

                    return (
                      <tr class="border-t border-surface-3/30 hover:bg-surface-0/50 transition-colors">
                        <td class="px-4 py-3">
                          <div class="flex items-center gap-2">
                            <span class={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[st().status]}`} />
                            <AppIcon icon={app.icon} size={16} style={{ color: app.brandColor }} />
                            <span class="font-medium text-text-primary">{app.name}</span>
                          </div>
                        </td>
                        <td class="px-4 py-3">
                          <Select
                            value={st().status}
                            onChange={(v) => {
                              AppStatusStore.setStatus(app.slug, v as ManageStatus, st().maintenanceFrom, st().maintenanceTo, currentUser());
                            }}
                            options={statusOptions()}
                          />
                        </td>
                        <td class="px-4 py-3">
                          <Show when={isMaintenance()} fallback={<span class="text-text-muted text-xs">{t().dash}</span>}>
                            <Input
                              type="datetime-local"
                              value={st().maintenanceFrom || ""}
                              onInput={(v) => AppStatusStore.setStatus(app.slug, "maintenance", v, st().maintenanceTo, currentUser())}
                            />
                          </Show>
                        </td>
                        <td class="px-4 py-3">
                          <Show when={isMaintenance()} fallback={<span class="text-text-muted text-xs">{t().dash}</span>}>
                            <Input
                              type="datetime-local"
                              value={st().maintenanceTo || ""}
                              onInput={(v) => AppStatusStore.setStatus(app.slug, "maintenance", st().maintenanceFrom, v, currentUser())}
                            />
                          </Show>
                        </td>
                        <td class="px-4 py-3">
                          <button type="button" onClick={() => setInfoApp(app)} class="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-2 transition-colors">
                            <AppIcon icon="lucide:info" size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  }}
                </For>
              </tbody>
            </table>
          </div>
        </div>

        <Modal open={!!infoApp()} onClose={() => setInfoApp(null)} title={t().statusInfoTitle} icon="lucide:history" size="md">
          <Show when={infoApp()}>
            {(app) => {
              const st = () => AppStatusStore.getStatus(app().slug);
              const hasPrevious = () => !!st().previousStatus;

              return (
                <div class="space-y-4">
                  <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                    <AppIcon icon={app().icon} size={20} style={{ color: app().brandColor }} />
                    <div>
                      <p class="font-medium text-text-primary">{app().name}</p>
                      <p class="text-xs text-text-muted font-mono">{app().slug}</p>
                    </div>
                  </div>

                  <dl class="space-y-3">
                    <div class="flex items-center justify-between p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                      <dt class="text-sm text-text-muted">{t().statusCurrent}</dt>
                      <dd class={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-semibold ${STATUS_BG[st().status]}`}>
                        <span class={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[st().status]}`} />
                        {statusLabel(st().status)}
                      </dd>
                    </div>

                    <div class="flex items-center justify-between p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                      <dt class="text-sm text-text-muted">{t().statusPrevious}</dt>
                      <dd>
                        <Show when={hasPrevious()} fallback={<span class="text-xs text-text-muted">{t().dash}</span>}>
                          <span class={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-semibold ${STATUS_BG[st().previousStatus!]}`}>
                            <span class={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[st().previousStatus!]}`} />
                            {statusLabel(st().previousStatus!)}
                          </span>
                        </Show>
                      </dd>
                    </div>

                    <div class="flex items-center justify-between p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                      <dt class="text-sm text-text-muted">{t().statusUpdatedBy}</dt>
                      <dd class="text-sm text-text-primary">
                        <Show when={st().updatedBy} fallback={<span class="text-text-muted text-xs">{t().dash}</span>}>
                          {st().updatedBy}
                        </Show>
                      </dd>
                    </div>

                    <div class="flex items-center justify-between p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                      <dt class="text-sm text-text-muted">{t().statusUpdatedAt}</dt>
                      <dd class="text-sm text-text-primary font-mono text-xs">
                        <Show when={st().updatedAt} fallback={<span class="text-text-muted text-xs font-sans">{t().statusNeverUpdated}</span>}>
                          {st().updatedAt}
                        </Show>
                      </dd>
                    </div>
                  </dl>
                </div>
              );
            }}
          </Show>
        </Modal>
      </PrivateLayout>
    </Show>
  );
}
