import { Show } from "solid-js";

/** Monogram for brands without a mark: first letter, or two for hyphenated names. */
const monogram = (short: string): string => {
  const parts = short.split("-").filter(Boolean);
  const letters =
    parts.length > 1
      ? parts
          .slice(0, 2)
          .map((p) => p[0])
          .join("")
      : short.slice(0, 1);
  return letters.toUpperCase();
};

/**
 * A provider's brand mark from the `/icons.svg` sprite (emitted by
 * `build/plugin.ts`), or a serif monogram when there is no entry for it.
 * The tile itself takes `class` so callers pick the size and hover colour.
 */
export const ProviderMark = (props: {
  dir: string;
  short: string;
  hasIcon: boolean;
  class?: string;
  /** Icon size within the tile. */
  icon?: string;
}) => (
  <span
    class={`grid place-items-center rounded-lg border border-line bg-bg text-fg transition-[color,border-color,background-color] ${props.class ?? "size-[2.1rem]"}`}
    aria-hidden="true"
  >
    <Show
      when={props.hasIcon}
      fallback={
        <span class="display-48 text-[0.95rem] tracking-[0.02em] text-fg-2">
          {monogram(props.short)}
        </span>
      }
    >
      <svg class={`fill-current ${props.icon ?? "size-[1.15rem]"}`}>
        <use href={`/icons.svg#i-${props.dir}`} />
      </svg>
    </Show>
  </span>
);
