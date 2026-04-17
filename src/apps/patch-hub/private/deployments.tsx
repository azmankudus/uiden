import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "deployment", label: "Deployment" },
  { key: "patch", label: "Patch" },
  { key: "targetGroup", label: "Target Group" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Running: "#3b82f6", Completed: "#10b981", Failed: "#ef4444", Scheduled: "#f59e0b", Rolling: "#8b5cf6" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "started", label: "Started" },
  { key: "completed", label: "Completed" },
];

const data = [
  { deployment: "DEP-0392", patch: "PATCH-2847", targetGroup: "Web Servers", status: "Completed", started: "2026-04-15 14:00", completed: "2026-04-15 14:42" },
  { deployment: "DEP-0391", patch: "PATCH-2845", targetGroup: "Load Balancers", status: "Running", started: "2026-04-15 15:30", completed: "—" },
  { deployment: "DEP-0390", patch: "PATCH-2842", targetGroup: "Containers", status: "Failed", started: "2026-04-15 10:00", completed: "2026-04-15 10:15" },
  { deployment: "DEP-0389", patch: "PATCH-2844", targetGroup: "Databases", status: "Completed", started: "2026-04-14 22:00", completed: "2026-04-14 22:18" },
  { deployment: "DEP-0388", patch: "PATCH-2840", targetGroup: "All Servers", status: "Scheduled", started: "2026-04-16 02:00", completed: "—" },
  { deployment: "DEP-0387", patch: "PATCH-2841", targetGroup: "Cache Layer", status: "Rolling", started: "2026-04-15 16:00", completed: "—" },
  { deployment: "DEP-0386", patch: "PATCH-2843", targetGroup: "API Servers", status: "Completed", started: "2026-04-13 03:00", completed: "2026-04-13 03:55" },
];

export default function DeploymentsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Deployments" description="Track patch deployment progress across target groups." icon="lucide:rocket" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search deployments..." />
    </div>
  );
}
