import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Total Users", value: "1,247", icon: "lucide:users", color: "#3b82f6" },
  { label: "Active Sessions", value: "342", icon: "lucide:activity", color: "#10b981" },
  { label: "Groups", value: "48", icon: "lucide:users", color: "#8b5cf6" },
  { label: "MFA Enabled", value: "94%", icon: "lucide:shield", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:user-plus", text: "New user sarah.chen@example.com registered", time: "5 min ago", color: "#10b981" },
  { icon: "lucide:shield", text: "MFA enabled for admin@company.io", time: "22 min ago", color: "#3b82f6" },
  { icon: "lucide:log-out", text: "Suspicious login blocked from 192.168.45.12", time: "1 hr ago", color: "#ef4444" },
  { icon: "lucide:users", text: "Group 'Engineering' updated with 3 new members", time: "3 hr ago", color: "#8b5cf6" },
  { icon: "lucide:shield-check", text: "Password policy updated for all users", time: "5 hr ago", color: "#10b981" },
  { icon: "lucide:user-cog", text: "Role 'Auditor' created with 12 permissions", time: "8 hr ago", color: "#f59e0b" },
];

const actions = [
  { icon: "lucide:user-plus", label: "Add User" },
  { icon: "lucide:users", label: "New Group" },
  { icon: "lucide:shield", label: "Policies" },
  { icon: "lucide:scan", label: "Audit Log" },
];

export default function UserHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">User-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Manage identities, access, and security across your organization.</p>
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
