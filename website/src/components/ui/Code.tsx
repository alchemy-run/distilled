import { For } from "solid-js";
import { tokenize } from "../../lib/highlight.ts";

/**
 * A highlighted code block. `src` uses the `«k:…»` markers described in
 * `lib/highlight.ts`. Never scrolls: `data-fit` lets `fitCode()` shrink the
 * type until the widest line fits, down to 60%.
 */
export const Code = (props: {
  src: string;
  class?: string;
  classList?: Record<string, boolean | undefined>;
  /** Base font size in rem; scaled by `--fit`. */
  size?: number;
  hidden?: boolean;
}) => (
  <pre
    data-fit
    class={props.class}
    classList={props.classList}
    style={{ "font-size": `calc(${props.size ?? 0.78}rem * var(--fit, 1))` }}
    aria-hidden={props.hidden ? "true" : undefined}
  >
    <code>
      <For each={tokenize(props.src)}>
        {(t) => (t.cls ? <span class={t.cls}>{t.text}</span> : t.text)}
      </For>
    </code>
  </pre>
);
