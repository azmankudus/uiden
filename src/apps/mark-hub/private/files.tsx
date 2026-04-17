import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "file", label: "File" },
  { key: "size", label: "Size" },
  { key: "modified", label: "Modified" },
  { key: "createdBy", label: "Created By" },
  { key: "shared", label: "Shared", render: (v: boolean) => (
    <span class={`text-xs font-medium ${v ? "text-green-400" : "text-text-muted"}`}>{v ? "Yes" : "No"}</span>
  )},
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Published: "#10b981", Draft: "#f59e0b", Archived: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { file: "README.md", size: "4.2 KB", modified: "5 min ago", createdBy: "Sarah Chen", shared: true, status: "Published" },
  { file: "CHANGELOG.md", size: "12.8 KB", modified: "3 hr ago", createdBy: "Alex Kim", shared: true, status: "Published" },
  { file: "CONTRIBUTING.md", size: "6.1 KB", modified: "1 day ago", createdBy: "Mike Johnson", shared: true, status: "Published" },
  { file: "architecture-guide.md", size: "18.5 KB", modified: "22 min ago", createdBy: "James Park", shared: false, status: "Draft" },
  { file: "api-documentation.md", size: "34.2 KB", modified: "2 days ago", createdBy: "Emma Wilson", shared: true, status: "Published" },
  { file: "onboarding.md", size: "8.7 KB", modified: "5 days ago", createdBy: "Lisa Wang", shared: true, status: "Published" },
  { file: "meeting-notes-template.md", size: "1.2 KB", modified: "1 week ago", createdBy: "Maria Garcia", shared: false, status: "Draft" },
  { file: "security-policy-v1.md", size: "15.3 KB", modified: "2 weeks ago", createdBy: "David Lee", shared: true, status: "Archived" },
  { file: "deployment-guide.md", size: "9.4 KB", modified: "4 days ago", createdBy: "Nina Patel", shared: true, status: "Published" },
  { file: "legacy-migration-notes.md", size: "22.1 KB", modified: "1 month ago", createdBy: "Tom Brown", shared: false, status: "Archived" },
];

export default function FilesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Files" description="Manage your markdown files and documents." icon="lucide:folder" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search files..." />
    </div>
  );
}
