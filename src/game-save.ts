import { MISSIONS, ROOM_ORDER, type Mission } from "./missions";

export type GameMode = "story" | "free";

export type SaveData = {
  version: 1;
  mode: GameMode;
  coins: number;
  xp: number;
  /** ids of completed missions */
  done: string[];
  /** unlocked room ids (story mode) */
  unlocked: string[];
};

const KEY = "gitarroom-save-v1";
/** Bonus coins every time a new room unlocks in story mode. */
export const UNLOCK_BONUS_COINS = 25;

export function defaultSave(): SaveData {
  return { version: 1, mode: "story", coins: 0, xp: 0, done: [], unlocked: [ROOM_ORDER[0]] };
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    if (parsed?.version !== 1) return defaultSave();
    return {
      ...defaultSave(),
      ...parsed,
      done: Array.isArray(parsed.done) ? parsed.done : [],
      unlocked:
        Array.isArray(parsed.unlocked) && parsed.unlocked.length > 0
          ? parsed.unlocked
          : [ROOM_ORDER[0]],
    };
  } catch {
    return defaultSave();
  }
}

export function storeSave(save: SaveData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch {
    /* private mode etc. — game still works, just not persisted */
  }
}

/** XP to go from `level` to `level + 1` is `level * 100`. */
export function levelFromXp(xp: number): { level: number; into: number; need: number } {
  let level = 1;
  let rest = Math.max(0, xp);
  while (rest >= level * 100) {
    rest -= level * 100;
    level += 1;
  }
  return { level, into: rest, need: level * 100 };
}

export function isUnlocked(save: SaveData, roomId: string): boolean {
  return save.mode === "free" || save.unlocked.includes(roomId);
}

export function missionsForRoom(roomId: string): Mission[] {
  return MISSIONS.filter((mission) => mission.roomId === roomId);
}

export function completeMission(
  save: SaveData,
  mission: Mission,
): { save: SaveData; unlockedRoom: string | null } {
  if (save.done.includes(mission.id)) return { save, unlockedRoom: null };
  const done = [...save.done, mission.id];
  let coins = save.coins + mission.coins;
  const xp = save.xp + mission.xp;
  let unlocked = save.unlocked;
  let unlockedRoom: string | null = null;

  const roomFinished = missionsForRoom(mission.roomId).every((m) => done.includes(m.id));
  if (roomFinished) {
    const next = ROOM_ORDER[ROOM_ORDER.indexOf(mission.roomId as (typeof ROOM_ORDER)[number]) + 1];
    if (next && !unlocked.includes(next)) {
      unlocked = [...unlocked, next];
      unlockedRoom = next;
      coins += UNLOCK_BONUS_COINS;
    }
  }
  return { save: { ...save, done, coins, xp, unlocked }, unlockedRoom };
}
