import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Templates", value: "48", icon: "lucide:file-text", color: "#3b82f6" },
  { label: "Documents Generated", value: "2,847", icon: "lucide:file-code", color: "#10b981" },
  { label: "Today", value: "67", icon: "lucide:sparkles", color: "#8b5cf6" },
  { label: "Avg Time", value: "2.1s", icon: "lucide:zap", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:file-text", text: "Invoice INV-2847 generated for Acme Corp", time: "5 min ago", color: "#10b981" },
  { icon: "lucide:sparkles", text: "Batch job completed: 12 reports generated", time: "22 min ago", color: "#8b5cf6" },
  { icon: "lucide:file-pen", text: "Template 'Quarterly Report' updated by admin", time: "1 hr ago", color: "#3b82f6" },
  { icon: "lucide:file-code", text: "PDF export completed for contract bundle", time: "3 hr ago", color: "#10b981" },
  { icon: "lucide:circle-alert", text: "Template 'Invoice v2' has missing field warnings", time: "5 hr ago", color: "#f59e0b" },
  { icon: "lucide:sparkles", text: "New template 'Meeting Notes' created", time: "8 hr ago", color: "#8b5cf6" },
];

const actions = [
  { icon: "lucide:sparkles", label: "Generate" },
  { icon: "lucide:file-pen", label: "New Template" },
  { icon: "lucide:layers", label: "Batch Job" },
  { icon: "lucide:upload", label: "Export All" },
];

export default function DocHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Doc-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Generate and manage documents with templates and batch processing.</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <For each={stats}>
          {(s) => <StatCard label={s.label} value={s.value} icon={s.icon} color={s.color} />}
        </For>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <ActivityFeed items={activity} title="Recent Activity" />
        </div>
        <ActionGrid actions={actions} />
      </div>
    </div>
  );
}
