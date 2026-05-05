import { createSignal, onMount, Show } from "solid-js";
import { useParams, useNavigate, A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import AppLogo from "~/components/common/AppLogo";
import { APPS } from "~/lib/apps/apps";
import { ROUTES } from "~/lib/common/branding";
import { useT } from "~/lib/common/i18n";

export default function AppAbout() {
  const t = useT("common");
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
            <span class="text-xs text-text-muted px-2 py-0.5 rounded bg-surface-2 border border-surface-3">{t().aboutBadge}</span>
            <div class="flex-1" />
            <A href={ROUTES.apps} class="text-sm text-text-muted hover:text-text-primary transition-colors">
              <AppIcon icon="lucide:house" size={18} />
            </A>
          </header>

          <main class="max-w-3xl mx-auto px-6 py-12">
            <div classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}>
              <h1 class="font-display text-3xl font-extrabold text-text-primary mb-2">{t().aboutAppTitle}</h1>
              <p class="text-text-secondary mb-8">{t().aboutAppSubtitle} {a().name}.</p>

              <div class="space-y-4">
                <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${brandColor()}20`, border: `1px solid ${brandColor()}40` }}>
                      <AppLogo slug={a().slug} size={48} />
                    </div>
                    <div>
                      <h2 class="font-display text-xl font-bold text-text-primary">{a().name}</h2>
                      <p class="text-sm text-text-secondary">{a().desc}</p>
                    </div>
                  </div>
                  <dl class="grid grid-cols-2 gap-3 text-sm">
                    <dt class="text-text-muted">{t().aboutCategory}</dt>
                    <dd class="text-text-primary">{a().category}</dd>
                    <dt class="text-text-muted">{t().aboutSlug}</dt>
                    <dd class="text-text-primary font-mono text-xs">{a().slug}</dd>
                  </dl>
                </div>

                <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
                  <AppIcon icon="lucide:info" size={32} style={{ color: "var(--color-text-muted)" }} />
                  <p class="mt-3 text-sm text-text-muted">{t().aboutAppPlaceholder} {a().name} {t().aboutAppPlaceholderSuffix}</p>
                </div>
              </div>

              <div class="mt-8 flex gap-4">
                <A href={`/${a().slug}/public`} class="text-sm text-brand hover:underline">&larr; {t().docsBackTo} {a().name}</A>
              </div>
            </div>
          </main>
        </div>
      )}
    </Show>
  );
}
