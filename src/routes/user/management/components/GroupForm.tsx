import { createSignal, Show } from "solid-js";
import type { Group } from "../lib/types";

interface GroupFormProps {
  group?: Group;
  onSubmit: (group: Omit<Group, "id" | "createdAt">) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function GroupForm(props: GroupFormProps) {
  const [name, setName] = createSignal(props.group?.name || "");
  const [description, setDescription] = createSignal(props.group?.description || "");
  const [users, setUsers] = createSignal<string[]>(props.group?.users || []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onSubmit({
      name: name(),
      description: description(),
      users: users(),
    });
  };

  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {props.group ? "Edit Group" : "Add New Group"}
            </h2>
            <form onSubmit={handleSubmit} class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  value={name()}
                  onInput={(e) => setName(e.currentTarget.value)}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={description()}
                  onInput={(e) => setDescription(e.currentTarget.value)}
                  rows={3}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Users
                </label>
                <input
                  type="text"
                  value={users().join(", ")}
                  onInput={(e) => setUsers(e.currentTarget.value.split(",").map(u => u.trim()).filter(u => u))}
                  placeholder="Enter usernames separated by commas"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Enter usernames of users to include in this group
                </p>
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
                  {props.group ? "Update Group" : "Add Group"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Show>
  );
}