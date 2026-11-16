/**
 * HTTP header values of `@httpHeader` members: lists are one header whose
 * values are joined with ", " (Smithy HTTP binding rules, as the AWS SDKs
 * send and read them).
 */

import type * as AST from "effect/SchemaAST";
import { codecSymbol } from "../lite.ts";
import { getArrayElementAST, isArrayAST, isBooleanAST, isNumberAST, unwrapUnion } from "./ast.ts";

/**
 * The header value of a list: its elements joined with ", ". With `quote`,
 * an element holding a comma or a double quote is sent as a quoted string
 * with its double quotes escaped (`b,c` -> `"b,c"`). Timestamps are not
 * quoted: an http-date holds a comma, and readers split those in pairs.
 */
export const formatHeaderList = (values: ReadonlyArray<unknown>, quote: boolean): string =>
  values
    .map((value) => {
      const text = String(value);
      return quote && (text.includes(",") || text.includes('"'))
        ? `"${text.replaceAll('"', '\\"')}"`
        : text;
    })
    .join(", ");

/**
 * The values of a list header: split on the commas outside quoted strings,
 * trimmed, and a quoted value unquoted (`"b,c", a` -> `["b,c", "a"]`).
 */
export const splitHeader = (value: string): string[] => {
  const parts: string[] = [];
  let quoted = false;
  let start = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (char === '"' && value[i - 1] !== "\\") quoted = !quoted;
    else if (char === "," && !quoted) {
      parts.push(value.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(value.slice(start));
  return parts.map((part) => {
    const text = part.trim();
    return text.length >= 2 && text.startsWith('"') && text.endsWith('"')
      ? text.slice(1, -1).replaceAll('\\"', '"')
      : text;
  });
};

/** The http-dates of a list header: every second comma ends one (`Mon, 16 Dec ...`). */
const splitHttpDates = (value: string): string[] => {
  const parts = value.split(",");
  const dates: string[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    dates.push(
      parts
        .slice(i, i + 2)
        .join(",")
        .trim(),
    );
  }
  return dates;
};

/** Whether the element of a list sends its timestamps as http-dates. */
const isHttpDate = (ast: AST.AST): boolean =>
  unwrapUnion(ast).annotations?.[codecSymbol] === "http-date";

/** The wire value of a scalar header: numbers and booleans parsed, the rest kept. */
const scalarReader = (ast: AST.AST): ((value: string) => unknown) =>
  isNumberAST(ast) ? Number : isBooleanAST(ast) ? (value) => value === "true" : (value) => value;

/**
 * The wire value of a response header bound to a member of type `ast`, for
 * the schema decoder: a list header split into its values, numbers and
 * booleans parsed.
 */
export const headerReader = (ast: AST.AST): ((value: string) => unknown) => {
  const element = isArrayAST(ast) ? getArrayElementAST(ast) : undefined;
  if (element === undefined) return scalarReader(ast);
  const read = scalarReader(element);
  const split = isHttpDate(element) ? splitHttpDates : splitHeader;
  return (value) => split(value).map(read);
};
