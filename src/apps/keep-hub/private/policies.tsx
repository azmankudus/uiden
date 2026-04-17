import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "policy", label: "Policy" },
  { key: "schedule", label: "Schedule" },
  { key: "retention", label: "Retention" },
  { key: "encryption", label: "Encryption" },
  { key: "targets", label: "Targets" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Paused: "#f59e0b", Disabled: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { policy: "Production Daily", schedule: "Daily 06:00", retention: "30 days", encryption: "AES-256", targets: 14, status: "Active" },
  { policy: "Production Weekly Full", schedule: "Sun 02:00", retention: "90 days", encryption: "AES-256", targets: 14, status: "Active" },
  { policy: "Database Hourly", schedule: "Every 1 hr", retention: "7 days", encryption: "AES-256", targets: 4, status: "Active" },
  { policy: "Staging Snapshot", schedule: "Daily 22:00", retention: "14 days", encryption: "AES-128", targets: 5, status: "Active" },
  { policy: "Compliance Weekly", schedule: "Sat 00:00", retention: "1 year", encryption: "AES-256", targets: 22, status: "Active" },
  { policy: "Legacy Full", schedule: "Sun 01:00", retention: "60 days", encryption: "AES-256", targets: 3, status: "Paused" },
  { policy: "Config Backup", schedule: "Every 6 hr", retention: "30 days", encryption: "AES-128", targets: 48, status: "Active" },
  { policy: "Archive Tier", schedule: "Monthly 1st", retention: "3 years", encryption: "AES-256", targets: 8, status: "Disabled" },
];

export default function PoliciesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Backup Policies" description="Manage backup schedules, retention, and encryption policies." icon="lucide:shield" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search policies..." />
    </div>
  );
}
