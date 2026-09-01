/* =========================================================
   FiscoSim LP — interações
   ========================================================= */
(function () {
  'use strict';

  /* ---- Ano dinâmico no footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header com sombra ao rolar ---- */
  var header = document.getElementById('header');
  var mobileBar = document.getElementById('mobile-bar');
  var hero = document.getElementById('hero');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 20);

    /* Barra mobile aparece depois do hero */
    if (mobileBar && hero) {
      var heroBottom = hero.offsetTop + hero.offsetHeight - 120;
      mobileBar.classList.toggle('is-visible', y > heroBottom);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Accordions (programa + FAQ) ---- */
  var triggers = document.querySelectorAll('.accordion__trigger');
  triggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.accordion__item');
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      item.classList.toggle('is-open', !expanded);
    });
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          /* stagger leve para itens irmãos */
          var delay = Math.min(i * 40, 160);
          setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
