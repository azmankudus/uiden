import { Show } from "solid-js";
import { STATUS_STYLES } from "../lib/constants";

interface StatusBadgeProps {
  status: "active" | "inactive" | "suspended";
}

export function StatusBadge(props: StatusBadgeProps) {
  const config = () => STATUS_STYLES[props.status] || STATUS_STYLES.inactive;
  return (
    <span
      class={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium ${config().bg} ${config().text}`}
    >
      <span class={`w-1.5 h-1.5 rounded-full ${config().dot}`} />
      {props.status.charAt(0).toUpperCase() + props.status.slice(1)}
    </span>
  );
}