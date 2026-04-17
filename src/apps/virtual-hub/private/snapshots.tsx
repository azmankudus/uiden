import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";

const columns = [
  { key: "snapshot", label: "Snapshot" },
  { key: "vm", label: "VM" },
  { key: "size", label: "Size" },
  { key: "created", label: "Created" },
  { key: "type", label: "Type" },
  { key: "expires", label: "Expires" },
];

const data = [
  { snapshot: "snap-daily-0417", vm: "web-prod-01", size: "2.1GB", created: "2026-04-17 06:00", type: "Scheduled", expires: "2026-04-24" },
  { snapshot: "snap-pre-patch", vm: "db-master-01", size: "18.4GB", created: "2026-04-16 22:15", type: "Manual", expires: "2026-05-16" },
  { snapshot: "snap-daily-0417", vm: "api-gateway-01", size: "1.2GB", created: "2026-04-17 06:00", type: "Scheduled", expires: "2026-04-24" },
  { snapshot: "snap-daily-0416", vm: "web-prod-01", size: "2.0GB", created: "2026-04-16 06:00", type: "Scheduled", expires: "2026-04-23" },
  { snapshot: "snap-pre-upgrade", vm: "build-runner-03", size: "8.7GB", created: "2026-04-15 14:30", type: "Manual", expires: "Never" },
  { snapshot: "snap-daily-0417", vm: "db-replica-02", size: "16.3GB", created: "2026-04-17 06:00", type: "Scheduled", expires: "2026-04-24" },
  { snapshot: "snap-weekly-0413", vm: "mail-relay-01", size: "0.8GB", created: "2026-04-13 00:00", type: "Scheduled", expires: "2026-04-27" },
  { snapshot: "snap-pre-cleanup", vm: "dev-sandbox-02", size: "5.4GB", created: "2026-04-14 10:45", type: "Manual", expires: "2026-05-14" },
];

export default function SnapshotsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Snapshots" description="VM snapshot management and retention." icon="lucide:camera" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search snapshots..." />
    </div>
  );
}
