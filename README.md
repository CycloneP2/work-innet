# GitarRoom · Studio Belajar Gitar 🎸

**Live:** https://cyclonep2.github.io/work-innet/

Sekolah gitar pixel — dari chord pertama sampai manggung pertama.
Dibangun di atas demo desain kantor pixel (lihat [THIRD-PARTY.md](THIRD-PARTY.md) untuk atribusi aset).

## Konsep ruangan

| Kode | Ruangan | Isi belajar |
|------|---------|-------------|
| 01 | Music Room · Gitar Dasar | Pegang gitar, tuning E–A–D–G–B–E, chord G–C–D–Em |
| 02 | Lab Chord & Strumming | Perpindahan chord, pola D–DU–UDU, tempo + metronom |
| 03 | Ruang Lagu | Lagu 4-chord, dinamika, petikan fingerstyle |
| 04 | Studio Latihan | Jamming bareng, 12-bar blues, siap manggung |
| 05 | Pustaka Lagu | Koleksi chord, tab, dan jurnal latihan |

Area bersama: Sudut Teori, Kafe, Ruang Dengar, Kantin.

## Jalanin

```bash
npm install
npm run dev
```

Buka http://localhost:5173 — klik nama ruangan di bar atas untuk mulai kelasnya,
materi + diagram chord muncul di panel samping.

- Ganti bahasa: Indonesia, English, 中文, 한국어, Tiếng Việt (buka dalam Bahasa Indonesia).
- Tombol **Tata sekolah saya**: editor perabot (3 preset gaya, 5–35 orang).

## Mode game: Story vs Bebas

- **📖 Story**: ruangan kebuka berurutan. Selesaikan semua misi di satu ruangan
  buat buka ruangan berikut (+25 🪙 bonus).
- **🆓 Bebas**: semua ruangan langsung kebuka, misi tetap bisa diklaim.
- Tiap misi ngasih **koin 🪙 + XP**; XP naikin **level** (Lv n → n+1 butuh n×100 XP).
- Progres kesimpen otomatis di browser (`localStorage`), ada tombol hapus simpanan.

## Toko, misi harian, suara & tab hadiah

Panel samping punya 4 tab: **📚 Materi · ☀️ Harian · 🎸 Tab · 🛒 Toko**.

- **Toko**: belanja pakai koin — skin gitar (Midnight, Crimson, Emas),
  Double XP (5 misi, bisa ditumpuk), Buka Semua Ruangan, Paket Tab Vol.2.
- **Misi harian**: 3 misi baru tiap hari (reset tengah malam), sama untuk semua pemain.
- **Efek suara**: mesin Web Audio bikinan sendiri (`src/audio.ts`) — petikan gitar
  Karplus-Strong (terdengar seperti senar asli), bunyi koin, fanfare unlock.
  Klik ruangan = genjreng chord ruangan itu. Ada tombol mute 🔊/🔇.
- **Tab hadiah**: selesaikan semua misi satu ruangan → dapat tab lead/solo yang
  bisa dibaca + **diputar suaranya** (tombol ▶). Hadiah pertama = Canon Rock!
  Semua tab adalah aransemen orisinal GitarRoom; "Canon Rock" memakai melodi
  Canon Pachelbel (1694, public domain) + ending rock bikinan sendiri.

## Struktur

| Path | Isi |
|---|---|
| `src/company.config.ts` | Nama brand, 5 ruangan musik, instruktur + staf (5 bahasa) |
| `src/music-lessons.ts` | Materi gitar + diagram chord per ruangan |
| `src/missions.ts` | 15 misi (3 per ruangan) + urutan story |
| `src/game-save.ts` | Save/load, koin, XP/level, sistem unlock |
| `src/ChordChart.tsx` | Komponen diagram chord (6 senar × 5 fret) |
| `src/DemoApp.tsx` | Bar atas + panel materi + UI game |
| `src/game/office-world.ts` | Dunia tile 72×30: ruangan, kursi, perabot |
| `src/OfficeWorld.tsx` | Renderer + mesin gerak karakter |
| `src/i18n.ts` | Kamus UI 5 bahasa |
| `scripts/pixel-svg.mjs` | Generator aset pixel orisinal → `public/gitarroom/` |

## Aset

- `public/gitarroom/` (gitar + 3 skin, koin, pick): **orisinal, milik sendiri**, dibuat dari
  `scripts/pixel-svg.mjs` — bebas dipakai tanpa risiko lisensi.
- Butuh aset tambahan? Ambil yang **CC0** (bebas komersial, tanpa atribusi):
  - Kenney (60.000+ aset, UI + jingle musik): https://kenney.nl/assets
  - Ikon instrumen musik CC0 32×32 (ada gitar): https://opengameart.org/content/cc0-music-icons
  - Efek suara petikan gitar CC0: https://opengameart.org/content/guitar-0
  - FreeGameSprites (20.000+ sprite CC0): https://freegamesprites.com/en
  - itch.io: Pixel Frog, Ansimuz, 0x72 (pack CC0).

## Ganti nama company

Nama sementara **GitarRoom** — ganti di `COMPANY` dalam `src/company.config.ts`
(nama, mark, judul, deskripsi, tagline), lalu judul di `index.html`.

## Hak

Aset pixel & sebagian logika gerak dari pihak ketiga (MIT/CC0) — lihat
[THIRD-PARTY.md](THIRD-PARTY.md). Sisanya untuk dilihat dan dipelajari;
penyebaran ulang / pemakaian komersial butuh izin pemegang hak aset dasar.
