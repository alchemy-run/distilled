/**
 * Human-readable delta between two Smithy model snapshots (dev-time only),
 * as JSON pointers. Used by the patch audit to say what a patch changes.
 */

/** Model files keyed by path relative to `.generated-specs`, as text. */
export type Models = Map<string, string>;

export const MAX_DIFF_LINES = 12;

const isObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v);

const show = (v: unknown): string => {
  const text = JSON.stringify(v);
  return text.length > 60 ? text.slice(0, 57) + "…" : text;
};

/** JSON pointers at which `a` (with the patch) and `b` (without) differ. */
const diffPointers = (a: unknown, b: unknown, pointer: string, out: string[]): void => {
  if (out.length > MAX_DIFF_LINES) return;
  if (isObject(a) && isObject(b)) {
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const child = `${pointer}/${key.replace(/~/g, "~0").replace(/\//g, "~1")}`;
      if (!(key in b)) out.push(`+ ${child}`);
      else if (!(key in a)) out.push(`- ${child}`);
      else diffPointers(a[key], b[key], child, out);
    }
    return;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) {
      const child = `${pointer}/${i}`;
      if (i >= b.length) out.push(`+ ${child} ${show(a[i])}`);
      else if (i >= a.length) out.push(`- ${child} ${show(b[i])}`);
      else diffPointers(a[i], b[i], child, out);
    }
    return;
  }
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    out.push(`~ ${pointer} ${show(a)} → ${show(b)}`);
  }
};

/** Human-readable delta between two model snapshots, `[]` when identical. */
export const diffModels = (withPatch: Models, without: Models): string[] => {
  const out: string[] = [];
  const many = withPatch.size > 1;
  for (const rel of new Set([...withPatch.keys(), ...without.keys()])) {
    const a = withPatch.get(rel);
    const b = without.get(rel);
    if (a === b) continue;
    if (a === undefined || b === undefined) {
      out.push(`${a === undefined ? "-" : "+"} ${rel}`);
      continue;
    }
    const lines: string[] = [];
    diffPointers(JSON.parse(a), JSON.parse(b), "", lines);
    for (const line of lines) {
      // `+ /shapes/com.x.api#Foo/members/…` → `+ Foo/members/…`
      const short = line.replace(/^(. )\/shapes\/[^/#]*#/, "$1");
      out.push((many ? `${rel}: ` : "") + short);
    }
  }
  return out;
};
