// 1) Produtos disponíveis
const produtos = [
  { id:1, nome:'Linguiça (kg)', preco:30, unidade:'kg' },
  { id:2, nome:'Linguiça campeira (pacote)', preco:15, unidade:'pacote' },
  { id:3, nome:'Linguiça calabresa (mala)', preco:15, unidade:'mala' },
  { id:4, nome:'Torresmo (kg)', preco:75, unidade:'kg' },
];

// 2) Estado do carrinho (armazenado no localStorage)
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// 3) Função para atualizar badge de carrinho
function atualizarBadge() {
  document.getElementById('carrinho-count')
    .textContent = carrinho.reduce((sum,i)=>sum+i.quant,0);
}

// 4) Renderizar catálogo
function renderCatalogo() {
  const cont = document.getElementById('catalogo');
  cont.innerHTML = '';
  produtos.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${p.nome}</h2>
      <p>R$ ${p.preco.toFixed(2)} / ${p.unidade}</p>
      <button data-id="${p.id}">Adicionar</button>
    `;
    card.querySelector('button')
        .addEventListener('click', ()=>addAoCarrinho(p.id));
    cont.appendChild(card);
  });
}

// 5) Adicionar produto ao carrinho
function addAoCarrinho(prodId) {
  const item = carrinho.find(i=>i.id===prodId);
  if (item) item.quant++;
  else          carrinho.push({ id:prodId, quant:1 });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarBadge();
}

// 6) Registrar service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('service-worker.js')
      .then(()=> console.log('SW registrado'))
      .catch(err=> console.error('SW falhou', err));
  });
}

// 7) Inicialização
renderCatalogo();
atualizarBadge();
