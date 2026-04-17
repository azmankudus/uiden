import { createSignal, createMemo, For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import FilterTabs from "~/shell/components/ui/FilterTabs";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const TABS = ["All", "Running", "Stopped", "Suspended"];

const columns = [
  { key: "name", label: "VM Name" },
  { key: "cluster", label: "Cluster" },
  { key: "os", label: "OS" },
  { key: "vcpu", label: "vCPU" },
  { key: "ram", label: "RAM" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Running: "#10b981", Stopped: "#6b7280", Suspended: "#f59e0b" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "uptime", label: "Uptime" },
];

const data = [
  { name: "web-prod-01", cluster: "cluster-west-1", os: "Ubuntu 22.04", vcpu: 4, ram: "8GB", status: "Running", uptime: "45d 12h" },
  { name: "web-prod-02", cluster: "cluster-west-1", os: "Ubuntu 22.04", vcpu: 4, ram: "8GB", status: "Running", uptime: "45d 12h" },
  { name: "db-master-01", cluster: "cluster-east-1", os: "Rocky 9", vcpu: 8, ram: "32GB", status: "Running", uptime: "90d 3h" },
  { name: "db-replica-02", cluster: "cluster-east-1", os: "Rocky 9", vcpu: 8, ram: "32GB", status: "Running", uptime: "90d 3h" },
  { name: "api-gateway-01", cluster: "cluster-west-2", os: "Debian 12", vcpu: 2, ram: "4GB", status: "Running", uptime: "30d 8h" },
  { name: "staging-app-05", cluster: "cluster-west-2", os: "Ubuntu 24.04", vcpu: 2, ram: "4GB", status: "Stopped", uptime: "—" },
  { name: "legacy-mon-01", cluster: "cluster-east-2", os: "CentOS 7", vcpu: 2, ram: "4GB", status: "Suspended", uptime: "—" },
  { name: "build-runner-03", cluster: "cluster-west-1", os: "Ubuntu 22.04", vcpu: 16, ram: "64GB", status: "Running", uptime: "12d 6h" },
  { name: "mail-relay-01", cluster: "cluster-east-2", os: "Debian 12", vcpu: 2, ram: "2GB", status: "Running", uptime: "120d 1h" },
  { name: "dev-sandbox-02", cluster: "cluster-west-2", os: "Ubuntu 24.04", vcpu: 4, ram: "16GB", status: "Stopped", uptime: "—" },
];

export default function VMsPage() {
  const [activeTab, setActiveTab] = createSignal("All");
  const filtered = createMemo(() => {
    const tab = activeTab();
    if (tab === "All") return data;
    return data.filter((row) => row.status === tab);
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Virtual Machines" description="View and manage all virtual machines across clusters." icon="lucide:monitor" iconColor="#10b981" />
      <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search VMs..." />
    </div>
  );
}
