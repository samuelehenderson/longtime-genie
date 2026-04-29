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
  // Submits to Web3Forms which emails longtimegenie@gmail.com
  // Uses fetch() so the page doesn't redirect away on submit
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const success = form.querySelector('.form-success');
      const originalText = submitBtn.innerHTML;

      // Show sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();

        if (response.ok && data.success) {
          // Hide form, show success message
          form.querySelectorAll('.form-row, .form-group, button').forEach(el => {
            el.style.display = 'none';
          });
          if (success) {
            success.classList.add('show');
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          form.reset();
        } else {
          // Show error inline
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          alert('Something went wrong sending your message. Please try again, or email longtimegenie@gmail.com directly.');
        }
      } catch (error) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('Connection issue. Please try again, or email longtimegenie@gmail.com directly.');
      }
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
