/**
 * A streaming checksum (CRC32, MD5, ...), the shape `@smithy/types` calls
 * `Checksum` with a synchronous `digest`: every implementation computes it
 * in place.
 */
export interface Checksum {
  digestLength?: number;
  copy?(): Checksum;
  digest(): Uint8Array;
  mark?(readLimit: number): void;
  reset(): void;
  update(chunk: Uint8Array): void;
}
