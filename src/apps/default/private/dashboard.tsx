import { For } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";
import AppLogo from "~/shell/lib/app-logo";
import { useAuth } from "~/shell/context/auth";
import type { AppDef } from "~/gateway/lib/apps";

interface Props {
  app: { name: string; slug: string; icon: string };
}

const activity = [
  { icon: "lucide:circle-check", text: "System health check passed", time: "2 min ago" },
  { icon: "lucide:user-plus", text: "New team member added", time: "1 hr ago" },
  { icon: "lucide:settings", text: "Configuration updated", time: "3 hr ago" },
  { icon: "lucide:scroll-text", text: "Audit log exported", time: "5 hr ago" },
];

export default function DefaultDashboard(props: Props) {
  const auth = useAuth();

  return (
    <div class="max-w-4xl mx-auto page-enter">
      <div class="flex items-center gap-5 mb-8">
        <AppLogo slug={props.app.slug} size={56} />
        <div>
          <h1 class="font-display text-2xl font-bold text-text-primary">
            {props.app.name}
          </h1>
          <p class="text-sm text-text-secondary mt-1">Welcome back, <span class="text-brand">{auth.user()?.displayName}</span></p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
          <div class="flex items-center gap-2 mb-3">
            <AppIcon icon="lucide:activity" size={16} style={{ color: "#10b981" }} />
            <span class="text-xs font-medium text-text-muted">Status</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-sm font-semibold text-text-primary">Operational</span>
          </div>
        </div>
        <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
          <div class="flex items-center gap-2 mb-3">
            <AppIcon icon="lucide:clock" size={16} style={{ color: "#f59e0b" }} />
            <span class="text-xs font-medium text-text-muted">Uptime (30d)</span>
          </div>
          <span class="text-sm font-semibold text-text-primary">99.98%</span>
        </div>
        <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
          <div class="flex items-center gap-2 mb-3">
            <AppIcon icon="lucide:users" size={16} style={{ color: "#3b82f6" }} />
            <span class="text-xs font-medium text-text-muted">Active Users</span>
          </div>
          <span class="text-sm font-semibold text-text-primary">{auth.user()?.role === "Admin" ? "24" : auth.user()?.role === "Director" ? "12" : "8"}</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
        <h2 class="font-display text-sm font-semibold text-text-primary mb-4">Recent Activity</h2>
        <div class="space-y-3">
          <For each={activity}>
            {(item) => (
              <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-2/50 transition-colors">
                <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-2 shrink-0">
                  <AppIcon icon={item.icon} size={14} class="text-text-secondary" />
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
    </div>
  );
}
