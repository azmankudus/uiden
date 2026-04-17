import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import AppIcon from "~/shell/lib/app-icon";

const clocks = [
  { city: "New York", timezone: "UTC-5", time: "09:45 AM", date: "Apr 17, 2026", icon: "lucide:building-2", color: "#3b82f6" },
  { city: "London", timezone: "UTC+0", time: "02:45 PM", date: "Apr 17, 2026", icon: "lucide:building-2", color: "#8b5cf6" },
  { city: "Berlin", timezone: "UTC+1", time: "03:45 PM", date: "Apr 17, 2026", icon: "lucide:building-2", color: "#f59e0b" },
  { city: "Dubai", timezone: "UTC+4", time: "06:45 PM", date: "Apr 17, 2026", icon: "lucide:building-2", color: "#10b981" },
  { city: "Mumbai", timezone: "UTC+5:30", time: "08:15 PM", date: "Apr 17, 2026", icon: "lucide:building-2", color: "#ef4444" },
  { city: "Singapore", timezone: "UTC+8", time: "10:45 PM", date: "Apr 17, 2026", icon: "lucide:building-2", color: "#06b6d4" },
  { city: "Tokyo", timezone: "UTC+9", time: "11:45 PM", date: "Apr 17, 2026", icon: "lucide:building-2", color: "#ec4899" },
  { city: "Sydney", timezone: "UTC+10", time: "12:45 AM", date: "Apr 18, 2026", icon: "lucide:building-2", color: "#f97316" },
];

export default function WorldClockPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="World Clock" description="Track time across multiple time zones worldwide." icon="lucide:globe" iconColor="#3b82f6" />

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <For each={clocks}>
          {(c) => (
            <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30 hover:border-brand/30 transition-all">
              <div class="flex items-center gap-2 mb-3">
                <div class="flex items-center justify-center w-8 h-8 rounded-lg" style={{ "background-color": c.color + "18" }}>
                  <AppIcon icon={c.icon} size={14} style={{ color: c.color }} />
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-text-primary">{c.city}</h3>
                  <p class="text-xs text-text-muted">{c.timezone}</p>
                </div>
              </div>
              <div class="font-display text-3xl font-bold text-text-primary mb-1">{c.time}</div>
              <p class="text-xs text-text-muted">{c.date}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
