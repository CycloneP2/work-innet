import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { COMPANY, STATUS_LABELS, THEME, WORKSPACES } from "./company.config";
import { ChordChart } from "./ChordChart";
import { LOCALES, LOCALE_LABELS, localized, type Locale, type LocalizedText } from "./i18n";
import { lessonForRoom, lessonPoints, lessonPractice } from "./music-lessons";
import { OfficeWorld } from "./OfficeWorld";
import type { WorkflowStatus } from "./game/workflow";

const themeStyle = {
  "--color-app": THEME.app,
  "--color-frame": THEME.frame,
  "--color-panel": THEME.panel,
  "--color-surface": THEME.surface,
  "--color-line": THEME.line,
  "--color-edge": THEME.edge,
  "--color-floor": THEME.floor,
  "--color-cream": THEME.cream,
  "--color-ink": THEME.ink,
  "--color-muted": THEME.muted,
  "--color-skin": THEME.skin,
  "--color-wood": THEME.wood,
  "--color-wood-dark": THEME.woodDark,
  "--color-screen": THEME.screen,
  "--color-green": THEME.green,
  "--color-amber": THEME.amber,
  "--color-red": THEME.red,
  "--color-focus": THEME.focus,
  "--color-shadow": THEME.shadow,
} as CSSProperties;

/** Demo-only copy. Product copy lives in i18n.ts and company.config.ts. */
const UI = {
  preview: {
    ko: "수업 미리보기",
    en: "Class preview",
    zh: "课堂预览",
    vi: "Xem trước lớp học",
    id: "Pratinjau kelas",
  },
  clock: {
    ko: "데모 화면",
    en: "Demo view",
    zh: "演示画面",
    vi: "Màn hình demo",
    id: "Tampilan demo",
  },
  note: {
    ko: "GitarRoom은 픽셀 기타 스쿨 데모입니다. 옆 패널의 자료로 연습해 보세요.",
    en: "GitarRoom is a pixel guitar-school demo. Practice with the material in the side panel.",
    zh: "GitarRoom 是像素吉他学校演示。用侧栏的教材来练习吧。",
    vi: "GitarRoom là bản demo trường guitar pixel. Hãy luyện tập với tài liệu ở panel bên.",
    id: "GitarRoom adalah demo sekolah gitar pixel. Latihan pakai materi di panel samping.",
  },
  pickRoom: {
    ko: "위에서 교실을 눌러 수업을 시작하세요.",
    en: "Pick a room above to start its class.",
    zh: "在上方点一间教室开始上课。",
    vi: "Chọn một phòng ở trên để bắt đầu lớp học.",
    id: "Pilih salah satu ruangan di atas untuk mulai kelasnya.",
  },
  instructor: {
    ko: "담당 강사",
    en: "Instructor",
    zh: "授课老师",
    vi: "Giáo viên",
    id: "Instruktur",
  },
  todayChords: {
    ko: "오늘의 코드",
    en: "Today's chords",
    zh: "今日和弦",
    vi: "Hợp âm hôm nay",
    id: "Chord hari ini",
  },
  drill: {
    ko: "연습 미션",
    en: "Practice mission",
    zh: "练习任务",
    vi: "Nhiệm vụ luyện tập",
    id: "Misi latihan",
  },
  welcomeTitle: {
    ko: "GitarRoom에 오신 것을 환영합니다",
    en: "Welcome to GitarRoom",
    zh: "欢迎来到 GitarRoom",
    vi: "Chào mừng đến với GitarRoom",
    id: "Selamat datang di GitarRoom",
  },
} satisfies Record<string, LocalizedText>;

export function DemoApp() {
  const [locale, setLocale] = useState<Locale>("id");
  const [activeId, setActiveId] = useState<string | null>("briefing");

  const workspaceStatuses = useMemo(() => {
    const map: Record<string, WorkflowStatus> = {};
    for (const workspace of WORKSPACES) {
      map[workspace.id] = workspace.id === activeId ? "running" : "idle";
    }
    return map;
  }, [activeId]);

  const activeWorkspace = WORKSPACES.find((workspace) => workspace.id === activeId) ?? null;
  const lesson = lessonForRoom(activeId);

  return (
    <div className="app-shell demo-shell" data-draftroom-shell="" style={themeStyle}>
      <header className="demo-bar">
        <div className="demo-brand">
          <span className="demo-mark">{COMPANY.mark}</span>
          <div>
            <strong>{localized(COMPANY.pageTitle, locale)}</strong>
            <div className="demo-tag">{localized(COMPANY.tagline, locale)}</div>
          </div>
        </div>
        <select
          aria-label="language"
          onChange={(event) => setLocale(event.target.value as Locale)}
          value={locale}
        >
          {LOCALES.map((code) => (
            <option key={code} value={code}>
              {LOCALE_LABELS[code]}
            </option>
          ))}
        </select>
        <span className="demo-preview-label">{localized(UI.preview, locale)}</span>
        <div className="demo-states">
          <button
            className={activeId === null ? "on" : ""}
            onClick={() => setActiveId(null)}
            type="button"
          >
            {localized(STATUS_LABELS.idle, locale)}
          </button>
          {WORKSPACES.map((workspace) => (
            <button
              className={activeId === workspace.id ? "on" : ""}
              key={workspace.id}
              onClick={() => setActiveId(workspace.id)}
              type="button"
            >
              {localized(workspace.name, locale)}
            </button>
          ))}
        </div>
      </header>

      <div className="workspace-layout demo-layout">
        <section className="office-panel" data-pane="office">
          <OfficeWorld
            activeWorkspaceId={activeId}
            clock={{ label: localized(UI.clock, locale), time: "--:--" }}
            locale={locale}
            officeEvents={[]}
            ready={true}
            workflowStatus={activeId ? "running" : "idle"}
            workspaceStatuses={workspaceStatuses}
          />
        </section>

        <aside
          className="lesson-panel"
          style={activeWorkspace ? { borderTopColor: activeWorkspace.accent } : undefined}
        >
          {lesson && activeWorkspace ? (
            <>
              <p className="lesson-level">{localized(lesson.level, locale)}</p>
              <h2>{localized(lesson.title, locale)}</h2>
              <p className="lesson-room">
                {localized(activeWorkspace.name, locale)} · {localized(activeWorkspace.role, locale)}
              </p>
              <p className="lesson-instructor">
                {localized(UI.instructor, locale)}: {localized(activeWorkspace.worker.title, locale)}{" "}
                {localized(activeWorkspace.worker.name, locale)}
              </p>
              <p className="lesson-desc">{localized(lesson.desc, locale)}</p>
              <ol className="lesson-points">
                {lessonPoints(lesson, locale).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ol>
              <h3>{localized(UI.todayChords, locale)}</h3>
              <div className="chord-list">
                {lesson.chords.map((chord) => (
                  <ChordChart chord={chord} key={chord.name} />
                ))}
              </div>
              <div className="practice-box">
                <strong>🎯 {localized(UI.drill, locale)}</strong>
                <p>{lessonPractice(lesson, locale)}</p>
              </div>
            </>
          ) : (
            <>
              <p className="lesson-level">🎸 GitarRoom</p>
              <h2>{localized(UI.welcomeTitle, locale)}</h2>
              <p className="lesson-desc">{localized(COMPANY.description, locale)}</p>
              <p className="lesson-desc">{localized(UI.pickRoom, locale)}</p>
            </>
          )}
        </aside>
      </div>

      <footer className="demo-foot">{localized(UI.note, locale)}</footer>
    </div>
  );
}
