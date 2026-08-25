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

- **Carousel Image Update**:
  - Replaced `public/carousel/image-01.jpg` and `image-02.jpg` with `image-01.png`/`image-02.png`, updating references in `HeroNews.tsx` and `src/data/news.ts` accordingly. Files were saved with capitalized names (`Image-01.png`/`Image-02.png`) and renamed to lowercase to avoid breaking on Vercel's case-sensitive Linux build environment (macOS's filesystem is case-insensitive, so the mismatch wasn't visible locally).

- **Favicon Fix**:
  - Moved `favicon.ico` from `src/favicon.ico` to `src/app/favicon.ico` — Next.js App Router only picks up the favicon automatically from `app/favicon.ico` (or `public/favicon.ico`); it was previously outside `app/` and silently ignored.
  - Shortened the page `<title>` metadata in `layout.tsx` to "ACF Sports | Site Oficial".

- **CI/CD**:
  - Added GitHub Actions workflows (`.github/workflows/prev-deploy.yaml`, `.github/workflows/prod-deploy.yaml`) that build and deploy to Vercel: preview deployments on push to `stage`, production deployments on push to `main`.
  - Fixed `prev-deploy.yaml`: removed the unsupported `--preview` flag from the `vercel build` and `vercel deploy` steps (Vercel CLI 59.x has no such flag; preview is the default target when `--prod` is omitted), which was failing the workflow with `unknown or unexpected option: --preview`.
  - Added a step to `prev-deploy.yaml` that aliases every `stage` preview deployment to a fixed domain, `stage.acfsports.com.br`, via `vercel alias set` — needed because the Vercel project has no Git repository connected, so the dashboard can't offer branch-based domain assignment. Requires a CNAME record for `stage` pointing to `cname.vercel-dns.com` on the DNS provider (Cloudflare).
  - Registered `stage.acfsports.com.br` as a formal project domain on Vercel (`vercel domains add`) so it's exempt from SSO deployment protection like the production domain — a bare `vercel alias set` alias alone doesn't qualify for that exemption and was prompting a Vercel login on first access.

- **News: Neon Postgres Integration**:
  - `src/data/news.ts` no longer holds static mock data — it now queries the `news` table in the shared Neon Postgres database (via `@neondatabase/serverless`, lazily initialized in `src/db/index.ts`) that the `acf-site-manager` dashboard (`dashboard.acfsports.com.br`) writes to. `getAllNews()` is wrapped in React's `cache()` and falls back to `[]` on a DB error so pages degrade gracefully instead of crashing.
  - The `acf-site` Vercel project's `DATABASE_URL` env var points at the same Neon database `acf-site-manager` uses (read access); locally it lives in `.env` (gitignored).
  - `NewsItem` shape changed to match the DB columns: `id`, `tag`, `title`, `subtitle`, `content` (rich HTML from the dashboard's editor, rendered via `dangerouslySetInnerHTML`), `author`, `image`, `createdAt`. The old mock-only fields (`slug`, `category`, `description`, `caption`, `body[]`, `quote`, and the `layered`/`mascot` image variants) are gone.
  - Detail route renamed from `src/app/noticias/[slug]` to `src/app/noticias/[id]` since the DB has no slug column — links now use the row's `id` (UUID). `generateStaticParams` was removed in favor of ISR (`export const revalidate = 60` on `/`, `/noticias`, and `/noticias/[id]`) since content is edited live via the external dashboard.
  - `HeroNews.tsx` no longer has its own hardcoded `slides` array — it's now a client component that receives `news: NewsItem[]` as a prop, fetched server-side in `src/app/page.tsx` via `getFeaturedNews(3)`. `NewsGrid.tsx` and `NewsArchive.tsx` became async server components fetching `getLatestNews(6)` / `getAllNews()` directly.

- **Carousel da Home: Filtro por Highlight e Notícia Fixada**:
  - `NewsItem` ganhou o campo `highlight: boolean` (da coluna `highlight` da tabela `news`). `HeroNews.tsx` agora só exibe no carousel da home notícias com `highlight === true`, e sempre força a notícia de ID `cd288794-2014-4f37-8163-cb5082cd0b47` para a posição fixa do carousel, independente do seu próprio valor de `highlight`. `src/app/page.tsx` agora passa `getAllNews()` no lugar do antigo helper `getFeaturedNews(3)` (removido).
  - `getLatestNews()` (o grid "notícias" da home, `NewsGrid.tsx`) agora sempre exclui essa mesma notícia fixada, então ela só aparece no carousel. O arquivo completo `/noticias` (`NewsArchive.tsx`, via `getAllNews()`) não é afetado.

- **Carousel da Home: Notícia Fixada Movida para a Posição 3**:
  - O ponto de inserção da notícia fixada no `HeroNews.tsx` mudou do índice 1 (posição 2) para o índice 2 (posição 3).

- **Grid de Notícias da Home: Layout Corrigido com Menos de 3 Itens**:
  - `.components-news-grid-grid` usava `grid-template-columns: repeat(3, 330px)` fixo, o que reservava espaço de layout para 3 itens mesmo quando havia menos disponíveis (ex.: com a notícia fixada excluída do grid, sobram só 2 dos 6 itens buscados), deixando o layout desbalanceado.
  - `NewsGrid.tsx` agora calcula `gridColumns = Math.min(newsItems.length, 3)` e passa via custom property CSS `--news-grid-columns`; `globals.css` usa `repeat(var(--news-grid-columns, 3), 330px)` no desktop e `repeat(min(var(--news-grid-columns, 2), 2), 330px)` no breakpoint de 1200px, então o grid sempre reflete a quantidade real de notícias.

- **Painel "jogos" da Home: Conectado à Tabela `games`**:
  - Adicionado `src/data/games.ts`, uma camada de acesso a dados para a tabela `games` (`id`, `competition_id` → join com `competitions.title`, `opponent`, `result`, `date`, `location`), seguindo o mesmo padrão de `src/data/news.ts` (`cache()` + fallback silencioso em erro). Uma partida é considerada **finalizada** quando `result` não é vazio nem `"-"` (o valor padrão que o formulário de jogos do dashboard usa para partidas futuras), e **próxima** caso contrário.
  - `getLatestFinishedGame()` retorna a partida finalizada com a `date` mais recente; `getNextUpcomingGame()` retorna a próxima partida com a `date` mais próxima. Ambas retornam `null` quando não há partida correspondente.
  - `GamesPanel.tsx` virou um componente de servidor assíncrono que busca as duas via `Promise.all` e só renderiza cada bloco ("partida finalizada" / "próxima partida") quando a partida correspondente existe (antes eram exemplos estáticos fixos no código).

- **Painel "jogos" da Home: Logo do Adversário**:
  - A tabela `games` não tem coluna própria de logo. Os brasões dos adversários ficam dentro do JSON `competitions.table` (cada item tem `team` e, opcionalmente, `symbol`), então `getAllGames()` agora também busca `c."table" AS competition_table` e resolve `opponentLogo` casando `team === opponent` (exato, com trim).
  - `GamesPanel.tsx` usa `game.opponentLogo` quando existe, caindo para o brasão do próprio clube (`/header/symbol.png`) quando o adversário não tem `symbol` cadastrado na tabela da competição ou quando a partida não tem competição vinculada.
  - Confirmado com dados reais na tabela `games`: a próxima partida mais próxima ("Cyber Futsal / Arena Cassimiro", 03/09/2026) já renderiza o brasão real hospedado no Vercel Blob.

- **Painel "jogos" da Home: Text-Overflow em Nomes Extensos**:
  - Nomes longos de adversário/clube podiam estourar a largura fixa de 95px do `.components-games-panel-team`, pois o `span` tinha `white-space: nowrap` sem truncamento, e o bloco do time é um item flex cujo `min-width: auto` padrão deixa o conteúdo mínimo (o texto inteiro) vencer a largura explícita.
  - Corrigido no `globals.css`: adicionado `min-width: 0` em `.components-games-panel-team` (permite encolher de fato para 95px) e `display: block; width: 100%; overflow: hidden; text-overflow: ellipsis;` em `.components-games-panel-team span`, valendo tanto para "partida finalizada" quanto "próxima partida" (estilos compartilhados).
  - `MatchCard` em `GamesPanel.tsx` agora também define `title` com o nome completo em cada span de time, para ficar disponível ao passar o mouse mesmo com o texto truncado.

- **Painel "jogos" da Home: Nome Correto do Clube**:
  - `GamesPanel.tsx` tinha "ACF Sport Club" fixo como nome do time da casa — resquício do mock estático original, divergente do nome real do clube usado no restante do código (`ACF Sports/Vila Mercado`, ex.: `CLUB_NAME` em `src/data/news.ts` e os itens `team` dentro de `competitions.table`).
  - Adicionada a constante `CLUB_NAME = "ACF Sports/Vila Mercado"` em `GamesPanel.tsx`, usada no nome do time da casa nos dois cards.

- **Painel "jogos" da Home: Text-Overflow na Faixa de Data/Competição**:
  - `.components-games-panel-matchDate` (a faixa laranja/branca com a data, ex.: "02/09/2026 - COPA SESC FUTSAL ADULTO / Ginásio Pedro Mariucci") tinha `white-space: nowrap` sem truncamento; textos longos de competição/local eram simplesmente cortados pelo `overflow: hidden` do card pai, no meio da palavra e sem reticências.
  - Adicionado `overflow: hidden; text-overflow: ellipsis;` em `.components-games-panel-matchDate` no `globals.css`.

- **Painel "jogos" da Home: Local Movido para Dentro do Card**:
  - `formatGameDate()` (`src/data/games.ts`) não inclui mais o `location` na string da faixa de data/competição no topo do card — só data + competição. Nova função `formatGameTime()` extrai só o horário (`HH:mm`) de `game.date`, usada na página de competições.
  - `MatchCard` em `GamesPanel.tsx` ganhou a prop `location` e agora renderiza o local do jogo dentro do card, centralizado, logo abaixo da linha dos times/placar (antes ficava embutido na faixa do topo).
  - `globals.css`: `.components-games-panel-matchBody` virou um container flex-column (a antiga disposição em linha dos times/placar foi extraída para `.components-games-panel-matchTeams`); nova classe `.components-games-panel-matchLocation` estiliza o texto do local; a altura fixa dos cards (`.components-games-panel-matchCard` / `.components-games-panel-upcomingCard`) aumentou de 116px/136px para 140px/160px para acomodar a linha extra.

- **Página de Notícias: Notícia Fixada Ausente do Arquivo Completo**:
  - `NewsArchive.tsx` (`/noticias`) agora filtra `PINNED_CAROUSEL_NEWS_ID` da lista, igual ao que `getLatestNews()` já fazia para o grid da home — a notícia fixada só aparece no carousel da home, nunca junto das demais no arquivo.

- **Página de Notícias: Paginação Condicional**:
  - A navegação de paginação (números de página + setas) em `NewsArchive.tsx` só é renderizada quando há mais de 6 notícias (após excluir a fixada); os números de página agora são gerados dinamicamente (`Math.ceil(newsItems.length / 6)`) em vez do array fixo `[1, 2, 3, 4, 5, 6]`.

- **Página de Competições: Card "Próxima Partida" Conectado ao Banco**:
  - `src/app/clube/competicoes/page.tsx` virou um Server Component assíncrono que busca `getNextUpcomingGame()` (mesma fonte usada pelo painel "jogos" da home) e passa os dados formatados como prop `nextGame` para `CompetitionsContent`; ganhou `export const revalidate = 60`, igual à home.
  - `CompetitionsContent.tsx` não usa mais o mock estático `nextMatchData` — monta o card e o modal de detalhes a partir da prop `nextGame` (times, competição, data, hora, local), e mostra "Nenhuma partida agendada no momento." quando não há próxima partida no banco. A lista "Partidas Anteriores" abaixo permanece com dados mock (fora do escopo desta mudança).

- **Rodapé: Contato e Redes Sociais Conectados à Tabela `team_info`**:
  - Adicionado `src/data/teamInfo.ts`, seguindo o mesmo padrão (`cache()` + fallback em erro) de `games.ts`/`news.ts`, buscando `facebook`, `instagram`, `youtube`, `phone`, `email`, `address` e `symbol` da tabela `team_info` (linha única).
  - `SiteFooter.tsx` virou um componente de servidor assíncrono que usa `getTeamInfo()` para preencher os links de redes sociais, telefone, e-mail e endereço, no lugar dos valores fixos anteriores. Campos vazios no banco (ex.: `email`) caem no fallback estático anterior.

- **Página de Contato: Conectada à Tabela `team_info`**:
  - `src/app/contato/page.tsx` virou um Server Component assíncrono (`export const revalidate = 60`) que busca `getTeamInfo()` e passa como prop `teamInfo` para `ContactContent`.
  - `ContactContent.tsx` (client component) recebe `teamInfo: TeamInfo` e monta `contactItems` (telefone, e-mail, endereço) e os links de redes sociais (Instagram/Facebook/YouTube) a partir dela, no lugar dos valores fixos anteriores. O campo "Atendimento" continua estático — não existe coluna correspondente em `team_info`. O link do WhatsApp agora é derivado do `teamInfo.phone` (nova função `toWhatsappNumber()`: extrai só os dígitos e prefixa `55` quando o número tem 11 dígitos, ou seja, sem código de país).

- **Carousel da Home: Notícia Fixada Sem Overlay de Texto**:
  - Quando o slide ativo do carousel é a notícia fixada (`PINNED_CAROUSEL_NEWS_ID`, usada como banner/anúncio — ex.: a notícia "Patrocinadores"), `HeroNews.tsx` não renderiza mais o `storyCard` (categoria, título e resumo sobrepostos à imagem), deixando só a imagem de fundo visível. Para as demais notícias do carousel o comportamento não muda.
  - `MatchCard` em `GamesPanel.tsx` agora também define `title` com o texto completo da faixa de data, mesmo padrão já usado nos nomes dos times.

- **Carousel da Home: Notícia Fixada Sempre na 4ª Posição**:
  - `buildCarouselSlides()` em `HeroNews.tsx` inseria a notícia fixada (`PINNED_CAROUSEL_NEWS_ID`) na 3ª posição (`Math.min(2, slides.length)`); ajustado para `Math.min(3, slides.length)`, garantindo que ela sempre ocupe a 4ª posição do carousel quando houver slides suficientes.

- **Painel "tabelas" da Home: Conectado à Tabela `competitions`**:
  - Adicionado `src/data/competitions.ts` (padrão `cache()` + fallback em erro, igual a `games.ts`/`teamInfo.ts`), com `getHomeCompetitions()` buscando em `competitions` apenas as linhas com `home_page = true`, ordenadas por `updated_at` desc; a coluna jsonb `table` é normalizada e ordenada por posição.
  - `StandingsPanel.tsx` virou um Server Component assíncrono que busca `getHomeCompetitions()` e repassa para o novo `StandingsPanelClient.tsx` (client component), que renderiza a tabela de classificação real (posição, clube, pontos, jogos, saldo de gols, vitórias, derrotas) e mostra "Nenhuma tabela disponível no momento." quando nenhuma competição está marcada para a home. Quando há mais de uma competição com `home_page = true`, o botão com `ChevronDown` (antes decorativo) agora abre um dropdown funcional para trocar entre elas — mesmo padrão visual do dropdown em `CompetitionsContent.tsx`.
  - `globals.css`: `.components-standings-panel-tableCard` passou a `position: relative; overflow: visible` (antes `overflow: hidden`) para não cortar o dropdown; novas classes `.components-standings-panel-dropdownMenu`, `.components-standings-panel-dropdownItem` e `.components-standings-panel-empty`.

- **Painel "tabelas" da Home: Tabela Quebrada com Nomes Reais de Clube**:
  - Com dados reais (ex.: "Cyber Futsal/Arena Cassimiro"), a tabela colapsava: `table-layout` (padrão `auto`) redistribuía a largura das colunas com base no conteúdo, e a coluna do clube (`white-space: nowrap`, sem truncamento) forçava as colunas numéricas (Pts/Jgs/Sgs/Vit/De) a espremerem e sobrepor o texto — inclusive no cabeçalho.
  - Corrigido em `globals.css`: `.components-standings-panel-table` ganhou `table-layout: fixed`, com `.components-standings-panel-clubColumn` fixada em `40%` e as demais colunas em `12%` cada (soma 100%); `.components-standings-panel-clubColumn` ganhou `overflow: hidden; text-overflow: ellipsis` para truncar nomes longos em vez de estourar a célula.
  - A altura fixa do card (`316px`, que sobrava vazia para competições com poucos times) virou altura automática; a tabela agora fica dentro de `.components-standings-panel-tableScroll` (nova classe, `max-height: 280px; overflow-y: auto`) com cabeçalho `position: sticky`, então competições com muitos times (ex.: 8) ganham rolagem interna em vez de esticar o card.
  - `StandingsPanelClient.tsx` passou a envolver a `<table>` nesse novo wrapper e a adicionar `title={entry.team}` na célula do clube, para o nome completo aparecer ao passar o mouse quando truncado.

- **Página de Competições: Tabelas de Classificação Conectadas ao Banco**:
  - Adicionado `getAllCompetitions()` em `src/data/competitions.ts`, buscando todas as linhas de `competitions` ordenadas por `home_page DESC, updated_at DESC` — a competição marcada com `home_page = true` sempre vem primeiro no array (e, portanto, pré-selecionada na tabela).
  - `src/app/clube/competicoes/page.tsx` agora busca `getAllCompetitions()` junto com `getNextUpcomingGame()` e passa o resultado como prop `competitions` para `CompetitionsContent`.
  - `CompetitionsContent.tsx` não usa mais os mocks estáticos `competitionOptions`/`standingsData` — o dropdown de competições e a tabela de classificação são montados a partir da prop `competitions` (mesmo shape `HomeCompetition`/`StandingEntry` usado no painel da home); o dropdown fica desabilitado quando há só uma competição, e é exibido "Nenhuma tabela disponível no momento." quando o banco não retorna nenhuma.

- **Página de Competições: "Partidas Anteriores" Conectada ao Banco**:
  - Adicionado `getPreviousGames()` em `src/data/games.ts`, reaproveitando o mesmo filtro `isFinished` já usado por `getLatestFinishedGame()` (jogo é considerado finalizado quando `result` não é vazio nem `"-"`), retornando todos os jogos finalizados ordenados do mais recente para o mais antigo (em vez de só o último).
  - `src/app/clube/competicoes/page.tsx` agora também busca `getPreviousGames()` e monta a prop `previousMatches` (tipo `PreviousMatchData`, exportado por `CompetitionsContent.tsx`) com o mesmo padrão de formatação já usado para `nextGame` (`formatGameDate`/`formatGameTime`, logo do adversário via `competition.table`).
  - `CompetitionsContent.tsx` removeu o mock estático `previousMatchesData` — a lista "Partidas Anteriores" é montada a partir da prop `previousMatches` e só aparece quando há pelo menos um jogo finalizado cadastrado no banco; caso contrário mostra "Nenhuma partida anterior registrada no momento." (mesmo padrão das outras seções). Como a tabela `games` não tem um placar estruturado por lado (só a coluna livre `result`, ex.: usada como "3 x 1" no painel "jogos" da home), o tipo `MatchDetail` trocou os campos `homeTeam.score`/`awayTeam.score` (números fixos do mock) por um único campo `result: string`, exibido tal como vem do banco tanto no card quanto no modal de detalhes. Os campos `highlights`/`referee` do mock (sem coluna correspondente no banco) foram removidos, junto com o bloco "Observações da Partida" no modal que os exibia.
