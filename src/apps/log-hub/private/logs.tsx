import { createSignal, createMemo } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";
import FilterTabs from "~/shell/components/ui/FilterTabs";

const columns = [
  { key: "timestamp", label: "Timestamp" },
  { key: "level", label: "Level", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Error: "#ef4444", Warning: "#f59e0b", Info: "#3b82f6", Debug: "#6b7280" };
    return <StatusBadge text={row.level} color={colors[row.level] || "#6b7280"} />;
  }},
  { key: "source", label: "Source" },
  { key: "message", label: "Message" },
  { key: "host", label: "Host" },
];

const allData = [
  { timestamp: "2026-04-17 14:32:08", level: "Error", source: "api-gateway", message: "upstream timed out (110: Connection timed out) while reading response header from upstream", host: "api-gw-02" },
  { timestamp: "2026-04-17 14:31:45", level: "Error", source: "payment-service", message: "Failed to process transaction TXN-8847: connection pool exhausted", host: "payment-01" },
  { timestamp: "2026-04-17 14:31:12", level: "Warning", source: "auth-service", message: "Rate limit approaching threshold: 942/1000 requests per minute", host: "auth-02" },
  { timestamp: "2026-04-17 14:30:55", level: "Info", source: "k8s-scheduler", message: "Successfully assigned pod web-app-7d9f8b to node worker-14", host: "k8s-master-01" },
  { timestamp: "2026-04-17 14:30:30", level: "Error", source: "db-primary", message: "FATAL: sorry, too many clients already — max_connections limit reached", host: "db-primary-01" },
  { timestamp: "2026-04-17 14:30:01", level: "Warning", source: "redis-cluster", message: "Memory usage at 78% — consider scaling or enabling eviction policy", host: "redis-03" },
  { timestamp: "2026-04-17 14:29:45", level: "Info", source: "nginx-ingress", message: "HTTP/2 server push disabled for connection from 10.0.4.22 — negotiated protocol h2", host: "ingress-01" },
  { timestamp: "2026-04-17 14:29:12", level: "Debug", source: "auth-service", message: "Token validation completed in 3ms for client_id mobile-app-v3.2", host: "auth-01" },
  { timestamp: "2026-04-17 14:28:55", level: "Warning", source: "elasticsearch", message: "Shard allocation delayed: node es-data-03 has 82% disk usage", host: "es-master-01" },
  { timestamp: "2026-04-17 14:28:30", level: "Info", source: "backup-agent", message: "Incremental backup completed: 2.4GB uploaded, 847 files processed", host: "backup-01" },
  { timestamp: "2026-04-17 14:28:01", level: "Debug", source: "load-balancer", message: "Health check passed for backend web-03: response 200 in 12ms", host: "lb-01" },
  { timestamp: "2026-04-17 14:27:45", level: "Error", source: "mq-consumer", message: "Message processing failed after 3 retries: dead-letter queue routing enabled", host: "mq-worker-05" },
];

const TABS = ["All", "Error", "Warning", "Info", "Debug"];

export default function LogsPage() {
  const [activeTab, setActiveTab] = createSignal("All");

  const filtered = createMemo(() => {
    if (activeTab() === "All") return allData;
    return allData.filter((d) => d.level === activeTab());
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Logs" description="Browse and search log entries." icon="lucide:scroll-text" iconColor="#8b5cf6" />
      <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search logs..." />
    </div>
  );
}
