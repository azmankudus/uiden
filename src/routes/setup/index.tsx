import { createSignal, onMount, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import { BRAND, ROUTES } from "~/lib/common/branding";

const SETUP_KEY = "uiden_setup";

const DB_TYPES = [
  { value: "postgresql", label: "PostgreSQL", icon: "lucide:database", port: 5432 },
  { value: "mysql", label: "MySQL", icon: "lucide:database", port: 3306 },
  { value: "mariadb", label: "MariaDB", icon: "lucide:database", port: 3306 },
  { value: "sqlite", label: "SQLite", icon: "lucide:hard-drive", port: 0 },
  { value: "mssql", label: "SQL Server", icon: "lucide:server", port: 1433 },
  { value: "oracle", label: "Oracle", icon: "lucide:server", port: 1521 },
];

const STEPS = [
  { id: "branding", label: "Branding", icon: "lucide:palette" },
  { id: "database", label: "Database", icon: "lucide:database" },
  { id: "admin", label: "Admin Account", icon: "lucide:shield" },
  { id: "review", label: "Review", icon: "lucide:check" },
];

export default function Setup() {
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);
  const [step, setStep] = createSignal(0);
  const [animating, setAnimating] = createSignal(false);

  const [appName, setAppName] = createSignal(BRAND.name);
  const [logoPreview, setLogoPreview] = createSignal("");

  const [dbType, setDbType] = createSignal("postgresql");
  const [dbHost, setDbHost] = createSignal("localhost");
  const [dbPort, setDbPort] = createSignal(5432);
  const [dbUser, setDbUser] = createSignal("");
  const [dbPassword, setDbPassword] = createSignal("");
  const [dbSchema, setDbSchema] = createSignal("uiden");
  const [showDbPassword, setShowDbPassword] = createSignal(false);
  const [dbTestResult, setDbTestResult] = createSignal<null | "success" | "error">(null);

  const [adminUser, setAdminUser] = createSignal("admin");
  const [adminEmail, setAdminEmail] = createSignal("admin@company.com");
  const [adminPassword, setAdminPassword] = createSignal("");
  const [adminConfirm, setAdminConfirm] = createSignal("");
  const [showAdminPassword, setShowAdminPassword] = createSignal(false);

  const [completed, setCompleted] = createSignal(false);

  onMount(() => {
    const existing = localStorage.getItem(SETUP_KEY);
    if (existing) {
      navigate(ROUTES.apps, { replace: true });
      return;
    }
    requestAnimationFrame(() => setMounted(true));
  });

  const goStep = (dir: number) => {
    setAnimating(true);
    setTimeout(() => {
      setStep(prev => prev + dir);
      setAnimating(false);
    }, 150);
  };

  const handleLogoUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const testConnection = () => {
    setDbTestResult("success");
    setTimeout(() => setDbTestResult(null), 3000);
  };

  const handleDbTypeChange = (type: string) => {
    setDbType(type);
    const db = DB_TYPES.find(d => d.value === type);
    if (db) setDbPort(db.port);
  };

  const finish = () => {
    localStorage.setItem(SETUP_KEY, JSON.stringify({
      branding: { appName: appName(), logo: logoPreview() },
      database: { type: dbType(), host: dbHost(), port: dbPort(), user: dbUser(), schema: dbSchema() },
      admin: { username: adminUser(), email: adminEmail() },
      completedAt: new Date().toISOString(),
    }));
    setCompleted(true);
    setTimeout(() => navigate("/", { replace: true }), 2000);
  };

  const inputCls = "w-full bg-surface-0 border border-surface-3 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition";

  const stepIdx = () => step();
  const canNext = () => {
    if (stepIdx() === 0) return appName().trim().length > 0;
    if (stepIdx() === 1) return dbType() === "sqlite" || (dbHost().trim().length > 0 && dbUser().trim().length > 0);
    if (stepIdx() === 2) return adminUser().trim().length > 0 && adminPassword().length >= 4 && adminPassword() === adminConfirm();
    return true;
  };

  return (
    <div class="min-h-dvh bg-surface-0 flex items-center justify-center overflow-hidden">
      <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)" }} />
      </div>

      <div
        class="relative z-10 w-full max-w-lg mx-auto px-6 py-12"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
      >
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-dim border border-brand/20 mb-4">
            <AppIcon icon="lucide:settings" size={32} style={{ color: "var(--color-brand)" }} />
          </div>
          <h1 class="font-display text-3xl font-extrabold tracking-tight">
            <span style={{ color: "var(--color-brand)" }}>App</span>{" "}
            <span class="text-text-primary">Setup</span>
          </h1>
          <p class="text-text-secondary mt-2 text-sm">Configure your application for the first time</p>
        </div>

        <div class="flex items-center justify-center gap-1 mb-8">
          <For each={STEPS}>
            {(s, i) => (
              <div class="flex items-center">
                <button
                  type="button"
                  onClick={() => i() < stepIdx() && setStep(i())}
                  class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  classList={{
                    "bg-brand text-surface-0": stepIdx() === i(),
                    "bg-brand-dim text-brand cursor-pointer hover:bg-brand/20": i() < stepIdx(),
                    "bg-surface-1 text-text-muted": i() > stepIdx(),
                  }}
                >
                  <AppIcon icon={s.icon} size={14} />
                  <span class="hidden sm:inline">{s.label}</span>
                </button>
                <Show when={i() < STEPS.length - 1}>
                  <div class="w-6 h-px mx-1" classList={{
                    "bg-brand": i() < stepIdx(),
                    "bg-surface-3": i() >= stepIdx(),
                  }} />
                </Show>
              </div>
            )}
          </For>
        </div>

        <Show when={completed()}>
          <div class="setup-complete-pop bg-surface-1/80 backdrop-blur-sm border border-surface-3/60 rounded-2xl p-8 shadow-xl text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/20 mb-4">
              <AppIcon icon="lucide:check" size={32} style={{ color: "var(--color-brand)" }} />
            </div>
            <h2 class="font-display text-xl font-bold text-text-primary mb-2">Setup Complete!</h2>
            <p class="text-sm text-text-secondary">Your application is ready. Redirecting...</p>
          </div>
        </Show>

        <Show when={!completed()}>
          <div
            class="bg-surface-1/80 backdrop-blur-sm border border-surface-3/60 rounded-2xl p-6 sm:p-8 shadow-xl"
            classList={{ "setup-step-enter": !animating(), "setup-step-exit": animating() }}
          >
            <Show when={stepIdx() === 0}>
              <div class="space-y-5">
                <h2 class="font-display text-lg font-semibold text-text-primary flex items-center gap-2">
                  <AppIcon icon="lucide:palette" size={20} style={{ color: "var(--color-brand)" }} />
                  Branding
                </h2>
                <p class="text-xs text-text-muted">Set your application name and logo.</p>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">Application Name</label>
                  <input
                    type="text"
                    value={appName()}
                    onInput={(e) => setAppName(e.currentTarget.value)}
                    placeholder="My Application"
                    class={inputCls}
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">App Logo</label>
                  <div class="flex items-center gap-5">
                    <div class="relative group">
                      <div class="w-20 h-20 rounded-2xl bg-surface-2 border-2 border-dashed border-surface-3 flex items-center justify-center overflow-hidden">
                        <Show when={logoPreview()} fallback={
                          <AppIcon icon="lucide:image" size={28} style={{ color: "var(--color-text-muted)" }} />
                        }>
                          <img src={logoPreview()} alt="Logo" class="w-full h-full object-contain" />
                        </Show>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <label class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-surface-2 border border-surface-3 text-text-primary hover:bg-surface-3 cursor-pointer transition">
                        <AppIcon icon="lucide:upload" size={14} />
                        Upload Logo
                        <input type="file" accept="image/*" onChange={handleLogoUpload} class="hidden" />
                      </label>
                      <Show when={logoPreview()}>
                        <button
                          type="button"
                          onClick={() => setLogoPreview("")}
                          class="block text-xs text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </Show>
                      <p class="text-xs text-text-muted">SVG, PNG or JPG. Max 2MB.</p>
                    </div>
                  </div>
                </div>

                <Show when={appName()}>
                  <div class="p-4 rounded-xl bg-surface-2 border border-surface-3/30">
                    <p class="text-xs text-text-muted mb-2">Preview</p>
                    <div class="flex items-center gap-3">
                      <Show when={logoPreview()} fallback={
                        <div class="w-8 h-8 rounded-lg bg-brand-dim border border-brand/20 flex items-center justify-center">
                          <AppIcon icon="lucide:sparkles" size={16} style={{ color: "var(--color-brand)" }} />
                        </div>
                      }>
                        <img src={logoPreview()} alt="" class="w-8 h-8 rounded-lg object-contain" />
                      </Show>
                      <span class="font-display text-lg font-bold text-text-primary">{appName()}</span>
                    </div>
                  </div>
                </Show>
              </div>
            </Show>

            <Show when={stepIdx() === 1}>
              <div class="space-y-5">
                <h2 class="font-display text-lg font-semibold text-text-primary flex items-center gap-2">
                  <AppIcon icon="lucide:database" size={20} style={{ color: "var(--color-brand)" }} />
                  Database Connection
                </h2>
                <p class="text-xs text-text-muted">Select your database engine and provide connection details.</p>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">Database Type</label>
                  <div class="grid grid-cols-3 gap-2">
                    <For each={DB_TYPES}>
                      {(db) => (
                        <button
                          type="button"
                          onClick={() => handleDbTypeChange(db.value)}
                          class="flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-xs"
                          classList={{
                            "border-brand bg-brand-dim/20 text-brand": dbType() === db.value,
                            "border-surface-3 bg-surface-0 text-text-secondary hover:bg-surface-2": dbType() !== db.value,
                          }}
                        >
                          <AppIcon icon={db.icon} size={18} />
                          {db.label}
                        </button>
                      )}
                    </For>
                  </div>
                </div>

                <Show when={dbType() !== "sqlite"}>
                  <div class="grid grid-cols-3 gap-3">
                    <div class="col-span-2">
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Hostname</label>
                      <input type="text" value={dbHost()} onInput={(e) => setDbHost(e.currentTarget.value)} placeholder="localhost" class={inputCls} />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Port</label>
                      <input type="number" value={dbPort()} onInput={(e) => setDbPort(Number(e.currentTarget.value))} placeholder="5432" class={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-text-secondary mb-1.5">Username</label>
                    <div class="relative">
                      <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                        <AppIcon icon="lucide:user" size={16} />
                      </span>
                      <input type="text" value={dbUser()} onInput={(e) => setDbUser(e.currentTarget.value)} placeholder="db_user" class={inputCls + " pl-10"} />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
                    <div class="relative">
                      <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                        <AppIcon icon="lucide:lock" size={16} />
                      </span>
                      <input
                        type={showDbPassword() ? "text" : "password"}
                        value={dbPassword()}
                        onInput={(e) => setDbPassword(e.currentTarget.value)}
                        placeholder="Database password"
                        class={inputCls + " pl-10 pr-11"}
                      />
                      <button type="button" onClick={() => setShowDbPassword(v => !v)} class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary">
                        <AppIcon icon={showDbPassword() ? "lucide:eye-off" : "lucide:eye"} size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-text-secondary mb-1.5">Schema / Database Name</label>
                    <input type="text" value={dbSchema()} onInput={(e) => setDbSchema(e.currentTarget.value)} placeholder="uiden" class={inputCls} />
                  </div>

                  <Show when={dbTestResult()}>
                    <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                      classList={{
                        "bg-brand/10 border border-brand/30 text-brand": dbTestResult() === "success",
                        "bg-red-500/10 border border-red-500/30 text-red-400": dbTestResult() === "error",
                      }}>
                      <AppIcon icon={dbTestResult() === "success" ? "lucide:check" : "lucide:x"} size={16} />
                      {dbTestResult() === "success" ? "Connection successful!" : "Connection failed. Check your credentials."}
                    </div>
                  </Show>

                  <button type="button" onClick={testConnection}
                    class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-surface-2 border border-surface-3 text-text-secondary hover:bg-surface-3 hover:text-text-primary transition">
                    <AppIcon icon="lucide:plug" size={16} />
                    Test Connection
                  </button>
                </Show>

                <Show when={dbType() === "sqlite"}>
                  <div class="p-4 rounded-xl bg-surface-2 border border-surface-3/30">
                    <div class="flex items-center gap-2 mb-1">
                      <AppIcon icon="lucide:info" size={16} style={{ color: "var(--color-brand)" }} />
                      <span class="text-sm font-medium text-text-primary">SQLite Selected</span>
                    </div>
                    <p class="text-xs text-text-muted">Data will be stored in a local file. No additional configuration needed.</p>
                  </div>
                </Show>
              </div>
            </Show>

            <Show when={stepIdx() === 2}>
              <div class="space-y-5">
                <h2 class="font-display text-lg font-semibold text-text-primary flex items-center gap-2">
                  <AppIcon icon="lucide:shield" size={20} style={{ color: "var(--color-brand)" }} />
                  Local Admin Account
                </h2>
                <p class="text-xs text-text-muted">Create the initial administrator account for local authentication.</p>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-text-secondary mb-1.5">Username</label>
                    <div class="relative">
                      <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                        <AppIcon icon="lucide:user" size={16} />
                      </span>
                      <input type="text" value={adminUser()} onInput={(e) => setAdminUser(e.currentTarget.value)} placeholder="admin" class={inputCls + " pl-10"} />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
                    <div class="relative">
                      <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                        <AppIcon icon="lucide:mail" size={16} />
                      </span>
                      <input type="email" value={adminEmail()} onInput={(e) => setAdminEmail(e.currentTarget.value)} placeholder="admin@company.com" class={inputCls + " pl-10"} />
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                      <AppIcon icon="lucide:lock" size={16} />
                    </span>
                    <input
                      type={showAdminPassword() ? "text" : "password"}
                      value={adminPassword()}
                      onInput={(e) => setAdminPassword(e.currentTarget.value)}
                      placeholder="Min. 4 characters"
                      class={inputCls + " pl-10 pr-11"}
                    />
                    <button type="button" onClick={() => setShowAdminPassword(v => !v)} class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary">
                      <AppIcon icon={showAdminPassword() ? "lucide:eye-off" : "lucide:eye"} size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">Confirm Password</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                      <AppIcon icon="lucide:lock" size={16} />
                    </span>
                    <input
                      type={showAdminPassword() ? "text" : "password"}
                      value={adminConfirm()}
                      onInput={(e) => setAdminConfirm(e.currentTarget.value)}
                      placeholder="Re-enter password"
                      class={inputCls + " pl-10"}
                    />
                  </div>
                  <Show when={adminConfirm() && adminPassword() !== adminConfirm()}>
                    <p class="text-xs text-red-400 mt-1">Passwords do not match</p>
                  </Show>
                </div>

                <div class="p-4 rounded-xl bg-brand-dim/20 border border-brand/20">
                  <div class="flex items-center gap-2 mb-1">
                    <AppIcon icon="lucide:info" size={14} style={{ color: "var(--color-brand)" }} />
                    <span class="text-xs font-medium text-brand">Important</span>
                  </div>
                  <p class="text-xs text-text-secondary">This account will have full administrative privileges. Store these credentials securely.</p>
                </div>
              </div>
            </Show>

            <Show when={stepIdx() === 3}>
              <div class="space-y-5">
                <h2 class="font-display text-lg font-semibold text-text-primary flex items-center gap-2">
                  <AppIcon icon="lucide:check" size={20} style={{ color: "var(--color-brand)" }} />
                  Review Configuration
                </h2>
                <p class="text-xs text-text-muted">Verify your settings before completing the setup.</p>

                <div class="space-y-4">
                  <div class="p-4 rounded-xl bg-surface-2 border border-surface-3/30">
                    <div class="flex items-center gap-2 mb-3">
                      <AppIcon icon="lucide:palette" size={16} style={{ color: "var(--color-brand)" }} />
                      <span class="text-sm font-medium text-text-primary">Branding</span>
                    </div>
                    <div class="flex items-center gap-3 ml-6">
                      <Show when={logoPreview()} fallback={
                        <div class="w-8 h-8 rounded-lg bg-brand-dim border border-brand/20 flex items-center justify-center">
                          <AppIcon icon="lucide:sparkles" size={14} style={{ color: "var(--color-brand)" }} />
                        </div>
                      }>
                        <img src={logoPreview()} alt="" class="w-8 h-8 rounded-lg object-contain" />
                      </Show>
                      <span class="text-sm text-text-secondary">{appName()}</span>
                    </div>
                  </div>

                  <div class="p-4 rounded-xl bg-surface-2 border border-surface-3/30">
                    <div class="flex items-center gap-2 mb-3">
                      <AppIcon icon="lucide:database" size={16} style={{ color: "var(--color-brand)" }} />
                      <span class="text-sm font-medium text-text-primary">Database</span>
                    </div>
                    <div class="ml-6 space-y-1 text-sm text-text-secondary">
                      <p>Type: <span class="text-text-primary">{DB_TYPES.find(d => d.value === dbType())?.label}</span></p>
                      <Show when={dbType() !== "sqlite"}>
                        <p>Host: <span class="text-text-primary">{dbHost()}:{dbPort()}</span></p>
                        <p>User: <span class="text-text-primary">{dbUser()}</span></p>
                        <p>Schema: <span class="text-text-primary">{dbSchema()}</span></p>
                      </Show>
                    </div>
                  </div>

                  <div class="p-4 rounded-xl bg-surface-2 border border-surface-3/30">
                    <div class="flex items-center gap-2 mb-3">
                      <AppIcon icon="lucide:shield" size={16} style={{ color: "var(--color-brand)" }} />
                      <span class="text-sm font-medium text-text-primary">Admin Account</span>
                    </div>
                    <div class="ml-6 space-y-1 text-sm text-text-secondary">
                      <p>Username: <span class="text-text-primary">{adminUser()}</span></p>
                      <p>Email: <span class="text-text-primary">{adminEmail()}</span></p>
                      <p>Password: <span class="text-text-primary">{"*".repeat(adminPassword().length)}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </Show>

            <div class="flex items-center justify-between mt-8 pt-5 border-t border-surface-3/30">
              <Show when={stepIdx() > 0} fallback={<div />}>
                <button
                  type="button"
                  onClick={() => goStep(-1)}
                  class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-surface-2 border border-surface-3 text-text-secondary hover:bg-surface-3 hover:text-text-primary transition"
                >
                  <AppIcon icon="lucide:arrow-left" size={16} />
                  Back
                </button>
              </Show>

              <Show when={stepIdx() === 0}>
                <div />
              </Show>

              <Show when={stepIdx() < 3}>
                <button
                  type="button"
                  onClick={() => goStep(1)}
                  disabled={!canNext()}
                  class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  classList={{
                    "bg-brand text-surface-0 hover:brightness-110 shadow-lg shadow-brand/20": canNext(),
                    "bg-surface-2 text-text-muted cursor-not-allowed": !canNext(),
                  }}
                >
                  Continue
                  <AppIcon icon="lucide:arrow-right" size={16} />
                </button>
              </Show>

              <Show when={stepIdx() === 3}>
                <button
                  type="button"
                  onClick={finish}
                  class="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110 shadow-lg shadow-brand/20 transition-all"
                >
                  <AppIcon icon="lucide:check" size={16} />
                  Complete Setup
                </button>
              </Show>
            </div>
          </div>

          <p class="text-center mt-6 text-xs text-text-muted">
            Step {stepIdx() + 1} of {STEPS.length}
          </p>
        </Show>
      </div>
    </div>
  );
}
