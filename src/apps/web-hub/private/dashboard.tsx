import { useAuth } from "~/shell/context/auth";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import PageHeader from "~/shell/components/ui/PageHeader";
import ActionGrid from "~/shell/components/ui/ActionGrid";
import { useNavigate } from "@solidjs/router";

const stats = [
  { label: "Active Servers", value: "36", icon: "lucide:server", color: "#06d6a0" },
  { label: "Virtual Hosts", value: "142", icon: "lucide:globe", color: "#3b82f6" },
  { label: "SSL Expiring", value: "8", icon: "lucide:shield", color: "#f59e0b" },
  { label: "Requests/sec", value: "24K", icon: "lucide:activity", color: "#8b5cf6" },
];

const activity = [
  { icon: "lucide:globe", text: "Nginx upstream config reloaded on proxy-west-02", time: "3 min ago", color: "#06d6a0" },
  { icon: "lucide:shield-check", text: "SSL certificate renewed for api.example.com", time: "18 min ago", color: "#3b82f6" },
  { icon: "lucide:server", text: "HAProxy backend check passed for prod-ha-01", time: "45 min ago", color: "#f59e0b" },
  { icon: "lucide:lock", text: "Caddy rate limit policy updated for /api/*", time: "2 hr ago", color: "#8b5cf6" },
  { icon: "lucide:activity", text: "Envoy cluster routing table refreshed", time: "3 hr ago", color: "#06d6a0" },
  { icon: "lucide:settings", text: "Traefik ingress rule added for staging namespace", time: "5 hr ago", color: "#f59e0b" },
];

export default function WebHubDashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  const actions = [
    { icon: "lucide:server", label: "View Servers", onClick: () => navigate("/web-hub/private/servers") },
    { icon: "lucide:globe", label: "Virtual Hosts", onClick: () => navigate("/web-hub/private/virtual-hosts") },
    { icon: "lucide:shield", label: "SSL Status", onClick: () => navigate("/web-hub/private/ssl-status") },
    { icon: "lucide:activity", label: "Monitoring", onClick: () => navigate("/web-hub/private") },
  ];

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title={`Welcome back, ${auth.user()?.displayName}`}
        description="Here's an overview of your web infrastructure."
        icon="lucide:globe"
        iconColor="#3b82f6"
      />

      <div class="max-w-6xl mx-auto px-0">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => <StatCard {...s} />)}
        </div>

        <div class="grid lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <ActivityFeed items={activity} title="Recent Activity" />
          </div>
          <div>
            <ActionGrid actions={actions} />
          </div>
        </div>
      </div>
    </div>
  );
}
