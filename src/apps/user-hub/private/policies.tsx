import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import CardGrid from "~/shell/components/ui/CardGrid";

const cards = [
  { icon: "lucide:lock", label: "Password Policy", desc: "Enforce minimum length, complexity, rotation period, and history requirements for all users.", href: "/user-hub/private/policies", color: "#3b82f6" },
  { icon: "lucide:shield", label: "MFA Requirements", desc: "Configure multi-factor authentication enforcement, allowed methods, and bypass rules.", href: "/user-hub/private/policies", color: "#10b981" },
  { icon: "lucide:clock", label: "Session Timeout", desc: "Define idle timeout durations, maximum session length, and concurrent session limits.", href: "/user-hub/private/policies", color: "#8b5cf6" },
  { icon: "lucide:globe", label: "IP Allowlist", desc: "Restrict access to trusted IP ranges with geolocation-based blocking and VPN requirements.", href: "/user-hub/private/policies", color: "#f59e0b" },
  { icon: "lucide:smartphone", label: "Device Trust", desc: "Enforce device compliance checks, managed device requirements, and certificate-based auth.", href: "/user-hub/private/policies", color: "#ef4444" },
  { icon: "lucide:scan", label: "Access Reviews", desc: "Schedule periodic access reviews with automated certification workflows and escalation.", href: "/user-hub/private/policies", color: "#06b6d4" },
];

export default function PoliciesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Policies" description="Configure security policies for authentication, access, and compliance." icon="lucide:shield-check" iconColor="#f59e0b" />
      <CardGrid cards={cards} />
    </div>
  );
}
