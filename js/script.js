// 1) Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = themeToggle.textContent === '🌙' ? '☀️' : '🌙';
});

// 2) Pricing toggle
function togglePricing(period) {
  document.querySelectorAll('.toggle-option').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.period === period)
  );
  document.querySelectorAll('.price-amount').forEach(el => {
    const raw = parseFloat(el.dataset[period]);
    el.textContent = `$${Math.round(raw)}`;
  });
}

// 3) FAQ accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!isOpen) item.classList.add('active');
}

// 4) Success toast
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
  showSuccess("Thanks for your message! We'll reply within 24 hrs.");
  e.target.reset();
});

// 6) Mobile menu toggle (only on click)
const toggleBtn = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav-links');
toggleBtn.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  nav.style.display = opened ? 'flex' : 'none';
});

// 7) Initialize default pricing
togglePricing('monthly');

// 8) Pricing card selection
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});
const popular = document.querySelector('.pricing-card.popular');
if (popular) popular.classList.add('selected');

// 9) Scroll-spy for active nav link
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, {
  rootMargin: '-40% 0px -60% 0px'
});
sections.forEach(section => observer.observe(section));
