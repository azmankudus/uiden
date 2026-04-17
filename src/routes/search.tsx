import { createSignal, createMemo, onMount, For, Show } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import { useAuth } from "~/shell/context/auth";
import { APPS } from "~/gateway/lib/apps";
import { getApp } from "~/apps/registry";
import PrivateLayout from "~/shell/layouts/PrivateLayout";
import type { SearchItem } from "~/shell/components/SearchBar";

const PER_PAGE = 10;

function collectAllSearchItems(): SearchItem[] {
  const items: SearchItem[] = [
    { label: "Dashboard", path: "/landing", icon: "lucide:layout-dashboard", section: "Gateway" },
    { label: "User Settings", path: "/user/setting", icon: "lucide:settings", section: "Gateway" },
    { label: "User Management", path: "/user/manage", icon: "lucide:user-cog", section: "Gateway" },
  ];

  for (const app of APPS) {
    items.push({
      label: app.name,
      path: `/${app.slug}/public`,
      icon: app.icon,
      section: "Apps",
      description: app.desc,
    });
  }

  const ayam = getApp("ayam-goreng");
  if (ayam) {
    items.push(...ayam.search.public, ...ayam.search.private);
  }

  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}

const ALL_ITEMS = collectAllSearchItems();

export default function SearchPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mounted, setMounted] = createSignal(false);
  const [localQuery, setLocalQuery] = createSignal(searchParams.q || "");

  onMount(() => {
    if (!auth.isLoggedIn()) { navigate("/user/login", { replace: true }); return; }
    if (searchParams.q) setLocalQuery(searchParams.q);
    requestAnimationFrame(() => setMounted(true));
  });

  const page = () => Number(searchParams.page || "1");

  const results = createMemo(() => {
    const q = localQuery().toLowerCase().trim();
    if (!q) return ALL_ITEMS;
    return ALL_ITEMS.filter(
      (a) => a.label.toLowerCase().includes(q) || (a.description ?? "").toLowerCase().includes(q) || a.section.toLowerCase().includes(q) || a.path.toLowerCase().includes(q)
    );
  });

  const totalPages = createMemo(() => Math.max(1, Math.ceil(results().length / PER_PAGE)));
  const paginated = createMemo(() => {
    const start = (page() - 1) * PER_PAGE;
    return results().slice(start, start + PER_PAGE);
  });

  const doSearch = (q: string) => {
    setLocalQuery(q);
    setSearchParams({ q: q || undefined, page: "1" });
  };

  const setPage = (p: number) => {
    setSearchParams({ q: searchParams.q, page: String(p) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const searchNav = [
    { label: "Back to Apps", icon: "lucide:layout-dashboard", path: "/landing" },
  ];

  const searchSearchItems = [
    { label: "Search Results", path: "/search", icon: "lucide:search", section: "Search" },
  ];

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/50 transition-colors";

  return (
    <Show when={mounted()}>
      <PrivateLayout name="Search" icon="lucide:search" slug="ayam-goreng" nav={searchNav} searchItems={searchSearchItems}>
        <div class="max-w-3xl mx-auto page-enter">
          <div class="mb-6">
            <h1 class="font-display text-2xl font-bold text-text-primary mb-4">Search</h1>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                <AppIcon icon="lucide:search" size={18} />
              </span>
              <input
                type="text"
                placeholder="Search pages, modules, settings..."
                value={localQuery()}
                onInput={(e) => doSearch(e.currentTarget.value)}
                class={inputCls + " pl-10"}
              />
            </div>
          </div>

          <Show when={!localQuery().trim()} fallback={
            <Show when={results().length > 0} fallback={
              <div class="text-center py-16">
                <AppIcon icon="lucide:search-x" size={48} class="text-text-muted mx-auto" />
                <p class="mt-3 text-text-muted">No results for "{localQuery()}"</p>
              </div>
            }>
              <div>
                <p class="text-sm text-text-muted mb-4">{results().length} result{results().length !== 1 ? "s" : ""} found</p>
                <div class="space-y-1">
                  <For each={paginated()}>
                    {(item) => (
                      <button type="button" onClick={() => navigate(item.path)}
                        class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left hover:bg-surface-2 transition-colors group">
                        <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-2 group-hover:bg-brand-dim transition-colors">
                          <AppIcon icon={item.icon} size={18} class="text-text-muted group-hover:text-brand" />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="text-sm font-medium text-text-primary group-hover:text-brand truncate">{item.label}</p>
                          <Show when={item.description}>
                            <p class="text-xs text-text-muted truncate">{item.description}</p>
                          </Show>
                        </div>
                        <div class="flex items-center gap-3 flex-shrink-0">
                          <span class="text-xs px-2 py-0.5 rounded-lg bg-surface-2 text-text-muted">{item.section}</span>
                          <span class="text-xs text-text-muted hidden sm:block">{item.path}</span>
                        </div>
                      </button>
                    )}
                  </For>
                </div>

                <Show when={totalPages() > 1}>
                  <div class="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-surface-3/30">
                    <button type="button" onClick={() => setPage(page() - 1)} disabled={page() <= 1}
                      class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                      <AppIcon icon="lucide:chevron-left" size={16} /> Prev
                    </button>
                    <div class="flex items-center gap-1">
                      <For each={Array.from({ length: totalPages() }, (_, i) => i + 1)}>
                        {(p) => (
                          <button type="button" onClick={() => setPage(p)}
                            class="w-9 h-9 rounded-lg text-sm transition-colors"
                            classList={{ "bg-brand text-surface-0 font-semibold": p === page(), "text-text-secondary hover:bg-surface-2": p !== page() }}>
                            {p}
                          </button>
                        )}
                      </For>
                    </div>
                    <button type="button" onClick={() => setPage(page() + 1)} disabled={page() >= totalPages()}
                      class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                      Next <AppIcon icon="lucide:chevron-right" size={16} />
                    </button>
                  </div>
                </Show>
              </div>
            </Show>
          }>
            <div class="py-12 text-center">
              <AppIcon icon="lucide:search" size={48} class="text-text-muted mx-auto" />
              <p class="mt-3 text-text-muted">Type to search across all pages and modules</p>
            </div>
          </Show>
        </div>
      </PrivateLayout>
    </Show>
  );
}
