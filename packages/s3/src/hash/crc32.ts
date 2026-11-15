/**
 * CRC32 checksum implementation.
 * Prefers Node.js zlib.crc32 (Node 20.15+) for performance and falls back to
 * the plain-JavaScript {@link Crc32}. Browsers resolve `#crc32` to
 * `crc32.browser.ts` instead, which never imports `node:zlib`.
 */

import * as zlib from "node:zlib";
import type { Checksum } from "./checksum.ts";
import { checksumBytes, Crc32 } from "./crc32-portable.ts";

export { Crc32 };

class NodeCrc32 implements Checksum {
  private checksum = 0;

  update(data: Uint8Array) {
    this.checksum = zlib.crc32(data, this.checksum);
  }

  async digest(): Promise<Uint8Array> {
    return checksumBytes(this.checksum);
  }

  reset() {
    this.checksum = 0;
  }
}

export const getCrc32ChecksumAlgorithmFunction = (): new () => Checksum =>
  typeof zlib.crc32 === "function" ? NodeCrc32 : Crc32;
