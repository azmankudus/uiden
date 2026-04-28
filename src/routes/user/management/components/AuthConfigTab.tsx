import { createSignal, For, Show } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";
import type { AuthProviderConfig } from "../lib/types";
import { MANAGEMENT_STORE } from "../lib/store";

interface AuthProviderCardProps {
  provider: AuthProviderConfig;
  onToggle: (id: string) => void;
  onEdit: (provider: AuthProviderConfig) => void;
  onDelete: (id: string) => void;
}

function AuthProviderCard({ provider, onToggle, onEdit, onDelete }: AuthProviderCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "ad-ldap": return "server";
      case "saml2": return "shield-check";
      case "oidc": return "key";
      default: return "lock";
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "ad-ldap": return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300";
      case "saml2": return "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300";
      case "oidc": return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300";
      default: return "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300";
    }
  };

  return (
    <div class={`bg-white dark:bg-gray-800 rounded-xl border ${provider.enabled ? "border-blue-300 dark:border-blue-600" : "border-gray-200 dark:border-gray-700"} p-4 transition-colors hover:border-blue-300 dark:hover:border-blue-500`}>
      <div class="flex justify-between items-start mb-3">
        <div class="flex items-center gap-3">
          <div class={`w-10 h-10 rounded-lg ${getColor(provider.type)} flex items-center justify-center`}>
            <AppIcon name={getIcon(provider.type)} class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-md font-medium text-gray-900 dark:text-gray-100">
              {provider.name}
              <Show when={provider.type === "local"}>
                <span class="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                  Default
                </span>
              </Show>
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {provider.type.replace("-", " ")}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            onClick={() => onToggle(provider.id)}
            class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              provider.enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              class={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                provider.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <button
            onClick={() => onEdit(provider)}
            class="p-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <AppIcon name="edit" class="w-4 h-4" />
          </button>
          <Show when={provider.type !== "local"}>
            <button
              onClick={() => onDelete(provider.id)}
              class="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <AppIcon name="trash" class="w-4 h-4" />
            </button>
          </Show>
        </div>
      </div>
      <div class="space-y-2">
        <Show when={provider.type === "ad-ldap" && provider.config.domain}>
          <div class="flex items-center gap-2 text-sm">
            <AppIcon name="globe" class="w-4 h-4 text-gray-400" />
            <span class="text-gray-600 dark:text-gray-400">
              Domain: <code class="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">{provider.config.domain}</code>
            </span>
          </div>
        </Show>
        <Show when={provider.type === "saml2" && provider.config.entityId}>
          <div class="flex items-center gap-2 text-sm">
            <AppIcon name="link" class="w-4 h-4 text-gray-400" />
            <span class="text-gray-600 dark:text-gray-400">
              Entity ID: <code class="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">{provider.config.entityId}</code>
            </span>
          </div>
        </Show>
        <Show when={provider.type === "oidc" && provider.config.clientId}>
          <div class="flex items-center gap-2 text-sm">
            <AppIcon name="key" class="w-4 h-4 text-gray-400" />
            <span class="text-gray-600 dark:text-gray-400">
              Client ID: <code class="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">{provider.config.clientId}</code>
            </span>
          </div>
        </Show>
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <AppIcon name="calendar" class="w-4 h-4" />
          <span>
            Created: {new Date(provider.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export function AuthConfigTab() {
  const [providers, setProviders] = createSignal<AuthProviderConfig[]>(
    MANAGEMENT_STORE.getAllAuthProviders()
  );
  const [showForm, setShowForm] = createSignal(false);
  const [selectedProvider, setSelectedProvider] = createSignal<AuthProviderConfig | undefined>();

  const handleToggle = (id: string) => {
    const updated = MANAGEMENT_STORE.toggleAuthProvider(id);
    if (updated) {
      setProviders(providers().map(p => p.id === id ? updated : p));
    }
  };

  const handleEdit = (provider: AuthProviderConfig) => {
    setSelectedProvider(provider);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this authentication provider?")) {
      const success = MANAGEMENT_STORE.deleteAuthProvider(id);
      if (success) {
        setProviders(providers().filter(p => p.id !== id));
      }
    }
  };

  const handleAdd = () => {
    setSelectedProvider(undefined);
    setShowForm(true);
  };

  const handleSubmit = (provider: Omit<AuthProviderConfig, "id" | "createdAt" | "enabled">) => {
    if (selectedProvider()) {
      const updated = MANAGEMENT_STORE.updateAuthProvider(selectedProvider()!.id, provider);
      if (updated) {
        setProviders(providers().map(p => p.id === selectedProvider()!.id ? updated : p));
      }
    } else {
      const newProvider = MANAGEMENT_STORE.createAuthProvider(provider);
      if (newProvider) {
        setProviders([...providers(), newProvider]);
      }
    }
    setShowForm(false);
    setSelectedProvider(undefined);
  };

  const enabledProviders = () => providers().filter(p => p.enabled);

  return (
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Authentication Configuration</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Configure SSO, AD/LDAP, and OIDC providers for three-page login flow
          </p>
        </div>
        <Show when={enabledProviders().length < 3}>
          <button
            onClick={handleAdd}
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <AppIcon name="plus" class="w-4 h-4" />
            Add Provider
          </button>
        </Show>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <For each={providers()}>
          {(provider) => (
            <AuthProviderCard
              provider={provider}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </For>
      </div>

      <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div class="flex items-start gap-3">
          <AppIcon name="alert-circle" class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div class="text-sm text-blue-800 dark:text-blue-300">
            <h3 class="font-medium mb-1">Three-Page Login Flow Behavior</h3>
            <ul class="list-disc pl-4 space-y-1">
              <li>Enabled providers appear in order on the SSO login page</li>
              <li>Users can choose a provider or skip to AD/LDAP page</li>
              <li>AD/LDAP requires domain and credentials if enabled</li>
              <li>Local authentication is always available as fallback</li>
              <li>Maximum of 3 providers can be enabled simultaneously</li>
            </ul>
          </div>
        </div>
      </div>

      <Show when={showForm()}>
        <AuthProviderForm
          provider={selectedProvider()}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedProvider(undefined);
          }}
          isOpen={showForm()}
        />
      </Show>
    </div>
  );
}

interface AuthProviderFormProps {
  provider?: AuthProviderConfig;
  onSubmit: (provider: Omit<AuthProviderConfig, "id" | "createdAt" | "enabled">) => void;
  onCancel: () => void;
  isOpen: boolean;
}

function AuthProviderForm(props: AuthProviderFormProps) {
  const [type, setType] = createSignal<"ad-ldap" | "saml2" | "oidc">(
    props.provider?.type || "ad-ldap"
  );
  const [name, setName] = createSignal(props.provider?.name || "");
  const [config, setConfig] = createSignal(props.provider?.config || {});

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onSubmit({
      type: type(),
      name: name(),
      config: config(),
    });
  };

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {props.provider ? "Edit Authentication Provider" : "Add Authentication Provider"}
          </h2>
          <form onSubmit={handleSubmit} class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Provider Type
              </label>
              <select
                value={type()}
                onInput={(e) => setType(e.currentTarget.value as any)}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="ad-ldap">Active Directory / LDAP</option>
                <option value="saml2">SAML 2.0</option>
                <option value="oidc">OIDC / OAuth 2.0</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Provider Name
              </label>
              <input
                type="text"
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
                placeholder="e.g., Microsoft Entra ID, GitHub OAuth, Corporate LDAP"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <Show when={type() === "ad-ldap"}>
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">AD/LDAP Configuration</h4>
                <div>
                  <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Domain
                  </label>
                  <input
                    type="text"
                    value={config().domain || ""}
                    onInput={(e) => setConfig({ ...config(), domain: e.currentTarget.value })}
                    placeholder="e.g., domain.local"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Server URL
                  </label>
                  <input
                    type="url"
                    value={config().serverUrl || ""}
                    onInput={(e) => setConfig({ ...config(), serverUrl: e.currentTarget.value })}
                    placeholder="e.g., ldap://domain.local:389"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </Show>
            <Show when={type() === "saml2"}>
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">SAML 2.0 Configuration</h4>
                <div>
                  <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Entity ID
                  </label>
                  <input
                    type="text"
                    value={config().entityId || ""}
                    onInput={(e) => setConfig({ ...config(), entityId: e.currentTarget.value })}
                    placeholder="e.g., urn:example:sp"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    SSO URL
                  </label>
                  <input
                    type="url"
                    value={config().ssoUrl || ""}
                    onInput={(e) => setConfig({ ...config(), ssoUrl: e.currentTarget.value })}
                    placeholder="e.g., https://login.microsoftonline.com/.../saml2"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </Show>
            <Show when={type() === "oidc"}>
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">OIDC Configuration</h4>
                <div>
                  <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Client ID
                  </label>
                  <input
                    type="text"
                    value={config().clientId || ""}
                    onInput={(e) => setConfig({ ...config(), clientId: e.currentTarget.value })}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Authorization URL
                  </label>
                  <input
                    type="url"
                    value={config().authorizationUrl || ""}
                    onInput={(e) => setConfig({ ...config(), authorizationUrl: e.currentTarget.value })}
                    placeholder="e.g., https://github.com/login/oauth/authorize"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </Show>
            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={props.onCancel}
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {props.provider ? "Update Provider" : "Add Provider"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}