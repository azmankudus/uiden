import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const hosts = [
  { domain: "api.example.com", server: "proxy-west-01", ssl: "Valid", status: "Active", traffic: "2.4K rps", backend: "prod-tc-01:8080" },
  { domain: "www.example.com", server: "proxy-west-02", ssl: "Valid", status: "Active", traffic: "1.8K rps", backend: "web-east-01:443" },
  { domain: "admin.example.com", server: "web-east-01", ssl: "Valid", status: "Active", traffic: "320 rps", backend: "prod-wl-01:7001" },
  { domain: "docs.example.com", server: "edge-01", ssl: "Valid", status: "Active", traffic: "540 rps", backend: "web-east-02:443" },
  { domain: "staging.example.com", server: "proxy-stg-01", ssl: "Expiring", status: "Active", traffic: "120 rps", backend: "stg-jb-01:8080" },
  { domain: "metrics.example.com", server: "lb-prod-01", ssl: "Valid", status: "Active", traffic: "890 rps", backend: "mesh-01:9901" },
  { domain: "cdn.example.com", server: "proxy-west-01", ssl: "Valid", status: "Active", traffic: "5.6K rps", backend: "edge-01:443" },
  { domain: "mail.example.com", server: "web-east-02", ssl: "None", status: "Inactive", traffic: "0 rps", backend: "—" },
  { domain: "dev.example.com", server: "proxy-stg-01", ssl: "Expiring", status: "Active", traffic: "85 rps", backend: "dev-jt-01:8080" },
  { domain: "legacy.example.com", server: "ingress-01", ssl: "Expired", status: "Inactive", traffic: "0 rps", backend: "—" },
];

const sslColor: Record<string, string> = {
  Valid: "#10b981",
  Expiring: "#f59e0b",
  Expired: "#ef4444",
  None: "#6b7280",
};

const statusColor: Record<string, string> = {
  Active: "#10b981",
  Inactive: "#6b7280",
};

const columns = [
  { key: "domain", label: "Domain" },
  { key: "server", label: "Server" },
  { key: "ssl", label: "SSL", render: (_v: string, row: any) => <StatusBadge text={row.ssl} color={sslColor[row.ssl] || "#6b7280"} /> },
  { key: "status", label: "Status", render: (_v: string, row: any) => <StatusBadge text={row.status} color={statusColor[row.status] || "#6b7280"} /> },
  { key: "traffic", label: "Traffic" },
  { key: "backend", label: "Backend" },
];

export default function WebHubVirtualHosts() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title="Virtual Hosts"
        description="Domain and virtual host configuration."
        icon="lucide:globe"
        iconColor="#3b82f6"
      />

      <div class="max-w-6xl mx-auto px-0">
        <DataTable columns={columns} data={hosts} searchPlaceholder="Search virtual hosts..." />
      </div>
    </div>
  );
}
