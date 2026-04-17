import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "name", label: "Script Name" },
  { key: "language", label: "Language", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Bash: "#10b981", PowerShell: "#3b82f6", Python: "#f59e0b", YAML: "#ef4444", "HCL/Terraform": "#8b5cf6" };
    return <StatusBadge text={row.language} color={colors[row.language] || "#6b7280"} />;
  }},
  { key: "createdBy", label: "Created By" },
  { key: "lastModified", label: "Last Modified" },
  { key: "runs", label: "Runs" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Draft: "#f59e0b", Deprecated: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { name: "deploy-web-cluster.sh", language: "Bash", createdBy: "ops-team", lastModified: "2026-04-17", runs: 342, status: "Active" },
  { name: "ansible-patch-critical.yml", language: "YAML", createdBy: "security-team", lastModified: "2026-04-16", runs: 89, status: "Active" },
  { name: "terraform-apply-prod.tf", language: "HCL/Terraform", createdBy: "infra-team", lastModified: "2026-04-15", runs: 156, status: "Active" },
  { name: "db-backup-full.sh", language: "Bash", createdBy: "dba-team", lastModified: "2026-04-14", runs: 730, status: "Active" },
  { name: "cleanup-docker-images.py", language: "Python", createdBy: "devops-bot", lastModified: "2026-04-13", runs: 445, status: "Active" },
  { name: "sync-ldap-groups.ps1", language: "PowerShell", createdBy: "idm-team", lastModified: "2026-04-12", runs: 201, status: "Active" },
  { name: "nginx-reload-config.sh", language: "Bash", createdBy: "web-team", lastModified: "2026-04-10", runs: 78, status: "Active" },
  { name: "legacy-migration-v1.py", language: "Python", createdBy: "archive-team", lastModified: "2026-03-28", runs: 12, status: "Deprecated" },
  { name: "k8s-rolling-update.yaml", language: "YAML", createdBy: "platform-team", lastModified: "2026-04-08", runs: 67, status: "Active" },
  { name: "disk-cleanup-draft.sh", language: "Bash", createdBy: "ops-team", lastModified: "2026-04-17", runs: 0, status: "Draft" },
];

export default function ScriptsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Scripts" description="Script library and management." icon="lucide:file-code" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search scripts..." />
    </div>
  );
}
