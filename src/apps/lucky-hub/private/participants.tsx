import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "participant", label: "Participant" },
  { key: "email", label: "Email" },
  { key: "event", label: "Event" },
  { key: "tickets", label: "Tickets" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Registered: "#10b981", Winner: "#f59e0b", Eliminated: "#6b7280", Disqualified: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "registered", label: "Registered" },
];

const data = [
  { participant: "Sarah Chen", email: "sarah.chen@example.com", event: "Annual Gala 2026", tickets: "3", status: "Registered", registered: "2026-04-01" },
  { participant: "Mike Johnson", email: "mike.j@example.com", event: "Annual Gala 2026", tickets: "1", status: "Winner", registered: "2026-04-02" },
  { participant: "Alex Kim", email: "alex.kim@example.com", event: "Spring Festival", tickets: "5", status: "Registered", registered: "2026-04-05" },
  { participant: "Emma Wilson", email: "emma.w@example.com", event: "Tech Summit Raffle", tickets: "2", status: "Registered", registered: "2026-04-10" },
  { participant: "James Park", email: "james.p@example.com", event: "Spring Festival", tickets: "1", status: "Eliminated", registered: "2026-04-03" },
  { participant: "Lisa Wang", email: "lisa.w@example.com", event: "Annual Gala 2026", tickets: "2", status: "Registered", registered: "2026-04-06" },
  { participant: "David Lee", email: "david.l@example.com", event: "Q1 Team Building", tickets: "1", status: "Winner", registered: "2026-03-20" },
  { participant: "Maria Garcia", email: "maria.g@example.com", event: "Spring Festival", tickets: "3", status: "Registered", registered: "2026-04-08" },
  { participant: "Tom Brown", email: "tom.b@example.com", event: "Annual Gala 2026", tickets: "1", status: "Disqualified", registered: "2026-04-04" },
  { participant: "Nina Patel", email: "nina.p@example.com", event: "Tech Summit Raffle", tickets: "4", status: "Registered", registered: "2026-04-12" },
];

export default function ParticipantsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Participants" description="View and manage event participants and ticket assignments." icon="lucide:users" iconColor="#10b981" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search participants..." />
    </div>
  );
}
