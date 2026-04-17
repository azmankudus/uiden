import { Show, createSignal, onMount, type ParentComponent } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../context/auth";
import AppHeader from "../components/AppHeader";
import SideNav, { type NavItem } from "../components/SideNav";
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
      <AppHeader
        name={props.name}
        icon={props.icon}
        link={`/${props.slug}/private`}
        searchItems={props.searchItems}
        variant="private"
      />
      <SideNav items={props.nav}>
        <main class="p-6 min-h-[calc(100dvh-60px)]">{props.children}</main>
      </SideNav>
    </Show>
  );
};

export default PrivateLayout;
