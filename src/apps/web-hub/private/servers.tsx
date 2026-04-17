import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const servers = [
  { name: "proxy-west-01", type: "Nginx", status: "Running", connections: "2,450", rps: "8.2K", uptime: "90d 4h" },
  { name: "proxy-west-02", type: "Nginx", status: "Running", connections: "2,180", rps: "7.9K", uptime: "90d 4h" },
  { name: "web-east-01", type: "Apache", status: "Running", connections: "1,830", rps: "5.4K", uptime: "45d 12h" },
  { name: "web-east-02", type: "Apache", status: "Running", connections: "1,760", rps: "5.1K", uptime: "45d 12h" },
  { name: "lb-prod-01", type: "HAProxy", status: "Running", connections: "4,200", rps: "12.3K", uptime: "60d 8h" },
  { name: "lb-prod-02", type: "HAProxy", status: "Running", connections: "4,050", rps: "11.8K", uptime: "60d 8h" },
  { name: "edge-01", type: "Caddy", status: "Running", connections: "920", rps: "3.1K", uptime: "30d 2h" },
  { name: "mesh-01", type: "Envoy", status: "Running", connections: "3,100", rps: "9.5K", uptime: "22d 15h" },
  { name: "ingress-01", type: "Traefik", status: "Stopped", connections: "0", rps: "0", uptime: "—" },
  { name: "proxy-stg-01", type: "Nginx", status: "Running", connections: "340", rps: "1.2K", uptime: "15d 6h" },
];

const statusColor: Record<string, string> = {
  Running: "#10b981",
  Stopped: "#6b7280",
  Failed: "#ef4444",
};

const columns = [
  { key: "name", label: "Server" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status", render: (_v: string, row: any) => <StatusBadge text={row.status} color={statusColor[row.status] || "#6b7280"} /> },
  { key: "connections", label: "Connections" },
  { key: "rps", label: "Requests/sec" },
  { key: "uptime", label: "Uptime" },
];

export default function WebHubServers() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title="Servers"
        description="Manage your web servers."
        icon="lucide:server"
        iconColor="#06d6a0"
      />

      <div class="max-w-6xl mx-auto px-0">
        <DataTable columns={columns} data={servers} searchPlaceholder="Search servers..." />
      </div>
    </div>
  );
}
