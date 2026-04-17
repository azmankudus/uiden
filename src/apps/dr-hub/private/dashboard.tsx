import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "DR Plans", value: "8", icon: "lucide:scroll-text", color: "#3b82f6" },
  { label: "RPO Achievement", value: "99.2%", icon: "lucide:target", color: "#10b981" },
  { label: "RTO Target", value: "15min", icon: "lucide:clock", color: "#f59e0b" },
  { label: "Last Test", value: "3 days", icon: "lucide:flask-conical", color: "#8b5cf6" },
];

const activity = [
  { icon: "lucide:flask-conical", text: "DR test completed for Plan-West-Coast-Failover — PASSED", time: "10 min ago", color: "#10b981" },
  { icon: "lucide:scroll-text", text: "Plan DB-Cluster-DR updated: RPO adjusted to 5min", time: "1 hr ago", color: "#3b82f6" },
  { icon: "lucide:triangle-alert", text: "Runbook step timeout in App-Services-DR (step 4/8)", time: "3 hr ago", color: "#f59e0b" },
  { icon: "lucide:play", text: "Runbook Core-Network-Failover executed successfully", time: "5 hr ago", color: "#8b5cf6" },
  { icon: "lucide:shield-check", text: "Compliance report generated for Q1 2026", time: "8 hr ago", color: "#06b6d4" },
  { icon: "lucide:flask-conical", text: "DR test scheduled for Plan-East-Coast-Backup", time: "1 day ago", color: "#10b981" },
];

const actions = [
  { icon: "lucide:play", label: "Run Plan" },
  { icon: "lucide:flask-conical", label: "Schedule Test" },
  { icon: "lucide:scroll-text", label: "New Plan" },
  { icon: "lucide:book-open", label: "New Runbook" },
];

export default function DRHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">DR-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Disaster recovery planning and testing overview.</p>
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
