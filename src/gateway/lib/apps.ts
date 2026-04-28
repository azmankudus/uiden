export interface AppDef {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  brandColor: string;
  _i: number;
}

export function appColor(idx: number) {
  const h = (idx * 137.508) % 360;
  const s = 72 + (idx % 3) * 6;
  const l = 56 + (idx % 4) * 4;
  return {
    bg: `hsla(${h}, ${s}%, ${l}%, 0.13)`,
    border: `hsla(${h}, ${s}%, ${l}%, 0.28)`,
    text: `hsl(${h}, ${s}%, ${l}%)`,
  };
}

export function getBrandColor(slug: string): string {
  return APPS.find(a => a.slug === slug)?.brandColor || "#06d6a0";
}

export const APPS: AppDef[] = [
  { name: "Share-Insight", slug: "share-insight", icon: "lucide:folder-search", brandColor: "#6366f1", desc: "Scan shared folders for auditing — NTFS/SMB reporter for file, folder, link, permission and ACL." },
  { name: "Base-Insight", slug: "base-insight", icon: "lucide:shield-check", brandColor: "#ef4444", desc: "Hardening scanner and reporter based on CIS, STIG and vendor recommendations." },
  { name: "Middle-Hub", slug: "middle-hub", icon: "lucide:server", brandColor: "#f97316", desc: "Manage Java application servers — WebLogic, JBoss, Tomcat, GlassFish, Jetty and more." },
  { name: "Web-Hub", slug: "web-hub", icon: "lucide:globe", brandColor: "#06b6d4", desc: "Manage web servers — Apache, Nginx, HAProxy, Caddy, Envoy, Traefik." },
  { name: "Cert-Hub", slug: "cert-hub", icon: "lucide:badge-check", brandColor: "#10b981", desc: "Manage SSL certificates — generate keys, CSR, PKCS12, JKS, Root CA and more." },
  { name: "Auto-Hub", slug: "auto-hub", icon: "lucide:play", brandColor: "#8b5cf6", desc: "Manage automation and batch processing — Shell, PowerShell, Ansible, Terraform, Packer." },
  { name: "Software-Hub", slug: "software-hub", icon: "lucide:package", brandColor: "#3b82f6", desc: "Manage software inventory, repository and auto download/update from internet." },
  { name: "DR-Hub", slug: "dr-hub", icon: "lucide:triangle-alert", brandColor: "#f43f5e", desc: "Manage disaster recovery flow, activation, reporting and more." },
  { name: "Ticket-Hub", slug: "ticket-hub", icon: "lucide:ticket", brandColor: "#a855f7", desc: "Ticketing system for service request, change request and incident ticket." },
  { name: "Metrics-Hub", slug: "metrics-hub", icon: "lucide:bar-chart-3", brandColor: "#14b8a6", desc: "Infra and application observability — Dynatrace, Zabbix and more." },
  { name: "Log-Hub", slug: "log-hub", icon: "lucide:scroll-text", brandColor: "#64748b", desc: "Manage logs from multiple sources with search capability." },
  { name: "Asset-Hub", slug: "asset-hub", icon: "lucide:warehouse", brandColor: "#eab308", desc: "Asset manager and capacity management for hardware, software, licensing." },
  { name: "Virtual-Hub", slug: "virtual-hub", icon: "lucide:boxes", brandColor: "#0ea5e9", desc: "Manage multiple virtualization platforms — Proxmox, VMware, XCP-NG and more." },
  { name: "IP-Hub", slug: "ip-hub", icon: "lucide:network", brandColor: "#22d3ee", desc: "Manage network — IP and MAC addresses, DNS, DHCP and more." },
  { name: "Keep-Hub", slug: "keep-hub", icon: "lucide:hard-drive", brandColor: "#2dd4bf", desc: "Manage backups and recovery." },
  { name: "Send-Hub", slug: "send-hub", icon: "lucide:send", brandColor: "#fb923c", desc: "Manage file transfer." },
  { name: "User-Hub", slug: "user-hub", icon: "lucide:users", brandColor: "#4f46e5", desc: "Single sign-on and access management." },
  { name: "Remote-Hub", slug: "remote-hub", icon: "lucide:monitor", brandColor: "#7c3aed", desc: "Manage remote access to desktops and servers." },
  { name: "Secret-Hub", slug: "secret-hub", icon: "lucide:key-round", brandColor: "#fbbf24", desc: "Secret management — passwords, keys and more." },
  { name: "Runtime-Hub", slug: "runtime-hub", icon: "lucide:activity", brandColor: "#ec4899", desc: "Manage runtime environments." },
  { name: "Patch-Hub", slug: "patch-hub", icon: "lucide:shield", brandColor: "#84cc16", desc: "Manage vulnerability and patch management." },
  { name: "Doc-Hub", slug: "doc-hub", icon: "lucide:file-text", brandColor: "#2563eb", desc: "Generate office, PDF or image documents based on input and template." },
  { name: "Any-Gen", slug: "any-gen", icon: "lucide:sparkles", brandColor: "#a3e635", desc: "Generate random or formatted text based on input parameters." },
  { name: "Lucky-Hub", slug: "lucky-hub", icon: "lucide:dice-5", brandColor: "#f59e0b", desc: "Lucky draw system." },
  { name: "Time-Hub", slug: "time-hub", icon: "lucide:clock", brandColor: "#0284c7", desc: "Local and world date/time, stopwatch and timer." },
  { name: "Event-Hub", slug: "event-hub", icon: "lucide:calendar", brandColor: "#e879f9", desc: "Manage events and calendar." },
  { name: "Mark-Hub", slug: "mark-hub", icon: "lucide:file-code", brandColor: "#34d399", desc: "View and edit markdown files." },
].map((app, i) => ({ ...app, _i: i }));
