import { Show } from "solid-js";

interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onInput: (v: string) => void;
  placeholder?: string;
  hint?: string;
}

export default function FormField(props: FormFieldProps) {
  return (
    <div>
      <label class="block text-xs font-medium text-text-secondary mb-2">{props.label}</label>
      <input
        type={props.type || "text"}
        value={props.value}
        onInput={(e) => props.onInput(e.currentTarget.value)}
        placeholder={props.placeholder}
        class="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/50"
      />
      <Show when={props.hint}>
        <p class="text-xs text-text-muted mt-1.5">{props.hint}</p>
      </Show>
    </div>
  );
}
