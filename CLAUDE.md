# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js site for ACF Sports (a football/futsal club in Cornélio Procópio, PR, Brazil), built from Figma design context. UI copy and routes are in Portuguese; internal code identifiers (component names, state keys, helper functions, query param constants) are standardized to English.

## Commands

- `npm run dev` — start the local development server.
- `npm run build` — production build; treat this as the primary correctness check before considering a change complete (there is no test suite).
- `npm run start` — run the production build.
- `npm run lint` — present in `package.json` (`next lint`), but the repo has no ESLint config committed, so it may need setup before it runs successfully.

There are no automated tests in this repository.

## Architecture

**Routing**: Standard Next.js App Router under `src/app`. Route folders mirror the Portuguese site structure: `clube/competicoes`, `clube/elenco` (+ `[slug]` for player detail), `clube/historia`, `clube/patrocinadores`, `contato`, `noticias` (+ `[slug]`), and the home page.

**Components**: Shared sections and page content live in `src/components`, with roster-specific pieces under `src/components/roster/`. Page files under `src/app` are typically thin wrappers that render a corresponding `*Content` component from `src/components`.

**Styling — read this before touching CSS**: Despite the README mentioning "CSS Modules," styling is NOT done via `.module.css` files. All styles live in one large `src/app/globals.css` (~5700 lines) using a manual namespacing convention: class names are prefixed with the component/route's file path, e.g. `components-roster-section-title`, `app-clube-competicoes-page-heading`. When editing a component's styles, find its block in `globals.css` by searching for that path-based prefix, not a co-located CSS file. Some one-off layout/positioning is done via inline `style={{...}}` props directly in `.tsx` files (see `RosterSection.tsx` for an example). Responsive breakpoints are standardized via CSS custom properties at the top of `globals.css`: `576px` (sm), `768px` (md), `992px` (lg), `1200px` (xl) — reuse these instead of introducing new breakpoint values.

**Data**: Seed/mock data (roster/athletes, staff, news) lives in `src/data` (`roster.ts`, `news.ts`) as plain TypeScript arrays and filter/lookup helper functions (e.g. `filterAthletes`, `getAthleteBySlug`, `getRelatedAthletes`). There is no backend/CMS — content changes mean editing these files directly.

**Assets**: Site media lives in `public/`, grouped by page or section (`public/history`, `public/squad`, `public/header`, `public/contact`, `public/gif`, etc.). Prefer committed local assets for production UI. Avoid introducing new direct dependencies on temporary `https://www.figma.com/api/mcp/asset/...` URLs (only `www.figma.com` is allowlisted in `next.config.ts` `images.remotePatterns`) unless the task is explicitly an intermediate Figma extraction step — some seed data in `src/data/roster.ts` still references these temporary URLs and is a known cleanup candidate.

**Figma traceability**: Many components carry `data-node-id` / `data-name` attributes referencing their source Figma node. `docs/figma/README.md` is the extraction log mapping Figma node IDs to converted components/routes — consult it when a task references a Figma frame or node ID.

## Conventions

- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
- Keep UI copy in Portuguese; keep internal identifiers (component names, state/key names, helper functions, query params) in English.
- When a change is complete, keep `README.md` and `AGENTS.md` updated with concise notes describing what changed (these files currently double as a running changelog of the Figma-alignment work).
