/**
 * Helpers for walking plain request values. This module imports only
 * `effect/Redacted`, so the GraphQL client can use it without loading the
 * REST and HTTP protocol modules.
 */
import * as Redacted from "effect/Redacted";

/** Binary/opaque values that must never be treated as key-value objects. */
export const isOpaqueValue = (v: unknown): boolean =>
  v instanceof Blob ||
  v instanceof File ||
  v instanceof ArrayBuffer ||
  v instanceof Uint8Array ||
  v instanceof Date;

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  !isOpaqueValue(v) &&
  (Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null);

/**
 * Deep-unwrap `Redacted` values in an input (plain objects/arrays only --
 * class instances, files, and binary payloads pass through untouched).
 * Sensitive input members accept `string | Redacted<string>`; the wire wants
 * the raw string.
 */
export const unwrapRedactedDeep = (value: unknown): unknown => {
  if (Redacted.isRedacted(value)) return Redacted.value(value);
  if (Array.isArray(value)) return value.map(unwrapRedactedDeep);
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      out[k] = unwrapRedactedDeep(v);
    }
    return out;
  }
  return value;
};
