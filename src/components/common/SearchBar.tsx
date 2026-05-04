import { createSignal, createMemo, Show, For, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";

export interface SearchItem {
  label: string;
  path: string;
  icon: string;
  section: string;
  description?: string;
  keywords?: string[];
}

export interface SearchScope {
  alias: string;
  label: string;
  icon: string;
  sections: string[];
  placeholder: string;
}

const SCOPES: SearchScope[] = [
  { alias: "/u", label: "Users", icon: "lucide:users", sections: ["Users", "Access"], placeholder: "Search users, groups, permissions..." },
  { alias: "/o", label: "Orders", icon: "lucide:receipt", sections: ["Orders", "Transactions"], placeholder: "Search orders and transactions..." },
  { alias: "/p", label: "Products", icon: "lucide:package", sections: ["Products", "Catalog"], placeholder: "Search products and catalog..." },
  { alias: "@", label: "People", icon: "lucide:circle-user", sections: ["People", "Users"], placeholder: "Search people..." },
];

const RECENT_KEY = "uiden_recent_searches";

function loadRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
}
function saveRecent(q: string) {
  const arr = [q, ...loadRecent().filter(r => r !== q)].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(arr));
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return text;
  return text.slice(0, idx) + "\x01" + text.slice(idx, idx + query.length) + "\x02" + text.slice(idx + query.length);
}

function HighlightedText(props: { text: string; query: string }) {
  const parts = createMemo(() => {
    const h = highlight(props.text, props.query);
    const result: { text: string; bold: boolean }[] = [];
    let buf = "";
    let inBold = false;
    for (const ch of h) {
      if (ch === "\x01") { if (buf) result.push({ text: buf, bold: false }); buf = ""; inBold = true; }
      else if (ch === "\x02") { if (buf) result.push({ text: buf, bold: inBold }); buf = ""; inBold = false; }
      else buf += ch;
    }
    if (buf) result.push({ text: buf, bold: inBold });
    return result;
  });
  return <>{parts().map(p => p.bold ? <span class="font-semibold text-text-primary">{p.text}</span> : <span>{p.text}</span>)}</>;
}

export default function SearchBar(props: { items: SearchItem[] }) {
  const navigate = useNavigate();
  const [open, setOpen] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [scope, setScope] = createSignal<SearchScope | null>(null);
  const [showScopes, setShowScopes] = createSignal(false);
  const [selectedIdx, setSelectedIdx] = createSignal(0);
  let inputRef: HTMLInputElement | undefined;
  let modalRef: HTMLDivElement | undefined;

  const scopeFromQuery = (q: string): { scope: SearchScope | null; rest: string } => {
    if (!q.startsWith("/")) return { scope: null, rest: q };
    const spaceIdx = q.indexOf(" ");
    if (spaceIdx < 0) return { scope: null, rest: q };
    const prefix = q.slice(0, spaceIdx);
    const found = SCOPES.find(s => s.alias === prefix);
    if (found) return { scope: found, rest: q.slice(spaceIdx + 1) };
    return { scope: null, rest: q };
  };

  const effectiveQuery = createMemo(() => {
    const { rest } = scopeFromQuery(query());
    return scope() ? query().replace(scope()!.alias + " ", "").trim() : rest.trim();
  });

  const isTypingScope = createMemo(() => {
    const q = query();
    return q.startsWith("/") && !q.includes(" ");
  });

  const filteredByScope = createMemo(() => {
    const s = scope();
    if (!s) return props.items;
    return props.items.filter(item => s.sections.includes(item.section));
  });

  const results = createMemo(() => {
    const q = effectiveQuery().toLowerCase();
    if (!q) return filteredByScope();
    return filteredByScope().filter(item =>
      item.label.toLowerCase().includes(q) ||
      (item.description ?? "").toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q) ||
      (item.keywords ?? []).some(k => k.toLowerCase().includes(q))
    );
  });

  const grouped = createMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of results()) {
      const group = map.get(item.section) || [];
      group.push(item);
      map.set(item.section, group);
    }
    return Array.from(map.entries());
  });

  const flatResults = createMemo(() => results().slice(0, 10));

  const recentSearches = createMemo(() => {
    if (query() || scope()) return [];
    return loadRecent().slice(0, 3);
  });

  const suggestedApps = createMemo(() => {
    if (query() || scope()) return [];
    return props.items.filter(i => i.section === "Navigation" || i.section === "Admin").slice(0, 4);
  });

  const openModal = () => {
    setOpen(true);
    setQuery("");
    setScope(null);
    setShowScopes(false);
    setSelectedIdx(0);
    setTimeout(() => inputRef?.focus(), 50);
  };

  const closeModal = () => {
    setOpen(false);
    setQuery("");
    setScope(null);
    setShowScopes(false);
  };

  const executeItem = (item: SearchItem) => {
    const q = effectiveQuery();
    if (q) saveRecent(q);
    closeModal();
    navigate(item.path);
  };

  const selectScope = (s: SearchScope) => {
    setScope(s);
    setQuery(s.alias + " ");
    setShowScopes(false);
    setSelectedIdx(0);
    setTimeout(() => inputRef?.focus(), 10);
  };

  const handleInput = (val: string) => {
    setQuery(val);
    setSelectedIdx(0);
    if (val === "/") {
      setShowScopes(true);
      setScope(null);
    } else if (val.startsWith("/") && !val.includes(" ")) {
      setShowScopes(true);
      const matching = SCOPES.filter(s => s.alias.startsWith(val));
      if (matching.length === 1) {
        selectScope(matching[0]);
      }
    } else {
      setShowScopes(false);
      const { scope: detected } = scopeFromQuery(val);
      if (detected && !scope()) {
        setScope(detected);
        setQuery(detected.alias + " ");
      }
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    const total = showScopes() ? SCOPES.length : flatResults().length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx(prev => (prev + 1) % total);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx(prev => (prev - 1 + total) % total);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (showScopes()) {
        const s = SCOPES[selectedIdx()];
        if (s) selectScope(s);
      } else {
        const item = flatResults()[selectedIdx()];
        if (item) executeItem(item);
      }
    } else if (e.key === "Escape") {
      if (scope()) { setScope(null); setQuery(""); }
      else closeModal();
    } else if (e.key === "Tab" && showScopes()) {
      e.preventDefault();
      const s = SCOPES[selectedIdx()];
      if (s) selectScope(s);
    } else if (e.key === "Backspace" && scope() && query() === scope()!.alias + " ") {
      setScope(null);
      setQuery("");
      setShowScopes(false);
    }
  };

  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open()) closeModal(); else openModal();
      }
    };
    document.addEventListener("keydown", handler);
    onCleanup(() => document.removeEventListener("keydown", handler));
  });

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        class="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-1/60 border border-surface-3/50 text-sm transition-colors hover:border-surface-3 hover:text-text-secondary w-full max-w-md"
      >
        <AppIcon icon="lucide:search" size={16} class="text-text-muted flex-shrink-0" />
        <span class="text-text-muted flex-1 text-left">Search...</span>
        <kbd class="flex-shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-2 text-[10px] font-body text-text-muted border border-surface-3">
          <AppIcon icon="lucide:command" size={10} />K
        </kbd>
      </button>

      <Show when={open()}>
        <div class="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]">
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div ref={modalRef} class="relative w-full max-w-xl bg-surface-1 border border-surface-3 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            <div class="flex items-center gap-2 px-4 py-3 border-b border-surface-3/30">
              <Show when={scope()} fallback={
                <AppIcon icon="lucide:search" size={18} class="text-text-muted flex-shrink-0" />
              }>
                <button
                  type="button"
                  onClick={() => { setScope(null); setQuery(""); setShowScopes(false); inputRef?.focus(); }}
                  class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-brand/15 text-brand text-xs font-medium border border-brand/20 hover:bg-brand/25 transition-colors"
                >
                  <AppIcon icon={scope()!.icon} size={12} />
                  {scope()!.label}
                  <AppIcon icon="lucide:x" size={10} />
                </button>
              </Show>
              <input
                ref={inputRef}
                type="text"
                value={query()}
                onInput={(e) => handleInput(e.currentTarget.value)}
                onKeyDown={handleKeydown}
                placeholder={scope() ? scope()!.placeholder : "Search or type / to filter by scope..."}
                class="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
              />
              <button type="button" onClick={closeModal} class="flex-shrink-0 px-1.5 py-0.5 rounded bg-surface-2 text-[10px] text-text-muted border border-surface-3">
                ESC
              </button>
            </div>

            <div class="max-h-[400px] overflow-y-auto">
              <Show when={showScopes()}>
                <div class="p-2">
                  <p class="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">Select Scope</p>
                  <For each={SCOPES}>
                    {(s, i) => (
                      <button
                        type="button"
                        onClick={() => selectScope(s)}
                        class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                        classList={{
                          "bg-surface-2 text-text-primary": selectedIdx() === i(),
                          "text-text-secondary hover:bg-surface-2 hover:text-text-primary": selectedIdx() !== i(),
                        }}
                      >
                        <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-1 border border-surface-3">
                          <AppIcon icon={s.icon} size={16} />
                        </div>
                        <div class="flex-1 text-left">
                          <p class="text-sm">{s.label}</p>
                          <p class="text-xs text-text-muted">{s.placeholder}</p>
                        </div>
                        <kbd class="text-xs text-text-muted font-mono">{s.alias}</kbd>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={!showScopes() && !effectiveQuery() && recentSearches().length > 0}>
                <div class="p-2">
                  <p class="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">Recent</p>
                  <For each={recentSearches()}>
                    {(r) => (
                      <button
                        type="button"
                        onClick={() => { setQuery(r); inputRef?.focus(); }}
                        class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors"
                      >
                        <AppIcon icon="lucide:clock" size={14} class="text-text-muted" />
                        <span class="flex-1 text-left">{r}</span>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={!showScopes() && !effectiveQuery() && suggestedApps().length > 0}>
                <div class="p-2 border-t border-surface-3/30">
                  <p class="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">Suggested</p>
                  <For each={suggestedApps()}>
                    {(item, i) => (
                      <button
                        type="button"
                        onClick={() => executeItem(item)}
                        class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors"
                      >
                        <AppIcon icon={item.icon} size={14} class="text-text-muted" />
                        <span class="flex-1 text-left">{item.label}</span>
                        <span class="text-xs text-text-muted">{item.section}</span>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={!showScopes() && effectiveQuery()}>
                <Show when={flatResults().length > 0} fallback={
                  <div class="px-4 py-8 text-center text-sm text-text-muted">
                    <AppIcon icon="lucide:search-x" size={24} class="mx-auto mb-2 text-text-muted" />
                    <p>No results for "{effectiveQuery()}"</p>
                    <Show when={scope()}>
                      <p class="text-xs mt-1">Filtered to {scope()!.label}. Try removing the scope for broader results.</p>
                    </Show>
                  </div>
                }>
                  <div class="p-2">
                    <For each={grouped()}>
                      {([section, items]) => {
                        const sectionItems = () => items.slice(0, 5);
                        const globalOffset = createMemo(() => {
                          let idx = 0;
                          for (const [s, arr] of grouped()) {
                            if (s === section) return idx;
                            idx += arr.slice(0, 5).length;
                          }
                          return idx;
                        });
                        return (
                          <div>
                            <p class="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">{section}</p>
                            <For each={sectionItems()}>
                              {(item, i) => {
                                const flatIdx = createMemo(() => globalOffset() + i());
                                return (
                                  <button
                                    type="button"
                                    onClick={() => executeItem(item)}
                                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
                                    classList={{
                                      "bg-surface-2 text-text-primary": selectedIdx() === flatIdx(),
                                      "text-text-secondary hover:bg-surface-2 hover:text-text-primary": selectedIdx() !== flatIdx(),
                                    }}
                                  >
                                    <AppIcon icon={item.icon} size={16} class="text-text-muted flex-shrink-0" />
                                    <div class="min-w-0 flex-1 text-left">
                                      <p class="text-sm truncate">
                                        <HighlightedText text={item.label} query={effectiveQuery()} />
                                      </p>
                                      <Show when={item.description}>
                                        <p class="text-xs text-text-muted truncate">{item.description}</p>
                                      </Show>
                                    </div>
                                    <span class="text-[10px] text-text-muted flex-shrink-0 px-1.5 py-0.5 rounded bg-surface-1 border border-surface-3">{section}</span>
                                  </button>
                                );
                              }}
                            </For>
                          </div>
                        );
                      }}
                    </For>
                  </div>
                </Show>
              </Show>
            </div>

            <Show when={!showScopes()}>
              <div class="flex items-center gap-4 px-4 py-2 border-t border-surface-3/30 text-[10px] text-text-muted">
                <span class="flex items-center gap-1"><kbd class="px-1 py-0.5 rounded bg-surface-2 border border-surface-3">↑↓</kbd> Navigate</span>
                <span class="flex items-center gap-1"><kbd class="px-1 py-0.5 rounded bg-surface-2 border border-surface-3">↵</kbd> Open</span>
                <span class="flex items-center gap-1"><kbd class="px-1 py-0.5 rounded bg-surface-2 border border-surface-3">ESC</kbd> Close</span>
                <span class="flex items-center gap-1">Type <kbd class="px-1 py-0.5 rounded bg-surface-2 border border-surface-3">/</kbd> to scope</span>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </>
  );
}
