import { createSignal } from "solid-js";
import { Show } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import FormField from "~/shell/components/ui/FormField";

const MOCK_CSR = `-----BEGIN CERTIFICATE REQUEST-----
MIICvDCCAaQCAQAwdzELMAkGA1UEBhMCVVMxDTALBgNVBAcMBE5vbmUxEjAQBgNV
BAgMCUNhbGlmb3JuaWExFjAUBgNVBAoMDUV4YW1wbGUgSW5jLjExMC8GA1UEAwwo
d3d3LmV4YW1wbGUuY29tIFNlY3VyaXR5IENBIElJMTCCASIwDQYJKoZIhvcNAQEB
BQADggEPADCCAQoCggEBAK5+fd3JknP2vL8Z3XqJrLvMzmDRPZ3UEOLb3sCS6FVs
FW3RfrA3JYJ+KQlS8FjqO6RfZgT9E1H5cM4YZ2TQZ8QJSGZ7R5Q4LJ+eGBZ5TqI
H5T5+fMR7JnK3MWG2LyU0ySjHGAW8M6cVQ3RKfJKoJ5APCLzMk5BCf+oJt7+WCAp
Q8zMwEpB+1GR8OiP6fCFAm3N2U5cZ7vZMFqBdgB3DVHFGWa0hKjPxAoHd3RXLGB
LoU+0m1QFvcMFb9KwHUa0sECAwEAAaAAMA0GCSqGSIb3DQEBCwUAA4IBAQB7F5O3
G3v9X6kNmXBJpGMqY4K8F8oL3hLC4g7dYbzXrGMPT5QkO5CLzY+GqN2M2Y7RgFd
-----END CERTIFICATE REQUEST-----`;

export default function CSRGeneratorPage() {
  const [commonName, setCommonName] = createSignal("");
  const [organization, setOrganization] = createSignal("");
  const [country, setCountry] = createSignal("");
  const [keyType, setKeyType] = createSignal("RSA");
  const [keySize, setKeySize] = createSignal("4096");
  const [generated, setGenerated] = createSignal(false);

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Generate CSR" description="Create a Certificate Signing Request with your details." icon="lucide:file-pen" iconColor="#8b5cf6" />

      <div class="grid lg:grid-cols-2 gap-6">
        <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
          <h2 class="font-display text-sm font-semibold text-text-primary mb-5">Certificate Details</h2>
          <div class="space-y-4">
            <FormField label="Common Name (CN)" value={commonName()} onInput={setCommonName} placeholder="www.example.com" />
            <FormField label="Organization (O)" value={organization()} onInput={setOrganization} placeholder="Example Inc." />
            <FormField label="Country (C)" value={country()} onInput={setCountry} placeholder="US" hint="2-letter country code" />

            <div>
              <label class="block text-xs font-medium text-text-secondary mb-2">Key Type</label>
              <div class="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setKeyType("RSA"); setKeySize("4096"); }}
                  class={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${keyType() === "RSA" ? "bg-brand text-surface-0" : "bg-surface-2 text-text-secondary hover:text-text-primary"}`}
                >
                  RSA
                </button>
                <button
                  type="button"
                  onClick={() => { setKeyType("ECDSA"); setKeySize("P-256"); }}
                  class={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${keyType() === "ECDSA" ? "bg-brand text-surface-0" : "bg-surface-2 text-text-secondary hover:text-text-primary"}`}
                >
                  ECDSA
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-text-secondary mb-2">Key Size</label>
              <Show when={keyType() === "RSA"} fallback={
                <div class="flex gap-3">
                  {["P-256", "P-384", "P-521"].map((s) => (
                    <button type="button" onClick={() => setKeySize(s)} class={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${keySize() === s ? "bg-brand text-surface-0" : "bg-surface-2 text-text-secondary"}`}>{s}</button>
                  ))}
                </div>
              }>
                <div class="flex gap-3">
                  {["2048", "4096"].map((s) => (
                    <button type="button" onClick={() => setKeySize(s)} class={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${keySize() === s ? "bg-brand text-surface-0" : "bg-surface-2 text-text-secondary"}`}>{s}-bit</button>
                  ))}
                </div>
              </Show>
            </div>

            <button
              type="button"
              onClick={() => setGenerated(true)}
              class="w-full px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110 transition-all mt-2"
            >
              Generate CSR
            </button>
          </div>
        </div>

        <Show when={generated()}>
          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-display text-sm font-semibold text-text-primary">Generated CSR</h2>
              <span class="text-xs text-text-muted">{keyType()} {keySize()}</span>
            </div>
            <pre class="p-4 rounded-xl bg-surface-0 border border-surface-3/30 text-xs text-text-secondary font-mono overflow-auto max-h-80 leading-relaxed">
              {MOCK_CSR}
            </pre>
          </div>
        </Show>
      </div>
    </div>
  );
}
