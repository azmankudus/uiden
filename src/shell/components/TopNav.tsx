import { For, Show, createMemo, createEffect, createSignal } from "solid-js";
import { useLocation, useNavigate, A } from "@solidjs/router";
import AppLogo from "../lib/app-logo";
import AppIcon from "../lib/app-icon";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import { getBrandColor } from "~/gateway/lib/apps";
import type { NavItem } from "./SideNav";
import type { SearchItem } from "./SearchBar";

export interface TopNavProps {
  name: string;
  slug: string;
  link: string;
  links?: NavItem[];
  searchItems?: SearchItem[];
  isPrivate?: boolean;
  hideSearch?: boolean;
}

export default function TopNav(props: TopNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const firstName = () => props.name.split(" ")[0];
  const restName = () => props.name.includes(" ") ? props.name.split(" ").slice(1).join(" ") : "";

  const isSettingsPage = createMemo(() => location.pathname === "/user/setting");
  const [previousUrl, setPreviousUrl] = createSignal<string | null>(null);

  const brandColor = () => getBrandColor(props.slug);

  const rightLinks = () => (props.links || []).filter(l => l.label !== "Contact");

  createEffect(() => {
    if (isSettingsPage() && !previousUrl()) {
      setPreviousUrl(document.referrer);
    }
  });

  const handleBack = () => {
    const referrer = previousUrl();
    if (referrer && !referrer.includes("/user/setting")) {
      window.location.href = referrer;
    } else {
      navigate("/apps");
    }
  };

  return (
    <header class="fixed top-0 left-0 right-0 z-50 h-[60px]">
      <nav class="flex items-center h-full px-5 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
        <Show when={isSettingsPage()} fallback={
          <A href={props.link} class="flex items-center gap-3 flex-shrink-0">
            <AppLogo slug={props.slug} size={36} />
            <span class="font-display text-xl font-bold tracking-tight leading-none">
              <span style={{ color: brandColor() }}>{firstName()}</span>
              <Show when={restName()}>
                <span class="text-text-primary"> {restName()}</span>
              </Show>
            </span>
          </A>
        }>
          <button type="button" onClick={handleBack} class="flex items-center gap-2 hover:text-text-primary transition-colors">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-2 hover:bg-surface-3 transition-colors">
              <AppIcon icon="lucide:arrow-left" size={20} class="text-text-secondary" />
            </div>
            <span class="font-display text-lg font-semibold text-text-primary">Back</span>
          </button>
        </Show>

        <Show when={!props.hideSearch}>
          <div class="ml-4">
            <SearchBar items={props.searchItems || []} />
          </div>
        </Show>

        <div class="flex-1" />

        <Show when={rightLinks().length > 0}>
          <div class="hidden md:flex items-center gap-1 mr-2">
            <For each={rightLinks()}>
              {(item) => (
                <A
                  href={item.path!}
                  class="px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-1 transition-colors"
                  state={{ active: location.pathname === item.path && location.pathname !== props.link }}
                >
                  <span classList={{
                    "text-brand": location.pathname === item.path && location.pathname !== props.link,
                  }}>
                    {item.label}
                  </span>
                </A>
              )}
            </For>
          </div>
        </Show>

        <div class="flex items-center gap-1">
          <UserActions appHome={props.slug !== "superapp" ? `/${props.slug}/public` : undefined} />
        </div>
      </nav>
    </header>
  );
}
