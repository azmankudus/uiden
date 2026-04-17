import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "machine", label: "Machine" },
  { key: "os", label: "OS" },
  { key: "ip", label: "IP Address" },
  { key: "protocol", label: "Protocol" },
  { key: "lastAccess", label: "Last Access" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Online: "#10b981", Offline: "#6b7280", Maintenance: "#f59e0b" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { machine: "PROD-SRV-01", os: "Ubuntu 22.04", ip: "10.0.1.10", protocol: "RDP, SSH", lastAccess: "2 min ago", status: "Online" },
  { machine: "PROD-SRV-02", os: "RHEL 9", ip: "10.0.1.11", protocol: "SSH", lastAccess: "15 min ago", status: "Online" },
  { machine: "DB-MASTER", os: "Ubuntu 22.04", ip: "10.0.2.5", protocol: "SSH", lastAccess: "45 min ago", status: "Online" },
  { machine: "WEB-03", os: "Debian 12", ip: "10.0.3.20", protocol: "SSH, VNC", lastAccess: "2 hr ago", status: "Online" },
  { machine: "WEB-05", os: "Windows Server 2022", ip: "10.0.3.22", protocol: "RDP", lastAccess: "1 day ago", status: "Maintenance" },
  { machine: "STAGING-03", os: "Ubuntu 24.04", ip: "10.0.4.15", protocol: "SSH", lastAccess: "1 hr ago", status: "Online" },
  { machine: "JUMP-01", os: "Alpine 3.19", ip: "10.0.0.5", protocol: "SSH", lastAccess: "12 min ago", status: "Online" },
  { machine: "DEV-04", os: "macOS Sonoma", ip: "192.168.1.44", protocol: "VNC, SSH", lastAccess: "3 days ago", status: "Offline" },
  { machine: "DC-02", os: "Windows Server 2022", ip: "10.0.0.12", protocol: "RDP", lastAccess: "1 hr ago", status: "Online" },
  { machine: "BACKUP-01", os: "TrueNAS SCALE", ip: "10.0.5.2", protocol: "SSH", lastAccess: "5 days ago", status: "Offline" },
];

export default function MachinesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Machines" description="Manage registered machines for remote access." icon="lucide:server" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search machines..." />
    </div>
  );
}
