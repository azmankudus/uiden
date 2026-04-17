import AppIcon from "~/shell/lib/app-icon";
import { A } from "@solidjs/router";
import { Show } from "solid-js";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState(props: EmptyStateProps) {
  return (
    <div class="max-w-6xl mx-auto page-enter flex flex-col items-center justify-center py-24">
      <Show when={props.icon}>
        <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-2 mb-6">
          <AppIcon icon={props.icon!} size={28} style={{ color: "var(--color-text-muted)" }} />
        </div>
      </Show>
      <h1 class="font-display text-xl font-bold text-text-primary mb-2">{props.title}</h1>
      <Show when={props.description}>
        <p class="text-sm text-text-secondary mb-6">{props.description}</p>
      </Show>
      <Show when={props.actionHref}>
        <A
          href={props.actionHref!}
          class="px-4 py-2 rounded-xl text-sm font-medium bg-surface-2 text-text-primary hover:bg-surface-3"
        >
          {props.actionLabel || "Go Back"}
        </A>
      </Show>
    </div>
  );
}
