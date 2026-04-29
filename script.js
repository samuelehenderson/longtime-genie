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

  /* ---------- 8. DYNAMIC STORIES LOADER (stories.html) ---------- */
  // Fetches stories from content/stories.json (managed by the CMS)
  // and renders them into #story-grid. Allows Sheri to add/edit stories
  // through /admin without anyone touching code.
  const storyGrid = document.getElementById('story-grid');
  if (storyGrid) {
    fetch('content/stories.json')
      .then(response => response.json())
      .then(data => {
        const visibleStories = (data.stories || []).filter(s => s.visible !== false);

        if (visibleStories.length === 0) {
          storyGrid.innerHTML = '<p style="color: var(--muted); font-style: italic; text-align: center; grid-column: 1/-1;">More stories coming soon.</p>';
          return;
        }

        // Color palette rotated through stories for visual variety
        const palettes = [
          { bg: '#00868b', accent: '#c9a227' },
          { bg: '#c9a227', accent: '#f8f4ec' },
          { bg: '#036568', accent: '#c9a227' },
          { bg: '#66b2b2', accent: '#f8f4ec' },
          { bg: '#222222', accent: '#c9a227' },
          { bg: '#efe7d4', accent: '#00868b' }
        ];

        const cards = visibleStories.map((story, i) => {
          const palette = palettes[i % palettes.length];
          // Escape HTML to prevent injection
          const safe = (str) => String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
          return `
            <article class="story-card reveal">
              <div class="story-card__visual" style="background:${palette.bg};">
                <span class="story-card__tag">${safe(story.tag)}</span>
                <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <g stroke="${palette.accent}" stroke-width="1" fill="none" opacity="0.5">
                    <circle cx="200" cy="125" r="40"/>
                    <circle cx="200" cy="125" r="70"/>
                    <circle cx="200" cy="125" r="100"/>
                  </g>
                </svg>
              </div>
              <div class="story-card__body">
                <h3 class="story-card__title">${safe(story.title)}</h3>
                <p class="story-card__excerpt">${safe(story.body)}</p>
                <p class="story-card__attribution">${safe(story.attribution)}</p>
              </div>
            </article>
          `;
        }).join('');

        storyGrid.innerHTML = cards;
        storyGrid.removeAttribute('data-loading');

        // Re-trigger reveal animations on newly added cards
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1 });
          storyGrid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }
      })
      .catch(err => {
        console.error('Could not load stories:', err);
        storyGrid.innerHTML = '<p style="color: var(--muted); font-style: italic; text-align: center; grid-column: 1/-1;">Stories are temporarily unavailable. Please refresh the page.</p>';
      });
  }

});
