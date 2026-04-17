import AppIcon from "~/shell/lib/app-icon";
import { A } from "@solidjs/router";
import type { ParentComponent } from "solid-js";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: string;
  iconColor?: string;
  backHref?: string;
  backLabel?: string;
}

const PageHeader: ParentComponent<PageHeaderProps> = (props) => {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <Show when={props.backHref}>
        <A
          href={props.backHref!}
          class="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary mb-6"
        >
          <AppIcon icon="lucide:arrow-left" size={14} />
          {props.backLabel || "Back"}
        </A>
      </Show>

      <div class="flex items-start gap-5 mb-8">
        <Show when={props.icon}>
          <div
            class="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0"
            style={{
              background: (props.iconColor || "var(--color-brand)") + "18",
              border: `1px solid ${(props.iconColor || "var(--color-brand)") + "30"}`,
            }}
          >
            <AppIcon
              icon={props.icon!}
              size={26}
              style={{ color: props.iconColor || "var(--color-brand)" }}
            />
          </div>
        </Show>
        <div class="flex-1">
          <h1 class="font-display text-2xl font-bold text-text-primary">{props.title}</h1>
          <Show when={props.description}>
            <p class="text-sm text-text-secondary mt-1">{props.description}</p>
          </Show>
        </div>
        <Show when={props.children}>
          <div class="flex items-center gap-2 shrink-0">{props.children}</div>
        </Show>
      </div>
    </div>
  );
};

export default PageHeader;
