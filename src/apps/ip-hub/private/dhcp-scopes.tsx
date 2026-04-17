import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "scope", label: "Scope" },
  { key: "subnet", label: "Subnet" },
  { key: "range", label: "Range" },
  { key: "leases", label: "Leases" },
  { key: "available", label: "Available" },
  { key: "utilization", label: "Utilization", render: (_v: any, row: any) => {
    const pct = parseInt(row.utilization);
    const color = pct > 85 ? "#ef4444" : pct > 60 ? "#f59e0b" : "#10b981";
    return <StatusBadge text={row.utilization} color={color} />;
  }},
];

const data = [
  { scope: "floor-1-access", subnet: "10.0.42.0/24", range: "10.0.42.100-200", leases: 78, available: 22, utilization: "78%" },
  { scope: "floor-2-access", subnet: "10.0.43.0/24", range: "10.0.43.100-200", leases: 45, available: 55, utilization: "45%" },
  { scope: "floor-3-access", subnet: "10.0.44.0/24", range: "10.0.44.100-200", leases: 92, available: 8, utilization: "92%" },
  { scope: "wifi-corporate", subnet: "10.0.50.0/23", range: "10.0.50.10-10.0.51.250", leases: 312, available: 188, utilization: "62%" },
  { scope: "wifi-guest", subnet: "10.0.60.0/24", range: "10.0.60.10-250", leases: 34, available: 206, utilization: "14%" },
  { scope: "vpn-pool", subnet: "10.0.70.0/24", range: "10.0.70.10-200", leases: 18, available: 172, utilization: "9%" },
  { scope: "build-farm", subnet: "10.0.80.0/24", range: "10.0.80.50-150", leases: 67, available: 33, utilization: "67%" },
  { scope: "iot-devices", subnet: "10.0.90.0/24", range: "10.0.90.10-250", leases: 124, available: 116, utilization: "52%" },
];

export default function DHCPScopesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="DHCP Scopes" description="Manage DHCP scopes and monitor lease utilization." icon="lucide:server" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search DHCP scopes..." />
    </div>
  );
}
