import { createSignal, onMount, Show } from "solid-js";
import { useParams, useNavigate, A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import AppLogo from "~/components/common/AppLogo";
import { APPS, getBrandColor } from "~/lib/apps/apps";
import { ROUTES } from "~/lib/common/branding";

export default function AppPublic() {
  const params = useParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);

  const app = () => APPS.find(a => a.slug === params.app);

  onMount(() => {
    if (!app()) {
      navigate(ROUTES.apps, { replace: true });
      return;
    }
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
            <span class="text-xs text-text-muted px-2 py-0.5 rounded bg-surface-2 border border-surface-3">Public</span>
            <div class="flex-1" />
            <A href={ROUTES.apps} class="text-sm text-text-muted hover:text-text-primary transition-colors">
              <AppIcon icon="lucide:house" size={18} />
            </A>
          </header>

          <main class="max-w-4xl mx-auto px-6 py-12">
            <div
              class="text-center mb-10"
              classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
            >
              <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4" style={{ background: `${brandColor()}20`, border: `1px solid ${brandColor()}40` }}>
                <AppLogo slug={a().slug} size={64} />
              </div>
              <h1 class="font-display text-3xl font-extrabold text-text-primary mb-2">{a().name}</h1>
              <p class="text-text-secondary max-w-md mx-auto">{a().desc}</p>
            </div>

            <div
              classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
              style={{ "animation-delay": "100ms" }}
            >
              <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
                <AppIcon icon={a().icon} size={40} style={{ color: brandColor() }} />
                <p class="mt-4 text-text-secondary text-sm">This is the public landing page for {a().name}.</p>
                <p class="text-text-muted text-xs mt-1">Content and features for this app will appear here.</p>
              </div>
            </div>
          </main>
        </div>
      )}
    </Show>
  );
}
