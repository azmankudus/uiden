import { Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";

interface SectionProps {
  title: string;
  icon: string;
  description?: string;
  children: any;
}

export default function Section(props: SectionProps) {
  return (
    <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
      <div class="flex items-center gap-2.5 mb-1">
        <AppIcon icon={props.icon} size={18} style={{ color: "var(--color-brand)" }} />
        <h2 class="font-display text-sm font-semibold text-text-primary">{props.title}</h2>
      </div>
      <Show when={props.description} fallback={<div class="mb-3" />}>
        <p class="text-xs text-text-muted mb-4 ml-7">{props.description}</p>
      </Show>
      {props.children}
    </div>
  );
}
