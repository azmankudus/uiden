import { createSignal, For, Show } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";
import { createStore } from "solid-js/store";
import type { User } from "../lib/types";
import { UserForm } from "./UserForm";
import { StatusBadge } from "./StatusBadge";
import { RoleBadge } from "./RoleBadge";
import { MANAGEMENT_STORE } from "../lib/store";

export function UsersTab() {
  const [users, setUsers] = createStore<User[]>(MANAGEMENT_STORE.getAllUsers());
  const [selectedUser, setSelectedUser] = createSignal<User | undefined>();
  const [showForm, setShowForm] = createSignal(false);
  const [filter, setFilter] = createSignal("");
  const [selectedRole, setSelectedRole] = createSignal<string>("all");

  const handleAdd = () => {
    setSelectedUser(undefined);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const success = MANAGEMENT_STORE.deleteUser(id);
      if (success) {
        setUsers(users.filter(u => u.id !== id));
      }
    }
  };

  const handleSubmit = (userData: Omit<User, "id" | "createdAt" | "lastLoginAt">) => {
    if (selectedUser()) {
      const updated = MANAGEMENT_STORE.updateUser(selectedUser()!.id, userData);
      if (updated) {
        setUsers(users.map(u => u.id === selectedUser()!.id ? updated : u));
        setSelectedUser(undefined);
      }
    } else {
      const newUser = MANAGEMENT_STORE.createUser(userData);
      if (newUser) {
        setUsers([...users, newUser]);
      }
    }
    setShowForm(false);
  };

  const filteredUsers = () => {
    let result = users;
    if (filter()) {
      const f = filter().toLowerCase();
      result = result.filter(u => 
        u.username.toLowerCase().includes(f) ||
        u.email.toLowerCase().includes(f) ||
        u.displayName.toLowerCase().includes(f)
      );
    }
    if (selectedRole() !== "all") {
      result = result.filter(u => u.role === selectedRole());
    }
    return result;
  };

  return (
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Users</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={handleAdd}
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          <AppIcon name="plus" class="w-4 h-4" />
          Add User
        </button>
      </div>

      <div class="flex gap-4">
        <div class="flex-1">
          <div class="relative">
            <AppIcon name="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={filter()}
              onInput={(e) => setFilter(e.currentTarget.value)}
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <select
          value={selectedRole()}
          onInput={(e) => setSelectedRole(e.currentTarget.value)}
          class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="all">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Guest">Guest</option>
        </select>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Login
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <For each={filteredUsers()}>
                {(user) => (
                  <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <AppIcon name="user" class="w-5 h-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {user.displayName}
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            {user.email} • {user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <RoleBadge role={user.role} />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={user.status} />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>

      <UserForm
        user={selectedUser()}
        onSubmit={handleSubmit}
        onCancel={() => {
          setShowForm(false);
          setSelectedUser(undefined);
        }}
        isOpen={showForm()}
      />
    </div>
  );
}