import { createSignal, Show } from "solid-js";
import type { User } from "../lib/types";

interface UserFormProps {
  user?: User;
  onSubmit: (user: Omit<User, "id" | "createdAt" | "lastLogin">) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function UserForm(props: UserFormProps) {
  const [email, setEmail] = createSignal(props.user?.email || "");
  const [username, setUsername] = createSignal(props.user?.username || "");
  const [displayName, setDisplayName] = createSignal(props.user?.displayName || "");
  const [role, setRole] = createSignal<string>(props.user?.role || "User");
  const [status, setStatus] = createSignal<"active" | "inactive" | "suspended">(props.user?.status || "active");
  const [groups, setGroups] = createSignal<string[]>(props.user?.groups || []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onSubmit({
      email: email(),
      username: username(),
      displayName: displayName(),
      role: role(),
      status: status(),
      groups: groups(),
    });
  };

  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {props.user ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleSubmit} class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName()}
                  onInput={(e) => setDisplayName(e.currentTarget.value)}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username()}
                  onInput={(e) => setUsername(e.currentTarget.value)}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={role()}
                    onInput={(e) => setRole(e.currentTarget.value as any)}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Guest">Guest</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={status()}
                    onInput={(e) => setStatus(e.currentTarget.value as any)}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Groups
                </label>
                <input
                  type="text"
                  value={groups().join(", ")}
                  onInput={(e) => setGroups(e.currentTarget.value.split(",").map(g => g.trim()).filter(g => g))}
                  placeholder="Enter group names separated by commas"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div class="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={props.onCancel}
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {props.user ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Show>
  );
}