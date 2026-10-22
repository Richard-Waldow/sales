/* Versions 8 and 9: a guide on the right edge. The page is told as the reader's questions (window.GUIDE: section id,
   English, German); the question whose section is in view lights up, a line fills with the progress through the page,
   and a click scrolls to the section. Hidden where the page is narrow. */
(() => {
  const G = window.GUIDE; if (!G) return;
  const lang = () => window.UI?.lang || document.documentElement.lang || 'de';
  const nav = document.createElement('nav'); nav.className = 'gd'; nav.setAttribute('aria-label', 'Guide');
  document.body.append(nav);
  const render = () => {
    nav.innerHTML = `<span class="gd-line"><i></i></span>${G.map(([id, en, de]) => `<a href="#${id}" data-id="${id}"><span>${lang() === 'de' ? de : en}</span><i></i></a>`).join('')}`;
    update();
  };
  const secs = () => G.map(([id]) => document.getElementById(id)).filter(Boolean);
  function update() {
    const mid = innerHeight * .45; let cur = G[0][0];
    for (const s of secs()) if (s.getBoundingClientRect().top < mid) cur = s.id;
    nav.querySelectorAll('a').forEach(a => a.classList.toggle('on', a.dataset.id === cur));
    const max = document.documentElement.scrollHeight - innerHeight;
    nav.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max) : 0);
    nav.classList.toggle('show', scrollY > innerHeight * .4);
  }
  let raf = 0; addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', update);
  render();
  window.UI?.onLang(render);
})();
