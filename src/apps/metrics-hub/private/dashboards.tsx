import PageHeader from "~/shell/components/ui/PageHeader";
import CardGrid from "~/shell/components/ui/CardGrid";

const dashboards = [
  { icon: "lucide:server", label: "Infrastructure Overview", desc: "High-level view of all servers, containers, and virtual machines with resource utilization and health status.", href: "/metrics-hub/private/dashboards", color: "#3b82f6" },
  { icon: "lucide:gauge", label: "Application Performance", desc: "APM-focused dashboard with response times, throughput, error rates, and distributed tracing data.", href: "/metrics-hub/private/dashboards", color: "#10b981" },
  { icon: "lucide:network", label: "Network Health", desc: "Bandwidth usage, connection counts, DNS resolution times, and firewall event monitoring.", href: "/metrics-hub/private/dashboards", color: "#8b5cf6" },
  { icon: "lucide:database", label: "Database Metrics", desc: "Query performance, connection pools, replication lag, storage usage, and cache hit ratios.", href: "/metrics-hub/private/dashboards", color: "#f59e0b" },
  { icon: "lucide:shield", label: "Security Monitoring", desc: "Authentication events, failed logins, anomaly detection, and compliance posture indicators.", href: "/metrics-hub/private/dashboards", color: "#ef4444" },
  { icon: "lucide:layout-grid", label: "Custom Dashboard", desc: "Create a personalized dashboard with drag-and-drop widgets and flexible data source configuration.", href: "/metrics-hub/private/dashboards", color: "#06b6d4" },
];

export default function DashboardsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Dashboards" description="Custom monitoring dashboard templates." icon="lucide:gauge" iconColor="#8b5cf6" />
      <CardGrid cards={dashboards} />
    </div>
  );
}
