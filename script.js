(function () {
  var root = document.documentElement;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function setTheme(t) {
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t);
    else root.removeAttribute('data-theme');
    document.querySelectorAll('[data-theme-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.themeSet === (t || 'system')));
    });
  }
  function setAccent(c) {
    root.style.setProperty('--accent', c);
    document.querySelectorAll('.swatch').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.c.toLowerCase() === c.toLowerCase()));
    });
  }

  // applicato subito per evitare il flash di tema sbagliato
  var t0 = get('theme'); if (t0 === 'light' || t0 === 'dark') root.setAttribute('data-theme', t0);
  var a0 = get('accent'); if (a0) root.style.setProperty('--accent', a0);

  document.addEventListener('DOMContentLoaded', function () {
    setTheme(get('theme') || 'system');
    if (a0) setAccent(a0);
    document.querySelectorAll('[data-theme-set]').forEach(function (b) {
      b.addEventListener('click', function () { setTheme(b.dataset.themeSet); put('theme', b.dataset.themeSet); });
    });
    document.querySelectorAll('.swatch').forEach(function (b) {
      b.addEventListener('click', function () { setAccent(b.dataset.c); put('accent', b.dataset.c); });
    });
    var prefs = document.querySelector('.prefs');
    document.addEventListener('click', function (e) { if (prefs && !prefs.contains(e.target)) prefs.removeAttribute('open'); });
    var y = document.getElementById('anno'); if (y) y.textContent = new Date().getFullYear();
  });
})();
