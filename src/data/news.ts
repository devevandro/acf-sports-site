export type NewsImage =
  | {
      type: "single";
      src: string;
      alt: string;
    }
  | {
      type: "layered";
      background: string;
      foreground: string;
      alt: string;
    }
  | {
      type: "mascot";
      src: string;
      alt: string;
    };

export type NewsItem = {
  slug: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  caption: string;
  image: NewsImage;
  body: string[];
  quote?: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "acf-sports-teste-de-fogo-meninos-de-ouro",
    category: "Jogos Abertos",
    title: "ACF Sports tem teste de fogo contra os fortes meninos de ouro",
    description: "A equipe quadricolor, tem estreia agendada para dia 05/11, já com grande clássico.",
    author: "Evandro C Ferreira",
    date: "04/11/2025 às 11:00",
    caption: "Imagem, feita por; O Guru das imagens.",
    image: {
      type: "single",
      src: "/home-news/news-01.png",
      alt: "Jogadores comemorando em campo com bandeira da ACF Sports",
    },
    body: [
      "A espera acabou! A ACF Sports fará sua aguardada estreia na competição no próximo dia 05 de novembro, e o primeiro desafio não poderia ser mais imponente: o confronto será contra a poderosa equipe dos Meninos de Ouro.",
      "O calendário reservou para a ACF um verdadeiro teste de fogo logo na rodada inaugural. Os Meninos de Ouro são amplamente reconhecidos por serem uma das forças do torneio, ostentando um histórico vitorioso, um elenco talentoso e um futebol de alto nível técnico e tático.",
      "Nos bastidores, a preparação da ACF foi minuciosa. O foco dos treinos tem sido o aprimoramento do entrosamento da equipe e a elaboração de uma estratégia sólida, capaz de neutralizar os principais pontos fortes dos Meninos de Ouro.",
      "O confronto tem todos os ingredientes para ser um dos melhores da rodada: de um lado, a tradição e o poder de fogo dos Meninos de Ouro; do outro, a ambição, a determinação e a vontade da ACF em iniciar sua campanha com o pé direito.",
      "Acompanhe nosso site e nossas redes sociais, além é claro da ACF TV para a cobertura completa do pós e pré jogo!",
    ],
    quote:
      "Sabemos da qualidade do nosso adversário, mas esta estreia é a chance perfeita para mostrarmos a que viemos. Respeito sim, mas medo jamais. Vamos lutar por cada bola e fazer um grande jogo.",
  },
  {
    slug: "acf-sports-empata-estreia-segunda-divisao",
    category: "Jogos Abertos Futsal",
    title: "ACF Sports empata na estreia da segunda divisão, no amador de Cornélio Procópio.",
    description: "A equipe quadricolor, vira partida mas sofre empate.",
    author: "Evandro C Ferreira",
    date: "05/10/2025 às 16:00",
    caption: "Registro dos atletas da ACF Sports.",
    image: {
      type: "layered",
      background: "/home-news/news-02.png",
      foreground: "/home-news/news-02.png",
      alt: "Atletas da ACF Sports em uniforme azul",
    },
    body: [
      "A estreia da ACF Sports na segunda divisão terminou empatada após uma partida intensa e disputada até os minutos finais.",
      "Mesmo depois de virar o placar, a equipe acabou cedendo o empate e saiu de campo com pontos importantes para ajustar a sequência da competição.",
    ],
  },
  {
    slug: "torcida-acf-sports-cobra-postura-atletas",
    category: "Jogos Abertos Futsal",
    title: "Torcida do ACF Sports cobra postura dos atletas dentro de campo.",
    description: "A equipe quadricolor, tem estreia agendada para dia 05/11, já com grande clássico.",
    author: "Evandro C Ferreira",
    date: "05/10/2025 às 16:00",
    caption: "Torcida acompanhando a partida.",
    image: {
      type: "single",
      src: "/home-news/news-03.png",
      alt: "Torcida em arquibancada",
    },
    body: [
      "A torcida da ACF Sports pediu mais intensidade, comprometimento e postura competitiva para os próximos jogos da temporada.",
      "O elenco reconhece a cobrança e trabalha para transformar o apoio das arquibancadas em energia dentro de campo.",
    ],
  },
  {
    slug: "mascote-acf-sports-referencia-futebol-amador",
    category: "Jogos Abertos Futsal",
    title: "Mascote do ACF Sports é referencia no futebol amador.",
    description: "A equipe quadricolor, se destaca com mascote de touro negro.",
    author: "Evandro C Ferreira",
    date: "05/10/2025 às 16:00",
    caption: "Mascote oficial da ACF Sports.",
    image: {
      type: "mascot",
      src: "/home-news/news-04.png",
      alt: "Mascote touro da ACF Sports",
    },
    body: [
      "O mascote da ACF Sports vem se tornando uma referência visual dentro do futebol amador da cidade e região.",
      "A figura do touro reforça força, identidade e presença, características que o clube busca levar para dentro de campo.",
    ],
  },
  {
    slug: "acf-sports-rifa-beneficente-asilo-cornelio-procopio",
    category: "Jogos Abertos Futsal",
    title: "ACF Sports pretende fazer rifa beneficente para o asilo de Cornélio Procópio.",
    description: "A equipe quadricolor, ve com bons olhos criar campanha em prol do asilo de Cornélio Procópio.",
    author: "Evandro C Ferreira",
    date: "05/10/2025 às 16:00",
    caption: "Campanha beneficente da ACF Sports.",
    image: {
      type: "single",
      src: "/home-news/news-05.png",
      alt: "Bandeira com identidade da ACF Sports",
    },
    body: [
      "A ACF Sports estuda realizar uma rifa beneficente em apoio ao asilo de Cornélio Procópio.",
      "A iniciativa busca aproximar clube, torcedores e comunidade em uma ação solidária com impacto local.",
    ],
  },
];

export function getNewsBySlug(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}

export function getRelatedNews(slug: string) {
  return newsItems.filter((item) => item.slug !== slug);
}
