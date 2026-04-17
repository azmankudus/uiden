import { createSignal, createMemo, For, Show } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import FilterTabs from "~/shell/components/ui/FilterTabs";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "session", label: "Session" },
  { key: "user", label: "User" },
  { key: "machine", label: "Machine" },
  { key: "protocol", label: "Protocol" },
  { key: "duration", label: "Duration" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Disconnected: "#f59e0b", Ended: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { session: "SES-1024", user: "Sarah Chen", machine: "PROD-SRV-01", protocol: "RDP", duration: "2h 34m", status: "Active" },
  { session: "SES-1023", user: "James Park", machine: "DB-MASTER", protocol: "SSH", duration: "45m", status: "Active" },
  { session: "SES-1022", user: "Alex Kim", machine: "STAGING-03", protocol: "SSH", duration: "1h 12m", status: "Active" },
  { session: "SES-1021", user: "Mike Johnson", machine: "WEB-05", protocol: "VNC", duration: "3h 05m", status: "Disconnected" },
  { session: "SES-1020", user: "Emma Wilson", machine: "PROD-SRV-01", protocol: "RDP", duration: "5h 18m", status: "Ended" },
  { session: "SES-1019", user: "Maria Garcia", machine: "JUMP-01", protocol: "SSH", duration: "12m", status: "Active" },
  { session: "SES-1018", user: "David Lee", machine: "WEB-03", protocol: "SSH", duration: "2h 45m", status: "Ended" },
  { session: "SES-1017", user: "Lisa Wang", machine: "DC-02", protocol: "RDP", duration: "1h 30m", status: "Disconnected" },
  { session: "SES-1016", user: "Nina Patel", machine: "PROD-SRV-02", protocol: "SSH", duration: "8h 12m", status: "Ended" },
  { session: "SES-1015", user: "Tom Brown", machine: "DEV-04", protocol: "VNC", duration: "22m", status: "Ended" },
];

export default function SessionsPage() {
  const [activeTab, setActiveTab] = createSignal("All");
  const tabs = ["All", "Active", "Disconnected", "Ended"];

  const filtered = createMemo(() => {
    const tab = activeTab();
    if (tab === "All") return data;
    return data.filter((d) => d.status === tab);
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Sessions" description="View and manage remote access sessions across all machines." icon="lucide:monitor" iconColor="#10b981" />
      <FilterTabs tabs={tabs} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search sessions..." />
    </div>
  );
}
