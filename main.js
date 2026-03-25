(function () {
  'use strict';

  // Header (mobile menu) for Spinix
  var top = document.querySelector('.sx-top');
  var bur = document.querySelector('.sx-burger');
  var nav = document.getElementById('sx-nav');

  if (top && bur && nav) {
    bur.addEventListener('click', function () {
      var on = top.classList.toggle('sx-on');
      bur.setAttribute('aria-expanded', on ? 'true' : 'false');
      bur.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        top.classList.remove('sx-on');
        bur.setAttribute('aria-expanded', 'false');
        bur.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Game catalog filtering (games.html)
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('[data-sx-filter]'));
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-sx-cat]'));

  function applyFilter(cat) {
    items.forEach(function (item) {
      var c = item.getAttribute('data-sx-cat') || '';
      item.style.display = cat === 'all' || c === cat ? '' : 'none';
    });
  }

  function setPressed(targetBtn) {
    filterBtns.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn === targetBtn ? 'true' : 'false');
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-sx-filter') || 'all';
      setPressed(btn);
      applyFilter(cat);
    });
  });

  // Support URL hash navigation: games.html#slots
  var hash = window.location.hash ? window.location.hash.replace('#', '') : '';
  if (hash) {
    var match = filterBtns.find(function (btn) {
      return (btn.getAttribute('data-sx-filter') || '') === hash;
    });
    if (match) {
      var cat = match.getAttribute('data-sx-filter') || 'all';
      setPressed(match);
      applyFilter(cat);
    }
  }
})();
