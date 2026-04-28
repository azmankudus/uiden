import { Show, createMemo, createEffect, createSignal } from "solid-js";
import { useLocation, useNavigate, A } from "@solidjs/router";
import AppIcon from "../lib/app-icon";
import AppLogo from "../lib/app-logo";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import { appColor } from "~/gateway/lib/apps";
import type { SearchItem } from "./SearchBar";

export interface AppHeaderProps {
  name: string;
  icon: string;
  link: string;
  logoSlug?: string;
  searchItems?: SearchItem[];
  isPrivate?: boolean;
  colorIndex?: number;
}

export default function AppHeader(props: AppHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const firstName = () => props.name.split(" ")[0];
  const restName = () => props.name.includes(" ") ? props.name.split(" ").slice(1).join(" ") : "";

  const isSettingsPage = createMemo(() => location.pathname === "/user/setting");
  const isLanding = createMemo(() => location.pathname === "/apps");
  const [previousUrl, setPreviousUrl] = createSignal<string | null>(null);

  const color = () => props.colorIndex != null ? appColor(props.colorIndex) : null;

  createEffect(() => {
    if (isSettingsPage() && !previousUrl()) {
      setPreviousUrl(document.referrer);
    }
  });

  const handleBack = () => {
    const referrer = previousUrl();
    if (referrer && !referrer.includes('/user/setting')) {
      window.location.href = referrer;
    } else {
      navigate('/apps');
    }
  };

  const brandIconStyle = () => color() ? { background: color()!.bg, borderColor: color()!.border } : {};
  const brandIconInner = () => color() ? { color: color()!.text } : {};
  const brandTextStyle = () => color() ? { color: color()!.text } : {};

  return (
    <header class="fixed top-0 left-0 right-0 z-50 h-[60px]">
      <Show
        when={props.isPrivate}
        fallback={
          <nav class="grid grid-cols-3 items-center h-full px-5 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
            <Show when={isSettingsPage()} fallback={
              <A href={props.link} class="flex items-center gap-3">
                <Show when={props.logoSlug} fallback={
                  <div class="flex items-center justify-center w-10 h-10 rounded-xl border" style={brandIconStyle()}>
                    <AppIcon icon={props.icon} size={24} style={brandIconInner()} />
                  </div>
                }>
                  <AppLogo slug={props.logoSlug!} size={36} />
                </Show>
                <span class="font-display text-xl font-bold tracking-tight leading-none">
                  <span style={brandTextStyle()}>{firstName()}</span>
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
            <div class="flex justify-center">
              <Show when={!isLanding()}>
                <SearchBar items={props.searchItems || []} />
              </Show>
            </div>
            <div class="flex justify-end">
              <UserActions />
            </div>
          </nav>
        }
      >
        <nav class="flex items-center justify-between h-full px-5 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
          <A href={props.link} class="flex items-center gap-3">
            <Show when={props.logoSlug} fallback={
              <div class="flex items-center justify-center w-10 h-10 rounded-xl border" style={brandIconStyle()}>
                <AppIcon icon={props.icon} size={24} style={brandIconInner()} />
              </div>
            }>
              <AppLogo slug={props.logoSlug!} size={36} />
            </Show>
            <span class="font-display text-xl font-bold tracking-tight leading-none">
              <span style={brandTextStyle()}>{firstName()}</span>
              <Show when={restName()}>
                <span class="text-text-primary"> {restName()}</span>
              </Show>
            </span>
          </A>
          <div class="flex items-center gap-1">
            <SearchBar items={props.searchItems || []} />
            <UserActions showHome />
          </div>
        </nav>
      </Show>
    </header>
  );
}
