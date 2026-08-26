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

GitHub Actions workflows in `.github/workflows/` deploy to Vercel via the Vercel CLI: `prev-deploy.yaml` runs on push to `stage` (preview environment), `prod-deploy.yaml` runs on push to `main` (production environment). Both require `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN` secrets configured in the `Deploy` GitHub environment. `prev-deploy.yaml`'s `vercel build`/`vercel deploy` steps take no `--preview` flag — Vercel CLI 59.x rejects it (`unknown or unexpected option: --preview`); preview is simply the default target when `--prod` is omitted.

The `acf-site` Vercel project has no Git repository connected (created via CLI), so the Vercel dashboard cannot list branches for domain assignment. `prev-deploy.yaml` works around this by capturing the deployment URL from `vercel deploy --prebuilt` and running `vercel alias set <url> stage.acfsports.com.br` right after, giving `stage` a fixed preview domain without needing Git integration. `prod-deploy.yaml` doesn't need this step because `acfsports.com.br` is assigned to the Production target and Vercel auto-aliases it on every `--prod` deploy. The `stage.acfsports.com.br` DNS record (CNAME to `cname.vercel-dns.com`) must be created in Cloudflare for the alias to resolve.

The project's SSO deployment protection (`vercel project protection`) is set to `all_except_custom_domains`, which only exempts domains formally registered on the project (`vercel domains add`), not bare aliases (`vercel alias set`). `stage.acfsports.com.br` was registered as a project domain via `vercel domains add stage.acfsports.com.br acf-site` so it resolves publicly without a Vercel login prompt, same as `acfsports.com.br`.

## Recent Changes (Mobile Navigation & Brand Refresh)
- Added a mobile hamburger menu to `MainMenu.tsx`: a toggle button and full-width collapsible panel, with a row-style accordion (plus/close icon) replacing the hover dropdown for the "clube" submenu below `768px`, and WhatsApp/Instagram quick-action icons shown only on mobile.
- Updated the primary brand orange from `#f56345`/`#cc4529` to `#ff3203` in `globals.css`, `ContactContent.tsx`, and `PlayerMainCardImage.tsx`.
- Switched `globals.css` font-family declarations to use the CSS custom properties (`--font-montserrat`, `--font-outfit`, `--font-rubik`, `--font-roboto`, `--font-poppins`) exposed by `next/font/google` in `layout.tsx`, instead of hardcoded font names.
- Replaced hero carousel and related news images with new local assets (`public/carousel/image-01.jpg`, `public/carousel/image-02.jpg`), removing the dependency on the old `public/home-news` PNGs for those entries.
- Validated production build (`npm run build`).

## Recent Changes (Carousel Image Update)
- Replaced `public/carousel/image-01.jpg`/`image-02.jpg` with `image-01.png`/`image-02.png` and updated references in `HeroNews.tsx` and `src/data/news.ts`.
- Renamed the new PNG files from their originally saved capitalized names (`Image-01.png`/`Image-02.png`) to lowercase, since Vercel's Linux build environment is case-sensitive and would 404 on the mismatch even though it works locally on macOS.

## Recent Changes (Favicon Fix)
- Moved `favicon.ico` from `src/favicon.ico` (not picked up by Next.js at all) to `src/app/favicon.ico`, the App Router's special-file location for automatic favicon serving.
- If the icon still doesn't appear to a browser after this fix, it's very likely favicon-specific browser caching (Chrome/Firefox cache favicons separately from the normal HTTP cache and often ignore hard-refresh) — check `/favicon.ico` directly or in a private window before assuming a server/build issue.
- Shortened the page `<title>` metadata in `layout.tsx` to "ACF Sports | Site Oficial".

## Recent Changes (News: Neon Postgres Integration)
- `src/data/news.ts` was rewritten from a static mock array to a data-access layer querying the `news` table in Neon Postgres (`@neondatabase/serverless`, lazy client in `src/db/index.ts`). This is the same database the `acf-site-manager` dashboard project writes to — `acf-site` only has read access via its own `DATABASE_URL` env var (copied from `acf-site-manager`'s Vercel env; not the same Vercel project).
- `NewsItem` fields now mirror the real DB columns (`id`, `tag`, `title`, `subtitle`, `content`, `author`, `image`, `createdAt`) instead of the old mock shape (`slug`, `category`, `description`, `caption`, `body[]`, `quote`, layered/mascot image variants). `content` is CMS-authored rich HTML rendered with `dangerouslySetInnerHTML` in `NewsDetail.tsx` — this is trusted content from the internal dashboard editor, not public user input.
- `getAllNews()` is wrapped in React's `cache()` (dedupes repeated calls within one request/render) and catches DB errors, returning `[]` so a DB outage degrades to an empty section instead of a 500.
- Renamed `src/app/noticias/[slug]` → `src/app/noticias/[id]` (no slug column in the DB; the route param is the row's UUID). Removed `generateStaticParams` — data now comes from an externally-edited DB, so pages use ISR (`export const revalidate = 60`) instead of being enumerated at build time.
- `HeroNews.tsx` lost its hardcoded `slides` array; it's still a client component (owns the auto-rotate timer/state) but now takes `news: NewsItem[]` as a prop. The fetch (`getFeaturedNews(3)`) happens server-side in `src/app/page.tsx`, which became `async`. `NewsGrid.tsx` and `NewsArchive.tsx` became `async` server components that fetch their own data (`getLatestNews(6)` and `getAllNews()` respectively).
- Validated with `npm run build` and by hitting the dev server (`/`, `/noticias`, `/noticias/[id]`, and a nonexistent id → 404) to confirm real rows render, including the CMS's HTML `content`.

## Recent Changes (Home Carousel: Highlight Filter & Pinned News)
- `NewsItem`/`NewsRow` in `src/data/news.ts` gained a `highlight: boolean` field mapping the `news` table's `highlight` column.
- Added `PINNED_CAROUSEL_NEWS_ID` (`cd288794-2014-4f37-8163-cb5082cd0b47`) as a shared constant in `src/data/news.ts`.
- `HeroNews.tsx` now builds its slide list itself: only news with `highlight === true` are shown, and the pinned news ID is always forced into the list at position 2 (index 1) regardless of its `highlight` value. `src/app/page.tsx` now passes it the full `getAllNews()` result instead of a pre-sliced `getFeaturedNews(3)` (that helper was removed as unused).
- `getLatestNews()` (used by the home `NewsGrid`) now always excludes the pinned news ID, so that item only ever appears in the hero carousel, never in the home "notícias" grid. `NewsArchive.tsx` (`/noticias` full listing) is unaffected — it still uses `getAllNews()` directly.
- Validated with `npm run build` and by querying the live Neon `news` table directly to confirm the pinned row lands at carousel position 2 and is absent from the home grid output.

## Recent Changes (Home Carousel: Pinned News Moved to Position 3)
- Moved the pinned carousel insertion point in `HeroNews.tsx` from index 1 (position 2) to index 2 (position 3): `slides.splice(Math.min(2, slides.length), 0, pinned)`.

## Recent Changes (Home News Grid: Fixed Layout for Fewer Than 3 Items)
- `.components-news-grid-grid` used a hardcoded `grid-template-columns: repeat(3, 330px)` (and `repeat(2, 330px)` at the 1200px breakpoint), which reserved layout space for a full row even when fewer news items were available (e.g. once the pinned carousel item is excluded from the grid, only 2 of 6 items remain) — the grid.
- Fixed by having `NewsGrid.tsx` compute `gridColumns = Math.min(newsItems.length, 3)` and pass it as a `--news-grid-columns` CSS custom property on `.components-news-grid-grid`. `globals.css` now reads `repeat(var(--news-grid-columns, 3), 330px)` at desktop and `repeat(min(var(--news-grid-columns, 2), 2), 330px)` at the 1200px breakpoint, so the grid always sizes to the actual item count instead of assuming 3.
- Validated with `npm run build`/`tsc --noEmit` and by checking the rendered home page HTML (`curl localhost:3000/`) to confirm `style="--news-grid-columns:2"` is emitted when only 2 news items are available.

## Recent Changes (Home "jogos" Panel: Wired to the `games` Table)
- Added `src/data/games.ts`, a data-access layer for the `games` table (`id`, `competition_id` → joined against `competitions.title`, `opponent`, `result`, `date`, `location`), following the same `cache()`-wrapped, error-swallowing pattern as `src/data/news.ts`. A game is treated as **finished** when `result` is non-empty and not `"-"` (the sentinel the dashboard's games form defaults upcoming games to), and **upcoming** otherwise.
- `getLatestFinishedGame()` returns the finished game with the latest `date`; `getNextUpcomingGame()` returns the upcoming game with the earliest `date`. Both return `null` when no matching row exists.
- `GamesPanel.tsx` became an async server component that fetches both via `Promise.all` and conditionally renders each "partida finalizada" / "próxima partida" block only when its game exists (both previously hardcoded, static example matches). Neither team has a stored logo for the opponent side in the DB, so both sides currently reuse the club's own crest icon (`/header/symbol.png`) as a generic placeholder, matching what the prior hardcoded markup already did.
- Verified against the live (currently empty) `games` table that the query runs without error and both blocks render as empty (`<div class="components-games-panel-blocks"></div>`), and validated the finished/upcoming selection + sort logic against mocked rows.

## Recent Changes (Home "jogos" Panel: Opponent Logo)
- The `games` table has no logo column of its own. Opponent crests instead live inside the linked `competitions.table` JSONB array (each entry has `team` and an optional `symbol` URL, e.g. from `COPA SESC FUTSAL ADULTO`'s standings table), so `getAllGames()` now also selects `c."table" AS competition_table` and `mapRow()` looks up `opponentLogo` by matching `team === opponent` (exact, trimmed).
- `GamesPanel.tsx` uses `game.opponentLogo` when present, falling back to the club's own crest icon (`/header/symbol.png`) when the opponent has no `symbol` in the competition table (e.g. "Oficina das Máquinas" currently has none) or when the game has no linked competition at all.
- Verified against the live `games` table (now with 2 real upcoming rows) that the nearest upcoming game ("Cyber Futsal / Arena Cassimiro", 2026-09-03) renders its real crest URL from Vercel Blob storage instead of the fallback.

## Recent Changes (Home "jogos" Panel: Text Overflow on Long Team Names)
- Long opponent/club names (e.g. "Cyber Futsal / Arena Cassimiro") could overflow `.components-games-panel-team`'s fixed 95px width, because the span had `white-space: nowrap` with no truncation and the team block is a flex item whose default `min-width: auto` lets its min-content (the full unbroken text) win over the explicit width.
- Fixed in `globals.css`: added `min-width: 0` to `.components-games-panel-team` (lets it actually shrink to 95px) and `display: block; width: 100%; overflow: hidden; text-overflow: ellipsis;` to `.components-games-panel-team span`, for both "partida finalizada" and "próxima partida" cards (shared styles).
- `GamesPanel.tsx`'s `MatchCard` now also sets a `title` attribute on each team name span with the full untruncated name, so it's still available on hover/inspection.

## Recent Changes (Home "jogos" Panel: Correct Club Name)
- `GamesPanel.tsx` had "ACF Sport Club" hardcoded as the home team's name — a leftover from the original static mock, mismatched with the club's actual name everywhere else in the codebase (`ACF Sports/Vila Mercado`, e.g. `CLUB_NAME` in `src/data/news.ts` and the `team` entries inside `competitions.table`).
- Added a matching `CLUB_NAME = "ACF Sports/Vila Mercado"` constant in `GamesPanel.tsx` and used it for both match cards' home team name.

## Recent Changes (Home "jogos" Panel: Text-Overflow on the Date/Competition Badge)
- `.components-games-panel-matchDate` (the orange/white date badge, e.g. "02/09/2026 - COPA SESC FUTSAL ADULTO / Ginásio Pedro Mariucci") had `white-space: nowrap` with no truncation; long competition/location strings just got hard-clipped by the parent card's `overflow: hidden`, cutting text off mid-word with no ellipsis.
- Added `overflow: hidden; text-overflow: ellipsis;` to `.components-games-panel-matchDate` in `globals.css`.
- `GamesPanel.tsx`'s `MatchCard` now also sets a `title` attribute on the date badge with the full untruncated string, same pattern already used for the team name spans.

## Recent Changes (Home "jogos" Panel: Location Moved Inside the Card)
- `formatGameDate()` (`src/data/games.ts`) no longer folds `location` into the top badge string — just date + competition now. Added `formatGameTime()`, extracting only the `HH:mm` portion of `game.date`, used on the competitions page.
- `MatchCard` in `GamesPanel.tsx` gained a `location` prop and now renders the game's venue inside the card, centered, below the team/score row (previously it was crammed into the top badge).
- `globals.css`: `.components-games-panel-matchBody` is now a flex-column container (the previous row layout for teams/score was extracted into `.components-games-panel-matchTeams`); added `.components-games-panel-matchLocation` for the venue text; fixed card heights (`.components-games-panel-matchCard` / `.components-games-panel-upcomingCard`) grew from 116px/136px to 140px/160px to fit the extra line.

## Recent Changes (News Page: Pinned Article Excluded from the Full Archive)
- `NewsArchive.tsx` (`/noticias`) now filters out `PINNED_CAROUSEL_NEWS_ID`, mirroring what `getLatestNews()` already did for the home grid — the pinned news item only ever shows in the home hero carousel, never alongside the rest in the archive.

## Recent Changes (News Page: Conditional Pagination)
- The pagination nav (page numbers + arrows) in `NewsArchive.tsx` only renders when there are more than 6 news items (after excluding the pinned one); page numbers are now generated dynamically (`Math.ceil(newsItems.length / 6)`) instead of the hardcoded `[1, 2, 3, 4, 5, 6]` array.

## Recent Changes (Competitions Page: "Próxima Partida" Card Wired to the Database)
- `src/app/clube/competicoes/page.tsx` became an async Server Component that fetches `getNextUpcomingGame()` (same source the home "jogos" panel uses) and passes the formatted data down as a `nextGame` prop to `CompetitionsContent`; added `export const revalidate = 60`, matching the home page.
- `CompetitionsContent.tsx` no longer uses the static `nextMatchData` mock — it builds the card and detail modal from the `nextGame` prop (teams, competition, date, time, location), and shows "Nenhuma partida agendada no momento." when there's no upcoming game in the database. The "Partidas Anteriores" list below is unchanged and still mock data (out of scope for this change).

## Recent Changes (Footer: Contact & Social Links Wired to `team_info`)
- Added `src/data/teamInfo.ts`, following the same `cache()` + error-fallback pattern as `games.ts`/`news.ts`, querying `facebook`, `instagram`, `youtube`, `phone`, `email`, `address`, and `symbol` from the single-row `team_info` table.
- `SiteFooter.tsx` became an async server component using `getTeamInfo()` to populate the social links, phone, email, and address instead of the previous hardcoded values. Empty fields in the DB (e.g. `email`) fall back to the prior static defaults.

## Recent Changes (Contact Page: Wired to `team_info`)
- `src/app/contato/page.tsx` became an async Server Component (`export const revalidate = 60`) that fetches `getTeamInfo()` and passes it down as a `teamInfo` prop to `ContactContent`.
- `ContactContent.tsx` (client component) now takes `teamInfo: TeamInfo` and builds `contactItems` (phone, email, address) and the social links (Instagram/Facebook/YouTube) from it instead of hardcoded values. The "Atendimento" (hours) field stays static — `team_info` has no matching column. The WhatsApp link is now derived from `teamInfo.phone` via a new `toWhatsappNumber()` helper: strips to digits only and prefixes `55` when the number is 11 digits (i.e. missing the country code).

## Recent Changes (Home Carousel: Pinned News Renders Image-Only, No Text Overlay)
- When the active carousel slide is the pinned news item (`PINNED_CAROUSEL_NEWS_ID`, used as a banner/ad slot — e.g. the "Patrocinadores" news row), `HeroNews.tsx` no longer renders the `storyCard` (category/title/summary text overlaid on the image), leaving just the background image visible. Behavior for all other carousel slides is unchanged.

## Recent Changes (Home Carousel: Pinned News Always in 4th Position)
- `buildCarouselSlides()` in `HeroNews.tsx` inserted the pinned news item (`PINNED_CAROUSEL_NEWS_ID`) at the 3rd slot (`Math.min(2, slides.length)`); changed to `Math.min(3, slides.length)` so it always lands in the 4th slot of the carousel when there are enough slides.

## Recent Changes (Home "tabelas" Panel: Wired to the `competitions` Table)
- Added `src/data/competitions.ts` (same `cache()` + error-fallback pattern as `games.ts`/`teamInfo.ts`), exposing `getHomeCompetitions()`, which queries `competitions` for rows where `home_page = true` only, ordered by `updated_at` desc; the jsonb `table` column is normalized and sorted by position.
- `StandingsPanel.tsx` became an async Server Component that fetches `getHomeCompetitions()` and hands the result to a new client component, `StandingsPanelClient.tsx`, which renders the real standings table (position, club, points, games played, goal difference, wins, losses) and shows "Nenhuma tabela disponível no momento." when no competition is flagged for the home page. When more than one competition has `home_page = true`, the previously decorative `ChevronDown` button now opens a working dropdown to switch between them — same visual pattern as the dropdown in `CompetitionsContent.tsx`.
- `globals.css`: `.components-standings-panel-tableCard` switched to `position: relative; overflow: visible` (was `overflow: hidden`) so the dropdown isn't clipped; added `.components-standings-panel-dropdownMenu`, `.components-standings-panel-dropdownItem`, and `.components-standings-panel-empty`.

## Recent Changes (Home "tabelas" Panel: Broken Table Layout with Real Club Names)
- With real data (e.g. "Cyber Futsal/Arena Cassimiro"), the table broke: default `table-layout: auto` sizes columns from content, and the club-name column (`white-space: nowrap`, no truncation) forced the numeric columns (Pts/Jgs/Sgs/Vit/De) to shrink to near-zero and their text to overlap — including in the header row.
- Fixed in `globals.css`: `.components-standings-panel-table` now uses `table-layout: fixed`, with `.components-standings-panel-clubColumn` pinned at `40%` and the remaining columns at `12%` each (sums to 100%); `.components-standings-panel-clubColumn` gained `overflow: hidden; text-overflow: ellipsis` so long names truncate instead of blowing out the cell.
- The card's fixed height (`316px`, which left empty space for competitions with few teams) became auto height; the table now lives inside a new `.components-standings-panel-tableScroll` wrapper (`max-height: 280px; overflow-y: auto`) with a `position: sticky` header, so competitions with many teams (e.g. 8) scroll internally instead of stretching the card.
- `StandingsPanelClient.tsx` now wraps the `<table>` in that scroll container and adds `title={entry.team}` on the club cell so the full name is available on hover when truncated.

## Recent Changes (Competitions Page: Standings Tables Wired to the Database)
- Added `getAllCompetitions()` to `src/data/competitions.ts`, fetching every row from `competitions` ordered by `home_page DESC, updated_at DESC` — the competition flagged `home_page = true` always lands first in the array (and is therefore pre-selected in the table).
- `src/app/clube/competicoes/page.tsx` now fetches `getAllCompetitions()` alongside `getNextUpcomingGame()` and passes the result down as a `competitions` prop to `CompetitionsContent`.
- `CompetitionsContent.tsx` no longer uses the static `competitionOptions`/`standingsData` mocks — the competition dropdown and standings table are built from the `competitions` prop (same `HomeCompetition`/`StandingEntry` shape used by the home panel); the dropdown is disabled when there's only one competition, and shows "Nenhuma tabela disponível no momento." when the database returns none.

## Recent Changes (Competitions Page: "Partidas Anteriores" Wired to the Database)
- Added `getPreviousGames()` to `src/data/games.ts`, reusing the same `isFinished` filter already used by `getLatestFinishedGame()` (a game counts as finished when `result` is neither empty nor `"-"`), returning every finished game sorted most-recent-first (instead of just the latest one).
- `src/app/clube/competicoes/page.tsx` now also fetches `getPreviousGames()` and builds a `previousMatches` prop (type `PreviousMatchData`, exported from `CompetitionsContent.tsx`) using the same formatting already used for `nextGame` (`formatGameDate`/`formatGameTime`, opponent logo via `competition.table`).
- `CompetitionsContent.tsx` dropped the static `previousMatchesData` mock — the "Partidas Anteriores" list is built from the `previousMatches` prop and only renders when at least one finished game exists in the database; otherwise it shows "Nenhuma partida anterior registrada no momento." (same pattern as the other sections). Since the `games` table has no structured per-side score (just the freeform `result` column, e.g. used as "3 x 1" in the home "jogos" panel), `MatchDetail`'s `homeTeam.score`/`awayTeam.score` fields (fixed numbers from the mock) were replaced by a single `result: string` field, rendered as-is from the database in both the card and the detail modal. The mock's `highlights`/`referee` fields (no matching database column) were removed, along with the "Observações da Partida" modal block that displayed them.

## Recent Changes (Home Carousel: Redesigned Slide Copy to Match Figma Reference)
- `HeroNews.tsx`: regular slides now render only the news title (category/summary paragraphs removed), left-aligned at the bottom of the stage in a width-capped box (`max-width: min(640px, calc(100% - 480px))` so it never collides with the thumbnail strip), over a new `.components-hero-news-scrim` bottom gradient for legibility on any background image.
- The pinned slide (`PINNED_CAROUSEL_NEWS_ID`, the sponsors banner) now renders its own database title (e.g. "seja um de nossos patrocinadores.") stacked above a new `.components-hero-news-ctaButton` ("Ver Planos ↗") linking to `/clube/patrocinadores`, styled with the site's existing orange gradient (`linear-gradient(165deg, #ff3203 0%, #8f301d 99%)`) and a pill radius.
- Fixed an earlier regression where the title used `font-size: 4rem` (64px) with centered text spanning nearly the full stage width, which visually overwhelmed the background image; title is now 32px/38px (left-aligned), scaled down further at the `768px`/`576px` breakpoints.

## Recent Changes (News Article Body: Inline Links Now Styled and Get a Hover State)
- Added `.components-news-detail-content a` in `globals.css`: inline links embedded in the rich-text `news.content` HTML (rendered via `dangerouslySetInnerHTML` in `NewsDetail.tsx`) now render in the brand orange (`var(--laranja)`, `#ff3203`) with an underline, and darken to `#8f301d` on hover with a `color` transition. Previously these links had no distinct color or hover feedback, inheriting the surrounding paragraph's default text styling.

## Recent Changes (Home "planos" Section: Corrected Colors Against the Figma Design System)
- Audited `PlansSection.tsx`/`globals.css` against a Figma-exported design system for the "planos" frame; most colors and typography already matched exactly. Fixed two confirmed mismatches: the featured ("master") card's headline and price color was `#7a210f`, corrected to `#661400` (the design system's `cor do acf sport/L-18` token); the featured card's CTA button gradient was using the sitewide `#ff3203 → #8f301d` gradient, corrected to the design system's specific `#ff7a5c → #8f1d00` gradient for this component.

## Recent Changes (Batch of Site-Wide Fixes from `improvements.md`)
- **Related news / pagination**: `getRelatedNews()` (`src/data/news.ts`) now excludes `PINNED_CAROUSEL_NEWS_ID` in addition to the current article, so the sponsors banner never shows up in "Mais notícias sobre o ACF". `NewsDetail.tsx` paginates that related list 4-per-page and only renders the pagination nav when there are more than 4 eligible items.
- **Pagination made functional**: both `NewsDetail.tsx`'s related-news pagination and `NewsArchive.tsx`'s (`/noticias`) pagination were previously decorative (static page numbers, all links pointing to `/noticias` with page 1 hardcoded active). Both now read a `page` prop (sourced from the route's `searchParams`), slice their item list accordingly, generate real `?page=N` links, and hide the next/last-page arrows once on the last page. `/noticias` and `/noticias/[id]` are consequently dynamic routes now (they depend on `searchParams`).
- **Header logo wired to `team_info`**: added `src/components/SiteHeader.tsx`, an async server component that calls `getTeamInfo()` and renders `MainMenu` with a new `logoSrc` prop (`MainMenu.tsx`, defaults to the existing static asset). Replaced `<MainMenu />` with `<SiteHeader />` (and the corresponding import) across all 9 page files that render the header.
- **Sponsors strip hidden behind a flag**: added `SPONSORS_STRIP_ENABLED = false` inside `SponsorsStrip.tsx`, which now returns `null` when disabled — hides the sponsor-logo marquee band everywhere it's rendered without deleting its markup/logic. The dedicated `/clube/patrocinadores` page is unaffected.
- **Roster ("elenco") section spacing fix**: `.components-roster-section-section` had a fixed `min-height: 1048px` (also duplicated as an inline style in `RosterSection.tsx`) that left a large empty gap below the "ver elenco completo" button whenever actual content was shorter than that height. Removed the fixed `min-height` (both the CSS rule and its `768px` breakpoint override, and the inline style prop) so the section sizes to its content; adjusted `.components-roster-section-inner`'s bottom padding to `40px` desktop / `32px` mobile, matching the design system's `lg` spacing token.
- **YouTube section gradient fix**: `.components-youtube-section-button` ("inscreva-se no canal do youtube") used the sitewide `#ff3203 → #8f301d` gradient; corrected to `#ff7a5c → #8f1d00`, the exact gradient documented for this button in its Figma-exported design system (typography, other colors, and the card's drop shadow already matched precisely).

## Recent Changes (Asset Updates)
- Replaced `public/footer/acf-footer-logo.png`, `public/footer/sovereign-footer.png`, and `public/youtube-section/youtube-bull.png` with updated exports (no code changes).
