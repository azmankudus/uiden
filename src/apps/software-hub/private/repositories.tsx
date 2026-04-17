import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "repository", label: "Repository" },
  { key: "type", label: "Type" },
  { key: "packages", label: "Packages" },
  { key: "lastSync", label: "Last Sync" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Synced: "#10b981", Syncing: "#3b82f6", Error: "#ef4444", Pending: "#f59e0b" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "mirror", label: "Mirror" },
];

const data = [
  { repository: "ubuntu-noble-main", type: "APT", packages: 4231, lastSync: "2026-04-17 12:00", status: "Synced", mirror: "asia-east1" },
  { repository: "debian-bookworm", type: "APT", packages: 3892, lastSync: "2026-04-17 10:00", status: "Synced", mirror: "eu-west1" },
  { repository: "pypi-mirror", type: "PyPI", packages: 1847, lastSync: "2026-04-17 14:30", status: "Syncing", mirror: "us-central1" },
  { repository: "npm-registry", type: "NPM", packages: 923, lastSync: "2026-04-17 08:00", status: "Synced", mirror: "asia-east1" },
  { repository: "docker-hub-proxy", type: "Docker", packages: 312, lastSync: "2026-04-16 22:00", status: "Synced", mirror: "us-central1" },
  { repository: "rpm-el9-appstream", type: "RPM", packages: 2156, lastSync: "2026-04-17 06:00", status: "Error", mirror: "eu-west1" },
  { repository: "golang-proxy", type: "Go", packages: 678, lastSync: "2026-04-17 11:00", status: "Synced", mirror: "asia-east1" },
  { repository: "maven-central", type: "Maven", packages: 456, lastSync: "2026-04-17 09:00", status: "Pending", mirror: "us-central1" },
];

export default function RepositoriesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Repositories" description="Package repositories and mirror management." icon="lucide:warehouse" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search repositories..." />
    </div>
  );
}
