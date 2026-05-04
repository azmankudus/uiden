import { splitProps, Show, createSignal, type JSX } from "solid-js";
import AppIcon from "~/components/common/AppIcon";

interface InputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "onInput"> {
  label?: string;
  hint?: string;
  icon?: string;
  error?: string;
  onInput?: (value: string) => void;
}

export default function Input(props: InputProps) {
  const [local, rest] = splitProps(props, ["label", "hint", "icon", "error", "onInput", "class"]);
  const [showPassword, setShowPassword] = createSignal(false);
  const isPassword = () => (rest.type || "text") === "password";

  return (
    <div>
      <Show when={local.label}>
        <label class="block text-xs font-medium text-text-secondary mb-1.5">{local.label}</label>
      </Show>
      <div class="relative">
        <Show when={local.icon}>
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            <AppIcon icon={local.icon!} size={16} />
          </span>
        </Show>
        <input
          type={isPassword() && showPassword() ? "text" : rest.type || "text"}
          class={`w-full bg-surface-0 border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition disabled:opacity-50 disabled:cursor-not-allowed ${local.icon ? "pl-10" : ""} ${isPassword() ? "pr-10" : ""} ${local.error ? "border-red-500/50" : "border-surface-3/50"} ${local.class || ""}`}
          onInput={(e) => local.onInput?.(e.currentTarget.value)}
          {...rest}
        />
        <Show when={isPassword()}>
          <button type="button" onClick={() => setShowPassword(v => !v)} class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition">
            <AppIcon icon={showPassword() ? "lucide:eye-off" : "lucide:eye"} size={16} />
          </button>
        </Show>
      </div>
      <Show when={local.error}>
        <p class="text-xs text-red-400 mt-1">{local.error}</p>
      </Show>
      <Show when={local.hint && !local.error}>
        <p class="text-xs text-text-muted mt-1">{local.hint}</p>
      </Show>
    </div>
  );
}
