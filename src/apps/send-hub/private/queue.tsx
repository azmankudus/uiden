import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "transfer", label: "Transfer" },
  { key: "schedule", label: "Schedule" },
  { key: "priority", label: "Priority" },
  { key: "size", label: "Size" },
  { key: "target", label: "Target" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Queued: "#f59e0b", Scheduled: "#3b82f6", Active: "#10b981", Paused: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { transfer: "batch-payments-0417.csv", schedule: "2026-04-17 18:00", priority: "High", size: "45MB", target: "bank-gateway.sftp.com", status: "Queued" },
  { transfer: "nightly-sync-all", schedule: "2026-04-18 00:00", priority: "Normal", size: "2.3GB", target: "data-lake.internal.io", status: "Scheduled" },
  { transfer: "partner-feed-update.xml", schedule: "2026-04-17 20:00", priority: "Normal", size: "120MB", target: "ftp.partner.io", status: "Scheduled" },
  { transfer: "log-shipping-hourly", schedule: "2026-04-17 17:00", priority: "Low", size: "500MB", target: "siem.internal.io", status: "Active" },
  { transfer: "cert-renewal-bundle.tar", schedule: "2026-04-18 03:00", priority: "High", size: "1.8MB", target: "vault.internal.io", status: "Scheduled" },
  { transfer: "legacy-migration-part6.csv", schedule: "2026-04-18 01:00", priority: "Low", size: "2.1GB", target: "data-lake.internal.io", status: "Paused" },
  { transfer: "compliance-daily-pack", schedule: "2026-04-17 23:00", priority: "High", size: "340MB", target: "compliance-archive.internal", status: "Queued" },
  { transfer: "dev-artifacts-v4.0.zip", schedule: "2026-04-18 06:00", priority: "Normal", size: "890MB", target: "cdn-upload.example.com", status: "Scheduled" },
];

export default function QueuePage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Queue" description="Scheduled and pending file transfer queue." icon="lucide:list-ordered" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search queue..." />
    </div>
  );
}
