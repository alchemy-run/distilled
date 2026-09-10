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
import * as Effect from "effect/Effect";

const encoder = new TextEncoder();

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

/**
 * Derived signing keys, keyed on secret/date/region/service. Deriving the key
 * costs four HMACs; requests within one UTC day for the same scope share it.
 * Bounded (LRU, insertion order) so long-lived processes rotating temporary
 * credentials do not accumulate secret-derived material indefinitely.
 */
const SIGNING_KEY_CACHE_MAX = 64;
const signingKeyCache = new Map<string, ArrayBuffer>();

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
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly sessionToken?: string;
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

const hmac = async (
  key: string | ArrayBuffer,
  data: string,
): Promise<ArrayBuffer> => {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    typeof key === "string" ? encoder.encode(key) : key,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"],
  );
  return crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
};

const sha256 = (content: SignableBody): Promise<ArrayBuffer> =>
  crypto.subtle.digest(
    "SHA-256",
    typeof content === "string"
      ? encoder.encode(content)
      : ArrayBuffer.isView(content)
        ? // fresh ArrayBuffer-backed copy for the DOM typings
          new Uint8Array(
            content.buffer,
            content.byteOffset,
            content.byteLength,
          ).slice()
        : content,
  );

const HEX = "0123456789abcdef";
const toHex = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    const n = bytes[i]!;
    out += HEX[(n >>> 4) & 0xf]! + HEX[n & 0xf]!;
  }
  return out;
};

/** Percent-encode the characters `encodeURIComponent` leaves alone but RFC 3986 reserves. */
const encodeRfc3986 = (encoded: string): string =>
  encoded.replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase(),
  );

/** `Headers`-style normalisation: lower-case names, trimmed values, duplicates joined. */
const normalizeHeaders = (
  headers: Record<string, string> | undefined,
): Map<string, string> => {
  const out = new Map<string, string>();
  for (const [name, value] of Object.entries(headers ?? {})) {
    const key = name.toLowerCase();
    const trimmed = String(value).trim();
    const existing = out.get(key);
    out.set(key, existing === undefined ? trimmed : `${existing}, ${trimmed}`);
  }
  return out;
};

const signingKey = async (
  secretAccessKey: string,
  date: string,
  region: string,
  service: string,
): Promise<ArrayBuffer> => {
  const cacheKey = [secretAccessKey, date, region, service].join();
  const cached = signingKeyCache.get(cacheKey);
  if (cached) {
    // re-insert so the entry moves to the most-recently-used end
    signingKeyCache.delete(cacheKey);
    signingKeyCache.set(cacheKey, cached);
    return cached;
  }
  const kDate = await hmac("AWS4" + secretAccessKey, date);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  const kCredentials = await hmac(kService, "aws4_request");
  if (signingKeyCache.size >= SIGNING_KEY_CACHE_MAX) {
    signingKeyCache.delete(signingKeyCache.keys().next().value!);
  }
  signingKeyCache.set(cacheKey, kCredentials);
  return kCredentials;
};

const signAsync = async (options: SignOptions): Promise<SignedRequest> => {
  const {
    accessKeyId,
    secretAccessKey,
    sessionToken,
    service,
    region,
    signQuery,
    allHeaders,
    body,
  } = options;
  const method = options.method ?? (body ? "POST" : "GET");
  const url = new URL(options.url);
  const headers = normalizeHeaders(options.headers);
  headers.delete("host");
  const datetime =
    options.datetime ?? new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
  const appendSessionToken = service === "iotdevicegateway";

  if (service === "s3" && !signQuery && !headers.has("x-amz-content-sha256")) {
    headers.set("x-amz-content-sha256", "UNSIGNED-PAYLOAD");
  }

  const setParam = signQuery
    ? (k: string, v: string) => url.searchParams.set(k, v)
    : (k: string, v: string) => headers.set(k.toLowerCase(), v);
  setParam("X-Amz-Date", datetime);
  if (sessionToken && !appendSessionToken) {
    setParam("X-Amz-Security-Token", sessionToken);
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
  const credentialString = [
    datetime.slice(0, 8),
    region,
    service,
    "aws4_request",
  ].join("/");

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

  let payloadHash =
    headers.get("x-amz-content-sha256") ??
    (service === "s3" && signQuery ? "UNSIGNED-PAYLOAD" : undefined);
  if (payloadHash === undefined) {
    payloadHash = toHex(await sha256(body || ""));
  }

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
    toHex(await sha256(canonicalRequest)),
  ].join("\n");
  const key = await signingKey(
    secretAccessKey,
    datetime.slice(0, 8),
    region,
    service,
  );
  const signature = toHex(await hmac(key, stringToSign));

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
};

/**
 * Sign a request with SigV4. Never fails: WebCrypto HMAC/SHA-256 over
 * in-memory data does not reject, so any throw is a defect.
 */
export const sign = (options: SignOptions): Effect.Effect<SignedRequest> =>
  Effect.promise(() => signAsync(options));
