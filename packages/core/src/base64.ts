/**
 * Base64 for every SDK: bytes or text to base64 and back, in the standard
 * and the URL alphabet.
 *
 * On `btoa` / `atob`, which Node, Bun, workerd and browsers all have. A
 * bundle pays about 550 bytes for all four functions; Effect's own
 * `effect/encoding/Base64` costs one 1.8 to 3.7 KB.
 *
 * Decoding never throws: text that is not base64 is `undefined`.
 */

/** Bytes, or the UTF-8 bytes of text, as base64. */
export const toBase64 = (input: Uint8Array | string): string => {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  // In chunks: one `fromCharCode(...bytes)` overflows the stack on a large payload.
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
};

/**
 * The bytes of base64 text, or `undefined` for text that is not base64.
 * As `atob` reads it: padding may be left out, and whitespace is skipped.
 */
export const fromBase64 = (text: string): Uint8Array<ArrayBuffer> | undefined => {
  let binary: string;
  try {
    binary = atob(text);
  } catch {
    return undefined;
  }
  // A loop: `Uint8Array.from(binary, mapFn)` calls mapFn once per byte and is
  // about 20x slower.
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

/** {@link toBase64} in base64url (RFC 4648 §5): `-` and `_` for `+` and `/`, no padding. */
export const toBase64Url = (input: Uint8Array | string): string =>
  toBase64(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/** {@link fromBase64} for base64url text. Text in the standard alphabet is read too. */
export const fromBase64Url = (text: string): Uint8Array<ArrayBuffer> | undefined =>
  fromBase64(text.replace(/-/g, "+").replace(/_/g, "/"));
