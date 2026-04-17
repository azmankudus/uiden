import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Active Sessions", value: "23", icon: "lucide:monitor", color: "#10b981" },
  { label: "Registered Machines", value: "156", icon: "lucide:server", color: "#3b82f6" },
  { label: "Avg Latency", value: "45ms", icon: "lucide:zap", color: "#8b5cf6" },
  { label: "Recordings", value: "1.2K", icon: "lucide:video", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:monitor", text: "RDP session started on PROD-SRV-01", time: "5 min ago", color: "#10b981" },
  { icon: "lucide:shield", text: "SSH access approved for dev@company.io", time: "22 min ago", color: "#3b82f6" },
  { icon: "lucide:circle-alert", text: "Session timeout triggered for staging-03", time: "1 hr ago", color: "#f59e0b" },
  { icon: "lucide:video", text: "Recording completed: 2hr 34min on DB-MASTER", time: "3 hr ago", color: "#8b5cf6" },
  { icon: "lucide:server", text: "New machine WEB-05 registered in DMZ zone", time: "5 hr ago", color: "#10b981" },
  { icon: "lucide:lock", text: "Policy violation: unauthorized VNC attempt blocked", time: "8 hr ago", color: "#ef4444" },
];

const actions = [
  { icon: "lucide:monitor", label: "New Session" },
  { icon: "lucide:server", label: "Add Machine" },
  { icon: "lucide:shield", label: "Policies" },
  { icon: "lucide:video", label: "Recordings" },
];

export default function RemoteHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Remote-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Monitor remote sessions, machines, and access policies.</p>
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
