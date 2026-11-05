/**
 * CRC32 for browsers: the plain-JavaScript implementation, without
 * `node:zlib`. Selected through the package's `#crc32` import.
 */

import type { Checksum } from "./checksum.ts";
import { Crc32 } from "./crc32-portable.ts";

export { Crc32 };

export const getCrc32ChecksumAlgorithmFunction = (): new () => Checksum => Crc32;
