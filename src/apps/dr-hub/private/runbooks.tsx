import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "runbook", label: "Runbook" },
  { key: "plan", label: "Plan" },
  { key: "steps", label: "Steps" },
  { key: "estimatedTime", label: "Estimated Time" },
  { key: "lastExecuted", label: "Last Executed" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Ready: "#10b981", Running: "#3b82f6", Failed: "#ef4444", Draft: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { runbook: "Full-West-Failover", plan: "West-Coast-Failover", steps: 12, estimatedTime: "8 min", lastExecuted: "2026-04-14", status: "Ready" },
  { runbook: "DB-Primary-Switch", plan: "DB-Cluster-DR", steps: 6, estimatedTime: "3 min", lastExecuted: "2026-04-16", status: "Ready" },
  { runbook: "East-Restore-All", plan: "East-Coast-Backup", steps: 15, estimatedTime: "25 min", lastExecuted: "2026-04-10", status: "Ready" },
  { runbook: "App-Scale-Up-DR", plan: "App-Services-DR", steps: 8, estimatedTime: "12 min", lastExecuted: "2026-04-08", status: "Failed" },
  { runbook: "Core-Net-Switchover", plan: "Core-Network-DR", steps: 4, estimatedTime: "2 min", lastExecuted: "2026-04-12", status: "Ready" },
  { runbook: "IdP-Emergency-Activate", plan: "Identity-Provider-DR", steps: 5, estimatedTime: "1 min", lastExecuted: "2026-04-15", status: "Ready" },
  { runbook: "Email-Warm-Standby-Up", plan: "Email-Services-DR", steps: 10, estimatedTime: "18 min", lastExecuted: "2026-03-28", status: "Running" },
  { runbook: "Legacy-Cold-Restore", plan: "Legacy-Apps-DR", steps: 20, estimatedTime: "3 hr", lastExecuted: "Never", status: "Draft" },
];

export default function RunbooksPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Runbooks" description="Automated recovery runbooks for each DR plan." icon="lucide:book-open" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search runbooks..." />
    </div>
  );
}
