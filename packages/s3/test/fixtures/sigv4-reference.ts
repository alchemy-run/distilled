// SigV4 signing as of f96685623 (Headers-based canonicalization): the reference
// sigv4.test.ts compares the current signer against. Test-only.
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
import * as Cache from "effect/Cache";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
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
}

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
interface SigningKey {
  readonly key: CoreCrypto.HmacKey;
  readonly impl: CoreCrypto.CryptoImpl;
}

/**
 * Derived signing keys, keyed on secret/date/region/service. Deriving one
 * costs four HMACs; requests within a UTC day for the same scope share it.
 * The cache is bounded (LRU) so long-lived processes rotating temporary
 * credentials do not accumulate secret-derived material, and it is a context
 * reference so a scope can substitute its own. Failed derivations are not
 * retained, so a transient WebCrypto failure is retried on the next request.
 */
export const SigningKeyCache = /*@__PURE__*/ Context.Reference<
  Cache.Cache<SigningKeyScope, SigningKey, CryptoError>
>("AWS::SigningKeyCache", {
  defaultValue: () =>
    Effect.runSync(
      Cache.makeWith(deriveSigningKey, {
        capacity: 64,
        timeToLive: (exit) => (Exit.isSuccess(exit) ? Duration.infinity : Duration.zero),
      }),
    ),
});

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
  let headers: Headers;
  try {
    headers = new Headers(options.headers);
  } catch (cause) {
    throw new InvalidSigningHeaders({ cause });
  }
  headers.delete("host");
  const datetime = options.datetime ?? new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
  const appendSessionToken = service === "iotdevicegateway";

  if (service === "s3" && !signQuery && !headers.has("x-amz-content-sha256")) {
    headers.set("x-amz-content-sha256", "UNSIGNED-PAYLOAD");
  }

  const params = signQuery ? url.searchParams : headers;
  params.set("X-Amz-Date", datetime);
  if (sessionToken && !appendSessionToken) {
    params.set("X-Amz-Security-Token", sessionToken);
  }

  const signableHeaders = ["host", ...headers.keys()]
    .filter((header) => allHeaders || !UNSIGNABLE_HEADERS.has(header))
    .sort();
  const signedHeaders = signableHeaders.join(";");
  const canonicalHeaders = signableHeaders
    .map(
      (header) =>
        header +
        ":" +
        (header === "host" ? url.host : (headers.get(header) ?? "").replace(/\s+/g, " ")),
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
  const encodedSearch = [...url.searchParams]
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
    headers.get("x-amz-content-sha256") ??
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
        headers.set(
          "authorization",
          [
            "AWS4-HMAC-SHA256 Credential=" + accessKeyId + "/" + credentialString,
            "SignedHeaders=" + signedHeaders,
            "Signature=" + signature,
          ].join(", "),
        );
      }
      return { method, url: url.toString(), headers: Object.fromEntries(headers) };
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
const syncKeys = /*@__PURE__*/ new WeakMap<
  Redacted.Redacted<string>,
  Map<string, { readonly impl: CoreCrypto.CryptoImpl; readonly key: CoreCrypto.HmacKey }>
>();

const syncSigningKey = (
  impl: CoreCrypto.CryptoImpl,
  sync: NonNullable<CoreCrypto.CryptoImpl["sync"]>,
  options: SignOptions,
  date: string,
): CoreCrypto.HmacKey => {
  let scopes = syncKeys.get(options.secretAccessKey);
  if (scopes === undefined) {
    scopes = new Map();
    syncKeys.set(options.secretAccessKey, scopes);
  }
  const scope = `${date}/${options.region}/${options.service}`;
  const hit = scopes.get(scope);
  if (hit !== undefined && hit.impl === impl) return hit.key;
  const step = (key: Uint8Array | string, data: string) =>
    sync.hmacSha256(sync.importHmacKey(key), data);
  const kDate = step("AWS4" + Redacted.value(options.secretAccessKey), date);
  const kSigning = step(step(step(kDate, options.region), options.service), "aws4_request");
  const key = sync.importHmacKey(kSigning);
  if (scopes.size >= 16) scopes.clear();
  scopes.set(scope, { impl, key });
  return key;
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
    const impl = fiber.getRef(CoreCrypto.Crypto);
    const sync = impl.sync;
    if (
      sync === undefined ||
      Context.getOrUndefined(fiber.context, SigningKeyCache) !== undefined
    ) {
      return signAsync(options);
    }
    let canonical: Canonical;
    try {
      canonical = canonicalize(options);
    } catch (e) {
      return Effect.fail(e as SigningError);
    }
    try {
      const payloadHash =
        canonical.payloadHash ?? CoreCrypto.hex(sync.sha256(toBytes(options.body || "")));
      const canonicalRequest = canonical.canonicalPrefix + "\n" + payloadHash;
      const stringToSign = stringToSignOf(canonical, CoreCrypto.hex(sync.sha256(canonicalRequest)));
      const key = syncSigningKey(impl, sync, options, canonical.date);
      return Effect.succeed(canonical.finish(CoreCrypto.hex(sync.hmacSha256(key, stringToSign))));
    } catch (cause) {
      return Effect.fail(new CryptoError({ operation: "hmac", cause }));
    }
  });

const signAsync: (options: SignOptions) => Effect.Effect<SignedRequest, SigningError> =
  /*@__PURE__*/ Effect.fnUntraced(function* (options: SignOptions) {
    const canonical = yield* Effect.try({
      try: () => canonicalize(options),
      catch: (e) => e as InvalidSigningUrl | InvalidSigningHeaders,
    });
    const payloadHash = canonical.payloadHash ?? (yield* sha256Hex(options.body || ""));
    const canonicalRequest = canonical.canonicalPrefix + "\n" + payloadHash;
    const stringToSign = stringToSignOf(canonical, yield* sha256Hex(canonicalRequest));
    const signingKey = yield* Cache.get(yield* SigningKeyCache, {
      secretAccessKey: options.secretAccessKey,
      date: canonical.date,
      region: options.region,
      service: options.service,
      crypto: yield* CoreCrypto.Crypto,
    });
    const signature = CoreCrypto.hex(
      yield* Effect.mapError(signingKey.impl.hmacSha256(signingKey.key, stringToSign), fromCore),
    );
    return canonical.finish(signature);
  });
