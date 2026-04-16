import { Show, createSignal, createMemo, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AppIcon from "./AppIcon";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";
import { APPS, appColor } from "~/lib/apps";

export default function TopBar() {
  const { theme, toggle } = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = createSignal(false);
  const [profileOpen, setProfileOpen] = createSignal(false);
  const [appsOpen, setAppsOpen] = createSignal(false);
  const [appsFilter, setAppsFilter] = createSignal("");

  const closeAll = () => {
    setHelpOpen(false);
    setProfileOpen(false);
    setAppsOpen(false);
    setAppsFilter("");
  };

  const userApps = createMemo(() => {
    const u = auth.user();
    if (!u) return [];
    return APPS.slice(0, u.appCount);
  });

  const filteredApps = createMemo(() => {
    const q = appsFilter().toLowerCase().trim();
    const base = userApps();
    if (!q) return base;
    return base.filter(
      (a) => a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)
    );
  });

  const handleLogout = () => {
    closeAll();
    auth.logout();
    navigate("/", { replace: true });
  };

  const anyOpen = () => helpOpen() || profileOpen() || appsOpen();

  return (
    <>
      <div class="fixed top-0 left-0 right-0 z-50">
        <div class="flex items-center justify-between px-4 py-3 bg-surface-0/10 backdrop-blur-xl border-surface-3/40">
          <button
            type="button"
            onClick={() => { closeAll(); navigate(auth.isLoggedIn() ? "/landing" : "/"); }}
            class="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-surface-1"
          >
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-dim">
              <AppIcon icon="lucide:wind" size={18} style={{ color: "var(--color-brand)" }} />
            </div>
            <span class="font-display text-base font-bold tracking-tight">
              <span style={{ color: "var(--color-brand)" }}>Kentut</span>{" "}
              <span class="text-text-primary">SuperApp</span>
            </span>
          </button>

          <div class="flex items-center gap-1">
            <Show when={auth.isLoggedIn()}>
              <div class="relative">
                <button
                  type="button"
                  title="Apps"
                  onClick={() => { setAppsOpen((v) => !v); setHelpOpen(false); setProfileOpen(false); }}
                  class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-brand hover:bg-surface-2"
                >
                  <AppIcon icon="lucide:layout-grid" size={22} />
                </button>
                <Show when={appsOpen()}>
                  <div
                    class="dropdown-panel absolute right-0 top-12 w-[360px] bg-surface-1 border border-surface-3 rounded-2xl shadow-xl z-50 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div class="p-3 border-b border-surface-3">
                      <div class="flex items-center bg-surface-0 border border-surface-3 rounded-xl px-3 py-2">
                        <span class="text-text-muted mr-2">
                          <AppIcon icon="lucide:search" size={16} />
                        </span>
                        <input
                          type="text"
                          placeholder="Search apps..."
                          value={appsFilter()}
                          onInput={(e) => setAppsFilter(e.currentTarget.value)}
                          class="w-full bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
                        />
                        {appsFilter() && (
                          <button type="button" onClick={() => setAppsFilter("")} class="text-text-muted hover:text-text-secondary">
                            <AppIcon icon="lucide:x" size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div class="p-3 max-h-[320px] overflow-y-auto">
                      <div class="grid grid-cols-4 gap-1">
                        <For each={filteredApps()}>
                          {(app) => {
                            const c = appColor(app._i);
                            return (
                              <button
                                type="button"
                                onClick={() => { closeAll(); navigate("/landing"); }}
                                class="flex flex-col items-center gap-1.5 rounded-xl py-2.5 px-1 hover:bg-surface-2 group"
                              >
                                <div
                                  class="flex items-center justify-center w-10 h-10 rounded-lg transition-transform group-hover:scale-110"
                                  style={{ background: c.bg, border: `1px solid ${c.border}` }}
                                >
                                  <AppIcon icon={app.icon} size={20} style={{ color: c.text }} />
                                </div>
                                <span class="text-[11px] leading-tight text-text-secondary group-hover:text-text-primary text-center truncate w-full">
                                  {app.name}
                                </span>
                              </button>
                            );
                          }}
                        </For>
                      </div>
                      {filteredApps().length === 0 && (
                        <p class="text-center text-xs text-text-muted py-6">No apps found</p>
                      )}
                    </div>
                  </div>
                </Show>
              </div>
            </Show>

            <div class="relative">
              <button
                type="button"
                title="Help"
                onClick={() => { setHelpOpen((v) => !v); setProfileOpen(false); setAppsOpen(false); }}
                class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-2"
              >
                <AppIcon icon="lucide:circle-question-mark" size={22} />
              </button>
              <Show when={helpOpen()}>
                <div
                  class="dropdown-panel absolute right-0 top-12 w-72 bg-surface-1 border border-surface-3 rounded-2xl shadow-xl p-4 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 class="text-sm font-semibold text-text-primary mb-2">Help & Info</h3>
                  <p class="text-xs text-text-secondary leading-relaxed mb-3">
                    Kentut SuperApp is a unified gateway to all your enterprise tools. Use the search bar on the apps page to find what you need.
                  </p>
                  <div class="border-t border-surface-3 pt-3 space-y-1.5">
                    <p class="text-xs text-text-secondary flex items-center gap-2">
                      <AppIcon icon="lucide:mail" size={14} />
                      support@kentut.superapp
                    </p>
                    <p class="text-xs text-text-secondary flex items-center gap-2">
                      <AppIcon icon="lucide:book-open" size={14} />
                      docs.kentut.superapp
                    </p>
                  </div>
                </div>
              </Show>
            </div>

            <button
              type="button"
              title={theme() === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggle}
              class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-2"
            >
              <Show
                when={theme() === "dark"}
                fallback={<AppIcon icon="lucide:moon" size={22} />}
              >
                <AppIcon icon="lucide:sun" size={22} />
              </Show>
            </button>

            <Show when={auth.isLoggedIn()}>
              <div class="relative">
                <button
                  type="button"
                  title="Profile"
                  onClick={() => { setProfileOpen((v) => !v); setHelpOpen(false); setAppsOpen(false); }}
                  class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-dim border border-brand/30 text-brand hover:bg-brand/20"
                >
                  <AppIcon icon="lucide:circle-user" size={24} style={{ color: "var(--color-brand)" }} />
                </button>
                <Show when={profileOpen()}>
                  <div
                    class="dropdown-panel absolute right-0 top-12 w-64 bg-surface-1 border border-surface-3 rounded-2xl shadow-xl p-4 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div class="flex items-center gap-3 mb-4">
                      <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-dim border border-brand/30">
                        <AppIcon icon="lucide:circle-user" size={22} style={{ color: "var(--color-brand)" }} />
                      </div>
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-text-primary truncate">{auth.user()?.displayName}</p>
                        <p class="text-xs text-text-secondary">{auth.user()?.role} · {auth.user()?.appCount} apps</p>
                      </div>
                    </div>
                    <div class="border-t border-surface-3 pt-3">
                      <div class="text-xs text-text-muted mb-1">Username</div>
                      <div class="text-sm text-text-secondary mb-3">{auth.user()?.username}</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                    >
                      <AppIcon icon="lucide:log-out" size={18} style={{ color: "#f87171" }} />
                      Logout
                    </button>
                  </div>
                </Show>
              </div>
            </Show>
          </div>
        </div>
      </div>

      <Show when={anyOpen()}>
        <div class="overlay-backdrop fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]" onClick={closeAll} />
      </Show>
    </>
  );
}
