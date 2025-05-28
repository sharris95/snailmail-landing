// ──────────────────────────────────────────
// 0) Disable browser scroll-restoration
// ──────────────────────────────────────────
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ──────────────────────────────────────────
// 1) Theme toggle
// ──────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = themeToggle.textContent === '🌙' ? '☀️' : '🌙';
});

// ──────────────────────────────────────────
// 2) Pricing toggle
// ──────────────────────────────────────────
function togglePricing(period) {
  document.querySelectorAll('.toggle-option').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.period === period)
  );
  document.querySelectorAll('.price-amount').forEach(el => {
    const raw = parseFloat(el.dataset[period]);
    el.textContent = `$${Math.round(raw)}`;
  });
}

// ──────────────────────────────────────────
// 3) FAQ accordion
// ──────────────────────────────────────────
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!wasOpen) item.classList.add('active');
}

// ──────────────────────────────────────────
// 4) Success toast
// ──────────────────────────────────────────
const success = document.getElementById('success-message');
function showSuccess(msg) {
  success.querySelector('p').textContent = msg;
  success.classList.add('show');
  setTimeout(() => success.classList.remove('show'), 3000);
}

// ──────────────────────────────────────────
// 5) Form handlers
// ──────────────────────────────────────────
document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();
  showSuccess("🎉 Welcome aboard! We'll be in touch soon!");
  e.target.reset();
});
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  showSuccess("Thanks for your message! We'll reply within 24 hrs.");
  e.target.reset();
});

// ──────────────────────────────────────────
// 6) Mobile menu toggle
// ──────────────────────────────────────────
document.querySelector('.mobile-menu-toggle')
  .addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    const open = nav.classList.toggle('open');
    nav.style.display = open ? 'flex' : 'none';
  });

// ──────────────────────────────────────────
// 7) Initialize pricing & highlight “popular”
// ──────────────────────────────────────────
togglePricing('monthly');
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});
document.querySelector('.pricing-card.popular')?.classList.add('selected');

// ──────────────────────────────────────────
// 8) Scroll-spy for nav highlights
// ──────────────────────────────────────────
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-links a[href="#${entry.target.id}"]`)
        ?.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });
sections.forEach(sec => observer.observe(sec));

// ──────────────────────────────────────────
// 9) Force scroll-to-top on every load/navigation
// ──────────────────────────────────────────
// (a) DOMContentLoaded covers first paint
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  // also clear any existing hash so browser won’t jump again
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
});

// (b) window.load for extra insurance
window.addEventListener('load', () => {
  setTimeout(() => window.scrollTo(0, 0), 20);
});

// (c) pageshow to catch back-forward cache
window.addEventListener('pageshow', (evt) => {
  if (evt.persisted) window.scrollTo(0, 0);
});
