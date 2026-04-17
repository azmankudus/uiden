import { createSignal, createMemo, For, Show } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";
import FilterTabs from "~/shell/components/ui/FilterTabs";

const columns = [
  { key: "job", label: "Job" },
  { key: "script", label: "Script" },
  { key: "trigger", label: "Trigger" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Running: "#3b82f6", Completed: "#10b981", Failed: "#ef4444", Queued: "#f59e0b", Cancelled: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "duration", label: "Duration" },
  { key: "lastRun", label: "Last Run" },
];

const allData = [
  { job: "JOB-4821", script: "deploy-web-cluster.sh", trigger: "Manual", status: "Running", duration: "2m 14s", lastRun: "2026-04-17 14:32" },
  { job: "JOB-4820", script: "ansible-patch-critical.yml", trigger: "Schedule", status: "Completed", duration: "8m 41s", lastRun: "2026-04-17 14:00" },
  { job: "JOB-4819", script: "terraform-apply-prod.tf", trigger: "Manual", status: "Completed", duration: "4m 32s", lastRun: "2026-04-17 13:15" },
  { job: "JOB-4818", script: "db-backup-full.sh", trigger: "Schedule", status: "Failed", duration: "12m 07s", lastRun: "2026-04-17 12:00" },
  { job: "JOB-4817", script: "cleanup-docker-images.py", trigger: "Schedule", status: "Completed", duration: "1m 58s", lastRun: "2026-04-17 11:00" },
  { job: "JOB-4816", script: "sync-ldap-groups.ps1", trigger: "Manual", status: "Completed", duration: "3m 12s", lastRun: "2026-04-17 10:30" },
  { job: "JOB-4815", script: "nginx-reload-config.sh", trigger: "Webhook", status: "Completed", duration: "0m 15s", lastRun: "2026-04-17 09:45" },
  { job: "JOB-4814", script: "cert-renew-letsencrypt.sh", trigger: "Schedule", status: "Queued", duration: "—", lastRun: "2026-04-17 08:00" },
  { job: "JOB-4813", script: "k8s-rolling-update.yaml", trigger: "Manual", status: "Cancelled", duration: "—", lastRun: "2026-04-17 07:20" },
  { job: "JOB-4812", script: "log-rotate-and-archive.sh", trigger: "Schedule", status: "Completed", duration: "6m 03s", lastRun: "2026-04-17 06:00" },
];

const TABS = ["All", "Running", "Completed", "Failed"];

export default function JobsPage() {
  const [activeTab, setActiveTab] = createSignal("All");

  const filtered = createMemo(() => {
    if (activeTab() === "All") return allData;
    return allData.filter((d) => d.status === activeTab());
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Jobs" description="View and manage automation job executions." icon="lucide:play" iconColor="#3b82f6" />
      <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search jobs..." />
    </div>
  );
}
