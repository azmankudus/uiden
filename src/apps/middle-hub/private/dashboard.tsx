import { useAuth } from "~/shell/context/auth";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import PageHeader from "~/shell/components/ui/PageHeader";
import ActionGrid from "~/shell/components/ui/ActionGrid";
import { useNavigate } from "@solidjs/router";

const stats = [
  { label: "Active Servers", value: "48", icon: "lucide:server", color: "#06d6a0" },
  { label: "Deployments", value: "234", icon: "lucide:rocket", color: "#3b82f6" },
  { label: "JVM Heap Avg", value: "72%", icon: "lucide:cpu", color: "#f59e0b" },
  { label: "Requests/min", value: "1.2K", icon: "lucide:activity", color: "#8b5cf6" },
];

const activity = [
  { icon: "lucide:server", text: "Tomcat cluster prod-tc-03 scaled to 8 nodes", time: "5 min ago", color: "#06d6a0" },
  { icon: "lucide:rocket", text: "order-service v4.1.2 deployed to WebLogic cluster", time: "22 min ago", color: "#3b82f6" },
  { icon: "lucide:shield-check", text: "JBoss security patch applied to staging nodes", time: "1 hr ago", color: "#f59e0b" },
  { icon: "lucide:settings", text: "DataSource connection pool updated for GlassFish", time: "2 hr ago", color: "#8b5cf6" },
  { icon: "lucide:zap", text: "Jetty hot-deploy completed for api-gateway", time: "4 hr ago", color: "#06d6a0" },
  { icon: "lucide:scroll-text", text: "Thread dump collected from prod-wl-01", time: "6 hr ago", color: "#f59e0b" },
];

export default function MiddleHubDashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  const actions = [
    { icon: "lucide:server", label: "View Servers", onClick: () => navigate("/middle-hub/private/servers") },
    { icon: "lucide:rocket", label: "Deploy App", onClick: () => navigate("/middle-hub/private/deployments") },
    { icon: "lucide:settings", label: "Configs", onClick: () => navigate("/middle-hub/private/configurations") },
    { icon: "lucide:activity", label: "Monitoring", onClick: () => navigate("/middle-hub/private") },
  ];

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title={`Welcome back, ${auth.user()?.displayName}`}
        description="Here's an overview of your Java middleware."
        icon="lucide:server"
        iconColor="#06d6a0"
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
