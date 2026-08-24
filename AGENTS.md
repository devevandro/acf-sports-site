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
- Standardized internal code identifiers to English for page component names, menu state keys, roster helpers, sponsorship plan keys, and roster query parameter constants while preserving Portuguese UI copy and routes.
- Refined home page interactions for hero slide fade animation, main menu dropdown active states, news CTA placement, roster hover overlays, sponsor strip marquee behavior, and sponsorship plan card/button feedback.
- Validated production build (`npm run build`).

## CI/CD

GitHub Actions workflows in `.github/workflows/` deploy to Vercel via the Vercel CLI: `prev-deploy.yaml` runs on push to `stage` (preview environment), `prod-deploy.yaml` runs on push to `main` (production environment). Both require `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN` secrets configured in the `Deploy` GitHub environment.

## Recent Changes (Mobile Navigation & Brand Refresh)
- Added a mobile hamburger menu to `MainMenu.tsx`: a toggle button and full-width collapsible panel, with a row-style accordion (plus/close icon) replacing the hover dropdown for the "clube" submenu below `768px`, and WhatsApp/Instagram quick-action icons shown only on mobile.
- Updated the primary brand orange from `#f56345`/`#cc4529` to `#ff3203` in `globals.css`, `ContactContent.tsx`, and `PlayerMainCardImage.tsx`.
- Switched `globals.css` font-family declarations to use the CSS custom properties (`--font-montserrat`, `--font-outfit`, `--font-rubik`, `--font-roboto`, `--font-poppins`) exposed by `next/font/google` in `layout.tsx`, instead of hardcoded font names.
- Replaced hero carousel and related news images with new local assets (`public/carousel/image-01.jpg`, `public/carousel/image-02.jpg`), removing the dependency on the old `public/home-news` PNGs for those entries.
- Validated production build (`npm run build`).
