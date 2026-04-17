import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Total Assets", value: "2,847", icon: "lucide:hard-drive", color: "#3b82f6" },
  { label: "Licenses", value: "456", icon: "lucide:key-round", color: "#8b5cf6" },
  { label: "Utilization", value: "78%", icon: "lucide:bar-chart-3", color: "#10b981" },
  { label: "Warranty Expiring", value: "23", icon: "lucide:clock", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:hard-drive", text: "New server SRV-042 added to Data Center A", time: "5 min ago", color: "#3b82f6" },
  { icon: "lucide:key-round", text: "License renewal pending for Adobe Creative Cloud", time: "22 min ago", color: "#f59e0b" },
  { icon: "lucide:bar-chart-3", text: "Storage capacity reached 85% on Cluster-03", time: "1 hr ago", color: "#ef4444" },
  { icon: "lucide:package", text: "Software audit completed for Engineering dept", time: "3 hr ago", color: "#10b981" },
  { icon: "lucide:hard-drive", text: "Workstation WS-178 reassigned to Marketing", time: "5 hr ago", color: "#8b5cf6" },
  { icon: "lucide:clock", text: "Warranty expiring in 30 days for 23 assets", time: "8 hr ago", color: "#f59e0b" },
];

const actions = [
  { icon: "lucide:plus", label: "Add Asset" },
  { icon: "lucide:key-round", label: "New License" },
  { icon: "lucide:bar-chart-3", label: "Capacity Report" },
  { icon: "lucide:scan", label: "Run Audit" },
];

export default function AssetHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Asset-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Track and manage your organization's assets, licenses, and capacity.</p>
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
