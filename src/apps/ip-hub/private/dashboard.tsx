import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Managed IPs", value: "4,096", icon: "lucide:network", color: "#3b82f6" },
  { label: "Subnets", value: "24", icon: "lucide:globe", color: "#10b981" },
  { label: "DNS Records", value: "1,847", icon: "lucide:server", color: "#8b5cf6" },
  { label: "DHCP Scopes", value: "12", icon: "lucide:wifi", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:network", text: "IP 10.0.42.105 assigned to build-agent-12", time: "3 min ago", color: "#3b82f6" },
  { icon: "lucide:globe", text: "DNS A record added: api.v3.example.com → 10.0.3.50", time: "18 min ago", color: "#10b981" },
  { icon: "lucide:circle-alert", text: "Subnet 10.0.15.0/24 utilization at 92%", time: "45 min ago", color: "#f59e0b" },
  { icon: "lucide:wifi", text: "DHCP lease pool expanded on scope floor-3-access", time: "1 hr ago", color: "#8b5cf6" },
  { icon: "lucide:network", text: "IP conflict detected on 10.0.8.201 — resolved", time: "2 hr ago", color: "#ef4444" },
  { icon: "lucide:globe", text: "MX record updated for example.com (priority 10)", time: "3 hr ago", color: "#06b6d4" },
];

const actions = [
  { icon: "lucide:plus", label: "Reserve IP" },
  { icon: "lucide:globe", label: "Add DNS" },
  { icon: "lucide:radar", label: "Scan Subnet" },
  { icon: "lucide:wifi", label: "DHCP Scope" },
];

export default function IPHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">IP-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Network and IP address management overview.</p>
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
