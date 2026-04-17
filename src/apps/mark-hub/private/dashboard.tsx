import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Files", value: "67", icon: "lucide:folder", color: "#3b82f6" },
  { label: "Recent Edits", value: "23", icon: "lucide:pencil", color: "#10b981" },
  { label: "Shared", value: "8", icon: "lucide:users", color: "#8b5cf6" },
  { label: "Storage Used", value: "4.2MB", icon: "lucide:hard-drive", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:pencil", text: "README.md updated with new API documentation", time: "5 min ago", color: "#10b981" },
  { icon: "lucide:file-code", text: "New file 'architecture-guide.md' created", time: "22 min ago", color: "#3b82f6" },
  { icon: "lucide:share-2", text: "Contributing.md shared with Engineering team", time: "1 hr ago", color: "#8b5cf6" },
  { icon: "lucide:pencil", text: "CHANGELOG.md updated for v2.4.0 release", time: "3 hr ago", color: "#10b981" },
  { icon: "lucide:folder", text: "New folder 'api-docs' created in docs section", time: "5 hr ago", color: "#f59e0b" },
  { icon: "lucide:trash-2", text: "Draft file 'notes-temp.md' moved to archive", time: "8 hr ago", color: "#6b7280" },
];

const actions = [
  { icon: "lucide:plus", label: "New File" },
  { icon: "lucide:file-code", label: "Open Editor" },
  { icon: "lucide:folder", label: "New Folder" },
  { icon: "lucide:upload", label: "Import" },
];

export default function MarkHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Mark-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Manage your markdown files, recent edits, and shared documents.</p>
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
