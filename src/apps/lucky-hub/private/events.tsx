import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "event", label: "Event" },
  { key: "date", label: "Date" },
  { key: "participants", label: "Participants" },
  { key: "rounds", label: "Rounds" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Completed: "#3b82f6", Upcoming: "#f59e0b", Cancelled: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "prizePool", label: "Prize Pool" },
];

const data = [
  { event: "Annual Gala 2026", date: "2026-04-20", participants: "342", rounds: "5", status: "Active", prizePool: "$15,000" },
  { event: "Tech Summit Raffle", date: "2026-04-25", participants: "156", rounds: "3", status: "Upcoming", prizePool: "$5,000" },
  { event: "Spring Festival", date: "2026-04-15", participants: "489", rounds: "4", status: "Active", prizePool: "$8,500" },
  { event: "Q1 Team Building", date: "2026-03-28", participants: "87", rounds: "2", status: "Completed", prizePool: "$2,000" },
  { event: "New Year Lucky Draw", date: "2026-01-01", participants: "612", rounds: "6", status: "Completed", prizePool: "$20,000" },
  { event: "Hackathon Prize", date: "2026-05-10", participants: "64", rounds: "1", status: "Upcoming", prizePool: "$10,000" },
  { event: "Customer Appreciation", date: "2026-02-14", participants: "234", rounds: "3", status: "Completed", prizePool: "$7,500" },
  { event: "Summer Kickoff", date: "2026-06-01", participants: "0", rounds: "0", status: "Cancelled", prizePool: "—" },
];

export default function EventsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Events" description="Manage lucky draw events, rounds, and prize pools." icon="lucide:calendar" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search events..." />
    </div>
  );
}
