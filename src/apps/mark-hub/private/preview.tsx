import PageHeader from "~/shell/components/ui/PageHeader";

const renderedHTML = `
<div class="space-y-4 max-w-3xl">
  <h1 class="font-display text-3xl font-bold text-text-primary">Contributing Guide</h1>
  <p class="text-sm text-text-secondary">Thank you for your interest in contributing to our project! This document provides guidelines and instructions for contributing.</p>

  <h2 class="font-display text-xl font-bold text-text-primary mt-8">Code of Conduct</h2>
  <p class="text-sm text-text-secondary">By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.</p>

  <h2 class="font-display text-xl font-bold text-text-primary mt-8">Getting Started</h2>

  <h3 class="font-display text-base font-bold text-text-primary mt-4">1. Fork the Repository</h3>
  <p class="text-sm text-text-secondary">Start by forking the repository to your GitHub account.</p>

  <h3 class="font-display text-base font-bold text-text-primary mt-4">2. Clone Locally</h3>
  <pre class="p-3 rounded-xl bg-surface-0 border border-surface-3/30 text-xs text-text-secondary font-mono">git clone https://github.com/your-username/project.git
cd project
bun install</pre>

  <h3 class="font-display text-base font-bold text-text-primary mt-4">3. Create a Branch</h3>
  <pre class="p-3 rounded-xl bg-surface-0 border border-surface-3/30 text-xs text-text-secondary font-mono">git checkout -b feature/your-feature-name</pre>

  <h2 class="font-display text-xl font-bold text-text-primary mt-8">Development Workflow</h2>

  <ol class="list-decimal list-inside text-sm text-text-secondary space-y-2 ml-2">
    <li>Make your changes and write tests</li>
    <li>Ensure all tests pass with <span class="font-mono text-brand">bun test</span></li>
    <li>Run the linter with <span class="font-mono text-brand">bun run lint</span></li>
    <li>Commit with conventional commit messages</li>
    <li>Push and create a pull request</li>
  </ol>

  <h2 class="font-display text-xl font-bold text-text-primary mt-8">Commit Convention</h2>
  <p class="text-sm text-text-secondary">We follow the Conventional Commits specification:</p>
  <pre class="p-3 rounded-xl bg-surface-0 border border-surface-3/30 text-xs text-text-secondary font-mono whitespace-pre-wrap">feat: add user authentication module
fix: resolve login redirect loop
docs: update API documentation
style: format code with prettier
refactor: extract utility functions</pre>

  <h2 class="font-display text-xl font-bold text-text-primary mt-8">Pull Request Guidelines</h2>

  <ul class="list-disc list-inside text-sm text-text-secondary space-y-1 ml-2">
    <li>Keep PRs focused on a single concern</li>
    <li>Include a clear description of changes</li>
    <li>Add screenshots for UI changes</li>
    <li>Ensure CI passes before requesting review</li>
    <li>Be responsive to code review feedback</li>
  </ul>

  <div class="p-4 rounded-xl bg-brand/10 border border-brand/20 mt-6">
    <p class="text-sm text-text-primary font-medium mb-1">Need Help?</p>
    <p class="text-sm text-text-secondary">Feel free to open an issue or reach out to the maintainers on Discord. We're here to help!</p>
  </div>

  <h2 class="font-display text-xl font-bold text-text-primary mt-8">License</h2>
  <p class="text-sm text-text-secondary">By contributing, you agree that your contributions will be licensed under the MIT License.</p>
</div>`;

export default function PreviewPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Preview" description="Full rendered view of CONTRIBUTING.md" icon="lucide:eye" iconColor="#10b981" />

      <div class="rounded-2xl bg-surface-1 border border-surface-3/30 overflow-hidden">
        <div class="px-4 py-2.5 border-b border-surface-3/30 flex items-center gap-2">
          <span class="text-xs font-medium text-text-muted">CONTRIBUTING.md</span>
          <span class="text-xs text-text-muted ml-auto">Rendered Preview</span>
        </div>
        <div class="p-8">
          <div innerHTML={renderedHTML} />
        </div>
      </div>
    </div>
  );
}
