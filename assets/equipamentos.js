// assets/equipamentos.js
(function () {
  const container = document.getElementById("lista-produtos");
  if (!container) return;

  if (typeof catalogo === "undefined" || !Array.isArray(catalogo)) {
    container.innerHTML =
      `<p class="muted">Catálogo não encontrado. Verifique se assets/produtos-data.js foi carregado antes.</p>`;
    return;
  }

  const html = catalogo
    .map(secao => {
      const itens = Array.isArray(secao.itens) ? secao.itens : [];
      if (!itens.length) return "";

      return `
        <section class="equip-section">
          <h3 class="equip-title">${escHtml(secao.categoria)}</h3>
          <div class="produtos-grid">
            ${itens.map(p => cardProduto(p)).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  container.innerHTML = html || `<p class="muted">Nenhum produto cadastrado.</p>`;

  function cardProduto(p) {
    const nome = escHtml(p.nome || "Produto");
    const desc = escHtml(p.descricao || "");
    const img = escAttr(p.imagem || "");
    const link = escAttr(p.linkAfiliado || "#");

    return `
      <article class="produto-card">
        <img src="${img}" alt="${nome}" loading="lazy">
        <h4>${nome}</h4>
        ${desc ? `<p class="muted">${desc}</p>` : ""}
        <a class="btn-produto"
           href="${link}"
           target="_blank"
           rel="noopener sponsored"
           onclick="if(typeof gtag==='function'){gtag('event','click_produto',{event_category:'afiliado',event_label:'${escJs(p.nome || "")}'});}">
           Ver no Mercado Livre
        </a>
      </article>
    `;
  }

  function escHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }

  function escAttr(s) {
    // para atributos HTML (src/href)
    return String(s ?? "").replace(/"/g, "&quot;");
  }

  function escJs(s) {
    return String(s ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  }
})();