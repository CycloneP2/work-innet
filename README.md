# GitarRoom · Studio Belajar Gitar 🎸

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

## Struktur

| Path | Isi |
|---|---|
| `src/company.config.ts` | Nama brand, 5 ruangan musik, instruktur + staf (5 bahasa) |
| `src/music-lessons.ts` | Materi gitar + diagram chord per ruangan |
| `src/ChordChart.tsx` | Komponen diagram chord (6 senar × 5 fret) |
| `src/DemoApp.tsx` | Bar atas + panel materi gitar |
| `src/game/office-world.ts` | Dunia tile 72×30: ruangan, kursi, perabot |
| `src/OfficeWorld.tsx` | Renderer + mesin gerak karakter |
| `src/i18n.ts` | Kamus UI 5 bahasa |

## Ganti nama company

Nama sementara **GitarRoom** — ganti di `COMPANY` dalam `src/company.config.ts`
(nama, mark, judul, deskripsi, tagline), lalu judul di `index.html`.

## Hak

Aset pixel & sebagian logika gerak dari pihak ketiga (MIT/CC0) — lihat
[THIRD-PARTY.md](THIRD-PARTY.md). Sisanya untuk dilihat dan dipelajari;
penyebaran ulang / pemakaian komersial butuh izin pemegang hak aset dasar.
