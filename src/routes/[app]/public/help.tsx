import { createSignal, onMount, Show } from "solid-js";
import { useParams, useNavigate, A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import AppLogo from "~/components/common/AppLogo";
import { APPS } from "~/lib/apps/apps";
import { ROUTES } from "~/lib/common/branding";
import { BRAND } from "~/lib/common/branding";
import { useT } from "~/lib/common/i18n";

export default function AppHelp() {
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
            <span class="text-xs text-text-muted px-2 py-0.5 rounded bg-surface-2 border border-surface-3">{t().helpBadge}</span>
            <div class="flex-1" />
            <A href={ROUTES.apps} class="text-sm text-text-muted hover:text-text-primary transition-colors">
              <AppIcon icon="lucide:house" size={18} />
            </A>
          </header>

          <main class="max-w-3xl mx-auto px-6 py-12">
            <div classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}>
              <h1 class="font-display text-3xl font-extrabold text-text-primary mb-2">{t().helpTitle}</h1>
              <p class="text-text-secondary mb-8">{t().helpSubtitle} {a().name}.</p>

              <div class="space-y-4">
                <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
                  <div class="flex items-center gap-3 mb-3">
                    <AppIcon icon="lucide:circle-question-mark" size={20} style={{ color: brandColor() }} />
                    <h2 class="font-display text-lg font-semibold text-text-primary">{t().helpFaq}</h2>
                  </div>
                  <p class="text-sm text-text-secondary">{t().helpFaqApp} {a().name}.</p>
                </div>

                <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
                  <AppIcon icon="lucide:life-buoy" size={32} style={{ color: "var(--color-text-muted)" }} />
                  <p class="mt-3 text-sm text-text-muted">{t().helpPlaceholder} {a().name} {t().helpPlaceholderSuffix}</p>
                  <p class="text-xs text-text-muted mt-1">{t().helpContact} <span class="text-brand">{BRAND.supportEmail}</span></p>
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
