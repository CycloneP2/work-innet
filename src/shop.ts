import type { Locale } from "./i18n";

export type ShopKind = "guitar" | "boost" | "unlock" | "tabpack";

export type ShopItem = {
  id: string;
  kind: ShopKind;
  price: number;
  preview?: string;
  name: Partial<Record<Locale, string>>;
  desc: Partial<Record<Locale, string>>;
};

export const SHOP_ITEMS: readonly ShopItem[] = [
  {
    id: "guitar-midnight", kind: "guitar", price: 120,
    preview: "/gitarroom/guitar-midnight.svg",
    name: { en: "Midnight Guitar", id: "Gitar Midnight" },
    desc: { en: "Night-blue guitar skin.", id: "Skin gitar biru malam." },
  },
  {
    id: "guitar-crimson", kind: "guitar", price: 120,
    preview: "/gitarroom/guitar-crimson.svg",
    name: { en: "Crimson Guitar", id: "Gitar Crimson" },
    desc: { en: "Stage-red guitar skin.", id: "Skin gitar merah panggung." },
  },
  {
    id: "guitar-gold", kind: "guitar", price: 250,
    preview: "/gitarroom/guitar-gold.svg",
    name: { en: "Gold Guitar", id: "Gitar Emas" },
    desc: { en: "Shiny gold guitar skin.", id: "Skin gitar emas berkilau." },
  },
  {
    id: "xp-boost", kind: "boost", price: 80,
    name: { en: "Double XP (5 missions)", id: "Double XP (5 misi)" },
    desc: {
      en: "Double XP for your next 5 missions. Stackable.",
      id: "XP ganda untuk 5 misi berikutnya. Bisa ditumpuk.",
    },
  },
  {
    id: "unlock-all", kind: "unlock", price: 200,
    name: { en: "Unlock All Rooms", id: "Buka Semua Ruangan" },
    desc: {
      en: "Story mode: every room opens at once.",
      id: "Mode Story: semua ruangan langsung terbuka.",
    },
  },
  {
    id: "tab-pack-2", kind: "tabpack", price: 150,
    name: { en: "Tab Pack Vol.2", id: "Paket Tab Vol.2" },
    desc: {
      en: "2 bonus tabs: Sunset Ballad + Speed Run.",
      id: "2 tab bonus: Sunset Ballad + Speed Run.",
    },
  },
];

export function shopText(item: ShopItem, field: "name" | "desc", locale: Locale): string {
  return item[field][locale] ?? item[field].en ?? item[field].id ?? "";
}

/** "guitar-midnight" → "midnight"; gitar klasik = "classic". */
export function guitarSkinOf(itemId: string): string {
  return itemId === "guitar-midnight" || itemId === "guitar-crimson" || itemId === "guitar-gold"
    ? itemId.replace("guitar-", "")
    : "classic";
}

export function guitarImage(skin: string): string {
  return skin === "classic" ? "/gitarroom/guitar.svg" : `/gitarroom/guitar-${skin}.svg`;
}
