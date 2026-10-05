/**
 * Hand-highlighted code. Samples are written as plain text with inline
 * markers — `«k:import»` — where the letter is the syntax class:
 *
 *   k keyword · s string · f function · t type/tag · c constant · m comment · v variable
 *
 * `tokenize` turns that into spans; the hero morph layer uses the same
 * tokens to colour torph's word fragments by character offset.
 */

export interface Token {
  /** Syntax class, or `""` for plain text. */
  readonly cls: string;
  readonly text: string;
}

const MARK = /«([a-z]):([^»]*)»/g;

export const tokenize = (src: string): Token[] => {
  const out: Token[] = [];
  let last = 0;
  for (const m of src.matchAll(MARK)) {
    if (m.index > last) out.push({ cls: "", text: src.slice(last, m.index) });
    out.push({ cls: m[1]!, text: m[2]! });
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push({ cls: "", text: src.slice(last) });
  return out;
};

export const plainText = (tokens: ReadonlyArray<Token>): string =>
  tokens.map((t) => t.text).join("");

/** One class per character of `plainText(tokens)`. */
export const colourMap = (tokens: ReadonlyArray<Token>): string[] => {
  const out: string[] = [];
  for (const t of tokens) for (const _ of t.text) out.push(t.cls);
  return out;
};
