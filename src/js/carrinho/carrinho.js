/* Carrinho, cupons e checkout demonstrativo*/
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
  salvarEstado();

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
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "false");
  travarTela(true);
}

function fecharCarrinho() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("drawer-overlay").classList.remove("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "true");
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
