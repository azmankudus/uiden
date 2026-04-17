import PageHeader from "~/shell/components/ui/PageHeader";
import CardGrid from "~/shell/components/ui/CardGrid";

const reports = [
  { icon: "lucide:clock", label: "SLA Performance", desc: "Track SLA compliance rates, breach trends, and response time distributions across all service categories.", href: "/ticket-hub/private/reports", color: "#10b981" },
  { icon: "lucide:trending-up", label: "Resolution Trends", desc: "Analyze ticket resolution patterns, identify bottlenecks, and optimize team workflows over time.", href: "/ticket-hub/private/reports", color: "#3b82f6" },
  { icon: "lucide:users", label: "Team Workload", desc: "Monitor team capacity, ticket distribution, and individual performance metrics for resource planning.", href: "/ticket-hub/private/reports", color: "#8b5cf6" },
  { icon: "lucide:pie-chart", label: "Category Breakdown", desc: "Visual breakdown of tickets by type, category, and service area to identify recurring patterns.", href: "/ticket-hub/private/reports", color: "#f59e0b" },
  { icon: "lucide:heart-pulse", label: "Customer Satisfaction", desc: "Aggregate CSAT scores, feedback trends, and sentiment analysis from resolved tickets.", href: "/ticket-hub/private/reports", color: "#ef4444" },
  { icon: "lucide:pencil", label: "Custom Report", desc: "Build custom reports with flexible filters, date ranges, and exportable formats for stakeholders.", href: "/ticket-hub/private/reports", color: "#06b6d4" },
];

export default function ReportsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Reports" description="Service reports and analytics." icon="lucide:bar-chart-3" iconColor="#f59e0b" />
      <CardGrid cards={reports} />
    </div>
  );
}
