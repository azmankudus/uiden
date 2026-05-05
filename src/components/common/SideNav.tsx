import { createSignal, Show, For, createMemo } from "solid-js";
import { useLocation, A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import { useT } from "~/lib/common/i18n";

export interface NavItem {
  label: string;
  icon: string;
  path?: string;
  disabled?: boolean;
  children?: NavItem[];
  onClick?: () => void;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

function fullPath(loc: { pathname: string; hash: string }) {
  return loc.pathname + (loc.hash || "");
}

function isDescendantActive(item: NavItem, fp: string): boolean {
  if (item.path === fp) return true;
  if (item.children) return item.children.some((c) => isDescendantActive(c, fp));
  return false;
}

function linkClass(isActive: () => boolean) {
  const base = "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors w-full text-left";
  return createMemo(() =>
    isActive()
      ? `${base} bg-brand-dim text-brand`
      : `${base} text-text-secondary hover:text-text-primary hover:bg-surface-2`
  );
}

function TreeItem(props: { item: NavItem; depth: number; collapsed: boolean }) {
  const loc = useLocation();
  const hasChildren = () => !!props.item.children;
  const isActive = createMemo(() => !!props.item.path && props.item.path === fullPath(loc));
  const isParentOfActive = createMemo(() => hasChildren() && isDescendantActive(props.item, fullPath(loc)));
  const [manualExpand, setManualExpand] = createSignal(false);
  const expanded = createMemo(() => manualExpand() || isParentOfActive());
  const cls = linkClass(isActive);
  const padStyle = { "padding-left": `${16 + props.depth * 20}px` };

  return (
    <li>
      <Show when={hasChildren()} fallback={
        <Show when={!props.item.disabled} fallback={
          <span class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-muted/40 cursor-not-allowed select-none" style={padStyle}>
            <AppIcon icon={props.item.icon} size={20} class="flex-shrink-0 opacity-40" />
            <Show when={!props.collapsed}><span class="truncate">{props.item.label}</span></Show>
          </span>
        }>
          <Show when={props.item.onClick} fallback={
            <A href={props.item.path!} class={cls()} style={padStyle}>
              <AppIcon icon={props.item.icon} size={20} class="flex-shrink-0" />
              <Show when={!props.collapsed}><span class="truncate">{props.item.label}</span></Show>
            </A>
          }>
            <button type="button" onClick={props.item.onClick}
              class={cls()} style={padStyle}>
              <AppIcon icon={props.item.icon} size={20} class="flex-shrink-0" />
              <Show when={!props.collapsed}><span class="truncate">{props.item.label}</span></Show>
            </button>
          </Show>
        </Show>
      }>
        <button type="button" onClick={() => setManualExpand((v) => !v)}
          class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors"
          classList={{ "text-brand bg-brand-dim/50": isParentOfActive(), "text-text-secondary hover:text-text-primary hover:bg-surface-2": !isParentOfActive() }}
          style={{ "padding-left": `${16 + props.depth * 20}px` }}>
          <AppIcon icon={props.item.icon} size={20} class="flex-shrink-0" />
          <Show when={!props.collapsed}>
            <span class="truncate flex-1 text-left">{props.item.label}</span>
            <AppIcon icon={expanded() ? "lucide:chevron-down" : "lucide:chevron-right"} size={18} class="text-text-muted" />
          </Show>
        </button>
        <Show when={expanded() && !props.collapsed}>
          <ul class="mt-0.5 overflow-hidden">
            <For each={props.item.children}>{(child) => <TreeItem item={child} depth={props.depth + 1} collapsed={props.collapsed} />}</For>
          </ul>
        </Show>
      </Show>
    </li>
  );
}

export default function SideNav(props: { sections: NavSection[]; forceCollapsed?: boolean; children: any }) {
  const [collapsed, setCollapsed] = createSignal(false);
  const effectiveCollapsed = () => props.forceCollapsed || collapsed();
  const t = useT("common");

  return (
    <>
      <aside class="fixed left-0 top-[60px] bottom-0 z-40 flex flex-col bg-surface-1/80 backdrop-blur-lg border-r border-surface-3/40 transition-all duration-300"
        style={{ width: effectiveCollapsed() ? "64px" : "280px" }}>
        <div class="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2">
          <For each={props.sections}>
            {(section, si) => (
              <Show when={section.title} fallback={
                <ul class="space-y-0.5">
                  <For each={section.items}>{(item) => <TreeItem item={item} depth={0} collapsed={effectiveCollapsed()} />}</For>
                </ul>
              }>
                <div classList={{ "mt-4": si() > 0 }}>
                  <Show when={!effectiveCollapsed()}>
                    <p class="px-4 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">{section.title}</p>
                  </Show>
                  <ul class="space-y-0.5">
                    <For each={section.items}>{(item) => <TreeItem item={item} depth={0} collapsed={effectiveCollapsed()} />}</For>
                  </ul>
                </div>
              </Show>
            )}
          </For>
        </div>
        <div class="border-t border-surface-3/40 p-2">
          <button type="button" onClick={() => setCollapsed((v) => !v)}
            class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-secondary hover:bg-surface-2 w-full transition-colors">
            <AppIcon icon={effectiveCollapsed() ? "lucide:panel-left-open" : "lucide:panel-left-close"} size={20} class="flex-shrink-0" />
            <Show when={!effectiveCollapsed()}><span class="truncate">{t().collapse}</span></Show>
          </button>
        </div>
      </aside>
      <div class="transition-all duration-300" style={{ "margin-left": effectiveCollapsed() ? "64px" : "280px", "padding-top": "60px" }}>
        {props.children}
      </div>
    </>
  );
}
