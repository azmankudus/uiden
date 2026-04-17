import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import AppIcon from "~/shell/lib/app-icon";

const laps = [
  { lap: "1", split: "00:01:02.34", total: "00:01:02.34" },
  { lap: "2", split: "00:00:58.12", total: "00:02:00.46" },
  { lap: "3", split: "00:01:05.78", total: "00:03:06.24" },
  { lap: "4", split: "00:00:55.90", total: "00:04:02.14" },
  { lap: "5", split: "00:01:08.45", total: "00:05:10.59" },
  { lap: "6", split: "00:00:52.86", total: "00:06:03.45" },
  { lap: "7", split: "00:01:11.20", total: "00:07:14.65" },
  { lap: "8", split: "00:01:03.80", total: "00:08:18.45" },
];

export default function StopwatchPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Stopwatch" description="Precise stopwatch with lap timing and split tracking." icon="lucide:timer" iconColor="#8b5cf6" />

      <div class="p-8 rounded-2xl bg-surface-1 border border-surface-3/30 text-center mb-6">
        <div class="font-mono text-6xl font-bold text-text-primary tracking-wider mb-8">
          00:05:23<span class="text-3xl text-text-muted">.45</span>
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
            <AppIcon icon="lucide:flag" size={16} />
            Lap
          </button>
          <button type="button" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
            <AppIcon icon="lucide:refresh-cw" size={16} />
            Reset
          </button>
        </div>
      </div>

      <div class="rounded-2xl bg-surface-1 border border-surface-3/30 overflow-hidden">
        <div class="grid grid-cols-3 gap-4 px-5 py-3 border-b border-surface-3/30 text-xs font-medium text-text-muted">
          <span>Lap</span>
          <span>Split Time</span>
          <span>Total Time</span>
        </div>
        <For each={laps}>
          {(lap) => (
            <div class="grid grid-cols-3 gap-4 px-5 py-3 border-b border-surface-3/20 last:border-0 hover:bg-surface-2/30 transition-colors">
              <span class="text-sm text-text-primary font-medium">Lap {lap.lap}</span>
              <span class="text-sm text-text-primary font-mono">{lap.split}</span>
              <span class="text-sm text-text-secondary font-mono">{lap.total}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
