import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Active Jobs", value: "89", icon: "lucide:play", color: "#3b82f6" },
  { label: "Scripts", value: "234", icon: "lucide:file-code", color: "#8b5cf6" },
  { label: "Schedules", value: "56", icon: "lucide:clock", color: "#f59e0b" },
  { label: "Success Rate", value: "98.7%", icon: "lucide:check", color: "#10b981" },
];

const activity = [
  { icon: "lucide:play", text: "Job JOB-4821 started: deploy-web-cluster.sh on 12 hosts", time: "2 min ago", color: "#3b82f6" },
  { icon: "lucide:check", text: "Job JOB-4819 completed successfully in 4m 32s", time: "15 min ago", color: "#10b981" },
  { icon: "lucide:triangle-alert", text: "Job JOB-4818 failed on host db-worker-03 — timeout exceeded", time: "28 min ago", color: "#ef4444" },
  { icon: "lucide:file-code", text: "Script ansible-patch-critical.yml updated by ops-team", time: "1 hr ago", color: "#8b5cf6" },
  { icon: "lucide:clock", text: "Schedule nightly-cleanup triggered for 3 target groups", time: "2 hr ago", color: "#f59e0b" },
  { icon: "lucide:play", text: "Terraform plan completed: 14 additions, 2 modifications", time: "3 hr ago", color: "#06b6d4" },
];

const actions = [
  { icon: "lucide:play", label: "Run Job" },
  { icon: "lucide:file-code", label: "New Script" },
  { icon: "lucide:clock", label: "New Schedule" },
  { icon: "lucide:file-text", label: "View Logs" },
];

export default function AutoHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Auto-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Automation jobs, scripts, and scheduled tasks overview.</p>
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
