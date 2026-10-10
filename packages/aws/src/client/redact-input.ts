/**
 * Masking of secret operation input, for debug logs.
 *
 * The wire serializers unwrap `Redacted` values and write `smithy.api#sensitive`
 * members verbatim into the request body, so a request that is logged after
 * serialization carries its secrets in plaintext. The logging path instead
 * serializes a copy of the input produced here, in which every secret value is
 * replaced by a placeholder, so the logged request is secret-free by
 * construction (in every wire encoding) while the request that is sent keeps
 * the real values.
 *
 * A value is a secret when it is a `Redacted`, or when it sits in a member the
 * schema marks sensitive (`SensitiveString` / `SensitiveBlob`), whether the
 * caller passed it wrapped or as a plain value.
 */
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";

/** What a secret is replaced with in logged input and the logged request. */
export const REDACTED_PLACEHOLDER = "<redacted>";

const placeholderBytes = new TextEncoder().encode(REDACTED_PLACEHOLDER);

/** Guards value-driven recursion against self-referencing input. */
const MAX_DEPTH = 32;

const unwrapSuspend = (ast: AST.AST): AST.AST => {
  let current = ast;
  while (current._tag === "Suspend") current = current.thunk();
  return current;
};

const isSensitiveSchema = (ast: AST.AST): boolean => {
  const id = ast.annotations?.identifier;
  return typeof id === "string" && id.startsWith("Sensitive");
};

/**
 * The placeholder for one secret, shaped like the value it replaces so the
 * serializer still accepts it (blobs stay bytes, everything else is text).
 */
const placeholderFor = (secret: unknown): string | Uint8Array => {
  const raw = Redacted.isRedacted(secret) ? Redacted.value(secret) : secret;
  return raw instanceof Uint8Array ? placeholderBytes : REDACTED_PLACEHOLDER;
};

/**
 * A streaming blob is single-use: the logging copy of the request must not
 * touch the stream the real request will send. Its content is unknown and
 * possibly secret, so the copy carries the placeholder in its place.
 */
const isStream = (value: unknown): boolean =>
  typeof ReadableStream !== "undefined" && value instanceof ReadableStream;

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

/**
 * Value-driven masking for positions the schema does not describe: replaces
 * any `Redacted` found in plain objects and arrays.
 */
const maskRedacted = (value: unknown, depth: number): unknown => {
  if (Redacted.isRedacted(value)) return placeholderFor(value);
  if (isStream(value)) return placeholderBytes;
  if (depth >= MAX_DEPTH) return value;
  if (Array.isArray(value)) return value.map((item) => maskRedacted(item, depth + 1));
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, maskRedacted(item, depth + 1)]),
    );
  }
  return value;
};

const mask = (ast: AST.AST, value: unknown, depth: number): unknown => {
  if (value === undefined || value === null) return value;
  if (Redacted.isRedacted(value)) return placeholderFor(value);
  if (isStream(value)) return placeholderBytes;
  const node = unwrapSuspend(ast);
  if (isSensitiveSchema(node)) return placeholderFor(value);
  if (depth >= MAX_DEPTH) return value;
  switch (node._tag) {
    case "Objects": {
      if (!isPlainObject(value)) return maskRedacted(value, depth);
      const out: Record<string, unknown> = {};
      for (const [key, item] of Object.entries(value)) {
        const prop = node.propertySignatures.find((p) => p.name === key);
        const index = node.indexSignatures[0];
        const itemAst = prop?.type ?? index?.type;
        out[key] = itemAst ? mask(itemAst, item, depth + 1) : maskRedacted(item, depth + 1);
      }
      return out;
    }
    case "Arrays": {
      if (!Array.isArray(value)) return maskRedacted(value, depth);
      return value.map((item, i) => {
        const itemAst = node.elements[i] ?? node.rest[0];
        return itemAst ? mask(itemAst, item, depth + 1) : maskRedacted(item, depth + 1);
      });
    }
    case "Union": {
      // Optional members are `T | undefined`; with exactly one real member the
      // schema still describes the value. Otherwise fall back to the value.
      const members = node.types.filter((t) => unwrapSuspend(t)._tag !== "Undefined");
      return members.length === 1
        ? mask(members[0]!, value, depth + 1)
        : maskRedacted(value, depth);
    }
    default:
      return maskRedacted(value, depth);
  }
};

/**
 * Returns a copy of `input` with every secret value replaced by a
 * placeholder. `schema` is the operation's input schema AST.
 */
export const redactInput = (schema: AST.AST, input: unknown): unknown => mask(schema, input, 0);
