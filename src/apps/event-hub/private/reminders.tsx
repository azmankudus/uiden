import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "reminder", label: "Reminder" },
  { key: "event", label: "Event" },
  { key: "trigger", label: "Trigger" },
  { key: "notify", label: "Notify" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Triggered: "#f59e0b", Disabled: "#6b7280", Snoozed: "#3b82f6" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "nextTrigger", label: "Next Trigger" },
];

const data = [
  { reminder: "15 min before", event: "Q2 Review Meeting", trigger: "15 min before", notify: "Email, Push", status: "Active", nextTrigger: "Apr 20, 09:45 AM" },
  { reminder: "1 hour before", event: "Sprint Planning", trigger: "1 hour before", notify: "Email", status: "Active", nextTrigger: "Apr 18, 08:00 AM" },
  { reminder: "Day before", event: "Tech Conference 2026", trigger: "1 day before", notify: "Email, SMS", status: "Active", nextTrigger: "Apr 24, 09:00 AM" },
  { reminder: "30 min before", event: "Product Demo", trigger: "30 min before", notify: "Push", status: "Triggered", nextTrigger: "—" },
  { reminder: "Start time", event: "Team Lunch", trigger: "At start time", notify: "Push", status: "Active", nextTrigger: "Apr 19, 12:00 PM" },
  { reminder: "1 hour before", event: "Security Audit Review", trigger: "1 hour before", notify: "Email", status: "Active", nextTrigger: "Apr 23, 10:00 AM" },
  { reminder: "15 min before", event: "Design Workshop", trigger: "15 min before", notify: "Email, Push", status: "Disabled", nextTrigger: "—" },
  { reminder: "Day before", event: "Board Meeting", trigger: "1 day before", notify: "Email, SMS", status: "Active", nextTrigger: "May 04, 09:00 AM" },
];

export default function RemindersPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Reminders" description="Manage event reminders and notification preferences." icon="lucide:bell" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search reminders..." />
    </div>
  );
}
