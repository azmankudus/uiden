import { createSignal, createMemo, Show, For, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AppIcon from "../lib/app-icon";
import { useAuth } from "../context/auth";

export interface SearchItem {
  label: string;
  path: string;
  icon: string;
  section: string;
  description?: string;
}

export default function SearchBar(props: { items: SearchItem[] }) {
  const [open, setOpen] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const navigate = useNavigate();
  const auth = useAuth();

  const items = createMemo(() => {
    const q = query().toLowerCase().trim();
    if (!q) return props.items.slice(0, 12);
    return props.items.filter(
      (a) => a.label.toLowerCase().includes(q) || (a.description ?? "").toLowerCase().includes(q) || a.section.toLowerCase().includes(q)
    ).slice(0, 20);
  });

  const grouped = createMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of items()) {
      const list = map.get(item.section) || [];
      list.push(item);
      map.set(item.section, list);
    }
    return [...map.entries()];
  });

  const go = (path: string) => { setOpen(false); setQuery(""); navigate(path); };

  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen((v) => !v); if (!open()) setQuery(""); }
      if (e.key === "Escape" && open()) { setOpen(false); setQuery(""); }
    };
    document.addEventListener("keydown", handler);
    onCleanup(() => document.removeEventListener("keydown", handler));
  });

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} class="w-full max-w-md flex items-center gap-2 px-4 py-1.5 rounded-lg bg-surface-1/60 border border-surface-3/50 text-text-muted hover:text-text-secondary hover:border-surface-3 text-sm">
        <AppIcon icon="lucide:search" size={15} />
        <span class="flex-1 text-left">Search pages, modules, settings...</span>
        <kbd class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-2 text-[10px] font-body text-text-muted border border-surface-3">
          <AppIcon icon="lucide:command" size={10} />K
        </kbd>
      </button>

      <Show when={open()}>
        <div class="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={() => { setOpen(false); setQuery(""); }}>
          <div class="fixed inset-0 bg-black/40 backdrop-blur-sm animate-backdrop-in" />
          <div class="relative w-full max-w-lg bg-surface-1 border border-surface-3 rounded-2xl shadow-2xl overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div class="flex items-center gap-3 px-4 py-3 border-b border-surface-3">
              <AppIcon icon="lucide:search" size={18} class="text-text-muted flex-shrink-0" />
              <input type="text" placeholder="Search pages, modules, settings..." value={query()} onInput={(e) => setQuery(e.currentTarget.value)} class="w-full bg-transparent text-text-primary placeholder-text-muted outline-none text-sm" autofocus />
              <kbd class="flex-shrink-0 px-1.5 py-0.5 rounded bg-surface-2 text-[10px] text-text-muted border border-surface-3">ESC</kbd>
            </div>
            <div class="max-h-[400px] overflow-y-auto p-2">
              <Show when={grouped().length > 0} fallback={<p class="text-center text-sm text-text-muted py-8">No results found</p>}>
                <For each={grouped()}>
                  {([section, items]) => (
                    <div class="mb-2">
                      <p class="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted">{section}</p>
                      <For each={items}>
                        {(item) => (
                          <button type="button" onClick={() => go(item.path)} class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-surface-2 group">
                            <AppIcon icon={item.icon} size={16} class="text-text-muted group-hover:text-brand flex-shrink-0" />
                            <div class="min-w-0 flex-1">
                              <p class="text-sm text-text-primary truncate">{item.label}</p>
                              <Show when={item.description}><p class="text-xs text-text-muted truncate">{item.description}</p></Show>
                            </div>
                            <span class="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">{item.path}</span>
                          </button>
                        )}
                      </For>
                    </div>
                  )}
                </For>
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
