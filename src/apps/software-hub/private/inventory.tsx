import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "software", label: "Software" },
  { key: "version", label: "Version" },
  { key: "category", label: "Category" },
  { key: "license", label: "License" },
  { key: "systems", label: "Systems" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Current: "#10b981", Outdated: "#f59e0b", "End of Life": "#ef4444", Beta: "#8b5cf6" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { software: "nginx", version: "1.27.4", category: "Web Server", license: "BSD-2", systems: "24", status: "Current" },
  { software: "PostgreSQL", version: "16.3", category: "Database", license: "PostgreSQL", systems: "8", status: "Current" },
  { software: "Redis", version: "7.2.4", category: "Cache", license: "BSD-3", systems: "12", status: "Current" },
  { software: "Node.js", version: "22.1.0", category: "Runtime", license: "MIT", systems: "16", status: "Outdated" },
  { software: "Python", version: "3.12.3", category: "Runtime", license: "PSF", systems: "34", status: "Current" },
  { software: "Docker Engine", version: "26.1.0", category: "Container", license: "Apache-2.0", systems: "40", status: "Current" },
  { software: "HAProxy", version: "2.6.12", category: "Load Balancer", license: "GPL-2.0", systems: "6", status: "Outdated" },
  { software: "Elasticsearch", version: "7.17.18", category: "Search", license: "Elastic-2.0", systems: "5", status: "Outdated" },
  { software: "Ubuntu Server", version: "20.04 LTS", category: "OS", license: "GPL", systems: "48", status: "End of Life" },
  { software: "Prometheus", version: "3.0.0-beta", category: "Monitoring", license: "Apache-2.0", systems: "3", status: "Beta" },
];

export default function InventoryPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Inventory" description="Software inventory and catalog management." icon="lucide:package" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search software..." />
    </div>
  );
}
