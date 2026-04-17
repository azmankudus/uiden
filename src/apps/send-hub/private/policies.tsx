import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "policy", label: "Policy" },
  { key: "protocol", label: "Protocol" },
  { key: "maxSize", label: "Max Size" },
  { key: "encryption", label: "Encryption" },
  { key: "retention", label: "Retention" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Disabled: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { policy: "Partner Outbound", protocol: "SFTP", maxSize: "2GB", encryption: "AES-256 + PGP", retention: "90 days", status: "Active" },
  { policy: "Internal Bulk", protocol: "SCP", maxSize: "10GB", encryption: "AES-256", retention: "30 days", status: "Active" },
  { policy: "Vendor Inbound", protocol: "SFTP", maxSize: "500MB", encryption: "TLS 1.3", retention: "60 days", status: "Active" },
  { policy: "Compliance Archive", protocol: "HTTPS", maxSize: "5GB", encryption: "AES-256 + PGP", retention: "3 years", status: "Active" },
  { policy: "Log Shipping", protocol: "HTTPS", maxSize: "1GB", encryption: "TLS 1.3", retention: "14 days", status: "Active" },
  { policy: "Legacy FTP Bridge", protocol: "FTP/S", maxSize: "100MB", encryption: "None", retention: "7 days", status: "Disabled" },
];

export default function PoliciesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Transfer Policies" description="Manage file transfer policies and security rules." icon="lucide:shield" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search policies..." />
    </div>
  );
}
