import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "environment", label: "Environment" },
  { key: "runtime", label: "Runtime" },
  { key: "version", label: "Version" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Running: "#10b981", Stopped: "#6b7280", Deploying: "#3b82f6", Error: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "memory", label: "Memory" },
  { key: "cpu", label: "CPU" },
  { key: "uptime", label: "Uptime" },
];

const data = [
  { environment: "prod-api-gateway", runtime: "Node.js", version: "20.11.0", status: "Running", memory: "4.2 GB", cpu: "62%", uptime: "45d 12h" },
  { environment: "prod-auth-service", runtime: "Java", version: "21.0.2", status: "Running", memory: "8.1 GB", cpu: "45%", uptime: "45d 12h" },
  { environment: "prod-data-pipeline", runtime: "Python", version: "3.12.2", status: "Running", memory: "6.5 GB", cpu: "78%", uptime: "30d 8h" },
  { environment: "staging-api-gateway", runtime: "Node.js", version: "20.11.0", status: "Running", memory: "2.1 GB", cpu: "15%", uptime: "12d 4h" },
  { environment: "prod-web-frontend", runtime: "Node.js", version: "18.19.0", status: "Deploying", memory: "1.8 GB", cpu: "0%", uptime: "—" },
  { environment: "prod-reporting", runtime: ".NET", version: "8.0.3", status: "Running", memory: "3.4 GB", cpu: "38%", uptime: "22d 16h" },
  { environment: "dev-sandbox-01", runtime: "Python", version: "3.11.8", status: "Stopped", memory: "0 GB", cpu: "0%", uptime: "—" },
  { environment: "prod-notification", runtime: "Java", version: "21.0.2", status: "Running", memory: "2.8 GB", cpu: "22%", uptime: "45d 12h" },
  { environment: "staging-ml-model", runtime: "Python", version: "3.12.2", status: "Error", memory: "12.1 GB", cpu: "95%", uptime: "0d 0h" },
  { environment: "prod-scheduler", runtime: "Java", version: "17.0.10", status: "Running", memory: "1.9 GB", cpu: "12%", uptime: "60d 2h" },
];

export default function EnvironmentsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Environments" description="Monitor and manage runtime environments across your infrastructure." icon="lucide:layers" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search environments..." />
    </div>
  );
}
