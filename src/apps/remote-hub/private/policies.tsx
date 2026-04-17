import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "policy", label: "Policy" },
  { key: "protocol", label: "Protocol" },
  { key: "maxDuration", label: "Max Duration" },
  { key: "recording", label: "Recording", render: (v: boolean) => (
    <span class={`text-xs font-medium ${v ? "text-green-400" : "text-text-muted"}`}>{v ? "Enabled" : "Disabled"}</span>
  )},
  { key: "approval", label: "Approval" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Disabled: "#6b7280", Draft: "#f59e0b" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { policy: "Production SSH Access", protocol: "SSH", maxDuration: "4 hours", recording: true, approval: "Manager + Security", status: "Active" },
  { policy: "Production RDP Access", protocol: "RDP", maxDuration: "8 hours", recording: true, approval: "Manager", status: "Active" },
  { policy: "Staging SSH Access", protocol: "SSH", maxDuration: "12 hours", recording: true, approval: "Auto-approved", status: "Active" },
  { policy: "Database Direct Access", protocol: "SSH", maxDuration: "2 hours", recording: true, approval: "DBA Lead", status: "Active" },
  { policy: "VNC Shared Sessions", protocol: "VNC", maxDuration: "4 hours", recording: false, approval: "Manager", status: "Active" },
  { policy: "Emergency Break-Glass", protocol: "All", maxDuration: "1 hour", recording: true, approval: "Post-approval", status: "Active" },
];

export default function RemotePoliciesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Policies" description="Configure remote access policies, approvals, and restrictions." icon="lucide:shield" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search policies..." />
    </div>
  );
}
