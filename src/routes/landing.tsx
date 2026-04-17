import { createSignal, onMount, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import AppLogo from "~/shell/lib/app-logo";
import { useAuth } from "~/shell/context/auth";
import { appColor } from "~/gateway/lib/apps";
import { createFilteredApps } from "~/gateway/lib/filtered-apps";

export default function Landing() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = createSignal("");
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    if (!auth.isLoggedIn()) {
      navigate("/user/login", { replace: true });
      return;
    }
    requestAnimationFrame(() => setMounted(true));
  });

  const filtered = createFilteredApps(auth.userApps, filter);

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
          class="text-center mb-10 max-w-2xl mx-auto"
          classList={{
            "animate-fade-up": mounted(),
            "opacity-0": !mounted(),
          }}
          style={{ "animation-delay": "100ms" }}
        >
          <p class="text-lg sm:text-xl text-text-secondary leading-relaxed">
            Welcome, <span class="text-brand font-semibold">{auth.user()?.displayName}</span>! You have access to{" "}
            <span class="text-text-primary font-medium">{auth.userApps().length}</span> apps.
          </p>
        </div>

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
                placeholder="Filter apps..."
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
              const c = appColor(app._i);
              return (
                <div
                  class="group flex items-start gap-4 rounded-2xl bg-surface-1/80 border border-surface-3/60 p-4 sm:p-5 cursor-pointer transition-all duration-200 hover:border-brand/40 hover:bg-surface-2 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/5 active:scale-[0.98] active:translate-y-0"
                  classList={{
                    "animate-scale-in": mounted(),
                    "opacity-0": !mounted(),
                  }}
                  style={{ "animation-delay": `${200 + i() * 20}ms` }}
                >
                  <div
                    class="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl transition-transform duration-300 group-hover:scale-110"
                  >
                    <AppLogo slug={app.slug} size={56} />
                  </div>
                  <div class="min-w-0 flex-1 pt-0.5">
                    <h3 class="text-base font-semibold text-text-primary group-hover:text-brand transition-colors truncate">
                      {app.name}
                    </h3>
                    <p class="text-sm text-text-muted mt-0.5 leading-snug line-clamp-2">
                      {app.desc}
                    </p>
                  </div>
                  <span class="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-text-muted">
                    <AppIcon icon="lucide:chevron-right" size={18} />
                  </span>
                </div>
              );
            }}
          </For>
        </div>

        {filtered().length === 0 && (
          <div class="text-center py-20 animate-fade-in">
            <AppIcon icon="lucide:search-x" size={48} class="text-text-muted" />
            <p class="mt-4 text-text-muted text-lg">No apps match "<span class="text-text-secondary">{filter()}</span>"</p>
          </div>
        )}
      </div>
    </div>
  );
}
