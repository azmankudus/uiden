import { createSignal, onMount, Show, type ParentComponent } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "~/lib/common/auth";
import TopNav from "~/components/common/TopNav";
import SideNav, { type NavSection } from "~/components/common/SideNav";
import { ROUTES } from "~/lib/common/branding";
import AppIcon from "~/components/common/AppIcon";

export type ContentWidth = "narrow" | "default" | "wide" | "full";

export const CONTENT_WIDTH_KEY = "uiden_content_width";

export function getContentWidth(): ContentWidth {
  return (localStorage.getItem(CONTENT_WIDTH_KEY) as ContentWidth) || "default";
}

const WIDTH_MAP: Record<ContentWidth, string> = {
  narrow: "48rem",
  default: "64rem",
  wide: "80rem",
  full: "100%",
};

interface PrivateLayoutProps {
  name: string;
  icon: string;
  slug: string;
  sections: NavSection[];
}

const PrivateLayout: ParentComponent<PrivateLayoutProps> = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);
  const [widthMode, setWidthMode] = createSignal<ContentWidth>(getContentWidth());

  const isFull = () => widthMode() === "full";

  onMount(() => {
    if (!auth.isLoggedIn()) { navigate(ROUTES.login, { replace: true }); return; }
    requestAnimationFrame(() => setMounted(true));

    const handler = (e: StorageEvent) => {
      if (e.key === CONTENT_WIDTH_KEY) {
        setWidthMode((localStorage.getItem(CONTENT_WIDTH_KEY) as ContentWidth) || "default");
      }
    };
    window.addEventListener("storage", handler);
  });

  return (
    <Show when={mounted()}>
      <TopNav
        name={props.name}
        slug={props.slug}
        link={ROUTES.apps}
        isPrivate
      />
      <SideNav sections={props.sections} forceCollapsed={isFull()}>
        <main class="min-h-[calc(100dvh-60px)]">
          <div class="p-6 page-enter transition-all duration-500 ease-in-out"
            style={{ "max-width": WIDTH_MAP[widthMode()], "margin-left": "auto", "margin-right": "auto" }}>
            {props.children}
          </div>
        </main>
      </SideNav>
    </Show>
  );
};

export default PrivateLayout;
