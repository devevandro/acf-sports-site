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

## Recent Updates

- **Figma Layout Alignment (`node-id=640-1333` & `node-id=1564-11705`)**:
  - Replaced temporary external Figma MCP URLs across Home & Noticias components (`NewsDetail`, `NewsArchive`, `MainMenu`, `GamesPanel`, etc.) with local assets and Lucide icon components.
  - Replaced HTML `<a>` tags with Next.js client-side `<Link>` navigation.
  - Added dynamic `generateMetadata` to `/noticias/[slug]` and SEO metadata to `/noticias`.
  - Added interactive mobile navigation drawer in `MainMenu.tsx`.
  - Validated production build with `npm run build` (55 static pages rendered cleanly).


