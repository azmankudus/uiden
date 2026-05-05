import { createSignal, onMount, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import Section from "~/components/common/Section";
import Input from "~/components/common/Input";
import Button from "~/components/common/Button";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import { useAuth } from "~/lib/common/auth";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { getUsersNav } from "~/lib/users/nav";
import { BRAND } from "~/lib/common/branding";
import { useT } from "~/lib/common/i18n";

export default function AccountPage() {
  const t = useT("users");
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
      <PrivateLayout name={t().accountTitle} icon="lucide:user" slug="superapp" sections={getUsersNav(t)}>
        <div class="pb-12 space-y-4 animate-fade-up">
          <PageHeader title={t().accountTitle} icon="lucide:user" />

          <Section title={t().accountInfo} icon="lucide:user" description={t().accountInfoDesc}>
            <div class="space-y-3">
              <Input label={t().username} value={auth.user()?.username || ""} readOnly />
              <Input label={t().email} value={email()} onInput={setEmail} placeholder={t().phYourEmail} />
              <Input label={t().role} value={auth.user()?.role || ""} readOnly />
            </div>
          </Section>

          <Section title={t().changePassword} icon="lucide:key-round" description={t().changePasswordDesc}>
            <div class="space-y-3">
              <Input label={t().currentPassword} value="" type="password" placeholder={t().phEnterCurrentPassword} />
              <Input label={t().newPassword} value="" type="password" placeholder={t().phEnterNewPassword} />
              <Input label={t().confirmNewPassword} value="" type="password" placeholder={t().phConfirmNewPassword} />
            </div>
            <div class="mt-4 flex justify-end">
              <Button onClick={showSaved}>{t().saveChanges}</Button>
            </div>
          </Section>
        </div>

        <Show when={toast()}>
          <div class="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand/90 backdrop-blur-sm text-surface-0 text-sm font-medium shadow-lg">
              <AppIcon icon="lucide:check" size={16} />
              {t().saved}
            </div>
          </div>
        </Show>
      </PrivateLayout>
    </Show>
  );
}
