---
name: figma-desktop-parity
description: Diagnose and fix desktop layout mismatches between the live site and the Figma design (spacing, card sizes, gaps) without guessing at pasted CSS values. Use when the user reports the desktop layout is "fora da realidade" / doesn't match Figma, or wants to validate a section's sizing against the design.
---

# Figma ↔ desktop parity check

This project's Figma file has no Dev Mode MCP connected (last checked: user does not have a paid Figma
Dev Mode seat). Do not assume one is available — verify with `ToolSearch("figma")` before assuming
otherwise. This skill is the fallback workflow: manual measurement comparison, one section at a time.

Reference frame width: **1600px** (confirmed with the user). Always compare at this viewport width.

## Why this workflow exists

Pasting raw Figma numbers (e.g. "margin-left 220, right 719") directly into CSS as literal margins
broke the header once already — those numbers were absolute canvas/frame coordinates, not flex
margins, and stacking them with the existing `justify-content: space-between` layout pushed content
off-screen. Never translate a Figma number into CSS yourself without seeing the actual Design-panel
screenshot. Read the numbers directly from the screenshots the user sends.

## Step 0 — Dev server sanity check (do this FIRST, every time)

This repo's Next.js dev server has a recurring bug: after editing `globals.css` a few times, the
compiled CSS chunk 404s (`_next/static/css/app/layout.css` returns 404 even after reload), and
`.next/static/css/app/` ends up empty while the real hashed CSS files sit one directory up. The page
then renders with zero styles applied (everything collapses to browser defaults — this looks exactly
like a broken layout and is easy to mistake for a real bug).

Before trusting any visual diff against Figma, verify the live page actually has CSS loaded:

```js
// in the browser tab, via javascript_tool
const link = document.querySelector('link[rel=stylesheet]');
const resp = await fetch(link.href);
resp.status // must be 200, not 404
```

If it 404s:
```bash
pkill -f "next dev"
rm -rf .next
npm run dev &
```
Then hard-navigate (not client-side route) to the page again and re-check.

A second variant of the same underlying flakiness: a runtime `TypeError: Cannot read properties of
undefined (reading 'call')` overlay (webpack chunk corruption) after many edits — same fix. If a
browser tab keeps showing a stale URL/error after the server restart and re-navigate (it happens —
tabs can get stuck in a bad state independent of the server), close it and open a fresh tab rather
than fighting the stuck one.

## Step 1 — Get real Figma measurements from the user

No Dev Mode needed — ask the user to select the element in Figma (the section frame, then each
notable child: title, card, gap) and screenshot the right-hand **Design** panel (shows W/H, X/Y
Position, and — for auto-layout frames — Gap/Padding directly). For gaps between separate elements,
ask them to hold **Alt/Option** and hover from one element to its neighbor — Figma draws the distance
in red with the exact px number.

Ask for one batch of screenshots per section: container frame, title, one card, a gap (alt-hover
between two siblings), and any sidebar/secondary block. Read the numbers straight off the panel —
`Position X/Y`, `Resizing W/H`, `Gap`, `Padding`, typography size/line-height.

## Step 2 — Measure the live page

At 1600px-equivalent viewport, use `getBoundingClientRect()` in the browser tab (not screenshots/eyeballing) for the same elements:

```js
function box(sel){ const el=document.querySelector(sel); const r=el.getBoundingClientRect();
  return {w:Math.round(r.width), h:Math.round(r.height), left:Math.round(r.left), top:Math.round(r.top)}; }
```

## Step 3 — Compare, one section at a time

Build a small table (Figma value vs live value) for each measured property. Only touch CSS for
properties that actually differ — don't "fix" values that already match. Most container/gap/width
values in this codebase are already correct; the actual source of drift found so far is elsewhere
(see Step 4).

## Step 4 — Check for the missing-line-clamp pattern

The main real bug found (2026-08-28, `noticias`/`notícias` section): Figma cards have a **fixed**
height assuming a fixed number of text lines (e.g. 2-line title), but the live CSS had no
`-webkit-line-clamp` on the title/paragraph. Real content (longer than Figma's placeholder text)
wrapped to 3 lines, growing the card past its spec height and breaking row alignment in CSS grids.

When checking any section with a text card in a **grid** (not a single flex column list — grids are
where uneven row heights actually break the layout visually):
1. Find the card's text elements (`h2`/`h3`/`p` etc.) in `globals.css`.
2. Check whether they already have `-webkit-line-clamp` + `overflow: hidden` + `display: -webkit-box` + `-webkit-box-orient: vertical`.
3. If not, and the Figma card has a fixed/Hug height with a max line count, add the clamp matching
   that line count.
4. Verify live: card heights across the grid should become identical (`getBoundingClientRect` on all
   cards, compare `h`).

Already confirmed clean (has clamp or doesn't need it): `components-roster-athlete-card-*` (elenco),
`components-hero-news-title`, `components-sponsors-page-content-planCard` (uses `min-height` +
flex-grow, not a fixed-height grid, so uneven content doesn't break alignment there).
Fixed so far: `components-news-grid-copy` (home page), `components-news-archive-copy` (`/noticias`).
Not yet checked: `components-standings-panel-tableCard`, `components-youtube-section-card`,
`components-sponsors-strip-logoCard`, `components-contact-content-*Card`, `components-history-content-symbolCard`.

## Step 5 — Check for the fixed-width-row-overflow pattern (1200px–1480px gap)

Second real bug class found (2026-08-28, reported against a real 1470px-wide MacBook screen: content
looked "glued to the edges"). `globals.css` breakpoints stop at `--breakpoint-xl: 1200px` — there is
**no intermediate step** between `1200px` and the site's max content width (`1440px`/`1600px`
depending on section). Content containers using `width: min(1440px, calc(100% - 40px))` degenerate to
a **flat 20px side margin** for any viewport under `1480px` (`1440 + 40`). Any row/grid inside such a
container whose fixed track/item widths sum to *exactly* that max (a design tuned only for the widest
case, no slack) silently overflows its own shrunk container in the `1200–1480px` range — usually
invisible, clipped by `overflow: hidden` on the section, with content bleeding to the literal edge of
the viewport.

To check a section: measure `element.scrollWidth > element.clientWidth` at a few viewports spanning
`1200px`–`1600px` (at minimum `1250px`, `1470px`, `1600px`) on any fixed-width flex row or
`grid-template-columns: repeat(N, Npx)` grid inside a `min(1440px, ...)`/`min(1160px, ...)` container.
`grep -n "grid-template-columns: repeat([0-9]*, [0-9]*px)"` and `grep -n "flex: 0 0 auto"` in
`globals.css` surface the candidates fast — most turn out safe (the fixed total already matches an
existing breakpoint's container width exactly, e.g. news-archive's `1160px` grid coincides with the
`≤1200px` breakpoint; Home/Patrocinadores plan cards' `1160px` row does too). Two ways to fix a real
one, depending on the card:

- **No `clip-path`, or an SVG with `viewBox`**: safe to shrink fluidly. Replace the fixed `width` with
  `width: min(<max>px, calc((100% - <(N-1)*gap>px) / N))` (flex row) or the equivalent inside
  `repeat()` for a grid track, and switch fixed `height` to `aspect-ratio` so it scales with the width.
  Applied to `.components-roster-section-athlete` (home carousel, SVG-based) and
  `.components-news-grid-grid`/`-card`/`-cardImage` (home news grid, plain `<img>`).
- **CSS `clip-path: path(...)` with hardcoded absolute-pixel coordinates on a plain HTML element**: do
  **not** shrink the box — `path()` coordinates don't scale with element resizing (unlike an SVG
  `viewBox`), so this would visibly distort the shape. Add an intermediate `@media` breakpoint instead,
  dropping the column count early enough that the new fixed total has comfortable slack in the shrunk
  container. Applied to `.components-roster-roster-page-content-grid` (`/clube/elenco` full listing,
  card uses `clip-path`): added `@media (max-width: 1480px) { grid-template-columns: repeat(4, 256px); }`.
  While doing this, found and removed a pre-existing **dead-CSS bug**: two separate
  `@media (max-width: 1200px)` blocks both redefined the same grid's `grid-template-columns` — same
  specificity, same condition, so the first (`repeat(4, 256px)`) was always silently overridden by the
  second (`repeat(3, 256px)`) immediately after it in source order, and never actually rendered.
  `grep -n "@media (max-width: <same value>)" globals.css` and check for a selector redefined in two
  separate blocks at the same breakpoint — same class of bug could exist elsewhere.

Also check the **header** against whatever content-container formula the page uses — but don't assume
which container it should match. This site has (at least) two different max-width families:
`min(1440px, calc(100% - 40px))` (notícias, elenco carousel, competitions, page-heading bands) and
`min(1160px, calc(100% - 40px))` (Home "planos.", sponsors strip, `/noticias` archive). **Designer-confirmed
(2026-08-29): the header must align with the `1160px` family specifically** (verified via `.components-plans-section-inner`, whose title sits flush with the container edge, no extra margin) — **not** the
`1440px` sections. `.components-main-menu-menu` padding is `16px max(20px, calc((100% - 1160px) / 2))`.
This makes the header intentionally narrower/more-inset than the `1440px` content sections below it
(e.g. at `1600px`: header inset `220px` vs. notícias/elenco content inset `80px`) — that mismatch
between header and the wide sections is the confirmed correct look; don't "fix" it by touching the
`1440px` sections' width, and don't re-widen the header to `1440px` without asking again. If a *new*
container formula is introduced, confirm with the user/designer which family (`1160` or `1440`) it
belongs to before assuming.

Confirmed clean already: page-heading bands (8 pages, text-only, no fixed row), Competitions
(`1fr`-based grid, inherently fluid), `/noticias` archive grid, Home/Patrocinadores plan cards, Contato
(`.components-contact-content-inner` was already `min(1160px, ...)` before any of this work started).
Fixed so far: Home elenco carousel, Home news grid, `/clube/elenco` full listing grid, header padding,
footer columns, all 8 page-heading bands (container width), Competitions page content container.
Not yet audited this way: História content, YouTube section, Sponsors strip marquee (the marquee's
horizontal overflow is intentional — a scrolling loop — don't "fix" that one), Patrocinadores page
content (`/clube/patrocinadores` — user's QA found this one visually fine, not yet measured).

## Step 6 — Verify and clean up

`npm run build` must pass. Screenshot the section live and sanity-check against the Figma screenshot
visually. Close any browser tabs you opened; kill the dev server if you started it for this check.
