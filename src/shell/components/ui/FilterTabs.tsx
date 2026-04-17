import { For } from "solid-js";

interface FilterTabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
  count?: number;
}

export default function FilterTabs(props: FilterTabsProps) {
  return (
    <div class="flex items-center gap-2 mb-6">
      <For each={props.tabs}>
        {(tab) => (
          <button
            type="button"
            onClick={() => props.onChange(tab)}
            class={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              props.active === tab
                ? "bg-brand text-surface-0"
                : "bg-surface-2 text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        )}
      </For>
      <Show when={props.count !== undefined}>
        <span class="text-xs text-text-muted ml-2">{props.count} items</span>
      </Show>
    </div>
  );
}
