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

## Recent Asset Update

The site now references local assets for the header, carousel, contact, squad, YouTube, and footer sections instead of relying on temporary Figma MCP asset URLs for those areas.
