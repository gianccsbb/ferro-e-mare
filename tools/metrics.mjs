// Mede o peso do site construído (dist/) como um visitante o baixaria.
// Uso: npm run build && npm run metrics
// Texto (HTML/CSS/JS/SVG) é contado comprimido em gzip; fontes e fotos, como estão.
// Imagens: em cada <picture>, conta o maior AVIF (pior caso; o navegador costuma baixar um menor).
import { readFileSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const gz = (buf) => gzipSync(buf, { level: 9 }).length;
const kb = (n) => Math.round((n / 1024) * 10) / 10;

function page(path) {
  const html = readFileSync(join(dist, path));
  const src = html.toString();
  const urls = new Set();
  // Scripts e CSS do Astro, fontes pré-carregadas, ícones SVG.
  for (const m of src.matchAll(/(?:src|href)="(\/[^"#?]+\.(?:js|css|woff2|svg))"/g)) urls.add(m[1]);
  // Módulos JS importados por outros módulos (ex.: booking.*.js).
  const queue = [...urls].filter((u) => u.endsWith('.js'));
  while (queue.length) {
    const u = queue.pop();
    const body = readFileSync(join(dist, u), 'utf8');
    for (const m of body.matchAll(/(?:from|import)\s*\(?"\.\/([^"]+\.js)"/g)) {
      const dep = '/_astro/' + m[1];
      if (!urls.has(dep)) (urls.add(dep), queue.push(dep));
    }
  }
  // Fontes referenciadas dentro do CSS.
  const css = [...urls].filter((u) => u.endsWith('.css'));
  for (const c of css) {
    const body = readFileSync(join(dist, c), 'utf8');
    for (const m of body.matchAll(/url\((\/[^)]+\.woff2)\)/g)) urls.add(m[1]);
  }
  // CSS inline do Astro fica no HTML; JS inline também (contados no HTML).
  let js = 0,
    cssB = 0,
    fonts = 0,
    other = 0;
  for (const u of urls) {
    const f = join(dist, u);
    if (!existsSync(f)) continue;
    const buf = readFileSync(f);
    if (u.endsWith('.js')) js += gz(buf);
    else if (u.endsWith('.css')) cssB += gz(buf);
    else if (u.endsWith('.woff2')) fonts += buf.length;
    else other += gz(buf);
  }
  // Fotos: maior candidato AVIF de cada <picture>.
  let images = 0,
    imageCount = 0;
  for (const pic of src.matchAll(/<picture[^>]*>[\s\S]*?<\/picture>/g)) {
    const tag = pic[0].match(/<source[^>]*type="image\/avif"[^>]*>/)?.[0];
    const set = tag?.match(/srcset="([^"]+)"/)?.[1];
    if (!set) continue;
    const files = set.split(',').map((s) => s.trim().split(/\s+/)[0]);
    const sizes = files.map((u) => readFileSync(join(dist, decodeURI(u))).length);
    images += Math.max(...sizes);
    imageCount++;
  }
  const htmlGz = gz(html);
  const total = htmlGz + js + cssB + fonts + other + images;
  return {
    htmlKB: kb(htmlGz),
    cssKB: kb(cssB),
    jsKB: kb(js),
    fontsKB: kb(fonts),
    svgKB: kb(other),
    images: imageCount,
    imagesKB: kb(images),
    firstViewKB: kb(htmlGz + js + cssB + fonts + other), // sem fotos (todas lazy, fora da 1ª tela)
    totalKB: kb(total),
  };
}

const out = {
  measuredAt: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Recife' }),
  home: page('index.html'),
  homeEn: page('en/index.html'),
  thanks: page('obrigado/index.html'),
};
console.log(JSON.stringify(out, null, 2));
