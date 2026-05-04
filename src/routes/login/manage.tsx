import { onMount, For, Show, createSignal } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import Button from "~/components/common/Button";
import Badge from "~/components/common/Badge";
import PrivateLayout from "~/components/common/PrivateLayout";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { ManagementStore } from "~/lib/login/store";
import { getLoginManageNav } from "~/lib/login/nav";
import { useT } from "~/lib/common/i18n";

export default function LoginManagement() {
  const { requireAdmin } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const t = useT("login");

  onMount(() => {
    if (!requireAdmin()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().manageTitle} icon="lucide:globe-lock" slug="superapp" sections={getLoginManageNav(t)}>
        <div class="pb-12">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-brand-dim flex items-center justify-center">
              <AppIcon icon="lucide:globe-lock" size={20} style={{ color: "var(--color-brand)" }} />
            </div>
            <div>
              <h1 class="font-display text-xl font-bold text-text-primary">{t().manageTitle}</h1>
              <p class="text-xs text-text-muted">{t().manageSubtitle}</p>
            </div>
          </div>

          <div class="flex justify-end mb-4">
            <Button icon="lucide:plus">{t().addProvider}</Button>
          </div>

          <div class="space-y-3">
            <For each={ManagementStore.authProviders()}>
              {(provider) => (
                <div class="bg-surface-1 rounded-xl border border-surface-3/30 p-4 flex items-center justify-between hover:border-surface-3/60 transition-colors">
                  <div class="flex items-center gap-4">
                    <div class={`w-10 h-10 rounded-lg flex items-center justify-center ${provider.enabled ? "bg-brand-dim" : "bg-surface-2"}`}>
                      <AppIcon
                        icon={provider.type === "Internal" ? "lucide:database" : provider.type === "LDAP" ? "lucide:server" : "lucide:globe-lock"}
                        size={20}
                        style={{ color: provider.enabled ? "var(--color-brand)" : "var(--color-text-muted)" }}
                      />
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-text-primary">{provider.name}</h3>
                      <div class="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                        <Badge label={provider.type} variant="default" />
                        <span>{provider.userCount} {t().usersLabel}</span>
                        <Show when={provider.lastSync}>
                          <span>{t().lastSync}: {new Date(provider.lastSync!).toLocaleDateString()}</span>
                        </Show>
                      </div>
                    </div>
                  </div>

                  <button
                    class={`relative w-10 h-5 rounded-full transition-colors ${provider.enabled ? "bg-brand" : "bg-surface-3"}`}
                    onClick={() => ManagementStore.toggleProvider(provider.id)}
                  >
                    <span
                      class={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${provider.enabled ? "left-5" : "left-0.5"}`}
                    />
                  </button>
                </div>
              )}
            </For>
          </div>
        </div>
      </PrivateLayout>
    </Show>
  );
}
