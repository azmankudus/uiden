import PageHeader from "~/shell/components/ui/PageHeader";

const markdownSource = `# API Documentation

## Getting Started

This guide will help you set up the API client and make your first request.

### Prerequisites

- Node.js 20+
- API key from the dashboard
- Basic understanding of REST APIs

### Installation

\`\`\`bash
npm install @company/api-client
\`\`\`

### Authentication

All requests require a bearer token in the Authorization header:

\`\`\`
Authorization: Bearer <your-api-key>
\`\`\`

## Endpoints

### List Users

\`GET /api/v2/users\`

Returns a paginated list of users.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | No | Page number (default: 1) |
| limit | number | No | Items per page (default: 20) |
| sort | string | No | Sort field |

**Response:**

\`\`\`json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "meta": {
    "page": 1,
    "total": 100
  }
}
\`\`\`

### Error Handling

All errors follow RFC 7807 format. Common error codes:

- \`400\` — Bad Request
- \`401\` — Unauthorized
- \`404\` — Not Found
- \`500\` — Internal Server Error

> **Note:** Rate limiting is enforced at 1000 requests per minute per API key.`;

const renderedHTML = `
<div class="space-y-4">
  <h1 class="font-display text-2xl font-bold text-text-primary">API Documentation</h1>

  <h2 class="font-display text-xl font-bold text-text-primary mt-6">Getting Started</h2>
  <p class="text-sm text-text-secondary">This guide will help you set up the API client and make your first request.</p>

  <h3 class="font-display text-base font-bold text-text-primary mt-4">Prerequisites</h3>
  <ul class="list-disc list-inside text-sm text-text-secondary space-y-1 ml-2">
    <li>Node.js 20+</li>
    <li>API key from the dashboard</li>
    <li>Basic understanding of REST APIs</li>
  </ul>

  <h3 class="font-display text-base font-bold text-text-primary mt-4">Installation</h3>
  <pre class="p-3 rounded-xl bg-surface-0 border border-surface-3/30 text-xs text-text-secondary font-mono">npm install @company/api-client</pre>

  <h3 class="font-display text-base font-bold text-text-primary mt-4">Authentication</h3>
  <p class="text-sm text-text-secondary">All requests require a bearer token in the Authorization header:</p>
  <pre class="p-3 rounded-xl bg-surface-0 border border-surface-3/30 text-xs text-text-secondary font-mono">Authorization: Bearer &lt;your-api-key&gt;</pre>

  <h2 class="font-display text-xl font-bold text-text-primary mt-6">Endpoints</h2>

  <h3 class="font-display text-base font-bold text-text-primary mt-4">List Users</h3>
  <p class="text-sm font-mono text-brand">GET /api/v2/users</p>
  <p class="text-sm text-text-secondary mt-2">Returns a paginated list of users.</p>

  <p class="text-sm font-medium text-text-primary mt-3">Parameters:</p>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-text-secondary">
      <thead>
        <tr class="border-b border-surface-3/30">
          <th class="text-left py-2 pr-4 font-medium text-text-muted">Parameter</th>
          <th class="text-left py-2 pr-4 font-medium text-text-muted">Type</th>
          <th class="text-left py-2 pr-4 font-medium text-text-muted">Required</th>
          <th class="text-left py-2 font-medium text-text-muted">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-surface-3/20"><td class="py-2 pr-4 font-mono">page</td><td class="py-2 pr-4">number</td><td class="py-2 pr-4">No</td><td class="py-2">Page number (default: 1)</td></tr>
        <tr class="border-b border-surface-3/20"><td class="py-2 pr-4 font-mono">limit</td><td class="py-2 pr-4">number</td><td class="py-2 pr-4">No</td><td class="py-2">Items per page (default: 20)</td></tr>
        <tr><td class="py-2 pr-4 font-mono">sort</td><td class="py-2 pr-4">string</td><td class="py-2 pr-4">No</td><td class="py-2">Sort field</td></tr>
      </tbody>
    </table>
  </div>

  <p class="text-sm font-medium text-text-primary mt-4">Response:</p>
  <pre class="p-3 rounded-xl bg-surface-0 border border-surface-3/30 text-xs text-text-secondary font-mono whitespace-pre-wrap">{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "meta": {
    "page": 1,
    "total": 100
  }
}</pre>

  <h3 class="font-display text-base font-bold text-text-primary mt-4">Error Handling</h3>
  <p class="text-sm text-text-secondary">All errors follow RFC 7807 format. Common error codes:</p>
  <ul class="list-none text-sm text-text-secondary space-y-1 ml-2 mt-2">
    <li><span class="font-mono text-brand">400</span> — Bad Request</li>
    <li><span class="font-mono text-brand">401</span> — Unauthorized</li>
    <li><span class="font-mono text-brand">404</span> — Not Found</li>
    <li><span class="font-mono text-brand">500</span> — Internal Server Error</li>
  </ul>

  <div class="p-3 rounded-xl bg-brand/10 border border-brand/20 mt-4">
    <p class="text-sm text-text-primary"><strong>Note:</strong> Rate limiting is enforced at 1000 requests per minute per API key.</p>
  </div>
</div>`;

export default function EditorPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Editor" description="Split-view markdown editor with live preview." icon="lucide:file-code" iconColor="#8b5cf6" />

      <div class="grid lg:grid-cols-2 gap-4">
        <div class="rounded-2xl bg-surface-1 border border-surface-3/30 overflow-hidden">
          <div class="px-4 py-2.5 border-b border-surface-3/30 flex items-center gap-2">
            <span class="text-xs font-medium text-text-muted">Markdown</span>
            <span class="text-xs text-text-muted ml-auto">api-documentation.md</span>
          </div>
          <pre class="p-4 text-xs text-text-primary font-mono leading-relaxed overflow-auto max-h-[600px] whitespace-pre-wrap">{markdownSource}</pre>
        </div>

        <div class="rounded-2xl bg-surface-1 border border-surface-3/30 overflow-hidden">
          <div class="px-4 py-2.5 border-b border-surface-3/30 flex items-center gap-2">
            <span class="text-xs font-medium text-text-muted">Preview</span>
          </div>
          <div class="p-4 overflow-auto max-h-[600px]">
            <div innerHTML={renderedHTML} />
          </div>
        </div>
      </div>
    </div>
  );
}
