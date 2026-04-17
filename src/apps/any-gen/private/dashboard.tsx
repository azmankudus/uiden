import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Generators", value: "12", icon: "lucide:sparkles", color: "#8b5cf6" },
  { label: "Generated Today", value: "847", icon: "lucide:zap", color: "#10b981" },
  { label: "Presets", value: "24", icon: "lucide:bookmark", color: "#3b82f6" },
  { label: "History", value: "12.4K", icon: "lucide:clock", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:hash", text: "Generated 50 UUIDs for database migration", time: "5 min ago", color: "#10b981" },
  { icon: "lucide:type", text: "Lorem Ipsum batch: 10 paragraphs generated", time: "22 min ago", color: "#8b5cf6" },
  { icon: "lucide:users", text: "Random names batch: 100 entries for test data", time: "1 hr ago", color: "#3b82f6" },
  { icon: "lucide:bookmark", text: "Preset 'Standard UUID v4' updated", time: "3 hr ago", color: "#f59e0b" },
  { icon: "lucide:sparkles", text: "Custom regex pattern validated successfully", time: "5 hr ago", color: "#10b981" },
  { icon: "lucide:mail", text: "Email address generator: 200 unique addresses", time: "8 hr ago", color: "#8b5cf6" },
];

const actions = [
  { icon: "lucide:sparkles", label: "Quick Gen" },
  { icon: "lucide:bookmark", label: "New Preset" },
  { icon: "lucide:clock", label: "History" },
  { icon: "lucide:settings", label: "Settings" },
];

export default function AnyGenDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Any-Gen Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Your text generation toolkit for placeholder text, IDs, and test data.</p>
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
