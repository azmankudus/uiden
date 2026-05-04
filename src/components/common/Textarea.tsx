import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

interface TextareaProps extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, "onInput"> {
  label?: string;
  hint?: string;
  onInput?: (value: string) => void;
}

export default function Textarea(props: TextareaProps) {
  const [local, rest] = splitProps(props, ["label", "hint", "onInput", "class"]);
  return (
    <div>
      <Show when={local.label}>
        <label class="block text-xs font-medium text-text-secondary mb-1.5">{local.label}</label>
      </Show>
      <textarea
        class={`w-full bg-surface-0 border border-surface-3/50 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition resize-none ${local.class || ""}`}
        onInput={(e) => local.onInput?.(e.currentTarget.value)}
        {...rest}
      />
      <Show when={local.hint}>
        <p class="text-xs text-text-muted mt-1">{local.hint}</p>
      </Show>
    </div>
  );
}
