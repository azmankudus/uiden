import { onMount, Show, createSignal, For } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { ManagementStore } from "~/lib/login/store";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

export default function LoginDashboard() {
  const t = useT("login");
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const activeUsers = () => ManagementStore.users().filter(u => u.status === "active").length;
  const enabledProviders = () => ManagementStore.authProviders().filter(p => p.enabled).length;

  const stats = () => [
    { label: t().statUsers, value: ManagementStore.users().length, icon: "lucide:users", color: "text-brand" },
    { label: t().statActiveUsers, value: activeUsers(), icon: "lucide:user-check", color: "text-emerald-400" },
    { label: t().statGroups, value: ManagementStore.roles().length, icon: "lucide:crown", color: "text-amber-400" },
    { label: t().statProviders, value: `${enabledProviders()} ${t().statEnabled}`, icon: "lucide:globe-lock", color: "text-blue-400" },
  ];

  const recentUsers = () => [...ManagementStore.users()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);
  const recentRoles = () => [...ManagementStore.roles()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 3);

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().manageTitle} icon="lucide:globe-lock" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12 space-y-6 animate-fade-up">
          <PageHeader title={t().dashboardTitle} icon="lucide:layout-dashboard" description={t().dashboardSubtitle} />

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <For each={stats()}>
              {(s) => (
                <div class="p-4 rounded-xl bg-surface-1 border border-surface-3/30">
                  <div class="flex items-center gap-2 mb-2">
                    <AppIcon icon={s.icon} size={16} class={s.color} style={{ color: "var(--color-text-muted)" }} />
                    <span class="text-xs font-medium text-text-muted">{s.label}</span>
                  </div>
                  <p class="font-display text-2xl font-extrabold text-text-primary">{s.value}</p>
                </div>
              )}
            </For>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="p-5 rounded-xl bg-surface-1 border border-surface-3/30">
              <h3 class="font-display text-sm font-semibold text-text-primary mb-3">{t().statUsers}</h3>
              <div class="space-y-2">
                <For each={recentUsers()}>
                  {(u) => (
                    <div class="flex items-center justify-between p-2 rounded-lg bg-surface-0 border border-surface-3/20">
                      <div class="flex items-center gap-2">
                        <AppIcon icon="lucide:user" size={14} style={{ color: "var(--color-text-muted)" }} />
                        <span class="text-sm text-text-primary">{u.name}</span>
                      </div>
                      <span class="text-xs text-text-muted">{u.updatedAt}</span>
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div class="p-5 rounded-xl bg-surface-1 border border-surface-3/30">
              <h3 class="font-display text-sm font-semibold text-text-primary mb-3">{t().statGroups}</h3>
              <div class="space-y-2">
                <For each={recentRoles()}>
                  {(g) => (
                    <div class="flex items-center justify-between p-2 rounded-lg bg-surface-0 border border-surface-3/20">
                      <div class="flex items-center gap-2">
                        <AppIcon icon="lucide:crown" size={14} style={{ color: "var(--color-text-muted)" }} />
                        <span class="text-sm text-text-primary">{g.name}</span>
                      </div>
                      <span class="text-xs text-text-muted">{g.updatedAt}</span>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
      </PrivateLayout>
    </Show>
  );
}
