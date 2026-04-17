import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "deployment", label: "Deployment" },
  { key: "environment", label: "Environment" },
  { key: "version", label: "Version" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Completed: "#10b981", "In Progress": "#3b82f6", Failed: "#ef4444", "Rolled Back": "#f59e0b" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "started", label: "Started" },
  { key: "duration", label: "Duration" },
];

const data = [
  { deployment: "DEP-2048", environment: "prod-api-gateway", version: "v3.2.1", status: "Completed", started: "10:45 AM", duration: "4m 32s" },
  { deployment: "DEP-2047", environment: "prod-auth-service", version: "v2.8.0", status: "Completed", started: "10:30 AM", duration: "6m 18s" },
  { deployment: "DEP-2046", environment: "prod-web-frontend", version: "v5.1.0", status: "In Progress", started: "11:02 AM", duration: "—" },
  { deployment: "DEP-2045", environment: "staging-api-gateway", version: "v3.2.1-rc1", status: "Completed", started: "09:15 AM", duration: "3m 45s" },
  { deployment: "DEP-2044", environment: "prod-reporting", version: "v1.4.3", status: "Failed", started: "08:50 AM", duration: "2m 10s" },
  { deployment: "DEP-2043", environment: "prod-notification", version: "v2.1.0", status: "Completed", started: "08:30 AM", duration: "5m 22s" },
  { deployment: "DEP-2042", environment: "staging-ml-model", version: "v0.9.5-beta", status: "Rolled Back", started: "07:45 AM", duration: "8m 05s" },
  { deployment: "DEP-2041", environment: "prod-scheduler", version: "v1.2.4", status: "Completed", started: "07:00 AM", duration: "3m 58s" },
];

export default function DeploymentsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Deployments" description="Track deployment history and status across environments." icon="lucide:rocket" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search deployments..." />
    </div>
  );
}
