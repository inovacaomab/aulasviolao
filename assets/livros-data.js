// assets/livros-data.js
// Este arquivo funciona como o sumário da Biblioteca de Estudos.

const bibliotecaData = [
  {
    categoria: "Técnica: Mão Direita",
    livros: [
      {
        titulo: "Dedilhado Essencial",
        capitulos: [
          { titulo: "1. Preparação para o Estudo", arquivo: "livros/mao-direita/01-preparacao-para-o-estudo.html" },
          { titulo: "2. Introdução à Mão Direita", arquivo: "livros/mao-direita/01-introducao.html" },
          // Adicione novos capítulos aqui
          // { titulo: "3. Padrões Básicos", arquivo: "livros/mao-direita/02-padroes.html" }
        ]
      }
    ]
  },
  {
    categoria: "Escalas",
    livros: [
      {
        titulo: "Fundamentos das Escalas",
        capitulos: [
          { titulo: "1. A Escala Maior Natural", arquivo: "livros/escalas/01-escala-maior.html" },
        ]
      }
    ]
  }
];

// Export seguro para uso no navegador
if (typeof window !== "undefined") {
  window.bibliotecaData = bibliotecaData;
}
