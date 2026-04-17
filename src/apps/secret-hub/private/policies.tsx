import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import CardGrid from "~/shell/components/ui/CardGrid";

const cards = [
  { icon: "lucide:refresh-cw", label: "Auto Rotation", desc: "Configure automatic key and secret rotation schedules with configurable intervals and fallback procedures.", href: "/secret-hub/private/policies", color: "#10b981" },
  { icon: "lucide:shield-check", label: "Access Control", desc: "Define role-based access policies controlling who can read, write, and manage each secret.", href: "/secret-hub/private/policies", color: "#3b82f6" },
  { icon: "lucide:clock", label: "Expiration", desc: "Set mandatory expiration dates for secrets and keys with automated deactivation and notification.", href: "/secret-hub/private/policies", color: "#f59e0b" },
  { icon: "lucide:lock", label: "Encryption Standard", desc: "Enforce encryption standards (AES-256, RSA-4096) for all secrets at rest and in transit.", href: "/secret-hub/private/policies", color: "#8b5cf6" },
  { icon: "lucide:users", label: "Sharing Rules", desc: "Control cross-team and cross-environment secret sharing with approval workflows.", href: "/secret-hub/private/policies", color: "#06b6d4" },
  { icon: "lucide:scroll-text", label: "Audit Requirements", desc: "Define audit logging requirements for secret access, modifications, and policy changes.", href: "/secret-hub/private/policies", color: "#ef4444" },
];

export default function PoliciesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Policies" description="Configure governance policies for secret management." icon="lucide:shield-check" iconColor="#f59e0b" />
      <CardGrid cards={cards} />
    </div>
  );
}
