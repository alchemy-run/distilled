/** Number and unit formatting shared by the pages. */

const fmt = new Intl.NumberFormat("en-US");
const fmt1 = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const n = (value: number) => fmt.format(value);

/** One decimal, but a non-zero rate never rounds away to `0.0`. */
export const rate = (value: number) =>
  value > 0 && value < 0.05 ? "<0.1" : fmt1.format(value);

export const kb = (bytes: number) => `${fmt1.format(bytes / 1024)} KB`;

/** Nanoseconds → the largest unit that keeps the number readable. */
export const ns = (value: number) =>
  value >= 1e6
    ? `${fmt1.format(value / 1e6)} ms`
    : value >= 1e3
      ? `${fmt.format(Math.round(value / 1e3))} µs`
      : `${fmt.format(Math.round(value))} ns`;

export const shortDate = (iso: string): string => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toISOString().slice(0, 10);
};

export const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;
