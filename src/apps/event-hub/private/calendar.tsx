import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const april2026 = [
  [null, null, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, null, null, null],
];

const eventDays = new Set([2, 8, 10, 15, 17, 18, 20, 22, 23, 25, 30]);

export default function CalendarPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Calendar" description="Month view of scheduled events for April 2026." icon="lucide:calendar-days" iconColor="#10b981" />

      <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-display text-lg font-bold text-text-primary">April 2026</h2>
          <div class="flex items-center gap-2">
            <span class="flex items-center gap-1.5 text-xs text-text-muted">
              <span class="w-2 h-2 rounded-full bg-brand" />
              Has events
            </span>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1 mb-2">
          <For each={DAYS}>
            {(day) => (
              <div class="text-center text-xs font-medium text-text-muted py-2">{day}</div>
            )}
          </For>
        </div>

        <div class="grid grid-cols-7 gap-1">
          <For each={april2026.flat()}>
            {(day) => (
              <div
                class="relative aspect-square flex items-center justify-center rounded-xl text-sm transition-colors"
                classList={{
                  "bg-surface-0": day !== null,
                  "hover:bg-surface-2/50": day !== null,
                  "bg-brand/10 border border-brand/30": day !== null && eventDays.has(day as number),
                  "text-text-primary font-semibold": day !== null && eventDays.has(day as number),
                  "text-text-secondary": day !== null && !eventDays.has(day as number),
                }}
              >
                {day}
                <Show when={day !== null && eventDays.has(day as number)}>
                  <span class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand" />
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
