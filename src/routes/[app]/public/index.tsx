import { useParams, A } from "@solidjs/router";
import { getApp } from "~/apps/registry";
import { APPS } from "~/gateway/lib/apps";
import PublicLayout from "~/shell/layouts/PublicLayout";
import TopNav from "~/shell/components/TopNav";
import AppLogo from "~/shell/lib/app-logo";
import ShareInsightLanding from "~/apps/share-insight/public/landing";
import BaseInsightLanding from "~/apps/base-insight/public/landing";
import MiddleHubLanding from "~/apps/middle-hub/public/landing";
import WebHubLanding from "~/apps/web-hub/public/landing";
import CertHubLanding from "~/apps/cert-hub/public/landing";
import AutoHubLanding from "~/apps/auto-hub/public/landing";
import SoftwareHubLanding from "~/apps/software-hub/public/landing";
import DrHubLanding from "~/apps/dr-hub/public/landing";
import TicketHubLanding from "~/apps/ticket-hub/public/landing";
import MetricsHubLanding from "~/apps/metrics-hub/public/landing";
import LogHubLanding from "~/apps/log-hub/public/landing";
import AssetHubLanding from "~/apps/asset-hub/public/landing";
import VirtualHubLanding from "~/apps/virtual-hub/public/landing";
import IpHubLanding from "~/apps/ip-hub/public/landing";
import KeepHubLanding from "~/apps/keep-hub/public/landing";
import SendHubLanding from "~/apps/send-hub/public/landing";
import UserHubLanding from "~/apps/user-hub/public/landing";
import RemoteHubLanding from "~/apps/remote-hub/public/landing";
import SecretHubLanding from "~/apps/secret-hub/public/landing";
import RuntimeHubLanding from "~/apps/runtime-hub/public/landing";
import PatchHubLanding from "~/apps/patch-hub/public/landing";
import DocHubLanding from "~/apps/doc-hub/public/landing";
import AnyGenLanding from "~/apps/any-gen/public/landing";
import LuckyHubLanding from "~/apps/lucky-hub/public/landing";
import TimeHubLanding from "~/apps/time-hub/public/landing";
import EventHubLanding from "~/apps/event-hub/public/landing";
import MarkHubLanding from "~/apps/mark-hub/public/landing";

const CUSTOM: Record<string, any> = {
  "share-insight": ShareInsightLanding,
  "base-insight": BaseInsightLanding,
  "middle-hub": MiddleHubLanding,
  "web-hub": WebHubLanding,
  "cert-hub": CertHubLanding,
  "auto-hub": AutoHubLanding,
  "software-hub": SoftwareHubLanding,
  "dr-hub": DrHubLanding,
  "ticket-hub": TicketHubLanding,
  "metrics-hub": MetricsHubLanding,
  "log-hub": LogHubLanding,
  "asset-hub": AssetHubLanding,
  "virtual-hub": VirtualHubLanding,
  "ip-hub": IpHubLanding,
  "keep-hub": KeepHubLanding,
  "send-hub": SendHubLanding,
  "user-hub": UserHubLanding,
  "remote-hub": RemoteHubLanding,
  "secret-hub": SecretHubLanding,
  "runtime-hub": RuntimeHubLanding,
  "patch-hub": PatchHubLanding,
  "doc-hub": DocHubLanding,
  "any-gen": AnyGenLanding,
  "lucky-hub": LuckyHubLanding,
  "time-hub": TimeHubLanding,
  "event-hub": EventHubLanding,
  "mark-hub": MarkHubLanding,
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
      <TopNav
        name={app.name}
        slug={app.slug}
        link={`/${app.slug}/public`}
        searchItems={app.search.public}
        appHome={`/${app.slug}/public`}
      />
      <div class="pt-[60px]">
        <DefaultLanding app={pageApp} />
      </div>
    </>
  );
}
