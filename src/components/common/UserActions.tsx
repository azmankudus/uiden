import { Show, createSignal, createMemo, For, onMount, onCleanup } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import AppLogo from "~/components/common/AppLogo";
import { useTheme } from "~/lib/common/theme";
import { useAuth } from "~/lib/common/auth";
import { APPS, appColor } from "~/lib/apps/apps";
import { BRAND, ROUTES } from "~/lib/common/branding";
import { createFilteredApps } from "~/lib/apps/filtered-apps";
import { useT } from "~/lib/common/i18n";

export default function UserActions(props: { showHome?: boolean; appHome?: string }) {
  const { theme, toggle } = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();
  const t = useT("common");
  const [helpOpen, setHelpOpen] = createSignal(false);
  const [profileOpen, setProfileOpen] = createSignal(false);
  const [appsOpen, setAppsOpen] = createSignal(false);
  const [appsFilter, setAppsFilter] = createSignal("");
  let containerRef!: HTMLDivElement;

  const closeAll = () => {
    setHelpOpen(false);
    setProfileOpen(false);
    setAppsOpen(false);
    setAppsFilter("");
  };

  const appsSource = () => auth.isLoggedIn() ? auth.userApps() : APPS;
  const filteredApps = createFilteredApps(appsSource, appsFilter);

  const handleLogout = () => {
    closeAll();
    auth.logout();
    navigate("/", { replace: true });
  };

  onMount(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("click", handler, true);
    onCleanup(() => document.removeEventListener("click", handler, true));
  });

  return (
    <div ref={containerRef} class="flex items-center gap-1">
      <Show when={props.showHome}>
        <A
          href={ROUTES.apps}
          title={t().home}
          class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-brand hover:bg-surface-2"
        >
          <AppIcon icon="lucide:house" size={22} />
        </A>
      </Show>
      <Show when={props.appHome}>
        <A
          href={props.appHome!}
          title={t().home}
          class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-brand hover:bg-surface-2"
        >
          <AppIcon icon="lucide:house" size={22} />
        </A>
      </Show>

      <div class="relative">
        <button
          type="button"
          title={t().navDashboard}
          onClick={() => { setAppsOpen((v) => !v); setHelpOpen(false); setProfileOpen(false); }}
          class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-brand hover:bg-surface-2"
        >
          <AppIcon icon="lucide:layout-grid" size={22} />
        </button>
        <Show when={appsOpen()}>
          <div class="dropdown-panel absolute right-0 top-12 w-[360px] bg-surface-1 border border-surface-3 rounded-2xl shadow-xl z-50 overflow-hidden">
            <div class="p-3 border-b border-surface-3 flex items-center gap-2">
              <A
                href={ROUTES.apps}
                onClick={closeAll}
                class="flex items-center justify-center w-8 h-8 rounded-lg text-text-secondary hover:text-brand hover:bg-surface-2"
                title={t().home}
              >
                <AppIcon icon="lucide:house" size={16} />
              </A>
              <div class="flex items-center bg-surface-0 border border-surface-3 rounded-xl px-3 py-2 flex-1">
                <span class="text-text-muted mr-2">
                  <AppIcon icon="lucide:search" size={16} />
                </span>
                <input
                  type="text"
                  placeholder={t().searchApps}
                  value={appsFilter()}
                  onInput={(e) => setAppsFilter(e.currentTarget.value)}
                  class="w-full bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
                />
                {appsFilter() && (
                  <button type="button" onClick={() => setAppsFilter("")} class="text-text-muted hover:text-text-secondary">
                    <AppIcon icon="lucide:x" size={14} />
                  </button>
                )}
              </div>
            </div>
            <div class="p-3 max-h-[320px] overflow-y-auto">
              <div class="grid grid-cols-4 gap-1">
                <For each={filteredApps()}>
                  {(app) => {
                    const c = appColor(app._i);
                    return (
                      <A
                        href={`/${app.slug}/public`}
                        onClick={closeAll}
                        class="flex flex-col items-center gap-1.5 rounded-xl py-2.5 px-1 hover:bg-surface-2 group"
                      >
                        <div class="flex items-center justify-center w-10 h-10 rounded-lg transition-transform group-hover:scale-110">
                          <AppLogo slug={app.slug} size={40} />
                        </div>
                        <span class="text-xs leading-tight text-text-secondary group-hover:text-text-primary text-center truncate w-full">
                          {app.name}
                        </span>
                      </A>
                    );
                  }}
                </For>
              </div>
              {filteredApps().length === 0 && (
                <p class="text-center text-xs text-text-muted py-6">{t().noAppsFound}</p>
              )}
            </div>
          </div>
        </Show>
      </div>

      <div class="relative">
        <button
          type="button"
          title={t().helpBadge}
          onClick={() => { setHelpOpen((v) => !v); setProfileOpen(false); setAppsOpen(false); }}
          class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-2"
        >
          <AppIcon icon="lucide:circle-question-mark" size={22} />
        </button>
        <Show when={helpOpen()}>
          <div class="dropdown-panel absolute right-0 top-12 w-72 bg-surface-1 border border-surface-3 rounded-2xl shadow-xl p-4 z-50">
            <h3 class="text-sm font-semibold text-text-primary mb-2">{t().helpInfo}</h3>
            <p class="text-xs text-text-secondary leading-relaxed mb-3">
              {BRAND.shortName} {BRAND.tagline} is {BRAND.description}.
            </p>
            <div class="border-t border-surface-3 pt-3 space-y-1.5">
              <p class="text-xs text-text-secondary flex items-center gap-2">
                <AppIcon icon="lucide:mail" size={14} />
                support@kentut.superapp
              </p>
              <p class="text-xs text-text-secondary flex items-center gap-2">
                <AppIcon icon="lucide:book-open" size={14} />
                docs.kentut.superapp
              </p>
            </div>
          </div>
        </Show>
      </div>

      <button
        type="button"
        title={theme() === "dark" ? t().switchToLight : t().switchToDark}
        onClick={toggle}
        class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-2"
      >
        <Show
          when={theme() === "dark"}
          fallback={<AppIcon icon="lucide:moon" size={22} />}
        >
          <AppIcon icon="lucide:sun" size={22} />
        </Show>
      </button>

      <Show when={auth.isLoggedIn()} fallback={
        <A href="/login" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-brand text-surface-0 hover:brightness-110">
          <AppIcon icon="lucide:log-in" size={16} /><span class="hidden sm:inline">{t().signIn}</span>
        </A>
      }>
        <div class="relative">
          <button
            type="button"
            title={t().navOverview}
            onClick={() => { setProfileOpen((v) => !v); setHelpOpen(false); setAppsOpen(false); }}
            class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-dim border border-brand/30 text-brand hover:bg-brand/20"
          >
            <AppIcon icon="lucide:circle-user" size={24} style={{ color: "var(--color-brand)" }} />
          </button>
          <Show when={profileOpen()}>
            <div class="dropdown-panel absolute right-0 top-12 w-56 bg-surface-1 border border-surface-3 rounded-2xl shadow-xl p-3 z-50">
              <div class="flex items-center gap-3 mb-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-dim border border-brand/30">
                  <AppIcon icon="lucide:circle-user" size={22} style={{ color: "var(--color-brand)" }} />
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-text-primary truncate">{auth.user()?.displayName}</p>
                  <p class="text-xs text-text-secondary">{auth.user()?.role} · {auth.user()?.appCount} {t().appsCount}</p>
                </div>
              </div>
              <div class="border-t border-surface-3 pt-2 space-y-0.5">
                <Show when={auth.user()?.role === "Admin"}>
                  <A
                    href={ROUTES.appManage}
                    onClick={closeAll}
                    class="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                  >
                    <AppIcon icon="lucide:boxes" size={16} style={{ color: "var(--color-text-secondary)" }} />
                    {t().appManagement}
                  </A>
                  <A
                    href={ROUTES.loginManage}
                    onClick={closeAll}
                    class="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                  >
                    <AppIcon icon="lucide:globe-lock" size={16} style={{ color: "var(--color-text-secondary)" }} />
                    {t().loginManagement}
                  </A>
                  <div class="border-t border-surface-3 my-1" />
                </Show>
                <A
                  href="/users/account"
                  onClick={closeAll}
                  class="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                >
                  <AppIcon icon="lucide:settings" size={16} style={{ color: "var(--color-text-secondary)" }} />
                  {t().userSettings}
                </A>
                <button
                  type="button"
                  onClick={handleLogout}
                  class="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <AppIcon icon="lucide:log-out" size={16} style={{ color: "#f87171" }} />
                  {t().logout}
                </button>
              </div>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}
