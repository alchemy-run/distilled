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
import * as Cache from "effect/Cache";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Encoding from "effect/Encoding";
import * as Redacted from "effect/Redacted";

/**
 * Headers left out of the signature by default (matches aws4fetch). Callers
 * opt back in with `allHeaders`.
 */
const UNSIGNABLE_HEADERS: ReadonlySet<string> = new Set([
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
  /** Include the normally unsignable headers (content-type, range, …). */
  readonly allHeaders?: boolean;
}

export interface SignedRequest {
  readonly method: string;
  /** Normalised URL; carries the `X-Amz-*` params when `signQuery` is set. */
  readonly url: string;
  /** Lower-cased header names, including the added `x-amz-*` / `authorization`. */
  readonly headers: Record<string, string>;
}

const encoder = new TextEncoder();

const toBytes = (data: SignableBody): Uint8Array<ArrayBuffer> =>
  typeof data === "string"
    ? encoder.encode(data)
    : ArrayBuffer.isView(data)
      ? // fresh ArrayBuffer-backed copy for the WebCrypto typings
        new Uint8Array(data.buffer, data.byteOffset, data.byteLength).slice()
      : new Uint8Array(data);

const hmac = (
  key: string | ArrayBuffer,
  data: string,
): Effect.Effect<ArrayBuffer> =>
  Effect.promise(async () =>
    crypto.subtle.sign(
      "HMAC",
      await crypto.subtle.importKey(
        "raw",
        typeof key === "string" ? encoder.encode(key) : key,
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"],
      ),
      encoder.encode(data),
    ),
  );

const sha256 = (content: SignableBody): Effect.Effect<ArrayBuffer> =>
  Effect.promise(() => crypto.subtle.digest("SHA-256", toBytes(content)));

const hex = (buffer: ArrayBuffer): string =>
  Encoding.encodeHex(new Uint8Array(buffer));

/** Percent-encode the characters `encodeURIComponent` leaves alone but RFC 3986 reserves. */
const encodeRfc3986 = (encoded: string): string =>
  encoded.replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase(),
  );

/**
 * Scope of a derived signing key. `Redacted` hashes and compares by its
 * underlying value, so the secret never has to be unwrapped into a cache key.
 */
interface SigningKeyScope {
  readonly secretAccessKey: Redacted.Redacted<string>;
  readonly date: string;
  readonly region: string;
  readonly service: string;
}

const deriveSigningKey = ({
  secretAccessKey,
  date,
  region,
  service,
}: SigningKeyScope): Effect.Effect<ArrayBuffer> =>
  hmac("AWS4" + Redacted.value(secretAccessKey), date).pipe(
    Effect.flatMap((kDate) => hmac(kDate, region)),
    Effect.flatMap((kRegion) => hmac(kRegion, service)),
    Effect.flatMap((kService) => hmac(kService, "aws4_request")),
  );

/**
 * Derived signing keys, keyed on secret/date/region/service. Deriving one
 * costs four HMACs; requests within a UTC day for the same scope share it.
 * The cache is bounded (LRU) so long-lived processes rotating temporary
 * credentials do not accumulate secret-derived material, and it is a context
 * reference so a scope can substitute its own.
 */
export const SigningKeyCache = Context.Reference<
  Cache.Cache<SigningKeyScope, ArrayBuffer>
>("AWS::SigningKeyCache", {
  defaultValue: () =>
    Effect.runSync(Cache.make({ lookup: deriveSigningKey, capacity: 64 })),
});

/**
 * Sign a request with SigV4. Never fails: WebCrypto HMAC/SHA-256 over
 * in-memory data does not reject, so any throw is a defect.
 */
export const sign: (options: SignOptions) => Effect.Effect<SignedRequest> =
  Effect.fnUntraced(function* (options: SignOptions) {
    const { accessKeyId, service, region, signQuery, allHeaders, body } =
      options;
    const sessionToken = options.sessionToken
      ? Redacted.value(options.sessionToken)
      : undefined;
    const method = options.method ?? (body ? "POST" : "GET");
    const url = new URL(options.url);
    const headers = new Headers(options.headers);
    headers.delete("host");
    const datetime =
      options.datetime ?? new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
    const appendSessionToken = service === "iotdevicegateway";

    if (
      service === "s3" &&
      !signQuery &&
      !headers.has("x-amz-content-sha256")
    ) {
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
          (header === "host"
            ? url.host
            : (headers.get(header) ?? "").replace(/\s+/g, " ")),
      )
      .join("\n");
    const date = datetime.slice(0, 8);
    const credentialString = [date, region, service, "aws4_request"].join("/");

    if (signQuery) {
      if (service === "s3" && !url.searchParams.has("X-Amz-Expires")) {
        url.searchParams.set("X-Amz-Expires", "86400");
      }
      url.searchParams.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
      url.searchParams.set(
        "X-Amz-Credential",
        accessKeyId + "/" + credentialString,
      );
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
    encodedPath = encodeRfc3986(
      encodeURIComponent(encodedPath).replace(/%2F/g, "/"),
    );

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
          [
            encodeRfc3986(encodeURIComponent(k)),
            encodeRfc3986(encodeURIComponent(v)),
          ] as const,
      )
      .sort(([k1, v1], [k2, v2]) =>
        k1 < k2 ? -1 : k1 > k2 ? 1 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0,
      )
      .map((pair) => pair.join("="))
      .join("&");

    const payloadHash =
      headers.get("x-amz-content-sha256") ??
      (service === "s3" && signQuery
        ? "UNSIGNED-PAYLOAD"
        : hex(yield* sha256(body || "")));

    const canonicalRequest = [
      method.toUpperCase(),
      encodedPath,
      encodedSearch,
      canonicalHeaders + "\n",
      signedHeaders,
      payloadHash,
    ].join("\n");
    const stringToSign = [
      "AWS4-HMAC-SHA256",
      datetime,
      credentialString,
      hex(yield* sha256(canonicalRequest)),
    ].join("\n");
    const signingKey = yield* Cache.get(yield* SigningKeyCache, {
      secretAccessKey: options.secretAccessKey,
      date,
      region,
      service,
    });
    const signature = hex(yield* hmac(signingKey, stringToSign));

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

    return {
      method,
      url: url.toString(),
      headers: Object.fromEntries(headers),
    };
  });
