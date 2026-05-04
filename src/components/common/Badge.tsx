type Variant = "default" | "success" | "warning" | "danger" | "info" | "brand";

interface BadgeProps {
  label: string;
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  default: "bg-surface-2 text-text-secondary",
  success: "bg-brand/20 text-brand",
  warning: "bg-yellow-500/10 text-yellow-500",
  danger: "bg-red-500/10 text-red-400",
  info: "bg-blue-500/10 text-blue-400",
  brand: "bg-brand-dim text-brand",
};

export default function Badge(props: BadgeProps) {
  return (
    <span class={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium ${variants[props.variant || "default"]}`}>
      {props.label}
    </span>
  );
}
