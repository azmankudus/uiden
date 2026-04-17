import { useParams } from "@solidjs/router";
import { getApp } from "~/apps/registry";
import PrivateLayout from "~/shell/layouts/PrivateLayout";
import EmptyState from "~/shell/components/ui/EmptyState";
import ShareInsightScans from "~/apps/share-insight/private/scans";
import ShareInsightFolders from "~/apps/share-insight/private/folders";
import ShareInsightPermissions from "~/apps/share-insight/private/permissions";
import ShareInsightReports from "~/apps/share-insight/private/reports";
import BaseInsightScans from "~/apps/base-insight/private/scans";
import BaseInsightBenchmarks from "~/apps/base-insight/private/benchmarks";
import BaseInsightReports from "~/apps/base-insight/private/reports";
import MiddleHubServers from "~/apps/middle-hub/private/servers";
import MiddleHubDeployments from "~/apps/middle-hub/private/deployments";
import MiddleHubConfigurations from "~/apps/middle-hub/private/configurations";
import WebHubServers from "~/apps/web-hub/private/servers";
import WebHubVirtualHosts from "~/apps/web-hub/private/virtual-hosts";
import WebHubSslStatus from "~/apps/web-hub/private/ssl-status";
import CertHubCertificates from "~/apps/cert-hub/private/certificates";
import CertHubKeyStore from "~/apps/cert-hub/private/key-store";
import CertHubCsrGenerator from "~/apps/cert-hub/private/csr-generator";
import SecretHubSecrets from "~/apps/secret-hub/private/secrets";
import SecretHubKeys from "~/apps/secret-hub/private/keys";
import SecretHubPolicies from "~/apps/secret-hub/private/policies";
import PatchHubVulnerabilities from "~/apps/patch-hub/private/vulnerabilities";
import PatchHubPatches from "~/apps/patch-hub/private/patches";
import PatchHubDeployments from "~/apps/patch-hub/private/deployments";
import AutoHubJobs from "~/apps/auto-hub/private/jobs";
import AutoHubScripts from "~/apps/auto-hub/private/scripts";
import AutoHubSchedules from "~/apps/auto-hub/private/schedules";
import SoftwareHubInventory from "~/apps/software-hub/private/inventory";
import SoftwareHubRepositories from "~/apps/software-hub/private/repositories";
import SoftwareHubUpdates from "~/apps/software-hub/private/updates";
import TicketHubTickets from "~/apps/ticket-hub/private/tickets";
import TicketHubQueue from "~/apps/ticket-hub/private/queue";
import TicketHubReports from "~/apps/ticket-hub/private/reports";
import MetricsHubMonitors from "~/apps/metrics-hub/private/monitors";
import MetricsHubAlerts from "~/apps/metrics-hub/private/alerts";
import MetricsHubDashboards from "~/apps/metrics-hub/private/dashboards";
import LogHubLogs from "~/apps/log-hub/private/logs";
import LogHubSearches from "~/apps/log-hub/private/searches";
import LogHubAlerts from "~/apps/log-hub/private/alerts";
import VirtualHubVms from "~/apps/virtual-hub/private/vms";
import VirtualHubClusters from "~/apps/virtual-hub/private/clusters";
import VirtualHubTemplates from "~/apps/virtual-hub/private/templates";
import VirtualHubSnapshots from "~/apps/virtual-hub/private/snapshots";
import IpHubIpAddresses from "~/apps/ip-hub/private/ip-addresses";
import IpHubDnsRecords from "~/apps/ip-hub/private/dns-records";
import IpHubDhcpScopes from "~/apps/ip-hub/private/dhcp-scopes";
import DrHubPlans from "~/apps/dr-hub/private/plans";
import DrHubRunbooks from "~/apps/dr-hub/private/runbooks";
import DrHubTests from "~/apps/dr-hub/private/tests";
import KeepHubBackups from "~/apps/keep-hub/private/backups";
import KeepHubPolicies from "~/apps/keep-hub/private/policies";
import KeepHubRecovery from "~/apps/keep-hub/private/recovery";
import SendHubTransfers from "~/apps/send-hub/private/transfers";
import SendHubQueue from "~/apps/send-hub/private/queue";
import SendHubPolicies from "~/apps/send-hub/private/policies";
import AssetHubAssets from "~/apps/asset-hub/private/assets";
import AssetHubLicenses from "~/apps/asset-hub/private/licenses";
import AssetHubCapacity from "~/apps/asset-hub/private/capacity";
import UserHubUsers from "~/apps/user-hub/private/users";
import UserHubGroups from "~/apps/user-hub/private/groups";
import UserHubPolicies from "~/apps/user-hub/private/policies";
import RemoteHubSessions from "~/apps/remote-hub/private/sessions";
import RemoteHubMachines from "~/apps/remote-hub/private/machines";
import RemoteHubPolicies from "~/apps/remote-hub/private/policies";
import RuntimeHubEnvironments from "~/apps/runtime-hub/private/environments";
import RuntimeHubDeployments from "~/apps/runtime-hub/private/deployments";
import RuntimeHubConfigs from "~/apps/runtime-hub/private/configs";
import DocHubTemplates from "~/apps/doc-hub/private/templates";
import DocHubDocuments from "~/apps/doc-hub/private/documents";
import DocHubGenerator from "~/apps/doc-hub/private/generator";
import AnyGenGenerators from "~/apps/any-gen/private/generators";
import AnyGenPresets from "~/apps/any-gen/private/presets";
import AnyGenHistory from "~/apps/any-gen/private/history";
import LuckyHubEvents from "~/apps/lucky-hub/private/events";
import LuckyHubParticipants from "~/apps/lucky-hub/private/participants";
import LuckyHubResults from "~/apps/lucky-hub/private/results";
import TimeHubWorldClock from "~/apps/time-hub/private/world-clock";
import TimeHubStopwatch from "~/apps/time-hub/private/stopwatch";
import TimeHubTimer from "~/apps/time-hub/private/timer";
import EventHubEvents from "~/apps/event-hub/private/events";
import EventHubCalendar from "~/apps/event-hub/private/calendar";
import EventHubReminders from "~/apps/event-hub/private/reminders";
import MarkHubFiles from "~/apps/mark-hub/private/files";
import MarkHubEditor from "~/apps/mark-hub/private/editor";
import MarkHubPreview from "~/apps/mark-hub/private/preview";

const PAGES: Record<string, Record<string, any>> = {
  "share-insight": { scans: ShareInsightScans, folders: ShareInsightFolders, permissions: ShareInsightPermissions, reports: ShareInsightReports },
  "base-insight": { scans: BaseInsightScans, benchmarks: BaseInsightBenchmarks, reports: BaseInsightReports },
  "middle-hub": { servers: MiddleHubServers, deployments: MiddleHubDeployments, configurations: MiddleHubConfigurations },
  "web-hub": { servers: WebHubServers, "virtual-hosts": WebHubVirtualHosts, "ssl-status": WebHubSslStatus },
  "cert-hub": { certificates: CertHubCertificates, "key-store": CertHubKeyStore, "csr-generator": CertHubCsrGenerator },
  "secret-hub": { secrets: SecretHubSecrets, keys: SecretHubKeys, policies: SecretHubPolicies },
  "patch-hub": { vulnerabilities: PatchHubVulnerabilities, patches: PatchHubPatches, deployments: PatchHubDeployments },
  "auto-hub": { jobs: AutoHubJobs, scripts: AutoHubScripts, schedules: AutoHubSchedules },
  "software-hub": { inventory: SoftwareHubInventory, repositories: SoftwareHubRepositories, updates: SoftwareHubUpdates },
  "ticket-hub": { tickets: TicketHubTickets, queue: TicketHubQueue, reports: TicketHubReports },
  "metrics-hub": { monitors: MetricsHubMonitors, alerts: MetricsHubAlerts, dashboards: MetricsHubDashboards },
  "log-hub": { logs: LogHubLogs, searches: LogHubSearches, alerts: LogHubAlerts },
  "virtual-hub": { vms: VirtualHubVms, clusters: VirtualHubClusters, templates: VirtualHubTemplates, snapshots: VirtualHubSnapshots },
  "ip-hub": { "ip-addresses": IpHubIpAddresses, "dns-records": IpHubDnsRecords, "dhcp-scopes": IpHubDhcpScopes },
  "dr-hub": { plans: DrHubPlans, runbooks: DrHubRunbooks, tests: DrHubTests },
  "keep-hub": { backups: KeepHubBackups, policies: KeepHubPolicies, recovery: KeepHubRecovery },
  "send-hub": { transfers: SendHubTransfers, queue: SendHubQueue, policies: SendHubPolicies },
  "asset-hub": { assets: AssetHubAssets, licenses: AssetHubLicenses, capacity: AssetHubCapacity },
  "user-hub": { users: UserHubUsers, groups: UserHubGroups, policies: UserHubPolicies },
  "remote-hub": { sessions: RemoteHubSessions, machines: RemoteHubMachines, policies: RemoteHubPolicies },
  "runtime-hub": { environments: RuntimeHubEnvironments, deployments: RuntimeHubDeployments, configs: RuntimeHubConfigs },
  "doc-hub": { templates: DocHubTemplates, documents: DocHubDocuments, generator: DocHubGenerator },
  "any-gen": { generators: AnyGenGenerators, presets: AnyGenPresets, history: AnyGenHistory },
  "lucky-hub": { events: LuckyHubEvents, participants: LuckyHubParticipants, results: LuckyHubResults },
  "time-hub": { "world-clock": TimeHubWorldClock, stopwatch: TimeHubStopwatch, timer: TimeHubTimer },
  "event-hub": { events: EventHubEvents, calendar: EventHubCalendar, reminders: EventHubReminders },
  "mark-hub": { files: MarkHubFiles, editor: MarkHubEditor, preview: MarkHubPreview },
};

export default function FeaturePage() {
  const params = useParams();
  const app = getApp(params.app);
  if (!app) return <EmptyState icon="lucide:search" title="App not found" />;

  const Page = PAGES[params.app]?.[params.slug];
  if (!Page) return <EmptyState icon="lucide:search" title="Page not found" description={`No page "${params.slug}" for ${app.name}`} actionHref={`/${params.app}/private`} actionLabel="Back to Dashboard" />;

  return (
    <PrivateLayout name={app.name} icon={app.icon} slug={app.slug} nav={app.nav} searchItems={app.search.private}>
      <Page />
    </PrivateLayout>
  );
}
