import { createSignal, onMount, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import { useAuth } from "~/shell/context/auth";
import PrivateLayout from "~/shell/layouts/PrivateLayout";
import { usePersonalization } from "~/shell/context/personalization";
import { UsersTab } from "./components/UsersTab";
import { GroupsTab } from "./components/GroupsTab";
import { PermissionsTab } from "./components/PermissionsTab";
import { AuthConfigTab } from "./components/AuthConfigTab";



export default function UserManagementPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const p = usePersonalization();
  const [mounted, setMounted] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal("users");

  onMount(() => {
    if (!auth.isLoggedIn()) { 
      navigate("/user/login", { replace: true }); 
      return; 
    }
    requestAnimationFrame(() => setMounted(true));
  });

  const tabs = [
    { id: "users", label: "Users", icon: "lucide:users" },
    { id: "groups", label: "Groups", icon: "lucide:users-2" },
    { id: "permissions", label: "Permissions", icon: "lucide:shield-half" },
    { id: "auth-config", label: "Auth Config", icon: "lucide:key-round" },
  ];

  const managementNav = [
    { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/apps" },
    { label: "User Management", icon: "lucide:user-cog", path: "/user/management" },
    { label: "User Settings", icon: "lucide:settings", path: "/user/settings" },
  ];

  const managementSearch = [
    { label: "User Management", path: "/user/management", icon: "lucide:user-cog", section: "Admin" },
    { label: "User Settings", path: "/user/settings", icon: "lucide:settings", section: "Settings" },
  ];

  return (
    <Show when={mounted()}>
      <PrivateLayout name={auth.user()?.displayName || "User"} icon="lucide:user-cog" slug="share-insight" nav={managementNav} searchItems={managementSearch}>
        <div class={p.contentWidth() === "wide" ? "page-enter" : "max-w-5xl mx-auto page-enter"}>
          <div class="mb-8">
            <button type="button" onClick={() => navigate(-1)} class="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary mb-4">
              <AppIcon icon="lucide:arrow-left" size={14} /> Back
            </button>
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-brand-dim border border-brand/20 flex items-center justify-center">
                <AppIcon icon="lucide:user-cog" size={32} style={{ color: "var(--color-brand)" }} />
              </div>
              <div>
                <h1 class="font-display text-2xl font-bold text-text-primary">User & App Management</h1>
                <p class="text-sm text-text-secondary">Manage users, roles, permissions, and app access assignments.</p>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mb-6 border-b border-surface-3/30 pb-0">
            <For each={tabs}>
              {(tab) => (
                <button type="button" onClick={() => setActiveTab(tab.id)}
                  class="flex items-center gap-2 px-4 pb-3 text-sm font-medium border-b-2 transition-colors -mb-px"
                  classList={{
                    "border-brand text-brand": activeTab() === tab.id,
                    "border-transparent text-text-secondary hover:text-text-primary": activeTab() !== tab.id,
                  }}>
                  <AppIcon icon={tab.icon} size={16} /> {tab.label}
                </button>
              )}
            </For>
          </div>

          <Show when={activeTab() === "users"}>
            <UsersTab />
          </Show>

          <Show when={activeTab() === "groups"}>
            <GroupsTab />
          </Show>

          <Show when={activeTab() === "permissions"}>
            <PermissionsTab />
          </Show>

          <Show when={activeTab() === "auth-config"}>
            <AuthConfigTab />
          </Show>
        </div>
      </PrivateLayout>
    </Show>
  );
}
