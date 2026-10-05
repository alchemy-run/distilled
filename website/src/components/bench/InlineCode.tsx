import { For } from "solid-js";

/** Renders `code` spans in a plain string as `<code>`; bench descriptions use them. */
export const InlineCode = (props: { text: string }) => (
  <For each={props.text.split(/(`[^`]+`)/)}>
    {(part) =>
      part.startsWith("`") && part.endsWith("`") ? <code>{part.slice(1, -1)}</code> : part
    }
  </For>
);
