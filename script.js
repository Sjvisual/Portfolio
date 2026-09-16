/* ─────────────────────────────────────────
   script.js — Portfolio Interactivity
   Pure vanilla JS, no dependencies.
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ─── Navbar scroll effect ─── */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scroll-top');

  function onScroll() {
    if (navbar) {
      if (window.scrollY > 24) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Mobile menu ─── */
  const hamburger    = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks  = document.querySelectorAll('.mobile-link');

  function closeMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  }

  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
    });
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (hamburger && mobileDrawer) {
      if (!hamburger.contains(e.target) && !mobileDrawer.contains(e.target)) {
        closeMenu();
      }
    }
  });

  /* ─── Scroll to top ─── */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Active nav link highlight on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              if (link.getAttribute('href') === '#' + id) {
                link.style.color = 'var(--navy)';
                link.style.background = 'var(--slate-100)';
              } else {
                link.style.color = '';
                link.style.background = '';
              }
            });
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    sections.forEach(function (sec) {
      sectionObserver.observe(sec);
    });
  }

  /* ─── Smooth anchor scrolling with offset for fixed nav ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
});
