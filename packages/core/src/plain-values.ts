/**
 * Helpers for walking plain request values. This module imports only
 * `effect/Redacted`, so the GraphQL client can use it without loading the
 * REST and HTTP protocol modules.
 */
import * as Redacted from "effect/Redacted";

/**
 * Whether `v` is an Effect `Stream` (an upload body). Read from the
 * prototype's type id, so this module does not load `effect/Stream`.
 */
export const isEffectStream = (v: unknown): boolean =>
  v !== null &&
  typeof v === "object" &&
  Object.getPrototypeOf(v) !== null &&
  "~effect/Stream" in Object.getPrototypeOf(v);

/** Binary/opaque values that must never be treated as key-value objects. */
export const isOpaqueValue = (v: unknown): boolean =>
  v instanceof Blob ||
  v instanceof File ||
  v instanceof ArrayBuffer ||
  v instanceof Uint8Array ||
  v instanceof Date ||
  isEffectStream(v);

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  !isOpaqueValue(v) &&
  (Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null);

/**
 * Sets `out[key] = value` as an own property. A plain assignment to a
 * `__proto__` key replaces the object's prototype; this keeps it a key, as
 * `JSON.parse` does.
 */
export const setOwnKey = (out: Record<string, unknown>, key: string, value: unknown): void => {
  if (key === "__proto__") {
    Object.defineProperty(out, key, {
      value,
      enumerable: true,
      writable: true,
      configurable: true,
    });
  } else {
    out[key] = value;
  }
};

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
