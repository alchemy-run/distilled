/**
 * Hashing and HMAC for request signing, as a swappable service.
 *
 * SDKs that sign requests (AWS SigV4, webhook verification, ...) read
 * {@link Crypto} from the context. It is a reference with a default, so it
 * never appears in an operation's requirements: by default it uses
 * `node:crypto` when the runtime has it (Node, Bun, Deno -- synchronous, and
 * several times faster than WebCrypto for small inputs) and WebCrypto
 * (`crypto.subtle`) everywhere else.
 *
 * Provide a layer to choose or replace the implementation:
 *
 * ```ts
 * import { Crypto } from "@distilled.cloud/core";
 * program.pipe(Effect.provide(Crypto.webCrypto)); // force WebCrypto
 * program.pipe(Effect.provide(Crypto.layer(myHsmBackedCrypto)));
 * ```
 *
 * HMAC keys are imported once into an implementation-specific handle
 * ({@link HmacKey}) so callers can cache them: preparing a raw key is most of
 * an HMAC's cost in both `node:crypto` and WebCrypto.
 */
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

/** A hashing or HMAC operation failed in the crypto implementation. */
export class CryptoError
  extends /*@__PURE__*/ Data.TaggedError("CryptoError")<{
    readonly operation: "hmac" | "sha256" | "importKey";
    readonly cause: unknown;
  }> {}

/** An imported HMAC-SHA256 key. Opaque: only the implementation that made it can use it. */
export interface HmacKey {
  readonly "~distilled/HmacKey": unique symbol;
}

export type Bytes = Uint8Array | string;

export interface CryptoImpl {
  /** Name for diagnostics, e.g. "node:crypto" or "webcrypto". */
  readonly name: string;
  readonly sha256: (data: Bytes) => Effect.Effect<Uint8Array, CryptoError>;
  readonly importHmacKey: (key: Bytes) => Effect.Effect<HmacKey, CryptoError>;
  readonly hmacSha256: (key: HmacKey, data: Bytes) => Effect.Effect<Uint8Array, CryptoError>;
  /**
   * The same operations as plain functions, for implementations that are
   * synchronous (node:crypto). They throw on failure. Signers use them to
   * skip the per-operation effects when present.
   */
  readonly sync?: {
    readonly sha256: (data: Bytes) => Uint8Array;
    readonly importHmacKey: (key: Bytes) => HmacKey;
    readonly hmacSha256: (key: HmacKey, data: Bytes) => Uint8Array;
    /** `hex(sha256(data))`, when the implementation can produce hex itself. */
    readonly sha256Hex?: (data: Bytes) => string;
    /** `hex(hmacSha256(key, data))`, when the implementation can produce hex itself. */
    readonly hmacSha256Hex?: (key: HmacKey, data: Bytes) => string;
  };
}

//#region node:crypto

interface Digest {
  update(d: Bytes): { digest(): Uint8Array; digest(encoding: "hex"): string };
}

interface NodeCryptoModule {
  createSecretKey(key: Uint8Array): object;
  createHmac(alg: string, key: object): Digest;
  createHash(alg: string): Digest;
  /** One-shot hashing (Node 20.12+/21.7+). */
  hash?: (alg: string, data: Bytes, encoding: "hex") => string;
}

/** `node:crypto`, found without a static import so this module loads in any runtime. */
const nodeModule = (): NodeCryptoModule | undefined => {
  try {
    const p = (globalThis as { process?: { getBuiltinModule?: (id: string) => unknown } }).process;
    return p?.getBuiltinModule?.("node:crypto") as NodeCryptoModule | undefined;
  } catch {
    return undefined;
  }
};

const encoder = /*@__PURE__*/ new TextEncoder();
const toBytes = (data: Bytes): Uint8Array =>
  typeof data === "string" ? encoder.encode(data) : data;

/** `node:crypto` implementation, or undefined when the runtime has no `node:crypto`. */
export const makeNodeCrypto = (): CryptoImpl | undefined => {
  const c = nodeModule();
  if (!c) return undefined;
  return {
    name: "node:crypto",
    sync: {
      sha256: (data) => c.createHash("sha256").update(data).digest(),
      importHmacKey: (key) => c.createSecretKey(toBytes(key)) as unknown as HmacKey,
      hmacSha256: (key, data) =>
        c
          .createHmac("sha256", key as unknown as object)
          .update(data)
          .digest(),
      sha256Hex: c.hash
        ? (data) => c.hash!("sha256", data, "hex")
        : (data) => c.createHash("sha256").update(data).digest("hex"),
      hmacSha256Hex: (key, data) =>
        c
          .createHmac("sha256", key as unknown as object)
          .update(data)
          .digest("hex"),
    },
    sha256: (data) =>
      Effect.try({
        try: () => c.createHash("sha256").update(data).digest(),
        catch: (cause) => new CryptoError({ operation: "sha256", cause }),
      }),
    importHmacKey: (key) =>
      Effect.try({
        try: () => c.createSecretKey(toBytes(key)) as unknown as HmacKey,
        catch: (cause) => new CryptoError({ operation: "importKey", cause }),
      }),
    hmacSha256: (key, data) =>
      Effect.try({
        try: () =>
          c
            .createHmac("sha256", key as unknown as object)
            .update(data)
            .digest(),
        catch: (cause) => new CryptoError({ operation: "hmac", cause }),
      }),
  };
};

//#endregion

//#region WebCrypto

const buffer = (data: Bytes): Uint8Array<ArrayBuffer> => {
  const b = toBytes(data);
  return b.buffer instanceof ArrayBuffer ? (b as Uint8Array<ArrayBuffer>) : new Uint8Array(b);
};

/** WebCrypto (`crypto.subtle`) implementation. */
export const makeWebCrypto = (): CryptoImpl => ({
  name: "webcrypto",
  sha256: (data) =>
    Effect.tryPromise({
      try: async () => new Uint8Array(await crypto.subtle.digest("SHA-256", buffer(data))),
      catch: (cause) => new CryptoError({ operation: "sha256", cause }),
    }),
  importHmacKey: (key) =>
    Effect.tryPromise({
      try: () =>
        crypto.subtle.importKey("raw", buffer(key), { name: "HMAC", hash: "SHA-256" }, false, [
          "sign",
        ]) as Promise<unknown> as Promise<HmacKey>,
      catch: (cause) => new CryptoError({ operation: "importKey", cause }),
    }),
  hmacSha256: (key, data) =>
    Effect.tryPromise({
      try: async () =>
        new Uint8Array(await crypto.subtle.sign("HMAC", key as unknown as CryptoKey, buffer(data))),
      catch: (cause) => new CryptoError({ operation: "hmac", cause }),
    }),
});

//#endregion

/** The crypto implementation signing code uses. Defaults to `node:crypto` when available, else WebCrypto. */
export const Crypto = /*@__PURE__*/ Context.Reference<CryptoImpl>("@distilled.cloud/core/Crypto", {
  defaultValue: () => makeNodeCrypto() ?? makeWebCrypto(),
});

/** Use a custom implementation. */
export const layer = (impl: CryptoImpl): Layer.Layer<never> => Layer.succeed(Crypto, impl);

/** Force WebCrypto, even where `node:crypto` exists. */
export const webCrypto: Layer.Layer<never> = /*@__PURE__*/ Layer.sync(Crypto, makeWebCrypto);

/** Force `node:crypto`; fails at layer build when the runtime has none. */
export const nodeCrypto: Layer.Layer<never, CryptoError> = /*@__PURE__*/ Layer.effect(
  Crypto,
  /*@__PURE__*/ Effect.suspend(() => {
    const impl = makeNodeCrypto();
    return impl
      ? Effect.succeed(impl)
      : Effect.fail(
          new CryptoError({ operation: "importKey", cause: "node:crypto is not available" }),
        );
  }),
);

const HEX = /*@__PURE__*/ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
/** Lowercase hex of bytes. */
export const hex = (bytes: Uint8Array): string => {
  let out = "";
  for (let i = 0; i < bytes.length; i++) out += HEX[bytes[i]!];
  return out;
};
