/**
 * MD5 for browsers, in plain JavaScript: WebCrypto has no MD5. Selected
 * through the package's `#md5` import; Node, Bun and Workers keep
 * `node:crypto` (`md5.ts`).
 */

import type { Checksum } from "./checksum.ts";

const SHIFTS = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14,
  20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6,
  10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

const K = /*@__PURE__*/ Uint32Array.from({ length: 64 }, (_, i) =>
  Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32),
);

const INITIAL = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];

/** One 64-byte block of `bytes` at `offset` into `state`. */
const compress = (state: Uint32Array, words: Uint32Array, bytes: Uint8Array, offset: number) => {
  for (let j = 0; j < 16; j++) {
    const o = offset + j * 4;
    words[j] = bytes[o]! | (bytes[o + 1]! << 8) | (bytes[o + 2]! << 16) | (bytes[o + 3]! << 24);
  }
  let a = state[0]!;
  let b = state[1]!;
  let c = state[2]!;
  let d = state[3]!;
  for (let j = 0; j < 64; j++) {
    let f: number;
    let g: number;
    if (j < 16) {
      f = (b & c) | (~b & d);
      g = j;
    } else if (j < 32) {
      f = (d & b) | (~d & c);
      g = (5 * j + 1) & 15;
    } else if (j < 48) {
      f = b ^ c ^ d;
      g = (3 * j + 5) & 15;
    } else {
      f = c ^ (b | ~d);
      g = (7 * j) & 15;
    }
    const t = (a + f + K[j]! + words[g]!) | 0;
    const s = SHIFTS[j]!;
    a = d;
    d = c;
    c = b;
    b = (b + ((t << s) | (t >>> (32 - s)))) | 0;
  }
  state[0] = state[0]! + a;
  state[1] = state[1]! + b;
  state[2] = state[2]! + c;
  state[3] = state[3]! + d;
};

class BrowserMd5 implements Checksum {
  private state = Uint32Array.from(INITIAL);
  private readonly words = new Uint32Array(16);
  private readonly block = new Uint8Array(64);
  private blockLength = 0;
  private length = 0;

  update(data: Uint8Array) {
    this.length += data.length;
    let i = 0;
    if (this.blockLength > 0) {
      i = Math.min(64 - this.blockLength, data.length);
      this.block.set(data.subarray(0, i), this.blockLength);
      this.blockLength += i;
      if (this.blockLength < 64) return;
      compress(this.state, this.words, this.block, 0);
      this.blockLength = 0;
    }
    for (; i + 64 <= data.length; i += 64) compress(this.state, this.words, data, i);
    if (i < data.length) {
      this.block.set(data.subarray(i));
      this.blockLength = data.length - i;
    }
  }

  async digest(): Promise<Uint8Array> {
    // Pad a copy, so the running hash is left as it was.
    const state = this.state.slice();
    const tail = new Uint8Array(this.blockLength < 56 ? 64 : 128);
    tail.set(this.block.subarray(0, this.blockLength));
    tail[this.blockLength] = 0x80;
    const bits = this.length * 8;
    const view = new DataView(tail.buffer);
    view.setUint32(tail.length - 8, bits >>> 0, true);
    view.setUint32(tail.length - 4, Math.floor(bits / 2 ** 32), true);
    for (let o = 0; o < tail.length; o += 64) compress(state, new Uint32Array(16), tail, o);
    const out = new Uint8Array(16);
    const outView = new DataView(out.buffer);
    for (let j = 0; j < 4; j++) outView.setUint32(j * 4, state[j]!, true);
    return out;
  }

  reset() {
    this.state = Uint32Array.from(INITIAL);
    this.blockLength = 0;
    this.length = 0;
  }
}

export const getMd5ChecksumAlgorithmFunction = (): new () => Checksum => BrowserMd5;
