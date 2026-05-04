import { createSignal, onMount, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import AppLogo from "~/components/common/AppLogo";
import { useAuth } from "~/lib/common/auth";
import { APPS } from "~/lib/apps/apps";
import { createFilteredApps } from "~/lib/apps/filtered-apps";
import { AppStatusStore } from "~/lib/apps/status-store";
import { useT } from "~/lib/common/i18n";

function AppStatusBadge(props: { status: string; maintenanceFrom?: string; maintenanceTo?: string }) {
  const t = useT("apps");
  const label = () => {
    if (props.status === "error") return t().statusError;
    if (props.status === "down") return t().statusDown;
    if (props.status === "hide") return t().statusHidden;
    if (props.status === "maintenance") return t().statusMaintenance;
    return "";
  };
  return (
    <Show when={props.status !== "online" && props.status !== "ok"}>
      <div class="flex items-center gap-1.5 mt-2">
        <span
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider"
          classList={{
            "bg-red-500/15 text-red-400 border border-red-500/25": props.status === "down",
            "bg-amber-500/15 text-amber-400 border border-amber-500/25": props.status === "maintenance",
            "bg-orange-500/15 text-orange-400 border border-orange-500/25": props.status === "error",
            "bg-slate-500/15 text-slate-400 border border-slate-500/25": props.status === "hide",
          }}
        >
          <AppIcon
            icon={props.status === "down" ? "lucide:x" : props.status === "maintenance" ? "lucide:wrench" : props.status === "error" ? "lucide:circle-alert" : "lucide:eye-off"}
            size={12}
          />
          {label()}
        </span>
        <Show when={props.status === "maintenance" && props.maintenanceTo}>
          <span class="text-[11px] text-text-muted">
            {t().until} {props.maintenanceTo}
          </span>
        </Show>
      </div>
    </Show>
  );
}

function AppCardOverlay(props: { status: string }) {
  const t = useT("apps");
  const isDown = () => props.status === "down" || props.status === "error";
  const label = () => {
    if (props.status === "down") return t().statusDown;
    if (props.status === "error") return t().statusError;
    if (props.status === "maintenance") return t().statusMaintenance;
    return "";
  };
  return (
    <Show when={props.status !== "online" && props.status !== "ok"}>
      <Show when={props.status !== "hide"}>
        <div
          class="absolute inset-0 z-10 rounded-2xl flex items-center justify-center transition-opacity duration-300"
          classList={{
            "bg-surface-0/70 backdrop-blur-[2px]": props.status === "maintenance",
            "bg-surface-0/80 backdrop-blur-[3px]": isDown(),
          }}
        >
          <div class="text-center">
            <AppIcon
              icon={isDown() ? "lucide:x" : "lucide:wrench"}
              size={32}
              classList={{
                "text-red-400": props.status === "down",
                "text-orange-400": props.status === "error",
                "text-amber-400": props.status === "maintenance",
              }}
            />
            <p class="mt-1.5 text-xs font-semibold" classList={{
              "text-red-400": props.status === "down",
              "text-orange-400": props.status === "error",
              "text-amber-400": props.status === "maintenance",
            }}>
              {label()}
            </p>
          </div>
        </div>
      </Show>
    </Show>
  );
}

export default function AppsGrid() {
  const t = useT("apps");
  const auth = useAuth();
  const [filter, setFilter] = createSignal("");
  const [mounted, setMounted] = createSignal(false);
  const [showAll, setShowAll] = createSignal(false);

  onMount(() => {
    requestAnimationFrame(() => setMounted(true));
  });

  const source = () => {
    if (!auth.isLoggedIn()) return APPS;
    return showAll() ? APPS : auth.userApps();
  };
  const filtered = createFilteredApps(source, filter);

  return (
    <div class="min-h-dvh bg-surface-0 overflow-hidden">
      <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          class="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)" }}
        />
        <div
          class="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />
      </div>

      <div class="relative z-10 px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pb-20">
        <div
          class="text-center mt-5 mb-6 max-w-2xl mx-auto"
          classList={{
            "animate-fade-up": mounted(),
            "opacity-0": !mounted(),
          }}
          style={{ "animation-delay": "100ms" }}
        >
          <Show
            when={auth.isLoggedIn()}
            fallback={
              <p class="text-lg sm:text-xl text-text-secondary leading-relaxed">
                {t().welcomeTo} <span class="text-brand font-semibold">{t().brandName}</span>
              </p>
            }
          >
            <p class="text-lg sm:text-xl text-text-secondary leading-relaxed">
              {t().welcomeUser} <span class="text-brand font-semibold">{auth.user()?.displayName}</span>!
            </p>
          </Show>
        </div>

        <Show when={auth.isLoggedIn()}>
          <div
            class="flex items-center justify-center gap-3 mb-8"
            classList={{
              "animate-fade-up": mounted(),
              "opacity-0": !mounted(),
            }}
            style={{ "animation-delay": "130ms" }}
          >
            <button
              onClick={() => setShowAll(false)}
              class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              classList={{
                "bg-brand/15 text-brand border border-brand/30": !showAll(),
                "bg-surface-1 text-text-muted border border-surface-3 hover:text-text-secondary": showAll(),
              }}
            >
              {t().myApps} ({auth.userApps().length})
            </button>
            <button
              onClick={() => setShowAll(true)}
              class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              classList={{
                "bg-brand/15 text-brand border border-brand/30": showAll(),
                "bg-surface-1 text-text-muted border border-surface-3 hover:text-text-secondary": !showAll(),
              }}
            >
              {t().allApps} ({APPS.length})
            </button>
          </div>
        </Show>

        <div
          class="max-w-xl mx-auto mb-14"
          classList={{
            "animate-fade-up": mounted(),
            "opacity-0": !mounted(),
          }}
          style={{ "animation-delay": "150ms" }}
        >
          <div class="relative group">
            <div class="absolute inset-0 rounded-2xl bg-brand-dim blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div class="relative flex items-center bg-surface-1 border border-surface-3 rounded-2xl overflow-hidden transition-colors duration-300 group-focus-within:border-brand/50">
              <span class="pl-5 text-text-muted">
                <AppIcon icon="lucide:search" size={20} />
              </span>
              <input
                type="text"
                placeholder={t().filterApps}
                value={filter()}
                onInput={(e) => setFilter(e.currentTarget.value)}
                class="w-full bg-transparent text-text-primary placeholder-text-muted px-4 py-4 text-base outline-none"
              />
              {filter() && (
                <button
                  onClick={() => setFilter("")}
                  class="pr-4 text-text-muted hover:text-text-primary transition-colors"
                >
                  <AppIcon icon="lucide:x" size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          class="grid gap-3 sm:gap-4"
          style={{ "grid-template-columns": "repeat(auto-fill, minmax(min(100%, 300px), 1fr))" }}
        >
          <For each={filtered()}>
            {(app, i) => {
              const st = () => AppStatusStore.getStatus(app.slug);
              const isVisible = () => st().status !== "hide";
              const isOk = () => st().status === "online";
              return (
                <A
                  href={isOk() ? `/${app.slug}/public` : "#"}
                  class="relative group flex items-start gap-4 rounded-2xl bg-surface-1/80 border border-surface-3/60 p-4 sm:p-5 transition-all duration-200"
                  classList={{
                    "animate-scale-in": mounted(),
                    "opacity-0": !mounted(),
                    "cursor-pointer hover:border-brand/40 hover:bg-surface-2 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/5 active:scale-[0.98] active:translate-y-0": isOk(),
                    "cursor-not-allowed hover:border-red-500/30": !isOk(),
                    "hidden": !isVisible(),
                  }}
                  onClick={(e) => { if (!isOk()) e.preventDefault(); }}
                  style={{ "animation-delay": `${200 + i() * 20}ms` }}
                >
                  <AppCardOverlay status={st().status} />
                  <div class="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl transition-transform duration-300 group-hover:scale-110">
                    <AppLogo slug={app.slug} size={56} />
                  </div>
                  <div class="min-w-0 flex-1 pt-0.5">
                    <h3 class="text-base font-semibold text-text-primary group-hover:text-brand transition-colors truncate">
                      {app.name}
                    </h3>
                    <p class="text-sm text-text-muted mt-0.5 leading-snug line-clamp-2">
                      {app.desc}
                    </p>
                    <AppStatusBadge status={st().status} maintenanceFrom={st().maintenanceFrom} maintenanceTo={st().maintenanceTo} />
                  </div>
                  <Show when={isOk()}>
                    <span class="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-text-muted">
                      <AppIcon icon="lucide:chevron-right" size={18} />
                    </span>
                  </Show>
                </A>
              );
            }}
          </For>
        </div>

        {filtered().length === 0 && (
          <div class="text-center py-20 animate-fade-in">
            <AppIcon icon="lucide:search-x" size={48} style={{ color: "var(--color-text-muted)" }} />
            <p class="mt-4 text-text-muted text-lg">{t().noAppsMatch} &ldquo;<span class="text-text-secondary">{filter()}</span>&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
