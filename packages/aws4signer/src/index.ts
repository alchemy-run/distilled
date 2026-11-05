/**
 * SigV4 request signing (header `Authorization` and query-string presigning).
 *
 * Effect-native port of `aws4fetch`'s `AwsV4Signer` (MIT, Michael Hart),
 * preserving its canonicalisation rules byte for byte: header/path/query
 * encoding, the unsignable-header set, S3's UNSIGNED-PAYLOAD defaults,
 * duplicate-query-key handling, the derived-key cache, and service/region
 * guessing from the host when they are not given.
 */
import * as CoreCrypto from "@distilled.cloud/core/crypto";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as P256 from "./p256.ts";

/**
 * Headers left out of the signature by default (matches aws4fetch). Callers
 * opt back in with `allHeaders`.
 */
const UNSIGNABLE_HEADERS: ReadonlySet<string> = /*@__PURE__*/ new Set([
  "authorization",
  "content-type",
  "content-length",
  "user-agent",
  "presigned-expires",
  "expect",
  "x-amzn-trace-id",
  "range",
  "connection",
]);

export type SignableBody = string | ArrayBuffer | ArrayBufferView;

export interface SignOptions {
  /** HTTP method. Defaults to `POST` when a body is present, else `GET`. */
  readonly method?: string;
  /** Absolute URL to sign. */
  readonly url: string;
  /** Request headers. Keys are case-insensitive; `Host` is derived from the URL. */
  readonly headers?: Record<string, string>;
  /**
   * Request body used for the payload hash. Omit for UNSIGNED-PAYLOAD (set the
   * `X-Amz-Content-Sha256` header yourself) or for bodiless requests.
   */
  readonly body?: SignableBody;
  /** Public half of the key pair; it is written into the signed request. */
  readonly accessKeyId: string;
  readonly secretAccessKey: Redacted.Redacted<string>;
  readonly sessionToken?: Redacted.Redacted<string> | undefined;
  /** SigV4 signing name (e.g. `s3`, `execute-api`). {@link guessScope} fills it from the host. */
  readonly service: string;
  /** SigV4 signing region. {@link guessScope} fills it from the host. */
  readonly region: string;
  /** Fixed `YYYYMMDDTHHMMSSZ` signing time; defaults to now. */
  readonly datetime?: string;
  /** Sign into the query string (presigned URL) instead of headers. */
  readonly signQuery?: boolean;
  /** Include the normally unsignable headers (content-type, range, ...). */
  readonly allHeaders?: boolean;
  /**
   * Send and sign the body's SHA-256 as `X-Amz-Content-Sha256`, so services
   * signing as `s3` do not default to UNSIGNED-PAYLOAD.
   */
  readonly hashPayload?: boolean;
  /**
   * Add the session token to the query after signing, outside the signature.
   * Always on for `iotdevicegateway`.
   */
  readonly appendSessionToken?: boolean;
  /**
   * Encode the path once. By default non-S3 paths are encoded twice, as SigV4
   * requires for every AWS service except S3.
   */
  readonly singleEncode?: boolean;
}

/** `options` with the body's hash as `X-Amz-Content-Sha256`, given `hashPayload`. */
const withPayloadHash = (options: SignOptions, hash: string): SignOptions => ({
  ...options,
  headers: { ...options.headers, "X-Amz-Content-Sha256": hash },
});

export interface SignedRequest {
  readonly method: string;
  /** Normalised URL; carries the `X-Amz-*` params when `signQuery` is set. */
  readonly url: string;
  /** Lower-cased header names, including the added `x-amz-*` / `authorization`. */
  readonly headers: Record<string, string>;
}

/** `options.url` is not an absolute URL the `URL` constructor accepts. */
export class InvalidSigningUrl
  extends /*@__PURE__*/ Data.TaggedError("AWS::SigV4::InvalidSigningUrl")<{
    readonly url: string;
    readonly cause: unknown;
  }> {}

/**
 * A header name or value is not valid HTTP (the `Headers` constructor
 * rejected it), so it cannot be canonicalised.
 */
export class InvalidSigningHeaders
  extends /*@__PURE__*/ Data.TaggedError("AWS::SigV4::InvalidSigningHeaders")<{
    readonly cause: unknown;
  }> {}

/** The crypto implementation (see `@distilled.cloud/core/crypto`) rejected an HMAC or SHA-256 operation. */
export class CryptoError
  extends /*@__PURE__*/ Data.TaggedError("AWS::SigV4::CryptoError")<{
    readonly operation: "hmac" | "sha256";
    readonly cause: unknown;
  }> {}

export type SigningError = InvalidSigningUrl | InvalidSigningHeaders | CryptoError;

const toBytes = (data: SignableBody): Uint8Array | string =>
  typeof data === "string"
    ? data
    : ArrayBuffer.isView(data)
      ? new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
      : new Uint8Array(data);

/** Map the core crypto failure to this module's error (the public signing error). */
const fromCore = (e: CoreCrypto.CryptoError) =>
  new CryptoError({ operation: e.operation === "sha256" ? "sha256" : "hmac", cause: e.cause });

/** Hex SHA-256 with the context's crypto implementation. */
const sha256Hex = (data: SignableBody): Effect.Effect<string, CryptoError> =>
  Effect.flatMap(CoreCrypto.Crypto, (c) =>
    Effect.mapError(Effect.map(c.sha256(toBytes(data)), CoreCrypto.hex), fromCore),
  );

/** Percent-encode the characters `encodeURIComponent` leaves alone but RFC 3986 reserves. */
const encodeRfc3986 = (encoded: string): string =>
  encoded.replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());

/**
 * Scope of a derived signing key. `Redacted` hashes and compares by its
 * underlying value, so the secret never has to be unwrapped into a cache key.
 */
export interface SigningKeyScope {
  readonly secretAccessKey: Redacted.Redacted<string>;
  readonly date: string;
  readonly region: string;
  readonly service: string;
  /** The implementation the key is imported into: a key from one cannot sign with another. */
  readonly crypto?: CoreCrypto.CryptoImpl;
}

const deriveSigningKey = ({
  secretAccessKey,
  date,
  region,
  service,
  crypto,
}: SigningKeyScope): Effect.Effect<SigningKey, CryptoError> =>
  Effect.flatMap(
    crypto ? Effect.succeed(crypto) : CoreCrypto.Crypto,
    (c: CoreCrypto.CryptoImpl) => {
      const step = (key: Uint8Array | string, data: string) =>
        Effect.flatMap(c.importHmacKey(key), (k) => c.hmacSha256(k, data));
      return step("AWS4" + Redacted.value(secretAccessKey), date).pipe(
        Effect.flatMap((kDate) => step(kDate, region)),
        Effect.flatMap((kRegion) => step(kRegion, service)),
        Effect.flatMap((kService) => step(kService, "aws4_request")),
        // Import the final key once: it signs every request in this scope today.
        Effect.flatMap((signing) => c.importHmacKey(signing)),
        Effect.map((key) => ({ key, impl: c })),
        Effect.mapError(fromCore),
      );
    },
  );

/** A derived key imported into the implementation that will use it. */
export interface SigningKey {
  readonly key: CoreCrypto.HmacKey;
  readonly impl: CoreCrypto.CryptoImpl;
}

/** Where signing gets derived keys from, when a scope supplies its own. */
export interface SigningKeyStore {
  /** The key for `scope`. A failed derivation should not be retained. */
  readonly get: (scope: SigningKeyScope) => Effect.Effect<SigningKey, CryptoError>;
}

/**
 * A key store to use instead of the built-in one. Deriving a key costs four
 * HMACs; by default keys are kept per secret (by `Redacted` identity, so the
 * secret is never a map key), date, region and service, at most 16 scopes
 * per secret, so long-lived processes rotating temporary credentials do not
 * accumulate secret-derived material. Failed derivations are not retained.
 * Over an effect `Cache`: `{ get: (scope) => Cache.get(cache, scope) }`.
 */
export const SigningKeyCache = /*@__PURE__*/ Context.Reference<SigningKeyStore | undefined>(
  "AWS::SigningKeyCache",
  { defaultValue: () => undefined },
);

/**
 * The canonical form of a request, before any hashing: everything SigV4
 * derives from the URL and headers. `finish` writes the signature in.
 */
interface Canonical {
  readonly algorithm: string;
  readonly method: string;
  readonly date: string;
  readonly datetime: string;
  readonly credentialString: string;
  /** The payload hash when it is fixed by a header or S3 presigning; else the body is hashed. */
  readonly payloadHash: string | undefined;
  readonly canonicalPrefix: string;
  readonly finish: (signature: string) => SignedRequest;
}

/** An HTTP header name (RFC 9110 token). */
const TOKEN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

/**
 * `options.headers` as `Headers` normalizes them -- lower-case names,
 * trimmed values, repeated names joined with ", " -- as a record. Plain
 * headers are copied directly; anything else (invalid names or values,
 * non-string values, set-cookie) goes through `Headers`, which also decides
 * what is invalid. Throws {@link InvalidSigningHeaders}.
 */
const headerRecord = (input: Record<string, string> | undefined): Record<string, string> => {
  const out: Record<string, string> = Object.create(null);
  if (input === undefined) return out;
  for (const name of Object.keys(input)) {
    const value = input[name] as unknown;
    const lower = name.toLowerCase();
    if (
      typeof value !== "string" ||
      !TOKEN.test(name) ||
      /^[\t\n\r ]|[\t\n\r ]$|[\0\r\n\u0100-\uffff]/.test(value) ||
      lower === "set-cookie"
    ) {
      let headers: Headers;
      try {
        headers = new Headers(input);
      } catch (cause) {
        throw new InvalidSigningHeaders({ cause });
      }
      const all: Record<string, string> = Object.create(null);
      for (const key of headers.keys()) all[key] = headers.get(key)!;
      return all;
    }
    out[lower] = lower in out ? `${out[lower]}, ${value}` : value;
  }
  return out;
};

/** SigV4 (`AWS4-HMAC-SHA256`) or SigV4A (`AWS4-ECDSA-P256-SHA256`) scoping. */
interface Algorithm {
  readonly name: string;
  /** SigV4A: the `X-Amz-Region-Set` value; the credential scope then omits the region. */
  readonly regionSet?: string;
}

const SIGV4: Algorithm = { name: "AWS4-HMAC-SHA256" };

/** Canonicalise `options`; throws {@link InvalidSigningUrl} / {@link InvalidSigningHeaders}. */
const canonicalize = (options: SignOptions, algorithm: Algorithm = SIGV4): Canonical => {
  const { accessKeyId, service, region, signQuery, allHeaders, body } = options;
  const sessionToken = options.sessionToken ? Redacted.value(options.sessionToken) : undefined;
  const method = options.method ?? (body ? "POST" : "GET");
  let url: URL;
  try {
    url = new URL(options.url);
  } catch (cause) {
    throw new InvalidSigningUrl({ url: options.url, cause });
  }
  const headers = headerRecord(options.headers);
  delete headers.host;
  const datetime = options.datetime ?? new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
  const appendSessionToken = options.appendSessionToken || service === "iotdevicegateway";

  if (service === "s3" && !signQuery && headers["x-amz-content-sha256"] === undefined) {
    headers["x-amz-content-sha256"] = "UNSIGNED-PAYLOAD";
  }

  if (algorithm.regionSet !== undefined) {
    if (signQuery) url.searchParams.set("X-Amz-Region-Set", algorithm.regionSet);
    else headers["x-amz-region-set"] = algorithm.regionSet;
  }

  if (signQuery) {
    url.searchParams.set("X-Amz-Date", datetime);
    if (sessionToken && !appendSessionToken) {
      url.searchParams.set("X-Amz-Security-Token", sessionToken);
    }
  } else {
    headers["x-amz-date"] = datetime;
    if (sessionToken && !appendSessionToken) headers["x-amz-security-token"] = sessionToken;
  }

  const signableHeaders = ["host", ...Object.keys(headers)]
    .filter((header) => allHeaders || !UNSIGNABLE_HEADERS.has(header))
    .sort();
  const signedHeaders = signableHeaders.join(";");
  const canonicalHeaders = signableHeaders
    .map(
      (header) =>
        header + ":" + (header === "host" ? url.host : headers[header]!.replace(/\s+/g, " ")),
    )
    .join("\n");
  const date = datetime.slice(0, 8);
  const credentialString = (
    algorithm.regionSet === undefined
      ? [date, region, service, "aws4_request"]
      : [date, service, "aws4_request"]
  ).join("/");

  if (signQuery) {
    if (service === "s3" && !url.searchParams.has("X-Amz-Expires")) {
      url.searchParams.set("X-Amz-Expires", "86400");
    }
    url.searchParams.set("X-Amz-Algorithm", algorithm.name);
    url.searchParams.set("X-Amz-Credential", accessKeyId + "/" + credentialString);
    url.searchParams.set("X-Amz-SignedHeaders", signedHeaders);
  }

  let encodedPath: string;
  if (service === "s3") {
    try {
      encodedPath = decodeURIComponent(url.pathname.replace(/\+/g, " "));
    } catch {
      encodedPath = url.pathname;
    }
  } else {
    encodedPath = url.pathname.replace(/\/+/g, "/");
  }
  if (!options.singleEncode) encodedPath = encodeURIComponent(encodedPath).replace(/%2F/g, "/");
  encodedPath = encodeRfc3986(encodedPath);

  const seenKeys = new Set<string>();
  // `searchParams` parses the query; skip it when there is none.
  const encodedSearch = (url.search ? [...url.searchParams] : [])
    .filter(([k]) => {
      if (!k) return false;
      if (service === "s3") {
        if (seenKeys.has(k)) return false;
        seenKeys.add(k);
      }
      return true;
    })
    .map(
      ([k, v]) =>
        [encodeRfc3986(encodeURIComponent(k)), encodeRfc3986(encodeURIComponent(v))] as const,
    )
    .sort(([k1, v1], [k2, v2]) => (k1 < k2 ? -1 : k1 > k2 ? 1 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0))
    .map((pair) => pair.join("="))
    .join("&");

  const payloadHash =
    headers["x-amz-content-sha256"] ??
    (service === "s3" && signQuery ? "UNSIGNED-PAYLOAD" : undefined);

  return {
    algorithm: algorithm.name,
    method,
    date,
    datetime,
    credentialString,
    payloadHash,
    canonicalPrefix: [
      method.toUpperCase(),
      encodedPath,
      encodedSearch,
      canonicalHeaders + "\n",
      signedHeaders,
    ].join("\n"),
    finish: (signature) => {
      if (signQuery) {
        url.searchParams.set("X-Amz-Signature", signature);
        if (sessionToken && appendSessionToken) {
          url.searchParams.set("X-Amz-Security-Token", sessionToken);
        }
      } else {
        headers.authorization = [
          algorithm.name + " Credential=" + accessKeyId + "/" + credentialString,
          "SignedHeaders=" + signedHeaders,
          "Signature=" + signature,
        ].join(", ");
      }
      const sorted: Record<string, string> = {};
      for (const name of Object.keys(headers).sort()) sorted[name] = headers[name]!;
      return { method, url: url.toString(), headers: sorted };
    },
  };
};

const stringToSignOf = (c: Canonical, canonicalRequestHash: string): string =>
  [c.algorithm, c.datetime, c.credentialString, canonicalRequestHash].join("\n");

/**
 * Derived keys for the synchronous path, per secret (by `Redacted` identity,
 * so the secret is never a map key) and `date/region/service` scope. Each
 * secret keeps at most 16 scopes.
 */
const signingKeys = /*@__PURE__*/ new WeakMap<Redacted.Redacted<string>, Map<string, SigningKey>>();

/** The derived keys of one secret, by `date/region/service`. */
const scopesOf = (secret: Redacted.Redacted<string>): Map<string, SigningKey> => {
  let scopes = signingKeys.get(secret);
  if (scopes === undefined) signingKeys.set(secret, (scopes = new Map()));
  return scopes;
};

const keep = (scopes: Map<string, SigningKey>, name: string, key: SigningKey): void => {
  if (scopes.size >= 16) scopes.clear();
  scopes.set(name, key);
};

const syncSigningKey = (
  impl: CoreCrypto.CryptoImpl,
  sync: NonNullable<CoreCrypto.CryptoImpl["sync"]>,
  options: SignOptions,
  date: string,
): CoreCrypto.HmacKey => {
  const scopes = scopesOf(options.secretAccessKey);
  const scope = `${date}/${options.region}/${options.service}`;
  const hit = scopes.get(scope);
  if (hit !== undefined && hit.impl === impl) return hit.key;
  const step = (key: Uint8Array | string, data: string) =>
    sync.hmacSha256(sync.importHmacKey(key), data);
  const kDate = step("AWS4" + Redacted.value(options.secretAccessKey), date);
  const kSigning = step(step(step(kDate, options.region), options.service), "aws4_request");
  const key = sync.importHmacKey(kSigning);
  keep(scopes, scope, { impl, key });
  return key;
};

/**
 * {@link sign} without effects, for callers already running on a fiber.
 * Returns `undefined` when the
 * signature needs effects (WebCrypto, or a {@link SigningKeyCache} in the
 * context); use {@link sign} then. Throws a {@link SigningError}.
 */
export const signSync = (
  input: SignOptions,
  fiber: { readonly context: Context.Context<never>; getRef<A>(ref: Context.Reference<A>): A },
): SignedRequest | undefined => {
  const impl = fiber.getRef(CoreCrypto.Crypto);
  const sync = impl.sync;
  if (sync === undefined || Context.getOrUndefined(fiber.context, SigningKeyCache) !== undefined) {
    return undefined;
  }
  const sha256Hex =
    sync.sha256Hex ?? ((data: CoreCrypto.Bytes) => CoreCrypto.hex(sync.sha256(data)));
  let options = input;
  if (options.hashPayload) {
    let hash: string;
    try {
      hash = sha256Hex(toBytes(options.body || ""));
    } catch (cause) {
      throw new CryptoError({ operation: "sha256", cause });
    }
    options = withPayloadHash(options, hash);
  }
  const canonical = canonicalize(options);
  try {
    const payloadHash = canonical.payloadHash ?? sha256Hex(toBytes(options.body || ""));
    const stringToSign = stringToSignOf(
      canonical,
      sha256Hex(canonical.canonicalPrefix + "\n" + payloadHash),
    );
    const key = syncSigningKey(impl, sync, options, canonical.date);
    return canonical.finish(
      sync.hmacSha256Hex !== undefined
        ? sync.hmacSha256Hex(key, stringToSign)
        : CoreCrypto.hex(sync.hmacSha256(key, stringToSign)),
    );
  } catch (cause) {
    throw new CryptoError({ operation: "hmac", cause });
  }
};

/**
 * Sign a request with SigV4. Fails with a {@link SigningError} when the URL
 * or headers cannot be canonicalised or WebCrypto rejects an operation.
 *
 * With a synchronous crypto implementation (node:crypto, the default on
 * Node/Bun/Deno) and no {@link SigningKeyCache} override in the context, the
 * whole signature is computed in one step without intermediate effects.
 */
export const sign = (options: SignOptions): Effect.Effect<SignedRequest, SigningError> =>
  Effect.withFiber((fiber) => {
    let signed: SignedRequest | undefined;
    try {
      signed = signSync(options, fiber as any);
    } catch (e) {
      return Effect.fail(e as SigningError);
    }
    return signed === undefined ? signAsync(options) : Effect.succeed(signed);
  });

const signAsync: (options: SignOptions) => Effect.Effect<SignedRequest, SigningError> =
  /*@__PURE__*/ Effect.fnUntraced(function* (options: SignOptions) {
    if (options.hashPayload) {
      options = withPayloadHash(options, yield* sha256Hex(options.body || ""));
    }
    const canonical = yield* Effect.try({
      try: () => canonicalize(options),
      catch: (e) => e as InvalidSigningUrl | InvalidSigningHeaders,
    });
    const payloadHash = canonical.payloadHash ?? (yield* sha256Hex(options.body || ""));
    const canonicalRequest = canonical.canonicalPrefix + "\n" + payloadHash;
    const stringToSign = stringToSignOf(canonical, yield* sha256Hex(canonicalRequest));
    const store = yield* SigningKeyCache;
    const impl = yield* CoreCrypto.Crypto;
    const scope: SigningKeyScope = {
      secretAccessKey: options.secretAccessKey,
      date: canonical.date,
      region: options.region,
      service: options.service,
      crypto: impl,
    };
    let signingKey: SigningKey;
    if (store !== undefined) signingKey = yield* store.get(scope);
    else {
      const scopes = scopesOf(options.secretAccessKey);
      const name = `${canonical.date}/${options.region}/${options.service}`;
      const hit = scopes.get(name);
      if (hit !== undefined && hit.impl === impl) signingKey = hit;
      else {
        signingKey = yield* deriveSigningKey(scope);
        keep(scopes, name, signingKey);
      }
    }
    const signature = CoreCrypto.hex(
      yield* Effect.mapError(signingKey.impl.hmacSha256(signingKey.key, stringToSign), fromCore),
    );
    return canonical.finish(signature);
  });

//#region SigV4A

export interface SignV4aOptions extends Omit<SignOptions, "region" | "signQuery"> {
  /**
   * Regions the signature is valid in (`X-Amz-Region-Set`), e.g. `["*"]` for
   * every region -- what EventBridge global endpoints and S3 Multi-Region
   * Access Points use. Replaces SigV4's single signing region.
   */
  readonly regionSet: readonly string[];
}

const SIGV4A = "AWS4-ECDSA-P256-SHA256";
const encoder = /*@__PURE__*/ new TextEncoder();

/**
 * A SigV4A signing key: the credential-derived P-256 private scalar as PKCS#8,
 * plus the platform key objects imported from it, filled in on first use.
 */
interface SigningKeyV4a {
  readonly d: bigint;
  readonly der: Uint8Array<ArrayBuffer>;
  node?: object;
  web?: CryptoKey;
}

/** Derived SigV4A keys per secret (by `Redacted` identity) and access key id. */
const signingKeysV4a = /*@__PURE__*/ new WeakMap<
  Redacted.Redacted<string>,
  Map<string, SigningKeyV4a>
>();

/**
 * Derive the SigV4A ECDSA P-256 key from AWS credentials: the NIST SP 800-108
 * HMAC-SHA256 counter-mode KDF over `"AWS4A" + secret`, with the access key id
 * and a retry counter as context, until the candidate scalar is below `n - 1`.
 */
const deriveSigningKeyV4a = Effect.fnUntraced(function* (
  accessKeyId: string,
  secretAccessKey: Redacted.Redacted<string>,
) {
  let scopes = signingKeysV4a.get(secretAccessKey);
  if (scopes === undefined) signingKeysV4a.set(secretAccessKey, (scopes = new Map()));
  const hit = scopes.get(accessKeyId);
  if (hit !== undefined) return hit;

  const c = yield* CoreCrypto.Crypto;
  const inputKey = yield* Effect.mapError(
    c.importHmacKey("AWS4A" + Redacted.value(secretAccessKey)),
    fromCore,
  );
  const label = encoder.encode(SIGV4A);
  const keyId = encoder.encode(accessKeyId);
  for (let counter = 1; counter <= 254; counter++) {
    // [i = 1]_32 || Label || 0x00 || Context (accessKeyId || counter) || [L = 256]_32
    const fixedInput = new Uint8Array(4 + label.length + 1 + keyId.length + 1 + 4);
    fixedInput.set([0, 0, 0, 1], 0);
    fixedInput.set(label, 4);
    fixedInput.set(keyId, 4 + label.length + 1);
    fixedInput[4 + label.length + 1 + keyId.length] = counter;
    fixedInput.set([0, 0, 1, 0], fixedInput.length - 4);
    const k0 = P256.toBigInt(yield* Effect.mapError(c.hmacSha256(inputKey, fixedInput), fromCore));
    if (k0 > P256.N - 2n) continue;
    const d = k0 + 1n;
    const key: SigningKeyV4a = { d, der: P256.pkcs8(d) };
    if (scopes.size >= 16) scopes.clear();
    scopes.set(accessKeyId, key);
    return key;
  }
  return yield* new CryptoError({
    operation: "hmac",
    cause: "SigV4A key derivation did not converge",
  });
});

interface NodeEcdsa {
  createPrivateKey(options: { key: Uint8Array; format: "der"; type: "pkcs8" }): object;
  createPublicKey(key: object): { export(options: { format: "jwk" }): JsonWebKey };
  sign(algorithm: string, data: Uint8Array, key: { key: object; dsaEncoding: "der" }): Uint8Array;
}

/** `node:crypto`, found without a static import so this module loads in any runtime. */
const nodeEcdsa = (): NodeEcdsa | undefined => {
  try {
    const p = (globalThis as { process?: { getBuiltinModule?: (id: string) => unknown } }).process;
    return p?.getBuiltinModule?.("node:crypto") as NodeEcdsa | undefined;
  } catch {
    return undefined;
  }
};

const ECDSA_P256 = { name: "ECDSA", namedCurve: "P-256" } as const;

/** The key's point as a JWK, computed in JavaScript: the last resort. */
const jwkOf = (d: bigint): JsonWebKey => {
  const { x, y } = P256.publicPoint(d);
  return {
    kty: "EC",
    crv: "P-256",
    d: P256.base64Url(P256.toBytes32(d)),
    x: P256.base64Url(P256.toBytes32(x)),
    y: P256.base64Url(P256.toBytes32(y)),
  };
};

/**
 * Import into WebCrypto. PKCS#8 without the public point lets the platform
 * derive it (Bun, workerd, Node all do); a WebCrypto that rejects that gets
 * a JWK whose point is computed by {@link P256.publicPoint}.
 */
const importWebKey = (key: SigningKeyV4a, extractable: boolean): Promise<CryptoKey> =>
  crypto.subtle
    .importKey("pkcs8", key.der, ECDSA_P256, extractable, ["sign"])
    .catch(() => crypto.subtle.importKey("jwk", jwkOf(key.d), ECDSA_P256, extractable, ["sign"]));

/**
 * DER-encoded ECDSA P-256 / SHA-256 signature of `data`: with `node:crypto`
 * when the runtime has it, else WebCrypto.
 */
const ecdsaSign = (key: SigningKeyV4a, data: string): Effect.Effect<Uint8Array, CryptoError> => {
  const bytes = encoder.encode(data);
  const node = nodeEcdsa();
  if (node !== undefined) {
    return Effect.try({
      try: () =>
        node.sign("sha256", bytes, {
          key: (key.node ??= node.createPrivateKey({ key: key.der, format: "der", type: "pkcs8" })),
          dsaEncoding: "der",
        }),
      catch: (cause) => new CryptoError({ operation: "hmac", cause }),
    });
  }
  return Effect.tryPromise({
    try: async () => {
      const web = (key.web ??= await importWebKey(key, false));
      const raw = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, web, bytes);
      return P256.p1363ToDer(new Uint8Array(raw));
    },
    catch: (cause) => new CryptoError({ operation: "hmac", cause }),
  });
};

/**
 * Sign a request with SigV4A (`AWS4-ECDSA-P256-SHA256`), the asymmetric
 * variant AWS requires for multi-region endpoints such as EventBridge global
 * endpoints and S3 Multi-Region Access Points. The canonical request is
 * SigV4's, plus a signed `X-Amz-Region-Set` header; the credential scope
 * omits the region.
 *
 * ```ts
 * const signed = yield* SigV4.signV4a({
 *   url: "https://abcde.veo.endpoint.events.amazonaws.com/",
 *   method: "POST",
 *   headers: { "X-Amz-Target": "AWSEvents.PutEvents", ... },
 *   body,
 *   accessKeyId,
 *   secretAccessKey,
 *   service: "events",
 *   regionSet: ["*"],
 * });
 * ```
 */
export const signV4a: (options: SignV4aOptions) => Effect.Effect<SignedRequest, SigningError> =
  /*@__PURE__*/ Effect.fnUntraced(function* (input: SignV4aOptions) {
    let options: SignOptions = { ...input, region: "" };
    if (options.hashPayload) {
      options = withPayloadHash(options, yield* sha256Hex(options.body || ""));
    }
    const canonical = yield* Effect.try({
      try: () => canonicalize(options, { name: SIGV4A, regionSet: input.regionSet.join(",") }),
      catch: (e) => e as InvalidSigningUrl | InvalidSigningHeaders,
    });
    const payloadHash = canonical.payloadHash ?? (yield* sha256Hex(options.body || ""));
    const stringToSign = stringToSignOf(
      canonical,
      yield* sha256Hex(canonical.canonicalPrefix + "\n" + payloadHash),
    );
    const key = yield* deriveSigningKeyV4a(input.accessKeyId, input.secretAccessKey);
    return canonical.finish(CoreCrypto.hex(yield* ecdsaSign(key, stringToSign)));
  });

/**
 * The SigV4A public key (hex affine coordinates) derived from a credential,
 * e.g. to check it against published test vectors. `via` picks the
 * implementation that computes the point; by default the one signing uses.
 */
export const signingPublicKeyV4a = (
  accessKeyId: string,
  secretAccessKey: Redacted.Redacted<string>,
  via: "auto" | "webcrypto" | "javascript" = "auto",
): Effect.Effect<{ readonly x: string; readonly y: string }, CryptoError> =>
  Effect.flatMap(deriveSigningKeyV4a(accessKeyId, secretAccessKey), (key) => {
    const hexOf = (jwk: JsonWebKey) => ({
      x: CoreCrypto.hex(P256.fromBase64Url(jwk.x!)),
      y: CoreCrypto.hex(P256.fromBase64Url(jwk.y!)),
    });
    const node = via === "auto" ? nodeEcdsa() : undefined;
    if (via === "javascript") return Effect.sync(() => hexOf(jwkOf(key.d)));
    if (node !== undefined) {
      return Effect.try({
        try: () =>
          hexOf(
            node
              .createPublicKey(
                node.createPrivateKey({ key: key.der, format: "der", type: "pkcs8" }),
              )
              .export({ format: "jwk" }),
          ),
        catch: (cause) => new CryptoError({ operation: "hmac", cause }),
      });
    }
    return Effect.tryPromise({
      try: async () => hexOf(await crypto.subtle.exportKey("jwk", await importWebKey(key, true))),
      catch: (cause) => new CryptoError({ operation: "hmac", cause }),
    });
  });

//#endregion

//#region presign

export interface PresignOptions extends Omit<
  WithoutScope<SignOptions>,
  "signQuery" | "body" | "hashPayload"
> {
  /** Seconds the URL stays valid (`X-Amz-Expires`). S3 defaults to 86400; AWS allows at most 604800. */
  readonly expiresIn?: number;
}

/**
 * A presigned URL: the signature is in the query string, so anyone holding
 * the URL can send the request until it expires.
 *
 * ```ts
 * const url = yield* Signer.presign({
 *   url: "https://my-bucket.s3.us-east-1.amazonaws.com/report.pdf",
 *   accessKeyId,
 *   secretAccessKey,
 *   expiresIn: 3600,
 * });
 * ```
 */
export const presign = (options: PresignOptions): Effect.Effect<string, SigningError> => {
  let url = options.url;
  if (options.expiresIn !== undefined) {
    try {
      const u = new URL(url);
      u.searchParams.set("X-Amz-Expires", String(Math.floor(options.expiresIn)));
      url = u.toString();
    } catch (cause) {
      return Effect.fail(new InvalidSigningUrl({ url, cause }));
    }
  }
  return Effect.map(sign(guessScope({ ...options, url, signQuery: true })), (signed) => signed.url);
};

//#endregion

//#region service and region from the host

/** `O` with `service` and `region` optional: {@link guessScope} fills them in. */
export type WithoutScope<O extends { readonly service: string; readonly region: string }> = Omit<
  O,
  "service" | "region"
> & {
  readonly service?: string | undefined;
  readonly region?: string | undefined;
};

/**
 * `options` with a missing `service` or `region` taken from the URL's host
 * ({@link guessServiceRegion}); the region falls back to `us-east-1`. A URL
 * that does not parse is left for {@link sign} to reject.
 *
 * Kept apart from {@link sign}, so programs that always pass both (the AWS
 * SDK) do not bundle the host rules.
 */
export const guessScope = <O extends SignOptions>(options: WithoutScope<O>): O => {
  if (options.service && options.region) return options as unknown as O;
  let guessed: readonly [string, string] = ["", ""];
  try {
    guessed = guessServiceRegion(new URL(options.url), options.headers);
  } catch {}
  return {
    ...options,
    service: options.service || guessed[0],
    region: options.region || guessed[1] || "us-east-1",
  } as unknown as O;
};

/** Hosts whose first label differs from the signing name. */
const HOST_SERVICES: Readonly<Record<string, string>> = {
  appstream2: "appstream",
  cloudhsmv2: "cloudhsm",
  email: "ses",
  marketplace: "aws-marketplace",
  mobile: "AWSMobileHubService",
  pinpoint: "mobiletargeting",
  queue: "sqs",
  "git-codecommit": "codecommit",
  "mturk-requester-sandbox": "mturk-requester",
  "personalize-runtime": "personalize",
};

const headerValue = (headers: Record<string, string> | undefined, name: string) => {
  if (headers === undefined) return undefined;
  for (const key of Object.keys(headers)) if (key.toLowerCase() === name) return headers[key];
  return undefined;
};

/**
 * The signing `[service, region]` a URL implies, as `aws4fetch` guesses it:
 * `*.amazonaws.com` hosts (with their S3, IoT, FIPS and dual-stack forms),
 * Lambda function URLs, Cloudflare R2 (`s3`, `auto`) and Backblaze B2. Either
 * part is `""` when the host does not say.
 *
 * ```ts
 * guessServiceRegion(new URL("https://sqs.eu-west-1.amazonaws.com/"));       // ["sqs", "eu-west-1"]
 * guessServiceRegion(new URL("https://acct.r2.cloudflarestorage.com/bucket")); // ["s3", "auto"]
 * ```
 */
export const guessServiceRegion = (
  url: URL,
  headers?: Record<string, string>,
): readonly [service: string, region: string] => {
  const { hostname, pathname } = url;
  if (hostname.endsWith(".on.aws")) {
    const match = hostname.match(/^[^.]{1,63}\.lambda-url\.([^.]{1,63})\.on\.aws$/);
    return match != null ? ["lambda", match[1] || ""] : ["", ""];
  }
  if (hostname.endsWith(".r2.cloudflarestorage.com")) return ["s3", "auto"];
  if (hostname.endsWith(".backblazeb2.com")) {
    const match = hostname.match(/^(?:[^.]{1,63}\.)?s3\.([^.]{1,63})\.backblazeb2\.com$/);
    return match != null ? ["s3", match[1] || ""] : ["", ""];
  }
  const match = hostname
    .replace("dualstack.", "")
    .match(/([^.]{1,63})\.(?:([^.]{0,63})\.)?amazonaws\.com(?:\.cn)?$/);
  let service = match?.[1] || "";
  let region = match?.[2];
  if (region === "us-gov") {
    region = "us-gov-west-1";
  } else if (region === "s3" || region === "s3-accelerate") {
    region = "us-east-1";
    service = "s3";
  } else if (service === "iot") {
    if (hostname.startsWith("iot.")) service = "execute-api";
    else if (hostname.startsWith("data.jobs.iot.")) service = "iot-jobs-data";
    else service = pathname === "/mqtt" ? "iotdevicegateway" : "iotdata";
  } else if (service === "autoscaling") {
    const targetPrefix = (headerValue(headers, "x-amz-target") || "").split(".")[0];
    if (targetPrefix === "AnyScaleFrontendService") service = "application-autoscaling";
    else if (targetPrefix === "AnyScaleScalingPlannerFrontendService") {
      service = "autoscaling-plans";
    }
  } else if (region == null && service.startsWith("s3-")) {
    region = service.slice(3).replace(/^fips-|^external-1/, "");
    service = "s3";
  } else if (service.endsWith("-fips")) {
    service = service.slice(0, -5);
  } else if (region && /-\d$/.test(service) && !/-\d$/.test(region)) {
    [service, region] = [region, service];
  }
  return [HOST_SERVICES[service] || service, region || ""];
};

//#endregion
