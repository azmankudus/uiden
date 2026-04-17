import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "resource", label: "Resource" },
  { key: "total", label: "Total" },
  { key: "used", label: "Used" },
  { key: "available", label: "Available" },
  { key: "utilization", label: "Utilization", render: (_v: any, row: any) => {
    const pct = parseFloat(row.utilization);
    const color = pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#10b981";
    return <StatusBadge text={row.utilization} color={color} />;
  }},
  { key: "trend", label: "Trend" },
];

const data = [
  { resource: "CPU Cores", total: "512", used: "384", available: "128", utilization: "75%", trend: "↑ +3%" },
  { resource: "RAM (TB)", total: "4.0", used: "3.2", available: "0.8", utilization: "80%", trend: "↑ +5%" },
  { resource: "Storage (TB)", total: "120", used: "96", available: "24", utilization: "80%", trend: "↑ +2%" },
  { resource: "Network (Gbps)", total: "40", used: "28", available: "12", utilization: "70%", trend: "→ 0%" },
  { resource: "GPU Units", total: "32", used: "29", available: "3", utilization: "91%", trend: "↑ +8%" },
  { resource: "IP Addresses", total: "1024", used: "678", available: "346", utilization: "66%", trend: "↑ +1%" },
  { resource: "Load Balancers", total: "16", used: "14", available: "2", utilization: "88%", trend: "↑ +4%" },
  { resource: "SSL Certificates", total: "234", used: "210", available: "24", utilization: "90%", trend: "→ 0%" },
];

export default function CapacityPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Capacity" description="Resource capacity planning and utilization overview." icon="lucide:bar-chart-3" iconColor="#10b981" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search resources..." />
    </div>
  );
}
