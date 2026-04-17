import { createSignal, createMemo } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import FilterTabs from "~/shell/components/ui/FilterTabs";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const TABS = ["All", "Completed", "Running", "Failed"];

const columns = [
  { key: "job", label: "Job" },
  { key: "source", label: "Source" },
  { key: "type", label: "Type" },
  { key: "size", label: "Size" },
  { key: "duration", label: "Duration" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Completed: "#10b981", Running: "#3b82f6", Failed: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "lastRun", label: "Last Run" },
];

const data = [
  { job: "prod-db-daily", source: "db-master-01", type: "Incremental", size: "48GB", duration: "12 min", status: "Completed", lastRun: "2026-04-17 06:00" },
  { job: "web-servers-full", source: "web-prod-[01-04]", type: "Full", size: "32GB", duration: "45 min", status: "Completed", lastRun: "2026-04-17 02:00" },
  { job: "api-gateway-incr", source: "api-gateway-01", type: "Incremental", size: "8.2GB", duration: "4 min", status: "Completed", lastRun: "2026-04-17 06:30" },
  { job: "legacy-fs-full", source: "legacy-fileserver-02", type: "Full", size: "1.2TB", duration: "3 hr 20 min", status: "Failed", lastRun: "2026-04-17 01:00" },
  { job: "build-artifacts", source: "build-runner-03", type: "Incremental", size: "15GB", duration: "8 min", status: "Completed", lastRun: "2026-04-17 07:00" },
  { job: "mail-archive", source: "mail-relay-01", type: "Incremental", size: "4.5GB", duration: "3 min", status: "Completed", lastRun: "2026-04-17 05:00" },
  { job: "config-backup", source: "all-servers", type: "Full", size: "2.1GB", duration: "6 min", status: "Running", lastRun: "2026-04-17 08:00" },
  { job: "staging-snap", source: "staging-app-[01-05]", type: "Snapshot", size: "28GB", duration: "2 min", status: "Completed", lastRun: "2026-04-16 22:00" },
  { job: "log-archive", source: "log-cluster", type: "Incremental", size: "120GB", duration: "35 min", status: "Completed", lastRun: "2026-04-17 04:00" },
  { job: "cert-store-sync", source: "cert-hub-storage", type: "Mirror", size: "0.5GB", duration: "1 min", status: "Completed", lastRun: "2026-04-17 08:30" },
];

export default function BackupsPage() {
  const [activeTab, setActiveTab] = createSignal("All");
  const filtered = createMemo(() => {
    const tab = activeTab();
    if (tab === "All") return data;
    return data.filter((row) => row.status === tab);
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Backups" description="View and monitor backup jobs across all systems." icon="lucide:hard-drive" iconColor="#3b82f6" />
      <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search backups..." />
    </div>
  );
}
