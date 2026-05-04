import { onMount, Show, createSignal, For } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { APPS } from "~/lib/apps/apps";
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

const selectCls = "bg-surface-0 border border-surface-3 rounded-xl px-3 py-2 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand/50 transition appearance-none cursor-pointer";
const inputCls = "w-full bg-surface-0 border border-surface-3 rounded-xl px-3 py-2 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand/50 transition";

export default function ManageStatus() {
  const t = useT("apps");
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);

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

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().manageTitle} icon="lucide:boxes" slug="superapp" sections={appManageNav}>
        <div class="pb-12 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-dim flex items-center justify-center">
              <AppIcon icon="lucide:activity" size={20} style={{ color: "var(--color-brand)" }} />
            </div>
            <div>
              <h1 class="font-display text-xl font-bold text-text-primary">{t().statusPageTitle}</h1>
              <p class="text-xs text-text-muted">{t().statusPageDesc}</p>
            </div>
          </div>

          <div class="bg-surface-1 rounded-xl border border-surface-3/30 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-surface-2/50 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3 font-medium">{t().colApp}</th>
                  <th class="text-left px-4 py-3 font-medium w-44">{t().colStatus}</th>
                  <th class="text-left px-4 py-3 font-medium w-48">{t().colMaintenanceFrom}</th>
                  <th class="text-left px-4 py-3 font-medium w-48">{t().colMaintenanceTo}</th>
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
                          <select
                            value={st().status}
                            onChange={(e) => {
                              const v = e.currentTarget.value as ManageStatus;
                              AppStatusStore.setStatus(app.slug, v, st().maintenanceFrom, st().maintenanceTo);
                            }}
                            class={selectCls}
                          >
                            <For each={statusOptions()}>
                              {(opt) => <option value={opt.value}>{opt.label}</option>}
                            </For>
                          </select>
                        </td>
                        <td class="px-4 py-3">
                          <Show when={isMaintenance()} fallback={<span class="text-text-muted text-xs">{t().dash}</span>}>
                            <input
                              type="datetime-local"
                              value={st().maintenanceFrom || ""}
                              onInput={(e) => AppStatusStore.setStatus(app.slug, "maintenance", e.currentTarget.value, st().maintenanceTo)}
                              class={inputCls}
                            />
                          </Show>
                        </td>
                        <td class="px-4 py-3">
                          <Show when={isMaintenance()} fallback={<span class="text-text-muted text-xs">{t().dash}</span>}>
                            <input
                              type="datetime-local"
                              value={st().maintenanceTo || ""}
                              onInput={(e) => AppStatusStore.setStatus(app.slug, "maintenance", st().maintenanceFrom, e.currentTarget.value)}
                              class={inputCls}
                            />
                          </Show>
                        </td>
                      </tr>
                    );
                  }}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </PrivateLayout>
    </Show>
  );
}
