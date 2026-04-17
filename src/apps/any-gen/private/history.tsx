import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";

const columns = [
  { key: "id", label: "ID" },
  { key: "generator", label: "Generator" },
  { key: "input", label: "Input" },
  { key: "outputPreview", label: "Output Preview" },
  { key: "generated", label: "Generated" },
  { key: "user", label: "User" },
];

const data = [
  { id: "GEN-8421", generator: "UUID/GUID", input: "1x UUID v4", outputPreview: "a3f1b2c4-5d6e-4f7a-8b9c-0d1e2f3a4b5c", generated: "5 min ago", user: "Sarah Chen" },
  { id: "GEN-8420", generator: "Lorem Ipsum", input: "3 paragraphs", outputPreview: "Lorem ipsum dolor sit amet, consectetur adipiscing...", generated: "22 min ago", user: "Mike Johnson" },
  { id: "GEN-8419", generator: "Random Names", input: "10x English names", outputPreview: "John Smith, Emily Davis, Michael Brown...", generated: "1 hr ago", user: "Alex Kim" },
  { id: "GEN-8418", generator: "IP Addresses", input: "5x IPv4 internal", outputPreview: "192.168.1.42, 192.168.3.87, 192.168.0.15...", generated: "2 hr ago", user: "Emma Wilson" },
  { id: "GEN-8417", generator: "Email Addresses", input: "20x company.io", outputPreview: "john.doe@company.io, jane.smith@company.io...", generated: "3 hr ago", user: "James Park" },
  { id: "GEN-8416", generator: "Phone Numbers", input: "5x US format", outputPreview: "+1 (555) 234-5678, +1 (555) 876-1234...", generated: "4 hr ago", user: "Lisa Wang" },
  { id: "GEN-8415", generator: "Dates", input: "10x 2025 range", outputPreview: "2025-03-15, 2025-07-22, 2025-11-08...", generated: "5 hr ago", user: "David Lee" },
  { id: "GEN-8414", generator: "Custom Regex", input: "#[0-9a-f]{6} x5", outputPreview: "#a3f1b2, #4d7e9c, #f2983a, #0c5eb7...", generated: "6 hr ago", user: "Maria Garcia" },
  { id: "GEN-8413", generator: "UUID/GUID", input: "50x UUID v4", outputPreview: "Batch: 50 UUIDs generated (4.2 KB)", generated: "8 hr ago", user: "Nina Patel" },
  { id: "GEN-8412", generator: "Lorem Ipsum", input: "1 paragraph, short", outputPreview: "Sed do eiusmod tempor incididunt ut labore...", generated: "1 day ago", user: "Tom Brown" },
];

export default function HistoryPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="History" description="View past text generation activity and outputs." icon="lucide:clock" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search history..." />
    </div>
  );
}
