// GitarRoom original pixel-art assets, generated from ASCII maps.
// 100% milik sendiri — tanpa risiko lisensi. Ubah map-nya, jalanin ulang:
//   node scripts/pixel-svg.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "gitarroom");
mkdirSync(outDir, { recursive: true });

function toSvg(name, rows, palette, scale = 4) {
  const width = rows[0].length;
  for (const row of rows) {
    if (row.length !== width) throw new Error(`${name}: ragged row "${row}"`);
  }
  let rects = "";
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === ".") return;
      const fill = palette[ch];
      if (!fill) throw new Error(`${name}: no color for "${ch}"`);
      rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`;
    });
  });
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${rows.length}" ` +
    `width="${width * scale}" height="${rows.length * scale}" shape-rendering="crispEdges" ` +
    `role="img" aria-label="${name}">${rects}</svg>\n`;
  writeFileSync(join(outDir, `${name}.svg`), svg);
  console.log(`wrote public/gitarroom/${name}.svg (${width}x${rows.length})`);
}

// --- Gitar akustik 12x20 (headstock, neck, body + lubang suara) ---
// Varian warna = skin gitar yang bisa dibeli di toko.
const GUITAR_ROWS = [
  "....wwww....",
  "..G.wwww.G..",
  "....wwww....",
  ".....SN.....",
  ".....SN.....",
  ".....ff.....",
  ".....SN.....",
  ".....SN.....",
  ".....ff.....",
  ".....SN.....",
  "...WWWWWW...",
  "..LWWWWWWw..",
  ".LWWWWWWWWw.",
  ".LWWWHHHWWw.",
  ".LWWWHHHWWw.",
  ".LWWWSSWWWw.",
  ".LWWWSSWWWw.",
  "..WWWSSWWW..",
  "..WWGGGGWW..",
  "...WWWWWW...",
];
const GUITAR_PALETTES = {
  classic: { w: "#7a4a26", G: "#f3ad32", S: "#f2e6c8", N: "#d9a066", f: "#8a5a33", W: "#b66f3e", L: "#d98e4a", H: "#2b1a12" },
  midnight: { w: "#1f3a5f", G: "#9fd0ff", S: "#e8f2ff", N: "#8fa8c8", f: "#33475e", W: "#3b6ea5", L: "#7fb3e6", H: "#0e1a2b" },
  crimson: { w: "#5f1f1f", G: "#ffd166", S: "#ffe8e0", N: "#c88f8f", f: "#5e3333", W: "#a53b3b", L: "#e67f7f", H: "#2b0e0e" },
  gold: { w: "#6b4a12", G: "#fff3c4", S: "#fff8e0", N: "#d9b45f", f: "#6b4a12", W: "#c9932e", L: "#ffe3a3", H: "#241a08" },
};
for (const [name, palette] of Object.entries(GUITAR_PALETTES)) {
  toSvg(name === "classic" ? "guitar" : `guitar-${name}`, GUITAR_ROWS, palette, 6);
}

// --- Koin 10x10 ---
toSvg("coin", [
  "...OOOO...",
  "..OGGGGO..",
  ".OGWWGGGO.",
  "OGGWGGGGGO",
  "OGGGGGGGGO",
  "OGGGGGGGGO",
  "OGGGGGGGGO",
  ".OGGGGGGO.",
  "..OGGGGO..",
  "...OOOO...",
], {
  O: "#8a5a1a",
  G: "#f3ad32",
  W: "#ffe3a3",
}, 4);

// --- Pick gitar 7x8 (ikon level) ---
toSvg("pick", [
  "...EE...",
  "..EPPE..",
  "..EPPE..",
  ".EPPPPE.",
  ".EPPPPE.",
  "..EPPE..",
  "...EE...",
  "...EE...",
], {
  E: "#a33d72",
  P: "#ef71b4",
}, 4);

console.log("done.");
