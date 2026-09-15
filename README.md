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

Não há frameworks, banco de dados ou processo de build. Os dados dos produtos e o estado do carrinho são mantidos no navegador enquanto a página está aberta.

## Como executar

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` em um navegador.

Para uma experiência mais próxima de um ambiente web, também é possível abrir a pasta no VS Code e usar uma extensão de servidor local, como o Live Server.

## Estrutura do projeto

```text
SOFTBIKE/
├── index.html          # Estrutura e conteúdo das páginas
├── style.css           # Estilos e layout responsivo
├── script.js           # Produtos, filtros e interações
├── src/
│   └── produtos/       # Imagens dos produtos do catálogo
├── LICENSE
└── README.md
```

## Observações

Este é um projeto de demonstração para a disciplina de Desenvolvimento Web. O carrinho, os favoritos e os cupons não realizam compras reais e são reiniciados quando a página é recarregada. Algumas imagens da galeria e da página inicial são carregadas do Unsplash.
