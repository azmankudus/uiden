import { useParams } from "@solidjs/router";
import { getApp } from "~/apps/registry";
import PrivateLayout from "~/shell/layouts/PrivateLayout";
import Users from "~/apps/ayam-goreng/private/admin/users";

const PAGES: Record<string, any> = {
  "ayam-goreng": Users,
};

export default function AdminUsers() {
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
