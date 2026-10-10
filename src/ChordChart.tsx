import type { ChordShape } from "./music-lessons";

const STRINGS = ["E", "A", "D", "G", "B", "e"] as const;
const FRETS = [1, 2, 3, 4, 5] as const;

/**
 * Diagram chord gitar: 6 senar (kiri = E rendah) × 5 fret.
 * ○ = los, ✕ = jangan dibunyikan, ● = tekan di fret itu.
 */
export function ChordChart({ chord }: { chord: ChordShape }) {
  return (
    <figure className="chord-chart" aria-label={`Chord ${chord.name}`}>
      <figcaption>{chord.name}</figcaption>
      <div className="chord-grid" role="img" aria-hidden="true">
        {chord.frets.map((fret, stringIndex) => (
          <div className="chord-string" key={`${chord.name}-${stringIndex}`}>
            <span className="chord-head">
              {fret === "x" ? "✕" : fret === 0 ? "○" : ""}
            </span>
            {FRETS.map((fretRow) => (
              <span
                className={`chord-cell${fretRow === 1 ? " nut" : ""}${fret === fretRow ? " dot" : ""}`}
                key={fretRow}
              />
            ))}
            <span className="chord-string-name">{STRINGS[stringIndex]}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
