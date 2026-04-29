/* ==========================================================================
   LONGTIME GENIE — Site Scripts
   ==========================================================================
   Handles:
     1. Mobile navigation toggle
     2. Sticky nav shadow on scroll
     3. Scroll-reveal animations (IntersectionObserver)
     4. Smooth scroll for anchor links
     5. Contact form validation + success message
     6. Active page highlighting in nav
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('nav__toggle--open');
      const expanded = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when a link is tapped (mobile UX)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('nav__toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. STICKY NAV SHADOW ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---------- 3. SCROLL REVEAL ANIMATIONS ---------- */
  // Add the .reveal class to any element you want to animate in.
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: just reveal everything
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ---------- 4. SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80; // sticky nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 5. CONTACT FORM HANDLING ---------- */
  // NOTE: GitHub Pages can't process form submissions on its own.
  // The form below shows a success message, but to actually receive emails,
  // hook it up to one of these free services and update the form's `action`:
  //   - Formspree (https://formspree.io)
  //   - Getform (https://getform.io)
  //   - Web3Forms (https://web3forms.com)
  // See README.md for instructions.
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      // If the form has no real action set (placeholder "#"),
      // intercept and show success state instead of submitting.
      const action = form.getAttribute('action');
      if (!action || action === '#' || action.includes('YOUR_FORM_ENDPOINT')) {
        e.preventDefault();
        const success = form.querySelector('.form-success');
        if (success) {
          success.classList.add('show');
          form.reset();
          setTimeout(() => success.classList.remove('show'), 6000);
        }
      }
      // Otherwise, let the form submit normally to the real endpoint.
    });
  }

  /* ---------- 6. ACTIVE NAV LINK HIGHLIGHTING ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === path || (path === '' && linkPath === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  /* ---------- 7. CURRENT YEAR IN FOOTER ---------- */
  const yearSpan = document.querySelector('.footer__year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
