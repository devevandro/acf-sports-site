# Relatório de Análise e Plano de Melhorias — ACF Sports

**Data:** 25 de Julho de 2026  
**Projeto:** `acf-site-figma` (Site Oficial ACF Sports)  
**Tecnologias Base:** Next.js 15.3 (App Router), React 19, TypeScript 5.8, Tailwind CSS v4  

---

## 1. Visão Geral do Projeto

O projeto **ACF Sports** é um portal web para o clube de futebol e futsal de Cornélio Procópio (PR). O site foi desenvolvido a partir de protótipos e exportações do Figma, contando com rotas para notícias, apresentação do elenco (campo e futsal), história do clube, competições, patrocinadores e página de contato.

---

## 2. Pontos Fortes do Código Atual

1. **Estrutura Moderna com App Router**: Utilização da estrutura do Next.js (App Router) com React 19 e TypeScript 5.
2. **Build Estático Consistente**: O comando `npm run build` executa perfeitamente, gerando 55 páginas estáticas pré-renderizadas (incluindo rotas dinâmicas como `/noticias/[slug]` e `/clube/elenco/[slug]`).
3. **Fidelidade Visual**: O design reflete com precisão a identidade do clube quadricolor (cores, tipografia, escudos e seções).
4. **Organização de Dados**: Separação clara dos dados de teste em arquivos dedicados (`src/data/news.ts` e `src/data/roster.ts`).

---

## 3. Diagnóstico e Oportunidades de Melhoria

### 🔴 3.1. Risco Crítico: Ativos Hospedados na API Externa do Figma
- **Problema:** Diversos componentes (`MainMenu.tsx`, `PlayerDetailContent.tsx`, `ContactContent.tsx`, `src/data/roster.ts`, etc.) utilizam links diretos da API do Figma (`https://www.figma.com/api/mcp/asset/...`).
- **Risco:** Essas URLs são temporárias/privadas. Quando expirarem ou perderem token de acesso, imagens de atletas, ícones do menu, fundos e marca d'água vão quebrar em produção.
- **Recomendação:** Baixar todos os ativos para o diretório local `public/` (ex: `public/images/`, `public/icons/`) ou para um provedor de mídia definitivo (Cloudinary, AWS S3, Vercel Blob).

---

### 🟠 3.2. Navegação e Performance SPA (`<a>` vs `<Link>`)
- **Problema:** O menu principal (`MainMenu.tsx`), os cards de atletas e os links das notícias utilizam tags `<a href="...">` nativas do HTML.
- **Impacto:** Provoca o recarregamento total da página (full page reload) a cada clique, descartando os benefícios de renderização do Next.js (Client-Side Navigation).
- **Recomendação:** Substituir todas as tags `<a>` de navegação interna por `import Link from 'next/link'`.

---

### 🟠 3.3. Otimização de Imagens (`<img>` vs `<Image />`)
- **Problema:** Uso generalizado da tag `<img />` padrão do navegador.
- **Impacto:** Perde-se a otimização nativa do Next.js (`next/image`), que oferece conversão automática para WebP/AVIF, dimensionamento responsivo, previne requisições desnecessárias e melhora os indicadores do Google Core Web Vitals (LCP, CLS).
- **Recomendação:** Migrar para o componente `<Image />` do `next/image`.

---

### 🟡 3.4. Inconsistência nos Cards de Atletas (`AthleteCard.tsx`)
- **Problema:** No componente `AthleteCard.tsx`, a imagem do atleta está fixada no fallback estático `<img src="/squad/player-placeholder.png" />`, ignorando a propriedade `person.image`.
- **Recomendação:** Atualizar o componente para renderizar dinamicamente a foto correspondente do atleta: `src={person.image || "/squad/player-placeholder.png"}`.

---

### 🟡 3.5. CSS Gigante e Não Modularizado (`globals.css`)
- **Problema:** O arquivo `src/app/globals.css` contém **5.156 linhas** e **102 KB**, repleto de seletores longos gerados automaticamente pelo Figma (ex: `.components-roster-player-detail-content-frameAsset`).
- **Impacto:** Dificulta a manutenção, reutilização e anula o uso das classes utilitárias do Tailwind CSS instalado no projeto.
- **Recomendação:** Reorganizar a camada de estilos, adotando CSS Modules ou migrando os componentes diretamente para utilitários do Tailwind CSS.

---

### 🟡 3.6. Responsividade e Menu Mobile
- **Problema:** O menu de navegação (`MainMenu.tsx`) não possui uma versão responsiva com botão "hambúrguer" ou gaveta mobile para telas menores (`< 768px`).
- **Recomendação:** Implementar menu mobile interativo com estado (`useState`) e acessibilidade via teclado.

---

### 🔵 3.7. SEO, Metadados e Acessibilidade
- **Problema:** 
  - `layout.tsx` possui título e descrição genéricos ("ACF Sports site generated from Figma design context").
  - Faltam metadados dinâmicos em páginas de notícias (`generateMetadata`) e atletas.
  - Faltam arquivos nativos `sitemap.ts` e `robots.ts`.
- **Recomendação:**
  - Configurar metadados Open Graph (imagem de compartilhamento no WhatsApp/Twitter).
  - Adicionar suporte a `generateMetadata` nas páginas dinâmicas.

---

### 🔵 3.8. Qualidade de Código e Ferramentas (`npm run lint`)
- **Problema:** O comando `npm run lint` falha por ausência da configuração do ESLint para Next.js 15.
- **Recomendação:** Inicializar o ESLint com `npx @next/codemod@canary next-lint-to-eslint-cli .` ou criar o arquivo de configuração `.eslintrc.json`.

---

## 4. Plano de Ação Recomendado (Checklist)

- [ ] **Etapa 1: Localização de Mídias (Urgente)**
  - Baixar assets do Figma para `public/assets/`.
  - Atualizar referências em `MainMenu.tsx`, `ContactContent.tsx`, `PlayerDetailContent.tsx` e `src/data/roster.ts`.

- [ ] **Etapa 2: Migração Next.js Best Practices**
  - Substituir `<a href>` por `<Link href>` em todos os componentes de navegação.
  - Substituir `<img src>` por `<Image src>` com `width` e `height` / `fill`.
  - Corrigir imagem dinâmica em `AthleteCard.tsx`.

- [ ] **Etapa 3: UX & Responsividade**
  - Desenvolver menu hambúrguer interativo em `MainMenu.tsx` para mobile.
  - Adicionar validação e interatividade ao formulário em `ContactContent.tsx`.

- [ ] **Etapa 4: SEO & Metadados**
  - Personalizar os metadados globais em `src/app/layout.tsx`.
  - Criar `generateMetadata()` em `src/app/noticias/[slug]/page.tsx` e `src/app/clube/elenco/[slug]/page.tsx`.
  - Adicionar `src/app/sitemap.ts` e `src/app/robots.ts`.

- [ ] **Etapa 5: Manutenibilidade de Código**
  - Configurar ESLint (`.eslintrc.json`).
  - Refatorar seletores CSS redundantes em `globals.css`.

---

*Relatório gerado automaticamente após análise detalhada da estrutura, componentes e comportamento de build do projeto.*
