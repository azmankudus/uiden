import AppIcon from "~/shell/lib/app-icon";
import { Show } from "solid-js";

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export default function StatCard(props: StatCardProps) {
  return (
    <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30 hover:border-brand/30 transition-all">
      <div class="flex items-center justify-between mb-3">
        <div
          class="flex items-center justify-center w-9 h-9 rounded-xl"
          style={{ "background-color": props.color + "20" }}
        >
          <AppIcon icon={props.icon} size={18} style={{ color: props.color }} />
        </div>
      </div>
      <div class="font-display text-2xl font-bold text-text-primary">{props.value}</div>
      <div class="text-xs text-text-muted mt-1">{props.label}</div>
    </div>
  );
}
