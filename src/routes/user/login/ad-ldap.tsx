import { createSignal, onMount } from "solid-js";
import { A, useNavigate, useSearchParams } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

export default function ADLDAPLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mounted, setMounted] = createSignal(false);
  const [domain, setDomain] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [errorMsg, setErrorMsg] = createSignal("");
  const [shakeErr, setShakeErr] = createSignal(false);

  onMount(() => {
    requestAnimationFrame(() => setMounted(true));
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Mock AD/LDAP validation
    if (!domain() || !username() || !password()) {
      setErrorMsg("Please fill in all fields");
      setShakeErr(true);
      setTimeout(() => setShakeErr(false), 400);
      return;
    }
    // In real implementation, this would validate against AD/LDAP
    // For now, just simulate success
    navigate(`/user/login/local?domain=${encodeURIComponent(domain())}&${new URLSearchParams(searchParams).toString()}`);
  };

  const handleGoBack = () => {
    navigate(`/user/login?${new URLSearchParams(searchParams).toString()}`);
  };

  const handleSkipToLocal = () => {
    navigate(`/user/login/local?${new URLSearchParams(searchParams).toString()}`);
  };

  return (
    <div class="min-h-dvh bg-surface-0 flex items-center justify-center overflow-hidden">
      <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)" }}
        />
      </div>

      <div
        class="relative z-10 w-full max-w-md mx-auto px-6 py-12"
        classList={{
          "animate-fade-up": mounted(),
          "opacity-0": !mounted(),
        }}
      >
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 mb-4 animate-float">
            <AppIcon icon="lucide:server" size={32} style={{ color: "#4361ee" }} />
          </div>
          <h1 class="font-display text-4xl font-extrabold tracking-tight">
            <span style={{ color: "#4361ee" }}>AD</span>{" "}
            <span class="text-text-primary">/ LDAP Login</span>
          </h1>
          <p class="text-text-secondary mt-2">Enter your domain credentials</p>
        </div>

        <div class="bg-surface-1/80 backdrop-blur-sm border border-surface-3/60 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} class="space-y-5">
            {errorMsg() && (
              <div
                class="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400 animate-slide-in-right"
                classList={{ "animate-shake": shakeErr() }}
              >
                <AppIcon icon="lucide:circle-alert" size={18} style={{ color: "#f87171" }} />
                {errorMsg()}
              </div>
            )}

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Domain</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:globe" size={18} />
                </span>
                <input
                  type="text"
                  placeholder="domain.local"
                  autocomplete="organization"
                  value={domain()}
                  onInput={(e) => { setDomain(e.currentTarget.value); setErrorMsg(""); }}
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Username</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:user" size={18} />
                </span>
                <input
                  type="text"
                  placeholder="DOMAIN\\username"
                  autocomplete="username"
                  value={username()}
                  onInput={(e) => { setUsername(e.currentTarget.value); setErrorMsg(""); }}
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:lock" size={18} />
                </span>
                <input
                  type={showPassword() ? "text" : "password"}
                  placeholder="Network password"
                  autocomplete="current-password"
                  value={password()}
                  onInput={(e) => { setPassword(e.currentTarget.value); setErrorMsg(""); }}
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl pl-10 pr-11 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition"
                >
                  <AppIcon icon={showPassword() ? "lucide:eye-off" : "lucide:eye"} size={18} />
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="w-4 h-4 rounded border-surface-3 accent-blue-600" />
                <span class="text-sm text-text-secondary">Remember domain</span>
              </label>
              <button
                type="button"
                onClick={handleSkipToLocal}
                class="text-sm text-blue-600 hover:underline underline-offset-2"
              >
                Use local account
              </button>
            </div>

            <button
              type="submit"
              class="w-full py-3 rounded-xl font-semibold text-base bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20"
            >
              Sign in to Domain
            </button>
          </form>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-surface-3" />
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="bg-surface-1 px-3 text-text-muted uppercase tracking-wider">Or</span>
            </div>
          </div>

          <button
            onClick={handleGoBack}
            class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-surface-0 border border-surface-3 text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            <AppIcon icon="lucide:arrow-left" size={18} />
            Back to SSO providers
          </button>
        </div>

        <p class="text-center mt-6 text-sm text-text-muted">
          Page 2 of 3 - AD/LDAP Authentication •{" "}
          <button
            onClick={handleSkipToLocal}
            class="text-blue-600 font-medium hover:underline underline-offset-2"
          >
            Skip to local account
          </button>
        </p>
      </div>
    </div>
  );
}