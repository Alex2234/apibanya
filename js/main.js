/* ============================================
   АпиБаня — Main JS
   Menu, Scroll Header, Modal, Accordion, Reveal Fallback
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initBurgerMenu();
  initModal();
  initAccordion();
  initRevealFallback();
  initParallax();
});

/* --- Sticky Header --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const hero = document.querySelector('.hero');

  function updateHeader() {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('is-scrolled', scrolled);

    if (hero) {
      const heroBottom = hero.offsetHeight;
      header.classList.toggle('is-hero-visible', window.scrollY < heroBottom - 100);
    }
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/* --- Burger Menu --- */
function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.nav-overlay');
  if (!burger || !mobileNav) return;

  function toggleMenu() {
    const isOpen = mobileNav.classList.toggle('is-open');
    burger.classList.toggle('is-active', isOpen);
    if (overlay) overlay.classList.toggle('is-visible', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    burger.classList.remove('is-active');
    if (overlay) overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close button inside mobile nav
  const closeBtn = mobileNav.querySelector('.mobile-nav__close');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* --- Modal --- */
function initModal() {
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.is-open').forEach(modal => {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }
  });
}

/* --- Accordion --- */
function initAccordion() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const accordion = item.closest('.accordion');

      // Close others in same group
      accordion.querySelectorAll('.accordion__item.is-open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
        }
      });

      item.classList.toggle('is-open');
    });
  });
}

/* --- Reveal Fallback (for browsers without scroll-driven animations) --- */
function initRevealFallback() {
  if (CSS.supports && CSS.supports('animation-timeline', 'view()')) {
    return; // Native support, no JS needed
  }

  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade'
  );

  if (revealElements.length === 0) return;

  // Map scroll-driven classes to JS fallback classes
  revealElements.forEach(el => {
    if (el.classList.contains('reveal-left')) {
      el.classList.add('js-reveal-left');
    } else if (el.classList.contains('reveal-right')) {
      el.classList.add('js-reveal-right');
    } else {
      el.classList.add('js-reveal');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.js-reveal, .js-reveal-left, .js-reveal-right').forEach(el => {
    observer.observe(el);
  });

  // Stagger children fallback
  document.querySelectorAll('.reveal-stagger').forEach(container => {
    const children = container.children;
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            Array.from(children).forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, i * 100);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    staggerObserver.observe(container);
  });
}

/* --- Parallax (JS-based for broad compatibility) --- */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax__bg');
  if (parallaxElements.length === 0) return;

  function updateParallax() {
    parallaxElements.forEach(el => {
      const container = el.closest('.parallax');
      const rect = container.getBoundingClientRect();
      const speed = 0.3;
      const yPos = -(rect.top * speed);
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
}
