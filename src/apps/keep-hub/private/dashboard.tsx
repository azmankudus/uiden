import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Backup Jobs", value: "67", icon: "lucide:hard-drive", color: "#3b82f6" },
  { label: "Storage Used", value: "12.4TB", icon: "lucide:database", color: "#8b5cf6" },
  { label: "Success Rate", value: "99.1%", icon: "lucide:activity", color: "#10b981" },
  { label: "Last Backup", value: "2h ago", icon: "lucide:clock", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:hard-drive", text: "Full backup completed for prod-db-cluster (248GB)", time: "8 min ago", color: "#10b981" },
  { icon: "lucide:circle-alert", text: "Backup failed for legacy-fileserver-02 — retry scheduled", time: "25 min ago", color: "#ef4444" },
  { icon: "lucide:refresh-cw", text: "Recovery completed: web-app-07 restored to 06:00 snapshot", time: "1 hr ago", color: "#3b82f6" },
  { icon: "lucide:shield", text: "Policy Compliance-Weekly rotated: 30-day retention applied", time: "2 hr ago", color: "#8b5cf6" },
  { icon: "lucide:hard-drive", text: "Incremental backup completed for api-gateway (12GB)", time: "3 hr ago", color: "#10b981" },
  { icon: "lucide:zap", text: "Instant recovery VM spawned from backup web-prod-01", time: "5 hr ago", color: "#06b6d4" },
];

const actions = [
  { icon: "lucide:plus", label: "New Backup" },
  { icon: "lucide:refresh-cw", label: "Restore" },
  { icon: "lucide:shield", label: "Policies" },
  { icon: "lucide:clock", label: "Schedule" },
];

export default function KeepHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Keep-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Backup and recovery infrastructure overview.</p>
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
