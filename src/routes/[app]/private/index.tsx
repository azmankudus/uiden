import { useParams } from "@solidjs/router";
import { getApp } from "~/apps/registry";
import { APPS } from "~/gateway/lib/apps";
import PrivateLayout from "~/shell/layouts/PrivateLayout";
import AyamDashboard from "~/apps/ayam-goreng/private/dashboard";
import DefaultDashboard from "~/apps/default/private/dashboard";

const CUSTOM: Record<string, any> = {
  "ayam-goreng": AyamDashboard,
};

export default function PrivateIndex() {
  const params = useParams();
  const app = getApp(params.app);
  const gatewayApp = APPS.find((a) => a.slug === params.app);

  if (!app) return <div class="flex items-center justify-center min-h-screen"><p class="text-text-muted">App not found</p></div>;

  const pageApp = gatewayApp || { name: app.name, slug: app.slug, icon: app.icon };
  const Page = CUSTOM[params.app] || DefaultDashboard;

  return (
    <PrivateLayout name={app.name} icon={app.icon} slug={app.slug} nav={app.nav} searchItems={app.search.private}>
      <Page app={pageApp} />
    </PrivateLayout>
  );
}
