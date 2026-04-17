import { For } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";

interface ActionGridProps {
  actions: { icon: string; label: string; onClick?: () => void }[];
}

export default function ActionGrid(props: ActionGridProps) {
  return (
    <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
      <h2 class="font-display text-sm font-semibold text-text-primary mb-4">Actions</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <For each={props.actions}>
          {(action) => (
            <button
              type="button"
              onClick={action.onClick}
              class="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2/50 border border-surface-3/20 hover:border-brand/30 transition-all cursor-pointer"
            >
              <AppIcon icon={action.icon} size={18} style={{ color: "var(--color-brand)" }} />
              <span class="text-xs font-medium text-text-secondary">{action.label}</span>
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
