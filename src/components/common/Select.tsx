import { Show, For } from "solid-js";

interface SelectProps {
  label?: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  class?: string;
}

export default function Select(props: SelectProps) {
  return (
    <div>
      <Show when={props.label}>
        <label class="block text-xs font-medium text-text-secondary mb-1.5">{props.label}</label>
      </Show>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        class={`w-full bg-surface-0 border border-surface-3/50 rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition appearance-none ${props.class || ""}`}
      >
        <For each={props.options}>
          {(opt) => <option value={opt.value}>{opt.label}</option>}
        </For>
      </select>
    </div>
  );
}
