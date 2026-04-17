import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "schedule", label: "Schedule" },
  { key: "job", label: "Job" },
  { key: "frequency", label: "Frequency" },
  { key: "nextRun", label: "Next Run" },
  { key: "lastRun", label: "Last Run" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Paused: "#f59e0b", Disabled: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { schedule: "SCH-001", job: "db-backup-full.sh", frequency: "Every 6 hours", nextRun: "2026-04-17 18:00", lastRun: "2026-04-17 12:00", status: "Active" },
  { schedule: "SCH-002", job: "cleanup-docker-images.py", frequency: "Daily at 03:00", nextRun: "2026-04-18 03:00", lastRun: "2026-04-17 03:00", status: "Active" },
  { schedule: "SCH-003", job: "ansible-patch-critical.yml", frequency: "Weekly Sun 02:00", nextRun: "2026-04-19 02:00", lastRun: "2026-04-12 02:00", status: "Active" },
  { schedule: "SCH-004", job: "log-rotate-and-archive.sh", frequency: "Daily at 06:00", nextRun: "2026-04-18 06:00", lastRun: "2026-04-17 06:00", status: "Active" },
  { schedule: "SCH-005", job: "sync-ldap-groups.ps1", frequency: "Every 4 hours", nextRun: "2026-04-17 16:00", lastRun: "2026-04-17 12:00", status: "Active" },
  { schedule: "SCH-006", job: "cert-renew-letsencrypt.sh", frequency: "Monthly 1st 00:00", nextRun: "2026-05-01 00:00", lastRun: "2026-04-01 00:00", status: "Active" },
  { schedule: "SCH-007", job: "terraform-drift-check.tf", frequency: "Daily at 08:00", nextRun: "2026-04-18 08:00", lastRun: "2026-04-17 08:00", status: "Paused" },
  { schedule: "SCH-008", job: "legacy-migration-v1.py", frequency: "One-time", nextRun: "—", lastRun: "2026-03-28 10:00", status: "Disabled" },
];

export default function SchedulesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Schedules" description="Job scheduling and cron management." icon="lucide:clock" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search schedules..." />
    </div>
  );
}
