// Revelação ao rolar. Só anima o que ainda está ABAIXO da tela no carregamento:
// nada visível pisca, e sem JS (ou com "menos movimento") tudo aparece normal.
const SELECTOR = [
  'main .section-head',
  'main .plate',
  'main .tile',
  'main .faq-item',
  'main .reveal-item',
].join(',');

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const vh = window.innerHeight;
  const els = [...document.querySelectorAll<HTMLElement>(SELECTOR)].filter(
    (el) => el.getBoundingClientRect().top > vh,
  );
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  const set = new Set(els);
  for (const el of els) {
    // Escalonamento leve entre irmãos (cartões de uma mesma grade).
    const siblings = [...(el.parentElement?.children ?? [])].filter((c) =>
      set.has(c as HTMLElement),
    );
    el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 5) * 70}ms`);
    el.classList.add('reveal');
    io.observe(el);
  }
}
