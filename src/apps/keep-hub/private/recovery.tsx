import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "recoveryId", label: "Recovery ID" },
  { key: "backup", label: "Backup" },
  { key: "target", label: "Target" },
  { key: "started", label: "Started" },
  { key: "duration", label: "Duration" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Completed: "#10b981", Running: "#3b82f6", Failed: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "dataRestored", label: "Data Restored" },
];

const data = [
  { recoveryId: "REC-2026-0089", backup: "prod-db-daily (04-17)", target: "db-master-01", started: "2026-04-17 07:15", duration: "8 min", status: "Completed", dataRestored: "48GB" },
  { recoveryId: "REC-2026-0088", backup: "web-servers-full (04-17)", target: "web-prod-07", started: "2026-04-17 06:00", duration: "12 min", status: "Completed", dataRestored: "8GB" },
  { recoveryId: "REC-2026-0087", backup: "api-gateway-incr (04-17)", target: "api-gateway-01", started: "2026-04-17 05:30", duration: "2 min", status: "Completed", dataRestored: "8.2GB" },
  { recoveryId: "REC-2026-0086", backup: "staging-snap (04-16)", target: "staging-app-05", started: "2026-04-17 04:00", duration: "3 min", status: "Completed", dataRestored: "5.6GB" },
  { recoveryId: "REC-2026-0085", backup: "config-backup (04-17)", target: "all-servers", started: "2026-04-17 08:05", duration: "—", status: "Running", dataRestored: "—" },
  { recoveryId: "REC-2026-0084", backup: "log-archive (04-16)", target: "log-cluster", started: "2026-04-16 23:00", duration: "18 min", status: "Completed", dataRestored: "120GB" },
  { recoveryId: "REC-2026-0083", backup: "mail-archive (04-16)", target: "mail-relay-01", started: "2026-04-16 22:00", duration: "2 min", status: "Failed", dataRestored: "0GB" },
  { recoveryId: "REC-2026-0082", backup: "legacy-fs-full (04-09)", target: "legacy-fileserver-02", started: "2026-04-15 10:00", duration: "2 hr 15 min", status: "Completed", dataRestored: "1.2TB" },
];

export default function RecoveryPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Recovery" description="Data recovery operations and history." icon="lucide:refresh-cw" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search recoveries..." />
    </div>
  );
}
