/** Base64-encode bytes without blowing the stack on large payloads. */
export const toBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

/**
 * The bytes of a base64 string. Throws, as `atob` does, on a string that is
 * not base64.
 */
export const fromBase64 = (base64: string): Uint8Array => {
  // A loop: `Uint8Array.from(binary, mapFn)` calls mapFn once per byte and is
  // about 20x slower.
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};
