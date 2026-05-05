import { For, Show } from "solid-js";
import { useLocation, A } from "@solidjs/router";
import AppLogo from "~/components/common/AppLogo";
import AppIcon from "~/components/common/AppIcon";
import UserActions from "~/components/common/UserActions";
import { getBrandColor } from "~/lib/apps/apps";
import { BRAND } from "~/lib/common/branding";
import { useLang, LANG_META, type Lang } from "~/lib/common/i18n";

export interface NavLink {
  label: string;
  path: string;
}

export interface TopNavProps {
  name: string;
  slug: string;
  link: string;
  links?: NavLink[];
  isPrivate?: boolean;
  hideSearch?: boolean;
}

function LangSwitcher() {
  const { lang, setLang } = useLang();
  const langs: Lang[] = ["en", "my", "cn"];

  return (
    <div class="relative group">
      <button
        type="button"
        class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-1 transition-colors"
      >
        <AppIcon icon="lucide:globe" size={16} />
        <span>{LANG_META[lang()].flag}</span>
      </button>
      <div class="absolute right-0 top-full mt-1 py-1 w-40 rounded-xl bg-surface-1 border border-surface-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <For each={langs}>
          {(l) => (
            <button
              type="button"
              onClick={() => setLang(l)}
              class="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors"
              classList={{
                "text-brand bg-brand/10": lang() === l,
                "text-text-secondary hover:text-text-primary hover:bg-surface-2": lang() !== l,
              }}
            >
              <span class="w-6 text-center font-mono text-xs font-bold">{LANG_META[l].flag}</span>
              <span>{LANG_META[l].label}</span>
            </button>
          )}
        </For>
      </div>
    </div>
  );
}

export default function TopNav(props: TopNavProps) {
  const location = useLocation();
  const displayName = () => props.slug === BRAND.slug ? BRAND.name : (props.name || "");
  const firstName = () => (displayName()).split(" ")[0];
  const restName = () => (displayName()).includes(" ") ? (displayName()).split(" ").slice(1).join(" ") : "";

  const brandColor = () => getBrandColor(props.slug || BRAND.slug);

  return (
    <header class="fixed top-0 left-0 right-0 z-50 h-[60px]">
      <nav class="flex items-center h-full px-5 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
        <A href={props.link} class="flex items-center gap-3 flex-shrink-0">
          <AppLogo slug={props.slug} size={36} />
          <span class="font-display text-xl font-bold tracking-tight leading-none">
            <span style={{ color: brandColor() }}>{firstName()}</span>
            <Show when={restName()}>
              <span class="text-text-primary"> {restName()}</span>
            </Show>
          </span>
        </A>

        <div class="flex-1" />

        <div class="flex items-center gap-1">
          <Show when={!props.isPrivate && props.links?.length}>
            <div class="hidden md:flex items-center gap-1 mr-2">
              <For each={props.links || []}>
                {(link) => (
                  <A
                    href={link.path}
                    class="px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-1 transition-colors"
                  >
                    <span classList={{
                      "text-brand": location.pathname === link.path,
                    }}>
                      {link.label}
                    </span>
                  </A>
                )}
              </For>
            </div>
          </Show>
          <LangSwitcher />
          <UserActions appHome={props.slug !== BRAND.slug ? `/${props.slug}/public` : undefined} />
        </div>
      </nav>
    </header>
  );
}
