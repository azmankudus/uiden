import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Log Sources", value: "28", icon: "lucide:server", color: "#3b82f6" },
  { label: "Ingested Today", value: "4.2M", icon: "lucide:scroll-text", color: "#8b5cf6" },
  { label: "Active Searches", value: "12", icon: "lucide:search", color: "#f59e0b" },
  { label: "Alerts Triggered", value: "7", icon: "lucide:bell-ring", color: "#ef4444" },
];

const activity = [
  { icon: "lucide:bell-ring", text: "Alert triggered: 502 errors exceeded threshold on api-gateway", time: "1 min ago", color: "#ef4444" },
  { icon: "lucide:scroll-text", text: "Log ingestion from k8s-cluster-01 reached 1.2M entries/hour", time: "15 min ago", color: "#8b5cf6" },
  { icon: "lucide:search", text: "Saved search 'auth-failures-24h' returned 342 matches", time: "32 min ago", color: "#3b82f6" },
  { icon: "lucide:server", text: "New source connected: load-balancer-west-02 syslog feed", time: "1 hr ago", color: "#10b981" },
  { icon: "lucide:bell-ring", text: "Alert resolved: disk-space-warning on logging-node-03", time: "2 hr ago", color: "#f59e0b" },
  { icon: "lucide:scroll-text", text: "Index rotation completed: archived 8.4M entries to cold storage", time: "4 hr ago", color: "#06b6d4" },
];

const actions = [
  { icon: "lucide:scroll-text", label: "Browse Logs" },
  { icon: "lucide:search", label: "New Search" },
  { icon: "lucide:bell-ring", label: "Alert Rules" },
  { icon: "lucide:server", label: "Add Source" },
];

export default function LogHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Log-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Centralized log management and analysis overview.</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <For each={stats}>
          {(s) => <StatCard label={s.label} value={s.value} icon={s.icon} color={s.color} />}
        </For>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <ActivityFeed items={activity} title="Recent Activity" />
        </div>
        <ActionGrid actions={actions} />
      </div>
    </div>
  );
}
