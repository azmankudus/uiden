import { createSignal } from "solid-js";

interface ToggleSwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <div class="flex items-center justify-between py-3 border-t border-b border-surface-3/30">
      <div>
        <p class="text-sm font-medium text-text-primary">{props.label}</p>
        <Show when={props.description}>
          <p class="text-xs text-text-muted mt-0.5">{props.description}</p>
        </Show>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={(e) => props.onChange(e.currentTarget.checked)}
          class="sr-only peer"
        />
        <div class="w-10 h-5 rounded-full bg-surface-3 peer-checked:bg-brand peer-focus:ring-2 peer-focus:ring-brand/30 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5" />
      </label>
    </div>
  );
}
