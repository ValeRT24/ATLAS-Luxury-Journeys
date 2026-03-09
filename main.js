/* ============================================================
   ATLAS – Luxury Journeys | main.js
   Funcionalidad: navbar, accordion, lightbox, animaciones,
   formulario de pago con tarjeta, validaciones, contadores
   ============================================================ */

// ── Navbar: sombra al hacer scroll ──────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
}

// ── Nav: marcar enlace activo ────────────────────────────────
(function markActiveNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active');
    });
})();

// ── Accordion ───────────────────────────────────────────────
document.querySelectorAll('.accord-head').forEach(head => {
    head.addEventListener('click', () => {
        const body = head.nextElementSibling;
        const icon = head.querySelector('.accord-icon');
        const isOpen = body.classList.contains('open');

        /* Cierra todos en el mismo contenedor */
        const container = head.closest('.accord-wrap') || document;
        container.querySelectorAll('.accord-body.open').forEach(b => {
            b.classList.remove('open');
            b.previousElementSibling.querySelector('.accord-icon')?.classList.remove('open');
        });

        if (!isOpen) {
            body.classList.add('open');
            icon?.classList.add('open');
        }
    });
});

// ── Animación fade-up al hacer scroll ───────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Contadores animados ──────────────────────────────────────
const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el    = e.target;
        const target = +el.dataset.count;
        const dur   = 1800;
        const step  = 16;
        const inc   = target / (dur / step);
        let cur     = 0;
        const tick  = setInterval(() => {
            cur += inc;
            if (cur >= target) { el.textContent = target.toLocaleString(); clearInterval(tick); }
            else                { el.textContent = Math.floor(cur).toLocaleString(); }
        }, step);
        counterObs.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// ── Galería Lightbox ─────────────────────────────────────────
(function initLightbox() {
    const items = document.querySelectorAll('.masonry-item[data-src], .gallery-img[data-src]');
    if (!items.length) return;

    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = `
        <div class="lb-overlay"></div>
        <button class="lb-close" aria-label="Cerrar">&#x2715;</button>
        <button class="lb-prev" aria-label="Anterior">&#x276E;</button>
        <button class="lb-next" aria-label="Siguiente">&#x276F;</button>
        <figure class="lb-figure">
            <img src="" alt="" class="lb-img" />
            <figcaption class="lb-caption"></figcaption>
        </figure>`;
    document.body.appendChild(lb);

    const style = document.createElement('style');
    style.textContent = `
    #lightbox{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;}
    #lightbox.active{display:flex;}
    .lb-overlay{position:absolute;inset:0;background:rgba(20,25,40,.95);cursor:zoom-out;}
    .lb-figure{position:relative;z-index:1;max-width:90vw;max-height:90vh;text-align:center;}
    .lb-img{max-width:90vw;max-height:82vh;border-radius:12px;box-shadow:0 20px 80px rgba(0,0,0,.6);object-fit:contain;}
    .lb-caption{color:rgba(255,255,255,.6);font-size:.82rem;margin-top:.8rem;letter-spacing:.08em;}
    .lb-close{position:absolute;top:1.5rem;right:1.8rem;z-index:2;background:none;border:none;color:#fff;font-size:1.6rem;cursor:pointer;opacity:.7;transition:.2s;}
    .lb-close:hover{opacity:1;transform:scale(1.1);}
    .lb-prev,.lb-next{position:absolute;top:50%;transform:translateY(-50%);z-index:2;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:1.5rem;width:52px;height:52px;border-radius:50%;cursor:pointer;transition:.25s;display:flex;align-items:center;justify-content:center;}
    .lb-prev{left:1.2rem;} .lb-next{right:1.2rem;}
    .lb-prev:hover,.lb-next:hover{background:rgba(200,164,90,.5);}`;
    document.head.appendChild(style);

    const img     = lb.querySelector('.lb-img');
    const caption = lb.querySelector('.lb-caption');
    const list    = Array.from(items);
    let current   = 0;

    function open(i) {
        current = i;
        const src = list[i].dataset.src || list[i].querySelector('img')?.src || '';
        const cap = list[i].dataset.caption || list[i].querySelector('.m-title')?.textContent || '';
        img.src     = src;
        caption.textContent = cap;
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }

    items.forEach((item, i) => item.addEventListener('click', () => open(i)));
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-overlay').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', () => open((current - 1 + list.length) % list.length));
    lb.querySelector('.lb-next').addEventListener('click', () => open((current + 1) % list.length));
    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  lb.querySelector('.lb-prev').click();
        if (e.key === 'ArrowRight') lb.querySelector('.lb-next').click();
    });
})();

// ── Filtro de destinos/galería ───────────────────────────────
// Valores que corresponden a REGIÓN (sidebar) vs TIPO (filter-bar y gal-tabs)
const REGION_FILTERS = new Set(['africa','asia','europa','america','oceania']);

document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // evitar scroll al top en <a href="#">

        const filter = btn.dataset.filter;

        // Quitar activo de todos los [data-filter] del mismo contexto
        document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const isRegion = REGION_FILTERS.has(filter);

        document.querySelectorAll('[data-cat]').forEach(item => {
            let show = false;
            if (filter === 'all') {
                show = true;
            } else if (isRegion) {
                // Filtrar por atributo data-region
                show = item.dataset.region === filter;
            } else {
                // Filtrar por atributo data-cat (tipo)
                show = item.dataset.cat === filter;
            }

            if (show) {
                item.style.display = '';
                setTimeout(() => item.classList.add('in'), 50);
            } else {
                item.style.display = 'none';
                item.classList.remove('in');
            }
        });
    });
});

// ── FORMULARIO DE PAGO CON TARJETA ──────────────────────────
(function initPaymentForm() {
    const form = document.getElementById('payment-form');
    if (!form) return;

    const cardNumInput  = document.getElementById('card-number');
    const cardNameInput = document.getElementById('card-name');
    const expiryInput   = document.getElementById('card-expiry');
    const cvvInput      = document.getElementById('card-cvv');

    const visCardNum    = document.querySelector('.card-number');
    const visCardName   = document.querySelector('.card-value.vis-name');
    const visCardExpiry = document.querySelector('.card-value.vis-expiry');
    const visCardBrand  = document.querySelector('.card-brand');

    // Formato número XXXX XXXX XXXX XXXX
    if (cardNumInput) {
        cardNumInput.addEventListener('input', e => {
            let v = e.target.value.replace(/\D/g,'').substring(0,16);
            e.target.value = v.replace(/(.{4})/g,'$1 ').trim();
            if (visCardNum) {
                const display = (v + '●'.repeat(Math.max(0, 16 - v.length))).replace(/(.{4})/g,'$1 ').trim();
                visCardNum.textContent = display;
            }
            detectCardBrand(v);
        });
    }

    // Nombre titular
    if (cardNameInput) {
        cardNameInput.addEventListener('input', e => {
            if (visCardName) visCardName.textContent = e.target.value.toUpperCase() || 'NOMBRE TITULAR';
        });
    }

    // Fecha MM/YY
    if (expiryInput) {
        expiryInput.addEventListener('input', e => {
            let v = e.target.value.replace(/\D/g,'').substring(0,4);
            if (v.length >= 2) v = v.substring(0,2) + '/' + v.substring(2);
            e.target.value = v;
            if (visCardExpiry) visCardExpiry.textContent = v || 'MM/AA';
        });
    }

    // CVV – toggle show/hide
    const cvvToggle = document.getElementById('cvv-toggle');
    if (cvvToggle && cvvInput) {
        cvvToggle.addEventListener('click', () => {
            const isPassword = cvvInput.type === 'password';
            cvvInput.type = isPassword ? 'text' : 'password';
            cvvToggle.textContent = isPassword ? '🔓' : '🔒';
        });
    }

    // Detección de marca
    function detectCardBrand(num) {
        if (!visCardBrand) return;
        if (/^4/.test(num))           visCardBrand.textContent = '💳 VISA';
        else if (/^5[1-5]/.test(num)||/^2[2-7]/.test(num)) visCardBrand.textContent = '💳 MC';
        else if (/^3[47]/.test(num))  visCardBrand.textContent = '💳 AMEX';
        else                           visCardBrand.textContent = '💳';
    }

    // Validación al enviar
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const errors = [];
            const num    = cardNumInput?.value.replace(/\s/g,'') || '';
            const name   = cardNameInput?.value.trim() || '';
            const expiry = expiryInput?.value || '';
            const cvv    = cvvInput?.value || '';

            if (num.length < 13) errors.push('Número de tarjeta inválido.');
            if (name.length < 3) errors.push('Ingresa el nombre del titular.');
            if (!/^\d{2}\/\d{2}$/.test(expiry)) errors.push('Fecha de vencimiento inválida (MM/AA).');
            if (cvv.length < 3)  errors.push('CVV inválido.');

            const msgEl = document.getElementById('payment-msg');
            if (errors.length) {
                if (msgEl) { msgEl.textContent = errors.join(' '); msgEl.className = 'pay-msg error'; }
                else alert(errors.join('\n'));
            } else {
                if (msgEl) {
                    msgEl.textContent = '✅ Pago procesado con seguridad. ¡Bienvenido a bordo!';
                    msgEl.className = 'pay-msg success';
                } else alert('¡Pago procesado con éxito!');
                form.reset();
                if (visCardNum)    visCardNum.textContent    = '●●●● ●●●● ●●●● ●●●●';
                if (visCardName)   visCardName.textContent   = 'NOMBRE TITULAR';
                if (visCardExpiry) visCardExpiry.textContent = 'MM/AA';
                if (visCardBrand)  visCardBrand.textContent  = '💳';
            }
        });
    }
})();

// ── Validación formulario de contacto ────────────────────────
(function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name  = form.querySelector('[name="name"]')?.value.trim();
        const email = form.querySelector('[name="email"]')?.value.trim();
        const msg   = form.querySelector('[name="message"]')?.value.trim();
        const terms = form.querySelector('[name="terms"]')?.checked;

        if (!name || !email || !msg) { alert('Por favor completa todos los campos requeridos.'); return; }
        if (!terms) { alert('Debes aceptar la política de privacidad para continuar.'); return; }

        const btn = form.querySelector('[type="submit"]');
        const orig = btn.textContent;
        btn.textContent = '✅ ¡Enviado con éxito!';
        btn.disabled = true;
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; form.reset(); }, 3000);
    });
})();

// ── Smooth scroll para anclas internas ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const targetId = a.getAttribute('href');
        const target   = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 140;
            const top    = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Rango de precio ──────────────────────────────────────────
const priceRange = document.getElementById('price-range');
const priceLabel = document.getElementById('price-label');
if (priceRange && priceLabel) {
    priceRange.addEventListener('input', () => {
        priceLabel.textContent = '$' + (+priceRange.value).toLocaleString('es-MX');
    });
}
