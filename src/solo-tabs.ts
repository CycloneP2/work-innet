import type { Locale, LocalizedText } from "./i18n";
import { roomFinished, type SaveData } from "./game-save";
import type { MelodyNote } from "./audio";

/**
 * Tab lead/solo hadiah. SEMUA tab di bawah ini aransemen orisinal GitarRoom.
 * "Canon Rock" di sini memakai melodi Canon Pachelbel (1694, public domain)
 * + ending rock bikinan sendiri — BUKAN jiplakan aransemen JerryC.
 *
 * Not: s = nomor senar (1 = e tinggi … 6 = E rendah), f = fret, b = ketuk.
 */

export type SoloTab = {
  id: string;
  tempo: number;
  source: { roomId: string } | { pack: "vol2" };
  title: LocalizedText;
  desc: LocalizedText;
  notes: readonly MelodyNote[];
};

const N = (s: 1 | 2 | 3 | 4 | 5 | 6, f: number, b: number): MelodyNote => ({ s, f, b });

export const SOLO_TABS: readonly SoloTab[] = [
  {
    id: "canon-rock",
    tempo: 132,
    source: { roomId: "briefing" },
    title: {
      ko: "캐논 락 (GitarRoom 편곡)",
      en: "Canon Rock (GitarRoom arrangement)",
      zh: "卡农摇滚（GitarRoom 改编版）",
      vi: "Canon Rock (bản phối GitarRoom)",
      id: "Canon Rock (Aransemen GitarRoom)",
    },
    desc: {
      ko: "파헬벨 캐논(1694, 퍼블릭 도메인) 멜로디 + 오리지널 록 엔딩.",
      en: "Pachelbel's Canon melody (1694, public domain) + an original rock ending.",
      zh: "帕赫贝尔卡农（1694，公有领域）旋律 + 原创摇滚结尾。",
      vi: "Giai điệu Canon của Pachelbel (1694, phạm vi công cộng) + đoạn kết rock nguyên bản.",
      id: "Melodi Canon Pachelbel (1694, public domain) + ending rock orisinal.",
    },
    notes: [
      N(1, 2, 0.5), N(1, 0, 0.5), N(2, 3, 0.5), N(2, 2, 0.5),
      N(2, 0, 0.5), N(3, 2, 0.5), N(3, 4, 0.5), N(3, 6, 1),
      N(3, 7, 0.5), N(2, 5, 0.5), N(2, 3, 0.5), N(2, 2, 1.5),
    ],
  },
  {
    id: "blues-licks",
    tempo: 100,
    source: { roomId: "research" },
    title: {
      ko: "E 블루스 릭",
      en: "Blues Licks in E",
      zh: "E 调布鲁斯乐句",
      vi: "Câu blues giọng E",
      id: "Blues Licks in E",
    },
    desc: {
      ko: "E 마이너 펜타토닉 오리지널 블루스 릭.",
      en: "Original blues licks in E minor pentatonic.",
      zh: "E 小调五声音阶原创布鲁斯乐句。",
      vi: "Câu blues nguyên bản trên thang âm E minor pentatonic.",
      id: "Lick blues orisinal di E minor pentatonik.",
    },
    notes: [
      N(1, 0, 0.5), N(1, 3, 0.5), N(2, 0, 0.5), N(2, 3, 0.5),
      N(3, 0, 0.5), N(3, 2, 0.5), N(4, 2, 0.5), N(4, 0, 1),
      N(5, 2, 0.5), N(4, 2, 0.5), N(5, 0, 1.5),
    ],
  },
  {
    id: "finger-etude",
    tempo: 96,
    source: { roomId: "ideas" },
    title: {
      ko: "핑거스타일 에튀드 1번",
      en: "Fingerstyle Etude No.1",
      zh: "指弹练习曲第 1 号",
      vi: "Etude fingerstyle số 1",
      id: "Etude Fingerstyle No.1",
    },
    desc: {
      ko: "C–G 아르페지오, 트래비스 피킹 스타일.",
      en: "C–G arpeggios, Travis-picking style.",
      zh: "C–G 琶音，Travis 拨弦风格。",
      vi: "Arpeggio C–G theo kiểu Travis picking.",
      id: "Arpeggio C–G ala Travis picking.",
    },
    notes: [
      N(5, 3, 0.5), N(4, 2, 0.5), N(3, 0, 0.5), N(2, 1, 0.5), N(3, 0, 0.5), N(4, 2, 0.5),
      N(6, 3, 0.5), N(4, 0, 0.5), N(3, 0, 0.5), N(2, 0, 0.5), N(3, 0, 0.5), N(4, 0, 0.5),
      N(6, 3, 1.5),
    ],
  },
  {
    id: "stage-solo",
    tempo: 140,
    source: { roomId: "studio" },
    title: {
      ko: "스테이지 솔로 1번",
      en: "Stage Solo No.1",
      zh: "舞台独奏第 1 号",
      vi: "Solo sân khấu số 1",
      id: "Stage Solo No.1",
    },
    desc: {
      ko: "5프렛부터 8프렛까지 A 마이너 펜타토닉 런.",
      en: "A-minor pentatonic run from fret 5 to 8.",
      zh: "从 5 品到 8 品的 A 小调五声音阶跑句。",
      vi: "Câu chạy A minor pentatonic từ phím 5 đến phím 8.",
      id: "Run pentatonik A minor dari fret 5 sampai 8.",
    },
    notes: [
      N(6, 5, 0.5), N(6, 8, 0.5), N(5, 5, 0.5), N(5, 7, 0.5),
      N(4, 5, 0.5), N(4, 7, 0.5), N(3, 5, 0.5), N(3, 7, 0.5),
      N(2, 5, 0.5), N(2, 8, 0.5), N(1, 5, 0.5), N(1, 8, 1), N(1, 5, 1.5),
    ],
  },
  {
    id: "canon-finale",
    tempo: 120,
    source: { roomId: "archive" },
    title: {
      ko: "캐논 그랜드 피날레",
      en: "Canon Grand Finale",
      zh: "卡农盛大终曲",
      vi: "Canon Grand Finale",
      id: "Canon Grand Finale",
    },
    desc: {
      ko: "긴 버전: 프레이즈 1 + 오리지널 프레이즈 2.",
      en: "The long version: phrase 1 + an original phrase 2.",
      zh: "加长版：乐句 1 + 原创乐句 2。",
      vi: "Bản dài: câu 1 + câu 2 nguyên bản.",
      id: "Versi panjang: frase 1 + frase 2 orisinal.",
    },
    notes: [
      N(1, 2, 0.5), N(1, 0, 0.5), N(2, 3, 0.5), N(2, 2, 0.5),
      N(2, 0, 0.5), N(3, 2, 0.5), N(3, 4, 0.5), N(3, 6, 1),
      N(2, 3, 0.5), N(2, 2, 0.5), N(2, 0, 0.5), N(3, 2, 0.5),
      N(3, 0, 0.5), N(4, 2, 0.5), N(3, 0, 1.5),
    ],
  },
  {
    id: "sunset-ballad",
    tempo: 84,
    source: { pack: "vol2" },
    title: {
      ko: "선셋 발라드",
      en: "Sunset Ballad Lead",
      zh: "日落抒情独奏",
      vi: "Lead ballad hoàng hôn",
      id: "Sunset Ballad",
    },
    desc: {
      ko: "느린 Em–C–G–D 리드. 타브 팩 Vol.2 수록.",
      en: "Slow Em–C–G–D lead. Inside Tab Pack Vol.2.",
      zh: "缓慢的 Em–C–G–D 独奏。收录于 Tab Pack Vol.2。",
      vi: "Lead chậm Em–C–G–D. Có trong Tab Pack Vol.2.",
      id: "Lead pelan Em–C–G–D. Ada di Paket Tab Vol.2.",
    },
    notes: [
      N(1, 0, 1), N(2, 0, 1), N(2, 1, 1), N(2, 3, 1.5),
      N(2, 1, 0.5), N(2, 0, 1), N(1, 0, 2),
    ],
  },
  {
    id: "speed-run",
    tempo: 150,
    source: { pack: "vol2" },
    title: {
      ko: "스피드 런 챌린지",
      en: "Speed Run Challenge",
      zh: "极速跑句挑战",
      vi: "Thử thách chạy nốt tốc độ",
      id: "Speed Run Challenge",
    },
    desc: {
      ko: "150 BPM 얼터네이트 피킹 훈련. 타브 팩 Vol.2 수록.",
      en: "Alternate-picking workout at 150 BPM. Inside Tab Pack Vol.2.",
      zh: "150 BPM 交替拨弦训练。收录于 Tab Pack Vol.2。",
      vi: "Bài tập alternate picking ở 150 BPM. Có trong Tab Pack Vol.2.",
      id: "Latihan alternate picking 150 BPM. Ada di Paket Tab Vol.2.",
    },
    notes: [
      N(1, 5, 0.25), N(1, 6, 0.25), N(1, 7, 0.25), N(1, 8, 0.5),
      N(2, 5, 0.25), N(2, 6, 0.25), N(2, 7, 0.25), N(2, 8, 0.5),
      N(1, 8, 0.25), N(1, 7, 0.25), N(1, 6, 0.25), N(1, 5, 1),
    ],
  },
];

/** Tab ruangan kebuka kalau semua misi ruangannya selesai; Vol.2 kalau beli di toko. */
export function isTabUnlocked(tab: SoloTab, save: SaveData): boolean {
  if ("pack" in tab.source) return save.owned.includes("tab-pack-2");
  return roomFinished(save, tab.source.roomId);
}

export function tabForRoom(roomId: string): SoloTab | null {
  return SOLO_TABS.find((tab) => "roomId" in tab.source && tab.source.roomId === roomId) ?? null;
}

export function localizedTabTitle(tab: SoloTab, locale: Locale): string {
  return tab.title[locale] ?? tab.title.en;
}
