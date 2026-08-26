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

- **Carousel da Home: Copy dos Slides Redesenhada para Bater com a Referência do Figma**:
  - `HeroNews.tsx`: os slides normais agora mostram só o título da notícia (categoria/resumo removidos), alinhado à esquerda na base do stage, em uma caixa com largura limitada (`max-width: min(640px, calc(100% - 480px))` para nunca colidir com a faixa de miniaturas), sobre um novo gradiente `.components-hero-news-scrim` na base para garantir legibilidade sobre qualquer imagem de fundo.
  - O slide fixado (`PINNED_CAROUSEL_NEWS_ID`, o banner de patrocinadores) agora usa o próprio título vindo do banco (ex.: "seja um de nossos patrocinadores.") empilhado acima de um novo botão `.components-hero-news-ctaButton` ("Ver Planos ↗") que leva para `/clube/patrocinadores`, com o mesmo gradiente laranja já usado no site (`linear-gradient(165deg, #ff3203 0%, #8f301d 99%)`) e raio em formato de pílula.
  - Corrigida uma regressão anterior em que o título usava `font-size: 4rem` (64px) centralizado ocupando quase toda a largura do stage, o que dominava visualmente a imagem de fundo; o título agora é 32px/38px (alinhado à esquerda), reduzindo ainda mais nos breakpoints `768px`/`576px`.

- **Corpo da Notícia: Links Internos Agora Têm Cor e Hover**:
  - Adicionado `.components-news-detail-content a` no `globals.css`: links inseridos no HTML rico de `news.content` (renderizado via `dangerouslySetInnerHTML` em `NewsDetail.tsx`) agora aparecem na cor laranja da marca (`var(--laranja)`, `#ff3203`) com sublinhado, e escurecem para `#8f301d` no hover, com transição suave de cor. Antes esses links não tinham cor nem destaque próprios, herdando o estilo padrão do parágrafo ao redor.

- **Seção "planos" da Home: Cores Corrigidas Conforme o Design System do Figma**:
  - Comparado `PlansSection.tsx`/`globals.css` com um design system exportado do Figma para o frame "planos"; a maior parte das cores e tipografia já batia exatamente. Corrigidas duas divergências confirmadas: a cor do título e do preço no card em destaque ("master") era `#7a210f`, corrigida para `#661400` (token `cor do acf sport/L-18` do design system); o gradiente do botão do card em destaque usava o gradiente padrão do site (`#ff3203 → #8f301d`), corrigido para o gradiente específico deste componente no design system (`#ff7a5c → #8f1d00`).

- **Lote de Correções (`improvements.md`)**:
  - **Notícias relacionadas / paginação**: `getRelatedNews()` (`src/data/news.ts`) agora exclui `PINNED_CAROUSEL_NEWS_ID` além da notícia atual, então o banner de patrocinadores nunca aparece em "Mais notícias sobre o ACF". `NewsDetail.tsx` pagina essa lista de 4 em 4 e só mostra a navegação de páginas quando há mais de 4 itens elegíveis.
  - **Paginação funcional de verdade**: tanto a paginação de relacionadas do `NewsDetail.tsx` quanto a do `NewsArchive.tsx` (`/noticias`) eram decorativas (números fixos, todos os links apontando pra `/noticias` com a página 1 sempre marcada como ativa). Agora ambas leem uma prop `page` (vinda do `searchParams` da rota), fatiam a lista de itens de acordo, geram links reais `?page=N`, e escondem as setas de próxima/última página ao chegar no fim. `/noticias` e `/noticias/[id]` passaram a ser rotas dinâmicas por causa disso (dependem de `searchParams`).
  - **Logo do header conectado ao `team_info`**: adicionado `src/components/SiteHeader.tsx`, um server component assíncrono que busca `getTeamInfo()` e renderiza o `MainMenu` com uma nova prop `logoSrc` (`MainMenu.tsx`, com fallback pro asset estático atual). Troquei `<MainMenu />` por `<SiteHeader />` (e o import correspondente) nas 9 páginas que renderizam o header.
  - **Faixa de patrocinadores escondida por flag**: adicionado `SPONSORS_STRIP_ENABLED = false` dentro do próprio `SponsorsStrip.tsx`, que agora retorna `null` quando desabilitado — esconde a faixa/carrossel de logos de patrocinadores em todas as páginas sem apagar nada do código. A página dedicada `/clube/patrocinadores` não é afetada.
  - **Correção de espaçamento na seção "elenco"**: `.components-roster-section-section` tinha `min-height: 1048px` fixo (também duplicado como estilo inline em `RosterSection.tsx`), deixando um vão vazio grande abaixo do botão "ver elenco completo" sempre que o conteúdo real era mais baixo que essa altura. Removido o `min-height` fixo (a regra CSS, seu override no breakpoint `768px`, e o estilo inline) para a seção se ajustar ao conteúdo; o padding inferior de `.components-roster-section-inner` ajustado para `40px` no desktop / `32px` no mobile, batendo com o token de espaçamento `lg` do design system.
  - **Correção do gradiente na seção YouTube**: `.components-youtube-section-button` ("inscreva-se no canal do youtube") usava o gradiente padrão do site (`#ff3203 → #8f301d`); corrigido para `#ff7a5c → #8f1d00`, o gradiente exato documentado pra esse botão no design system exportado do Figma (tipografia, demais cores e a sombra do card já batiam com precisão).

- **Atualização de Assets**:
  - Substituídos `public/footer/acf-footer-logo.png`, `public/footer/sovereign-footer.png` e `public/youtube-section/youtube-bull.png` por exports atualizados (sem mudanças de código).

- **Notícias: Corrigido Fuso Horário na Exibição da Data**:
  - `formatNewsDate()` (`src/data/news.ts`) formatava a data com `Intl.DateTimeFormat("pt-BR")` sem especificar `timeZone`, então o resultado dependia do fuso do ambiente de execução. Em produção (runtime em UTC), notícias criadas à noite no horário de Brasília apareciam com a data do dia seguinte (UTC), divergindo da data real armazenada no banco. Corrigido fixando `timeZone: "America/Sao_Paulo"` nas duas chamadas de formatação.

- **Página "Nossa História": Conectada à Tabela `team_history`**:
  - Adicionado `src/data/teamHistory.ts` (`getTeamHistory()`), no mesmo padrão de `teamInfo.ts`: busca a linha mais recente de `team_history` (`title`, `content`, `symbol`, `mascot`, `content_image`, `mascot_images`, `created_at`), com fallback estático apenas para `title`/`content`/`content_image` (o núcleo da página).
  - `src/app/clube/historia/page.tsx` virou um Server Component assíncrono (`export const revalidate = 60`) que busca `getTeamHistory()` e passa como prop `history` para `HistoryContent.tsx`, que deixou de ter texto/imagens hardcoded — `content`/`mascot`/`symbol` são HTML vindo do banco, renderizado via `dangerouslySetInnerHTML` (mesmo padrão de `NewsDetail.tsx`).
  - As seções "símbolos" e "mascote" agora só renderizam quando há dado correspondente no banco (`history.symbol` não vazio; `history.mascot` não vazio ou `history.mascotImages` com pelo menos um item) — sem fallback estático, para não mostrar conteúdo de exemplo quando o CMS ainda não preencheu esses campos.
  - O texto do artigo (`.components-history-content-articleText`) teve o `text-indent` removido e a tipografia ajustada para bater com o corpo de texto de notícias (`.components-news-detail-body`: `24px`/`40px`, cor `#4e4e4e`, alinhado à esquerda).

- **Página de Competições: Legenda de Classificação/Rebaixamento Removida**:
  - Removido o bloco de legenda ("Classificados para próxima fase" / "Rebaixados para a segunda divisão") abaixo da tabela de classificação em `CompetitionsContent.tsx`, a pedido do usuário.

- **Logo do Clube nos Cards de Partida Vinda do Banco**:
  - `TeamBadge` (`CompetitionsContent.tsx`) ganhou a prop `home`, aplicando um destaque visual (fundo circular escuro) apenas no brasão do time da casa. `CompetitionsContent` e `GamesPanel.tsx` agora recebem/buscam `teamInfo.symbol` (via `getTeamInfo()`) e usam esse valor como logo do ACF nos cards de "Próxima Partida"/"Partidas Anteriores"/painel "jogos", com fallback para `/header/symbol.png` quando o banco não tem o campo preenchido.

- **Jogos: Horário Separado da Data**:
  - `src/data/games.ts` passou a selecionar também a coluna `time` da tabela `games` (campo `GameItem.time`, `string | null`), separada de `date`. A ordenação por data mais recente/próxima (`gameDateTime`) agora compara strings `"YYYY-MM-DD HH:MM"` diretamente, em vez de converter para `Date`/timestamp — evita ambiguidade de fuso horário na comparação.

- **Página de Patrocinadores: Cards de Plano Redesenhados**:
  - `SponsorsPageContent.tsx` ganhou as flags `SHOW_PARTNERS`/`SHOW_ONE_OFFS` (ambas `false`) para esconder os grupos "Parceiros" e "Pontuais" sem apagar os dados.
  - `PlanCard` agora separa o preço em valor e período (`plan.price.split(" / ")`), renderizados em `<span>`s distintos (`.components-sponsors-page-content-planPriceAmount`/`...PricePeriod`), e ganhou um divisor (`.components-sponsors-page-content-planDivider`) abaixo do título. O botão do WhatsApp deixou de usar as classes utilitárias do Tailwind e passou a ter estilo próprio no `globals.css`, com o ícone posicionado absolutamente.
