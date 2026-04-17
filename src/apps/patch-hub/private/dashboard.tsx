import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Critical CVEs", value: "8", icon: "lucide:triangle-alert", color: "#ef4444" },
  { label: "Patches Available", value: "47", icon: "lucide:package", color: "#3b82f6" },
  { label: "Systems Patched", value: "92%", icon: "lucide:shield-check", color: "#10b981" },
  { label: "Avg Fix Time", value: "2.4h", icon: "lucide:clock", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:triangle-alert", text: "CVE-2026-0847 rated Critical — affects 12 systems", time: "8 min ago", color: "#ef4444" },
  { icon: "lucide:package", text: "Patch PATCH-2847 deployed to production cluster", time: "35 min ago", color: "#10b981" },
  { icon: "lucide:shield", text: "Compliance scan completed: 94% coverage", time: "1 hr ago", color: "#3b82f6" },
  { icon: "lucide:rocket", text: "Deployment DEP-0392 completed for web-servers group", time: "2 hr ago", color: "#8b5cf6" },
  { icon: "lucide:triangle-alert", text: "CVE-2026-0912 downgraded to Medium after analysis", time: "4 hr ago", color: "#f59e0b" },
  { icon: "lucide:package", text: "3 new patches available for Ubuntu 24.04 LTS", time: "6 hr ago", color: "#06b6d4" },
];

const actions = [
  { icon: "lucide:scan", label: "Scan Now" },
  { icon: "lucide:package", label: "Apply Patch" },
  { icon: "lucide:rocket", label: "New Deploy" },
  { icon: "lucide:file-text", label: "Report" },
];

export default function PatchHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Patch-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Vulnerability detection and patch deployment overview.</p>
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
