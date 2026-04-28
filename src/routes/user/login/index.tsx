import { createSignal, onMount } from "solid-js";
import { A, useNavigate, useSearchParams } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

export default function SSOLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mounted, setMounted] = createSignal(false);
  const [selectedProvider, setSelectedProvider] = createSignal<string | null>(null);

  onMount(() => {
    requestAnimationFrame(() => setMounted(true));
  });

  const handleContinue = () => {
    navigate(`/user/login/ad-ldap?provider=${selectedProvider() || "skip"}&${new URLSearchParams(searchParams).toString()}`);
  };

  const handleUseAD = () => {
    navigate(`/user/login/ad-ldap?${new URLSearchParams(searchParams).toString()}`);
  };

  const handleUseLocal = () => {
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
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-dim border border-brand/20 mb-4 animate-float">
            <AppIcon icon="lucide:cloud-lock" size={32} style={{ color: "var(--color-brand)" }} />
          </div>
          <h1 class="font-display text-4xl font-extrabold tracking-tight">
            <span style={{ color: "var(--color-brand)" }}>Kentut</span>{" "}
            <span class="text-text-primary">SuperApp</span>
          </h1>
          <p class="text-text-secondary mt-2">Choose your SSO provider</p>
        </div>

        <div class="bg-surface-1/80 backdrop-blur-sm border border-surface-3/60 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div class="text-center mb-6">
            <p class="text-text-secondary text-sm mb-4">Select a configured SSO provider to continue</p>
          </div>

          <div class="grid gap-3 mb-6">
            <button
              onClick={() => setSelectedProvider("entra-id")}
              class={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                selectedProvider() === "entra-id"
                  ? "border-brand bg-brand-dim/20"
                  : "border-surface-3 bg-surface-0 hover:bg-surface-2 hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <AppIcon icon="lucide:shield-check" size={20} style={{ color: "#4361ee" }} />
                </div>
                <div class="text-left">
                  <div class="font-medium text-text-primary">Microsoft Entra ID</div>
                  <div class="text-xs text-text-muted">SAML 2.0</div>
                </div>
              </div>
              {selectedProvider() === "entra-id" && (
                <AppIcon icon="lucide:check-circle" size={20} style={{ color: "var(--color-brand)" }} />
              )}
            </button>

            <button
              onClick={() => setSelectedProvider("github")}
              class={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                selectedProvider() === "github"
                  ? "border-brand bg-brand-dim/20"
                  : "border-surface-3 bg-surface-0 hover:bg-surface-2 hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  <AppIcon icon="lucide:github" size={20} style={{ color: "#333" }} />
                </div>
                <div class="text-left">
                  <div class="font-medium text-text-primary">GitHub OAuth</div>
                  <div class="text-xs text-text-muted">OIDC</div>
                </div>
              </div>
              {selectedProvider() === "github" && (
                <AppIcon icon="lucide:check-circle" size={20} style={{ color: "var(--color-brand)" }} />
              )}
            </button>

            <button
              onClick={() => setSelectedProvider("okta")}
              class={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                selectedProvider() === "okta"
                  ? "border-brand bg-brand-dim/20"
                  : "border-surface-3 bg-surface-0 hover:bg-surface-2 hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <AppIcon icon="lucide:key-round" size={20} style={{ color: "#7c3aed" }} />
                </div>
                <div class="text-left">
                  <div class="font-medium text-text-primary">Okta</div>
                  <div class="text-xs text-text-muted">SAML 2.0</div>
                </div>
              </div>
              {selectedProvider() === "okta" && (
                <AppIcon icon="lucide:check-circle" size={20} style={{ color: "var(--color-brand)" }} />
              )}
            </button>
          </div>

          <div class="space-y-4">
            <button
              onClick={handleContinue}
              disabled={!selectedProvider()}
              class={`w-full py-3 rounded-xl font-semibold text-base transition-all shadow-lg ${
                selectedProvider()
                  ? "bg-brand text-surface-0 hover:brightness-110 active:scale-[0.98] shadow-brand/20"
                  : "bg-surface-2 text-text-muted cursor-not-allowed"
              }`}
            >
              Continue with {selectedProvider() ? "selected provider" : "SSO"}
            </button>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-surface-3" />
              </div>
              <div class="relative flex justify-center text-xs">
                <span class="bg-surface-1 px-3 text-text-muted uppercase tracking-wider">Or use</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <button
                onClick={handleUseAD}
                class="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-surface-0 border border-surface-3 text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <AppIcon icon="lucide:building-2" size={18} style={{ color: "#4361ee" }} />
                AD / LDAP
              </button>
              <button
                onClick={handleUseLocal}
                class="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-surface-0 border border-surface-3 text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <AppIcon icon="lucide:key-round" size={18} style={{ color: "#f72585" }} />
                Local Account
              </button>
            </div>
          </div>
        </div>

        <p class="text-center mt-6 text-sm text-text-muted">
          Page 1 of 3 - SSO Providers •{" "}
          <button
            onClick={handleUseLocal}
            class="text-brand font-medium hover:underline underline-offset-2"
          >
            Skip to local account
          </button>
        </p>
      </div>
    </div>
  );
}
