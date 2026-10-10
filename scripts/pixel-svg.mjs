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
toSvg("guitar", [
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
], {
  w: "#7a4a26", // headstock + bayangan
  G: "#f3ad32", // tuner + bridge emas
  S: "#f2e6c8", // senar
  N: "#d9a066", // neck
  f: "#8a5a33", // fret
  W: "#b66f3e", // body kayu
  L: "#d98e4a", // highlight body
  H: "#2b1a12", // lubang suara
}, 6);

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
