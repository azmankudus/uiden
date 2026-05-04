import { Show, onMount, onCleanup } from "solid-js";
import AppIcon from "~/components/common/AppIcon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  icon?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: any;
}

const sizes: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-xl",
  xl: "max-w-2xl",
  full: "max-w-4xl",
};

export default function Modal(props: ModalProps) {
  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && props.open) props.onClose();
    };
    document.addEventListener("keydown", handler);
    onCleanup(() => document.removeEventListener("keydown", handler));
  });

  return (
    <Show when={props.open}>
      <div class="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={props.onClose} />
        <div class={`relative w-full ${sizes[props.size || "md"]} bg-surface-1 border border-surface-3 rounded-2xl shadow-2xl animate-scale-in`}>
          <Show when={props.title}>
            <div class="flex items-center justify-between p-5 border-b border-surface-3/30">
              <div class="flex items-center gap-2.5">
                <Show when={props.icon}>
                  <AppIcon icon={props.icon!} size={20} style={{ color: "var(--color-brand)" }} />
                </Show>
                <h2 class="font-display text-base font-semibold text-text-primary">{props.title}</h2>
              </div>
              <button type="button" onClick={props.onClose} class="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition">
                <AppIcon icon="lucide:x" size={18} />
              </button>
            </div>
          </Show>
          <div class={props.title ? "p-5" : ""}>{props.children}</div>
        </div>
      </div>
    </Show>
  );
}
