import { For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "../lib/app-icon";
import SearchIconButton from "./SearchIconButton";
import UserActions from "./UserActions";
import { appColor } from "~/gateway/lib/apps";
import type { NavItem } from "./SideNav";
import type { SearchItem } from "./SearchBar";

export interface PublicNavProps {
  name: string;
  icon: string;
  slug: string;
  links: NavItem[];
  searchItems: SearchItem[];
  colorIndex?: number;
}

export default function PublicNav(props: PublicNavProps) {
  const firstName = () => props.name.split(" ")[0];
  const restName = () => props.name.includes(" ") ? props.name.split(" ").slice(1).join(" ") : "";

  const color = () => props.colorIndex != null ? appColor(props.colorIndex) : null;
  const iconBg = () => color() ? { background: color()!.bg, borderColor: color()!.border } : {};
  const iconColor = () => color() ? { color: color()!.text } : { color: "var(--color-brand)" };
  const textColor = () => color() ? { color: color()!.text } : {};

  return (
    <header class="fixed top-0 left-0 right-0 z-50 h-[60px]">
      <nav class="grid grid-cols-[1fr_auto_1fr] items-center h-full px-5 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
        <div class="flex items-center gap-5">
          <A href={`/${props.slug}/public`} class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl border" style={iconBg()}>
              <AppIcon icon={props.icon} size={24} style={iconColor()} />
            </div>
            <span class="font-display text-xl font-bold tracking-tight leading-none">
              <span style={textColor()}>{firstName()}</span>
              {restName() && <span class="text-text-primary"> {restName()}</span>}
            </span>
          </A>
          <div class="hidden md:flex items-center gap-1">
            <For each={props.links}>
              {(item) => (
                <A href={item.path!} class="px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-1 transition-colors" activeClass="text-brand bg-brand-dim">
                  {item.label}
                </A>
              )}
            </For>
          </div>
        </div>
        <div class="flex justify-end items-center gap-1">
          <SearchIconButton items={props.searchItems} />
          <UserActions />
        </div>
      </nav>
    </header>
  );
}
