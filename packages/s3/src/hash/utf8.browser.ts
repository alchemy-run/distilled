/**
 * UTF-8 conversion for browsers, with `TextEncoder` instead of `Buffer`.
 * Selected through the package's `#utf8` import.
 */

const encoder = /*@__PURE__*/ new TextEncoder();

export function toUint8Array(data: string | ArrayBuffer | ArrayBufferView): Uint8Array {
  if (typeof data === "string") {
    return encoder.encode(data);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
  return new Uint8Array(data);
}
