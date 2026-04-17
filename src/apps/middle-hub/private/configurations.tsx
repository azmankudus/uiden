import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const configs = [
  { name: "prod-tc-jvm.opts", server: "prod-tc-01", type: "JVM", modifiedBy: "admin@corp.com", updatedAt: "2026-04-17 06:00" },
  { name: "prod-wl-ds.xml", server: "prod-wl-01", type: "DataSource", modifiedBy: "dba@corp.com", updatedAt: "2026-04-16 22:30" },
  { name: "stg-jb-thread.xml", server: "stg-jb-01", type: "Thread Pool", modifiedBy: "devops@corp.com", updatedAt: "2026-04-16 14:15" },
  { name: "prod-gf-jvm.opts", server: "prod-gf-01", type: "JVM", modifiedBy: "admin@corp.com", updatedAt: "2026-04-15 10:00" },
  { name: "prod-tc-ds.xml", server: "prod-tc-02", type: "DataSource", modifiedBy: "dba@corp.com", updatedAt: "2026-04-15 08:45" },
  { name: "prod-wl-thread.xml", server: "prod-wl-02", type: "Thread Pool", modifiedBy: "devops@corp.com", updatedAt: "2026-04-14 16:20" },
  { name: "dev-jt-jvm.opts", server: "dev-jt-01", type: "JVM", modifiedBy: "dev@corp.com", updatedAt: "2026-04-14 11:00" },
  { name: "stg-wl-ds.xml", server: "stg-wl-01", type: "DataSource", modifiedBy: "dba@corp.com", updatedAt: "2026-04-13 09:30" },
];

const typeColor: Record<string, string> = {
  JVM: "#8b5cf6",
  DataSource: "#3b82f6",
  "Thread Pool": "#f59e0b",
};

const columns = [
  { key: "name", label: "Config Name" },
  { key: "server", label: "Server" },
  { key: "type", label: "Type", render: (_v: string, row: any) => <StatusBadge text={row.type} color={typeColor[row.type] || "#6b7280"} /> },
  { key: "modifiedBy", label: "Modified By" },
  { key: "updatedAt", label: "Last Updated" },
];

export default function MiddleHubConfigurations() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title="Configurations"
        description="Server configuration management."
        icon="lucide:settings"
        iconColor="#f59e0b"
      />

      <div class="max-w-6xl mx-auto px-0">
        <DataTable columns={columns} data={configs} searchPlaceholder="Search configurations..." />
      </div>
    </div>
  );
}
