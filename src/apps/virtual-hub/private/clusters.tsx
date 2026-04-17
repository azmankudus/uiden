import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "cluster", label: "Cluster" },
  { key: "hypervisor", label: "Hypervisor" },
  { key: "hosts", label: "Hosts" },
  { key: "vms", label: "VMs" },
  { key: "cpu", label: "CPU" },
  { key: "memory", label: "Memory" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Healthy: "#10b981", Warning: "#f59e0b", Critical: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { cluster: "cluster-west-1", hypervisor: "Proxmox 8.2", hosts: 4, vms: 38, cpu: "62%", memory: "71%", status: "Healthy" },
  { cluster: "cluster-west-2", hypervisor: "Proxmox 8.2", hosts: 3, vms: 24, cpu: "45%", memory: "58%", status: "Healthy" },
  { cluster: "cluster-east-1", hypervisor: "VMware 8.0", hosts: 4, vms: 42, cpu: "78%", memory: "82%", status: "Warning" },
  { cluster: "cluster-east-2", hypervisor: "XCP-NG 8.3", hosts: 2, vms: 16, cpu: "34%", memory: "45%", status: "Healthy" },
  { cluster: "cluster-dmz-1", hypervisor: "Proxmox 8.2", hosts: 2, vms: 12, cpu: "55%", memory: "63%", status: "Healthy" },
  { cluster: "cluster-dr-1", hypervisor: "VMware 8.0", hosts: 3, vms: 10, cpu: "12%", memory: "28%", status: "Healthy" },
];

export default function ClustersPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Clusters" description="Manage hypervisor clusters and resource allocation." icon="lucide:boxes" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search clusters..." />
    </div>
  );
}
