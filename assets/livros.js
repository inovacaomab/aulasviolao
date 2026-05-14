// assets/livros.js
document.addEventListener("DOMContentLoaded", function () {
  const gridEl = document.getElementById("biblioteca-grid");
  const drawerEl = document.getElementById("leitor-drawer");
  const overlayEl = document.getElementById("leitor-overlay");
  const conteudoEl = document.getElementById("leitor-conteudo");
  const fecharBtn = document.getElementById("fechar-leitor");
  const drawerTituloEl = document.getElementById("drawer-titulo");

  const LS_KEY = "cv_progresso_biblioteca";

  // 1. Funções de Progresso (localStorage)
  function getProgresso() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || { ultimoLido: null, concluidos: [] };
    } catch (e) {
      return { ultimoLido: null, concluidos: [] };
    }
  }

  function setProgresso(progresso) {
    localStorage.setItem(LS_KEY, JSON.stringify(progresso));
  }

  // 2. Renderização do Grid da Biblioteca
  function renderizarBiblioteca() {
    const dados = window.bibliotecaData || [];
    const progresso = getProgresso();

    if (!gridEl) return;

    let html = "";

    // Banner de "Continuar Lendo"
    if (progresso.ultimoLido) {
      // Garantimos que não renderizamos o banner se ele já marcou o último lido como concluído?
      // Opcional: mostrar apenas se não estiver nos concluídos. Vamos mostrar sempre por conveniência de voltar a ler.
      const capConcluido = progresso.concluidos.includes(progresso.ultimoLido.arquivo);
      const label = capConcluido ? "Revise o que você leu" : "Continuar de onde parou";
      
      html += `
        <div class="bib-continue-banner btn-continuar" data-arquivo="${progresso.ultimoLido.arquivo}" data-titulo="${progresso.ultimoLido.titulo}">
          <div class="bib-continue-info">
            <small>${label}</small>
            <strong>${progresso.ultimoLido.titulo}</strong>
          </div>
          <div class="bib-continue-action">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      `;
    }

    dados.forEach((secao) => {
      html += `<div class="bib-secao">`;
      html += `<h3 class="bib-categoria">${secao.categoria}</h3>`;
      html += `<div class="bib-livros">`;
      
      secao.livros.forEach((livro) => {
        html += `
          <div class="bib-card">
            <h4>${livro.titulo}</h4>
            <ul class="bib-capitulos">
        `;
        
        livro.capitulos.forEach((cap) => {
          const isLido = progresso.concluidos.includes(cap.arquivo);
          const isUltimo = progresso.ultimoLido && progresso.ultimoLido.arquivo === cap.arquivo;
          
          let badgeHtml = "";
          if (isLido) {
            badgeHtml = `<span class="badge-status concluido">✓ Concluído</span>`;
          } else if (isUltimo) {
            badgeHtml = `<span class="badge-status lendo">📖 Lendo</span>`;
          } else {
            badgeHtml = `<span class="badge-status novo">Novo</span>`;
          }

          html += `
            <li>
              <button class="btn-capitulo" data-arquivo="${cap.arquivo}" data-titulo="${cap.titulo}">
                <div class="btn-cap-text">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                  <span>${cap.titulo}</span>
                </div>
                ${badgeHtml}
              </button>
            </li>
          `;
        });
        
        html += `</ul></div>`;
      });
      
      html += `</div></div>`;
    });
    
    gridEl.innerHTML = html;
  }

  // 3. Lógica para abrir o Drawer
  // Expomos globalmente para o banner "Continuar Lendo" poder chamar ou usar event listener
  window.abrirLeitor = function (arquivo, titulo) {
    conteudoEl.innerHTML = '<p class="muted" style="text-align:center; margin-top:40px;">Carregando conteúdo...</p>';
    if (drawerTituloEl) drawerTituloEl.textContent = titulo;
    
    // Atualiza progresso: define como último lido
    let progresso = getProgresso();
    progresso.ultimoLido = { arquivo, titulo };
    setProgresso(progresso);
    renderizarBiblioteca(); // Atualiza os badges visuais por trás
    
    drawerEl.classList.add("open");
    if(overlayEl) overlayEl.classList.add("open");
    document.body.style.overflow = "hidden";

    // Busca o arquivo
    fetch(arquivo)
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar o conteúdo.");
        return response.text();
      })
      .then(html => {
        let progressoAposFetch = getProgresso();
        const jaConcluido = progressoAposFetch.concluidos.includes(arquivo);
        
        // Injeta o botão de marcação de leitura no final
        let btnAcaoHtml = "";
        if (!jaConcluido) {
          btnAcaoHtml = `
            <div class="drawer-footer-action">
              <button id="btn-marcar-lido" class="btn primary" data-arquivo="${arquivo}">
                ✓ Marcar como Lido
              </button>
            </div>
          `;
        } else {
          btnAcaoHtml = `
            <div class="drawer-footer-action concluido-texto">
              <span style="color: #10b981; font-weight: bold; font-size: 1.1rem;">
                ✓ Capítulo Concluído
              </span>
            </div>
          `;
        }

        conteudoEl.innerHTML = html + btnAcaoHtml;

        // Anexa o evento no botão injetado
        const btnLido = document.getElementById("btn-marcar-lido");
        if (btnLido) {
          btnLido.addEventListener("click", function() {
            let p = getProgresso();
            if (!p.concluidos.includes(arquivo)) {
              p.concluidos.push(arquivo);
              setProgresso(p);
              renderizarBiblioteca();
              fecharLeitor(); // Fecha o drawer opcionalmente, dá uma sensação de "pronto, próximo!"
            }
          });
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        conteudoEl.innerHTML = `<p style="color:red; text-align:center; margin-top:40px;">Conteúdo indisponível. (${error.message})</p>`;
      });
  }

  function fecharLeitor() {
    drawerEl.classList.remove("open");
    if(overlayEl) overlayEl.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => {
        conteudoEl.innerHTML = "";
    }, 300);
  }

  // 4. Delegação de Eventos (Clicks)
  if (gridEl) {
    gridEl.addEventListener("click", function (e) {
      // Clique num capítulo
      const btnCap = e.target.closest(".btn-capitulo");
      if (btnCap) {
        const arquivo = btnCap.getAttribute("data-arquivo");
        const titulo = btnCap.getAttribute("data-titulo");
        if (arquivo) abrirLeitor(arquivo, titulo);
        return;
      }
      
      // Clique no botão Continuar Lendo
      const btnCont = e.target.closest(".btn-continuar");
      if (btnCont) {
        const arquivo = btnCont.getAttribute("data-arquivo");
        const titulo = btnCont.getAttribute("data-titulo");
        if (arquivo) abrirLeitor(arquivo, titulo);
        return;
      }
    });
  }

  if (fecharBtn) fecharBtn.addEventListener("click", fecharLeitor);
  if (overlayEl) overlayEl.addEventListener("click", fecharLeitor);
  
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && drawerEl.classList.contains("open")) {
      fecharLeitor();
    }
  });

  // Init principal
  renderizarBiblioteca();
});
