import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Total Secrets", value: "1,847", icon: "lucide:lock", color: "#8b5cf6" },
  { label: "Access Today", value: "342", icon: "lucide:activity", color: "#3b82f6" },
  { label: "Rotated", value: "89", icon: "lucide:refresh-cw", color: "#10b981" },
  { label: "Policies", value: "24", icon: "lucide:shield-check", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:refresh-cw", text: "API key rotated for payment-service", time: "3 min ago", color: "#10b981" },
  { icon: "lucide:lock", text: "New secret added: DB_CONNECTION_STAGING", time: "18 min ago", color: "#8b5cf6" },
  { icon: "lucide:shield-check", text: "Policy updated for engineering team access", time: "45 min ago", color: "#f59e0b" },
  { icon: "lucide:key-round", text: "Encryption key v3 activated for vault", time: "2 hr ago", color: "#3b82f6" },
  { icon: "lucide:activity", text: "342 secret accesses recorded today", time: "4 hr ago", color: "#06b6d4" },
  { icon: "lucide:circle-alert", text: "3 secrets expiring in 48 hours", time: "6 hr ago", color: "#ef4444" },
];

const actions = [
  { icon: "lucide:lock", label: "New Secret" },
  { icon: "lucide:key-round", label: "Generate Key" },
  { icon: "lucide:shield-check", label: "New Policy" },
  { icon: "lucide:refresh-cw", label: "Rotate All" },
];

export default function SecretHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Secret-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Centralized secret management with encryption, rotation, and audit.</p>
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
