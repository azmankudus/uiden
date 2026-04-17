import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "package", label: "Package" },
  { key: "current", label: "Current" },
  { key: "available", label: "Available" },
  { key: "severity", label: "Severity", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308", Low: "#3b82f6" };
    return <StatusBadge text={row.severity} color={colors[row.severity] || "#6b7280"} />;
  }},
  { key: "systems", label: "Systems" },
  { key: "action", label: "Action", render: (v: string) => (
    <span class={`text-xs font-medium ${v === "Update" ? "text-brand" : v === "Schedule" ? "text-yellow-400" : "text-text-muted"}`}>{v}</span>
  )},
];

const data = [
  { package: "openssl", current: "3.2.1", available: "3.3.0", severity: "Critical", systems: "48", action: "Update" },
  { package: "linux-kernel", current: "6.8.4", available: "6.8.7", severity: "Critical", systems: "48", action: "Update" },
  { package: "nginx", current: "1.27.3", available: "1.27.4", severity: "High", systems: "24", action: "Update" },
  { package: "nodejs", current: "22.0.0", available: "22.1.0", severity: "High", systems: "16", action: "Schedule" },
  { package: "haproxy", current: "2.6.12", available: "2.8.5", severity: "Medium", systems: "6", action: "Schedule" },
  { package: "elasticsearch", current: "7.17.18", available: "8.13.2", severity: "Medium", systems: "5", action: "Schedule" },
  { package: "redis", current: "7.2.3", available: "7.2.4", severity: "Low", systems: "12", action: "Update" },
  { package: "docker-engine", current: "26.0.2", available: "26.1.0", severity: "Low", systems: "40", action: "Update" },
  { package: "python3", current: "3.12.2", available: "3.12.3", severity: "Low", systems: "34", action: "Update" },
  { package: "postgresql-16", current: "16.2", available: "16.3", severity: "Medium", systems: "8", action: "Schedule" },
];

export default function UpdatesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Updates" description="Available software updates and patches." icon="lucide:refresh-cw" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search updates..." />
    </div>
  );
}
