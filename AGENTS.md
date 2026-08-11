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

## Recent Changes (Figma Site Alignment & Breakpoint Standardization)
- Refactored media queries and Tailwind CSS theme to standardize responsive breakpoints across the entire codebase: `576px` (celulares grandes), `768px` (tablets), `992px` (laptops), and `1200px` (desktops).
- Refactored competitions, contact, history, and player profile UI (`CompetitionsContent.tsx`, `ContactContent.tsx`, `HistoryContent.tsx`, `PlayerDetailContent.tsx`, `globals.css`) according to current Figma frames.
- Replaced temporary external Figma URLs with committed local assets under `public/history`, `public/squad`, `public/header`, and `public/contact`.
- Added interactive competition filtering, match detail modal behavior, sponsorship plan tabs, and contact form confirmation state.
- Migrated roster and player profile navigation links to Next.js `<Link>`.
- Refactored `HeroNews.tsx` carousel: added 12-second automatic slide transition, animated progress bar on active thumbnail, grayscale styling & hidden progress bar on inactive thumbnails, restored full screen container width (100%), and optimized height (`min(620px, calc(100vh - 120px))`) so the hero fits vertically on display viewports without requiring scrolling.
- Aligned sponsorship reasons section (`SponsorsPageContent.tsx`, `globals.css`) left alignment (`width: min(1160px, calc(100% - 40px))`) to line up precisely with the page heading title ("patrocinadores.").
- Updated the top header to rotate committed GIF assets from `public/gif` and adjusted player profile figure/frame sizing to use the shared local player image.
- Validated production build (`npm run build`).
