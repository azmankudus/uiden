import { createSignal, createMemo, For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import FilterTabs from "~/shell/components/ui/FilterTabs";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const deployments = [
  { app: "order-service", server: "prod-wl-01", version: "4.1.2", status: "Running", deployedAt: "2026-04-17 08:30", size: "128 MB" },
  { app: "user-service", server: "prod-tc-01", version: "2.8.0", status: "Running", deployedAt: "2026-04-17 07:15", size: "96 MB" },
  { app: "payment-gateway", server: "prod-wl-02", version: "3.3.1", status: "Running", deployedAt: "2026-04-16 22:00", size: "210 MB" },
  { app: "notification-svc", server: "prod-tc-02", version: "1.5.4", status: "Stopped", deployedAt: "2026-04-16 18:45", size: "64 MB" },
  { app: "inventory-api", server: "stg-jb-01", version: "2.0.0-rc1", status: "Running", deployedAt: "2026-04-16 14:20", size: "145 MB" },
  { app: "auth-service", server: "prod-gf-01", version: "5.2.1", status: "Running", deployedAt: "2026-04-15 12:00", size: "88 MB" },
  { app: "report-engine", server: "dev-jt-01", version: "1.0.3", status: "Failed", deployedAt: "2026-04-15 09:30", size: "320 MB" },
  { app: "cache-layer", server: "prod-tc-03", version: "2.1.0", status: "Running", deployedAt: "2026-04-14 20:10", size: "52 MB" },
  { app: "search-indexer", server: "stg-wl-01", version: "3.0.0-beta", status: "Failed", deployedAt: "2026-04-14 16:30", size: "178 MB" },
  { app: "email-worker", server: "prod-tc-01", version: "1.9.2", status: "Stopped", deployedAt: "2026-04-13 11:00", size: "42 MB" },
];

const statusColor: Record<string, string> = {
  Running: "#10b981",
  Stopped: "#6b7280",
  Failed: "#ef4444",
};

const TABS = ["All", "Running", "Stopped", "Failed"];

export default function MiddleHubDeployments() {
  const [activeTab, setActiveTab] = createSignal("All");

  const filtered = createMemo(() => {
    const tab = activeTab();
    if (tab === "All") return deployments;
    return deployments.filter((d) => d.status === tab);
  });

  const columns = [
    { key: "app", label: "Application" },
    { key: "server", label: "Server" },
    { key: "version", label: "Version" },
    { key: "status", label: "Status", render: (_v: string, row: any) => <StatusBadge text={row.status} color={statusColor[row.status] || "#6b7280"} /> },
    { key: "deployedAt", label: "Deployed At" },
    { key: "size", label: "Size" },
  ];

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title="Deployments"
        description="Application deployment status and history."
        icon="lucide:rocket"
        iconColor="#3b82f6"
      />

      <div class="max-w-6xl mx-auto px-0">
        <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
        <DataTable columns={columns} data={filtered()} searchPlaceholder="Search deployments..." />
      </div>
    </div>
  );
}
