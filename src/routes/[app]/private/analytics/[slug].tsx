import { useParams } from "@solidjs/router";
import { getApp } from "~/apps/registry";
import PrivateLayout from "~/shell/layouts/PrivateLayout";
import AnalyticsSlug from "~/apps/ayam-goreng/private/analytics/[slug]";

const PAGES: Record<string, any> = {
  "ayam-goreng": AnalyticsSlug,
};

export default function AnalyticsPage() {
  const params = useParams();
  const app = getApp(params.app);
  const Page = PAGES[params.app];

  if (!app || !Page) return <div class="flex items-center justify-center min-h-screen"><p class="text-text-muted">App not found</p></div>;

  return (
    <PrivateLayout name={app.name} icon={app.icon} slug={app.slug} nav={app.nav} searchItems={app.search.private}>
      <Page />
    </PrivateLayout>
  );
}
