import type { Locale } from "./i18n";

export type Daily = {
  id: string;
  coins: number;
  xp: number;
  title: Partial<Record<Locale, string>>;
  hint: Partial<Record<Locale, string>>;
};

/** Kolam misi harian — tiap hari diambil 3 secara deterministik dari tanggal. */
export const DAILY_POOL: readonly Daily[] = [
  {
    id: "d-chromatic", coins: 8, xp: 10,
    title: { en: "5-min chromatic workout", id: "Latihan chromatic 5 menit" },
    hint: { en: "1-2-3-4 up and down every string", id: "1-2-3-4 naik-turun tiap senar" },
  },
  {
    id: "d-tune", coins: 5, xp: 8,
    title: { en: "Tune up & check each string", id: "Stem + cek tiap senar" },
    hint: { en: "E–A–D–G–B–E, then pluck clean", id: "E–A–D–G–B–E, lalu petik bersih" },
  },
  {
    id: "d-full-song", coins: 12, xp: 15,
    title: { en: "1 full song, no stopping", id: "1 lagu full tanpa berhenti" },
    hint: { en: "Intro to outro in one take", id: "Intro sampai outro sekali jalan" },
  },
  {
    id: "d-new-chord", coins: 8, xp: 10,
    title: { en: "Drill 1 new chord for 5 min", id: "Latih 1 chord baru 5 menit" },
    hint: { en: "Pick one you always buzz", id: "Pilih yang paling sering buzz" },
  },
  {
    id: "d-finger", coins: 8, xp: 10,
    title: { en: "5-min fingerstyle picking", id: "Petikan fingerstyle 5 menit" },
    hint: { en: "Bass–3–2–1–2–3, steady", id: "Bass–3–2–1–2–3 yang stabil" },
  },
  {
    id: "d-strum80", coins: 8, xp: 10,
    title: { en: "Strumming at 80 BPM, 5 min", id: "Strumming 80 BPM 5 menit" },
    hint: { en: "D–DU–UDU with a metronome", id: "D–DU–UDU + metronom" },
  },
  {
    id: "d-record1", coins: 10, xp: 12,
    title: { en: "Record 1 minute of playing", id: "Rekam 1 menit permainanmu" },
    hint: { en: "Listen back, note 1 fix", id: "Dengarkan ulang, catat 1 perbaikan" },
  },
  {
    id: "d-hammer", coins: 8, xp: 10,
    title: { en: "Hammer-on & pull-off, 5 min", id: "Hammer-on & pull-off 5 menit" },
    hint: { en: "5h7p5 on every string", id: "5h7p5 di tiap senar" },
  },
  {
    id: "d-prog", coins: 10, xp: 12,
    title: { en: "D–A–Bm–G for 10 rounds", id: "D–A–Bm–G 10 putaran" },
    hint: { en: "The Canon progression!", id: "Progresi Canon!" },
  },
];

/** Kunci tanggal lokal: "2026-10-10". */
export function todayKey(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** 3 misi hari ini — sama untuk semua pemain di tanggal yang sama. */
export function pickDailies(key: string): Daily[] {
  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const out: Daily[] = [];
  for (let k = 0; k < 3; k++) out.push(DAILY_POOL[(hash + k * 3) % DAILY_POOL.length]);
  return out;
}

export function dailyText(daily: Daily, field: "title" | "hint", locale: Locale): string {
  return daily[field][locale] ?? daily[field].en ?? daily[field].id ?? "";
}
