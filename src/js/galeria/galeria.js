/* Filtros, ampliacao e fechamento da galeria*/
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
  document.getElementById("lightbox").setAttribute("aria-hidden", "false");
  travarTela(true);
}

function fecharLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.getElementById("lightbox").setAttribute("aria-hidden", "true");
  travarTela(false);
}
