import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  buy as buySound,
  click as clickSound,
  coin as coinSound,
  deny as denySound,
  fanfare as fanfareSound,
  isMuted,
  setMuted,
  strum,
} from "./audio";
import { COMPANY, STATUS_LABELS, THEME, WORKSPACES } from "./company.config";
import { asset } from "./assets";
import { ChordChart } from "./ChordChart";
import { dailyText, pickDailies, todayKey } from "./dailies";
import {
  buyItem,
  claimDaily,
  completeMission,
  defaultSave,
  equipGuitar,
  isUnlocked,
  levelFromXp,
  loadSave,
  missionsForRoom,
  roomFinished,
  storeSave,
  UNLOCK_BONUS_COINS,
  type GameMode,
  type SaveData,
} from "./game-save";
import { LOCALES, LOCALE_LABELS, localized, type Locale, type LocalizedText } from "./i18n";
import { MISSIONS, missionText, ROOM_ORDER } from "./missions";
import { lessonForRoom, lessonPoints, lessonPractice } from "./music-lessons";
import { OfficeWorld } from "./OfficeWorld";
import { guitarImage, guitarSkinOf, SHOP_ITEMS, shopText } from "./shop";
import { isTabUnlocked, SOLO_TABS, tabForRoom } from "./solo-tabs";
import { TabCard } from "./TabCard";
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

type PanelTab = "lesson" | "daily" | "tabs" | "shop";

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
  tabLesson: {
    ko: "📚 수업",
    en: "📚 Lesson",
    zh: "📚 课程",
    vi: "📚 Bài học",
    id: "📚 Materi",
  },
  tabDaily: {
    ko: "☀️ 일일",
    en: "☀️ Daily",
    zh: "☀️ 每日",
    vi: "☀️ Hằng ngày",
    id: "☀️ Harian",
  },
  tabTabs: {
    ko: "🎸 타브",
    en: "🎸 Tabs",
    zh: "🎸 吉他谱",
    vi: "🎸 Tab",
    id: "🎸 Tab",
  },
  tabShop: {
    ko: "🛒 상점",
    en: "🛒 Shop",
    zh: "🛒 商店",
    vi: "🛒 Cửa hàng",
    id: "🛒 Toko",
  },
  dailyHint: {
    ko: "매일 바뀌어요. 자정에 리셋됩니다.",
    en: "Fresh every day. Resets at midnight.",
    zh: "每天更新，午夜重置。",
    vi: "Mới mỗi ngày. Đặt lại lúc nửa đêm.",
    id: "Ganti tiap hari. Reset tengah malam.",
  },
  buy: {
    ko: "구매",
    en: "Buy",
    zh: "购买",
    vi: "Mua",
    id: "Beli",
  },
  owned: {
    ko: "보유 중",
    en: "Owned",
    zh: "已拥有",
    vi: "Đã có",
    id: "Punya",
  },
  use: {
    ko: "사용",
    en: "Equip",
    zh: "装备",
    vi: "Dùng",
    id: "Pakai",
  },
  using: {
    ko: "사용 중",
    en: "Equipped",
    zh: "使用中",
    vi: "Đang dùng",
    id: "Dipakai",
  },
  boostLeft: {
    ko: "더블 XP {n}개 남음",
    en: "Double XP: {n} left",
    zh: "双倍经验还剩 {n} 次",
    vi: "Double XP còn {n} lượt",
    id: "Double XP sisa {n} misi",
  },
  needCoins: {
    ko: "코인이 부족해요!",
    en: "Not enough coins!",
    zh: "金币不够！",
    vi: "Không đủ xu!",
    id: "Koin kurang!",
  },
  rewardOpen: {
    ko: "보상 타브",
    en: "Reward tab",
    zh: "奖励吉他谱",
    vi: "Tab phần thưởng",
    id: "Tab hadiah",
  },
  openPlay: {
    ko: "열고 연주하기",
    en: "Open & play",
    zh: "打开并演奏",
    vi: "Mở & chơi",
    id: "Buka & mainkan",
  },
  unlockByRoom: {
    ko: "조건: {room} 완료",
    en: "Finish: {room}",
    zh: "完成：{room}",
    vi: "Hoàn thành: {room}",
    id: "Selesaikan: {room}",
  },
  unlockByPack: {
    ko: "상점에서 타브 팩 Vol.2 구매",
    en: "Buy Tab Pack Vol.2 in the Shop",
    zh: "在商店购买 Tab Pack Vol.2",
    vi: "Mua Tab Pack Vol.2 ở Cửa hàng",
    id: "Beli Paket Tab Vol.2 di Toko",
  },
  play: {
    ko: "연주",
    en: "Play",
    zh: "演奏",
    vi: "Chơi",
    id: "Mainkan",
  },
  stop: {
    ko: "정지",
    en: "Stop",
    zh: "停止",
    vi: "Dừng",
    id: "Stop",
  },
  balance: {
    ko: "잔액",
    en: "Balance",
    zh: "余额",
    vi: "Số dư",
    id: "Saldo",
  },
} satisfies Record<string, LocalizedText>;

const PANEL_TABS: { id: PanelTab; labelKey: "tabLesson" | "tabDaily" | "tabTabs" | "tabShop" }[] = [
  { id: "lesson", labelKey: "tabLesson" },
  { id: "daily", labelKey: "tabDaily" },
  { id: "tabs", labelKey: "tabTabs" },
  { id: "shop", labelKey: "tabShop" },
];

export function DemoApp() {
  const [locale, setLocale] = useState<Locale>("id");
  const [activeId, setActiveId] = useState<string | null>("briefing");
  const [save, setSave] = useState<SaveData>(() => loadSave());
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);
  const [panelTab, setPanelTab] = useState<PanelTab>("lesson");
  const [muted, setMutedState] = useState<boolean>(() => isMuted());
  const [deniedId, setDeniedId] = useState<string | null>(null);

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

  const dateKey = todayKey();
  const dailies = useMemo(() => pickDailies(dateKey), [dateKey]);
  const dailyDone = save.daily.date === dateKey ? save.daily.done : [];
  const tabsUnlockedCount = SOLO_TABS.filter((tab) => isTabUnlocked(tab, save)).length;
  const rewardTab = activeId ? tabForRoom(activeId) : null;
  const showReward = activeId !== null && rewardTab !== null && roomFinished(save, activeId);

  const selectRoom = (id: string) => {
    setJustUnlocked(null);
    setActiveId(id);
    setPanelTab("lesson");
    if (isUnlocked(save, id)) {
      const roomLesson = lessonForRoom(id);
      if (roomLesson?.chords[0]) strum(roomLesson.chords[0].frets);
    }
  };

  const setMode = (mode: GameMode) => {
    clickSound();
    setJustUnlocked(null);
    if (mode === "story" && activeId !== null) {
      const nextSave = { ...save, mode };
      if (!isUnlocked(nextSave, activeId)) {
        setActiveId(nextSave.unlocked[0] ?? ROOM_ORDER[0]);
      }
    }
    setSave((prev) => ({ ...prev, mode }));
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) clickSound();
  };

  const resetSave = () => {
    if (!window.confirm(localized(UI.resetConfirm, locale))) return;
    const fresh = defaultSave();
    setSave(fresh);
    setActiveId(ROOM_ORDER[0]);
    setJustUnlocked(null);
    setPanelTab("lesson");
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
          <img src={asset("gitarroom/coin.svg")} alt="" width={18} height={18} />
          <strong>{save.coins}</strong>
        </div>
        <div className="stat-pill" title="level">
          <img src={asset("gitarroom/pick.svg")} alt="" width={16} height={16} />
          <strong>Lv {level}</strong>
          <span className="xp-bar">
            <span style={{ width: `${xpPct}%` }} />
          </span>
          <small>
            {into}/{need}
          </small>
        </div>
        <button className="icon-btn" onClick={toggleMute} title={muted ? "unmute" : "mute"} type="button">
          {muted ? "🔇" : "🔊"}
        </button>

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
            onClick={() => {
              clickSound();
              setActiveId(null);
              setPanelTab("lesson");
            }}
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
                onClick={() => selectRoom(workspace.id)}
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
          <nav className="panel-tabs">
            {PANEL_TABS.map(({ id, labelKey }) => (
              <button
                className={panelTab === id ? "on" : ""}
                key={id}
                onClick={() => {
                  clickSound();
                  setPanelTab(id);
                }}
                type="button"
              >
                {localized(UI[labelKey], locale)}
                {id === "daily" && dailyDone.length < dailies.length ? (
                  <span className="tab-badge">{dailies.length - dailyDone.length}</span>
                ) : null}
              </button>
            ))}
          </nav>

          {panelTab === "lesson" ? (
            lesson && activeWorkspace && activeId ? (
              <>
                {showReward && rewardTab ? (
                  <div className="reward-banner">
                    🎁 {localized(UI.rewardOpen, locale)}:{" "}
                    <strong>{localized(rewardTab.title, locale)}</strong>{" "}
                    <button onClick={() => setPanelTab("tabs")} type="button">
                      {localized(UI.openPlay, locale)}
                    </button>
                  </div>
                ) : null}
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
                            +{mission.coins} 🪙 · +{mission.xp}
                            {save.xpBoost > 0 && !done ? "×2" : ""} XP
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
                              if (result.unlockedRoom) fanfareSound();
                              else coinSound();
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
                <img src={guitarImage(save.activeGuitar)} alt="" width={72} height={120} />
                <p className="lesson-level">🔒 {localized(UI.locked, locale)}</p>
                <h2>{localized(activeWorkspace.name, locale)}</h2>
                <p className="lesson-desc">{localized(UI.lockedHint, locale)}</p>
              </div>
            ) : (
              <>
                <img
                  className="welcome-guitar"
                  src={guitarImage(save.activeGuitar)}
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
            )
          ) : null}

          {panelTab === "daily" ? (
            <>
              <p className="lesson-level">☀️ {dateKey}</p>
              <h2>{localized(UI.tabDaily, locale)}</h2>
              <p className="lesson-desc">{localized(UI.dailyHint, locale)}</p>
              <ul className="mission-list">
                {dailies.map((daily) => {
                  const done = dailyDone.includes(daily.id);
                  return (
                    <li className={done ? "done" : ""} key={daily.id}>
                      <div>
                        <strong>{dailyText(daily, "title", locale)}</strong>
                        <small>{dailyText(daily, "hint", locale)}</small>
                        <small className="reward">
                          +{daily.coins} 🪙 · +{daily.xp}
                          {save.xpBoost > 0 && !done ? "×2" : ""} XP
                        </small>
                      </div>
                      {done ? (
                        <span className="claimed">✅ {localized(UI.claimed, locale)}</span>
                      ) : (
                        <button
                          onClick={() => {
                            const result = claimDaily(save, daily, dateKey);
                            if (result.ok) {
                              setSave(result.save);
                              coinSound();
                            }
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
            </>
          ) : null}

          {panelTab === "tabs" ? (
            <>
              <p className="lesson-level">
                🎸 {tabsUnlockedCount}/{SOLO_TABS.length}
              </p>
              <h2>{localized(UI.tabTabs, locale)}</h2>
              <div className="tab-list">
                {SOLO_TABS.map((tab) => {
                  const unlocked = isTabUnlocked(tab, save);
                  const roomId = "pack" in tab.source ? null : tab.source.roomId;
                  const roomName =
                    roomId === null
                      ? null
                      : WORKSPACES.find((w) => w.id === roomId)?.name ?? WORKSPACES[0].name;
                  const hint =
                    roomName === null
                      ? localized(UI.unlockByPack, locale)
                      : localized(UI.unlockByRoom, locale).replace(
                          "{room}",
                          localized(roomName, locale),
                        );
                  return (
                    <TabCard
                      key={tab.id}
                      lockHint={hint}
                      locked={!unlocked}
                      locale={locale}
                      playLabel={localized(UI.play, locale)}
                      stopLabel={localized(UI.stop, locale)}
                      tab={tab}
                    />
                  );
                })}
              </div>
            </>
          ) : null}

          {panelTab === "shop" ? (
            <>
              <p className="lesson-level">
                {localized(UI.balance, locale)}: {save.coins} 🪙
              </p>
              <h2>{localized(UI.tabShop, locale)}</h2>
              {save.xpBoost > 0 ? (
                <p className="boost-note">
                  ⚡ {localized(UI.boostLeft, locale).replace("{n}", String(save.xpBoost))}
                </p>
              ) : null}
              <div className="shop-list">
                {SHOP_ITEMS.map((item) => {
                  const owned = item.kind !== "boost" && save.owned.includes(item.id);
                  const skin = guitarSkinOf(item.id);
                  const equipped = item.kind === "guitar" && save.activeGuitar === skin;
                  const soldOut =
                    owned || (item.kind === "unlock" && save.unlocked.length >= ROOM_ORDER.length);
                  return (
                    <article className="shop-item" key={item.id}>
                      {item.preview ? (
                        <img src={item.preview} alt="" width={36} height={60} />
                      ) : (
                        <span className="shop-emoji">
                          {item.kind === "boost" ? "⚡" : item.kind === "unlock" ? "🗝️" : "🎼"}
                        </span>
                      )}
                      <div>
                        <strong>{shopText(item, "name", locale)}</strong>
                        <small>{shopText(item, "desc", locale)}</small>
                        <small className="reward">💰 {item.price} 🪙</small>
                        {deniedId === item.id ? (
                          <small className="denied">{localized(UI.needCoins, locale)}</small>
                        ) : null}
                      </div>
                      {equipped ? (
                        <span className="claimed">🎸 {localized(UI.using, locale)}</span>
                      ) : soldOut ? (
                        item.kind === "guitar" ? (
                          <button
                            onClick={() => {
                              setSave(equipGuitar(save, skin));
                              clickSound();
                            }}
                            type="button"
                          >
                            {localized(UI.use, locale)}
                          </button>
                        ) : (
                          <span className="claimed">✅ {localized(UI.owned, locale)}</span>
                        )
                      ) : (
                        <button
                          onClick={() => {
                            const result = buyItem(save, item);
                            if (result.ok) {
                              setSave(result.save);
                              buySound();
                            } else {
                              denySound();
                              setDeniedId(item.id);
                              window.setTimeout(() => {
                                setDeniedId((prev) => (prev === item.id ? null : prev));
                              }, 1600);
                            }
                          }}
                          type="button"
                        >
                          {localized(UI.buy, locale)}
                        </button>
                      )}
                    </article>
                  );
                })}
              </div>
            </>
          ) : null}
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
