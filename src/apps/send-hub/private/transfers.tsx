import { createSignal, createMemo } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import FilterTabs from "~/shell/components/ui/FilterTabs";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const TABS = ["All", "Uploading", "Downloading", "Complete", "Failed"];

const columns = [
  { key: "file", label: "File" },
  { key: "direction", label: "Direction" },
  { key: "size", label: "Size" },
  { key: "source", label: "Source" },
  { key: "destination", label: "Destination" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Complete: "#10b981", Uploading: "#3b82f6", Downloading: "#8b5cf6", Failed: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "speed", label: "Speed" },
];

const data = [
  { file: "Q2-report-2026.xlsx", direction: "Upload", size: "24MB", source: "local", destination: "partner-portal.sftp.io", status: "Complete", speed: "12MB/s" },
  { file: "db-export.csv", direction: "Upload", size: "890MB", source: "local", destination: "sftp.vendor.io", status: "Failed", speed: "—" },
  { file: "compliance-audit-log.tar.gz", direction: "Download", size: "1.2GB", source: "archive.storage.internal", destination: "local", status: "Complete", speed: "45MB/s" },
  { file: "employee-records.json", direction: "Upload", size: "8MB", source: "local", destination: "hr-system.example.com", status: "Complete", speed: "8MB/s" },
  { file: "certificates-bundle.p12", direction: "Download", size: "2.4MB", source: "vault.internal.io", destination: "local", status: "Complete", speed: "5MB/s" },
  { file: "build-artifacts-v3.2.zip", direction: "Upload", size: "340MB", source: "local", destination: "cdn-upload.example.com", status: "Uploading", speed: "28MB/s" },
  { file: "backup-config-2026-04-17.yaml", direction: "Upload", size: "12KB", source: "local", destination: "git.internal.io", status: "Complete", speed: "2MB/s" },
  { file: "partner-inventory-update.xml", direction: "Download", size: "56MB", source: "ftp.partner.io", destination: "local", status: "Downloading", speed: "15MB/s" },
  { file: "security-scan-results.json", direction: "Upload", size: "3.8MB", source: "local", destination: "soc-platform.internal", status: "Complete", speed: "4MB/s" },
  { file: "legacy-data-migration-part5.csv", direction: "Upload", size: "2.1GB", source: "local", destination: "data-lake.internal.io", status: "Failed", speed: "—" },
];

export default function TransfersPage() {
  const [activeTab, setActiveTab] = createSignal("All");
  const filtered = createMemo(() => {
    const tab = activeTab();
    if (tab === "All") return data;
    return data.filter((row) => row.status === tab);
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Transfers" description="Active and completed file transfers." icon="lucide:send" iconColor="#3b82f6" />
      <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search transfers..." />
    </div>
  );
}
