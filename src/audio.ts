/**
 * Mesin suara GitarRoom — 100% Web Audio, tanpa file eksternal.
 * Petikan gitar disintesis pakai algoritma Karplus-Strong (terdengar seperti senar asli).
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const pluckCache = new Map<string, AudioBuffer>();

let muted = false;
try {
  muted = localStorage.getItem("gitarroom-muted") === "1";
} catch {
  /* abaikan */
}

function ac(): AudioContext | null {
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.8;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(m: boolean): void {
  muted = m;
  try {
    localStorage.setItem("gitarroom-muted", m ? "1" : "0");
  } catch {
    /* abaikan */
  }
  if (master && ctx) master.gain.setTargetAtTime(m ? 0 : 0.8, ctx.currentTime, 0.01);
}

/** Satu petikan senar Karplus-Strong, di-cache per frekuensi. */
function pluckBuffer(context: AudioContext, freq: number): AudioBuffer {
  const key = freq.toFixed(1);
  const hit = pluckCache.get(key);
  if (hit) return hit;
  const rate = context.sampleRate;
  const len = Math.floor(rate * 1.8);
  const buf = context.createBuffer(1, len, rate);
  const out = buf.getChannelData(0);
  const period = Math.max(2, Math.round(rate / freq));
  for (let i = 0; i < period; i++) out[i] = (Math.random() * 2 - 1) * 0.6;
  const decay = 0.996;
  for (let i = period; i < len; i++) {
    const prev = i - period - 1 < 0 ? out[i - period] : out[i - period - 1];
    out[i] = decay * 0.5 * (out[i - period] + prev);
  }
  if (pluckCache.size > 64) pluckCache.clear();
  pluckCache.set(key, buf);
  return buf;
}

type Voice = { stop: () => void };
let voices: Voice[] = [];
let endTimer: ReturnType<typeof setTimeout> | null = null;

/* --- Status playback tab (biar tombol ▶/⏹ sinkron) --- */
let seq = 0;
let activeId: number | null = null;
const subs = new Set<(id: number | null) => void>();

function notify(): void {
  subs.forEach((fn) => {
    try {
      fn(activeId);
    } catch {
      /* abaikan */
    }
  });
}

export function subscribePlayback(fn: (id: number | null) => void): () => void {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}

export function activePlayback(): number | null {
  return activeId;
}

export function stopAll(): void {
  voices.forEach((voice) => {
    try {
      voice.stop();
    } catch {
      /* abaikan */
    }
  });
  voices = [];
  if (endTimer) {
    clearTimeout(endTimer);
    endTimer = null;
  }
  if (activeId !== null) {
    activeId = null;
    notify();
  }
}

function pluckAt(freq: number, when: number, gain = 0.5): void {
  const context = ac();
  if (!context || !master) return;
  const src = context.createBufferSource();
  src.buffer = pluckBuffer(context, freq);
  const g = context.createGain();
  g.gain.value = gain;
  src.connect(g);
  g.connect(master);
  const voice: Voice = {
    stop: () => {
      try {
        src.stop();
      } catch {
        /* abaikan */
      }
    },
  };
  voices.push(voice);
  src.onended = () => {
    voices = voices.filter((v) => v !== voice);
  };
  src.start(context.currentTime + when);
}

/** Frekuensi senar los standar, urutan senar 6 → 1 (E rendah → e tinggi). */
export const OPEN_STRINGS = [82.41, 110, 146.83, 196, 246.94, 329.63] as const;

export function fretFreq(stringNo: 1 | 2 | 3 | 4 | 5 | 6, fret: number): number {
  return OPEN_STRINGS[6 - stringNo] * Math.pow(2, fret / 12);
}

/** Genjreng satu chord. `frets` urutan senar 6 → 1, "x" = jangan dibunyikan. */
export function strum(frets: readonly (number | "x")[], gap = 0.035): void {
  frets.forEach((fret, index) => {
    if (fret === "x") return;
    pluckAt(OPEN_STRINGS[index] * Math.pow(2, Number(fret) / 12), index * gap);
  });
}

function tone(
  freq: number,
  at: number,
  dur: number,
  type: OscillatorType = "triangle",
  gain = 0.2,
): void {
  const context = ac();
  if (!context || !master) return;
  const osc = context.createOscillator();
  const g = context.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t = context.currentTime + at;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

export function coin(): void {
  tone(987.77, 0, 0.09, "square", 0.1);
  tone(1318.5, 0.09, 0.28, "square", 0.1);
}

export function buy(): void {
  tone(1318.5, 0, 0.09, "square", 0.1);
  tone(987.77, 0.09, 0.2, "square", 0.1);
}

export function deny(): void {
  tone(220, 0, 0.12, "sawtooth", 0.08);
  tone(174, 0.12, 0.18, "sawtooth", 0.08);
}

export function click(): void {
  tone(660, 0, 0.05, "sine", 0.12);
}

export function fanfare(): void {
  [329.63, 392, 440, 493.88, 587.33, 659.25].forEach((freq, i) => pluckAt(freq, i * 0.09));
}

export type MelodyNote = { s: 1 | 2 | 3 | 4 | 5 | 6; f: number; b: number };

/** Mainkan deretan not tab. Mengembalikan id playback (buat tombol ⏹). */
export function playTab(notes: readonly MelodyNote[], tempo = 120): number {
  stopAll();
  const secPerBeat = 60 / tempo;
  let t = 0.06;
  for (const note of notes) {
    pluckAt(fretFreq(note.s, note.f), t);
    t += note.b * secPerBeat;
  }
  activeId = ++seq;
  const id = activeId;
  notify();
  endTimer = setTimeout(() => {
    if (activeId === id) {
      activeId = null;
      notify();
    }
    endTimer = null;
  }, (t + 0.5) * 1000);
  return id;
}
