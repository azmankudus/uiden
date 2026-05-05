import { createSignal, onMount, Show } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import { APPS } from "~/lib/apps/apps";
import { ROUTES } from "~/lib/common/branding";
import { useAuthGuard } from "~/lib/common/auth-guard";
import PrivateLayout from "~/components/common/PrivateLayout";
import type { NavSection } from "~/components/common/SideNav";
import { useT } from "~/lib/common/i18n";

export default function AppPrivate() {
  const t = useT("common");
  const params = useParams();
  const navigate = useNavigate();
  const { requireAuth } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);

  const app = () => APPS.find(a => a.slug === params.app);

  onMount(() => {
    if (!app()) {
      navigate(ROUTES.apps, { replace: true });
      return;
    }
    if (!requireAuth()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const sections = (): NavSection[] => [
    {
      title: t().navNavigation,
      items: [
        { label: t().navDashboard, icon: "lucide:layout-dashboard", path: ROUTES.apps },
      ],
    },
    {
      title: app()?.name || "App",
      items: [
        { label: t().navOverview, icon: app()?.icon || "lucide:box", path: `/${params.app}/private` },
        { label: t().navPublicPage, icon: "lucide:globe", path: `/${params.app}/public` },
      ],
    },
  ];

  return (
    <Show when={app() && mounted()}>
      {(a) => (
        <PrivateLayout name={a().name} icon={a().icon} slug={a().slug} sections={sections()}>
          <div classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}>
            <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
              <AppIcon icon={a().icon} size={40} style={{ color: a().brandColor }} />
              <p class="mt-4 text-text-secondary text-sm">{t().privateDashboard} {a().name}.</p>
              <p class="text-text-muted text-xs mt-1">{t().privateContentHere}</p>
            </div>
          </div>
        </PrivateLayout>
      )}
    </Show>
  );
}
