/**
 * Secrets in values, logs and error messages: one rule for every SDK.
 *
 * A schema holds a secret when a value it reaches is marked sensitive
 * ({@link sensitiveValueSymbol}: `T.SensitiveValue` in the REST SDKs, the
 * `Sensitive*` schemas in AWS). An operation's input and its output are
 * judged independently, each by its own schema:
 *
 * - its plain form (a serialized request, a response body, the value a
 *   parse failure quotes) is {@link REDACTED} whole: {@link redactPlain};
 * - its parsed form shows only the sensitive values as `Redacted`:
 *   {@link redactParsed} for logs, {@link wrapSensitive} for decoded output.
 *
 * Imports only `effect/Redacted` and the AST helpers, so a protocol can use
 * it without loading the REST protocol.
 */
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { getAnn, getProps, resolveNode } from "./annotations.ts";
import { isOpaqueValue } from "./plain-values.ts";

export const sensitiveValueSymbol = /*@__PURE__*/ Symbol.for(
  "@distilled.cloud/core/sensitive-value",
);

/** What the plain form of a value that can hold a secret is shown as. */
export const REDACTED = "[REDACTED]";

/** Whether `ast` is marked sensitive (through optional, Suspend and encoding wrappers). */
export const isSensitive = (ast: AST.AST): boolean =>
  getAnn(ast, sensitiveValueSymbol) !== undefined;

const holds = /*@__PURE__*/ new WeakMap<AST.AST, boolean>();

/**
 * Whether a value of the type `ast` can hold a sensitive value, at any depth:
 * the type itself, members, map values, list elements and union arms.
 */
export const holdsSensitive = (ast: AST.AST): boolean => {
  const cached = holds.get(ast);
  if (cached !== undefined) return cached;
  const seen = new Set<AST.AST>();
  const visit = (n: AST.AST): boolean => {
    if (isSensitive(n)) return true;
    const node = resolveNode(n);
    if (seen.has(node)) return false;
    seen.add(node);
    switch (node._tag) {
      case "Union":
        return node.types.some(visit);
      case "Arrays":
        return [...(node.elements ?? []), ...(node.rest ?? [])].some(visit);
      case "Objects":
        return [...(node.propertySignatures ?? []), ...(node.indexSignatures ?? [])].some((m) =>
          visit(m.type),
        );
      default:
        return false;
    }
  };
  const result = visit(ast);
  holds.set(ast, result);
  return result;
};

/** `plain`, the plain form of a value of the type `ast`: {@link REDACTED} when it can hold a secret. */
export const redactPlain = <A>(ast: AST.AST, plain: A): A | typeof REDACTED =>
  holdsSensitive(ast) ? REDACTED : plain;

/**
 * `value`, a parsed value of the type `ast`, as a log shows it: every
 * sensitive value `Redacted` whole, whatever its type, and the rest as is.
 */
export const redactParsed = (ast: AST.AST, value: unknown): unknown =>
  holdsSensitive(ast) ? wrap(ast, value, true) : value;

/**
 * Walk a decoded (TS-named) value alongside its schema AST, wrapping values
 * marked sensitive (members, map values, list elements) in `Redacted`: a
 * string, or any non-null value of an untyped (`S.Unknown`) schema. A typed
 * struct is walked so its own sensitive members are wrapped and its type
 * stays accurate. Keys the schema doesn't model pass through. A union
 * applies every arm in turn; a map arm skips keys a sibling arm names.
 */
export const wrapSensitive = (
  ast: AST.AST,
  value: unknown,
  siblingNames?: ReadonlySet<string>,
): unknown => wrap(ast, value, false, siblingNames);

/** Whether `wrap` wraps `v`, a value of the sensitive type `type`. */
const isSecretValue = (type: AST.AST, v: unknown, whole: boolean): boolean =>
  whole
    ? v !== null && v !== undefined
    : typeof v === "string" || (v !== null && resolveNode(type)._tag === "Unknown");

const wrap = (
  ast: AST.AST,
  value: unknown,
  whole: boolean,
  siblingNames?: ReadonlySet<string>,
): unknown => {
  if (
    value === null ||
    typeof value !== "object" ||
    isOpaqueValue(value) ||
    Redacted.isRedacted(value)
  ) {
    return value;
  }
  const node = resolveNode(ast);
  if (node._tag === "Union") {
    // Redact every possible sensitive member, including in partial responses.
    const named = new Set(
      node.types.flatMap((arm) => {
        const armNode = resolveNode(arm);
        return armNode._tag === "Objects" ? getProps(armNode).map((p) => String(p.name)) : [];
      }),
    );
    return node.types.reduce<unknown>((redacted, arm) => wrap(arm, redacted, whole, named), value);
  }
  if (node._tag === "Arrays") {
    if (!Array.isArray(value)) return value;
    const elem = node.rest?.[0];
    if (!elem) return value;
    const sensitive = isSensitive(elem);
    return value.map((v) =>
      sensitive && isSecretValue(elem, v, whole) && !Redacted.isRedacted(v)
        ? Redacted.make(v)
        : wrap(elem, v, whole),
    );
  }
  if (node._tag === "Objects" && !Array.isArray(value)) {
    const props = getProps(node);
    const mapValue = node.indexSignatures?.[0]?.type;
    if (props.length === 0 && mapValue === undefined) return value;
    const byName = new Map(props.map((p) => [String(p.name), p]));
    // fromEntries keeps a `__proto__` key an entry instead of the prototype.
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).flatMap<[string, unknown]>(([k, v]) => {
        if (v === undefined) return [];
        const prop = byName.get(k);
        const type = prop?.type ?? (siblingNames?.has(k) ? undefined : mapValue);
        if (type === undefined) return [[k, v]];
        // Union arms run over each other's output: keep a value one already wrapped.
        if (isSensitive(type) && isSecretValue(type, v, whole)) {
          return [[k, Redacted.isRedacted(v) ? v : Redacted.make(v)]];
        }
        return [[k, wrap(type, v, whole)]];
      }),
    );
  }
  return value;
};
