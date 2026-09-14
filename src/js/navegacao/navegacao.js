/* Rotas por hash e menu responsivo*/
function mostrarPagina(nome) {
  var pagina = document.querySelector('[data-route="' + nome + '"]');

  if (!pagina) {
    pagina = document.querySelector('[data-route="inicio"]');
  }

  document.querySelectorAll(".page").forEach(function (item) {
    item.classList.remove("active");
  });
  pagina.classList.add("active");

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + pagina.id);
  });
}

function atualizarPagina() {
  var nome = window.location.hash.replace("#", "") || "inicio";

  if (nome.indexOf("capitulo-") === 0 || nome === "topo-guia") {
    mostrarPagina("guia");
    return;
  }

  mostrarPagina(nome);
  fecharMenu();
}

function abrirOuFecharMenu() {
  var menu = document.getElementById("mobile-nav");
  var botao = document.getElementById("menu-toggle");
  var abriu = menu.classList.toggle("open");
  botao.setAttribute("aria-expanded", abriu);
}

function fecharMenu() {
  var menu = document.getElementById("mobile-nav");
  var botao = document.getElementById("menu-toggle");
  menu.classList.remove("open");
  botao.setAttribute("aria-expanded", "false");
}
