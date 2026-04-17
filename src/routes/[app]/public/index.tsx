import { useParams, A } from "@solidjs/router";
import { getApp } from "~/apps/registry";
import { APPS } from "~/gateway/lib/apps";
import PublicLayout from "~/shell/layouts/PublicLayout";
import AyamLanding from "~/apps/ayam-goreng/public/landing";
import DefaultLanding from "~/apps/default/public/landing";
import AppLogo from "~/shell/lib/app-logo";

const CUSTOM: Record<string, any> = {
  "ayam-goreng": AyamLanding,
};

export default function PublicIndex() {
  const params = useParams();
  const app = getApp(params.app);
  const gatewayApp = APPS.find((a) => a.slug === params.app);

  if (!app) return <div class="flex items-center justify-center min-h-screen"><p class="text-text-muted">App not found</p></div>;

  const CustomPage = CUSTOM[params.app];
  if (CustomPage) {
    return (
      <PublicLayout name={app.name} icon={app.icon} slug={app.slug} links={app.publicNav} searchItems={app.search.public}>
        <CustomPage />
      </PublicLayout>
    );
  }

  const pageApp = { name: app.name, slug: app.slug, icon: app.icon, desc: gatewayApp?.desc || app.name };

  return (
    <>
      <header class="fixed top-0 left-0 right-0 z-50 h-[60px]">
        <nav class="grid grid-cols-3 items-center h-full px-5 bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/30">
          <A href="/landing" class="flex items-center gap-3">
            <AppLogo slug="superapp" size={36} />
            <span class="font-display text-xl font-bold tracking-tight leading-none">
              <span class="text-brand">Kentut</span>
              <span class="text-text-primary"> SuperApp</span>
            </span>
          </A>
          <div class="flex justify-center" />
          <div class="flex justify-end" />
        </nav>
      </header>
      <div class="pt-[60px]">
        <DefaultLanding app={pageApp} />
      </div>
    </>
  );
}
