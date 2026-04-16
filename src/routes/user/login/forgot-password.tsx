import { createSignal, onMount, Show } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

export default function ForgotPassword() {
  const [mounted, setMounted] = createSignal(false);
  const [submitted, setSubmitted] = createSignal(false);

  onMount(() => {
    requestAnimationFrame(() => setMounted(true));
  });

  return (
    <div class="min-h-dvh bg-surface-0 flex items-center justify-center overflow-hidden">
      <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-[150px]"
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
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-dim border border-brand/20 mb-4">
            <AppIcon icon="lucide:key-round" size={28} style={{ color: "var(--color-brand)" }} />
          </div>
          <h1 class="font-display text-2xl font-bold tracking-tight text-text-primary">
            {submitted() ? "Check your email" : "Reset password"}
          </h1>
          <p class="text-text-secondary mt-2 text-sm">
            {submitted()
              ? "If an account exists with that email, you'll receive a reset link shortly."
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        <div class="bg-surface-1/80 backdrop-blur-sm border border-surface-3/60 rounded-2xl p-6 sm:p-8 shadow-xl">
          <Show
            when={!submitted()}
            fallback={
              <div class="text-center py-4 animate-pop-in">
                <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-dim mb-4">
                  <AppIcon icon="lucide:mail-check" size={28} style={{ color: "var(--color-brand)" }} />
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  class="text-sm text-brand hover:underline underline-offset-2"
                >
                  Didn't receive it? Try again
                </button>
              </div>
            }
          >
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">Email address</label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                    <AppIcon icon="lucide:mail" size={18} />
                  </span>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    autocomplete="email"
                    required
                    class="w-full bg-surface-0 border border-surface-3 rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="w-full py-3 rounded-xl font-semibold text-base bg-brand text-surface-0 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-brand/20"
              >
                Send reset link
              </button>
            </form>
          </Show>
        </div>

        <p class="text-center mt-6 text-sm text-text-muted">
          <A href="/user/login" class="inline-flex items-center gap-1 text-brand font-medium hover:underline underline-offset-2">
            <AppIcon icon="lucide:arrow-left" size={16} />
            Back to login
          </A>
        </p>
      </div>
    </div>
  );
}
