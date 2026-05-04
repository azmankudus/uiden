import { onMount, Show, createSignal, For } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { APPS } from "~/lib/apps/apps";
import { AppStatusStore, type ManageStatus } from "~/lib/apps/status-store";
import { appManageNav } from "~/lib/apps/nav";
import { useT } from "~/lib/common/i18n";

const STATUS_COLORS: Record<ManageStatus, { bg: string; text: string; border: string; dot: string }> = {
  online: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400" },
  error: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", dot: "bg-orange-400" },
  down: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", dot: "bg-red-400" },
  hide: { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20", dot: "bg-slate-400" },
  maintenance: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", dot: "bg-amber-400" },
};

export default function ManageDashboard() {
  const t = useT("apps");
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const counts = () => AppStatusStore.counts();
  const total = () => APPS.length;

  const statusEntries = () => [
    { key: "online" as ManageStatus, label: t().statusOnline, icon: "lucide:check" },
    { key: "error" as ManageStatus, label: t().statusError, icon: "lucide:circle-alert" },
    { key: "down" as ManageStatus, label: t().statusDown, icon: "lucide:x" },
    { key: "hide" as ManageStatus, label: t().statusHidden, icon: "lucide:eye-off" },
    { key: "maintenance" as ManageStatus, label: t().statusMaintenance, icon: "lucide:wrench" },
  ];

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().manageTitle} icon="lucide:boxes" slug="superapp" sections={appManageNav}>
        <div class="pb-12 space-y-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-brand-dim flex items-center justify-center">
              <AppIcon icon="lucide:layout-dashboard" size={20} style={{ color: "var(--color-brand)" }} />
            </div>
            <div>
              <h1 class="font-display text-xl font-bold text-text-primary">{t().dashboardTitle}</h1>
              <p class="text-xs text-text-muted">{t().dashboardSubtitle}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <For each={statusEntries()}>
              {(entry) => {
                const c = STATUS_COLORS[entry.key];
                const count = () => counts()[entry.key];
                const pct = () => total() > 0 ? Math.round((count() / total()) * 100) : 0;
                return (
                  <div class={`p-4 rounded-xl border ${c.bg} ${c.border}`}>
                    <div class="flex items-center gap-2 mb-2">
                      <div class={`w-2 h-2 rounded-full ${c.dot}`} />
                      <span class={`text-xs font-semibold uppercase tracking-wider ${c.text}`}>{entry.label}</span>
                    </div>
                    <p class="font-display text-2xl font-extrabold text-text-primary">{count()}</p>
                    <div class="mt-2 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                      <div class={`h-full rounded-full ${c.dot} transition-all duration-500`} style={{ width: `${pct()}%` }} />
                    </div>
                    <p class="text-[10px] text-text-muted mt-1">{pct()}% {t().pctOf} {total()}</p>
                  </div>
                );
              }}
            </For>
          </div>

          <div class="p-6 rounded-xl bg-surface-1 border border-surface-3/30">
            <h2 class="font-display text-sm font-semibold text-text-primary mb-4">{t().statusDistribution}</h2>
            <div class="flex items-end gap-1 h-32">
              <For each={statusEntries()}>
                {(entry) => {
                  const c = STATUS_COLORS[entry.key];
                  const count = () => counts()[entry.key];
                  const pct = () => total() > 0 ? (count() / total()) * 100 : 0;
                  return (
                    <div class="flex-1 flex flex-col items-center gap-1">
                      <span class="text-xs font-bold text-text-primary">{count()}</span>
                      <div class="w-full rounded-t-lg transition-all duration-500" classList={{ [c.dot]: true, "opacity-80": true }} style={{ height: `${Math.max(pct(), 4)}%` }} />
                      <span class="text-[9px] text-text-muted leading-none">{entry.label}</span>
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        </div>
      </PrivateLayout>
    </Show>
  );
}
