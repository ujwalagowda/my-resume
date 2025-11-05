/* script.js
   - Adds active nav highlighting
   - Smooth scrolling enhancements (jQuery)
   - Contact form validation (vanilla + jQuery small helpers)
*/

document.addEventListener('DOMContentLoaded', function () {
  // ---- Active nav link highlighting ----
  const navLinks = document.querySelectorAll('.nav-link');
  const current = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

  // ---- jQuery smooth scroll for anchor links (enhances default behavior) ----
  // jQuery is loaded via CDN and available as $
  if (window.jQuery) {
    $(document).on('click', 'a[href^="#"], a[href$=".html"]', function (e) {
      const href = $(this).attr('href');
      // If it's an internal hash anchor on the same page
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = $(href);
        if (target.length) {
          $('html,body').animate({ scrollTop: target.offset().top - 18 }, 400);
        }
      }
      // For local page navigation (.html) allow the browser to navigate normally.
    });
  }

  // ---- Contact form validation & submission simulation ----
  const form = document.getElementById('contactForm');
  if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successEl = document.getElementById('form-success');

    function setError(elId, msg) {
      const el = document.getElementById('err-' + elId);
      if (el) el.textContent = msg || '';
    }

    function validateEmail(email) {
      // simple, common RFC-ish check
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      setError('name', '');
      setError('email', '');
      setError('subject', '');
      setError('message', '');
      successEl.textContent = '';

      if (!nameInput.value.trim()) {
        setError('name', 'Please enter your name.');
        ok = false;
      }
      if (!emailInput.value.trim()) {
        setError('email', 'Please enter your email.');
        ok = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        setError('email', 'Please enter a valid email address.');
        ok = false;
      }
      if (!subjectInput.value.trim()) {
        setError('subject', 'Please add a subject.');
        ok = false;
      }
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        setError('message', 'Message must be at least 10 characters.');
        ok = false;
      }

      if (!ok) return;

      // Simulate sending — in a real site you'd POST to a server or use an email service
      successEl.textContent = 'Thanks — your message was received (simulation).';
      form.reset();

      // subtle success animation using inline style then clear after timeout
      successEl.style.opacity = '0';
      setTimeout(() => { successEl.style.transition = 'opacity .4s ease'; successEl.style.opacity = '1'; }, 20);
    });
  }
});