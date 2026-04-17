import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Running VMs", value: "142", icon: "lucide:monitor", color: "#10b981" },
  { label: "Clusters", value: "6", icon: "lucide:boxes", color: "#3b82f6" },
  { label: "CPU Usage", value: "67%", icon: "lucide:cpu", color: "#f59e0b" },
  { label: "Memory Usage", value: "74%", icon: "lucide:database", color: "#8b5cf6" },
];

const activity = [
  { icon: "lucide:monitor", text: "VM web-prod-03 live migrated to cluster-west-2", time: "2 min ago", color: "#10b981" },
  { icon: "lucide:boxes", text: "New host hv-08 added to cluster-east-1", time: "15 min ago", color: "#3b82f6" },
  { icon: "lucide:circle-alert", text: "High CPU alert on db-replica-02 (92%)", time: "32 min ago", color: "#f59e0b" },
  { icon: "lucide:camera", text: "Snapshot created for api-gateway-01", time: "1 hr ago", color: "#8b5cf6" },
  { icon: "lucide:monitor", text: "VM staging-app-05 provisioned from template", time: "2 hr ago", color: "#06b6d4" },
  { icon: "lucide:zap", text: "Automatic load balancing triggered on cluster-west-1", time: "3 hr ago", color: "#10b981" },
];

const actions = [
  { icon: "lucide:plus", label: "New VM" },
  { icon: "lucide:camera", label: "Snapshot" },
  { icon: "lucide:zap", label: "Migrate" },
  { icon: "lucide:layers", label: "Templates" },
];

export default function VirtualHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Virtual-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Monitor and manage your virtualization infrastructure.</p>
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
