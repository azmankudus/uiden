import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "asset", label: "Asset" },
  { key: "type", label: "Type" },
  { key: "location", label: "Location" },
  { key: "assignedTo", label: "Assigned To" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Maintenance: "#f59e0b", Retired: "#6b7280", Reserved: "#3b82f6" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "warranty", label: "Warranty" },
];

const data = [
  { asset: "SRV-001", type: "Server", location: "DC-A Rack 12", assignedTo: "Platform Team", status: "Active", warranty: "2027-06-15" },
  { asset: "SRV-042", type: "Server", location: "DC-A Rack 14", assignedTo: "DevOps Team", status: "Active", warranty: "2027-09-20" },
  { asset: "WS-178", type: "Workstation", location: "Floor 3 Desk 12", assignedTo: "Sarah Chen", status: "Active", warranty: "2026-12-01" },
  { asset: "WS-195", type: "Workstation", location: "Floor 3 Desk 18", assignedTo: "Unassigned", status: "Reserved", warranty: "2027-03-15" },
  { asset: "SW-003", type: "Network Switch", location: "DC-B Rack 01", assignedTo: "Network Team", status: "Active", warranty: "2028-01-10" },
  { asset: "SRV-089", type: "Server", location: "DC-B Rack 05", assignedTo: "Database Team", status: "Maintenance", warranty: "2026-08-22" },
  { asset: "LP-234", type: "Laptop", location: "Remote", assignedTo: "Mike Johnson", status: "Active", warranty: "2027-05-30" },
  { asset: "SRV-103", type: "Server", location: "DC-A Rack 20", assignedTo: "Security Team", status: "Retired", warranty: "2025-11-01" },
  { asset: "PRN-012", type: "Printer", location: "Floor 2 Copy Room", assignedTo: "General Use", status: "Active", warranty: "2027-07-18" },
  { asset: "WS-210", type: "Workstation", location: "Floor 4 Desk 05", assignedTo: "Alex Kim", status: "Active", warranty: "2027-02-28" },
];

export default function AssetsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Assets" description="Track and manage all hardware assets across your organization." icon="lucide:hard-drive" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search assets..." />
    </div>
  );
}
