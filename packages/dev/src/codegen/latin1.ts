/**
 * Keep module source Latin-1 only (dev-time only).
 *
 * V8 keeps every module's source text alive (for lazy compilation and
 * `Function.prototype.toString`), and stores a string as one byte per
 * character only while every character is Latin-1. A single `—` in a doc
 * comment doubles the whole file: importing AWS S3's compiled service module
 * retained 2,240 KB of heap, and 1,570 KB with its 3 non-Latin-1 comment
 * characters replaced.
 *
 * {@link toLatin1} leaves values intact: inside string and template literals
 * a character becomes a `\u` escape (the same value). Elsewhere — comments,
 * in practice — typographic punctuation becomes its ASCII form and anything
 * else becomes `U+XXXX`.
 */
import { parseAst } from "rolldown/parseAst";

const NON_LATIN1 = /[^\x00-\xff]/;
const NON_LATIN1_ALL = /[^\x00-\xff]/g;

/** ASCII forms for the punctuation that shows up in API descriptions. */
const ASCII: Record<string, string> = {
  "\u2010": "-",
  "\u2011": "-",
  "\u2012": "-",
  "\u2013": "-",
  "\u2014": "--",
  "\u2015": "--",
  "\u2018": "'",
  "\u2019": "'",
  "\u201a": "'",
  "\u201b": "'",
  "\u201c": '"',
  "\u201d": '"',
  "\u201e": '"',
  "\u2022": "*",
  "\u2026": "...",
  "\u2032": "'",
  "\u2033": '"',
  "\u2122": "(TM)",
  "\u2190": "<-",
  "\u2192": "->",
  "\u2194": "<->",
  "\u21d2": "=>",
  "\u2212": "-",
  "\u2248": "~",
  "\u2260": "!=",
  "\u2264": "<=",
  "\u2265": ">=",
  "\u00a0": " ",
  "\u200b": "",
  "\u200d": "",
  "\ufe0f": "",
  "\ufeff": "",
};

const escapeChar = (c: string): string => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`;

const describeChar = (c: string): string => {
  const ascii = ASCII[c];
  if (ascii !== undefined) return ascii;
  const cp = c.codePointAt(0)!;
  return `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
};

type Node = { readonly type: string; readonly start: number; readonly end: number } & Record<
  string,
  unknown
>;

const isNode = (value: unknown): value is Node =>
  value !== null && typeof value === "object" && typeof (value as Node).type === "string";

/** [start, end) ranges of string, template and regex literals. */
const literalRanges = (code: string, filename: string): Array<[number, number]> => {
  const program = parseAst(code, { sourceType: "module", lang: "ts" }, filename);
  const ranges: Array<[number, number]> = [];
  const visit = (node: unknown): void => {
    if (Array.isArray(node)) {
      for (const child of node) visit(child);
      return;
    }
    if (!isNode(node)) return;
    if (node.type === "Literal" || node.type === "TemplateElement" || node.type === "Directive") {
      ranges.push([node.start, node.end]);
      if (node.type !== "Directive") return;
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === "type" || key === "start" || key === "end") continue;
      if (value !== null && typeof value === "object") visit(value);
    }
  };
  visit(program);
  return ranges.sort((a, b) => a[0] - b[0]);
};

/** `code` with every non-Latin-1 character escaped (literals) or spelled in ASCII (elsewhere). */
export const toLatin1 = (code: string, filename = "module.ts"): string => {
  if (!NON_LATIN1.test(code)) return code;
  const ranges = literalRanges(code, filename);
  let out = "";
  let pos = 0;
  let r = 0;
  for (const match of code.matchAll(NON_LATIN1_ALL)) {
    const i = match.index;
    while (r < ranges.length && ranges[r]![1] <= i) r++;
    const inLiteral = r < ranges.length && ranges[r]![0] <= i;
    let c = match[0];
    // A lone low surrogate was handled with its high surrogate below.
    if (
      c >= "\udc00" &&
      c <= "\udfff" &&
      i > 0 &&
      code.charCodeAt(i - 1) >= 0xd800 &&
      code.charCodeAt(i - 1) <= 0xdbff
    ) {
      pos = i + 1;
      continue;
    }
    if (c >= "\ud800" && c <= "\udbff" && i + 1 < code.length) c = code.slice(i, i + 2);
    out += code.slice(pos, i);
    out += inLiteral
      ? [...c]
          .flatMap((ch) => (ch.length === 2 ? [ch[0]!, ch[1]!] : [ch]))
          .map(escapeChar)
          .join("")
      : describeChar(c);
    pos = i + c.length;
  }
  return out + code.slice(pos);
};
