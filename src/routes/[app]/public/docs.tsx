import { createSignal, onMount, Show } from "solid-js";
import { useParams, useNavigate, A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import AppLogo from "~/components/common/AppLogo";
import { APPS } from "~/lib/apps/apps";
import { ROUTES } from "~/lib/common/branding";

export default function AppDocs() {
  const params = useParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);

  const app = () => APPS.find(a => a.slug === params.app);

  onMount(() => {
    if (!app()) { navigate(ROUTES.apps, { replace: true }); return; }
    requestAnimationFrame(() => setMounted(true));
  });

  const brandColor = () => app()?.brandColor || "var(--color-brand)";

  return (
    <Show when={app()}>
      {(a) => (
        <div class="min-h-dvh bg-surface-0">
          <header class="flex items-center gap-3 px-5 h-[60px] bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
            <AppLogo slug={a().slug} size={32} />
            <span class="font-display text-lg font-bold" style={{ color: brandColor() }}>{a().name}</span>
            <span class="text-xs text-text-muted px-2 py-0.5 rounded bg-surface-2 border border-surface-3">Docs</span>
            <div class="flex-1" />
            <A href={ROUTES.apps} class="text-sm text-text-muted hover:text-text-primary transition-colors">
              <AppIcon icon="lucide:house" size={18} />
            </A>
          </header>

          <main class="max-w-3xl mx-auto px-6 py-12">
            <div classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}>
              <h1 class="font-display text-3xl font-extrabold text-text-primary mb-2">Documentation</h1>
              <p class="text-text-secondary mb-8">Guides and references for {a().name}.</p>

              <div class="space-y-4">
                <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
                  <div class="flex items-center gap-3 mb-3">
                    <AppIcon icon="lucide:book-open" size={20} style={{ color: brandColor() }} />
                    <h2 class="font-display text-lg font-semibold text-text-primary">Getting Started</h2>
                  </div>
                  <p class="text-sm text-text-secondary">How to configure and use {a().name}.</p>
                </div>

                <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
                  <AppIcon icon="lucide:file-text" size={32} style={{ color: "var(--color-text-muted)" }} />
                  <p class="mt-3 text-sm text-text-muted">Full documentation for {a().name} will appear here.</p>
                </div>
              </div>

              <div class="mt-8 flex gap-4">
                <A href={`/${a().slug}/public`} class="text-sm text-brand hover:underline">&larr; Back to {a().name}</A>
              </div>
            </div>
          </main>
        </div>
      )}
    </Show>
  );
}
