// assets/novidades-data.js
// Atualize só este arquivo para publicar novidades.

const novidades = [
  {
    titulo: "🎸 Em breve — Formação Cordas e Vida",
    resumo: `Estamos desenvolvendo uma formação completa de violão baseada em um caminho progressivo de estudo, onde técnica e musicalidade caminham juntas desde o início.

O curso será construído a partir de <b>100 exercícios cuidadosamente organizados</b>, divididos em pequenas jornadas sonoras. Cada jornada apresenta um conjunto simples de acordes e uma identidade musical própria, permitindo ao aluno desenvolver técnica nas mãos direita e esquerda enquanto constrói uma memória sonora natural no instrumento.

A proposta não é apenas aprender acordes ou repetir músicas, mas <b>formar uma base sólida</b>, desenvolver consciência musical e construir uma identidade no violão.

Cada etapa foi pensada para gerar pequenas conquistas e permitir que o aluno perceba sua evolução de forma clara e motivadora.

Em breve compartilharemos mais detalhes sobre essa formação.

Se você deseja acompanhar esse desenvolvimento desde o início, continue acompanhando as novidades aqui no site. `,
    url: "contato.html",
    data: "2026-03-01",
    destaque: true
  },
  {
    titulo: "Aula: Dedilhado básico para violão (comece aqui)",
    resumo: "Uma sequência simples para criar firmeza na mão direita e começar com musicalidade.",
    url: "aulas.html#dedilhado-basico",
    data: "2026-02-24",
    destaque: true
  },
  {
    titulo: "Equipamentos indicados: cordas e acessórios essenciais",
    resumo: "Minha seleção com custo/benefício para estudo e uso na igreja.",
    url: "equipamentos.html",
    data: "2026-02-23",
    destaque: true
  },
  {
    titulo: "Novo vídeo no YouTube: Progressão com identidade sonora",
    resumo: "Um estudo prático para treinar mão direita e sensação musical.",
    url: "https://www.youtube.com/@moacirbaia",
    data: "2026-02-20",
    destaque: true      // true aparece na index - false nao aparece
  }
];

// Export seguro (browser)
if (typeof window !== "undefined") {
  window.novidades = novidades;
}