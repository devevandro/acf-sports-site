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

## Recent Changes (Figma node-id=640-1333 & 1564-11705 Alignment)
- Refactored `/noticias` archive page and `/noticias/[slug]` detail page (`NewsDetail.tsx` and `NewsArchive.tsx`) according to Figma frame `1564:11705`.
- Removed all external Figma MCP asset URLs, replacing them with Lucide icons (`ChevronRight`, `ChevronsRight`) and local assets.
- Added dynamic `generateMetadata` for news detail routes (`/noticias/[slug]`).
- Migrated all navigation links to Next.js `<Link>`.
- Validated production build (`npm run build`).


