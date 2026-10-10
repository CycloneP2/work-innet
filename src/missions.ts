import type { Locale } from "./i18n";

/** Urutan ruangan di mode Story — selesaikan semua misi buat buka ruangan berikut. */
export const ROOM_ORDER = ["briefing", "research", "ideas", "studio", "archive"] as const;

export type Mission = {
  id: string;
  roomId: string;
  coins: number;
  xp: number;
  title: Partial<Record<Locale, string>>;
  hint: Partial<Record<Locale, string>>;
};

export const MISSIONS: readonly Mission[] = [
  // --- 01 Music Room · Gitar Dasar ---
  {
    id: "b1-tune-up", roomId: "briefing", coins: 10, xp: 20,
    title: { en: "Tune your guitar", id: "Stem gitarmu" },
    hint: { en: "E–A–D–G–B–E with a phone tuner", id: "E–A–D–G–B–E pakai tuner HP" },
  },
  {
    id: "b2-first-chords", roomId: "briefing", coins: 15, xp: 30,
    title: { en: "Play G–Em–C–D for 8 rounds", id: "Mainkan G–Em–C–D 8 putaran" },
    hint: { en: "Slow downstrokes, no stopping", id: "Downstroke pelan, tanpa berhenti" },
  },
  {
    id: "b3-clean-pluck", roomId: "briefing", coins: 15, xp: 30,
    title: { en: "Pluck every string clean", id: "Petik bersih tiap senar" },
    hint: { en: "Listen back — zero buzz", id: "Dengarkan ulang, tanpa buzz" },
  },
  // --- 02 Lab Chord & Strumming ---
  {
    id: "r1-pairs", roomId: "research", coins: 15, xp: 30,
    title: { en: "Drill C↔G and D↔Em at 60 BPM", id: "Latih C↔G dan D↔Em di 60 BPM" },
    hint: { en: "Gapless changes with a metronome", id: "Pindah tanpa jeda + metronom" },
  },
  {
    id: "r2-pattern", roomId: "research", coins: 20, xp: 40,
    title: { en: "Nail the D–DU–UDU pattern", id: "Kuasai pola D–DU–UDU" },
    hint: { en: "Relaxed wrist, 4 clean rounds", id: "Pergelangan rileks, 4 putaran bersih" },
  },
  {
    id: "r3-tempo-up", roomId: "research", coins: 20, xp: 40,
    title: { en: "Reach 80 BPM with zero buzz", id: "Tembus 80 BPM tanpa fals" },
    hint: { en: "+5 BPM at a time", id: "Naik 5 BPM bertahap" },
  },
  // --- 03 Ruang Lagu ---
  {
    id: "s1-first-song", roomId: "ideas", coins: 20, xp: 40,
    title: { en: "Pick & play 1 full song", id: "Pilih & mainkan 1 lagu full" },
    hint: { en: "Any 4-chord song, intro to outro", id: "Lagu 4-chord apa aja, intro–outro" },
  },
  {
    id: "s2-dynamics", roomId: "ideas", coins: 15, xp: 30,
    title: { en: "Soft verse, loud chorus", id: "Verse pelan, chorus keras" },
    hint: { en: "That's dynamics — feel the contrast", id: "Itu dinamika — rasakan bedanya" },
  },
  {
    id: "s3-record", roomId: "ideas", coins: 20, xp: 40,
    title: { en: "Record your practice once", id: "Rekam latihanmu 1x" },
    hint: { en: "Phone recording is enough", id: "Rekaman HP cukup" },
  },
  // --- 04 Studio Latihan ---
  {
    id: "j1-blues", roomId: "studio", coins: 20, xp: 40,
    title: { en: "Jam 12-bar blues in E", id: "Jamming 12-bar blues di E" },
    hint: { en: "E–A–B7, loop it", id: "E–A–B7, looping terus" },
  },
  {
    id: "j2-tight", roomId: "studio", coins: 25, xp: 50,
    title: { en: "Tight intro-to-outro with a friend", id: "Intro–outro kompak bareng teman" },
    hint: { en: "Split rhythm vs melody roles", id: "Bagi peran rhythm vs melodi" },
  },
  {
    id: "j3-gig-ready", roomId: "studio", coins: 25, xp: 50,
    title: { en: "One full nonstop rehearsal", id: "Gladi full set 1x nonstop" },
    hint: { en: "No stopping, like a real gig", id: "Tanpa berhenti, kayak manggung" },
  },
  // --- 05 Pustaka Lagu ---
  {
    id: "a1-log-week", roomId: "archive", coins: 20, xp: 40,
    title: { en: "Complete 1 week of logs", id: "Lengkapi jurnal 1 minggu" },
    hint: { en: "Date, minutes, 1 improvement", id: "Tanggal, durasi, 1 hal membaik" },
  },
  {
    id: "a2-five-chords", roomId: "archive", coins: 25, xp: 50,
    title: { en: "Nail 5 new chords", id: "Kuasai 5 chord baru" },
    hint: { en: "Clean for 4 rounds each", id: "Bersih 4 putaran tiap chord" },
  },
  {
    id: "a3-perform", roomId: "archive", coins: 30, xp: 60,
    title: { en: "Perform 1 song (record it)", id: "Tampil 1 lagu (rekam)" },
    hint: { en: "Your first gig — camera on!", id: "Manggung pertamamu — kamera nyala!" },
  },
];

export function missionText(
  mission: Mission,
  field: "title" | "hint",
  locale: Locale,
): string {
  return mission[field][locale] ?? mission[field].en ?? mission[field].id ?? "";
}
