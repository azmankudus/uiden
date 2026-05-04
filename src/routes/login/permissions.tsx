import { createSignal, onMount, For, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import PrivateLayout from "~/components/common/PrivateLayout";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { getLoginUsersNav } from "~/lib/users/nav";
import { useT } from "~/lib/common/i18n";

const PERMISSIONS = ["Dashboard", "HR Portal", "Finance", "Reports", "Audit Log"];
const ROLES = ["Admin", "Director", "Manager", "Staff", "Auditor"];
const ACTIONS = ["Read", "Write", "Delete", "Update"] as const;

export default function PermissionsPage() {
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const t = useT("login");

  const permLabel = (): Record<string, string> => ({
    "Dashboard": t().permDashboard,
    "HR Portal": t().permHrPortal,
    "Finance": t().permFinance,
    "Reports": t().permReports,
    "Audit Log": t().permAuditLog,
  });

  const roleLabel = (): Record<string, string> => ({
    "Admin": t().roleAdmin,
    "Director": t().roleDirector,
    "Manager": t().roleManager,
    "Staff": t().roleStaff,
    "Auditor": t().roleAuditor,
  });

  const actionLabel = (): Record<string, string> => ({
    "Read": t().actionRead,
    "Write": t().actionWrite,
    "Delete": t().actionDelete,
    "Update": t().actionUpdate,
  });

  const [perms, setPerms] = createSignal<Record<string, Record<string, Record<string, boolean>>>>({
    Admin: Object.fromEntries(PERMISSIONS.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, true]))])),
    Director: Object.fromEntries(PERMISSIONS.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, a === "Read" || a === "Update"]))])),
    Manager: Object.fromEntries(PERMISSIONS.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, a === "Read" || a === "Write"]))])),
    Staff: Object.fromEntries(PERMISSIONS.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, a === "Read"]))])),
    Auditor: Object.fromEntries(PERMISSIONS.map(r => [r, Object.fromEntries(ACTIONS.map(a => [a, a === "Read"]))])),
  });

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const togglePerm = (role: string, resource: string, action: string) => {
    setPerms(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [resource]: {
          ...prev[role][resource],
          [action]: !prev[role]?.[resource]?.[action],
        },
      },
    }));
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().permissionsTitle} icon="lucide:shield" slug="superapp" sections={getLoginUsersNav(t)}>
        <div class="pb-12">
          <div class="flex items-center gap-3 mb-2">
            <AppIcon icon="lucide:shield" size={32} style={{ color: "var(--color-brand)" }} />
            <h1 class="text-2xl font-bold">{t().permissionsTitle}</h1>
          </div>
          <p class="text-text-secondary mb-8">{t().managePermissions}</p>

          <h2 class="text-lg font-semibold mb-4">{t().permissionsMatrix}</h2>
          <div class="bg-surface-1 rounded-lg border border-surface-2 overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-surface-2 text-text-muted">
                <tr>
                  <th class="text-left px-4 py-3">{t().colRole}</th>
                  <For each={PERMISSIONS}>
                    {(resource) => <th class="text-center px-2 py-3 text-xs">{permLabel()[resource]}</th>}
                  </For>
                </tr>
              </thead>
              <tbody>
                <For each={ROLES}>
                  {(role) => (
                    <tr class="border-t border-surface-2">
                      <td class="px-4 py-3 font-medium">{roleLabel()[role]}</td>
                      <For each={PERMISSIONS}>
                        {(resource) => (
                          <td class="px-2 py-3">
                            <div class="flex flex-wrap justify-center gap-1">
                              <For each={ACTIONS}>
                                {(action) => (
                                  <button
                                    class={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${perms()[role]?.[resource]?.[action] ? "bg-brand/20 text-brand" : "bg-surface-2 text-text-muted"}`}
                                    onClick={() => togglePerm(role, resource, action)}
                                  >
                                    {actionLabel()[action]}
                                  </button>
                                )}
                              </For>
                            </div>
                          </td>
                        )}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </PrivateLayout>
    </Show>
  );
}
