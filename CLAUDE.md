# Flotify

Open-source feedback widget for websites. Bug reports, feature requests, and questions — synced to Trello.

## Project Structure

Monorepo with pnpm workspaces + Turborepo.

```
flotify/
├── packages/widget/     ← @flotify/widget (npm package)
│   ├── src/core/        ← Widget UI, types, orchestrator
│   │   ├── ui/          ← DOM-based UI (bubble, form, styles, screenshot, icons)
│   │   ├── flotify.ts   ← FlotifyWidget class (mount, open, close, toggle)
│   │   └── types.ts     ← All TypeScript interfaces
│   └── src/providers/   ← Integration providers (Trello, future: GitHub, Linear...)
│       ├── base.ts      ← Abstract BaseProvider
│       └── trello/      ← TrelloProvider (API calls + card formatting)
├── apps/web/            ← Landing page + docs (Next.js 15, Tailwind v4)
│   ├── src/app/         ← App router pages (/, /docs/*)
│   └── src/components/  ← Shared components (header, hero, features, docs-prose...)
└── examples/html/       ← Standalone HTML demo
```

## Commands

```bash
pnpm dev          # Start all packages in dev mode (turbopack for web)
pnpm build        # Build widget (tsup) + web (next build)
pnpm lint         # Lint with Biome
pnpm lint:fix     # Lint + auto-fix
pnpm format       # Format with Biome
pnpm clean        # Remove dist/ and .next/
```

## Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Widget**: TypeScript, zero dependencies, vanilla DOM, ESM + CJS via tsup
- **Landing/Docs**: Next.js 15, React 19, Tailwind CSS v4, Lucide icons
- **Linting/Formatting**: Biome (tabs, single quotes, no semicolons, 100 line width)
- **Node**: >=18.17.0 (see .nvmrc)

## Code Style

- **Biome** handles all linting and formatting — no ESLint or Prettier
- Tabs for indentation, single quotes, no semicolons
- 100 character line width
- Organize imports automatically

## Architecture Decisions

### Widget (`packages/widget/`)
- **Framework-agnostic**: Pure vanilla JS/TS, no React/Vue dependency
- **Provider pattern**: Abstract `FeedbackProvider` interface — each integration (Trello, GitHub Issues, Linear...) is a self-contained module. Adding a new provider doesn't touch core widget code.
- **CSS injection**: Styles injected via `<style>` tag, no external CSS needed
- **Lazy-loaded screenshot**: html2canvas loaded from CDN only when user opens the form
- **Dual distribution**: ESM + CJS + TypeScript declarations via tsup
- **Script tag auto-init**: Widget can be initialized via `data-*` attributes on a script tag

### Landing Page (`apps/web/`)
- **Design system**: Follows leerob (Lee Robinson) style — Manrope font, rounded-full pill buttons, gray-900 accent, minimal shadows, no gradients
- **OG Image**: Generated via `next/og` (ImageResponse) in `opengraph-image.tsx`
- **Docs**: App router pages under `/docs/*`, shared prose components in `docs-prose.tsx`
- **SEO**: sitemap.ts, robots.ts, full OpenGraph + Twitter meta

## Key Files

| File | Purpose |
|------|---------|
| `packages/widget/src/index.ts` | Public API: `Flotify.init()`, `.destroy()`, `.open()`, `.close()`, `.toggle()` |
| `packages/widget/src/core/flotify.ts` | Widget class — mounts bubble, manages form lifecycle |
| `packages/widget/src/core/ui/form.ts` | Feedback form (type, priority, title, desc, screenshot) |
| `packages/widget/src/core/ui/screenshot.ts` | Auto-capture (html2canvas) + drag & drop + paste |
| `packages/widget/src/providers/trello/index.ts` | TrelloProvider — builds card description, calls Trello API |
| `apps/web/src/components/docs-prose.tsx` | Shared doc components: CodeBlock (with copy), PackageInstall (tabs), Step, Callout |
| `apps/web/src/components/logo.tsx` | Shared LogoIcon SVG component |

## Important Notes

- All GitHub URLs currently point to `aminebenabderrahmen/flotify` — update when actual repo is created
- Widget exposes `window.Flotify` globally for CDN/script tag usage
- The `createForm()` and `createDropZone()` return elements with a `.destroy()` method for cleanup
- Trello API calls are client-side (no backend) — API key and token are in the browser
