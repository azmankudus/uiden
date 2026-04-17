import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import AppIcon from "~/shell/lib/app-icon";

const recentTimers = [
  { name: "Stand-up Meeting", duration: "15:00", remaining: "Completed", status: "done" },
  { name: "Code Review", duration: "30:00", remaining: "Completed", status: "done" },
  { name: "Lunch Break", duration: "60:00", remaining: "12:45", status: "active" },
  { name: "Focus Sprint", duration: "25:00", remaining: "25:00", status: "paused" },
  { name: "Tea Break", duration: "10:00", remaining: "Completed", status: "done" },
  { name: "Brainstorm Session", duration: "45:00", remaining: "Completed", status: "done" },
];

export default function TimerPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Timer" description="Countdown timers with presets and notifications." icon="lucide:clock" iconColor="#10b981" />

      <div class="p-8 rounded-2xl bg-surface-1 border border-surface-3/30 text-center mb-6">
        <div class="font-mono text-6xl font-bold text-text-primary tracking-wider mb-8">
          24:30
        </div>
        <div class="flex items-center justify-center gap-3">
          <button type="button" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
            <AppIcon icon="lucide:play" size={16} />
            Start
          </button>
          <button type="button" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
            <AppIcon icon="lucide:pause" size={16} />
            Pause
          </button>
          <button type="button" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
            <AppIcon icon="lucide:refresh-cw" size={16} />
            Reset
          </button>
        </div>
      </div>

      <div class="rounded-2xl bg-surface-1 border border-surface-3/30 overflow-hidden">
        <div class="px-5 py-3 border-b border-surface-3/30">
          <h3 class="text-sm font-semibold text-text-primary">Recent Timers</h3>
        </div>
        <div class="grid grid-cols-3 gap-4 px-5 py-3 border-b border-surface-3/30 text-xs font-medium text-text-muted">
          <span>Name</span>
          <span>Duration</span>
          <span>Remaining</span>
        </div>
        <For each={recentTimers}>
          {(t) => (
            <div class="grid grid-cols-3 gap-4 px-5 py-3 border-b border-surface-3/20 last:border-0 hover:bg-surface-2/30 transition-colors items-center">
              <span class="text-sm text-text-primary font-medium">{t.name}</span>
              <span class="text-sm text-text-secondary font-mono">{t.duration}</span>
              <span class={`text-sm font-mono ${t.status === "active" ? "text-green-400" : t.status === "paused" ? "text-text-muted" : "text-text-secondary"}`}>
                {t.remaining}
              </span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
