import { createSignal, createMemo, Show, For, onMount, onCleanup } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import AppIcon from "../lib/app-icon";
import type { SearchItem } from "./SearchBar";

interface SearchIconButtonProps {
  items: SearchItem[];
}

export default function SearchIconButton(props: SearchIconButtonProps) {
  const [open, setOpen] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const navigate = useNavigate();
  let inputRef: HTMLInputElement | undefined;

  const results = createMemo(() => {
    const q = query().toLowerCase().trim();
    if (!q) return [];
    return props.items.filter(
      (a) => a.label.toLowerCase().includes(q) || (a.description ?? "").toLowerCase().includes(q) || a.section.toLowerCase().includes(q)
    );
  });

  const top5 = createMemo(() => results().slice(0, 5));
  const hasMore = createMemo(() => results().length > 5);

  const go = (path: string) => { setQuery(""); setOpen(false); navigate(path); };

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef?.focus(), 50);
  };

  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        if (!open()) handleOpen();
        else inputRef?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    onCleanup(() => document.removeEventListener("keydown", handler));
  });

  return (
    <>
      <button
        type="button"
        title="Search (Ctrl+K)"
        onClick={handleOpen}
        class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-2"
      >
        <AppIcon icon="lucide:search" size={20} />
      </button>

      <Show when={open()}>
        <div class="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div class="relative w-full max-w-2xl bg-surface-1 border border-surface-3 rounded-2xl shadow-2xl overflow-hidden">
            <div class="flex items-center gap-3 px-5 py-4 border-b border-surface-3">
              <AppIcon icon="lucide:search" size={20} class="text-text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
                class="flex-1 bg-transparent text-lg text-text-primary placeholder-text-muted outline-none"
              />
              <kbd class="flex-shrink-0 inline-flex items-center gap-0.5 px-2 py-1 rounded bg-surface-2 text-xs font-body text-text-muted border border-surface-3">
                ESC
              </kbd>
            </div>
            <div class="max-h-[360px] overflow-y-auto">
              <Show when={top5().length > 0 || query().trim() === ""} fallback={
                <div class="px-5 py-12 text-center text-sm text-text-muted">
                  <AppIcon icon="lucide:search-x" size={32} class="mx-auto mb-3 text-text-muted" />
                  <p>No results for "{query()}"</p>
                </div>
              }>
                <Show when={top5().length === 0}>
                  <div class="px-5 py-6 text-center text-sm text-text-muted">
                    <AppIcon icon="lucide:search" size={32} class="mx-auto mb-3 text-text-muted" />
                    <p class="text-text-secondary">Type to search</p>
                    <p class="text-text-muted text-xs mt-1">Use Ctrl+K to open quickly</p>
                  </div>
                </Show>
                <Show when={top5().length > 0}>
                  <div class="py-1">
                    <For each={top5()}>
                      {(item) => (
                        <button type="button" onClick={() => go(item.path)}
                          class="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-surface-2 transition-colors">
                          <AppIcon icon={item.icon} size={18} class="text-text-muted flex-shrink-0" />
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
                    <A
                      href={`/search?q=${encodeURIComponent(query())}`}
                      onClick={() => setOpen(false)}
                      class="flex items-center justify-center gap-1.5 px-5 py-3 text-sm text-brand hover:bg-surface-2 border-t border-surface-3/30 transition-colors"
                    >
                      <AppIcon icon="lucide:more-horizontal" size={16} />
                      See {results().length - 5} more results
                    </A>
                  </Show>
                </Show>
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
