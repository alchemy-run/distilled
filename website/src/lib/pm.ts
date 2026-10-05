/**
 * The reader's package manager, shared by every install command on the page:
 * pick `bun` in the hero and the catalogue's install buttons say `bun` too.
 *
 * The signal lives at module scope on purpose — the site is prerendered, so
 * the server only ever renders the default, and the remembered choice is
 * adopted on the client in `restorePm`.
 */
import { createSignal } from "solid-js";
import { readStorage, writeStorage } from "./dom.ts";

export const VERB = { pnpm: "add", npm: "install", bun: "add" } as const;
export type Pm = keyof typeof VERB;

export const isPm = (value: string | null): value is Pm =>
  value !== null && value in VERB;

const [pm, setPm] = createSignal<Pm>("pnpm");

export { pm };

/** Adopt the remembered choice. Client only; safe to call more than once. */
export const restorePm = () => {
  const stored = readStorage("pm");
  if (isPm(stored)) setPm(stored);
};

export const choosePm = (next: Pm) => {
  setPm(next);
  writeStorage("pm", next);
};

/** `pnpm add @distilled.cloud/aws effect`, in the reader's package manager. */
export const installCommand = (name: string) =>
  `${pm()} ${VERB[pm()]} ${name} effect`;

/** Just the `pnpm add` part, for buttons too narrow to hold the command. */
export const installVerb = () => `${pm()} ${VERB[pm()]}`;
