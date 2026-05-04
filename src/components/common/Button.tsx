import { splitProps, type JSX } from "solid-js";
import AppIcon from "~/components/common/AppIcon";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: string;
  size?: "sm" | "md";
}

const variants: Record<Variant, string> = {
  primary: "bg-brand text-surface-0 hover:brightness-110 shadow-lg shadow-brand/20",
  secondary: "bg-surface-2 border border-surface-3 text-text-secondary hover:bg-surface-3 hover:text-text-primary",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-2",
  danger: "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20",
};

export default function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ["variant", "icon", "size", "class", "children"]);
  const size = () => local.size === "sm" ? "px-3 py-1.5 text-xs gap-1.5" : "px-4 py-2.5 text-sm gap-2";
  return (
    <button
      class={`inline-flex items-center justify-center font-medium rounded-xl transition-all active:scale-[0.98] ${variants[local.variant || "primary"]} ${size()} ${local.class || ""}`}
      {...rest}
    >
      {local.icon && <AppIcon icon={local.icon} size={local.size === "sm" ? 14 : 16} />}
      {local.children}
    </button>
  );
}
