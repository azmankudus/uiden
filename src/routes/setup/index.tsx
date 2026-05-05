import { createSignal, onMount, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import Input from "~/components/common/Input";
import Button from "~/components/common/Button";
import { BRAND, ROUTES } from "~/lib/common/branding";
import { useT } from "~/lib/common/i18n";

const SETUP_KEY = "uiden_setup";

const DB_TYPES = [
  { value: "postgresql", label: "PostgreSQL", icon: "lucide:database", port: 5432 },
  { value: "mysql", label: "MySQL", icon: "lucide:database", port: 3306 },
  { value: "mariadb", label: "MariaDB", icon: "lucide:database", port: 3306 },
  { value: "sqlite", label: "SQLite", icon: "lucide:hard-drive", port: 0 },
  { value: "mssql", label: "SQL Server", icon: "lucide:server", port: 1433 },
  { value: "oracle", label: "Oracle", icon: "lucide:server", port: 1521 },
];

export default function Setup() {
  const t = useT("setup");
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
  const [dbTestResult, setDbTestResult] = createSignal<null | "success" | "error">(null);

  const [adminUser, setAdminUser] = createSignal("admin");
  const [adminEmail, setAdminEmail] = createSignal("admin@company.com");
  const [adminPassword, setAdminPassword] = createSignal("");
  const [adminConfirm, setAdminConfirm] = createSignal("");

  const [completed, setCompleted] = createSignal(false);

  const steps = () => [
    { id: "branding", label: t().stepBranding, icon: "lucide:palette" },
    { id: "database", label: t().stepDatabase, icon: "lucide:database" },
    { id: "admin", label: t().stepAdmin, icon: "lucide:shield" },
    { id: "review", label: t().stepReview, icon: "lucide:check" },
  ];

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
            <span style={{ color: "var(--color-brand)" }}>{t().setupTitle.split(" ")[0]}</span>{" "}
            <span class="text-text-primary">{t().setupTitle.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p class="text-text-secondary mt-2 text-sm">{t().setupDesc}</p>
        </div>

        <div class="flex items-center justify-center gap-1 mb-8">
          <For each={steps()}>
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
                <Show when={i() < steps().length - 1}>
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
            <h2 class="font-display text-xl font-bold text-text-primary mb-2">{t().setupComplete}</h2>
            <p class="text-sm text-text-secondary">{t().redirecting}</p>
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
                  {t().stepBranding}
                </h2>
                <p class="text-xs text-text-muted">{t().brandingSubtext}</p>

                <Input label={t().appName} value={appName()} onInput={setAppName} placeholder={t().phMyApp} />

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().appLogo}</label>
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
                        {t().uploadLogo}
                        <input type="file" accept="image/*" onChange={handleLogoUpload} class="hidden" />
                      </label>
                      <Show when={logoPreview()}>
                        <button
                          type="button"
                          onClick={() => setLogoPreview("")}
                          class="block text-xs text-red-400 hover:underline"
                        >
                          {t().remove}
                        </button>
                      </Show>
                      <p class="text-xs text-text-muted">{t().svgPngJpg}</p>
                    </div>
                  </div>
                </div>

                <Show when={appName()}>
                  <div class="p-4 rounded-xl bg-surface-2 border border-surface-3/30">
                    <p class="text-xs text-text-muted mb-2">{t().preview}</p>
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
                  {t().dbConnection}
                </h2>
                <p class="text-xs text-text-muted">{t().dbSelectEngine}</p>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().dbType}</label>
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
                      <Input label={t().hostname} value={dbHost()} onInput={setDbHost} placeholder={t().phLocalhost} />
                    </div>
                    <Input label={t().port} value={String(dbPort())} onInput={(v) => setDbPort(Number(v))} placeholder="5432" />
                  </div>

                  <Input label={t().username} value={dbUser()} onInput={setDbUser} icon="lucide:user" placeholder={t().phDbUser} />
                  <Input label={t().dbPassword} value={dbPassword()} onInput={setDbPassword} type="password" icon="lucide:lock" placeholder={t().dbPasswordPlaceholder} />
                  <Input label={t().schema} value={dbSchema()} onInput={setDbSchema} placeholder={t().phSchemaDefault} />

                  <Show when={dbTestResult()}>
                    <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                      classList={{
                        "bg-brand/10 border border-brand/30 text-brand": dbTestResult() === "success",
                        "bg-red-500/10 border border-red-500/30 text-red-400": dbTestResult() === "error",
                      }}>
                      <AppIcon icon={dbTestResult() === "success" ? "lucide:check" : "lucide:x"} size={16} />
                      {dbTestResult() === "success" ? t().connectionSuccess : t().connectionFailed}
                    </div>
                  </Show>

                  <Button variant="secondary" icon="lucide:plug" onClick={testConnection}>{t().testConnection}</Button>
                </Show>

                <Show when={dbType() === "sqlite"}>
                  <div class="p-4 rounded-xl bg-surface-2 border border-surface-3/30">
                    <div class="flex items-center gap-2 mb-1">
                      <AppIcon icon="lucide:info" size={16} style={{ color: "var(--color-brand)" }} />
                      <span class="text-sm font-medium text-text-primary">{t().sqliteSelected}</span>
                    </div>
                    <p class="text-xs text-text-muted">{t().sqliteInfo}</p>
                  </div>
                </Show>
              </div>
            </Show>

            <Show when={stepIdx() === 2}>
              <div class="space-y-5">
                <h2 class="font-display text-lg font-semibold text-text-primary flex items-center gap-2">
                  <AppIcon icon="lucide:shield" size={20} style={{ color: "var(--color-brand)" }} />
                  {t().localAdmin}
                </h2>
                <p class="text-xs text-text-muted">{t().localAdminDesc}</p>

                <div class="grid grid-cols-2 gap-3">
                  <Input label={t().username} value={adminUser()} onInput={setAdminUser} icon="lucide:user" placeholder={t().phAdminDefault} />
                  <Input label={t().email} value={adminEmail()} onInput={setAdminEmail} type="email" icon="lucide:mail" placeholder={t().phAdminEmail} />
                </div>

                <Input label={t().password} value={adminPassword()} onInput={setAdminPassword} type="password" icon="lucide:lock" placeholder={t().minChars} />
                <Input label={t().confirmPassword} value={adminConfirm()} onInput={setAdminConfirm} type="password" icon="lucide:lock" placeholder={t().reenterPassword} error={adminConfirm() && adminPassword() !== adminConfirm() ? t().passwordsNoMatch : undefined} />

                <div class="p-4 rounded-xl bg-brand-dim/20 border border-brand/20">
                  <div class="flex items-center gap-2 mb-1">
                    <AppIcon icon="lucide:info" size={14} style={{ color: "var(--color-brand)" }} />
                    <span class="text-xs font-medium text-brand">{t().important}</span>
                  </div>
                  <p class="text-xs text-text-secondary">{t().adminInfo}</p>
                </div>
              </div>
            </Show>

            <Show when={stepIdx() === 3}>
              <div class="space-y-5">
                <h2 class="font-display text-lg font-semibold text-text-primary flex items-center gap-2">
                  <AppIcon icon="lucide:check" size={20} style={{ color: "var(--color-brand)" }} />
                  {t().reviewConfig}
                </h2>
                <p class="text-xs text-text-muted">{t().reviewDesc}</p>

                <div class="space-y-4">
                  <div class="p-4 rounded-xl bg-surface-2 border border-surface-3/30">
                    <div class="flex items-center gap-2 mb-3">
                      <AppIcon icon="lucide:palette" size={16} style={{ color: "var(--color-brand)" }} />
                      <span class="text-sm font-medium text-text-primary">{t().branding}</span>
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
                      <span class="text-sm font-medium text-text-primary">{t().database}</span>
                    </div>
                    <div class="ml-6 space-y-1 text-sm text-text-secondary">
                      <p>{t().typeLabel}: <span class="text-text-primary">{DB_TYPES.find(d => d.value === dbType())?.label}</span></p>
                      <Show when={dbType() !== "sqlite"}>
                        <p>{t().host}: <span class="text-text-primary">{dbHost()}:{dbPort()}</span></p>
                        <p>{t().user}: <span class="text-text-primary">{dbUser()}</span></p>
                        <p>{t().schemaLabel}: <span class="text-text-primary">{dbSchema()}</span></p>
                      </Show>
                    </div>
                  </div>

                  <div class="p-4 rounded-xl bg-surface-2 border border-surface-3/30">
                    <div class="flex items-center gap-2 mb-3">
                      <AppIcon icon="lucide:shield" size={16} style={{ color: "var(--color-brand)" }} />
                      <span class="text-sm font-medium text-text-primary">{t().adminAccount}</span>
                    </div>
                    <div class="ml-6 space-y-1 text-sm text-text-secondary">
                      <p>{t().reviewUsername}: <span class="text-text-primary">{adminUser()}</span></p>
                      <p>{t().reviewEmail}: <span class="text-text-primary">{adminEmail()}</span></p>
                      <p>{t().reviewPassword}: <span class="text-text-primary">{"*".repeat(adminPassword().length)}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </Show>

            <div class="flex items-center justify-between mt-8 pt-5 border-t border-surface-3/30">
              <Show when={stepIdx() > 0} fallback={<div />}>
                <Button variant="secondary" icon="lucide:arrow-left" onClick={() => goStep(-1)}>{t().back}</Button>
              </Show>

              <Show when={stepIdx() === 0}>
                <div />
              </Show>

              <Show when={stepIdx() < 3}>
                <Button icon="lucide:arrow-right" onClick={() => goStep(1)} disabled={!canNext()}>{t().continue}</Button>
              </Show>

              <Show when={stepIdx() === 3}>
                <Button icon="lucide:check" onClick={finish}>{t().completeSetup}</Button>
              </Show>
            </div>
          </div>

          <p class="text-center mt-6 text-xs text-text-muted">
            {t().stepOf} {stepIdx() + 1} {t().of} {steps().length}
          </p>
        </Show>
      </div>
    </div>
  );
}
