import { useParams } from "@solidjs/router";
import { getApp } from "~/apps/registry";
import { APPS } from "~/gateway/lib/apps";
import PrivateLayout from "~/shell/layouts/PrivateLayout";
import ShareInsightDashboard from "~/apps/share-insight/private/dashboard";
import BaseInsightDashboard from "~/apps/base-insight/private/dashboard";
import MiddleHubDashboard from "~/apps/middle-hub/private/dashboard";
import WebHubDashboard from "~/apps/web-hub/private/dashboard";
import CertHubDashboard from "~/apps/cert-hub/private/dashboard";
import AutoHubDashboard from "~/apps/auto-hub/private/dashboard";
import SoftwareHubDashboard from "~/apps/software-hub/private/dashboard";
import DrHubDashboard from "~/apps/dr-hub/private/dashboard";
import TicketHubDashboard from "~/apps/ticket-hub/private/dashboard";
import MetricsHubDashboard from "~/apps/metrics-hub/private/dashboard";
import LogHubDashboard from "~/apps/log-hub/private/dashboard";
import AssetHubDashboard from "~/apps/asset-hub/private/dashboard";
import VirtualHubDashboard from "~/apps/virtual-hub/private/dashboard";
import IpHubDashboard from "~/apps/ip-hub/private/dashboard";
import KeepHubDashboard from "~/apps/keep-hub/private/dashboard";
import SendHubDashboard from "~/apps/send-hub/private/dashboard";
import UserHubDashboard from "~/apps/user-hub/private/dashboard";
import RemoteHubDashboard from "~/apps/remote-hub/private/dashboard";
import SecretHubDashboard from "~/apps/secret-hub/private/dashboard";
import RuntimeHubDashboard from "~/apps/runtime-hub/private/dashboard";
import PatchHubDashboard from "~/apps/patch-hub/private/dashboard";
import DocHubDashboard from "~/apps/doc-hub/private/dashboard";
import AnyGenDashboard from "~/apps/any-gen/private/dashboard";
import LuckyHubDashboard from "~/apps/lucky-hub/private/dashboard";
import TimeHubDashboard from "~/apps/time-hub/private/dashboard";
import EventHubDashboard from "~/apps/event-hub/private/dashboard";
import MarkHubDashboard from "~/apps/mark-hub/private/dashboard";

const CUSTOM: Record<string, any> = {
  "share-insight": ShareInsightDashboard,
  "base-insight": BaseInsightDashboard,
  "middle-hub": MiddleHubDashboard,
  "web-hub": WebHubDashboard,
  "cert-hub": CertHubDashboard,
  "auto-hub": AutoHubDashboard,
  "software-hub": SoftwareHubDashboard,
  "dr-hub": DrHubDashboard,
  "ticket-hub": TicketHubDashboard,
  "metrics-hub": MetricsHubDashboard,
  "log-hub": LogHubDashboard,
  "asset-hub": AssetHubDashboard,
  "virtual-hub": VirtualHubDashboard,
  "ip-hub": IpHubDashboard,
  "keep-hub": KeepHubDashboard,
  "send-hub": SendHubDashboard,
  "user-hub": UserHubDashboard,
  "remote-hub": RemoteHubDashboard,
  "secret-hub": SecretHubDashboard,
  "runtime-hub": RuntimeHubDashboard,
  "patch-hub": PatchHubDashboard,
  "doc-hub": DocHubDashboard,
  "any-gen": AnyGenDashboard,
  "lucky-hub": LuckyHubDashboard,
  "time-hub": TimeHubDashboard,
  "event-hub": EventHubDashboard,
  "mark-hub": MarkHubDashboard,
};

export default function PrivateIndex() {
  const params = useParams();
  const app = getApp(params.app);
  const gatewayApp = APPS.find((a) => a.slug === params.app);

  if (!app) return <div class="flex items-center justify-center min-h-screen"><p class="text-text-muted">App not found</p></div>;

  const pageApp = gatewayApp || { name: app.name, slug: app.slug, icon: app.icon };
  const Page = CUSTOM[params.app];

  return (
    <PrivateLayout name={app.name} icon={app.icon} slug={app.slug} nav={app.nav} searchItems={app.search.private}>
      <Page app={pageApp} />
    </PrivateLayout>
  );
}
