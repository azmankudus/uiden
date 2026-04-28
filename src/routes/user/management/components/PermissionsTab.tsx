import { createSignal, For, Show } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";
import type { RolePermission } from "../lib/types";
import { MANAGEMENT_STORE } from "../lib/store";

export function PermissionsTab() {
  const [permissions, setPermissions] = createSignal<RolePermission[]>(
    MANAGEMENT_STORE.getAllRolePermissions()
  );

  const roles = ["Admin", "User", "Guest"];
  const permissionActions = ["read", "write", "delete", "update"];

  const handleTogglePermission = (role: string, resource: string, action: string) => {
    const updatedPermission = MANAGEMENT_STORE.updateRolePermission(role, resource, action);
    if (updatedPermission) {
      setPermissions(prev => prev.map(p => 
        p.role === role && p.resource === resource ? updatedPermission : p
      ));
    }
  };

  const handleToggleAllForResource = (resource: string, action: string, value: boolean) => {
    const updated = [];
    for (const role of roles) {
      const perm = permissions().find(p => p.role === role && p.resource === resource);
      if (perm) {
        const updatedPerm = MANAGEMENT_STORE.updateRolePermission(role, resource, action);
        if (updatedPerm) {
          updated.push(updatedPerm);
        }
      }
    }
    if (updated.length > 0) {
      setPermissions(prev => prev.map(p => {
        const update = updated.find(u => u.role === p.role && u.resource === p.resource);
        return update || p;
      }));
    }
  };

  const permissionForRole = (role: string, resource: string, action: string) => {
    const perm = permissions().find(p => p.role === role && p.resource === resource);
    return perm ? perm.permissions[action] || false : false;
  };

  return (
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Permissions</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Configure role-based access control for resources
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Resource
                </th>
                <For each={roles}>
                  {(role) => (
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {role}
                    </th>
                  )}
                </For>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <For each={["users", "groups", "settings", "files", "audit"]}>
                {(resource) => (
                  <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      <div class="flex items-center gap-2">
                        <span class="capitalize">{resource}</span>
                        <Show when={resource === "settings"}>
                          <span class="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                            System
                          </span>
                        </Show>
                      </div>
                    </td>
                    <For each={roles}>
                      {(role) => (
                        <td class="px-6 py-4">
                          <div class="grid grid-cols-2 gap-2">
                            <For each={permissionActions.slice(0, 2)}>
                              {(action) => (
                                <button
                                  onClick={() => handleTogglePermission(role, resource, action)}
                                  class={`flex items-center justify-center gap-1 px-2 py-1 rounded text-xs ${
                                    permissionForRole(role, resource, action)
                                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                  }`}
                                >
                                  <AppIcon name={
                                    permissionForRole(role, resource, action) 
                                      ? "check-circle" 
                                      : "circle"
                                  } class="w-3 h-3" />
                                  {action}
                                </button>
                              )}
                            </For>
                            <For each={permissionActions.slice(2)}>
                              {(action) => (
                                <button
                                  onClick={() => handleTogglePermission(role, resource, action)}
                                  class={`flex items-center justify-center gap-1 px-2 py-1 rounded text-xs ${
                                    permissionForRole(role, resource, action)
                                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                  }`}
                                >
                                  <AppIcon name={
                                    permissionForRole(role, resource, action) 
                                      ? "check-circle" 
                                      : "circle"
                                  } class="w-3 h-3" />
                                  {action}
                                </button>
                              )}
                            </For>
                          </div>
                        </td>
                      )}
                    </For>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <div class="flex flex-col gap-1">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Quick actions:
                        </span>
                        <div class="flex gap-1">
                          <button
                            onClick={() => handleToggleAllForResource(resource, "read", true)}
                            class="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs hover:bg-blue-100 dark:hover:bg-blue-900/50"
                          >
                            Grant all read
                          </button>
                          <button
                            onClick={() => handleToggleAllForResource(resource, "write", true)}
                            class="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs hover:bg-green-100 dark:hover:bg-green-900/50"
                          >
                            Grant all write
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div class="flex items-start gap-3">
          <AppIcon name="info" class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div class="text-sm text-blue-800 dark:text-blue-300">
            <h3 class="font-medium mb-1">Permission Guidelines</h3>
            <ul class="list-disc pl-4 space-y-1">
              <li>Admins typically have full access to all resources</li>
              <li>Users can read and write to most resources, but not delete system settings</li>
              <li>Guests typically have read-only access</li>
              <li>Changes are automatically saved to local storage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}