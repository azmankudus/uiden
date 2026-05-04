import { createSignal, onMount, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import Section from "~/components/common/Section";
import Input from "~/components/common/Input";
import Button from "~/components/common/Button";
import PrivateLayout from "~/components/common/PrivateLayout";
import { useAuth } from "~/lib/common/auth";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { usersNav } from "~/lib/users/nav";
import { BRAND } from "~/lib/common/branding";

export default function AccountPage() {
  const auth = useAuth();
  const { requireAuth } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [toast, setToast] = createSignal(false);
  const [email, setEmail] = createSignal("");

  onMount(() => {
    if (!requireAuth()) return;
    setEmail(`${auth.user()!.username}@${BRAND.shortName.toLowerCase()}.app`);
    requestAnimationFrame(() => setMounted(true));
  });

  const showSaved = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name="Account" icon="lucide:user" slug="superapp" sections={usersNav}>
        <div classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}>
          <div class="space-y-4">
            <Section title="Account Information" icon="lucide:user" description="Your account details and email address">
              <div class="space-y-3">
                <Input label="Username" value={auth.user()?.username || ""} readOnly />
                <Input label="Email" value={email()} onInput={setEmail} placeholder="your@email.com" />
                <Input label="Role" value={auth.user()?.role || ""} readOnly />
              </div>
            </Section>

            <Section title="Change Password" icon="lucide:key-round" description="Update your password to keep your account secure">
              <div class="space-y-3">
                <Input label="Current Password" value="" type="password" placeholder="Enter current password" />
                <Input label="New Password" value="" type="password" placeholder="Enter new password" />
                <Input label="Confirm New Password" value="" type="password" placeholder="Confirm new password" />
              </div>
              <div class="mt-4 flex justify-end">
                <Button variant="primary" onClick={showSaved}>Save Changes</Button>
              </div>
            </Section>
          </div>
        </div>

        <Show when={toast()}>
          <div class="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand/90 backdrop-blur-sm text-surface-0 text-sm font-medium shadow-lg">
              <AppIcon icon="lucide:check" size={16} />
              Saved
            </div>
          </div>
        </Show>
      </PrivateLayout>
    </Show>
  );
}
