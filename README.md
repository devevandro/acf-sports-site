# ACF Site Figma

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
  - Validated production build (`npm run build`).
