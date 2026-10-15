/**
 * SigV4 request signing (header `Authorization` and query-string presigning).
 *
 * Effect-native port of the signing core of `aws4fetch`'s `AwsV4Signer`,
 * preserving its canonicalisation rules byte for byte: header/path/query
 * encoding, the unsignable-header set, S3's UNSIGNED-PAYLOAD defaults and
 * duplicate-query-key handling, and the derived-key cache. Service and
 * region are always supplied by the callers here, so host-based guessing is
 * intentionally absent.
 */
import * as CoreCrypto from "@distilled.cloud/core/crypto";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";

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
  /** SigV4 signing name (e.g. `s3`, `execute-api`). */
  readonly service: string;
  /** SigV4 signing region. */
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

/** Canonicalise `options`; throws {@link InvalidSigningUrl} / {@link InvalidSigningHeaders}. */
const canonicalize = (options: SignOptions): Canonical => {
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
  const appendSessionToken = service === "iotdevicegateway";

  if (service === "s3" && !signQuery && headers["x-amz-content-sha256"] === undefined) {
    headers["x-amz-content-sha256"] = "UNSIGNED-PAYLOAD";
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
  const credentialString = [date, region, service, "aws4_request"].join("/");

  if (signQuery) {
    if (service === "s3" && !url.searchParams.has("X-Amz-Expires")) {
      url.searchParams.set("X-Amz-Expires", "86400");
    }
    url.searchParams.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
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
  encodedPath = encodeRfc3986(encodeURIComponent(encodedPath).replace(/%2F/g, "/"));

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
          "AWS4-HMAC-SHA256 Credential=" + accessKeyId + "/" + credentialString,
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
  ["AWS4-HMAC-SHA256", c.datetime, c.credentialString, canonicalRequestHash].join("\n");

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
  options: SignOptions,
  fiber: { readonly context: Context.Context<never>; getRef<A>(ref: Context.Reference<A>): A },
): SignedRequest | undefined => {
  const impl = fiber.getRef(CoreCrypto.Crypto);
  const sync = impl.sync;
  if (sync === undefined || Context.getOrUndefined(fiber.context, SigningKeyCache) !== undefined) {
    return undefined;
  }
  const sha256Hex =
    sync.sha256Hex ?? ((data: CoreCrypto.Bytes) => CoreCrypto.hex(sync.sha256(data)));
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
