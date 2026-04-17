import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "draw", label: "Draw" },
  { key: "event", label: "Event" },
  { key: "round", label: "Round" },
  { key: "winner", label: "Winner" },
  { key: "prize", label: "Prize" },
  { key: "timestamp", label: "Timestamp" },
  { key: "verified", label: "Verified", render: (v: boolean) => (
    <span class={`text-xs font-medium ${v ? "text-green-400" : "text-text-muted"}`}>{v ? "✓ Verified" : "Pending"}</span>
  )},
];

const data = [
  { draw: "DRW-0089", event: "Annual Gala 2026", round: "Round 3", winner: "Mike Johnson", prize: "$5,000", timestamp: "2026-04-17 14:30", verified: true },
  { draw: "DRW-0088", event: "Annual Gala 2026", round: "Round 2", winner: "Lisa Wang", prize: "$2,000", timestamp: "2026-04-17 14:15", verified: true },
  { draw: "DRW-0087", event: "Spring Festival", round: "Round 4", winner: "Maria Garcia", prize: "$3,000", timestamp: "2026-04-16 16:45", verified: true },
  { draw: "DRW-0086", event: "Spring Festival", round: "Round 3", winner: "Alex Kim", prize: "$1,500", timestamp: "2026-04-16 16:30", verified: true },
  { draw: "DRW-0085", event: "Q1 Team Building", round: "Round 2", winner: "David Lee", prize: "$1,000", timestamp: "2026-03-28 15:00", verified: true },
  { draw: "DRW-0084", event: "Q1 Team Building", round: "Round 1", winner: "Emma Wilson", prize: "$500", timestamp: "2026-03-28 14:45", verified: true },
  { draw: "DRW-0083", event: "New Year Lucky Draw", round: "Round 6", winner: "Nina Patel", prize: "$10,000", timestamp: "2026-01-01 23:59", verified: true },
  { draw: "DRW-0082", event: "New Year Lucky Draw", round: "Round 5", winner: "Sarah Chen", prize: "$3,000", timestamp: "2026-01-01 23:45", verified: true },
  { draw: "DRW-0081", event: "Customer Appreciation", round: "Round 3", winner: "Tom Brown", prize: "$2,500", timestamp: "2026-02-14 18:00", verified: false },
  { draw: "DRW-0080", event: "Customer Appreciation", round: "Round 2", winner: "James Park", prize: "$1,000", timestamp: "2026-02-14 17:30", verified: true },
];

export default function ResultsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Results" description="View draw results, winners, and prize distributions." icon="lucide:trophy" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search results..." />
    </div>
  );
}
