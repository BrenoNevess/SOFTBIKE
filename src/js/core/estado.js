/* Estado compartilhado e utilitarios gerais*/
var chaveEstado = "softbike-estado";
var estadoSalvo = {};

try {
  estadoSalvo = JSON.parse(localStorage.getItem(chaveEstado) || "{}");
} catch (erro) {
  localStorage.removeItem(chaveEstado);
}

var carrinho = Array.isArray(estadoSalvo.carrinho) ? estadoSalvo.carrinho : [];
var favoritos = Array.isArray(estadoSalvo.favoritos) ? estadoSalvo.favoritos : [];
var filtroProduto = "todos";
var filtroGaleria = "todos";
var somenteFavoritos = false;
var cupomAtual = null;

function dinheiro(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function salvarEstado() {
  localStorage.setItem(chaveEstado, JSON.stringify({
    carrinho: carrinho,
    favoritos: favoritos
  }));
}

function mostrarAviso(texto) {
  var aviso = document.getElementById("toast");
  aviso.textContent = texto;
  aviso.classList.add("show");
  clearTimeout(mostrarAviso.timer);
  mostrarAviso.timer = setTimeout(function () {
    aviso.classList.remove("show");
  }, 2500);
}

function travarTela(estaTravada) {
  document.body.classList.toggle("no-scroll", estaTravada);
}
