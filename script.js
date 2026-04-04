/* ============================================
   TupãSoft — JavaScript
   Marketplace de Software | Amazonas, Brasil
   ============================================ */

'use strict';

// ===== DATA =====

const CATEGORIES = [
  { id: 'todos',        label: 'Todos',             icon: '🌐', count: 12 },
  { id: 'supermercado', label: 'Supermercado',       icon: '🛒', count: 2  },
  { id: 'calculadoras', label: 'Calculadoras',       icon: '🧮', count: 2  },
  { id: 'estoque',      label: 'Estoque',            icon: '📦', count: 2  },
  { id: 'financeiro',   label: 'Financeiro',         icon: '💰', count: 2  },
  { id: 'rh',           label: 'RH e Folha',         icon: '👥', count: 2  },
  { id: 'restaurante',  label: 'Restaurante / PDV',  icon: '🍽️', count: 2  },
];

const PRODUCTS = [
  // --- SUPERMERCADO ---
  {
    id: 1,
    name: 'SuperMarket Total',
    category: 'supermercado',
    categoryLabel: 'Supermercado',
    price: 799,
    priceModel: 'mês',
    rating: 4.9,
    reviews: 213,
    badge: 'Mais Vendido',
    badgeType: 'badge-hot',
    description: 'Sistema completo de gestão para supermercados e mercadinhos. Caixa, NF-e, estoque e relatórios integrados.',
    features: ['Frente de Caixa (PDV)', 'Emissão NF-e / NFC-e', 'Controle de Estoque', 'Relatórios gerenciais'],
    icon: '🛒',
  },
  {
    id: 2,
    name: 'MercaFácil Lite',
    category: 'supermercado',
    categoryLabel: 'Supermercado',
    price: 399,
    priceModel: 'mês',
    rating: 4.6,
    reviews: 98,
    badge: 'Econômico',
    badgeType: 'badge-primary',
    description: 'Versão enxuta para pequenos mercados e mercearias. Fácil de usar, sem precisar de técnico.',
    features: ['PDV simplificado', 'Controle de caixa', 'Cadastro de produtos', 'Suporte via WhatsApp'],
    icon: '🏪',
  },

  // --- CALCULADORAS ---
  {
    id: 3,
    name: 'CalcPro Fiscal',
    category: 'calculadoras',
    categoryLabel: 'Calculadoras',
    price: 297,
    priceModel: 'licença',
    rating: 4.8,
    reviews: 142,
    badge: 'Popular',
    badgeType: 'badge-accent',
    description: 'Calculadora fiscal completa com cálculo de ICMS, PIS/COFINS, ISS e geração de relatórios para o SPED.',
    features: ['ICMS, PIS, COFINS, ISS', 'Geração SPED Fiscal', 'Exportação em PDF/Excel', 'Atualizações tributárias'],
    icon: '🧮',
  },
  {
    id: 4,
    name: 'SimulaPrecio',
    category: 'calculadoras',
    categoryLabel: 'Calculadoras',
    price: 149,
    priceModel: 'licença',
    rating: 4.5,
    reviews: 76,
    badge: 'Novo',
    badgeType: 'badge-new',
    description: 'Simulador de precificação inteligente. Calcule margem de lucro, markup e preço de venda ideal.',
    features: ['Markup automático', 'Simulação de cenários', 'Relatório de margem', 'Interface simples'],
    icon: '📊',
  },

  // --- ESTOQUE ---
  {
    id: 5,
    name: 'GestorEstoque Pro',
    category: 'estoque',
    categoryLabel: 'Controle de Estoque',
    price: 497,
    priceModel: 'mês',
    rating: 4.7,
    reviews: 187,
    badge: 'Recomendado',
    badgeType: 'badge-primary',
    description: 'Gestão completa de estoque com alertas de reposição, lote, validade e integração com fornecedores.',
    features: ['Alertas de reposição', 'Controle de validade/lote', 'Múltiplos depósitos', 'Integração com NF-e'],
    icon: '📦',
  },
  {
    id: 6,
    name: 'InventárioFast',
    category: 'estoque',
    categoryLabel: 'Controle de Estoque',
    price: 249,
    priceModel: 'mês',
    rating: 4.4,
    reviews: 63,
    badge: 'Básico',
    badgeType: 'badge-primary',
    description: 'Controle de estoque para pequenas empresas. Entradas, saídas, saldo e histórico completo.',
    features: ['Entradas e saídas', 'Saldo em tempo real', 'Histórico de movimentos', 'App mobile incluso'],
    icon: '🗂️',
  },

  // --- FINANCEIRO ---
  {
    id: 7,
    name: 'FinançasAZ',
    category: 'financeiro',
    categoryLabel: 'Financeiro',
    price: 589,
    priceModel: 'mês',
    rating: 4.9,
    reviews: 224,
    badge: 'Mais Vendido',
    badgeType: 'badge-hot',
    description: 'Sistema financeiro completo: contas a pagar e receber, fluxo de caixa, DRE e conciliação bancária.',
    features: ['Contas a pagar/receber', 'Fluxo de caixa', 'DRE automático', 'Conciliação bancária'],
    icon: '💰',
  },
  {
    id: 8,
    name: 'ContaFácil',
    category: 'financeiro',
    categoryLabel: 'Financeiro',
    price: 199,
    priceModel: 'mês',
    rating: 4.3,
    reviews: 51,
    badge: 'Novo',
    badgeType: 'badge-new',
    description: 'Controle financeiro simplificado para MEI e pequenas empresas. Sem complicação.',
    features: ['Lançamentos simples', 'Resumo mensal', 'Exportação Excel', 'Acesso multi-usuário'],
    icon: '💳',
  },

  // --- RH ---
  {
    id: 9,
    name: 'FolhaCerta AM',
    category: 'rh',
    categoryLabel: 'RH e Folha de Pagamento',
    price: 699,
    priceModel: 'mês',
    rating: 4.8,
    reviews: 160,
    badge: 'Recomendado',
    badgeType: 'badge-primary',
    description: 'Sistema de folha de pagamento 100% conforme a legislação brasileira. FGTS, INSS, IRRF e eSocial integrados.',
    features: ['Cálculo automático FGTS/INSS', 'Integração eSocial', 'Controle de férias/rescisões', 'Holerite digital'],
    icon: '👥',
  },
  {
    id: 10,
    name: 'PontoClick',
    category: 'rh',
    categoryLabel: 'RH e Folha de Pagamento',
    price: 299,
    priceModel: 'mês',
    rating: 4.5,
    reviews: 88,
    badge: 'Popular',
    badgeType: 'badge-accent',
    description: 'Controle de ponto eletrônico via app ou web. Banco de horas, absenteísmo e relatórios de jornada.',
    features: ['Ponto via app ou web', 'Banco de horas automático', 'Relatório de absenteísmo', 'Integração com folha'],
    icon: '⏰',
  },

  // --- RESTAURANTE ---
  {
    id: 11,
    name: 'PDV Restaurante Prime',
    category: 'restaurante',
    categoryLabel: 'Restaurante / PDV',
    price: 549,
    priceModel: 'mês',
    rating: 4.9,
    reviews: 176,
    badge: 'Mais Vendido',
    badgeType: 'badge-hot',
    description: 'Solução completa para restaurantes: comanda digital, mesa, delivery, cozinha e relatório de vendas.',
    features: ['Comanda digital', 'Gestão de mesas', 'Integração iFood', 'Impressora de cozinha'],
    icon: '🍽️',
  },
  {
    id: 12,
    name: 'LancheFast PDV',
    category: 'restaurante',
    categoryLabel: 'Restaurante / PDV',
    price: 249,
    priceModel: 'mês',
    rating: 4.4,
    reviews: 59,
    badge: 'Econômico',
    badgeType: 'badge-primary',
    description: 'PDV para lanchonetes, hamburguerias e food trucks. Rápido, simples e funciona offline.',
    features: ['PDV offline', 'Cardápio digital', 'Controle de caixa', 'NFC-e integrado'],
    icon: '🍔',
  },
];

// ===== STATE =====

const state = {
  cart: [],
  activeCategory: 'todos',
  searchQuery: '',
  sortBy: 'relevance',
  priceMax: 0,
};

// ===== UTILS =====

const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function formatPrice(value) {
  return fmt.format(value);
}

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function stars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function highlightText(text, query) {
  if (!query) return text;
  const nq = normalize(query);
  const nt = normalize(text);
  const idx = nt.indexOf(nq);
  if (idx === -1) return text;
  return (
    text.slice(0, idx) +
    '<mark>' + text.slice(idx, idx + nq.length) + '</mark>' +
    text.slice(idx + nq.length)
  );
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

// ===== CART =====

function saveCart() {
  try {
    localStorage.setItem('tupasoftCart', JSON.stringify(state.cart));
  } catch (e) { /* localStorage may be unavailable */ }
}

function loadCart() {
  try {
    const saved = localStorage.getItem('tupasoftCart');
    if (saved) state.cart = JSON.parse(saved);
  } catch (e) {
    state.cart = [];
  }
}

function addToCart(id, event) {
  if (event) event.stopPropagation();
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = state.cart.find(item => item.product.id === id);
  if (existing) {
    showToast(`"${product.name}" já está no carrinho!`, 'error');
    return;
  }

  state.cart.push({ product, quantity: 1 });
  saveCart();
  updateCartBadge();
  showToast(`${product.icon} "${product.name}" adicionado ao carrinho!`);
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.product.id !== id);
  saveCart();
  updateCartBadge();
  renderCartModal();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = state.cart.length;
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

function renderCartModal() {
  const body   = document.getElementById('cart-modal-body');
  const footer = document.getElementById('cart-modal-footer');

  if (state.cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Seu carrinho está vazio.</p>
        <a href="#products" class="btn btn-primary btn-sm" onclick="closeModal('cart-modal')" style="margin-top:1rem;display:inline-flex">Ver softwares</a>
      </div>`;
    footer.innerHTML = '';
    return;
  }

  let total = 0;
  const items = state.cart.map(({ product }) => {
    total += product.price;
    return `
      <div class="cart-item">
        <span class="cart-item-icon">${product.icon}</span>
        <div class="cart-item-info">
          <strong>${product.name}</strong>
          <span>${product.categoryLabel} · ${product.priceModel}</span>
        </div>
        <span class="cart-item-price">${formatPrice(product.price)}</span>
        <button class="cart-item-remove" onclick="removeFromCart(${product.id})" aria-label="Remover ${product.name}">🗑️</button>
      </div>`;
  });

  body.innerHTML = `
    ${items.join('')}
    <div class="cart-total">
      <span>Total</span>
      <span>${formatPrice(total)}</span>
    </div>`;

  footer.innerHTML = `
    <button class="btn btn-ghost btn-sm" onclick="closeModal('cart-modal')">Continuar comprando</button>
    <button class="btn btn-whatsapp btn-sm" onclick="checkoutWhatsApp()">💬 Fechar via WhatsApp</button>`;
}

function checkoutWhatsApp() {
  if (state.cart.length === 0) return;
  const list = state.cart.map(({ product }) =>
    `• ${product.name} — ${formatPrice(product.price)}/${product.priceModel}`
  ).join('\n');
  const total = state.cart.reduce((sum, { product }) => sum + product.price, 0);
  const msg = encodeURIComponent(
    `Olá, TupãSoft! Gostaria de adquirir:\n\n${list}\n\nTotal: ${formatPrice(total)}\n\nAguardo contato!`
  );
  window.open(`https://wa.me/5592999990000?text=${msg}`, '_blank');
  closeModal('cart-modal');
}

// ===== MODALS =====

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on backdrop click
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal(backdrop.id);
  });
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
  }
});

// ===== CART MODAL =====

document.getElementById('cart-btn').addEventListener('click', () => {
  renderCartModal();
  openModal('cart-modal');
});

// ===== PRODUCT DETAIL MODAL =====

function openProductModal(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const featuresHtml = product.features.map(f =>
    `<li>${f}</li>`
  ).join('');

  document.getElementById('product-modal-content').innerHTML = `
    <div class="pmodal-header-bg">
      <div class="pmodal-icon">${product.icon}</div>
      <span class="badge ${product.badgeType}">${product.badge}</span>
      <h2 id="pmodal-title" style="margin-top:0.6rem">${product.name}</h2>
      <div style="color:var(--color-text-muted);font-size:0.88rem">${product.categoryLabel}</div>
      <div class="card-rating" style="justify-content:center;margin-top:0.6rem">
        <span class="stars">${stars(product.rating)}</span>
        <span style="color:var(--color-text-muted)">${product.rating} (${product.reviews} avaliações)</span>
      </div>
    </div>
    <div class="pmodal-body">
      <p style="margin-bottom:1rem;font-size:0.95rem">${product.description}</p>
      <div style="margin-bottom:1.2rem">
        <div class="pmodal-price">${formatPrice(product.price)}<small style="font-size:0.9rem;font-weight:400;color:var(--color-text-muted)">/${product.priceModel}</small></div>
      </div>
      <strong style="font-size:0.9rem;color:var(--color-text);display:block;margin-bottom:0.5rem">✅ Funcionalidades incluídas:</strong>
      <ul class="pmodal-features">${featuresHtml}</ul>
      <div style="display:flex;gap:0.8rem;flex-wrap:wrap;margin-top:1.5rem">
        <button class="btn btn-primary" onclick="addToCart(${product.id}, event); closeModal('product-modal')">
          🛒 Adicionar ao Carrinho
        </button>
        <button class="btn btn-whatsapp" onclick="openWhatsApp('Tenho interesse no software: ${product.name} (${formatPrice(product.price)}/${product.priceModel})')">
          💬 Falar no WhatsApp
        </button>
      </div>
    </div>`;

  openModal('product-modal');
}

// ===== WHATSAPP =====

function openWhatsApp(message) {
  const phone = '5592999990000';
  const msg = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

// ===== CATEGORY FILTER =====

function renderCategories() {
  const grid = document.getElementById('categories-grid');
  const cats = CATEGORIES.filter(c => c.id !== 'todos');
  grid.innerHTML = cats.map(cat => `
    <div
      class="category-card${state.activeCategory === cat.id ? ' active' : ''}"
      onclick="filterByCategory('${cat.id}')"
      role="button"
      tabindex="0"
      aria-pressed="${state.activeCategory === cat.id}"
      onkeydown="if(event.key==='Enter'||event.key===' ')filterByCategory('${cat.id}')"
    >
      <div class="cat-icon">${cat.icon}</div>
      <h3>${cat.label}</h3>
      <p>${cat.count} software${cat.count !== 1 ? 's' : ''}</p>
    </div>
  `).join('');
}

function filterByCategory(categoryId) {
  state.activeCategory = state.activeCategory === categoryId ? 'todos' : categoryId;
  renderCategories();
  filterAndSort();
  // Scroll to products
  document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== PRODUCTS =====

function filterAndSort() {
  let products = [...PRODUCTS];

  // Category filter
  if (state.activeCategory && state.activeCategory !== 'todos') {
    products = products.filter(p => p.category === state.activeCategory);
  }

  // Search filter
  if (state.searchQuery) {
    const q = normalize(state.searchQuery);
    products = products.filter(p =>
      normalize(p.name).includes(q) ||
      normalize(p.description).includes(q) ||
      normalize(p.categoryLabel).includes(q) ||
      p.features.some(f => normalize(f).includes(q))
    );
  }

  // Price filter
  if (state.priceMax > 0) {
    products = products.filter(p => p.price <= state.priceMax);
  }

  // Sort
  switch (state.sortBy) {
    case 'price-asc':  products.sort((a, b) => a.price - b.price); break;
    case 'price-desc': products.sort((a, b) => b.price - a.price); break;
    case 'rating':     products.sort((a, b) => b.rating - a.rating); break;
    default: break; // relevance = original order
  }

  renderProducts(products);
}

function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  const count = document.getElementById('products-count');

  count.textContent = `${products.length} produto${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Nenhum software encontrado</h3>
        <p>Tente outra categoria ou termo de busca.</p>
        <button class="btn btn-ghost btn-sm" onclick="resetFilters()" style="margin-top:1rem">Limpar filtros</button>
      </div>`;
    return;
  }

  grid.innerHTML = products.map((product, index) => {
    const inCart = state.cart.some(item => item.product.id === product.id);
    const highlightedName = highlightText(product.name, state.searchQuery);
    const highlightedDesc = highlightText(product.description, state.searchQuery);

    return `
      <article
        class="product-card"
        onclick="openProductModal(${product.id})"
        style="--card-index: ${index}; animation-delay: ${index * 60}ms"
        tabindex="0"
        onkeydown="if(event.key==='Enter')openProductModal(${product.id})"
        role="button"
        aria-label="Ver detalhes de ${product.name}"
      >
        <div class="card-header">
          <div class="card-icon-wrap" aria-hidden="true">${product.icon}</div>
          <div class="card-badges">
            <span class="badge ${product.badgeType}">${product.badge}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-category">${product.categoryLabel}</div>
          <h3 class="card-title">${highlightedName}</h3>
          <p class="card-description">${highlightedDesc}</p>
          <div class="card-features">
            ${product.features.slice(0, 3).map(f => `<span class="card-feature">${f}</span>`).join('')}
          </div>
          <div class="card-rating">
            <span class="stars" aria-hidden="true">${stars(product.rating)}</span>
            <span class="rating-count">${product.rating} (${product.reviews})</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-price">
            ${formatPrice(product.price)}
            <span class="price-model">/${product.priceModel}</span>
          </div>
          <div class="card-actions">
            <button
              class="btn btn-whatsapp btn-sm"
              onclick="openWhatsApp('Tenho interesse no software: ${product.name}'); event.stopPropagation()"
              aria-label="Contato WhatsApp para ${product.name}"
              title="Contato via WhatsApp"
            >💬</button>
            <button
              class="btn ${inCart ? 'btn-ghost' : 'btn-primary'} btn-sm"
              onclick="${inCart ? "showToast('Já está no carrinho!', 'error')" : `addToCart(${product.id}, event)`}"
              aria-label="${inCart ? 'Já no carrinho' : 'Adicionar ao carrinho'}"
            >${inCart ? '✓ No Carrinho' : '🛒 Adicionar'}</button>
          </div>
        </div>
      </article>`;
  }).join('');
}

function resetFilters() {
  state.activeCategory = 'todos';
  state.searchQuery    = '';
  state.sortBy         = 'relevance';
  state.priceMax       = 0;
  document.getElementById('search-input').value = '';
  document.getElementById('mobile-search-input').value = '';
  document.getElementById('sort-select').value = 'relevance';
  document.getElementById('price-filter').value = '0';
  renderCategories();
  filterAndSort();
}

// ===== SEARCH =====

let searchDebounce;
function handleSearch(query) {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    state.searchQuery = query.trim();
    filterAndSort();
  }, 280);
}

document.getElementById('search-input').addEventListener('input', (e) => {
  handleSearch(e.target.value);
  // Sync mobile search
  document.getElementById('mobile-search-input').value = e.target.value;
});

document.getElementById('mobile-search-input').addEventListener('input', (e) => {
  handleSearch(e.target.value);
  document.getElementById('search-input').value = e.target.value;
});

// ===== SORT & PRICE FILTER =====

document.getElementById('sort-select').addEventListener('change', (e) => {
  state.sortBy = e.target.value;
  filterAndSort();
});

document.getElementById('price-filter').addEventListener('change', (e) => {
  state.priceMax = Number(e.target.value);
  filterAndSort();
});

// ===== NAVBAR =====

function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    navbar.classList.toggle('scrolled', scroll > 10);
    lastScroll = scroll;
  }, { passive: true });
}

// ===== HAMBURGER MENU =====

function initHamburger() {
  const btn  = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open.toString());
    btn.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
    btn.querySelectorAll('span')[1].style.opacity   = open ? '0' : '1';
    btn.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close menu on mobile link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ===== SCROLL ANIMATIONS =====

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

// ===== INIT =====

function init() {
  loadCart();
  updateCartBadge();
  renderCategories();
  filterAndSort();
  initNavbar();
  initHamburger();
  initScrollAnimations();
}

document.addEventListener('DOMContentLoaded', init);
