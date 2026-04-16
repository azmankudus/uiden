import { createSignal, onMount, Show } from "solid-js";
import { A } from "@solidjs/router";
import PublicNav from "~/components/sample/PublicNav";
import AppIcon from "~/components/AppIcon";

const offices = [
  { city: "San Francisco", address: "100 Market St, Suite 400", tz: "PST (UTC-8)", icon: "lucide:building-2" },
  { city: "London", address: "30 Fenchurch St, Level 22", tz: "GMT (UTC+0)", icon: "lucide:building-2" },
  { city: "Singapore", address: "1 Raffles Place, Tower 2", tz: "SGT (UTC+8)", icon: "lucide:building-2" },
];

export default function ContactPage() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  const [submitted, setSubmitted] = createSignal(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PublicNav />
      <div class="pt-16 min-h-screen bg-surface-0">
        <section
          class="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center"
          classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
            <AppIcon icon="lucide:phone" size={14} />
            Contact
          </div>
          <h1 class="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">Get in Touch</h1>
          <p class="text-text-secondary">Have a question or want a demo? We'd love to hear from you.</p>
        </section>

        <section class="max-w-5xl mx-auto px-6 pb-20">
          <div class="grid md:grid-cols-5 gap-8">
            <div class="md:col-span-3">
              <div class="p-6 md:p-8 rounded-2xl bg-surface-1 border border-surface-3/30">
                <Show
                  when={!submitted()}
                  fallback={
                    <div class="text-center py-10">
                      <div class="flex items-center justify-center w-14 h-14 rounded-full bg-brand-dim mx-auto mb-4">
                        <AppIcon icon="lucide:mail-check" size={28} style={{ color: "var(--color-brand)" }} />
                      </div>
                      <h3 class="font-display text-xl font-semibold text-text-primary mb-2">Message Sent</h3>
                      <p class="text-sm text-text-secondary">We'll get back to you within 24 hours.</p>
                      <button type="button" onClick={() => setSubmitted(false)} class="mt-4 text-sm text-brand hover:underline">Send another</button>
                    </div>
                  }
                >
                  <h2 class="font-display text-lg font-semibold text-text-primary mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} class="flex flex-col gap-4">
                    <div class="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs text-text-muted mb-1.5">Name</label>
                        <input type="text" required placeholder="Jane Doe" class="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand" />
                      </div>
                      <div>
                        <label class="block text-xs text-text-muted mb-1.5">Email</label>
                        <input type="email" required placeholder="jane@company.com" class="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand" />
                      </div>
                    </div>
                    <div>
                      <label class="block text-xs text-text-muted mb-1.5">Subject</label>
                      <input type="text" required placeholder="How can we help?" class="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand" />
                    </div>
                    <div>
                      <label class="block text-xs text-text-muted mb-1.5">Message</label>
                      <textarea required rows={4} placeholder="Tell us more..." class="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand resize-none" />
                    </div>
                    <button type="submit" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
                      <AppIcon icon="lucide:send" size={16} />
                      Send Message
                    </button>
                  </form>
                </Show>
              </div>
            </div>

            <div class="md:col-span-2 flex flex-col gap-4">
              <div class="flex flex-col gap-4">
                {offices.map((office) => (
                  <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-dim">
                        <AppIcon icon={office.icon} size={18} style={{ color: "var(--color-brand)" }} />
                      </div>
                      <h3 class="font-display text-sm font-semibold text-text-primary">{office.city}</h3>
                    </div>
                    <p class="text-xs text-text-secondary mb-1">{office.address}</p>
                    <p class="text-xs text-text-muted">{office.tz}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
