import type { JSX } from "solid-js";

/** Off-screen until focused: the first tab stop on every page. */
export const SkipLink = (props: { href: string; children: JSX.Element }) => (
  <a
    class="absolute -top-12 left-4 z-100 rounded-md bg-accent px-3 py-2 text-accent-ink focus:top-4"
    href={props.href}
    // The router handles the hash itself, which skips the browser's own
    // "focus the fragment target", so move focus by hand.
    onClick={() => document.querySelector<HTMLElement>(props.href)?.focus()}
  >
    {props.children}
  </a>
);
