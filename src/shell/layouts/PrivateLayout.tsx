import { Show, createSignal, onMount, type ParentComponent } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import AppIcon from "../lib/app-icon";
import { useAuth } from "../context/auth";
import SideNav, { type NavItem } from "../components/SideNav";
import SearchBar from "../components/SearchBar";
import UserActions from "../components/UserActions";
import type { SearchItem } from "../components/SearchBar";

interface PrivateLayoutProps {
  name: string;
  icon: string;
  slug: string;
  nav: NavItem[];
  searchItems: SearchItem[];
}

const PrivateLayout: ParentComponent<PrivateLayoutProps> = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    if (!auth.isLoggedIn()) { navigate("/user/login", { replace: true }); return; }
    requestAnimationFrame(() => setMounted(true));
  });

  return (
    <Show when={mounted()}>
      <header class="fixed top-0 left-0 right-0 z-50 h-[56px]">
        <div class="grid grid-cols-3 items-center h-full px-4 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
          <A href={`/${props.slug}/private`} class="flex items-center gap-2.5">
            <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-dim">
              <AppIcon icon={props.icon} size={20} style={{ color: "var(--color-brand)" }} />
            </div>
            <span class="font-display text-lg font-bold tracking-tight leading-none">
              <span class="text-brand">{props.name.split(" ")[0]}</span>
              {props.name.includes(" ") && <span class="text-text-primary"> {props.name.split(" ").slice(1).join(" ")}</span>}
            </span>
          </A>
          <div class="flex justify-center">
            <SearchBar items={props.searchItems} />
          </div>
          <div class="flex justify-end">
            <UserActions />
          </div>
        </div>
      </header>
      <SideNav items={props.nav}>
        <main class="p-6 min-h-[calc(100dvh-56px)]">{props.children}</main>
      </SideNav>
    </Show>
  );
};

export default PrivateLayout;
