import type { LocalizedText } from "./i18n";

/**
 * Obrolan NPC — kalimat pendek yang muncul di bubble chat warga.
 * Ditulis dalam Indonesia + Inggris; bahasa lain fallback ke Inggris.
 */

export type ChatterLine = {
  rooms?: readonly string[];
  tone: "talk" | "think";
  en: string;
  id: string;
};

type RawLine = Omit<ChatterLine, "tone"> & { tone?: ChatterLine["tone"] };

const RAW_CHATTER: readonly RawLine[] = [
  // --- umum ---
  { en: "Tuned your guitar today?", id: "Udah stem gitar hari ini?" },
  { en: "Sore fingers = progress! 🎸", id: "Jari pedes = progres! 🎸" },
  { en: "Try G–Em–C–D!", id: "Coba G–Em–C–D deh!" },
  { en: "Tempo first, speed later", id: "Tempo dulu, speed belakangan" },
  { en: "Listen to the song 10 times!", id: "Dengerin lagunya 10x!" },
  { en: "The metronome is your friend ⏱", id: "Metronom itu sahabatmu ⏱" },
  { en: "Wrong fret? Replay it slowly", id: "Salah fret? Ulangi pelan-pelan" },
  { en: "Gig tomorrow! 😬", id: "Besok manggung! 😬" },
  { en: "High E snapped again…", id: "Senar 1 putus lagi…" },
  { en: "15 focused minutes is enough", id: "15 menit fokus cukup kok" },
  { en: "Capo on 2, instant easy mode", id: "Capo di fret 2, auto gampang" },
  { en: "Relax those shoulders~", id: "Jangan tegang bahunya~" },
  // --- per ruangan ---
  { rooms: ["briefing"], en: "E–A–D–G–B–E, memorize it!", id: "E–A–D–G–B–E, hafalin!" },
  { rooms: ["briefing"], en: "G chord hard? Totally normal 😅", id: "Chord G susah? Wajar 😅" },
  { rooms: ["research"], en: "Down–DU–UDU! 🥁", id: "Down–DU–UDU! 🥁" },
  { rooms: ["research"], en: "80 BPM smashed! 🔥", id: "80 BPM tembus! 🔥" },
  { rooms: ["ideas"], en: "Which song today? 🎵", id: "Lagu apa hari ini? 🎵" },
  { rooms: ["ideas"], en: "Try picking, not strumming", id: "Coba petik, jangan genjreng" },
  { rooms: ["studio"], en: "1–2–3, go! 🤘", id: "1–2–3, mulai! 🤘" },
  { rooms: ["studio"], en: "Tight! One more take!", id: "Kompak! Sekali lagi!" },
  { rooms: ["archive"], en: "Filled your log yet?", id: "Jurnalmu udah diisi?" },
  { rooms: ["archive"], en: "New chord: Dm! 📚", id: "Chord baru: Dm! 📚" },
  // --- gumaman ---
  { tone: "think", en: "F… why so hard…", id: "F… kenapa susah banget…" },
  { tone: "think", en: "Tomorrow I'll nail it 💪", id: "Besok pasti bisa 💪" },
];

/** Default tone = "talk" kalau tidak disebut. */
export const CHATTER: readonly ChatterLine[] = RAW_CHATTER.map((line) => ({
  tone: "talk" as const,
  ...line,
}));

/** Sapaan balasan kalau disapa pemain. */
export const HELLOS: readonly { en: string; id: string }[] = [
  { en: "Hello! 👋", id: "Halo! 👋" },
  { en: "Hey! What are you practicing?", id: "Hai! Latihan apa hari ini?" },
  { en: "Yo! 🤘", id: "Yo! 🤘" },
  { en: "Hi, keep going! 💪", id: "Halo, semangat! 💪" },
  { en: "Hey hey! 🎸", id: "Hai hai! 🎸" },
];

export function chatterToLocalized(line: { en: string; id: string }): LocalizedText {
  return { ko: line.en, en: line.en, zh: line.en, vi: line.en, id: line.id };
}

/** 55% kalimat sesuai ruangan aktif (kalau ada), sisanya acak. */
export function pickChatter(activeRoomId: string | null): ChatterLine {
  const roomLines = activeRoomId
    ? CHATTER.filter((line) => line.rooms?.includes(activeRoomId))
    : [];
  if (roomLines.length > 0 && Math.random() < 0.55) {
    return roomLines[Math.floor(Math.random() * roomLines.length)];
  }
  const general = CHATTER.filter((line) => !line.rooms);
  return general[Math.floor(Math.random() * general.length)];
}

export function pickHello(): { en: string; id: string } {
  return HELLOS[Math.floor(Math.random() * HELLOS.length)];
}
