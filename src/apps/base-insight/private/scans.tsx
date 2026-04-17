import { createSignal, createMemo } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import FilterTabs from "~/shell/components/ui/FilterTabs";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const SCANS = [
  { server: "PROD-WEB01", os: "Windows Server 2022", benchmark: "CIS v2.0", score: "92%", status: "Passed", lastScan: "8 min ago" },
  { server: "PROD-DB01", os: "RHEL 8", benchmark: "STIG v1R9", score: "68%", status: "Failed", lastScan: "25 min ago" },
  { server: "PROD-APP03", os: "Ubuntu 22.04", benchmark: "CIS v1.1", score: "85%", status: "Passed", lastScan: "1 hr ago" },
  { server: "CORE-SW01", os: "Cisco IOS 17", benchmark: "CIS v1.0", score: "91%", status: "Passed", lastScan: "2 hr ago" },
  { server: "PROD-DB02", os: "Oracle Linux 9", benchmark: "STIG v1R3", score: "73%", status: "Warning", lastScan: "3 hr ago" },
  { server: "AWS-PROD-01", os: "Amazon Linux 2023", benchmark: "CIS v1.0", score: "88%", status: "Passed", lastScan: "4 hr ago" },
  { server: "K8S-NODE-05", os: "Ubuntu 22.04", benchmark: "CIS Docker v1.5", score: "79%", status: "Warning", lastScan: "5 hr ago" },
  { server: "PROD-WEB02", os: "Windows Server 2022", benchmark: "STIG v2R4", score: "64%", status: "Failed", lastScan: "6 hr ago" },
  { server: "AZURE-VM-03", os: "Windows Server 2025", benchmark: "CIS v1.0", score: "95%", status: "Passed", lastScan: "8 hr ago" },
  { server: "PROD-FW01", os: "Palo Alto PAN-OS 11", benchmark: "CIS v2.0", score: "82%", status: "Passed", lastScan: "1 day ago" },
];

const statusColor: Record<string, string> = {
  Passed: "#10b981",
  Failed: "#ef4444",
  Warning: "#f59e0b",
};

export default function Scans() {
  const [activeTab, setActiveTab] = createSignal("All");
  const tabs = ["All", "Passed", "Failed", "Warning"];

  const filtered = createMemo(() => {
    const tab = activeTab();
    if (tab === "All") return SCANS;
    return SCANS.filter((s) => s.status === tab);
  });

  const columns = [
    { key: "server", label: "Server" },
    { key: "os", label: "OS" },
    { key: "benchmark", label: "Benchmark" },
    { key: "score", label: "Score" },
    { key: "status", label: "Status", render: (_: string, row: any) => <StatusBadge text={row.status} color={statusColor[row.status] || "#6b7280"} /> },
    { key: "lastScan", label: "Last Scan" },
  ];

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Scan History" description="Track all hardening scan jobs across your infrastructure" icon="lucide:scan-text" />
      <FilterTabs tabs={tabs} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search scans..." />
    </div>
  );
}
