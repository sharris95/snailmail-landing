// wait until the DOM is fully parsed:
document.addEventListener('DOMContentLoaded', () => {
  // 1) Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      themeToggle.textContent =
        themeToggle.textContent === '🌙' ? '☀️' : '🌙';
    });
  }

  // 2) Pricing toggle
  function togglePricing(period) {
    document.querySelectorAll('.toggle-option').forEach(btn => {
      btn.classList.toggle(
        'active',
        btn.dataset.period === period
      );
    });
    document.querySelectorAll('.price-amount').forEach(el => {
      el.textContent = el.dataset[period];
    });
  }
  window.togglePricing = togglePricing;

  // 3) FAQ accordion
  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('active');
    document
      .querySelectorAll('.faq-item')
      .forEach(i => i.classList.remove('active'));
    if (!wasOpen) item.classList.add('active');
  }
  window.toggleFaq = toggleFaq;

  // 4) Success callback
  const success = document.getElementById('success-message');
  function showSuccess(msg) {
    if (!success) return;
    success.querySelector('p').textContent = msg;
    success.classList.add('show');
    setTimeout(
      () => success.classList.remove('show'),
      3000
    );
  }

  // 5) Form handlers
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      showSuccess(
        "🎉 Welcome aboard! We'll be in touch soon!"
      );
      e.target.reset();
    });
  }
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      showSuccess(
        "Thanks for your message! We'll reply within 24 h."
      );
      e.target.reset();
    });
  }

  // 6) Mobile menu toggle
  const mobileToggle = document.querySelector(
    '.mobile-menu-toggle'
  );
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const nav = document.querySelector('.nav-links');
      if (!nav) return;
      nav.style.display =
        nav.style.display === 'flex'
          ? 'none'
          : 'flex';
    });
  }
});
