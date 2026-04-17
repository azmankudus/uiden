import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "test", label: "Test" },
  { key: "plan", label: "Plan" },
  { key: "type", label: "Type" },
  { key: "date", label: "Date" },
  { key: "duration", label: "Duration" },
  { key: "result", label: "Result", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Passed: "#10b981", Failed: "#ef4444", Warning: "#f59e0b" };
    return <StatusBadge text={row.result} color={colors[row.result] || "#6b7280"} />;
  }},
  { key: "notes", label: "Notes" },
];

const data = [
  { test: "T-2026-0041", plan: "West-Coast-Failover", type: "Full Failover", date: "2026-04-14", duration: "7 min 22s", result: "Passed", notes: "All services restored within RTO" },
  { test: "T-2026-0040", plan: "DB-Cluster-DR", type: "Primary Switch", date: "2026-04-16", duration: "2 min 48s", result: "Passed", notes: "Zero data loss confirmed" },
  { test: "T-2026-0039", plan: "East-Coast-Backup", type: "Restore Test", date: "2026-04-10", duration: "22 min 15s", result: "Passed", notes: "All 8 systems restored" },
  { test: "T-2026-0038", plan: "App-Services-DR", type: "Partial Failover", date: "2026-04-08", duration: "14 min 03s", result: "Failed", notes: "Step 4 timeout — DNS propagation" },
  { test: "T-2026-0037", plan: "Core-Network-DR", type: "Network Switchover", date: "2026-04-12", duration: "1 min 55s", result: "Passed", notes: "Sub-second failover achieved" },
  { test: "T-2026-0036", plan: "Identity-Provider-DR", type: "Full Failover", date: "2026-04-15", duration: "52s", result: "Passed", notes: "Auth restored in under 1 min" },
  { test: "T-2026-0035", plan: "Email-Services-DR", type: "Warm Standby Check", date: "2026-03-28", duration: "19 min 40s", result: "Warning", notes: "Queue sync delayed by 3 min" },
  { test: "T-2026-0034", plan: "West-Coast-Failover", type: "Tabletop", date: "2026-04-01", duration: "45 min", result: "Passed", notes: "Team walked through scenario" },
];

export default function TestsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="DR Tests" description="Disaster recovery test execution history and results." icon="lucide:flask-conical" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search tests..." />
    </div>
  );
}
