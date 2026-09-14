/* Inicializacao e eventos da aplicacao*/
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

  document.querySelectorAll("[data-category-link]").forEach(function (link) {
    link.addEventListener("click", function () {
      var categoria = link.dataset.categoryLink;
      var categoriaExiste = produtos.some(function (produto) {
        return produto.categoria === categoria;
      });

      filtroProduto = categoriaExiste ? categoria : "todos";
      mostrarPagina("loja");
      window.location.hash = "loja";
      atualizarFiltros(
        document.querySelector('[data-product-filter="' + filtroProduto + '"]'),
        "[data-product-filter]"
      );
      mostrarProdutos();
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

  document.getElementById("share-wishlist").addEventListener("click", function () {
    var link = window.location.href.split("#")[0] + "#loja";
    var mensagem = "Confira meus favoritos na SoftBike: " + link;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(mensagem).then(function () {
        mostrarAviso("Link dos favoritos copiado.");
      });
      return;
    }

    mostrarAviso("Abra a aba Loja para ver seus favoritos.");
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
