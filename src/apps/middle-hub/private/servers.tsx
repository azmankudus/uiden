import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const servers = [
  { name: "prod-tc-01", type: "Tomcat", status: "Running", heap: "64%", rpm: "320", uptime: "45d 12h" },
  { name: "prod-tc-02", type: "Tomcat", status: "Running", heap: "71%", rpm: "285", uptime: "45d 12h" },
  { name: "prod-wl-01", type: "WebLogic", status: "Running", heap: "78%", rpm: "540", uptime: "30d 8h" },
  { name: "prod-wl-02", type: "WebLogic", status: "Running", heap: "82%", rpm: "510", uptime: "30d 8h" },
  { name: "stg-jb-01", type: "JBoss", status: "Running", heap: "56%", rpm: "120", uptime: "15d 3h" },
  { name: "stg-jb-02", type: "JBoss", status: "Stopped", heap: "0%", rpm: "0", uptime: "—" },
  { name: "prod-gf-01", type: "GlassFish", status: "Running", heap: "69%", rpm: "195", uptime: "60d 1h" },
  { name: "dev-jt-01", type: "Jetty", status: "Running", heap: "45%", rpm: "88", uptime: "12d 6h" },
  { name: "prod-tc-03", type: "Tomcat", status: "Running", heap: "73%", rpm: "310", uptime: "22d 9h" },
  { name: "stg-wl-01", type: "WebLogic", status: "Failed", heap: "91%", rpm: "0", uptime: "0d 0h" },
];

const statusColor: Record<string, string> = {
  Running: "#10b981",
  Stopped: "#6b7280",
  Failed: "#ef4444",
};

const columns = [
  { key: "name", label: "Server Name" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status", render: (_v: string, row: any) => <StatusBadge text={row.status} color={statusColor[row.status] || "#6b7280"} /> },
  { key: "heap", label: "JVM Heap" },
  { key: "rpm", label: "Requests/min" },
  { key: "uptime", label: "Uptime" },
];

export default function MiddleHubServers() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title="Servers"
        description="Manage your Java application servers."
        icon="lucide:server"
        iconColor="#06d6a0"
      />

      <div class="max-w-6xl mx-auto px-0">
        <DataTable columns={columns} data={servers} searchPlaceholder="Search servers..." />
      </div>
    </div>
  );
}
