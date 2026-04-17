import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "event", label: "Event" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "location", label: "Location" },
  { key: "attendees", label: "Attendees" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Upcoming: "#3b82f6", Confirmed: "#10b981", Tentative: "#f59e0b", Completed: "#6b7280", Cancelled: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "type", label: "Type" },
];

const data = [
  { event: "Q2 Review Meeting", date: "2026-04-20", time: "10:00 AM", location: "Conference Room A", attendees: "15", status: "Confirmed", type: "Meeting" },
  { event: "Sprint Planning", date: "2026-04-18", time: "09:00 AM", location: "Virtual — Zoom", attendees: "12", status: "Confirmed", type: "Meeting" },
  { event: "Tech Conference 2026", date: "2026-04-25", time: "All Day", location: "Convention Center", attendees: "342", status: "Upcoming", type: "Conference" },
  { event: "Team Lunch", date: "2026-04-19", time: "12:00 PM", location: "Rooftop Garden", attendees: "24", status: "Confirmed", type: "Social" },
  { event: "Product Demo", date: "2026-04-22", time: "02:00 PM", location: "Client Office", attendees: "8", status: "Tentative", type: "Presentation" },
  { event: "Security Audit Review", date: "2026-04-23", time: "11:00 AM", location: "Virtual — Teams", attendees: "6", status: "Confirmed", type: "Meeting" },
  { event: "Company Town Hall", date: "2026-04-30", time: "03:00 PM", location: "Main Auditorium", attendees: "200", status: "Upcoming", type: "All-Hands" },
  { event: "Design Workshop", date: "2026-04-17", time: "01:00 PM", location: "Creative Lab", attendees: "10", status: "Completed", type: "Workshop" },
  { event: "Board Meeting", date: "2026-05-05", time: "09:00 AM", location: "Board Room", attendees: "7", status: "Confirmed", type: "Meeting" },
  { event: "Summer Picnic", date: "2026-06-15", time: "11:00 AM", location: "City Park", attendees: "150", status: "Tentative", type: "Social" },
];

export default function EventHubEventsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Events" description="Manage all events, meetings, and gatherings." icon="lucide:calendar" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search events..." />
    </div>
  );
}
