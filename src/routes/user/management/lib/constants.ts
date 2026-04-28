import type { AuthProviderConfig } from "./types";

export const STORE_KEY = "kentutsuperapp_management";

export const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  Admin: { bg: "bg-red-500/15", text: "text-red-400" },
  Director: { bg: "bg-purple-500/15", text: "text-purple-400" },
  Manager: { bg: "bg-blue-500/15", text: "text-blue-400" },
  Staff: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  Auditor: { bg: "bg-amber-500/15", text: "text-amber-400" },
};

export const ROLE_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  Admin: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-800 dark:text-red-300", dot: "bg-red-500" },
  User: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-800 dark:text-blue-300", dot: "bg-blue-500" },
  Guest: { bg: "bg-gray-100 dark:bg-gray-700/30", text: "text-gray-600 dark:text-gray-400", dot: "bg-gray-400" },
};

export const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-800 dark:text-green-300", dot: "bg-green-500" },
  inactive: { bg: "bg-gray-100 dark:bg-gray-700/30", text: "text-gray-600 dark:text-gray-400", dot: "bg-gray-400" },
  suspended: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-800 dark:text-red-300", dot: "bg-red-500" },
};

export const PROVIDER_TEMPLATES: Omit<
  AuthProviderConfig,
  "id" | "lastTested" | "lastTestResult"
>[] = [
  {
    type: "ad-ldap",
    name: "AD / LDAP",
    enabled: false,
    config: {
      serverUrl: "",
      bindDN: "",
      bindPassword: "",
      searchBase: "",
      searchFilter: "(sAMAccountName={username})",
      useSSL: "true",
      port: "636",
    },
  },
  {
    type: "saml2",
    name: "SAML2 (Microsoft Entra ID)",
    enabled: false,
    config: {
      entryPoint: "https://login.microsoftonline.com/<tenant-id>/saml2",
      issuer: "",
      callbackUrl: "",
      cert: "",
      signatureAlgorithm: "sha256",
      wantAssertionsSigned: "true",
    },
  },
  {
    type: "oidc",
    name: "OIDC (GitHub)",
    enabled: false,
    config: {
      issuerUrl: "https://github.com",
      clientId: "",
      clientSecret: "",
      callbackUrl: "",
      scope: "openid email profile",
      authorizationUrl: "https://github.com/login/oauth/authorize",
      tokenUrl: "https://github.com/login/oauth/access_token",
      userInfoUrl: "https://api.github.com/user",
    },
  },
];

export const PERMISSION_CATEGORIES = [
  {
    id: "users",
    name: "User Management",
    permissions: [
      { id: "users.view", name: "View Users", description: "View user list and details" },
      { id: "users.create", name: "Create Users", description: "Create new user accounts" },
      { id: "users.edit", name: "Edit Users", description: "Modify user profiles and roles" },
      { id: "users.delete", name: "Delete Users", description: "Remove user accounts" },
      { id: "users.suspend", name: "Suspend Users", description: "Suspend/activate user accounts" },
    ],
  },
  {
    id: "groups",
    name: "Group Management",
    permissions: [
      { id: "groups.view", name: "View Groups", description: "View group list and members" },
      { id: "groups.create", name: "Create Groups", description: "Create new groups" },
      { id: "groups.edit", name: "Edit Groups", description: "Modify groups and assignments" },
      { id: "groups.delete", name: "Delete Groups", description: "Remove groups" },
    ],
  },
  {
    id: "apps",
    name: "App Access",
    permissions: [
      { id: "apps.view", name: "View Apps", description: "View app catalog" },
      { id: "apps.assign", name: "Assign Apps", description: "Assign apps to users/groups" },
      { id: "apps.configure", name: "Configure Apps", description: "Modify app settings" },
    ],
  },
  {
    id: "system",
    name: "System",
    permissions: [
      { id: "system.auth", name: "Manage Auth", description: "Configure authentication providers" },
      { id: "system.audit", name: "View Audit Log", description: "View system audit trail" },
      { id: "system.settings", name: "System Settings", description: "Modify global system settings" },
    ],
  },
];

export const FIELD_LABELS: Record<string, Record<string, string>> = {
  "ad-ldap": {
    serverUrl: "Server URL",
    bindDN: "Bind DN",
    bindPassword: "Bind Password",
    searchBase: "Search Base",
    searchFilter: "Search Filter",
    useSSL: "Use SSL",
    port: "Port",
  },
  saml2: {
    entryPoint: "Entry Point",
    issuer: "Issuer / Entity ID",
    callbackUrl: "Callback URL",
    cert: "X.509 Certificate",
    signatureAlgorithm: "Signature Algorithm",
    wantAssertionsSigned: "Assert. Signed",
  },
  oidc: {
    issuerUrl: "Issuer URL",
    clientId: "Client ID",
    clientSecret: "Client Secret",
    callbackUrl: "Callback URL",
    scope: "Scope",
    authorizationUrl: "Authorization URL",
    tokenUrl: "Token URL",
    userInfoUrl: "User Info URL",
  },
};
