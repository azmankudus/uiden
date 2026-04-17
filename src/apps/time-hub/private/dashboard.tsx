import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "World Clocks", value: "8", icon: "lucide:globe", color: "#3b82f6" },
  { label: "Active Timers", value: "3", icon: "lucide:clock", color: "#10b981" },
  { label: "Stopwatches Used", value: "47", icon: "lucide:timer", color: "#8b5cf6" },
  { label: "Alarms Set", value: "12", icon: "lucide:bell", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:timer", text: "Stopwatch session completed: 45min 23sec", time: "5 min ago", color: "#8b5cf6" },
  { icon: "lucide:bell", text: "Timer 'Stand-up reminder' triggered", time: "22 min ago", color: "#f59e0b" },
  { icon: "lucide:globe", text: "Tokyo clock added to world clock view", time: "1 hr ago", color: "#3b82f6" },
  { icon: "lucide:clock", text: "New countdown timer set for 2 hours", time: "3 hr ago", color: "#10b981" },
  { icon: "lucide:timer", text: "Lap record saved: 00:01:23.45", time: "5 hr ago", color: "#8b5cf6" },
  { icon: "lucide:bell", text: "Recurring alarm 'Daily standup' acknowledged", time: "8 hr ago", color: "#f59e0b" },
];

const actions = [
  { icon: "lucide:globe", label: "World Clock" },
  { icon: "lucide:timer", label: "Stopwatch" },
  { icon: "lucide:clock", label: "Timer" },
  { icon: "lucide:bell", label: "Alarms" },
];

export default function TimeHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Time-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">World clocks, stopwatches, timers, and alarms all in one place.</p>
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
