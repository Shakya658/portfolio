'use strict';

/* ================================================================
   MAIN.JS — Shirish Man Shakya Portfolio
   Responsibilities:
     1. Scroll-reveal animation (IntersectionObserver)
     2. Nav scroll-state (transparent → frosted glass)
     3. Active nav link tracking (highlights current section)
     4. Mobile hamburger menu toggle
     5. Footer year auto-update
     6. Smooth external link safety (target="_blank" rel check)
   No external dependencies. Vanilla JS only.
   ================================================================ */

/* ----------------------------------------------------------------
   1. SCROLL REVEAL
   ---------------------------------------------------------------- */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* ----------------------------------------------------------------
   2. NAV SCROLL STATE
   ---------------------------------------------------------------- */
function initNavScroll() {
  const nav = document.getElementById('nav');
  const THRESHOLD = 80;

  function updateNav() {
    nav.classList.toggle('nav--scrolled', window.scrollY > THRESHOLD);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/* ----------------------------------------------------------------
   3. ACTIVE NAV LINK TRACKING
   Highlights the nav link for whichever section is most visible.
   ---------------------------------------------------------------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
            if (!isActive) link.removeAttribute('aria-current');
          });
        }
      });
    },
    {
      rootMargin: `-${64}px 0px -55% 0px`,
      threshold: 0,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* ----------------------------------------------------------------
   4. MOBILE NAV TOGGLE
   ---------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('is-open');
    document.addEventListener('keydown', handleEsc);
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    document.removeEventListener('keydown', handleEsc);
  }

  function handleEsc(event) {
    if (event.key === 'Escape') {
      closeMenu();
      hamburger.focus();
    }
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (
      navLinks.classList.contains('is-open') &&
      !hamburger.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

/* ----------------------------------------------------------------
   5. FOOTER YEAR
   ---------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------------------
   6. EXTERNAL LINK SAFETY
   Ensures all target="_blank" links have the correct rel attribute.
   ---------------------------------------------------------------- */
function auditExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const rel = link.getAttribute('rel') || '';
    if (!rel.includes('noopener')) {
      link.setAttribute('rel', (rel + ' noopener noreferrer').trim());
    }
  });
}

/* ----------------------------------------------------------------
   INIT
   ---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavScroll();
  initActiveNav();
  initMobileNav();
  initFooterYear();
  auditExternalLinks();
});