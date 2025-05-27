// script.js

// 1) Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = themeToggle.textContent === '🌙' ? '☀️' : '🌙';
});

// 2) Pricing toggle with dollar sign & rounding
function togglePricing(period) {
  // highlight the monthly/yearly button
  document.querySelectorAll('.toggle-option').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.period === period)
  );

  // update each price amount
  document.querySelectorAll('.price-amount').forEach(el => {
    const raw = parseFloat(el.dataset[period]);
    const rounded = Math.round(raw);
    el.textContent = `$${rounded}`;
  });
}

// 3) FAQ accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!isOpen) item.classList.add('active');
}

// 4) Success toasts (hidden by default)
const success = document.getElementById('success-message');
function showSuccess(msg) {
  success.querySelector('p').textContent = msg;
  success.classList.add('show');
  setTimeout(() => success.classList.remove('show'), 3000);
}

// 5) Form handlers
document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();
  showSuccess("🎉 Welcome aboard! We'll be in touch soon!");
  e.target.reset();
});
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  showSuccess("Thanks for your message! We'll reply within 24h.");
  e.target.reset();
});

// 6) Mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// 7) Initialize prices on load
togglePricing('monthly');

// 8) Card selection outline
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('click', () => {
    // clear previous selection
    document.querySelectorAll('.pricing-card')
      .forEach(c => c.classList.remove('selected'));
    // mark this one
    card.classList.add('selected');
  });
});
// default select the “popular” card
const popular = document.querySelector('.pricing-card.popular');
if (popular) popular.classList.add('selected');
