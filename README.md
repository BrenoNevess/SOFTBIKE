# SoftBike

Projeto acadêmico de uma loja de bicicletas, peças e acessórios. O projeto apresenta uma experiência de compra responsiva, com navegação por seções, catálogo de produtos, galeria de imagens e conteúdos sobre ciclismo.

## Funcionalidades

- Página inicial com categorias, parceiros e serviços da SoftBike.
- Catálogo com busca por nome, filtros por categoria e faixa de preço.
- Favoritos e carrinho de compras em memória.
- Aplicação de cupons de demonstração: `PEDAL10`, `BIKE20` e `SOFT50`.
- Galeria com filtros e visualização ampliada das imagens.
- Menu responsivo para dispositivos móveis.
- Seções de guia, empresa, documentos, tabela e recursos.
- Imagens de produtos armazenadas em `src/produtos/`.

## Tecnologias

- HTML5
- CSS3
- JavaScript

Não há frameworks, banco de dados ou processo de build. Os dados dos produtos são estáticos e o estado do carrinho e dos favoritos é salvo no `localStorage` do navegador.

## Como executar

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` em um navegador.

Para uma experiência mais próxima de um ambiente web, também é possível abrir a pasta no VS Code e usar uma extensão de servidor local, como o Live Server.

## Estrutura do projeto

```text
SOFTBIKE/
├── index.html          # Estrutura e conteúdo das páginas
├── style.css           # Estilos e layout responsivo
├── src/
│   ├── js/
│   │   ├── app.js                  # Inicialização e eventos da interface
│   │   ├── core/estado.js          # Estado compartilhado e utilitários
│   │   ├── data/galeria.js         # Dados das imagens da galeria
│   │   ├── data/produtos.js        # Catálogo de produtos
│   │   ├── navegacao/navegacao.js  # Rotas por hash e menu responsivo
│   │   ├── loja/loja.js            # Catálogo, filtros e favoritos
│   │   ├── carrinho/carrinho.js    # Carrinho, cupons e checkout
│   │   └── galeria/galeria.js      # Filtros e lightbox
│   └── produtos/                   # Imagens dos produtos do catálogo
├── LICENSE
└── README.md
```

As oito abas (`Início`, `Loja`, `Galeria`, `Guia`, `Empresa`, `Documentos`, `Tabela` e `Recursos`) continuam no `index.html` como rotas por hash. Essa escolha mantém a navegação, o carrinho e os favoritos funcionando juntos; o JavaScript foi separado por responsabilidade para que cada aba e comportamento possa ser localizado rapidamente.

## Observações

Este é um projeto de demonstração para a disciplina de Desenvolvimento Web. O carrinho, os favoritos e os cupons não realizam compras reais. Algumas imagens da galeria e da página inicial são carregadas do Unsplash.
