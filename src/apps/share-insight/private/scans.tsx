import { createSignal, createMemo, For, Show } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import FilterTabs from "~/shell/components/ui/FilterTabs";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const SCANS = [
  { path: "\\\\SERVER01\\Marketing", type: "NTFS", status: "Completed", files: "14,287", duration: "2m 34s", lastRun: "10 min ago" },
  { path: "/data/engineering", type: "SMB", status: "Running", files: "8,412", duration: "—", lastRun: "Now" },
  { path: "\\\\FS03\\HR", type: "NTFS", status: "Completed", files: "6,891", duration: "1m 12s", lastRun: "1 hr ago" },
  { path: "\\\\DC02\\Projects", type: "NTFS", status: "Failed", files: "2,104", duration: "—", lastRun: "2 hr ago" },
  { path: "/mnt/nas/legal", type: "SMB", status: "Completed", files: "22,503", duration: "4m 08s", lastRun: "3 hr ago" },
  { path: "\\\\NAS01\\Backup", type: "NTFS", status: "Completed", files: "41,220", duration: "8m 51s", lastRun: "5 hr ago" },
  { path: "\\\\SRV04\\Finance", type: "NTFS", status: "Running", files: "3,780", duration: "—", lastRun: "Now" },
  { path: "/data/ops/deploy", type: "SMB", status: "Completed", files: "1,932", duration: "0m 45s", lastRun: "8 hr ago" },
  { path: "\\\\FILESVR\\Public", type: "NTFS", status: "Failed", files: "512", duration: "—", lastRun: "12 hr ago" },
  { path: "/srv/shared/qa", type: "SMB", status: "Completed", files: "9,671", duration: "2m 19s", lastRun: "1 day ago" },
];

const statusColor: Record<string, string> = {
  Completed: "#10b981",
  Running: "#3b82f6",
  Failed: "#ef4444",
};

export default function Scans() {
  const [activeTab, setActiveTab] = createSignal("All");
  const tabs = ["All", "Completed", "Running", "Failed"];

  const filtered = createMemo(() => {
    const tab = activeTab();
    if (tab === "All") return SCANS;
    return SCANS.filter((s) => s.status === tab);
  });

  const columns = [
    { key: "path", label: "Share Path" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status", render: (_: string, row: any) => <StatusBadge text={row.status} color={statusColor[row.status] || "#6b7280"} /> },
    { key: "files", label: "Files Scanned" },
    { key: "duration", label: "Duration" },
    { key: "lastRun", label: "Last Run" },
  ];

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Scan History" description="Track all folder scan jobs and their results" icon="lucide:scan-text" />
      <FilterTabs tabs={tabs} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search scans..." />
    </div>
  );
}
