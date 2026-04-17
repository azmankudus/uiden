import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";

const columns = [
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "createdBy", label: "Created By" },
  { key: "lastAccessed", label: "Last Accessed" },
  { key: "rotationPolicy", label: "Rotation Policy" },
];

const data = [
  { name: "DB_PASSWORD_PROD", type: "Password", createdBy: "alice.chen", lastAccessed: "5 min ago", rotationPolicy: "30 days" },
  { name: "STRIPE_API_KEY", type: "API Key", createdBy: "bob.miller", lastAccessed: "12 min ago", rotationPolicy: "90 days" },
  { name: "JWT_SIGNING_KEY", type: "Token", createdBy: "system", lastAccessed: "1 hr ago", rotationPolicy: "7 days" },
  { name: "AWS_SECRET_ACCESS", type: "API Key", createdBy: "devops-bot", lastAccessed: "2 hr ago", rotationPolicy: "60 days" },
  { name: "SMTP_PASSWORD", type: "Password", createdBy: "carol.wu", lastAccessed: "3 hr ago", rotationPolicy: "90 days" },
  { name: "SSL_CERT_AUTH", type: "Certificate", createdBy: "system", lastAccessed: "4 hr ago", rotationPolicy: "365 days" },
  { name: "ENCRYPTION_MASTER", type: "Token", createdBy: "security-team", lastAccessed: "6 hr ago", rotationPolicy: "Never" },
  { name: "SENDGRID_TOKEN", type: "Token", createdBy: "dave.park", lastAccessed: "8 hr ago", rotationPolicy: "90 days" },
  { name: "REDIS_AUTH_PASS", type: "Password", createdBy: "alice.chen", lastAccessed: "12 hr ago", rotationPolicy: "30 days" },
  { name: "GITHUB_DEPLOY_KEY", type: "API Key", createdBy: "ci-pipeline", lastAccessed: "1 day ago", rotationPolicy: "180 days" },
];

export default function SecretsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Secrets" description="View and manage all secrets in the vault." icon="lucide:lock" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search secrets..." />
    </div>
  );
}
