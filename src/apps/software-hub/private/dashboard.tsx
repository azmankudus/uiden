import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Software Packages", value: "1,247", icon: "lucide:package", color: "#3b82f6" },
  { label: "Repositories", value: "12", icon: "lucide:warehouse", color: "#8b5cf6" },
  { label: "Updates Available", value: "34", icon: "lucide:refresh-cw", color: "#f59e0b" },
  { label: "Licensed", value: "98%", icon: "lucide:shield-check", color: "#10b981" },
];

const activity = [
  { icon: "lucide:package", text: "nginx 1.27.4 added to production repository", time: "5 min ago", color: "#3b82f6" },
  { icon: "lucide:refresh-cw", text: "Repository ubuntu-noble synced — 23 new packages", time: "18 min ago", color: "#10b981" },
  { icon: "lucide:triangle-alert", text: "34 updates available across 8 systems", time: "42 min ago", color: "#f59e0b" },
  { icon: "lucide:shield-check", text: "License audit completed: 98.2% compliance rate", time: "1 hr ago", color: "#8b5cf6" },
  { icon: "lucide:package", text: "PostgreSQL 16.3 promoted to stable channel", time: "3 hr ago", color: "#06b6d4" },
  { icon: "lucide:warehouse", text: "New mirror endpoint added: asia-east1.proxy", time: "5 hr ago", color: "#3b82f6" },
];

const actions = [
  { icon: "lucide:package", label: "Add Package" },
  { icon: "lucide:warehouse", label: "Add Repo" },
  { icon: "lucide:refresh-cw", label: "Sync All" },
  { icon: "lucide:file-text", label: "License Report" },
];

export default function SoftwareHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Software-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Software inventory, repositories, and lifecycle management.</p>
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
