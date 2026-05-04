interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

export default function Toggle(props: ToggleProps) {
  return (
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-sm text-text-primary">{props.label}</p>
        {props.description && <p class="text-xs text-text-muted mt-0.5">{props.description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={props.checked}
        onClick={() => props.onChange(!props.checked)}
        class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors"
        classList={{ "bg-brand": props.checked, "bg-surface-3": !props.checked }}
      >
        <span
          class="pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
          classList={{ "translate-x-4": props.checked, "translate-x-0": !props.checked }}
        />
      </button>
    </div>
  );
}
