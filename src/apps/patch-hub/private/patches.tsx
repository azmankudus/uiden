import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "patchId", label: "Patch ID" },
  { key: "title", label: "Title" },
  { key: "severity", label: "Severity", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308", Low: "#3b82f6" };
    return <StatusBadge text={row.severity} color={colors[row.severity] || "#6b7280"} />;
  }},
  { key: "systems", label: "Systems" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Pending: "#f59e0b", Deployed: "#10b981", Failed: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "released", label: "Released" },
];

const data = [
  { patchId: "PATCH-2847", title: "Linux Kernel Privilege Escalation Fix", severity: "Critical", systems: "12", status: "Deployed", released: "2026-04-15" },
  { patchId: "PATCH-2846", title: "OpenSSL Buffer Overflow Remediation", severity: "Critical", systems: "24", status: "Pending", released: "2026-04-14" },
  { patchId: "PATCH-2845", title: "Nginx Request Smuggling Patch", severity: "High", systems: "8", status: "Deployed", released: "2026-04-13" },
  { patchId: "PATCH-2844", title: "PostgreSQL Auth Bypass Fix", severity: "High", systems: "3", status: "Deployed", released: "2026-04-12" },
  { patchId: "PATCH-2843", title: "Node.js HTTP/2 DoS Mitigation", severity: "Medium", systems: "16", status: "Pending", released: "2026-04-11" },
  { patchId: "PATCH-2842", title: "Docker Container Escape Patch", severity: "Critical", systems: "40", status: "Failed", released: "2026-04-10" },
  { patchId: "PATCH-2841", title: "Redis Memory Corruption Fix", severity: "High", systems: "7", status: "Deployed", released: "2026-04-09" },
  { patchId: "PATCH-2840", title: "Ubuntu System Library Update", severity: "Low", systems: "52", status: "Deployed", released: "2026-04-08" },
  { patchId: "PATCH-2839", title: "Golang Crypto Module Update", severity: "Medium", systems: "20", status: "Pending", released: "2026-04-07" },
  { patchId: "PATCH-2838", title: "HAProxy Header Parsing Fix", severity: "Low", systems: "5", status: "Deployed", released: "2026-04-06" },
];

export default function PatchesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Patches" description="Browse and manage available patches." icon="lucide:package" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search patches..." />
    </div>
  );
}
