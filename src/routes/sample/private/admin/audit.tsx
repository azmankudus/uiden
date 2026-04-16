import { createSignal, createMemo, For, Show } from "solid-js";
import PrivateLayout from "~/components/sample/PrivateLayout";
import AppIcon from "~/components/AppIcon";

type EventCategory = "Auth" | "Admin" | "System";

interface AuditEvent {
  icon: string;
  action: string;
  user: string;
  time: string;
  category: EventCategory;
}

const events: AuditEvent[] = [
  { icon: "lucide:log-in", action: "User signed in", user: "Alex Morgan", time: "2 min ago", category: "Auth" },
  { icon: "lucide:user-plus", action: "Invited new user sarah.chen@company.io", user: "Alex Morgan", time: "15 min ago", category: "Admin" },
  { icon: "lucide:settings", action: "Updated session timeout to 30 minutes", user: "Alex Morgan", time: "1 hr ago", category: "Admin" },
  { icon: "lucide:shield", action: "Security scan completed — no threats detected", user: "System", time: "2 hr ago", category: "System" },
  { icon: "lucide:key-round", action: "API key rotated for Pipeline CI", user: "James Wilson", time: "3 hr ago", category: "Admin" },
  { icon: "lucide:log-in", action: "User signed in from new device", user: "Sarah Chen", time: "4 hr ago", category: "Auth" },
  { icon: "lucide:rocket", action: "Deployed v3.2.1 to production", user: "James Wilson", time: "5 hr ago", category: "System" },
  { icon: "lucide:shield-check", action: "Role updated for Priya Patel: Staff → Manager", user: "Alex Morgan", time: "6 hr ago", category: "Admin" },
  { icon: "lucide:lock", action: "Password changed", user: "Marcus Lee", time: "8 hr ago", category: "Auth" },
  { icon: "lucide:activity", action: "Health check passed for all services", user: "System", time: "12 hr ago", category: "System" },
];

const filters = ["All", "Auth", "Admin", "System"] as const;

const categoryColors: Record<EventCategory, string> = {
  Auth: "#3b82f6",
  Admin: "#8b5cf6",
  System: "#f59e0b",
};

export default function AuditPage() {
  const [activeFilter, setActiveFilter] = createSignal<string>("All");
  const filtered = createMemo(() => {
    const f = activeFilter();
    if (f === "All") return events;
    return events.filter((e) => e.category === f);
  });

  return (
    <PrivateLayout>
      <div class="max-w-6xl mx-auto page-enter">
        <div class="mb-6">
          <h1 class="font-display text-2xl font-bold text-text-primary">Audit Log</h1>
          <p class="text-sm text-text-secondary mt-1">Track system events and user actions across the platform.</p>
        </div>

        <div class="flex items-center gap-2 mb-6">
          <For each={filters}>
            {(f) => (
              <button
                type="button"
                onClick={() => setActiveFilter(f)}
                class={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeFilter() === f
                    ? "bg-brand text-surface-0"
                    : "bg-surface-2 text-text-secondary hover:text-text-primary"
                }`}
              >
                {f}
              </button>
            )}
          </For>
          <span class="text-xs text-text-muted ml-2">{filtered().length} events</span>
        </div>

        <div class="relative">
          <div class="absolute left-[15px] top-4 bottom-4 w-px bg-surface-3/30" />
          <div class="space-y-1">
            <For each={filtered()}>
              {(event) => (
                <div class="relative flex items-start gap-4 p-4 rounded-xl hover:bg-surface-1/80 transition-colors">
                  <div
                    class="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ "background-color": (categoryColors[event.category] || "#64748b") + "18" }}
                  >
                    <AppIcon icon={event.icon} size={14} style={{ color: categoryColors[event.category] || "#64748b" }} />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-text-primary">{event.action}</p>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-xs text-text-muted">{event.user}</span>
                      <span class="text-xs text-text-muted">·</span>
                      <span class="text-xs text-text-muted">{event.time}</span>
                      <span class="text-xs text-text-muted">·</span>
                      <span
                        class="text-xs font-medium"
                        style={{ color: categoryColors[event.category] || "#64748b" }}
                      >
                        {event.category}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>

        <Show when={filtered().length === 0}>
          <div class="text-center py-12">
            <p class="text-sm text-text-muted">No events match the selected filter.</p>
          </div>
        </Show>
      </div>
    </PrivateLayout>
  );
}
