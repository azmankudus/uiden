import { createSignal, Show, For, createMemo } from "solid-js";
import { useLocation, A } from "@solidjs/router";
import AppIcon from "../lib/app-icon";

export interface NavItem {
  label: string;
  icon: string;
  path?: string;
  disabled?: boolean;
  children?: NavItem[];
}

function isDescendantActive(item: NavItem, pathname: string): boolean {
  if (item.path === pathname) return true;
  if (item.children) return item.children.some((c) => isDescendantActive(c, pathname));
  return false;
}

function TreeItem(props: { item: NavItem; depth: number; collapsed: boolean }) {
  const loc = useLocation();
  const hasChildren = () => !!props.item.children;
  const isActive = createMemo(() => !!props.item.path && props.item.path === loc.pathname);
  const isParentOfActive = createMemo(() => hasChildren() && isDescendantActive(props.item, loc.pathname));
  const [manualExpand, setManualExpand] = createSignal(false);
  const expanded = createMemo(() => manualExpand() || isParentOfActive());

  return (
    <li>
      <Show when={hasChildren()} fallback={
        <Show when={!props.item.disabled} fallback={
          <span class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm text-text-muted/40 cursor-not-allowed select-none"
            style={{ "padding-left": `${12 + props.depth * 16}px` }}>
            <AppIcon icon={props.item.icon} size={16} class="flex-shrink-0 opacity-40" />
            <Show when={!props.collapsed}><span class="truncate">{props.item.label}</span></Show>
          </span>
        }>
          <A href={props.item.path!} class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
            classList={{ "bg-brand-dim text-brand": isActive(), "text-text-secondary hover:text-text-primary hover:bg-surface-2": !isActive() }}
            style={{ "padding-left": `${12 + props.depth * 16}px` }}>
            <AppIcon icon={props.item.icon} size={16} class="flex-shrink-0" />
            <Show when={!props.collapsed}><span class="truncate">{props.item.label}</span></Show>
          </A>
        </Show>
      }>
        <button type="button" onClick={() => setManualExpand((v) => !v)}
          class="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
          classList={{ "text-brand bg-brand-dim/50": isParentOfActive(), "text-text-secondary hover:text-text-primary hover:bg-surface-2": !isParentOfActive() }}
          style={{ "padding-left": `${12 + props.depth * 16}px` }}>
          <AppIcon icon={props.item.icon} size={16} class="flex-shrink-0" />
          <Show when={!props.collapsed}>
            <span class="truncate flex-1 text-left">{props.item.label}</span>
            <AppIcon icon={expanded() ? "lucide:chevron-down" : "lucide:chevron-right"} size={14} class="text-text-muted" />
          </Show>
        </button>
        <Show when={expanded() && !props.collapsed}>
          <ul class="mt-0.5 animate-tree-expand overflow-hidden">
            <For each={props.item.children}>{(child) => <TreeItem item={child} depth={props.depth + 1} collapsed={props.collapsed} />}</For>
          </ul>
        </Show>
      </Show>
    </li>
  );
}

export default function SideNav(props: { items: NavItem[] }) {
  const [collapsed, setCollapsed] = createSignal(false);

  return (
    <>
      <aside class="fixed left-0 top-[56px] bottom-0 z-40 flex flex-col bg-surface-1/80 backdrop-blur-lg border-r border-surface-3/40 transition-all duration-300"
        style={{ width: collapsed() ? "60px" : "260px" }}>
        <div class="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2">
          <ul class="space-y-0.5">
            <For each={props.items}>{(item) => <TreeItem item={item} depth={0} collapsed={collapsed()} />}</For>
          </ul>
        </div>
        <div class="border-t border-surface-3/40 p-2">
          <button type="button" onClick={() => setCollapsed((v) => !v)}
            class="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-surface-2 text-xs">
            <AppIcon icon={collapsed() ? "lucide:panel-left-open" : "lucide:panel-left-close"} size={16} />
            <Show when={!collapsed()}><span>Collapse</span></Show>
          </button>
        </div>
      </aside>
      <div class="transition-all duration-300" style={{ "margin-left": collapsed() ? "60px" : "260px", "padding-top": "56px" }}>
        {props.children}
      </div>
    </>
  );
}
