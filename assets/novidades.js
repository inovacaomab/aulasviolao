// assets/novidades.js
(function () {
  const listaEl = document.getElementById("novidades-lista");
  const topEl = document.getElementById("novidades-top");

  const dados = (window.novidades || []).slice();

  // ordena por data desc (mais recente primeiro)
  dados.sort((a, b) => (b.data || "").localeCompare(a.data || ""));

  // TOP 5: primeiro tenta por destaque; se não tiver, pega recentes
  const destaques = dados.filter(n => n.destaque);
  const top5 = (destaques.length ? destaques : dados).slice(0, 5);

  if (topEl) topEl.innerHTML = top5.map(card).join("");
  if (listaEl) listaEl.innerHTML = dados.map(itemLista).join("");

  function card(n) {
    return `
      <a class="nov-card" href="${escAttr(n.url)}" ${isExterno(n.url) ? 'target="_blank" rel="noopener"' : ""}>
        <div class="nov-card-title">${escHtml(n.titulo)}</div>
        <div class="nov-card-text muted">${escHtml(n.resumo || "")}</div>
        <div class="nov-card-date muted">${formatarData(n.data)}</div>
      </a>
    `;
  }

  function itemLista(n) {
    return `
      <article class="nov-item">
        <h3><a href="${escAttr(n.url)}" ${isExterno(n.url) ? 'target="_blank" rel="noopener"' : ""}>${escHtml(n.titulo)}</a></h3>
        ${n.resumo ? `<p class="muted">${escHtml(n.resumo)}</p>` : ""}
        <small class="muted">${formatarData(n.data)}</small>
      </article>
    `;
  }

  function formatarData(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return iso;
    return `${String(d).padStart(2,"0")}/${String(m).padStart(2,"0")}/${y}`;
    }

  function isExterno(url) {
    return /^https?:\/\//i.test(url || "");
  }

  function escHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m]));
  }

  function escAttr(s) {
    return String(s ?? "").replace(/"/g, "&quot;");
  }
})();