/**
 * Apply many text edits to a generated module in one pass (dev-time only).
 *
 * The codegen passes edit modules of several MB with tens of thousands of
 * edits. Applying them one at a time (`out = out.slice(0, s) + t +
 * out.slice(e)`) copies the whole module per edit; this copies it once.
 */

/** Replace `code.slice(start, end)` with `text`; `start === end` inserts. */
export type Edit = readonly [start: number, end: number, text: string];

/**
 * `code` with every edit applied. Offsets index the original `code`. Edits
 * must not overlap; edits that only touch (one ends where the next starts)
 * are fine, and inserts at the same position keep their order in `edits`.
 */
export const applyEdits = (code: string, edits: ReadonlyArray<Edit>): string => {
  if (!edits.length) return code;
  const sorted = edits
    .map((edit, i) => [edit, i] as const)
    .sort(([a, i], [b, j]) => a[0] - b[0] || a[1] - b[1] || i - j);
  const parts: string[] = [];
  let pos = 0;
  for (const [[start, end, text]] of sorted) {
    if (start < pos || end < start) {
      throw new Error(
        `applyEdits: edit [${start}, ${end}) is reversed or overlaps an edit ending at ${pos}`,
      );
    }
    parts.push(code.slice(pos, start), text);
    pos = end;
  }
  parts.push(code.slice(pos));
  return parts.join("");
};
