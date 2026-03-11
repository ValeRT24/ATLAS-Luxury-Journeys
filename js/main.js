// =======================================
// QUEBIATH — main.js
// Lógica principal UI
// =======================================

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('scrollTop')?.classList.toggle('visible', window.scrollY > 400);
  });
}

// ---- Hamburger / Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

// ---- Cart sidebar ----
function openCart() {
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartSidebar')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartSidebar();
}
function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('cartBtn')?.addEventListener('click', openCart);

function renderCartSidebar() {
  const container = document.getElementById('cartItems');
  if (!container || !window.DB) return;
  container.innerHTML = '';
  if (DB.cart.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:3rem 1rem;color:var(--muted);">
      <div style="font-size:3rem;margin-bottom:1rem;">🛍️</div>
      <p>Tu bolsa está vacía.</p>
      <a href="pages/catalogo.html" class="btn btn-rose btn-sm" style="margin-top:1rem;">Ir a comprar</a>
    </div>`;
    return;
  }
  DB.cart.forEach(item => {
    const p = DB.query.getById(item.productId);
    if (!p) return;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-variant">Talla: ${item.size} · Color: <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};vertical-align:middle;"></span></div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${p.id},1)">+</button>
          <span class="cart-item-price">${fmt(p.price * item.qty)}</span>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${p.id})" title="Eliminar"><i class="fa-solid fa-xmark"></i></button>`;
    container.appendChild(el);
  });
  updateCartFooter();
}

function updateCartFooter() {
  const total = DB.query.getCartTotal();
  const count = DB.query.getCartCount();
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
  const subtotalEl = document.querySelector('.cart-subtotal .value');
  if (subtotalEl) subtotalEl.textContent = fmt(total);
  const totalEl = document.querySelector('.cart-total .value');
  if (totalEl) totalEl.textContent = fmt(total);
}

function changeQty(id, delta) {
  DB.query.updateCartQty(id, delta);
  renderCartSidebar();
}
function removeFromCart(id) {
  DB.query.removeFromCart(id);
  renderCartSidebar();
  showToast('Pieza eliminada de tu bolsa 🗑️');
}

// ---- Render products ----
function renderProductCard(p, small = false) {
  const badgeMap = { new: 'badge-new', sale: 'badge-sale', hot: 'badge-hot' };
  const badgeLabel = { new: 'Nuevo', sale: `−${p.discount}%`, hot: '🔥 Hot' };
  const colorDots = p.colors.map(c => `<span class="color-dot" style="background:${c}"></span>`).join('');
  return `
  <div class="product-card" data-category="${p.category}" onclick="window.location='${window.location.pathname.includes('pages') ? '' : 'pages/'}producto.html?id=${p.id}'">
    <div class="product-img-wrap">
      <img src="${p.images[0]}" alt="${p.name}" class="product-img">
      ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name}" class="product-alt">` : ''}
      ${p.badge ? `<span class="product-badge ${badgeMap[p.badge]}">${badgeLabel[p.badge]}</span>` : ''}
      <button class="product-wishlist" onclick="event.stopPropagation();toggleWishlist(this)" aria-label="Favorito"><i class="fa-regular fa-heart"></i></button>
      <div class="product-quick-add" onclick="event.stopPropagation();quickAdd(${p.id})">+ Agregar a bolsa</div>
    </div>
    <div class="product-info">
      <div class="product-brand">${p.brand}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-colors">${colorDots}</div>
      <div class="product-price">
        <span class="price-current">${fmt(p.price)}</span>
        ${p.originalPrice ? `<span class="price-original">${fmt(p.originalPrice)}</span>` : ''}
        ${p.discount ? `<span class="price-discount">−${p.discount}%</span>` : ''}
      </div>
    </div>
  </div>`;
}

function fmt(n) { return '$' + n.toLocaleString('es-MX') + ' MXN'; }

// ---- Featured products (index) ----
const featuredSection = document.getElementById('featuredProducts');
if (featuredSection && window.DB) {
  const featured = DB.query.getAllProducts(8);
  featuredSection.innerHTML = featured.map(p => renderProductCard(p)).join('');
}

// ---- Bestsellers (index) ----
const bsSection = document.getElementById('bestsellerProducts');
if (bsSection && window.DB) {
  const bs = DB.query.getBestsellers().slice(0, 4);
  bsSection.innerHTML = bs.map(p => renderProductCard(p)).join('');
}

// ---- Filter tabs ----
document.querySelectorAll('.filter-tab').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---- Wishlist toggle ----
function toggleWishlist(btn) {
  btn.classList.toggle('active');
  const isActive = btn.classList.contains('active');
  btn.innerHTML = isActive ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
  showToast(isActive ? '❤️ Agregado a favoritos' : 'Eliminado de favoritos');
}

// ---- Quick add to cart ----
function quickAdd(id) {
  const p = DB.query.getById(id);
  if (!p) return;
  DB.query.addToCart(id, p.sizes[1] || p.sizes[0], p.colors[0]);
  updateCartFooter();
  showToast(`🛍️ ${p.name} agregado a tu bolsa`);
}

// ---- Promo code copy ----
function copyCode() {
  navigator.clipboard?.writeText('QUEBIATH20').then(() => {
    showToast('✂️ Código QUEBIATH20 copiado');
    const btn = document.getElementById('copyBtn');
    if (btn) { btn.textContent = '✓ Copiado'; setTimeout(() => btn.textContent = 'Copiar código', 2000); }
  });
}

// ---- Newsletter ----
function subscribeNewsletter(e) {
  e.preventDefault();
  showToast('🎀 ¡Bienvenida al club VIP de QUEBIATH!');
  e.target.reset();
}

// ---- Toast ----
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- IntersectionObserver animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .category-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
