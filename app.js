// 1) Produtos disponíveis (agora com caminho da imagem)
const produtos = [
  {
    id: 1,
    nome: 'Linguiça (kg)',
    preco: 30,
    unidade: 'kg',
    img: 'images/linguica-fresca.jpg'
  },
  {
    id: 2,
    nome: 'Linguiça campeira (pacote)',
    preco: 15,
    unidade: 'pacote',
    img: 'images/linguica-campeira.jpg'
  },
  {
    id: 3,
    nome: 'Linguiça calabresa (mala)',
    preco: 15,
    unidade: 'mala',
    img: 'images/linguica-calabresa.jpg'
  },
  {
    id: 4,
    nome: 'Torresmo (kg)',
    preco: 75,
    unidade: 'kg',
    img: 'images/torresmo.jpg'
  },
];

// 2) Estado do carrinho (armazenado no localStorage)
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// 3) Atualiza o badge do carrinho
function atualizarBadge() {
  document.getElementById('carrinho-count')
    .textContent = carrinho.reduce((sum, i) => sum + i.quant, 0);
}

// 4) Renderiza o catálogo
function renderCatalogo() {
  const cont = document.getElementById('catalogo');
  cont.innerHTML = '';

  produtos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h2>${p.nome}</h2>
      <img src="${p.img}" alt="${p.nome}" class="card-img" />
      <p>R$ ${p.preco.toFixed(2)} / ${p.unidade}</p>
      <input type="number" min="1" value="1" id="qtd-${p.id}" />
      <button data-id="${p.id}">Adicionar</button>
    `;

    // Associa o clique do botão para pegar a quantidade
    card.querySelector('button').addEventListener('click', () => {
      const qtd = parseInt(
        document.getElementById(`qtd-${p.id}`).value,
        10
      ) || 1;
      addAoCarrinho(p.id, qtd);
    });

    cont.appendChild(card);
  });
}

// 5) Adiciona ao carrinho (com quantidade variável)
function addAoCarrinho(prodId, quantidade) {
  const item = carrinho.find(i => i.id === prodId);
  if (item) {
    item.quant += quantidade;
  } else {
    carrinho.push({ id: prodId, quant: quantidade });
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarBadge();
}

// 6) Registra service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('SW registrado'))
      .catch(err => console.error('SW falhou', err));
  });
}

// 7) Inicialização
renderCatalogo();
atualizarBadge();
