import { createSignal, createMemo, For, Show } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";
import FilterTabs from "~/shell/components/ui/FilterTabs";

const columns = [
  { key: "cveId", label: "CVE ID" },
  { key: "severity", label: "Severity", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308", Low: "#3b82f6" };
    return <StatusBadge text={row.severity} color={colors[row.severity] || "#6b7280"} />;
  }},
  { key: "affectedSystems", label: "Affected Systems" },
  { key: "patchAvailable", label: "Patch Available", render: (v: boolean) => (
    <span class={`text-xs font-medium ${v ? "text-green-400" : "text-red-400"}`}>{v ? "Yes" : "No"}</span>
  )},
  { key: "published", label: "Published" },
];

const allData = [
  { cveId: "CVE-2026-0847", severity: "Critical", affectedSystems: "12 servers", patchAvailable: true, published: "2026-04-15" },
  { cveId: "CVE-2026-0912", severity: "Critical", affectedSystems: "8 servers", patchAvailable: false, published: "2026-04-14" },
  { cveId: "CVE-2026-0789", severity: "Critical", affectedSystems: "5 workstations", patchAvailable: true, published: "2026-04-13" },
  { cveId: "CVE-2026-0634", severity: "High", affectedSystems: "24 containers", patchAvailable: true, published: "2026-04-12" },
  { cveId: "CVE-2026-0551", severity: "High", affectedSystems: "16 servers", patchAvailable: true, published: "2026-04-10" },
  { cveId: "CVE-2026-0498", severity: "High", affectedSystems: "3 databases", patchAvailable: false, published: "2026-04-09" },
  { cveId: "CVE-2026-0423", severity: "Medium", affectedSystems: "40 endpoints", patchAvailable: true, published: "2026-04-07" },
  { cveId: "CVE-2026-0367", severity: "Medium", affectedSystems: "7 load balancers", patchAvailable: true, published: "2026-04-05" },
  { cveId: "CVE-2026-0291", severity: "Low", affectedSystems: "2 dev machines", patchAvailable: true, published: "2026-04-03" },
  { cveId: "CVE-2026-0215", severity: "Low", affectedSystems: "1 monitoring server", patchAvailable: false, published: "2026-04-01" },
];

const TABS = ["All", "Critical", "High", "Medium", "Low"];

export default function VulnerabilitiesPage() {
  const [activeTab, setActiveTab] = createSignal("All");

  const filtered = createMemo(() => {
    if (activeTab() === "All") return allData;
    return allData.filter((d) => d.severity === activeTab());
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Vulnerabilities" description="Track and triage CVEs across your infrastructure." icon="lucide:triangle-alert" iconColor="#ef4444" />
      <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search vulnerabilities..." />
    </div>
  );
}
