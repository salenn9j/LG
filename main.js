// ─── FOTOS DE FUNDO COM FALLBACK ─────────────────────────────────
// Tenta cada URL na ordem; aplica a primeira que carregar com sucesso.
function setBackgroundWithFallback(selector, urls) {
  const el = document.querySelector(selector);
  if (!el) return;

  let i = 0;
  function tryNext() {
    if (i >= urls.length) return; // mantém a cor de fundo definida no CSS
    const img = new Image();
    img.onload  = () => { el.style.backgroundImage = `url('${urls[i]}')`; };
    img.onerror = () => { i++; tryNext(); };
    img.src = urls[i];
  }
  tryNext();
}

setBackgroundWithFallback('.hero-photo', [
  'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1800&q=80',
  'https://tuacasa.uol.com.br/wp-content/uploads/2016/08/piscinas-capa-0.jpeg',
  'https://www.guiadoconstrutor.com.br/storage/uploads/articles/profundidade-ideal-de-uma-piscina-qual-escolher.jpg'
]);

setBackgroundWithFallback('.sobre-img', [
  'https://solazerpiscinas.com.br/wp-content/uploads/2025/05/2.jpg',
  'https://images.unsplash.com/photo-1657383543368-7d929944be6a?w=900&q=80',
  'https://images.unsplash.com/photo-1635108199327-7aa88bdad791?w=900&q=80'
]);


// ─── SCROLL REVEAL ───────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ─── SMOOTH SCROLL PARA BOTÕES ───────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    scrollTo(btn.dataset.scroll);
  });
});


// ─── NAV: FUNDO SÓLIDO AO ROLAR ──────────────────────────────────
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(10, 22, 40, 0.98)';
  } else {
    nav.style.background = 'rgba(10, 22, 40, 0.92)';
  }
});


// ─── LINK ATIVO NO NAV AO ROLAR ──────────────────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
