import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Open Tickets", value: "142", icon: "lucide:ticket", color: "#3b82f6" },
  { label: "Avg Resolution", value: "4.2h", icon: "lucide:clock", color: "#f59e0b" },
  { label: "SLA Compliance", value: "96%", icon: "lucide:check", color: "#10b981" },
  { label: "Today's Tickets", value: "23", icon: "lucide:inbox", color: "#8b5cf6" },
];

const activity = [
  { icon: "lucide:ticket", text: "INC-4821 escalated to L2 — database connection timeout", time: "3 min ago", color: "#ef4444" },
  { icon: "lucide:check", text: "SR-3294 resolved: VPN access granted for j.smith", time: "12 min ago", color: "#10b981" },
  { icon: "lucide:git-merge", text: "CR-0847 approved by change advisory board", time: "35 min ago", color: "#3b82f6" },
  { icon: "lucide:triangle-alert", text: "SLA breach warning: INC-4819 approaching 4h threshold", time: "1 hr ago", color: "#f59e0b" },
  { icon: "lucide:ticket", text: "SR-3298 created: New laptop request — onboarding batch #47", time: "2 hr ago", color: "#8b5cf6" },
  { icon: "lucide:clock", text: "Weekly SLA report generated: 96% compliance", time: "4 hr ago", color: "#06b6d4" },
];

const actions = [
  { icon: "lucide:ticket", label: "New Ticket" },
  { icon: "lucide:git-merge", label: "Change Request" },
  { icon: "lucide:triangle-alert", label: "Report Incident" },
  { icon: "lucide:bar-chart-3", label: "Reports" },
];

export default function TicketHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Ticket-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Service management and ticketing overview.</p>
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
