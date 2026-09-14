/* Catalogo, filtros, favoritos e cards da loja*/
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

  document.getElementById("price-min-value").textContent = dinheiro(minimo);
  document.getElementById("price-max-value").textContent = dinheiro(maximo);
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
  salvarEstado();
  mostrarProdutos();
}
