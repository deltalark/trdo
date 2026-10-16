// Clicking an element with data-goto="other-screen" opens that screen, so the design
// can be clicked through in any browser.
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-goto]');
  if (!el) return;
  e.preventDefault();
  location.href = el.dataset.goto.replace(/\.html$/, '') + '.html';
});

// Controls work when clicked: a .switch flips, a .tab (or a child of [data-select])
// becomes the one that's on, [data-toggle] toggles a class on itself, and [data-show]
// shows or hides what its selector names, for menus, accordions and sheets.
(() => {
  if (window.__runoUi) return;
  window.__runoUi = true;
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const sw = t.closest('.switch');
    if (sw) {
      sw.classList.toggle('on');
      sw.setAttribute('aria-checked', String(sw.classList.contains('on')));
    }
    const pick = t.closest('.tab, [role="tab"], [data-select] > *');
    if (pick && pick.parentElement) {
      for (const s of pick.parentElement.children) s.classList.toggle('on', s === pick);
    }
    const tg = t.closest('[data-toggle]');
    if (tg) tg.classList.toggle(tg.dataset.toggle || 'on');
    const sh = t.closest('[data-show]');
    if (sh) {
      for (const el of document.querySelectorAll(sh.dataset.show)) el.hidden = !el.hidden;
    }
  });
})();
