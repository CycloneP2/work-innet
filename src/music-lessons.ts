import type { Locale, LocalizedText } from "./i18n";

/**
 * Materi belajar gitar per ruangan GitarRoom.
 * `frets` dibaca dari senar 6 (E rendah) ke senar 1 (e tinggi):
 * 0 = los (open), "x" = jangan dibunyikan, 1-5 = nomor fret yang ditekan.
 */
export type ChordShape = {
  name: string;
  frets: readonly [number | "x", number | "x", number | "x", number | "x", number | "x", number | "x"];
};

export type MusicLesson = {
  roomId: string;
  level: LocalizedText;
  title: LocalizedText;
  desc: LocalizedText;
  points: Partial<Record<Locale, readonly string[]>>;
  chords: readonly ChordShape[];
  practice: Partial<Record<Locale, string>>;
};

export const MUSIC_LESSONS: readonly MusicLesson[] = [
  {
    roomId: "briefing",
    level: {
      ko: "레벨 1 · 입문",
      en: "Level 1 · Starter",
      zh: "第 1 级 · 入门",
      vi: "Cấp 1 · Vỡ lòng",
      id: "Level 1 · Pemula",
    },
    title: {
      ko: "기타 잡기, 튜닝, 첫 코드",
      en: "Hold, Tuning & First Chords",
      zh: "持琴、调音与第一个和弦",
      vi: "Cầm đàn, lên dây & hợp âm đầu tiên",
      id: "Pegang, Tuning & Chord Pertama",
    },
    desc: {
      ko: "노래를 치기 전 기초를 다집니다: 편한 자세, E–A–D–G–B–E 조율, 필수 4코드(G·C·D·Em).",
      en: "Foundations before songs: a comfy hold, E–A–D–G–B–E tuning, and the 4 must-know chords (G, C, D, Em).",
      zh: "学歌之前打好基础：舒适的持琴、E–A–D–G–B–E 调音，以及 4 个必备和弦（G、C、D、Em）。",
      vi: "Nền tảng trước khi chơi bài: tư thế thoải mái, lên dây E–A–D–G–B–E và 4 hợp âm phải biết (G, C, D, Em).",
      id: "Fondasi sebelum main lagu: posisi gitar yang nyaman, stem E–A–D–G–B–E, dan 4 chord wajib (G, C, D, Em).",
    },
    points: {
      en: [
        "Sit straight, guitar resting on your right thigh (left if left-handed)",
        "Tune from string 6 to 1: E A D G B E — a phone tuner works fine",
        "Drill G → C → D → Em, one minute per change",
        "Pluck each string slowly, every note must ring clean",
      ],
      id: [
        "Duduk tegak, gitar menempel di paha kanan (atau kiri kalau kidal)",
        "Stem dari senar 6 ke 1: E A D G B E — tuner HP cukup",
        "Latih G → C → D → Em, 1 menit tiap perpindahan",
        "Petik tiap senar pelan, pastikan bunyi bersih tanpa buzz",
      ],
    },
    chords: [
      { name: "G", frets: [3, 2, 0, 0, 0, 3] },
      { name: "C", frets: ["x", 3, 2, 0, 1, 0] },
      { name: "D", frets: ["x", "x", 0, 2, 3, 2] },
      { name: "Em", frets: [0, 2, 2, 0, 0, 0] },
    ],
    practice: {
      en: "5-minute challenge: loop G–Em–C–D with slow downstrokes. Goal: 8 rounds without stopping.",
      id: "Tantangan 5 menit: mainkan G–Em–C–D berulang dengan downstroke pelan. Target: 8 putaran tanpa berhenti.",
    },
  },
  {
    roomId: "research",
    level: {
      ko: "레벨 2 · 코드와 스트럼",
      en: "Level 2 · Chords & Strumming",
      zh: "第 2 级 · 和弦与扫弦",
      vi: "Cấp 2 · Hợp âm & quạt đàn",
      id: "Level 2 · Chord & Strumming",
    },
    title: {
      ko: "끊김 없는 코드 전환과 스트럼",
      en: "Smooth Changes & Strumming Patterns",
      zh: "流畅的和弦转换与扫弦节奏",
      vi: "Chuyển hợp âm mượt & điệu quạt",
      id: "Perpindahan Chord & Pola Strumming",
    },
    desc: {
      ko: "한 단계 업: 멈추지 않는 코드 전환, D–DU–UDU 스트럼 패턴, 메트로놈으로 템포 지키기.",
      en: "Level up: gapless chord changes, the D–DU–UDU strumming pattern, and steady tempo with a metronome.",
      zh: "更进一步：无缝和弦转换、D–DU–UDU 扫弦节奏型，以及用节拍器稳住速度。",
      vi: "Lên trình: chuyển hợp âm không ngắt, điệu quạt D–DU–UDU và giữ nhịp bằng metronome.",
      id: "Naik level: pindah chord tanpa jeda, pola strumming D–DU–UDU, dan jaga tempo dengan metronom.",
    },
    points: {
      en: [
        "Drill 2-chord pairs (C↔G, D↔Em) at 60 BPM",
        "The must-know pattern: Down – DownUp – UpDownUp",
        "Relaxed wrist, motion from the elbow — just enough",
        "Raise tempo by 5 BPM after 4 clean rounds",
      ],
      id: [
        "Latih pasangan 2 chord (C↔G, D↔Em) di 60 BPM",
        "Pola wajib: Down – DownUp – UpDownUp (D–DU–UDU)",
        "Pergelangan rileks, gerakan dari siku secukupnya",
        "Naikkan tempo 5 BPM kalau sudah bersih 4 putaran",
      ],
    },
    chords: [
      { name: "Am", frets: ["x", 0, 2, 2, 1, 0] },
      { name: "Fmaj7", frets: ["x", "x", 3, 2, 1, 1] },
    ],
    practice: {
      en: "Play Am–Fmaj7–C–G with D–DU–UDU at 70 BPM, 5 minutes nonstop. (Fmaj7 is the friendly stepping stone to F.)",
      id: "Mainkan Am–Fmaj7–C–G dengan pola D–DU–UDU di 70 BPM, 5 menit nonstop. (Fmaj7 itu jembatan ramah menuju F.)",
    },
  },
  {
    roomId: "ideas",
    level: {
      ko: "레벨 3 · 노래 연주",
      en: "Level 3 · Songs",
      zh: "第 3 级 · 歌曲",
      vi: "Cấp 3 · Bài hát",
      id: "Level 3 · Lagu",
    },
    title: {
      ko: "좋아하는 노래 연주하기",
      en: "Play Your Favourite Songs",
      zh: "演奏喜欢的歌曲",
      vi: "Chơi những bài hát yêu thích",
      id: "Mainkan Lagu Favoritmu",
    },
    desc: {
      ko: "전부 합치기: 노래 코드 읽기, 다이내믹 조절, 쉬운 핑거스타일 도전.",
      en: "Put it together: read song chords, shape dynamics, and try simple fingerstyle picking.",
      zh: "融会贯通：读歌曲和弦、做强弱变化，并尝试简单的指弹。",
      vi: "Tổng hợp tất cả: đọc hợp âm bài hát, tạo sắc thái to–nhỏ và thử fingerstyle đơn giản.",
      id: "Gabungkan semuanya: baca chord lagu, atur dinamika, dan coba petikan fingerstyle sederhana.",
    },
    points: {
      en: [
        "Pick a 4-chord song (e.g. G–D–Em–C) as your first song",
        "Verse soft, chorus a bit louder — that's dynamics",
        "Try a simple Travis pick: bass–3–2–1–2–3",
        "Record your practice, listen back, note what's off",
      ],
      id: [
        "Pilih lagu 4-chord (mis. G–D–Em–C) sebagai lagu pertama",
        "Verse main pelan, chorus sedikit lebih keras — itu dinamika",
        "Coba petikan Travis sederhana: bass–3–2–1–2–3",
        "Rekam latihanmu, dengarkan ulang, catat yang fals",
      ],
    },
    chords: [
      { name: "Cadd9", frets: ["x", 3, 2, 0, 3, 3] },
      { name: "Dsus4", frets: ["x", "x", 0, 2, 3, 3] },
      { name: "Asus4", frets: ["x", 0, 2, 2, 3, 0] },
    ],
    practice: {
      en: "Pick 1 song, play it full from intro to outro 3 times. Record round 3.",
      id: "Pilih 1 lagu, mainkan full dari intro sampai outro 3x. Putaran ke-3 direkam.",
    },
  },
  {
    roomId: "studio",
    level: {
      ko: "레벨 4 · 합주",
      en: "Level 4 · Jamming",
      zh: "第 4 级 · 合奏",
      vi: "Cấp 4 · Chơi nhóm",
      id: "Level 4 · Jamming",
    },
    title: {
      ko: "잼과 첫 공연",
      en: "Jamming & Your First Gig",
      zh: "即兴合奏与第一次演出",
      vi: "Jam cùng nhau & buổi diễn đầu tiên",
      id: "Jamming & Manggung Pertama",
    },
    desc: {
      ko: "친구와 함께: 베이스와 드럼 듣기, 볼륨 맞추기, 공연용 3곡 준비.",
      en: "Play with friends: listen to bass & drums, balance volume, and prep 3 songs to perform.",
      zh: "和朋友一起：听贝斯和鼓、平衡音量，并准备 3 首演出曲目。",
      vi: "Chơi cùng bạn bè: nghe bass & trống, cân bằng âm lượng và chuẩn bị 3 bài để diễn.",
      id: "Main bareng teman: dengarkan bass & drum, atur volume, dan siapkan 3 lagu untuk tampil.",
    },
    points: {
      en: [
        "Decide who plays rhythm and who adds melody/fills",
        "Warm up with 12-bar blues in E (E–A–B7)",
        "Rehearse intro–verse–chorus–outro until tight",
        "One full no-stop run before showtime",
      ],
      id: [
        "Tentukan siapa main rhythm, siapa isi melodi/fill",
        "Pemanasan dengan 12-bar blues di E (E–A–B7)",
        "Latih intro–verse–chorus–outro sampai kompak",
        "Gladi 1x full set tanpa berhenti sebelum tampil",
      ],
    },
    chords: [
      { name: "E", frets: [0, 2, 2, 1, 0, 0] },
      { name: "A", frets: ["x", 0, 2, 2, 2, 0] },
      { name: "B7", frets: ["x", 2, 1, 2, 0, 2] },
    ],
    practice: {
      en: "Book a 30-minute jam session this week. Record it, then review together.",
      id: "Jadwalkan jam session 30 menit minggu ini. Rekam, lalu evaluasi bareng.",
    },
  },
  {
    roomId: "archive",
    level: {
      ko: "보관함 · 내 기록",
      en: "Collection · My Records",
      zh: "收藏 · 我的记录",
      vi: "Bộ sưu tập · Nhật ký của tôi",
      id: "Koleksi · Catatanku",
    },
    title: {
      ko: "코드와 연습 일지",
      en: "Chords & Practice Log",
      zh: "和弦与练习日志",
      vi: "Hợp âm & nhật ký luyện tập",
      id: "Chord & Jurnal Latihan",
    },
    desc: {
      ko: "마스터한 코드, 타브, 연습 기록이 여기 저장됩니다.",
      en: "Every chord you've nailed, tabs, and practice notes live here.",
      zh: "所有已掌握的和弦、吉他谱和练习记录都保存在这里。",
      vi: "Mọi hợp âm đã thuần thục, bản tab và ghi chú luyện tập đều ở đây.",
      id: "Semua chord yang sudah dikuasai, tab lagu, dan catatan latihan tersimpan di sini.",
    },
    points: {
      en: [
        "Mark chords clean for 4 rounds as 'nailed'",
        "Save favourite tabs with their metronome tempo",
        "Log: date, minutes, and 1 thing that improved",
        "Aim for 15 focused minutes every day",
      ],
      id: [
        "Tandai chord yang sudah bersih 4 putaran sebagai 'dikuasai'",
        "Simpan tab lagu favorit + tempo metronomnya",
        "Tulis jurnal: tanggal, durasi, dan 1 hal yang membaik",
        "Targetkan 15 menit latihan fokus setiap hari",
      ],
    },
    chords: [
      { name: "Dm", frets: ["x", "x", 0, 2, 3, 1] },
      { name: "G7", frets: [3, 2, 0, 0, 0, 1] },
    ],
    practice: {
      en: "Finish this week's log: total practice minutes and new chords nailed.",
      id: "Lengkapi jurnal minggu ini: total menit latihan dan chord baru yang dikuasai.",
    },
  },
];

export function lessonForRoom(roomId: string | null): MusicLesson | null {
  if (!roomId) return null;
  return MUSIC_LESSONS.find((lesson) => lesson.roomId === roomId) ?? null;
}

/** Lesson body copy ships in Indonesian + English; other locales fall back gracefully. */
export function lessonPoints(lesson: MusicLesson, locale: Locale): readonly string[] {
  return lesson.points[locale] ?? lesson.points.en ?? lesson.points.id ?? [];
}

export function lessonPractice(lesson: MusicLesson, locale: Locale): string {
  return lesson.practice[locale] ?? lesson.practice.en ?? lesson.practice.id ?? "";
}
