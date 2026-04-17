import { createSignal, createMemo, Show, For, onMount, onCleanup } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import AppIcon from "../lib/app-icon";

export interface SearchItem {
  label: string;
  path: string;
  icon: string;
  section: string;
  description?: string;
}

export default function SearchBar(props: { items: SearchItem[] }) {
  const [focused, setFocused] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const navigate = useNavigate();
  let containerRef: HTMLDivElement | undefined;

  const results = createMemo(() => {
    const q = query().toLowerCase().trim();
    if (!q) return [];
    return props.items.filter(
      (a) => a.label.toLowerCase().includes(q) || (a.description ?? "").toLowerCase().includes(q) || a.section.toLowerCase().includes(q)
    );
  });

  const top5 = createMemo(() => results().slice(0, 5));
  const hasMore = createMemo(() => results().length > 5);
  const showDropdown = createMemo(() => focused() && query().trim().length > 0);

  const go = (path: string) => { setQuery(""); setFocused(false); navigate(path); };

  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        const input = containerRef?.querySelector("input");
        input?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    onCleanup(() => document.removeEventListener("keydown", handler));

    const clickOutside = (e: MouseEvent) => {
      if (containerRef && !containerRef.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    onCleanup(() => document.removeEventListener("mousedown", clickOutside));
  });

  return (
    <div ref={containerRef} class="relative w-full max-w-md">
      <div class="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-1/60 border border-surface-3/50 text-sm transition-colors"
        classList={{ "border-brand/50 bg-surface-1": focused(), "hover:border-surface-3 hover:text-text-secondary": !focused() }}>
        <AppIcon icon="lucide:search" size={16} class="text-text-muted flex-shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          value={query()}
          onInput={(e) => setQuery(e.currentTarget.value)}
          onFocus={() => setFocused(true)}
          class="w-full bg-transparent text-text-primary placeholder-text-muted outline-none text-sm"
        />
        <kbd class="flex-shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-2 text-xs font-body text-text-muted border border-surface-3">
          Ctrl K
        </kbd>
      </div>
      <Show when={showDropdown()}>
        <div class="absolute top-full left-0 right-0 mt-1 bg-surface-1 border border-surface-3 rounded-xl shadow-xl overflow-hidden z-[80]">
          <Show when={top5().length > 0} fallback={
            <div class="px-4 py-6 text-center text-sm text-text-muted">
              <AppIcon icon="lucide:search-x" size={20} class="mx-auto mb-2 text-text-muted" />
              No results for "{query()}"
            </div>
          }>
            <div class="py-1">
              <For each={top5()}>
                {(item) => (
                  <button type="button" onClick={() => go(item.path)}
                    class="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-surface-2 transition-colors">
                    <AppIcon icon={item.icon} size={16} class="text-text-muted flex-shrink-0" />
                    <div class="min-w-0 flex-1">
                      <p class="text-sm text-text-primary truncate">{item.label}</p>
                      <Show when={item.description}>
                        <p class="text-xs text-text-muted truncate">{item.description}</p>
                      </Show>
                    </div>
                    <span class="text-xs text-text-muted flex-shrink-0">{item.section}</span>
                  </button>
                )}
              </For>
            </div>
            <Show when={hasMore()}>
              <A href={`/search?q=${encodeURIComponent(query())}`}
                onClick={() => { setFocused(false); }}
                class="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm text-brand hover:bg-surface-2 border-t border-surface-3/30 transition-colors">
                <AppIcon icon="lucide:more-horizontal" size={14} />
                See {results().length - 5} more results
              </A>
            </Show>
          </Show>
        </div>
      </Show>
    </div>
  );
}
