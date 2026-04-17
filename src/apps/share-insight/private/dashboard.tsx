import { useAuth } from "~/shell/context/auth";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import AppIcon from "~/shell/lib/app-icon";
import { A } from "@solidjs/router";
import { For } from "solid-js";

const stats = [
  { label: "Total Shares", value: "2,847", icon: "lucide:folder", color: "#3b82f6" },
  { label: "Open Permissions", value: "142", icon: "lucide:lock", color: "#f59e0b" },
  { label: "Compliance Score", value: "94%", icon: "lucide:gauge", color: "#10b981" },
  { label: "Avg Scan Time", value: "3.2s", icon: "lucide:clock", color: "#8b5cf6" },
];

const recentScans = [
  { icon: "lucide:scan-text", text: "Full scan completed on \\\\SERVER01\\Marketing", time: "5 min ago", color: "#10b981" },
  { icon: "lucide:triangle-alert", text: "Detected 12 overly permissive ACEs in \\\\FS03\\HR", time: "22 min ago", color: "#f59e0b" },
  { icon: "lucide:folder-search", text: "Scheduled scan started for /data/engineering", time: "1 hr ago", color: "#3b82f6" },
  { icon: "lucide:shield", text: "ACL inheritance restored on \\\\DC02\\Projects\\Alpha", time: "2 hr ago", color: "#8b5cf6" },
  { icon: "lucide:file-text", text: "Compliance report exported for Q1 2026 audit", time: "4 hr ago", color: "#06d6a0" },
  { icon: "lucide:radar", text: "Orphaned SID cleanup completed on \\\\NAS01\\Backup", time: "6 hr ago", color: "#ef4444" },
];

const quickActions = [
  { icon: "lucide:scan-text", label: "New Scan", href: "/share-insight/private/scans" },
  { icon: "lucide:folder", label: "Browse Folders", href: "/share-insight/private/folders" },
  { icon: "lucide:shield", label: "Permission Audit", href: "/share-insight/private/permissions" },
  { icon: "lucide:bar-chart-3", label: "View Reports", href: "/share-insight/private/reports" },
];

export default function Dashboard() {
  const auth = useAuth();

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">
          Welcome back, <span class="text-brand">{auth.user()?.displayName}</span>
        </h1>
        <p class="text-sm text-text-secondary mt-1">Monitor shared folder security and compliance at a glance.</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <For each={stats}>
          {(s) => <StatCard label={s.label} value={s.value} icon={s.icon} color={s.color} />}
        </For>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <ActivityFeed items={recentScans} title="Recent Scans" />
        </div>

        <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
          <h2 class="font-display text-sm font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div class="grid grid-cols-2 gap-3">
            <For each={quickActions}>
              {(action) => (
                <A
                  href={action.href}
                  class="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2/50 border border-surface-3/20 hover:border-brand/30 hover:bg-surface-2 transition-all text-center"
                >
                  <AppIcon icon={action.icon} size={20} style={{ color: "var(--color-brand)" }} />
                  <span class="text-xs font-medium text-text-secondary">{action.label}</span>
                </A>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}
