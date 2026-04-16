import { For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "../lib/app-icon";
import type { NavItem } from "./SideNav";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

export interface PublicNavProps {
  name: string;
  icon: string;
  slug: string;
  links: NavItem[];
  searchItems: any[];
}

export default function PublicNav(props: PublicNavProps) {
  return (
    <header class="fixed top-0 left-0 right-0 z-50">
      <nav class="flex items-center justify-between px-6 py-3 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
        <div class="flex items-center gap-5">
          <A href={`/${props.slug}/public`} class="flex items-center gap-2.5">
            <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-dim">
              <AppIcon icon={props.icon} size={20} style={{ color: "var(--color-brand)" }} />
            </div>
            <span class="font-display text-lg font-bold tracking-tight leading-none">
              <span class="text-brand">{props.name.split(" ")[0]}</span>
              {props.name.includes(" ") && <span class="text-text-primary"> {props.name.split(" ").slice(1).join(" ")}</span>}
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
        <div class="flex items-center gap-2">
          <SearchBar items={props.searchItems} />
          <UserActions />
        </div>
      </nav>
    </header>
  );
}
