import { createSignal, For, Show } from "solid-js";
import PrivateLayout from "~/components/sample/PrivateLayout";
import AppIcon from "~/components/AppIcon";
import { useAuth } from "~/components/AuthProvider";

const stats = [
  { label: "Total Apps", value: "100", icon: "lucide:boxes", color: "#06d6a0" },
  { label: "Active Users", value: "2,847", icon: "lucide:users", color: "#3b82f6" },
  { label: "Uptime", value: "99.98%", icon: "lucide:activity", color: "#f59e0b" },
  { label: "Incidents", value: "0", icon: "lucide:shield", color: "#10b981" },
];

const activity = [
  { icon: "lucide:key-round", text: "API key rotated for Pipeline CI", time: "2 min ago" },
  { icon: "lucide:user-plus", text: "New user Sarah Chen joined the team", time: "15 min ago" },
  { icon: "lucide:rocket", text: "Deploy Bot released v3.2.1 to production", time: "1 hr ago" },
  { icon: "lucide:shield-check", text: "Compliance scan completed — all checks passed", time: "3 hr ago" },
  { icon: "lucide:scroll-text", text: "Log Stream archived 12.4 GB of logs", time: "5 hr ago" },
  { icon: "lucide:code", text: "Stack Builder template updated by DevOps team", time: "8 hr ago" },
];

const quickActions = [
  { icon: "lucide:user-plus", label: "Invite User", href: "/sample/private/admin/users" },
  { icon: "lucide:bar-chart-3", label: "View Reports", href: "/sample/private" },
  { icon: "lucide:settings", label: "Settings", href: "/sample/private/admin/settings" },
  { icon: "lucide:scroll-text", label: "Audit Log", href: "/sample/private/admin/audit" },
];

export default function PrivateIndex() {
  const auth = useAuth();
  const [hoveredStat, setHoveredStat] = createSignal(-1);

  return (
    <PrivateLayout>
      <div class="max-w-6xl mx-auto page-enter">
        <div class="mb-8">
          <h1 class="font-display text-2xl font-bold text-text-primary">
            Welcome back, <span class="text-brand">{auth.user()?.displayName}</span>
          </h1>
          <p class="text-sm text-text-secondary mt-1">Here's an overview of your platform today.</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <For each={stats}>
            {(s, i) => (
              <div
                class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30 hover:border-brand/30 transition-all"
                onMouseEnter={() => setHoveredStat(i())}
                onMouseLeave={() => setHoveredStat(-1)}
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center justify-center w-9 h-9 rounded-xl" style={{ "background-color": s.color + "20" }}>
                    <AppIcon icon={s.icon} size={18} style={{ color: s.color }} />
                  </div>
                  <Show when={hoveredStat() === i()}>
                    <div class="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  </Show>
                </div>
                <div class="font-display text-2xl font-bold text-text-primary">{s.value}</div>
                <div class="text-xs text-text-muted mt-1">{s.label}</div>
              </div>
            )}
          </For>
        </div>

        <div class="grid lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
            <h2 class="font-display text-sm font-semibold text-text-primary mb-4">Recent Activity</h2>
            <div class="space-y-3">
              <For each={activity}>
                {(item) => (
                  <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-2/50 transition-colors">
                    <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-2 shrink-0 mt-0.5">
                      <AppIcon icon={item.icon} size={14} style={{ color: "var(--color-text-secondary)" }} />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-text-primary">{item.text}</p>
                      <p class="text-xs text-text-muted mt-0.5">{item.time}</p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
            <h2 class="font-display text-sm font-semibold text-text-primary mb-4">Quick Actions</h2>
            <div class="grid grid-cols-2 gap-3">
              <For each={quickActions}>
                {(action) => (
                  <a
                    href={action.href}
                    class="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2/50 border border-surface-3/20 hover:border-brand/30 hover:bg-surface-2 transition-all text-center"
                  >
                    <AppIcon icon={action.icon} size={20} style={{ color: "var(--color-brand)" }} />
                    <span class="text-xs font-medium text-text-secondary">{action.label}</span>
                  </a>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
