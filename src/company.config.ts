import type { LocalizedText } from "./i18n";
import type { WorkflowStatus } from "./game/workflow";

/**
 * Product names, UI copy, and colors are managed only in this file.
 * Localized values must include all five languages or compilation fails.
 * Product names are not translated, but employee names, alongside their titles, use names natural to each locale.
 *
 * GitarRoom: sekolah gitar pixel — dari chord pertama sampai manggung pertama.
 * NOTE: workspace `id` values (briefing/research/ideas/studio/archive) are internal keys
 * also used by src/game/office-world.ts geometry. Display names below are what users see.
 */
export const COMPANY = {
  name: "GitarRoom",
  mark: "GR",
  pageTitle: {
    ko: "GitarRoom · 기타 학습 스튜디오",
    en: "GitarRoom · guitar learning studio",
    zh: "GitarRoom · 吉他学习工作室",
    vi: "GitarRoom · phòng học đàn guitar",
    id: "GitarRoom · studio belajar gitar",
  },
  description: {
    ko: "기타 기초부터 코드, 핑거스타일, 합주까지 이어지는 로컬 뮤직 스쿨",
    en: "A local music school that runs from guitar basics through chords and fingerstyle to playing together",
    zh: "从吉他基础到和弦、指弹再到合奏的本地音乐学校",
    vi: "Trường nhạc gần gũi, từ guitar căn bản đến hợp âm, fingerstyle và chơi cùng nhau",
    id: "Sekolah musik lokal, dari dasar gitar hingga chord, fingerstyle, dan main bareng",
  },
  tagline: {
    ko: "처음 잡는 기타부터 첫 공연까지, 한곳에서 배웁니다.",
    en: "From your first chord to your first performance — learn it all in one place.",
    zh: "从第一个和弦到第一次演出，在一处学完。",
    vi: "Từ hợp âm đầu tiên đến buổi diễn đầu tiên — học tất cả ở một nơi.",
    id: "Dari chord pertama sampai manggung pertama — belajar semuanya di satu tempat.",
  },
} as const satisfies {
  name: string;
  mark: string;
  pageTitle: LocalizedText;
  description: LocalizedText;
  tagline: LocalizedText;
};

/** UI colors are passed from the configuration as CSS variables. */
export const THEME = {
  app: "#0b1722",
  frame: "#fffaf0",
  panel: "#eef7f3",
  surface: "#dff1ec",
  line: "#afc9c1",
  edge: "#315f70",
  floor: "#fff0cd",
  cream: "#fffdf5",
  ink: "#102b38",
  muted: "#4a6872",
  skin: "#e0ab84",
  wood: "#b66f3e",
  woodDark: "#694229",
  screen: "#164761",
  green: "#55c985",
  amber: "#f3ad32",
  red: "#c63c47",
  focus: "#176bc1",
  shadow: "#05131c",
} as const;


export const WORKSPACES = [
  {
    id: "briefing",
    code: "01",
    name: { ko: "뮤직룸 · 기타 기초", en: "Music Room · Guitar Basics", zh: "音乐室 · 吉他基础", vi: "Phòng nhạc · Guitar căn bản", id: "Music Room · Gitar Dasar" },
    role: {
      ko: "기타 잡는 법, 튜닝, 첫 코드를 배웁니다.",
      en: "Learn how to hold the guitar, tune it, and play your first chords.",
      zh: "学习持琴、调音和第一个和弦。",
      vi: "Học cách cầm đàn, lên dây và những hợp âm đầu tiên.",
      id: "Belajar cara pegang gitar, tuning, dan chord pertama.",
    },
    worker: {
      id: "guitar-basics-instructor",
      title: { ko: "기타 기초 강사", en: "Guitar Basics Instructor", zh: "吉他基础老师", vi: "Giáo viên guitar căn bản", id: "Instruktur Gitar Dasar" },
      name: { ko: "윤슬", en: "Iris", zh: "妍希", vi: "Ngọc Ánh", id: "Anindya" },
      sprite: 0,
    },
    staff: [
      { id: "tuning-coach", title: { ko: "조율 코치", en: "Tuning Coach", zh: "调音教练", vi: "Huấn luyện lên dây", id: "Pelatih Tuning" }, name: { ko: "민서", en: "Naomi", zh: "敏书", vi: "Minh Thư", id: "Melati" }, sprite: 1 },
      { id: "posture-coach", title: { ko: "자세 코치", en: "Posture Coach", zh: "姿势教练", vi: "Huấn luyện tư thế", id: "Pelatih Postur" }, name: { ko: "태오", en: "Theo", zh: "泰宇", vi: "Thái Sơn", id: "Bagas" }, sprite: 2 },
      { id: "beginner-mentor", title: { ko: "입문 멘토", en: "Beginner Mentor", zh: "入门导师", vi: "Cố vấn vỡ lòng", id: "Mentor Pemula" }, name: { ko: "다온", en: "Dana", zh: "多恩", vi: "Đan Vy", id: "Dian" }, sprite: 3 },
      { id: "class-host", title: { ko: "클래스 호스트", en: "Class Host", zh: "课堂主持", vi: "Điều phối lớp", id: "Host Kelas" }, name: { ko: "루아", en: "Luna", zh: "露雅", vi: "Lan Nhi", id: "Ayu" }, sprite: 4 },
      { id: "practice-assistant", title: { ko: "연습 어시스턴트", en: "Practice Assistant", zh: "练习助理", vi: "Trợ lý luyện tập", id: "Asisten Latihan" }, name: { ko: "서진", en: "Mila", zh: "静宜", vi: "Tuệ Minh", id: "Rendra" }, sprite: 5 },
      { id: "rhythm-guide", title: { ko: "리듬 가이드", en: "Rhythm Guide", zh: "节奏向导", vi: "Hướng dẫn nhịp", id: "Pemandu Ritme" }, name: { ko: "하율", en: "Adrian", zh: "亦辰", vi: "Bảo Ngọc", id: "Nayla" }, sprite: 4 },
    ],
    accent: "#f6b73c",
  },
  {
    id: "research",
    code: "02",
    name: { ko: "코드·스트럼 랩", en: "Chord & Strumming Lab", zh: "和弦扫弦实验室", vi: "Lab hợp âm & quạt đàn", id: "Lab Chord & Strumming" },
    role: {
      ko: "코드 전환과 스트럼 패턴, 리듬을 훈련합니다.",
      en: "Train chord changes, strumming patterns, and rhythm.",
      zh: "训练和弦转换、扫弦节奏型和节奏感。",
      vi: "Luyện chuyển hợp âm, điệu quạt và nhịp.",
      id: "Melatih perpindahan chord, pola strumming, dan ritme.",
    },
    worker: {
      id: "chord-coach",
      title: { ko: "코드 코치", en: "Chord Coach", zh: "和弦教练", vi: "Huấn luyện hợp âm", id: "Pelatih Chord" },
      name: { ko: "도윤", en: "Ethan", zh: "浩然", vi: "Minh Khôi", id: "Arjuna" },
      sprite: 3,
    },
    staff: [
      { id: "strumming-trainer", title: { ko: "스트럼 트레이너", en: "Strumming Trainer", zh: "扫弦训练师", vi: "Huấn luyện quạt đàn", id: "Pelatih Strumming" }, name: { ko: "수아", en: "Sophie", zh: "思雅", vi: "Thu An", id: "Salsa" }, sprite: 4 },
      { id: "rhythm-analyst", title: { ko: "리듬 분석가", en: "Rhythm Analyst", zh: "节奏分析师", vi: "Phân tích nhịp", id: "Analis Ritme" }, name: { ko: "준호", en: "Julian", zh: "俊豪", vi: "Quốc Huy", id: "Rizky" }, sprite: 5 },
      { id: "chord-librarian", title: { ko: "코드 사서", en: "Chord Librarian", zh: "和弦资料员", vi: "Thủ thư hợp âm", id: "Pustakawan Chord" }, name: { ko: "은호", en: "Owen", zh: "恩浩", vi: "Gia Bảo", id: "Fajar" }, sprite: 0 },
      { id: "capo-specialist", title: { ko: "카포 전문가", en: "Capo Specialist", zh: "变调夹专家", vi: "Chuyên gia capo", id: "Spesialis Capo" }, name: { ko: "채원", en: "Chloe", zh: "采薇", vi: "Mai Chi", id: "Citra" }, sprite: 2 },
      { id: "tempo-keeper", title: { ko: "템포 키퍼", en: "Tempo Keeper", zh: "节拍管理员", vi: "Người giữ nhịp", id: "Penjaga Tempo" }, name: { ko: "예준", en: "Felix", zh: "逸凡", vi: "Khánh Vy", id: "Bayu" }, sprite: 1 },
      { id: "barre-coach", title: { ko: "바레 코드 코치", en: "Barre Chord Coach", zh: "横按和弦教练", vi: "Huấn luyện hợp âm chặn", id: "Pelatih Chord Gantung" }, name: { ko: "지아", en: "Ivy", zh: "语晴", vi: "Nam Phong", id: "Intan" }, sprite: 0 },
    ],
    accent: "#58b9e8",
  },
  {
    id: "ideas",
    code: "03",
    name: { ko: "송룸 · 노래 연주", en: "Song Room", zh: "歌曲室", vi: "Phòng bài hát", id: "Ruang Lagu" },
    role: {
      ko: "좋아하는 노래를 코드와 핑거스타일로 연주합니다.",
      en: "Play your favourite songs with chords and fingerstyle.",
      zh: "用和弦和指弹演奏喜欢的歌曲。",
      vi: "Chơi những bài hát yêu thích bằng hợp âm và fingerstyle.",
      id: "Memainkan lagu favorit dengan chord dan fingerstyle.",
    },
    worker: {
      id: "song-coach",
      title: { ko: "송 코치", en: "Song Coach", zh: "歌曲教练", vi: "Huấn luyện bài hát", id: "Pelatih Lagu" },
      name: { ko: "세아", en: "Sarah", zh: "世雅", vi: "Bảo Trân", id: "Kirana" },
      sprite: 0,
    },
    staff: [
      { id: "fingerstyle-trainer", title: { ko: "핑거스타일 트레이너", en: "Fingerstyle Trainer", zh: "指弹训练师", vi: "Huấn luyện fingerstyle", id: "Pelatih Fingerstyle" }, name: { ko: "나래", en: "Nora", zh: "娜蕾", vi: "Nhã Uyên", id: "Nadia" }, sprite: 1 },
      { id: "melody-guide", title: { ko: "멜로디 가이드", en: "Melody Guide", zh: "旋律向导", vi: "Hướng dẫn giai điệu", id: "Pemandu Melodi" }, name: { ko: "시우", en: "Simon", zh: "诗宇", vi: "Trung Kiên", id: "Satria" }, sprite: 2 },
      { id: "sing-strum-coach", title: { ko: "통기타 보컬 코치", en: "Sing & Strum Coach", zh: "弹唱教练", vi: "Huấn luyện vừa đàn vừa hát", id: "Pelatih Gitar & Vokal" }, name: { ko: "예린", en: "Elena", zh: "艺琳", vi: "Diễm Quỳnh", id: "Larasati" }, sprite: 3 },
      { id: "tab-writer", title: { ko: "타브 작가", en: "Tab Writer", zh: "吉他谱作者", vi: "Người viết tab", id: "Penulis Tab" }, name: { ko: "건우", en: "Gavin", zh: "建宇", vi: "Đức Anh", id: "Gilang" }, sprite: 5 },
      { id: "cover-director", title: { ko: "커버 디렉터", en: "Cover Director", zh: "翻弹总监", vi: "Đạo diễn cover", id: "Direktur Cover" }, name: { ko: "도하", en: "Leo", zh: "承宇", vi: "Phương Linh", id: "Dimas" }, sprite: 4 },
      { id: "ear-training-coach", title: { ko: "청음 코치", en: "Ear Training Coach", zh: "视唱练耳教练", vi: "Huấn luyện nghe", id: "Pelatih Pendengaran" }, name: { ko: "나윤", en: "Maya", zh: "若曦", vi: "Hữu Nghĩa", id: "Sari" }, sprite: 2 },
    ],
    accent: "#ef71b4",
  },
  {
    id: "studio",
    code: "04",
    name: { ko: "합주 스튜디오", en: "Jam Studio", zh: "合奏排练室", vi: "Phòng tập ban nhạc", id: "Studio Latihan" },
    role: {
      ko: "함께 합주하고 첫 공연을 준비합니다.",
      en: "Jam together and prepare your first performance.",
      zh: "一起合奏，为第一次演出做准备。",
      vi: "Chơi cùng nhau và chuẩn bị buổi diễn đầu tiên.",
      id: "Main bareng dan menyiapkan penampilan pertama.",
    },
    worker: {
      id: "band-coach",
      title: { ko: "합주 코치", en: "Band Coach", zh: "乐队教练", vi: "Huấn luyện ban nhạc", id: "Pelatih Band" },
      name: { ko: "지후", en: "Jonah", zh: "智皓", vi: "Hoàng Long", id: "Bimo" },
      sprite: 3,
    },
    staff: [
      { id: "sound-engineer", title: { ko: "사운드 엔지니어", en: "Sound Engineer", zh: "录音师", vi: "Kỹ sư âm thanh", id: "Sound Engineer" }, name: { ko: "유진", en: "Robin", zh: "悠然", vi: "Thanh Vân", id: "Cahya" }, sprite: 4 },
      { id: "stage-manager", title: { ko: "공연 매니저", en: "Stage Manager", zh: "舞台经理", vi: "Quản lý sân khấu", id: "Manajer Panggung" }, name: { ko: "현우", en: "Wesley", zh: "贤宇", vi: "Tuấn Kiệt", id: "Wisnu" }, sprite: 5 },
      { id: "groove-coach", title: { ko: "그루브 코치", en: "Groove Coach", zh: "律动教练", vi: "Huấn luyện groove", id: "Pelatih Groove" }, name: { ko: "서윤", en: "Sienna", zh: "舒允", vi: "Thùy Dương", id: "Sekar" }, sprite: 0 },
      { id: "recording-operator", title: { ko: "레코딩 오퍼레이터", en: "Recording Operator", zh: "录音操作员", vi: "Vận hành thu âm", id: "Operator Rekaman" }, name: { ko: "로한", en: "Rohan", zh: "洛涵", vi: "Hải Đăng", id: "Raka" }, sprite: 2 },
      { id: "performance-mentor", title: { ko: "공연 멘토", en: "Performance Mentor", zh: "演出导师", vi: "Cố vấn biểu diễn", id: "Mentor Penampilan" }, name: { ko: "시온", en: "Noel", zh: "星河", vi: "Kim Ngân", id: "Yoga" }, sprite: 1 },
      { id: "jam-host", title: { ko: "잼 호스트", en: "Jam Host", zh: "即兴主持", vi: "Điều phối jam", id: "Host Jamming" }, name: { ko: "유하", en: "Ruby", zh: "沐阳", vi: "Duy Anh", id: "Laras" }, sprite: 3 },
    ],
    accent: "#aa8cf2",
  },
  {
    id: "archive",
    code: "05",
    name: { ko: "노래 도서관", en: "Song Library", zh: "歌曲图书馆", vi: "Thư viện bài hát", id: "Pustaka Lagu" },
    role: {
      ko: "코드 악보와 연습 기록을 정리하고 저장합니다.",
      en: "Organise chord charts and practice logs, and keep them saved.",
      zh: "整理和保存和弦谱与练习记录。",
      vi: "Sắp xếp hợp âm, bản nhạc và nhật ký luyện tập.",
      id: "Merapikan chord, notasi, dan jurnal latihan, lalu menyimpannya.",
    },
    worker: {
      id: "music-librarian",
      title: { ko: "뮤직 사서", en: "Music Librarian", zh: "音乐图书管理员", vi: "Thủ thư âm nhạc", id: "Pustakawan Musik" },
      name: { ko: "하린", en: "Harper", zh: "夏琳", vi: "Hạ Linh", id: "Hasna" },
      sprite: 0,
    },
    staff: [
      { id: "chart-reviewer", title: { ko: "악보 검수자", en: "Chart Reviewer", zh: "曲谱审校", vi: "Kiểm duyệt bản nhạc", id: "Peninjau Notasi" }, name: { ko: "소연", en: "Sonia", zh: "素妍", vi: "Tố Uyên", id: "Ratna" }, sprite: 1 },
      { id: "release-manager", title: { ko: "릴리스 매니저", en: "Release Manager", zh: "发行经理", vi: "Quản lý phát hành", id: "Manajer Rilis" }, name: { ko: "재민", en: "Jasper", zh: "佳铭", vi: "Tấn Phát", id: "Jaya" }, sprite: 2 },
      { id: "playlist-curator", title: { ko: "플레이리스트 큐레이터", en: "Playlist Curator", zh: "歌单策划", vi: "Tuyển tập playlist", id: "Kurator Playlist" }, name: { ko: "가온", en: "Casey", zh: "嘉恩", vi: "An Khang", id: "Gita" }, sprite: 3 },
      { id: "practice-tracker", title: { ko: "연습 기록 코디네이터", en: "Practice Tracker", zh: "练习记录协调员", vi: "Theo dõi luyện tập", id: "Pencatat Latihan" }, name: { ko: "아린", en: "Aria", zh: "雅琳", vi: "Ái Linh", id: "Arini" }, sprite: 5 },
      { id: "theory-tutor", title: { ko: "이론 튜터", en: "Theory Tutor", zh: "乐理导师", vi: "Gia sư nhạc lý", id: "Tutor Teori" }, name: { ko: "태린", en: "Silas", zh: "佳颖", vi: "Thảo Nhi", id: "Tirta" }, sprite: 4 },
      { id: "archive-keeper", title: { ko: "자료 사서", en: "Archive Keeper", zh: "资料管理员", vi: "Thủ thư tư liệu", id: "Penjaga Arsip" }, name: { ko: "승우", en: "Vera", zh: "文轩", vi: "Xuân Mai", id: "Wulan" }, sprite: 1 },
    ],
    accent: "#4fc484",
  },
] as const satisfies readonly {
  id: string;
  code: string;
  name: LocalizedText;
  role: LocalizedText;
  worker: { id: string; title: LocalizedText; name: LocalizedText; sprite: number };
  staff: readonly { id: string; title: LocalizedText; name: LocalizedText; sprite: number }[];
  accent: string;
}[];

export type WorkspaceId = (typeof WORKSPACES)[number]["id"];

export const STATUS_LABELS = {
  idle: { ko: "휴식", en: "Break", zh: "休息", vi: "Nghỉ", id: "Istirahat" },
  running: { ko: "수업 중", en: "Class live", zh: "上课中", vi: "Đang học", id: "Kelas jalan" },
  awaiting_approval: { ko: "대기 중", en: "Waiting", zh: "等待中", vi: "Đang chờ", id: "Menunggu" },
  completed: { ko: "완료", en: "Done", zh: "完成", vi: "Xong", id: "Selesai" },
  failed: { ko: "취소", en: "Cancelled", zh: "已取消", vi: "Đã hủy", id: "Batal" },
} as const satisfies Record<WorkflowStatus, LocalizedText>;
