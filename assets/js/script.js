'use strict';
/* ---- Sidebar toggle ---- */
const sidebar    = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => {
    const expanded = sidebar.classList.toggle('active');
    sidebarBtn.setAttribute('aria-expanded', expanded);
  });
}

/* ---- Active nav link on scroll ---- */
const navLinks = document.querySelectorAll('.navbar-link');
const sections = document.querySelectorAll('section[id], article > section[id]');

const activateLink = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
  });
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) activateLink(entry.target.id);
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        activateLink(href.slice(1));
      }
    }
  });
});

/* ---- Scroll reveal ---- */
const revealEls    = document.querySelectorAll('.reveal');
const revealGroups = document.querySelectorAll('.reveal-group');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));
revealGroups.forEach(el => revealObserver.observe(el));

/* ---- Skill bars animate on enter ---- */
const skillSection = document.querySelector('#skills');
if (skillSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-progress-fill').forEach(fill => {
          const w = fill.getAttribute('data-width');
          fill.style.width = w + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillObserver.observe(skillSection);
}

/* ---- Contact form validation ---- */
const form      = document.querySelector('[data-form]');
const formInputs= document.querySelectorAll('[data-form-input]');
const formBtn   = document.querySelector('[data-form-btn]');

formInputs.forEach(input => {
  input.addEventListener('input', () => {
    formBtn && (form.checkValidity()
      ? formBtn.removeAttribute('disabled')
      : formBtn.setAttribute('disabled', ''));
  });
});
