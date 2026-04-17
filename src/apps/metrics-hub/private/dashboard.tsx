import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Monitored Systems", value: "247", icon: "lucide:activity", color: "#3b82f6" },
  { label: "Active Alerts", value: "3", icon: "lucide:bell-ring", color: "#ef4444" },
  { label: "Avg Response", value: "42ms", icon: "lucide:gauge", color: "#10b981" },
  { label: "Uptime", value: "99.97%", icon: "lucide:check", color: "#8b5cf6" },
];

const activity = [
  { icon: "lucide:bell-ring", text: "Critical alert: api-gateway-02 CPU > 95% for 5 minutes", time: "2 min ago", color: "#ef4444" },
  { icon: "lucide:check", text: "Alert resolved: db-primary-01 disk usage returned to normal", time: "18 min ago", color: "#10b981" },
  { icon: "lucide:activity", text: "Zabbix agent reconnected on worker-node-14", time: "45 min ago", color: "#3b82f6" },
  { icon: "lucide:gauge", text: "Dynatrace sync completed: 247 hosts, 1,842 services", time: "1 hr ago", color: "#8b5cf6" },
  { icon: "lucide:bell-ring", text: "Warning: SSL certificate expires in 14 days for cdn.example.com", time: "2 hr ago", color: "#f59e0b" },
  { icon: "lucide:activity", text: "New monitor added: latency-check for payment-service", time: "4 hr ago", color: "#06b6d4" },
];

const actions = [
  { icon: "lucide:activity", label: "Add Monitor" },
  { icon: "lucide:bell-ring", label: "Alert Rules" },
  { icon: "lucide:gauge", label: "Dashboard" },
  { icon: "lucide:file-text", label: "Health Report" },
];

export default function MetricsHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Metrics-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Infrastructure observability and monitoring overview.</p>
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
