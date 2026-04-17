import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Transfers Today", value: "342", icon: "lucide:send", color: "#3b82f6" },
  { label: "Avg Speed", value: "45MB/s", icon: "lucide:activity", color: "#10b981" },
  { label: "Queued", value: "12", icon: "lucide:list-ordered", color: "#f59e0b" },
  { label: "Failed", value: "2", icon: "lucide:circle-alert", color: "#ef4444" },
];

const activity = [
  { icon: "lucide:send", text: "Upload completed: Q2-report-2026.xlsx → partner-portal (24MB)", time: "4 min ago", color: "#10b981" },
  { icon: "lucide:circle-alert", text: "Transfer failed: db-export.csv — connection timeout to sftp.vendor.io", time: "12 min ago", color: "#ef4444" },
  { icon: "lucide:send", text: "Download completed: compliance-audit-log.tar.gz (1.2GB)", time: "30 min ago", color: "#3b82f6" },
  { icon: "lucide:clock", text: "Scheduled transfer batch-payments-0417.csv queued for 18:00", time: "1 hr ago", color: "#f59e0b" },
  { icon: "lucide:send", text: "Upload completed: employee-records.json → hr-system (8MB)", time: "2 hr ago", color: "#10b981" },
  { icon: "lucide:shield", text: "Policy Auto-Encrypt applied to 5 outgoing transfers", time: "3 hr ago", color: "#8b5cf6" },
];

const actions = [
  { icon: "lucide:upload", label: "Upload" },
  { icon: "lucide:send", label: "New Transfer" },
  { icon: "lucide:clock", label: "Schedule" },
  { icon: "lucide:scroll-text", label: "Audit Log" },
];

export default function SendHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Send-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Managed file transfer overview.</p>
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
