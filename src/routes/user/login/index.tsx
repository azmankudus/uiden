import { createSignal, onMount } from "solid-js";
import { A, useNavigate, useSearchParams } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import { useAuth } from "~/shell/context/auth";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mounted, setMounted] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [errorMsg, setErrorMsg] = createSignal("");
  const [shakeErr, setShakeErr] = createSignal(false);

  onMount(() => {
    if (auth.isLoggedIn()) {
      navigate(searchParams.redirect || "/landing", { replace: true });
      return;
    }
    requestAnimationFrame(() => setMounted(true));
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const err = auth.login(username(), password());
    if (err) {
      setErrorMsg(err);
      setShakeErr(true);
      setTimeout(() => setShakeErr(false), 400);
    } else {
      navigate(searchParams.redirect || "/landing", { replace: true });
    }
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
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-dim border border-brand/20 mb-4 animate-float">
            <AppIcon icon="lucide:wind" size={32} style={{ color: "var(--color-brand)" }} />
          </div>
          <h1 class="font-display text-4xl font-extrabold tracking-tight">
            <span style={{ color: "var(--color-brand)" }}>Kentut</span>{" "}
            <span class="text-text-primary">SuperApp</span>
          </h1>
          <p class="text-text-secondary mt-2">Sign in to your account</p>
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
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Email or Username</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:user" size={18} />
                </span>
                <input
                  type="text"
                  placeholder="you@company.com"
                  autocomplete="username"
                  value={username()}
                  onInput={(e) => { setUsername(e.currentTarget.value); setErrorMsg(""); }}
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
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
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  value={password()}
                  onInput={(e) => { setPassword(e.currentTarget.value); setErrorMsg(""); }}
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl pl-10 pr-11 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
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
                <input type="checkbox" class="w-4 h-4 rounded border-surface-3 accent-brand" />
                <span class="text-sm text-text-secondary">Remember me</span>
              </label>
              <A href="/user/login/forgot-password" class="text-sm text-brand hover:underline underline-offset-2">
                Forgot password?
              </A>
            </div>

            <button
              type="submit"
              class="w-full py-3 rounded-xl font-semibold text-base bg-brand text-surface-0 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-brand/20"
            >
              Sign in
            </button>
          </form>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-surface-3" />
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="bg-surface-1 px-3 text-text-muted uppercase tracking-wider">Or continue with</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-surface-0 border border-surface-3 text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:-translate-y-0.5 hover:shadow-md"
            >
              <AppIcon icon="lucide:building-2" size={18} style={{ color: "#4361ee" }} />
              AD / LDAP
            </button>
            <button
              type="button"
              class="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-surface-0 border border-surface-3 text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:-translate-y-0.5 hover:shadow-md"
            >
              <AppIcon icon="lucide:shield-check" size={18} style={{ color: "#06d6a0" }} />
              SSO / SAML2
            </button>
            <button
              type="button"
              class="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-surface-0 border border-surface-3 text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:-translate-y-0.5 hover:shadow-md"
            >
              <AppIcon icon="lucide:key-round" size={18} style={{ color: "#f72585" }} />
              OAuth / OIDC
            </button>
            <button
              type="button"
              class="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-surface-0 border border-surface-3 text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:-translate-y-0.5 hover:shadow-md"
            >
              <AppIcon icon="lucide:fingerprint" size={18} style={{ color: "#f8961e" }} />
              Biometric
            </button>
          </div>
        </div>

        <p class="text-center mt-6 text-sm text-text-muted">
          Don't have an account?{" "}
          <A href="/user/login/register" class="text-brand font-medium hover:underline underline-offset-2">
            Create one
          </A>
        </p>
      </div>
    </div>
  );
}
