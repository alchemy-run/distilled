import { createSignal, type JSX, onCleanup } from "solid-js";
import { CheckIcon, CopyIcon } from "./Icons.tsx";

/** Copies `text()` to the clipboard and swaps to a tick for a moment. */
export const CopyButton = (props: {
  text: () => string;
  label: string;
  class?: string;
  /** Visible label. Without one the button is a square holding the icon. */
  children?: JSX.Element;
}) => {
  const [copied, setCopied] = createSignal(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  onCleanup(() => clearTimeout(timer));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(props.text());
      setCopied(true);
    } catch {}
    clearTimeout(timer);
    timer = setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      class={`copy inline-flex flex-none cursor-pointer items-center justify-center gap-[0.4rem] rounded-md border border-line-2 bg-bg-3 p-0 text-fg-2 transition-[color,border-color] hover:border-fg-3 hover:text-fg ${props.children === undefined ? "size-8" : ""} ${props.class ?? ""}`}
      classList={{ "is-copied": copied() }}
      aria-label={props.label}
      title={props.label}
      onClick={copy}
    >
      {/* Both icons share one cell so the swap does not move the label. */}
      <span class="grid size-[15px] flex-none place-items-center">
        <CopyIcon class="copy-icon size-[15px]" />
        <CheckIcon class="copy-done size-[15px]" />
      </span>
      {props.children}
    </button>
  );
};
