import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Environments", value: "24", icon: "lucide:layers", color: "#3b82f6" },
  { label: "Running", value: "18", icon: "lucide:activity", color: "#10b981" },
  { label: "Deployments Today", value: "12", icon: "lucide:rocket", color: "#8b5cf6" },
  { label: "Health Score", value: "96%", icon: "lucide:heart-pulse", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:rocket", text: "Node.js v20.11 deployed to production cluster", time: "5 min ago", color: "#10b981" },
  { icon: "lucide:activity", text: "Health check failed for staging-java-02", time: "22 min ago", color: "#ef4444" },
  { icon: "lucide:layers", text: "New Python 3.12 environment created", time: "1 hr ago", color: "#3b82f6" },
  { icon: "lucide:refresh-cw", text: "Auto-scaling triggered for API gateway cluster", time: "3 hr ago", color: "#8b5cf6" },
  { icon: "lucide:heart-pulse", text: "Memory usage warning on .NET prod environment", time: "5 hr ago", color: "#f59e0b" },
  { icon: "lucide:rocket", text: "Rollback completed for microservice-auth v2.3.1", time: "8 hr ago", color: "#10b981" },
];

const actions = [
  { icon: "lucide:plus", label: "New Env" },
  { icon: "lucide:rocket", label: "Deploy" },
  { icon: "lucide:heart-pulse", label: "Health Check" },
  { icon: "lucide:settings", label: "Configs" },
];

export default function RuntimeHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Runtime-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Monitor and manage runtime environments across your infrastructure.</p>
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
