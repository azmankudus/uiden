import { createSignal, For, Show } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";
import { createStore } from "solid-js/store";
import type { Group } from "../lib/types";
import { GroupForm } from "./GroupForm";
import { MANAGEMENT_STORE } from "../lib/store";

export function GroupsTab() {
  const [groups, setGroups] = createStore<Group[]>(MANAGEMENT_STORE.getAllGroups());
  const [selectedGroup, setSelectedGroup] = createSignal<Group | undefined>();
  const [showForm, setShowForm] = createSignal(false);
  const [filter, setFilter] = createSignal("");

  const handleAdd = () => {
    setSelectedGroup(undefined);
    setShowForm(true);
  };

  const handleEdit = (group: Group) => {
    setSelectedGroup(group);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this group?")) {
      const success = MANAGEMENT_STORE.deleteGroup(id);
      if (success) {
        setGroups(groups.filter(g => g.id !== id));
      }
    }
  };

  const handleSubmit = (groupData: Omit<Group, "id" | "createdAt">) => {
    if (selectedGroup()) {
      const updated = MANAGEMENT_STORE.updateGroup(selectedGroup()!.id, groupData);
      if (updated) {
        setGroups(groups.map(g => g.id === selectedGroup()!.id ? updated : g));
        setSelectedGroup(undefined);
      }
    } else {
      const newGroup = MANAGEMENT_STORE.createGroup(groupData);
      if (newGroup) {
        setGroups([...groups, newGroup]);
      }
    }
    setShowForm(false);
  };

  const filteredGroups = () => {
    if (!filter()) return groups;
    const f = filter().toLowerCase();
    return groups.filter(g => 
      g.name.toLowerCase().includes(f) ||
      g.description.toLowerCase().includes(f)
    );
  };

  return (
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Groups</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Manage user groups and memberships</p>
        </div>
        <button
          onClick={handleAdd}
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          <AppIcon name="plus" class="w-4 h-4" />
          Add Group
        </button>
      </div>

      <div class="relative">
        <AppIcon name="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search groups..."
          value={filter()}
          onInput={(e) => setFilter(e.currentTarget.value)}
          class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <For each={filteredGroups()}>
          {(group) => (
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1 min-w-0">
                  <h3 class="text-md font-medium text-gray-900 dark:text-gray-100 truncate">
                    {group.name}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {group.description}
                  </p>
                </div>
                <div class="flex gap-2 ml-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(group)}
                    class="p-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <AppIcon name="edit" class="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(group.id)}
                    class="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <AppIcon name="trash" class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span class="flex items-center gap-1">
                  <AppIcon name="users" class="w-4 h-4" />
                  {group.users.length} members
                </span>
                <span>
                  Created: {new Date(group.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </For>
      </div>

      <GroupForm
        group={selectedGroup()}
        onSubmit={handleSubmit}
        onCancel={() => {
          setShowForm(false);
          setSelectedGroup(undefined);
        }}
        isOpen={showForm()}
      />
    </div>
  );
}