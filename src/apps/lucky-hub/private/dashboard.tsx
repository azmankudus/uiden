import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Active Events", value: "3", icon: "lucide:calendar", color: "#3b82f6" },
  { label: "Total Participants", value: "1,247", icon: "lucide:users", color: "#10b981" },
  { label: "Draws Completed", value: "24", icon: "lucide:dice-5", color: "#8b5cf6" },
  { label: "Prizes Awarded", value: "89", icon: "lucide:trophy", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:trophy", text: "Winner selected in Annual Gala Grand Prize draw", time: "5 min ago", color: "#f59e0b" },
  { icon: "lucide:users", text: "45 new participants registered for Tech Summit", time: "22 min ago", color: "#10b981" },
  { icon: "lucide:dice-5", text: "Round 3 completed in Spring Festival event", time: "1 hr ago", color: "#8b5cf6" },
  { icon: "lucide:calendar", text: "New event 'Q2 Team Building' created", time: "3 hr ago", color: "#3b82f6" },
  { icon: "lucide:shield-check", text: "Draw verification passed for all rounds", time: "5 hr ago", color: "#10b981" },
  { icon: "lucide:trophy", text: "Prize distribution confirmed for 12 winners", time: "8 hr ago", color: "#f59e0b" },
];

const actions = [
  { icon: "lucide:plus", label: "New Event" },
  { icon: "lucide:dice-5", label: "Run Draw" },
  { icon: "lucide:users", label: "Participants" },
  { icon: "lucide:trophy", label: "Results" },
];

export default function LuckyHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Lucky-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Manage lucky draw events, participants, and fair randomization.</p>
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
