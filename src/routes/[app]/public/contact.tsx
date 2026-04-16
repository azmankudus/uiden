import { useParams } from "@solidjs/router";
import { getApp } from "~/apps/registry";
import PublicLayout from "~/shell/layouts/PublicLayout";
import Contact from "~/apps/ayam-goreng/public/contact";

const PAGES: Record<string, any> = {
  "ayam-goreng": Contact,
};

export default function PublicContact() {
  const params = useParams();
  const app = getApp(params.app);
  const Page = PAGES[params.app];

  if (!app || !Page) return <div class="flex items-center justify-center min-h-screen"><p class="text-text-muted">App not found</p></div>;

  return (
    <PublicLayout name={app.name} icon={app.icon} slug={app.slug} links={app.publicNav} searchItems={app.search.public}>
      <Page />
    </PublicLayout>
  );
}
