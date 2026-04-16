import { createSignal } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";

export default function SettingsPage() {
  const [appName, setAppName] = createSignal("Ayam Goreng");
  const [sessionTimeout, setSessionTimeout] = createSignal("30");
  const [twoFactor, setTwoFactor] = createSignal(true);
  const [saved, setSaved] = createSignal(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div class="max-w-2xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">System Settings</h1>
        <p class="text-sm text-text-secondary mt-1">Configure application preferences and security policies.</p>
      </div>

      <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 space-y-6">
        <div>
          <label class="block text-xs font-medium text-text-secondary mb-2">Application Name</label>
          <input
            type="text"
            value={appName()}
            onInput={(e) => setAppName(e.currentTarget.value)}
            class="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/50"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-text-secondary mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={sessionTimeout()}
            onInput={(e) => setSessionTimeout(e.currentTarget.value)}
            class="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/50"
          />
          <p class="text-xs text-text-muted mt-1.5">Session expires after this period of inactivity.</p>
        </div>

        <div class="flex items-center justify-between py-3 border-t border-b border-surface-3/30">
          <div>
            <p class="text-sm font-medium text-text-primary">Two-Factor Authentication</p>
            <p class="text-xs text-text-muted mt-0.5">Require 2FA for all users on sign-in.</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactor()}
              onChange={(e) => setTwoFactor(e.currentTarget.checked)}
              class="sr-only peer"
            />
            <div class="w-10 h-5 rounded-full bg-surface-3 peer-checked:bg-brand peer-focus:ring-2 peer-focus:ring-brand/30 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5" />
          </label>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          {saved() && (
            <span class="flex items-center gap-1 text-xs text-brand animate-fade-in">
              <AppIcon icon="lucide:check" size={14} />
              Settings saved
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
