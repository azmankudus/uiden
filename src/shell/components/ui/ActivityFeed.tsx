import { For } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";

interface ActivityFeedProps {
  items: { icon: string; text: string; time: string; color?: string }[];
  title?: string;
}

export default function ActivityFeed(props: ActivityFeedProps) {
  return (
    <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
      <Show when={props.title}>
        <h2 class="font-display text-sm font-semibold text-text-primary mb-4">{props.title}</h2>
      </Show>
      <div class="space-y-3">
        <For each={props.items}>
          {(item) => (
            <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-2/50 transition-colors">
              <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-2 shrink-0 mt-0.5">
                <AppIcon
                  icon={item.icon}
                  size={14}
                  style={{ color: item.color || "var(--color-text-secondary)" }}
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-text-primary">{item.text}</p>
                <p class="text-xs text-text-muted mt-0.5">{item.time}</p>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
