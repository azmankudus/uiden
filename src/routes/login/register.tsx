import { createSignal, onMount } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import { BRAND } from "~/lib/common/branding";
import { useT } from "~/lib/common/i18n";

export default function Register() {
  const [mounted, setMounted] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);
  const t = useT("login");

  onMount(() => {
    requestAnimationFrame(() => setMounted(true));
  });

  const inputCls = "w-full bg-surface-0 border border-surface-3 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition";

  return (
    <div class="min-h-dvh bg-surface-0 flex items-center justify-center overflow-hidden">
      <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
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
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-dim border border-brand/20 mb-4">
            <AppIcon icon="lucide:user-plus" size={28} style={{ color: "var(--color-brand)" }} />
          </div>
          <h1 class="font-display text-2xl font-bold tracking-tight text-text-primary">
            {t().registerTitle}
          </h1>
          <p class="text-text-secondary mt-2 text-sm">
            {t().registerDesc}
          </p>
        </div>

        <div class="bg-surface-1/80 backdrop-blur-sm border border-surface-3/60 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={(e) => e.preventDefault()} class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().firstName}</label>
                <input type="text" placeholder={t().placeholderFirstName} autocomplete="given-name" class={inputCls} />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().lastName}</label>
                <input type="text" placeholder={t().placeholderLastName} autocomplete="family-name" class={inputCls} />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().email}</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:mail" size={18} />
                </span>
                <input type="email" placeholder={t().placeholderEmail} autocomplete="email" required class={inputCls + " pl-10"} />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().password}</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:lock" size={18} />
                </span>
                <input
                  type={showPassword() ? "text" : "password"}
                  placeholder={t().minChars}
                  autocomplete="new-password"
                  required
                  class={inputCls + " pl-10 pr-11"}
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

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">{t().confirmPassword}</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:lock" size={18} />
                </span>
                <input type={showPassword() ? "text" : "password"} placeholder={t().reenterPassword} autocomplete="new-password" required class={inputCls + " pl-10"} />
              </div>
            </div>

            <label class="flex items-start gap-2.5 cursor-pointer pt-1">
              <input type="checkbox" required class="w-4 h-4 mt-0.5 rounded border-surface-3 accent-brand" />
              <span class="text-sm text-text-secondary leading-snug">
                {t().agreeTo}{" "}
                <button type="button" class="text-brand hover:underline underline-offset-2">{t().termsOfService}</button>{" "}
                {t().and}{" "}
                <button type="button" class="text-brand hover:underline underline-offset-2">{t().privacyPolicy}</button>
              </span>
            </label>

            <button
              type="submit"
              class="w-full py-3 rounded-xl font-semibold text-base bg-brand text-surface-0 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-brand/20"
            >
              {t().createAccountBtn}
            </button>
          </form>
        </div>

        <p class="text-center mt-6 text-sm text-text-muted">
          {t().alreadyHaveAccount}{" "}
          <A href="/login" class="text-brand font-medium hover:underline underline-offset-2">
            {t().signIn}
          </A>
        </p>
      </div>
    </div>
  );
}
