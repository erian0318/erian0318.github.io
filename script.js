document.addEventListener('DOMContentLoaded', function () {
  const trigger = document.getElementById('menuTrigger');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerClose');

  function openDrawer(){
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  }
  function closeDrawer(){
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  }

  trigger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  overlay.addEventListener('click', closeDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
});
// Кнопка "Назад" — на всех страницах, кроме главной
(function () {
  const isHome = document.body.contains(document.querySelector('a[href="index.html"].logo'))
    ? location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/')
    : location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/');

  if (isHome) return;

  const btn = document.createElement('a');
  btn.href = '#';
  btn.className = 'back-button';
  btn.setAttribute('aria-label', 'Вернуться назад');
  btn.textContent = '← Назад';

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });

  document.body.appendChild(btn);
})();
