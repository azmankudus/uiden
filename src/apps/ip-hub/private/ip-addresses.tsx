import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "ip", label: "IP Address" },
  { key: "subnet", label: "Subnet" },
  { key: "hostname", label: "Hostname" },
  { key: "mac", label: "MAC Address" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Reserved: "#3b82f6", Available: "#6b7280", Conflict: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { ip: "10.0.1.10", subnet: "10.0.1.0/24", hostname: "web-prod-01", mac: "AA:BB:CC:01:01:0A", type: "Static", status: "Active" },
  { ip: "10.0.1.11", subnet: "10.0.1.0/24", hostname: "web-prod-02", mac: "AA:BB:CC:01:01:0B", type: "Static", status: "Active" },
  { ip: "10.0.2.50", subnet: "10.0.2.0/24", hostname: "db-master-01", mac: "AA:BB:CC:02:02:32", type: "Static", status: "Active" },
  { ip: "10.0.2.51", subnet: "10.0.2.0/24", hostname: "db-replica-02", mac: "AA:BB:CC:02:02:33", type: "Static", status: "Active" },
  { ip: "10.0.3.100", subnet: "10.0.3.0/24", hostname: "api-gateway-01", mac: "AA:BB:CC:03:03:64", type: "Static", status: "Active" },
  { ip: "10.0.3.101", subnet: "10.0.3.0/24", hostname: "api-gateway-02", mac: "AA:BB:CC:03:03:65", type: "Static", status: "Reserved" },
  { ip: "10.0.5.200", subnet: "10.0.5.0/24", hostname: "build-runner-03", mac: "AA:BB:CC:05:05:C8", type: "Static", status: "Active" },
  { ip: "10.0.10.25", subnet: "10.0.10.0/24", hostname: "mail-relay-01", mac: "AA:BB:CC:0A:0A:19", type: "Static", status: "Active" },
  { ip: "10.0.42.105", subnet: "10.0.42.0/24", hostname: "build-agent-12", mac: "AA:BB:CC:2A:2A:69", type: "DHCP", status: "Active" },
  { ip: "10.0.15.201", subnet: "10.0.15.0/24", hostname: "legacy-printer", mac: "DD:EE:FF:0F:0F:C9", type: "Static", status: "Conflict" },
  { ip: "10.0.8.1", subnet: "10.0.8.0/24", hostname: "switch-core-01", mac: "AA:BB:CC:08:08:01", type: "Static", status: "Reserved" },
  { ip: "10.0.20.50", subnet: "10.0.20.0/24", hostname: "monitor-01", mac: "AA:BB:CC:14:14:32", type: "Static", status: "Active" },
];

export default function IPAddressesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="IP Addresses" description="Manage IP address inventory across all subnets." icon="lucide:network" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search IP addresses..." />
    </div>
  );
}
