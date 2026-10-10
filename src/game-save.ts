import { MISSIONS, ROOM_ORDER, type Mission } from "./missions";
import { guitarSkinOf, type ShopItem } from "./shop";
import type { Daily } from "./dailies";

export type GameMode = "story" | "free";

export type SaveData = {
  version: 2;
  mode: GameMode;
  coins: number;
  xp: number;
  /** ids of completed room missions */
  done: string[];
  /** unlocked room ids (story mode) */
  unlocked: string[];
  /** owned shop item ids (guitars, tab packs, unlock-all) */
  owned: string[];
  /** equipped guitar skin: classic | midnight | crimson | gold */
  activeGuitar: string;
  /** remaining double-XP missions */
  xpBoost: number;
  /** daily progress, keyed by date so it resets every day */
  daily: { date: string; done: string[] };
};

const KEY = "gitarroom-save-v1";
/** Bonus coins every time a new room unlocks in story mode. */
export const UNLOCK_BONUS_COINS = 25;
/** How many boosted missions one XP-boost purchase gives. */
export const BOOST_MISSIONS = 5;

export function defaultSave(): SaveData {
  return {
    version: 2,
    mode: "story",
    coins: 0,
    xp: 0,
    done: [],
    unlocked: [ROOM_ORDER[0]],
    owned: [],
    activeGuitar: "classic",
    xpBoost: 0,
    daily: { date: "", done: [] },
  };
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw) as Partial<Omit<SaveData, "version">> & { version?: number };
    // v1 → v2 migration: keep progress, fill new fields with defaults.
    if (parsed?.version !== 1 && parsed?.version !== 2) return defaultSave();
    const fresh = defaultSave();
    return {
      ...fresh,
      mode: parsed.mode === "free" ? "free" : "story",
      coins: typeof parsed.coins === "number" ? parsed.coins : 0,
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      done: Array.isArray(parsed.done) ? parsed.done : [],
      unlocked:
        Array.isArray(parsed.unlocked) && parsed.unlocked.length > 0
          ? parsed.unlocked
          : [ROOM_ORDER[0]],
      owned: Array.isArray(parsed.owned) ? parsed.owned : [],
      activeGuitar: typeof parsed.activeGuitar === "string" ? parsed.activeGuitar : "classic",
      xpBoost: typeof parsed.xpBoost === "number" ? parsed.xpBoost : 0,
      daily:
        parsed.daily && typeof parsed.daily.date === "string" && Array.isArray(parsed.daily.done)
          ? parsed.daily
          : fresh.daily,
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

export function roomFinished(save: SaveData, roomId: string): boolean {
  const list = missionsForRoom(roomId);
  return list.length > 0 && list.every((m) => save.done.includes(m.id));
}

function spendBoost(save: SaveData, baseXp: number): { xp: number; xpBoost: number } {
  if (save.xpBoost > 0) return { xp: baseXp * 2, xpBoost: save.xpBoost - 1 };
  return { xp: baseXp, xpBoost: save.xpBoost };
}

export function completeMission(
  save: SaveData,
  mission: Mission,
): { save: SaveData; unlockedRoom: string | null } {
  if (save.done.includes(mission.id)) return { save, unlockedRoom: null };
  const done = [...save.done, mission.id];
  const gained = spendBoost(save, mission.xp);
  let coins = save.coins + mission.coins;
  const xp = save.xp + gained.xp;
  let unlocked = save.unlocked;
  let unlockedRoom: string | null = null;

  if (roomFinished({ ...save, done }, mission.roomId)) {
    const next = ROOM_ORDER[ROOM_ORDER.indexOf(mission.roomId as (typeof ROOM_ORDER)[number]) + 1];
    if (next && !unlocked.includes(next)) {
      unlocked = [...unlocked, next];
      unlockedRoom = next;
      coins += UNLOCK_BONUS_COINS;
    }
  }
  return { save: { ...save, done, coins, xp, unlocked, xpBoost: gained.xpBoost }, unlockedRoom };
}

export function claimDaily(
  save: SaveData,
  daily: Daily,
  dateKey: string,
): { save: SaveData; ok: boolean } {
  const day = save.daily.date === dateKey ? save.daily : { date: dateKey, done: [] as string[] };
  if (day.done.includes(daily.id)) return { save, ok: false };
  const gained = spendBoost(save, daily.xp);
  return {
    save: {
      ...save,
      coins: save.coins + daily.coins,
      xp: save.xp + gained.xp,
      xpBoost: gained.xpBoost,
      daily: { date: dateKey, done: [...day.done, daily.id] },
    },
    ok: true,
  };
}

export type BuyResult = { save: SaveData; ok: boolean; reason: "ok" | "coins" | "owned" };

export function buyItem(save: SaveData, item: ShopItem): BuyResult {
  if (item.kind !== "boost" && save.owned.includes(item.id)) {
    return { save, ok: false, reason: "owned" };
  }
  if (item.kind === "unlock" && save.unlocked.length >= ROOM_ORDER.length) {
    return { save, ok: false, reason: "owned" };
  }
  if (save.coins < item.price) return { save, ok: false, reason: "coins" };

  let next: SaveData = { ...save, coins: save.coins - item.price };
  if (item.kind === "guitar") {
    next = {
      ...next,
      owned: [...next.owned, item.id],
      activeGuitar: guitarSkinOf(item.id),
    };
  } else if (item.kind === "boost") {
    next = { ...next, xpBoost: next.xpBoost + BOOST_MISSIONS };
  } else if (item.kind === "unlock") {
    next = { ...next, owned: [...next.owned, item.id], unlocked: [...ROOM_ORDER] };
  } else {
    next = { ...next, owned: [...next.owned, item.id] };
  }
  return { save: next, ok: true, reason: "ok" };
}

export function equipGuitar(save: SaveData, skin: string): SaveData {
  if (skin !== "classic" && !save.owned.includes(`guitar-${skin}`)) return save;
  return { ...save, activeGuitar: skin };
}
