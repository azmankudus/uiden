import { createSignal, Show } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import FormField from "~/shell/components/ui/FormField";

export default function GeneratorPage() {
  const [template, setTemplate] = createSignal("");
  const [format, setFormat] = createSignal("PDF");
  const [recipient, setRecipient] = createSignal("");
  const [generating, setGenerating] = createSignal(false);
  const [done, setDone] = createSignal(false);

  const handleGenerate = () => {
    setGenerating(true);
    setDone(false);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Generate Document" description="Create a new document from a template." icon="lucide:sparkles" iconColor="#8b5cf6" />

      <div class="grid lg:grid-cols-2 gap-6">
        <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
          <h2 class="font-display text-sm font-semibold text-text-primary mb-5">Document Details</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-text-secondary mb-2">Template</label>
              <select
                value={template()}
                onChange={(e) => setTemplate(e.currentTarget.value)}
                class="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary focus:outline-none focus:border-brand/50"
              >
                <option value="">Select a template...</option>
                <option value="invoice">Invoice Template v2</option>
                <option value="report">Quarterly Report</option>
                <option value="contract">Employment Contract</option>
                <option value="meeting">Meeting Notes</option>
                <option value="spec">Technical Spec</option>
                <option value="packing">Packing Slip</option>
                <option value="certificate">Certificate of Completion</option>
                <option value="catalog">Product Catalog</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-medium text-text-secondary mb-2">Output Format</label>
              <div class="flex gap-3">
                {["PDF", "DOCX", "XLSX", "PNG"].map((f) => (
                  <button
                    type="button"
                    onClick={() => setFormat(f)}
                    class={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${format() === f ? "bg-brand text-surface-0" : "bg-surface-2 text-text-secondary hover:text-text-primary"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <FormField label="Recipient" value={recipient()} onInput={setRecipient} placeholder="recipient@example.com" />

            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating()}
              class="w-full px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110 transition-all mt-2 disabled:opacity-50"
            >
              {generating() ? "Generating..." : "Generate Document"}
            </button>
          </div>
        </div>

        <Show when={generating()}>
          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 flex items-center justify-center">
            <div class="text-center">
              <div class="w-12 h-12 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p class="text-sm text-text-secondary">Generating your document...</p>
              <p class="text-xs text-text-muted mt-1">This usually takes a few seconds</p>
            </div>
          </div>
        </Show>

        <Show when={done()}>
          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
            <div class="text-center">
              <div class="flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-4" style={{ "background-color": "#10b98118" }}>
                <span class="text-green-400 text-xl">✓</span>
              </div>
              <h3 class="font-display text-base font-semibold text-text-primary mb-2">Document Generated</h3>
              <p class="text-sm text-text-secondary mb-4">Your document has been created successfully.</p>
              <div class="p-3 rounded-xl bg-surface-0 border border-surface-3/30">
                <p class="text-xs text-text-muted">Generated: DOC-{Math.floor(Math.random() * 9000 + 1000)}.{format().toLowerCase()}</p>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
