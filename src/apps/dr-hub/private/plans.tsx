import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "plan", label: "Plan" },
  { key: "type", label: "Type" },
  { key: "rpo", label: "RPO" },
  { key: "rto", label: "RTO" },
  { key: "systems", label: "Systems" },
  { key: "lastTested", label: "Last Tested" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Draft: "#6b7280", Testing: "#3b82f6", Expired: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { plan: "West-Coast-Failover", type: "Active-Active", rpo: "0 (sync)", rto: "5 min", systems: 12, lastTested: "2026-04-14", status: "Active" },
  { plan: "East-Coast-Backup", type: "Active-Passive", rpo: "15 min", rto: "30 min", systems: 8, lastTested: "2026-04-10", status: "Active" },
  { plan: "DB-Cluster-DR", type: "Active-Active", rpo: "5 min", rto: "10 min", systems: 4, lastTested: "2026-04-16", status: "Active" },
  { plan: "App-Services-DR", type: "Warm Standby", rpo: "1 hr", rto: "45 min", systems: 16, lastTested: "2026-04-08", status: "Active" },
  { plan: "Core-Network-DR", type: "Active-Passive", rpo: "0 (sync)", rto: "2 min", systems: 6, lastTested: "2026-04-12", status: "Active" },
  { plan: "Identity-Provider-DR", type: "Active-Active", rpo: "0 (sync)", rto: "1 min", systems: 3, lastTested: "2026-04-15", status: "Active" },
  { plan: "Email-Services-DR", type: "Warm Standby", rpo: "30 min", rto: "1 hr", systems: 5, lastTested: "2026-03-28", status: "Testing" },
  { plan: "Legacy-Apps-DR", type: "Cold Standby", rpo: "24 hr", rto: "4 hr", systems: 10, lastTested: "2026-02-15", status: "Draft" },
];

export default function PlansPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="DR Plans" description="Manage disaster recovery plans and SLA targets." icon="lucide:scroll-text" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search DR plans..." />
    </div>
  );
}
