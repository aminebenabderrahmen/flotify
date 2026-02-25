<div align="center">

# Flotify

**Collect feedback. Push to your board.**

Open-source feedback widget for your website. Bug reports, feature requests, and questions — synced directly to Trello.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@flotify/widget.svg)](https://www.npmjs.com/package/@flotify/widget)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@flotify/widget)](https://bundlephobia.com/package/@flotify/widget)

[Documentation](https://flotify.vercel.app/docs) · [Quick Start](https://flotify.vercel.app/docs/quick-start) · [Trello Setup Guide](https://flotify.vercel.app/docs/trello-setup)

</div>

---

## Why Flotify?

Most feedback tools cost $40–150/month and require a backend. Flotify is free, open source, and runs entirely client-side — your users report feedback, and it lands on your Trello board in seconds.

- **Zero backend** — calls Trello API directly
- **Framework agnostic** — React, Vue, Svelte, Angular, or plain HTML
- **Auto screenshot** — one-click page capture or drag & drop
- **3 feedback types** — Bug, Feature, Question
- **Auto metadata** — URL, browser, screen size, timestamp
- **Light & dark mode** — adapts to your site theme
- **~19kb** — lightweight, lazy-loaded screenshot module

## Install

```bash
npm install @flotify/widget
```

## Quick Start

```ts
import { Flotify } from '@flotify/widget'

Flotify.init({
  provider: 'trello',
  trello: {
    apiKey: 'your-api-key',
    token: 'your-token',
    listId: 'your-list-id',
  },
})
```

That's it. A feedback bubble appears in the corner of your page.

## CDN Usage

```html
<script
  src="https://cdn.jsdelivr.net/npm/@flotify/widget/dist/index.js"
  data-auto-init
  data-trello-api-key="your-api-key"
  data-trello-token="your-token"
  data-trello-list-id="your-list-id"
></script>
```

## Configuration

```ts
Flotify.init({
  provider: 'trello',
  trello: {
    apiKey: 'your-api-key',
    token: 'your-token',
    listId: 'your-list-id',
  },
  position: 'bottom-right',  // or 'bottom-left'
  theme: 'light',            // 'light' | 'dark' | 'auto'
  accentColor: '#09090b',    // any hex color
})
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `provider` | `'trello'` | — | Required. Integration provider. |
| `trello.apiKey` | `string` | — | Required. Trello API key. |
| `trello.token` | `string` | — | Required. Trello auth token. |
| `trello.listId` | `string` | — | Required. Target list ID. |
| `position` | `string` | `'bottom-right'` | Bubble position. |
| `theme` | `string` | `'light'` | Color theme. |
| `accentColor` | `string` | `'#09090b'` | Accent color. |

## API

```ts
Flotify.init(config)   // Initialize and mount
Flotify.destroy()      // Remove and clean up
Flotify.open()         // Open the feedback form
Flotify.close()        // Close the feedback form
Flotify.toggle()       // Toggle open/close
```

## How It Works

1. User clicks the feedback bubble on your site
2. They select a type (Bug / Feature / Question), set priority, add a title and description
3. Optionally capture a screenshot (auto-capture or drag & drop)
4. Flotify creates a Trello card with all the details + browser metadata + screenshot attached

## Trello Card Format

```
Title: [🐛 Bug] Button not working on mobile

Description:
The submit button doesn't respond to taps on iOS Safari.
---
Type: 🐛 Bug
Priority: 🔴 high

Metadata:
- URL: https://example.com/checkout
- Browser: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0...)
- Screen: 390x844
- Time: 2026-02-25T14:30:00.000Z

Sent via Flotify

Attachment: screenshot.png (set as card cover)
```

## Integrations Roadmap

| Integration | Status |
|-------------|--------|
| Trello | ✅ Available |
| GitHub Issues | 🔜 Planned |
| Linear | 🔜 Planned |
| Jira | 🔜 Planned |
| Notion | 🔜 Planned |
| Asana | 🔜 Planned |

The architecture uses a provider pattern — each integration is a self-contained module. Adding a new provider doesn't touch the core widget code.

## Project Structure

```
flotify/
├── packages/widget/     ← @flotify/widget (npm package)
│   ├── src/core/        ← Widget UI, types, orchestrator
│   └── src/providers/   ← Integration providers (Trello, ...)
├── apps/web/            ← Landing page + documentation (Next.js)
└── examples/html/       ← Standalone HTML demo
```

**Monorepo**: pnpm workspaces + Turborepo
**Widget**: TypeScript, zero dependencies, ESM + CJS
**Landing**: Next.js 15, Tailwind CSS v4, shadcn/ui

## Development

```bash
git clone https://github.com/aminebenabderrahmen/flotify.git
cd flotify
pnpm install
pnpm dev
```

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

## License

[MIT](LICENSE) — free forever, no strings attached.
