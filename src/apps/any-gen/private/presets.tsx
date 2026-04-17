import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "preset", label: "Preset" },
  { key: "generator", label: "Generator" },
  { key: "pattern", label: "Pattern" },
  { key: "createdBy", label: "Created By" },
  { key: "uses", label: "Uses" },
  { key: "lastUsed", label: "Last Used" },
];

const data = [
  { preset: "Standard UUID v4", generator: "UUID/GUID", pattern: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", createdBy: "System", uses: "4,521", lastUsed: "5 min ago" },
  { preset: "Short Paragraph", generator: "Lorem Ipsum", pattern: "3 sentences, 50-80 words", createdBy: "Sarah Chen", uses: "1,245", lastUsed: "22 min ago" },
  { preset: "US Phone Format", generator: "Phone Numbers", pattern: "+1 (XXX) XXX-XXXX", createdBy: "Mike Johnson", uses: "892", lastUsed: "1 hr ago" },
  { preset: "Internal IPs", generator: "IP Addresses", pattern: "192.168.X.X", createdBy: "Alex Kim", uses: "345", lastUsed: "3 hr ago" },
  { preset: "Company Emails", generator: "Email Addresses", pattern: "first.last@company.io", createdBy: "Emma Wilson", uses: "567", lastUsed: "5 hr ago" },
  { preset: "Date Range 2025", generator: "Dates", pattern: "YYYY-MM-DD between 2025-01-01 and 2025-12-31", createdBy: "James Park", uses: "234", lastUsed: "1 day ago" },
  { preset: "Batch Names EN", generator: "Random Names", pattern: "First Last, English, 100 count", createdBy: "Lisa Wang", uses: "178", lastUsed: "2 days ago" },
  { preset: "Hex Color Codes", generator: "Custom Regex", pattern: "#[0-9a-fA-F]{6}", createdBy: "David Lee", uses: "89", lastUsed: "3 days ago" },
];

export default function PresetsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Presets" description="Manage saved generator presets and configurations." icon="lucide:bookmark" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search presets..." />
    </div>
  );
}
