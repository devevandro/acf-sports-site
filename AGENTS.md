# Agent Notes

## Repository

This is a Next.js App Router project for the ACF Sports site. Keep changes aligned with the existing component structure in `src/components` and route structure in `src/app`.

## Commands

- `npm run dev` starts the local development server.
- `npm run build` verifies the production build.
- `npm run lint` is present in `package.json`, but the repository may need ESLint configuration before it can run successfully.

## Asset Handling

Prefer committed local assets under `public` for production UI. Avoid introducing new direct dependencies on temporary `https://www.figma.com/api/mcp/asset/...` URLs unless the task is explicitly an intermediate Figma extraction step.

## Commit Requirements

When preparing commits, keep `README.md` and this `AGENTS.md` updated with concise notes that reflect the completed change.

## Recent Changes (Figma Site Alignment)
- Refactored competitions, contact, history, and player profile UI (`CompetitionsContent.tsx`, `ContactContent.tsx`, `HistoryContent.tsx`, `PlayerDetailContent.tsx`, `globals.css`) according to current Figma frames.
- Replaced temporary external Figma URLs with committed local assets under `public/history`, `public/squad`, `public/header`, and `public/contact`.
- Added interactive competition filtering, match detail modal behavior, sponsorship plan tabs, and contact form confirmation state.
- Migrated roster and player profile navigation links to Next.js `<Link>`.
- Validated production build (`npm run build`).
