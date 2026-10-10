import { useEffect, useState } from "react";
import { playTab, stopAll, subscribePlayback, type MelodyNote } from "./audio";
import { localized, type Locale } from "./i18n";
import type { SoloTab } from "./solo-tabs";

const STRING_NAMES = ["e", "B", "G", "D", "A", "E"];

/** Render not jadi tab ASCII 6 senar. */
export function renderTab(notes: readonly MelodyNote[]): string {
  const wide = notes.some((note) => note.f >= 10);
  const lines = STRING_NAMES.map((name) => `${name}|`);
  for (const note of notes) {
    const cell = wide ? `-${note.f}-`.padEnd(4, "-") : `-${note.f}-`;
    const blank = "-".repeat(wide ? 4 : 3);
    lines.forEach((_, i) => {
      lines[i] += i === note.s - 1 ? cell : blank;
    });
  }
  return lines.join("\n");
}

export function TabCard({
  tab,
  locale,
  locked,
  lockHint,
  playLabel,
  stopLabel,
}: {
  tab: SoloTab;
  locale: Locale;
  locked: boolean;
  lockHint: string;
  playLabel: string;
  stopLabel: string;
}) {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [myId, setMyId] = useState<number | null>(null);

  useEffect(() => subscribePlayback(setPlayingId), []);
  useEffect(() => () => stopAll(), []);

  const playing = myId !== null && playingId === myId;

  return (
    <article className={`tab-card${locked ? " locked" : ""}`}>
      <header>
        <strong>
          {locked ? "🔒 " : "🎸 "}
          {localized(tab.title, locale)}
        </strong>
        <small>♩={tab.tempo}</small>
      </header>
      <p>{locked ? lockHint : localized(tab.desc, locale)}</p>
      {locked ? null : (
        <>
          <pre>{renderTab(tab.notes)}</pre>
          <button
            onClick={() => {
              if (playing) {
                stopAll();
                setMyId(null);
              } else {
                setMyId(playTab(tab.notes, tab.tempo));
              }
            }}
            type="button"
          >
            {playing ? `⏹ ${stopLabel}` : `▶ ${playLabel}`}
          </button>
        </>
      )}
    </article>
  );
}
