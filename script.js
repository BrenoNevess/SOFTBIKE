/*DADOS DO SITE*/
var produtos = [
  {
    id: 1,
    nome: "Bicicleta Urbana Soft Urban One",
    categoria: "bike-urbana",
    tipo: "Bicicleta urbana",
    preco: 3490,
    imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    nome: "Mountain Bike Trail Explorer",
    categoria: "bike-mtb",
    tipo: "Mountain bike",
    preco: 5290,
    imagem: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    nome: "Bicicleta Elétrica City Move",
    categoria: "bike-eletrica",
    tipo: "Bicicleta elétrica",
    preco: 7917,
    imagem: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    nome: "Capacete Flow",
    categoria: "acessorio",
    tipo: "Acessório",
    preco: 429,
    imagem: "https://images.unsplash.com/photo-1557687790-902ede7ab58c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    nome: "Kit de luzes SoftBike",
    categoria: "acessorio",
    tipo: "Acessório",
    preco: 199,
    imagem: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    nome: "Pneu Terra 29",
    categoria: "peca",
    tipo: "Peça",
    preco: 319,
    imagem: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=900&q=80"
  }
];

var fotos = [
  ["Manhã pela ciclovia", "urbano", "https://images.unsplash.com/photo-1485965120184-e220f721d03e"],
  ["Estilo urbano", "urbano", "https://images.unsplash.com/photo-1502744688674-c619d1586c9e"],
  ["Pausa após o pedal", "urbano", "https://images.unsplash.com/photo-1529422643029-d4585747aaf2"],
  ["Speed no asfalto", "urbano", "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7"],
  ["Descida técnica", "trilha", "https://images.unsplash.com/photo-1541625602330-2277a4c46182"],
  ["Trilha na floresta", "trilha", "https://images.unsplash.com/photo-1571188654248-7a89213915f7"],
  ["E-bike urbana", "trilha", "https://images.unsplash.com/photo-1571068316344-75bc76f77890"],
  ["Corrente lubrificada", "detalhes", "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8"],
  ["Pneu aderente", "detalhes", "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0"]
];

var carrinho = [];
var favoritos = [];
var filtroProduto = "todos";
var filtroGaleria = "todos";
var somenteFavoritos = false;
var cupomAtual = null;

/*FUNCOES GERAIS*/
function dinheiro(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
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

/*3. NAVEGACAO ENTRE PAGINAS*/
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

/* ==========================================================
   4. MENU MOBILE
   ========================================================== */
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

/* ==========================================================
   5. LOJA E FILTROS
   ========================================================== */
function criarProduto(produto) {
  var favorito = favoritos.indexOf(produto.id) !== -1;
  var card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML =
    '<div class="product-image">' +
      '<img src="' + produto.imagem + '" alt="' + produto.nome + '" loading="lazy">' +
      '<span class="product-badge">' + produto.tipo + '</span>' +
      '<button class="product-fav ' + (favorito ? "active" : "") + '" type="button" data-favorito="' + produto.id + '" aria-label="Favoritar produto">♡</button>' +
    '</div>' +
    '<div class="product-content">' +
      '<div class="product-meta"><span>' + produto.tipo + '</span><span>★ 4,9</span></div>' +
      '<h3>' + produto.nome + '</h3>' +
      '<p>Escolha assistida e montagem especializada SoftBike.</p>' +
      '<div class="product-bottom">' +
        '<div class="product-price"><small>a partir de</small><strong>' + dinheiro(produto.preco) + '</strong></div>' +
        '<button class="add-cart" type="button" data-produto="' + produto.id + '">Adicionar</button>' +
      '</div>' +
    '</div>';
  return card;
}

function mostrarProdutos() {
  var busca = document.getElementById("product-search").value.toLowerCase();
  var minimo = Number(document.getElementById("price-min").value);
  var maximo = Number(document.getElementById("price-max").value);
  var grade = document.getElementById("product-grid");

  grade.innerHTML = "";

  produtos.forEach(function (produto) {
    var correspondeCategoria = filtroProduto === "todos" || produto.categoria === filtroProduto;
    var correspondeBusca = produto.nome.toLowerCase().indexOf(busca) !== -1;
    var correspondePreco = produto.preco >= minimo && produto.preco <= maximo;
    var correspondeFavorito = !somenteFavoritos || favoritos.indexOf(produto.id) !== -1;

    if (correspondeCategoria && correspondeBusca && correspondePreco && correspondeFavorito) {
      grade.appendChild(criarProduto(produto));
    }
  });

  if (!grade.children.length) {
    grade.innerHTML = '<p class="empty-state">Nenhum produto encontrado.</p>';
  }
}

function atualizarFiltros(botao, grupo) {
  document.querySelectorAll(grupo).forEach(function (item) {
    item.classList.remove("active");
  });
  botao.classList.add("active");
}

function alternarFavorito(id) {
  var posicao = favoritos.indexOf(id);

  if (posicao === -1) {
    favoritos.push(id);
    mostrarAviso("Produto adicionado aos favoritos.");
  } else {
    favoritos.splice(posicao, 1);
    mostrarAviso("Produto removido dos favoritos.");
  }

  document.getElementById("wishlist-count").textContent = favoritos.length;
  mostrarProdutos();
}

/*CARRINHO E CUPONS*/
function atualizarCarrinho() {
  var area = document.getElementById("cart-items");
  var totalProdutos = 0;
  var subtotal = 0;

  area.innerHTML = "";

  carrinho.forEach(function (item) {
    var produto = produtos.find(function (itemDaLista) {
      return itemDaLista.id === item.id;
    });

    if (!produto) {
      return;
    }

    totalProdutos += item.quantidade;
    subtotal += produto.preco * item.quantidade;
    area.innerHTML +=
      '<div class="cart-item">' +
        '<img src="' + produto.imagem + '" alt="">' +
        '<div><strong>' + produto.nome + '</strong><small>' + dinheiro(produto.preco) + ' x ' + item.quantidade + '</small></div>' +
        '<button class="remove-item" type="button" data-remover="' + produto.id + '" aria-label="Remover produto">×</button>' +
      '</div>';
  });

  if (!carrinho.length) {
    area.innerHTML = '<div class="cart-empty">Seu carrinho está vazio.</div>';
  }

  var desconto = 0;
  if (cupomAtual === "PEDAL10") desconto = subtotal * 0.10;
  if (cupomAtual === "BIKE20") desconto = subtotal * 0.20;
  if (cupomAtual === "SOFT50") desconto = Math.min(50, subtotal);

  document.getElementById("cart-count").textContent = totalProdutos;
  document.getElementById("cart-subtotal").textContent = dinheiro(subtotal);
  document.getElementById("cart-total").textContent = dinheiro(subtotal - desconto);
  document.getElementById("cart-discount-line").style.display = desconto ? "flex" : "none";
  document.getElementById("cart-discount").textContent = "- " + dinheiro(desconto);

  if (cupomAtual) {
    document.getElementById("coupon-applied-line").innerHTML = "Cupom aplicado: " + cupomAtual;
  } else {
    document.getElementById("coupon-applied-line").innerHTML = "";
  }
}

function adicionarAoCarrinho(id) {
  var item = carrinho.find(function (produto) {
    return produto.id === id;
  });

  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ id: id, quantidade: 1 });
  }

  atualizarCarrinho();
  mostrarAviso("Produto adicionado ao carrinho.");
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(function (item) {
    return item.id !== id;
  });
  atualizarCarrinho();
}

function abrirCarrinho() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("drawer-overlay").classList.add("open");
  travarTela(true);
}

function fecharCarrinho() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("drawer-overlay").classList.remove("open");
  travarTela(false);
}

function aplicarCupom() {
  var codigo = document.getElementById("coupon-input").value.toUpperCase().trim();
  var cuponsValidos = ["PEDAL10", "BIKE20", "SOFT50"];

  if (cuponsValidos.indexOf(codigo) === -1) {
    mostrarAviso("Cupom inválido.");
    return;
  }

  cupomAtual = codigo;
  atualizarCarrinho();
  mostrarAviso("Cupom aplicado.");
}

/*GALERIA E LIGHTBOX*/
function mostrarGaleria() {
  var grade = document.getElementById("gallery-grid");
  grade.innerHTML = "";

  fotos.forEach(function (foto, indice) {
    if (filtroGaleria !== "todos" && foto[1] !== filtroGaleria) {
      return;
    }

    grade.innerHTML +=
      '<figure class="gallery-item" data-foto="' + indice + '" tabindex="0">' +
        '<img src="' + foto[2] + '?auto=format&fit=crop&w=1000&q=80" alt="' + foto[0] + '" loading="lazy">' +
        '<figcaption>' + foto[0] + '</figcaption>' +
      '</figure>';
  });
}

function abrirLightbox(indice) {
  var foto = fotos[indice];
  document.getElementById("lightbox-image").src = foto[2] + "?auto=format&fit=crop&w=1200&q=85";
  document.getElementById("lightbox-image").alt = foto[0];
  document.getElementById("lightbox-caption").textContent = foto[0];
  document.getElementById("lightbox").classList.add("open");
  travarTela(true);
}

function fecharLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  travarTela(false);
}

/*EVENTOS DA PAGINA*/
document.addEventListener("DOMContentLoaded", function () {
  atualizarPagina();
  mostrarProdutos();
  mostrarGaleria();
  atualizarCarrinho();

  document.getElementById("menu-toggle").addEventListener("click", abrirOuFecharMenu);
  document.getElementById("open-cart").addEventListener("click", abrirCarrinho);
  document.getElementById("close-cart").addEventListener("click", fecharCarrinho);
  document.getElementById("drawer-overlay").addEventListener("click", fecharCarrinho);
  document.getElementById("lightbox-close").addEventListener("click", fecharLightbox);
  document.getElementById("apply-coupon").addEventListener("click", aplicarCupom);
  document.getElementById("product-search").addEventListener("input", mostrarProdutos);

  document.querySelectorAll("[data-product-filter]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      filtroProduto = botao.dataset.productFilter;
      atualizarFiltros(botao, "[data-product-filter]");
      mostrarProdutos();
    });
  });

  document.querySelectorAll("[data-gallery-filter]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      filtroGaleria = botao.dataset.galleryFilter;
      atualizarFiltros(botao, "[data-gallery-filter]");
      mostrarGaleria();
    });
  });

  document.getElementById("price-min").addEventListener("input", mostrarProdutos);
  document.getElementById("price-max").addEventListener("input", mostrarProdutos);
  document.getElementById("price-reset").addEventListener("click", function () {
    document.getElementById("price-min").value = 0;
    document.getElementById("price-max").value = 14000;
    mostrarProdutos();
  });

  document.getElementById("product-grid").addEventListener("click", function (evento) {
    var botaoFavorito = evento.target.closest("[data-favorito]");
    var botaoCarrinho = evento.target.closest("[data-produto]");

    if (botaoFavorito) alternarFavorito(Number(botaoFavorito.dataset.favorito));
    if (botaoCarrinho) adicionarAoCarrinho(Number(botaoCarrinho.dataset.produto));
  });

  document.getElementById("cart-items").addEventListener("click", function (evento) {
    var botaoRemover = evento.target.closest("[data-remover]");
    if (botaoRemover) removerDoCarrinho(Number(botaoRemover.dataset.remover));
  });

  document.getElementById("gallery-grid").addEventListener("click", function (evento) {
    var item = evento.target.closest("[data-foto]");
    if (item) abrirLightbox(Number(item.dataset.foto));
  });

  document.getElementById("open-wishlist").addEventListener("click", function () {
    somenteFavoritos = !somenteFavoritos;
    mostrarPagina("loja");
    window.location.hash = "loja";
    mostrarProdutos();
  });

  document.getElementById("checkout-button").addEventListener("click", function () {
    if (!carrinho.length) {
      mostrarAviso("Adicione um produto primeiro.");
      return;
    }
    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
    mostrarAviso("Pedido registrado! (simulação acadêmica)");
  });
});

window.addEventListener("hashchange", atualizarPagina);
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    fecharCarrinho();
    fecharLightbox();
    fecharMenu();
  }
});
