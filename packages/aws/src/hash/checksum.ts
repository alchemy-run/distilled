/** A streaming checksum (CRC32, MD5, …), the shape `@smithy/types` calls `Checksum`. */
export interface Checksum {
  digestLength?: number;
  copy?(): Checksum;
  digest(): Promise<Uint8Array>;
  mark?(readLimit: number): void;
  reset(): void;
  update(chunk: Uint8Array): void;
}
