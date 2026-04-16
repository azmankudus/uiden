import { Show, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "../AppIcon";
import { useTheme } from "../ThemeProvider";
import { useAuth } from "../AuthProvider";
import { PUBLIC_NAV } from "~/lib/sample/navigation";
import SearchDialog from "./SearchDialog";

export default function PublicNav() {
  const { theme, toggle } = useTheme();
  const auth = useAuth();

  return (
    <header class="fixed top-0 left-0 right-0 z-50">
      <nav class="flex items-center justify-between px-6 py-3 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
        <A href="/sample/public" class="flex items-center gap-2.5">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-dim">
            <AppIcon icon="lucide:wind" size={18} style={{ color: "var(--color-brand)" }} />
          </div>
          <span class="font-display text-base font-bold tracking-tight">
            <span class="text-brand">Kentut</span><span class="text-text-primary"> SuperApp</span>
          </span>
        </A>
        <div class="hidden md:flex items-center gap-1">
          <For each={PUBLIC_NAV}>
            {(item) => (
              <A href={item.path} class="px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-1 transition-colors" activeClass="text-brand bg-brand-dim">
                {item.label}
              </A>
            )}
          </For>
        </div>
        <div class="flex items-center gap-2">
          <SearchDialog />
          <button type="button" title={theme() === "dark" ? "Light mode" : "Dark mode"} onClick={toggle} class="flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-1">
            <Show when={theme() === "dark"} fallback={<AppIcon icon="lucide:moon" size={18} />}><AppIcon icon="lucide:sun" size={18} /></Show>
          </button>
          <Show when={auth.isLoggedIn()} fallback={
            <A href="/login" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand text-surface-0 hover:brightness-110">
              <AppIcon icon="lucide:log-in" size={16} /><span class="hidden sm:inline">Sign in</span>
            </A>
          }>
            <A href="/sample/private" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand text-surface-0 hover:brightness-110">
              <AppIcon icon="lucide:layout-dashboard" size={16} /><span class="hidden sm:inline">Dashboard</span>
            </A>
          </Show>
        </div>
      </nav>
    </header>
  );
}
