# ACF Site Figma.

Next.js site for ACF Sports, built from Figma design context and local public assets.

## Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript 5
- Tailwind CSS 4

## Development

Install dependencies and run the local server:

```bash
npm install
npm run dev
```

Build the production bundle:

```bash
npm run build
```

## Project Notes

- Pages live under `src/app`.
- Shared sections and UI live under `src/components`.
- Roster and news seed data live under `src/data`.
- Site media is stored in `public`, grouped by page or section.
- `docs/figma/README.md` records the Figma extraction mapping.

- **Figma Site Alignment & Responsive Breakpoints**:
  - Standardized responsive breakpoints across the project: `576px` (celulares grandes), `768px` (tablets), `992px` (laptops), and `1200px` (desktops).
  - Aligned competitions, contact, history, and player profile sections with Figma design nodes (`node-id=2396-21910`, `2392-9111`, `2394-9599`, `2394-20847`).
  - Replaced temporary Figma image URLs with committed local assets under `public/history`, `public/squad`, `public/header`, and `public/contact`.
  - Added interactive competition filtering, match detail modal behavior, sponsorship plan tabs, and contact form confirmation state.
  - Migrated roster and player profile navigation links to Next.js `<Link>`.
  - Refactored `HeroNews.tsx` carousel: 12-second auto-play timer, active thumbnail progress bar animation, inactive thumbnail grayscale filter, full screen (100%) width container, and viewport height optimization for scroll-free viewing.
  - Aligned sponsorship reasons content section left margin to match the page header container title ("patrocinadores.").
  - Updated the top header to rotate committed GIF assets from `public/gif` and adjusted the player profile figure/frame layout to use the shared local player image.
  - Standardized internal code identifiers to English for page component names, menu state keys, roster helpers, sponsorship plan keys, and roster query parameter constants while preserving Portuguese UI copy and routes.
  - Validated production build (`npm run build`).
  - Refined home page interactions for the hero slide fade, main menu dropdown active states, news CTA layout, roster hover details, sponsor marquee, and sponsorship plan card feedback.

- **Mobile Navigation & Brand Refresh**:
  - Added a mobile hamburger menu to `MainMenu.tsx`: a toggle button and collapsible full-width panel with a row-style accordion for the "clube" submenu, plus WhatsApp/Instagram quick-action icons visible only below the `768px` breakpoint.
  - Updated the primary brand orange (`--laranja` and related accent colors) from `#f56345`/`#cc4529` to `#ff3203` across `globals.css`, `ContactContent.tsx`, and `PlayerMainCardImage.tsx`.
  - Switched `globals.css` `font-family` declarations to reference the CSS custom properties (`--font-montserrat`, `--font-outfit`, `--font-rubik`, `--font-roboto`, `--font-poppins`) exposed by `next/font/google` in `layout.tsx`, replacing hardcoded font names.
  - Replaced hero carousel and related news images with new local assets (`public/carousel/image-01.jpg`, `public/carousel/image-02.jpg`).

- **CI/CD**:
  - Added GitHub Actions workflows (`.github/workflows/prev-deploy.yaml`, `.github/workflows/prod-deploy.yaml`) that build and deploy to Vercel: preview deployments on push to `stage`, production deployments on push to `main`.
  - Fixed `prev-deploy.yaml`: removed the unsupported `--preview` flag from the `vercel build` and `vercel deploy` steps (Vercel CLI 59.x has no such flag; preview is the default target when `--prod` is omitted), which was failing the workflow with `unknown or unexpected option: --preview`.
