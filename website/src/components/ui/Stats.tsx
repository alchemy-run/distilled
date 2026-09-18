import { For, type JSX } from "solid-js";

export interface Stat {
  readonly n: string;
  readonly label: string;
}

/**
 * A row of big numbers in one bordered panel: two columns on phones, four
 * on wider screens. `tone` colours the numbers (shame is neutral, bench is
 * teal).
 */
export const StatRow = (props: {
  stats: ReadonlyArray<Stat>;
  tone?: "teal";
  class?: string;
  label?: string;
}) => (
  <section
    class={`panel grid grid-cols-2 overflow-hidden sm:grid-cols-4 ${props.class ?? ""}`}
    aria-label={props.label ?? "Totals"}
  >
    <For each={props.stats}>
      {(stat) => (
        <div class="grid gap-1 border-line px-5 py-5 not-first:sm:border-l max-sm:nth-[n+3]:border-t max-sm:even:border-l">
          <span
            class="display-72 text-[2.1rem] leading-none tabular-nums"
            classList={{ "text-teal-2": props.tone === "teal" }}
          >
            {stat.n}
          </span>
          <span class="font-mono text-[0.72rem] tracking-[0.06em] text-fg-3 uppercase">
            {stat.label}
          </span>
        </div>
      )}
    </For>
  </section>
);

/** Horizontal bar with a coloured fill, `width` as a percentage. */
export const Bar = (props: { width: number; class?: string; children?: JSX.Element }) => (
  <div
    class={`relative h-[0.4rem] overflow-hidden rounded-full border border-line bg-bg ${props.class ?? ""}`}
    aria-hidden="true"
  >
    <span
      class="absolute inset-y-0 left-0 block rounded-[inherit] bg-linear-90 from-accent to-rose"
      style={{ width: `${props.width}%` }}
    />
    {props.children}
  </div>
);
