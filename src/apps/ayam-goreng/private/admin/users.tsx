import { createSignal, createMemo, For } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";

const mockUsers = [
  { name: "Alex Morgan", email: "alex.morgan@company.io", role: "Admin", status: "Active", lastActive: "Just now", initials: "AM" },
  { name: "Sarah Chen", email: "sarah.chen@company.io", role: "Director", status: "Active", lastActive: "5 min ago", initials: "SC" },
  { name: "James Wilson", email: "james.wilson@company.io", role: "Manager", status: "Active", lastActive: "12 min ago", initials: "JW" },
  { name: "Priya Patel", email: "priya.patel@company.io", role: "Manager", status: "Active", lastActive: "1 hr ago", initials: "PP" },
  { name: "Marcus Lee", email: "marcus.lee@company.io", role: "Staff", status: "Active", lastActive: "2 hr ago", initials: "ML" },
  { name: "Emma Davis", email: "emma.davis@company.io", role: "Staff", status: "Inactive", lastActive: "3 days ago", initials: "ED" },
  { name: "Carlos Rivera", email: "carlos.rivera@company.io", role: "Staff", status: "Active", lastActive: "30 min ago", initials: "CR" },
  { name: "Yuki Tanaka", email: "yuki.tanaka@company.io", role: "Director", status: "Active", lastActive: "15 min ago", initials: "YT" },
];

const roleColors: Record<string, string> = {
  Admin: "#f43f5e",
  Director: "#8b5cf6",
  Manager: "#3b82f6",
  Staff: "#64748b",
};

export default function UsersPage() {
  const [search, setSearch] = createSignal("");
  const filtered = createMemo(() => {
    const q = search().toLowerCase();
    if (!q) return mockUsers;
    return mockUsers.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)
    );
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="font-display text-2xl font-bold text-text-primary">Users & Groups</h1>
          <p class="text-sm text-text-secondary mt-1">{mockUsers.length} team members</p>
        </div>
        <button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
          <AppIcon icon="lucide:user-plus" size={16} />
          Invite User
        </button>
      </div>

      <div class="relative mb-4">
        <AppIcon icon="lucide:search" size={16} class="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
        <input
          type="text"
          placeholder="Search users..."
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-1 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/50"
        />
      </div>

      <div class="rounded-2xl bg-surface-1 border border-surface-3/30 overflow-hidden">
        <div class="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 px-5 py-3 border-b border-surface-3/30 text-xs font-medium text-text-muted">
          <span>User</span><span>Email</span><span>Role</span><span>Status</span><span>Last Active</span>
        </div>
        <For each={filtered()}>
          {(u) => (
            <div class="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-2 md:gap-4 px-5 py-3 border-b border-surface-3/20 last:border-0 hover:bg-surface-2/30 transition-colors items-center">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-dim text-xs font-bold text-brand shrink-0">
                  {u.initials}
                </div>
                <span class="text-sm font-medium text-text-primary">{u.name}</span>
              </div>
              <span class="text-sm text-text-secondary">{u.email}</span>
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium w-fit"
                style={{ "background-color": (roleColors[u.role] || "#64748b") + "18", color: roleColors[u.role] || "#64748b" }}
              >
                {u.role}
              </span>
              <span class={`text-xs font-medium ${u.status === "Active" ? "text-emerald-400" : "text-text-muted"}`}>
                {u.status}
              </span>
              <span class="text-xs text-text-muted">{u.lastActive}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
