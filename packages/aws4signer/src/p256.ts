/**
 * Encodings for SigV4A's ECDSA P-256 keys and signatures.
 *
 * Curve arithmetic stays in the platform's crypto wherever it can: a private
 * key is imported as PKCS#8 without its public point, which `node:crypto`
 * (OpenSSL), Bun and workerd's WebCrypto (BoringSSL) derive on import.
 * {@link publicPoint}, plucked from @noble/curves, is the fallback for a
 * WebCrypto that insists on the point (it only accepts a JWK carrying `x`/`y`).
 */

const P = 0xffffffff00000001000000000000000000000000ffffffffffffffffffffffffn;
/** The P-256 group order. */
export const N = 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551n;
const A = P - 3n;
const G = {
  x: 0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n,
  y: 0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n,
};

/**
 * `PrivateKeyInfo { v0, { id-ecPublicKey, prime256v1 }, ECPrivateKey { v1, d } }`
 * up to the 32-byte private scalar `d`, which follows it.
 */
const PKCS8_PREFIX = /*@__PURE__*/ Uint8Array.from([
  0x30, 0x41, 0x02, 0x01, 0x00, 0x30, 0x13, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01,
  0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07, 0x04, 0x27, 0x30, 0x25, 0x02, 0x01,
  0x01, 0x04, 0x20,
]);

export const toBigInt = (bytes: Uint8Array): bigint => {
  let n = 0n;
  for (const b of bytes) n = (n << 8n) | BigInt(b);
  return n;
};

/** Big-endian, left-padded to 32 bytes. */
export const toBytes32 = (n: bigint): Uint8Array<ArrayBuffer> => {
  const out = new Uint8Array(32);
  for (let i = 31; i >= 0; i--, n >>= 8n) out[i] = Number(n & 0xffn);
  return out;
};

/** The PKCS#8 DER of the P-256 private key with scalar `d` (no public point). */
export const pkcs8 = (d: bigint): Uint8Array<ArrayBuffer> => {
  const out = new Uint8Array(PKCS8_PREFIX.length + 32);
  out.set(PKCS8_PREFIX);
  out.set(toBytes32(d), PKCS8_PREFIX.length);
  return out;
};

//#region fallback point arithmetic, plucked from @noble/curves

/*
 * The scalar multiplication below is taken from @noble/curves 1.9.7
 * (https://github.com/paulmillr/noble-curves, tag 1.9.7 = commit a0ac598),
 * specialised to P-256 with the field operations inlined. Only the code path
 * `p256.getPublicKey` takes is kept. Sources, at that commit:
 *
 * - `mod`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/modular.ts#L27-L30
 * - `invert`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/modular.ts#L55-L75
 * - `toAffine` (toAffineMemo): https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L615-L629
 * - `negate`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L753-L755
 * - `double`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L757-L798
 * - `add`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L800-L852
 * - `multiply` (normalising the real and fake points): https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L871-L890
 * - `negateCt`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L149-L152
 * - `calcWOpts`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L185-L193
 * - `calcOffsets`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L195-L218
 * - `precomputeWindow`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L304-L320
 * - `wNAF`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L322-L358
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Paul Miller (https://paulmillr.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const B = 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604bn;
const B3 = (B * 3n) % P;

// From noble `mod`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/modular.ts#L27-L30
const mod = (a: bigint, b: bigint = P): bigint => {
  const result = a % b;
  return result >= 0n ? result : b + result;
};

// From noble `invert`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/modular.ts#L55-L75
const invert = (number: bigint, modulo: bigint = P): bigint => {
  let a = mod(number, modulo);
  let b = modulo;
  let x = 0n, y = 1n, u = 1n, v = 0n; // prettier-ignore
  while (a !== 0n) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n; // prettier-ignore
  }
  return mod(x, modulo);
};

/** A projective point (X, Y, Z) with x = X/Z, y = Y/Z; the identity is (0, 1, 0). */
interface Projective {
  readonly X: bigint;
  readonly Y: bigint;
  readonly Z: bigint;
}

const ZERO: Projective = { X: 0n, Y: 1n, Z: 0n };
const BASE: Projective = { X: G.x, Y: G.y, Z: 1n };

// From noble `negate`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L753-L755
const negate = (p: Projective): Projective => ({ X: p.X, Y: mod(-p.Y), Z: p.Z });

// From noble `double`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L757-L798
/** Renes-Costello-Batina exception-free doubling, https://eprint.iacr.org/2015/1060 algorithm 3. */
const double = ({ X: X1, Y: Y1, Z: Z1 }: Projective): Projective => {
  let X3 = 0n, Y3 = 0n, Z3 = 0n; // prettier-ignore
  let t0 = mod(X1 * X1);
  let t1 = mod(Y1 * Y1);
  let t2 = mod(Z1 * Z1);
  let t3 = mod(X1 * Y1);
  t3 = mod(t3 + t3);
  Z3 = mod(X1 * Z1);
  Z3 = mod(Z3 + Z3);
  X3 = mod(A * Z3);
  Y3 = mod(B3 * t2);
  Y3 = mod(X3 + Y3);
  X3 = mod(t1 - Y3);
  Y3 = mod(t1 + Y3);
  Y3 = mod(X3 * Y3);
  X3 = mod(t3 * X3);
  Z3 = mod(B3 * Z3);
  t2 = mod(A * t2);
  t3 = mod(t0 - t2);
  t3 = mod(A * t3);
  t3 = mod(t3 + Z3);
  Z3 = mod(t0 + t0);
  t0 = mod(Z3 + t0);
  t0 = mod(t0 + t2);
  t0 = mod(t0 * t3);
  Y3 = mod(Y3 + t0);
  t2 = mod(Y1 * Z1);
  t2 = mod(t2 + t2);
  t0 = mod(t2 * t3);
  X3 = mod(X3 - t0);
  Z3 = mod(t2 * t1);
  Z3 = mod(Z3 + Z3);
  Z3 = mod(Z3 + Z3);
  return { X: X3, Y: Y3, Z: Z3 };
};

// From noble `add`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L800-L852
/** Renes-Costello-Batina exception-free addition, https://eprint.iacr.org/2015/1060 algorithm 1. */
const add = (
  { X: X1, Y: Y1, Z: Z1 }: Projective,
  { X: X2, Y: Y2, Z: Z2 }: Projective,
): Projective => {
  let X3 = 0n, Y3 = 0n, Z3 = 0n; // prettier-ignore
  let t0 = mod(X1 * X2);
  let t1 = mod(Y1 * Y2);
  let t2 = mod(Z1 * Z2);
  let t3 = mod(X1 + Y1);
  let t4 = mod(X2 + Y2);
  t3 = mod(t3 * t4);
  t4 = mod(t0 + t1);
  t3 = mod(t3 - t4);
  t4 = mod(X1 + Z1);
  let t5 = mod(X2 + Z2);
  t4 = mod(t4 * t5);
  t5 = mod(t0 + t2);
  t4 = mod(t4 - t5);
  t5 = mod(Y1 + Z1);
  X3 = mod(Y2 + Z2);
  t5 = mod(t5 * X3);
  X3 = mod(t1 + t2);
  t5 = mod(t5 - X3);
  Z3 = mod(A * t4);
  X3 = mod(B3 * t2);
  Z3 = mod(X3 + Z3);
  X3 = mod(t1 - Z3);
  Z3 = mod(t1 + Z3);
  Y3 = mod(X3 * Z3);
  t1 = mod(t0 + t0);
  t1 = mod(t1 + t0);
  t2 = mod(A * t2);
  t4 = mod(B3 * t4);
  t1 = mod(t1 + t2);
  t2 = mod(t0 - t2);
  t2 = mod(A * t2);
  t4 = mod(t4 + t2);
  t0 = mod(t1 * t4);
  Y3 = mod(Y3 + t0);
  t0 = mod(t5 * t4);
  X3 = mod(t3 * X3);
  X3 = mod(X3 - t0);
  t0 = mod(t3 * t1);
  Z3 = mod(t5 * Z3);
  Z3 = mod(Z3 + t0);
  return { X: X3, Y: Y3, Z: Z3 };
};

// From noble `toAffine`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L615-L629
const toAffine = (p: Projective): { x: bigint; y: bigint } => {
  const is0 = p.Z === 0n;
  // Execute every operation even for the identity, with 1 standing in for 1/Z.
  const iz = is0 ? 1n : invert(p.Z);
  const x = mod(p.X * iz);
  const y = mod(p.Y * iz);
  return is0 ? { x: 0n, y: 0n } : { x, y };
};

// From noble `calcWOpts`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L185-L193
/** wNAF window size: 2^(W-1) * (ceil(256 / W) + 1) = 520 precomputed points. */
const W = 4;
const WINDOWS = Math.ceil(256 / W) + 1;
const WINDOW_SIZE = 2 ** (W - 1);
const MAX_NUMBER = 2 ** W;
const MASK = BigInt(MAX_NUMBER - 1);
const SHIFT_BY = BigInt(W);

// From noble `calcOffsets`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L195-L218
const calcOffsets = (n: bigint, window: number) => {
  let wbits = Number(n & MASK);
  let nextN = n >> SHIFT_BY;
  if (wbits > WINDOW_SIZE) {
    wbits -= MAX_NUMBER;
    nextN += 1n;
  }
  const offsetStart = window * WINDOW_SIZE;
  return {
    nextN,
    offset: offsetStart + Math.abs(wbits) - 1,
    isZero: wbits === 0,
    isNeg: wbits < 0,
    // fake statement and offset for noise
    isNegF: window % 2 !== 0,
    offsetF: offsetStart,
  };
};

// From noble `precomputeWindow`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L304-L320
const precomputeWindow = (point: Projective): Projective[] => {
  const points: Projective[] = [];
  let p = point;
  let base = p;
  for (let window = 0; window < WINDOWS; window++) {
    base = p;
    points.push(base);
    for (let i = 1; i < WINDOW_SIZE; i++) {
      base = add(base, p);
      points.push(base);
    }
    p = double(base);
  }
  return points;
};

// From noble `negateCt`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L149-L152
const negateCt = (condition: boolean, item: Projective): Projective => {
  const neg = negate(item);
  return condition ? neg : item;
};

// From noble `wNAF`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/curve.ts#L322-L358
// and `multiply`: https://github.com/paulmillr/noble-curves/blob/a0ac59846ee76c52f7c18886f4963e1211345d48/src/abstract/weierstrass.ts#L871-L890
/**
 * `d * G` for a private scalar `d` in [1, n-1], as noble's
 * `p256.getPublicKey`: every window performs one addition, into the real
 * accumulator or into a fake one, so the sequence of point operations does
 * not depend on the scalar's bits.
 */
export const publicPoint = (d: bigint): { x: bigint; y: bigint } => {
  const precomputes = precomputeWindow(BASE);
  let n = d;
  let p = ZERO;
  let f = BASE;
  for (let window = 0; window < WINDOWS; window++) {
    const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window);
    n = nextN;
    if (isZero) f = add(f, negateCt(isNegF, precomputes[offsetF]!));
    else p = add(p, negateCt(isNeg, precomputes[offset]!));
  }
  // Normalize both, as noble does, so the fake accumulator is not dead code.
  void toAffine(f);
  return toAffine(p);
};

//#endregion

export const base64Url = (bytes: Uint8Array): string => {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const fromBase64Url = (s: string): Uint8Array =>
  Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));

/** DER INTEGER of an unsigned big-endian value. */
const derInteger = (bytes: Uint8Array): number[] => {
  let i = 0;
  while (i < bytes.length - 1 && bytes[i] === 0) i++;
  const v = [...bytes.subarray(i)];
  if (v[0]! & 0x80) v.unshift(0);
  return [0x02, v.length, ...v];
};

/** A 64-byte `r || s` (IEEE P1363) ECDSA signature as an ASN.1 DER `SEQUENCE { r, s }`. */
export const p1363ToDer = (signature: Uint8Array): Uint8Array => {
  const body = [...derInteger(signature.subarray(0, 32)), ...derInteger(signature.subarray(32))];
  return new Uint8Array([0x30, body.length, ...body]);
};
