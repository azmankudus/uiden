import { Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";

interface PageHeaderProps {
  title: string;
  icon: string;
  description?: string;
  children?: any;
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-brand-dim flex items-center justify-center">
          <AppIcon icon={props.icon} size={18} style={{ color: "var(--color-brand)" }} />
        </div>
        <div>
          <h1 class="font-display text-lg font-bold text-text-primary">{props.title}</h1>
          <Show when={props.description}>
            <p class="text-xs text-text-muted">{props.description}</p>
          </Show>
        </div>
      </div>
      {props.children}
    </div>
  );
}
