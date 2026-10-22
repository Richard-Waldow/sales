/* Version 7: the middle of #problem, one sentence between demand and supply, the key words weighted. It names the
   bigger problem, surplus stock nobody offers. And the pellets stay clear of the heading and the line under it: the
   granule canvas is faded out above the bottom of that text, measured, so it holds at any width. */
(() => {
  const host = document.getElementById('glue6'); if (!host) return;
  const lang = () => window.UI?.lang || document.documentElement.lang || 'de';
  const L = (en, de) => (lang() === 'de' ? de : en);
  const render = () => { host.innerHTML = `<p class="gl6-txt">${L('Today <b>surplus stock</b> sits in the warehouse, because nobody sees <em>which customer needs it</em>.', 'Heute liegt <b>Überbestand</b> im Lager, weil niemand sieht, <em>welcher Kunde ihn braucht</em>.')}</p>`; };
  const cv = document.getElementById('granules'), text = document.querySelector('#problem .hero-title');
  const clear = () => {
    if (!cv || !text) return;
    const y = text.getBoundingClientRect().bottom - cv.getBoundingClientRect().top + 16;
    const m = `linear-gradient(to bottom, transparent 0, transparent ${y}px, #000 ${y + 90}px)`;
    cv.style.webkitMaskImage = m; cv.style.maskImage = m;
  };
  render(); clear();
  new ResizeObserver(clear).observe(document.getElementById('problem') || document.body);
  document.fonts?.ready.then(clear);
  window.UI?.onLang(() => { render(); requestAnimationFrame(clear); });
})();
