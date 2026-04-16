import { For } from "solid-js";
import PrivateLayout from "~/components/sample/PrivateLayout";
import AppIcon from "~/components/AppIcon";

const roles = [
  {
    name: "Admin",
    users: 100,
    color: "#f43f5e",
    permissions: ["Full System Access", "User Management", "Billing & Licensing", "Audit Log Access", "Security Config"],
  },
  {
    name: "Director",
    users: 30,
    color: "#8b5cf6",
    permissions: ["All Apps Access", "Team Management", "Reports & Analytics", "Approvals"],
  },
  {
    name: "Manager",
    users: 20,
    color: "#3b82f6",
    permissions: ["Assigned Apps", "Invite Users", "View Reports", "Manage Deployments"],
  },
  {
    name: "Staff",
    users: 10,
    color: "#64748b",
    permissions: ["Assigned Apps", "View Own Data", "Basic Settings"],
  },
];

export default function RolesPage() {
  return (
    <PrivateLayout>
      <div class="max-w-6xl mx-auto page-enter">
        <div class="mb-8">
          <h1 class="font-display text-2xl font-bold text-text-primary">Roles & Permissions</h1>
          <p class="text-sm text-text-secondary mt-1">Define access levels and manage permission policies.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <For each={roles}>
            {(role) => (
              <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30 hover:border-surface-3 transition-all">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="flex items-center justify-center w-10 h-10 rounded-xl"
                      style={{ "background-color": role.color + "18" }}
                    >
                      <AppIcon icon="lucide:shield-check" size={18} style={{ color: role.color }} />
                    </div>
                    <div>
                      <h3 class="font-display text-sm font-semibold text-text-primary">{role.name}</h3>
                      <p class="text-xs text-text-muted">{role.users} apps access</p>
                    </div>
                  </div>
                  <button type="button" class="p-2 rounded-lg hover:bg-surface-2 text-text-muted hover:text-text-secondary">
                    <AppIcon icon="lucide:settings" size={14} />
                  </button>
                </div>
                <div class="space-y-2">
                  <p class="text-xs font-medium text-text-muted mb-2">Permissions</p>
                  <div class="flex flex-wrap gap-1.5">
                    <For each={role.permissions}>
                      {(perm) => (
                        <span
                          class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs"
                          style={{ background: role.color + "10", color: role.color + "cc" }}
                        >
                          <AppIcon icon="lucide:check" size={10} />
                          {perm}
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </PrivateLayout>
  );
}
