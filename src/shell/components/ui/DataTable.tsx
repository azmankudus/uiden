import { createSignal, createMemo, For, Show } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => any;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  searchPlaceholder?: string;
}

export default function DataTable(props: DataTableProps) {
  const [search, setSearch] = createSignal("");
  const filtered = createMemo(() => {
    const q = search().toLowerCase();
    if (!q) return props.data;
    return props.data.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <Show when={props.searchPlaceholder !== undefined || props.searchPlaceholder === ""}>
        <div class="relative mb-4">
          <AppIcon
            icon="lucide:search"
            size={16}
            class="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            type="text"
            placeholder={props.searchPlaceholder || "Search..."}
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-1 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/50"
          />
        </div>
      </Show>

      <div class="rounded-2xl bg-surface-1 border border-surface-3/30 overflow-hidden">
        <div
          class="hidden md:grid gap-4 px-5 py-3 border-b border-surface-3/30 text-xs font-medium text-text-muted"
          style={{ "grid-template-columns": `repeat(${props.columns.length}, 1fr)` }}
        >
          <For each={props.columns}>
            {(col) => <span>{col.label}</span>}
          </For>
        </div>
        <Show
          when={filtered().length > 0}
          fallback={
            <div class="text-center py-12">
              <p class="text-sm text-text-muted">No results found.</p>
            </div>
          }
        >
          <For each={filtered()}>
            {(row) => (
              <div
                class="grid grid-cols-1 md:gap-4 px-5 py-3 border-b border-surface-3/20 last:border-0 hover:bg-surface-2/30 transition-colors items-center"
                style={{ "grid-template-columns": `repeat(${props.columns.length}, 1fr)` }}
              >
                <For each={props.columns}>
                  {(col) => (
                    <Show
                      when={col.render}
                      fallback={<span class="text-sm text-text-primary">{row[col.key]}</span>}
                    >
                      {col.render!(row[col.key], row)}
                    </Show>
                  )}
                </For>
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
}
