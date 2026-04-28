import { Show, createSignal, onMount, type ParentComponent } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../context/auth";
import TopNav from "../components/TopNav";
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
      <TopNav
        name={props.name}
        slug={props.slug}
        link={`/${props.slug}/private`}
        searchItems={props.searchItems}
        isPrivate
      />
      <SideNav items={props.nav}>
        <main class="p-6 min-h-[calc(100dvh-60px)]">{props.children}</main>
      </SideNav>
    </Show>
  );
};

export default PrivateLayout;
