import { Show, createSignal, onMount, type ParentComponent } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import AppIcon from "../AppIcon";
import { useTheme } from "../ThemeProvider";
import { useAuth } from "../AuthProvider";
import { PRIVATE_NAV } from "~/lib/sample/navigation";
import SearchDialog from "./SearchDialog";
import SideNav from "./SideNav";

const PrivateLayout: ParentComponent = (props) => {
  const { theme, toggle } = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = createSignal(false);
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    if (!auth.isLoggedIn()) { navigate("/login", { replace: true }); return; }
    requestAnimationFrame(() => setMounted(true));
  });

  const handleLogout = () => { setProfileOpen(false); auth.logout(); navigate("/", { replace: true }); };

  return (
    <Show when={mounted()}>
      <header class="fixed top-0 left-0 right-0 z-50 h-[53px]">
        <div class="flex items-center justify-between h-full px-4 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
          <A href="/sample/private" class="flex items-center gap-2">
            <div class="flex items-center justify-center w-7 h-7 rounded-md bg-brand-dim">
              <AppIcon icon="lucide:wind" size={15} style={{ color: "var(--color-brand)" }} />
            </div>
            <span class="font-display text-sm font-bold tracking-tight">
              <span class="text-brand">Kentut</span><span class="text-text-secondary"> SuperApp</span>
            </span>
          </A>
          <div class="flex items-center gap-1.5">
            <SearchDialog />
            <A href="/" class="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text-secondary hover:bg-surface-1" title="Public site">
              <AppIcon icon="lucide:globe" size={16} />
            </A>
            <button type="button" title={theme() === "dark" ? "Light mode" : "Dark mode"} onClick={toggle}
              class="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text-secondary hover:bg-surface-1">
              <Show when={theme() === "dark"} fallback={<AppIcon icon="lucide:moon" size={16} />}><AppIcon icon="lucide:sun" size={16} /></Show>
            </button>
            <div class="relative">
              <button type="button" onClick={() => setProfileOpen((v) => !v)} class="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-surface-1">
                <span class="text-xs text-text-secondary hidden sm:block">{auth.user()?.displayName}</span>
                <div class="flex items-center justify-center w-7 h-7 rounded-md bg-brand-dim border border-brand/20">
                  <AppIcon icon="lucide:circle-user" size={16} style={{ color: "var(--color-brand)" }} />
                </div>
              </button>
              <Show when={profileOpen()}>
                <div class="dropdown-panel absolute right-0 top-10 w-56 bg-surface-1 border border-surface-3 rounded-xl shadow-xl p-3 z-50" onClick={(e) => e.stopPropagation()}>
                  <div class="px-2 pb-2 mb-2 border-b border-surface-3">
                    <p class="text-sm font-medium text-text-primary">{auth.user()?.displayName}</p>
                    <p class="text-xs text-text-muted">{auth.user()?.role} · {auth.user()?.appCount} apps</p>
                  </div>
                  <button type="button" onClick={handleLogout} class="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10">
                    <AppIcon icon="lucide:log-out" size={16} style={{ color: "#f87171" }} /> Logout
                  </button>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </header>
      <Show when={profileOpen()}><div class="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} /></Show>
      <SideNav items={PRIVATE_NAV}>
        <main class="p-6 min-h-[calc(100dvh-53px)]">{props.children}</main>
      </SideNav>
    </Show>
  );
};

export default PrivateLayout;
