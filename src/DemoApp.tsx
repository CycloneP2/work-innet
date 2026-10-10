import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { COMPANY, STATUS_LABELS, THEME, WORKSPACES } from "./company.config";
import { ChordChart } from "./ChordChart";
import {
  completeMission,
  defaultSave,
  isUnlocked,
  levelFromXp,
  loadSave,
  missionsForRoom,
  storeSave,
  UNLOCK_BONUS_COINS,
  type GameMode,
  type SaveData,
} from "./game-save";
import { LOCALES, LOCALE_LABELS, localized, type Locale, type LocalizedText } from "./i18n";
import { MISSIONS, missionText, ROOM_ORDER } from "./missions";
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
  modeStory: {
    ko: "📖 스토리",
    en: "📖 Story",
    zh: "📖 故事",
    vi: "📖 Cốt truyện",
    id: "📖 Story",
  },
  modeFree: {
    ko: "🆓 자유",
    en: "🆓 Free",
    zh: "🆓 自由",
    vi: "🆓 Tự do",
    id: "🆓 Bebas",
  },
  missions: {
    ko: "이 방의 미션",
    en: "Room missions",
    zh: "本房间任务",
    vi: "Nhiệm vụ phòng này",
    id: "Misi ruangan ini",
  },
  claim: {
    ko: "완료!",
    en: "Done!",
    zh: "完成！",
    vi: "Xong!",
    id: "Selesai!",
  },
  claimed: {
    ko: "받음",
    en: "Claimed",
    zh: "已领取",
    vi: "Đã nhận",
    id: "Diklaim",
  },
  locked: {
    ko: "잠김",
    en: "Locked",
    zh: "已锁定",
    vi: "Đã khóa",
    id: "Terkunci",
  },
  lockedHint: {
    ko: "스토리 모드에서는 이전 방의 미션을 모두 끝내야 이 방이 열립니다.",
    en: "In Story mode, finish all missions in the previous room to unlock this one.",
    zh: "在故事模式下，完成上一个房间的全部任务即可解锁本房间。",
    vi: "Ở chế độ Story, hãy hoàn thành mọi nhiệm vụ ở phòng trước để mở phòng này.",
    id: "Di mode Story, selesaikan semua misi di ruangan sebelumnya untuk membuka ruangan ini.",
  },
  newRoom: {
    ko: "새 교실이 열렸습니다!",
    en: "New room unlocked!",
    zh: "新教室解锁了！",
    vi: "Đã mở phòng mới!",
    id: "Ruangan baru terbuka!",
  },
  progress: {
    ko: "진행도",
    en: "Progress",
    zh: "进度",
    vi: "Tiến độ",
    id: "Progres",
  },
  reset: {
    ko: "기록 초기화",
    en: "Reset save",
    zh: "清除存档",
    vi: "Xóa dữ liệu",
    id: "Hapus simpanan",
  },
  resetConfirm: {
    ko: "코인, 미션, 레벨을 모두 지울까요?",
    en: "Erase coins, missions and levels?",
    zh: "要清除金币、任务和等级吗？",
    vi: "Xóa hết xu, nhiệm vụ và cấp độ?",
    id: "Hapus semua koin, misi, dan level?",
  },
} satisfies Record<string, LocalizedText>;

export function DemoApp() {
  const [locale, setLocale] = useState<Locale>("id");
  const [activeId, setActiveId] = useState<string | null>("briefing");
  const [save, setSave] = useState<SaveData>(() => loadSave());
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);

  useEffect(() => {
    storeSave(save);
  }, [save]);

  const activeUnlocked = activeId !== null && isUnlocked(save, activeId);

  const workspaceStatuses = useMemo(() => {
    const map: Record<string, WorkflowStatus> = {};
    for (const workspace of WORKSPACES) {
      map[workspace.id] = workspace.id === activeId && activeUnlocked ? "running" : "idle";
    }
    return map;
  }, [activeId, activeUnlocked]);

  const activeWorkspace = WORKSPACES.find((workspace) => workspace.id === activeId) ?? null;
  const lesson = activeUnlocked ? lessonForRoom(activeId) : null;
  const { level, into, need } = levelFromXp(save.xp);
  const xpPct = Math.round((into / need) * 100);

  const setMode = (mode: GameMode) => {
    setJustUnlocked(null);
    if (mode === "story" && activeId !== null) {
      const nextSave = { ...save, mode };
      if (!isUnlocked(nextSave, activeId)) {
        setActiveId(nextSave.unlocked[0] ?? ROOM_ORDER[0]);
      }
    }
    setSave((prev) => ({ ...prev, mode }));
  };

  const resetSave = () => {
    if (!window.confirm(localized(UI.resetConfirm, locale))) return;
    const fresh = defaultSave();
    setSave(fresh);
    setActiveId(ROOM_ORDER[0]);
    setJustUnlocked(null);
  };

  const unlockedRoomName = justUnlocked
    ? WORKSPACES.find((w) => w.id === justUnlocked)
    : null;

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

        <div className="mode-toggle" role="group" aria-label="mode">
          {(["story", "free"] as const).map((mode) => (
            <button
              className={save.mode === mode ? "on" : ""}
              key={mode}
              onClick={() => setMode(mode)}
              type="button"
            >
              {localized(mode === "story" ? UI.modeStory : UI.modeFree, locale)}
            </button>
          ))}
        </div>

        <div className="stat-pill" title="coins">
          <img src="/gitarroom/coin.svg" alt="" width={18} height={18} />
          <strong>{save.coins}</strong>
        </div>
        <div className="stat-pill" title="level">
          <img src="/gitarroom/pick.svg" alt="" width={16} height={16} />
          <strong>Lv {level}</strong>
          <span className="xp-bar">
            <span style={{ width: `${xpPct}%` }} />
          </span>
          <small>
            {into}/{need}
          </small>
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
          {WORKSPACES.map((workspace) => {
            const locked = !isUnlocked(save, workspace.id);
            return (
              <button
                className={`${activeId === workspace.id ? "on" : ""}${locked ? " locked" : ""}`}
                disabled={locked}
                key={workspace.id}
                onClick={() => {
                  setJustUnlocked(null);
                  setActiveId(workspace.id);
                }}
                title={locked ? localized(UI.locked, locale) : undefined}
                type="button"
              >
                {locked ? "🔒 " : ""}
                {localized(workspace.name, locale)}
              </button>
            );
          })}
        </div>
      </header>

      {justUnlocked && unlockedRoomName ? (
        <div className="unlock-banner">
          🎉 {localized(UI.newRoom, locale)} <strong>{localized(unlockedRoomName.name, locale)}</strong>
          {" "}(+{UNLOCK_BONUS_COINS} 🪙)
        </div>
      ) : null}

      <div className="workspace-layout demo-layout">
        <section className="office-panel" data-pane="office">
          <OfficeWorld
            activeWorkspaceId={activeUnlocked ? activeId : null}
            clock={{ label: localized(UI.clock, locale), time: "--:--" }}
            locale={locale}
            officeEvents={[]}
            ready={true}
            workflowStatus={activeUnlocked && activeId ? "running" : "idle"}
            workspaceStatuses={workspaceStatuses}
          />
        </section>

        <aside
          className="lesson-panel"
          style={activeWorkspace ? { borderTopColor: activeWorkspace.accent } : undefined}
        >
          {lesson && activeWorkspace && activeId ? (
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
              <h3>
                {localized(UI.missions, locale)} ·{" "}
                {missionsForRoom(activeId).filter((m) => save.done.includes(m.id)).length}/
                {missionsForRoom(activeId).length}
              </h3>
              <ul className="mission-list">
                {missionsForRoom(activeId).map((mission) => {
                  const done = save.done.includes(mission.id);
                  return (
                    <li className={done ? "done" : ""} key={mission.id}>
                      <div>
                        <strong>{missionText(mission, "title", locale)}</strong>
                        <small>{missionText(mission, "hint", locale)}</small>
                        <small className="reward">
                          +{mission.coins} 🪙 · +{mission.xp} XP
                        </small>
                      </div>
                      {done ? (
                        <span className="claimed">✅ {localized(UI.claimed, locale)}</span>
                      ) : (
                        <button
                          onClick={() => {
                            const result = completeMission(save, mission);
                            setSave(result.save);
                            setJustUnlocked(result.unlockedRoom);
                          }}
                          type="button"
                        >
                          {localized(UI.claim, locale)}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
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
          ) : activeWorkspace && activeId && !activeUnlocked ? (
            <div className="locked-panel">
              <img src="/gitarroom/guitar.svg" alt="" width={72} height={120} />
              <p className="lesson-level">🔒 {localized(UI.locked, locale)}</p>
              <h2>{localized(activeWorkspace.name, locale)}</h2>
              <p className="lesson-desc">{localized(UI.lockedHint, locale)}</p>
            </div>
          ) : (
            <>
              <img
                className="welcome-guitar"
                src="/gitarroom/guitar.svg"
                alt="GitarRoom guitar"
                width={72}
                height={120}
              />
              <p className="lesson-level">🎸 GitarRoom</p>
              <h2>{localized(UI.welcomeTitle, locale)}</h2>
              <p className="lesson-desc">{localized(COMPANY.description, locale)}</p>
              <p className="lesson-desc">{localized(UI.pickRoom, locale)}</p>
              <p className="lesson-desc">
                {localized(UI.progress, locale)}: {save.done.length}/{MISSIONS.length} ✅ ·{" "}
                {save.coins} 🪙 · Lv {level}
              </p>
            </>
          )}
        </aside>
      </div>

      <footer className="demo-foot">
        {localized(UI.note, locale)}{" "}
        <button className="reset-btn" onClick={resetSave} type="button">
          {localized(UI.reset, locale)}
        </button>
      </footer>
    </div>
  );
}
