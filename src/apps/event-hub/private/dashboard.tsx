import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Upcoming Events", value: "12", icon: "lucide:calendar", color: "#3b82f6" },
  { label: "This Week", value: "5", icon: "lucide:calendar-days", color: "#10b981" },
  { label: "Attendees", value: "342", icon: "lucide:users", color: "#8b5cf6" },
  { label: "Reminders Active", value: "24", icon: "lucide:bell", color: "#f59e0b" },
];

const activity = [
  { icon: "lucide:calendar", text: "New event 'Q2 Review Meeting' created for Apr 20", time: "5 min ago", color: "#3b82f6" },
  { icon: "lucide:bell", text: "Reminder sent for 'Sprint Planning' starting in 1hr", time: "22 min ago", color: "#f59e0b" },
  { icon: "lucide:users", text: "8 new RSVPs received for Tech Conference 2026", time: "1 hr ago", color: "#10b981" },
  { icon: "lucide:calendar", text: "Recurring event 'Weekly Standup' updated", time: "3 hr ago", color: "#8b5cf6" },
  { icon: "lucide:calendar-days", text: "All-day event 'Company Holiday' added to calendar", time: "5 hr ago", color: "#3b82f6" },
  { icon: "lucide:bell-ring", text: "Overdue reminder: 'Submit Q2 Report'", time: "8 hr ago", color: "#ef4444" },
];

const actions = [
  { icon: "lucide:plus", label: "New Event" },
  { icon: "lucide:calendar-days", label: "Calendar" },
  { icon: "lucide:bell", label: "Reminders" },
  { icon: "lucide:users", label: "Invite" },
];

export default function EventHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Event-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Manage events, calendar, and reminders for your organization.</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <For each={stats}>
          {(s) => <StatCard label={s.label} value={s.value} icon={s.icon} color={s.color} />}
        </For>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <ActivityFeed items={activity} title="Recent Activity" />
        </div>
        <ActionGrid actions={actions} />
      </div>
    </div>
  );
}
