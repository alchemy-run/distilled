/**
 * TC3-HMAC-SHA256, the Tencent Cloud API 3.0 request signature -- hand-written.
 *
 * https://www.tencentcloud.com/document/api/213/33224
 *
 * ```
 * CanonicalRequest = POST \n / \n "" \n CanonicalHeaders \n SignedHeaders \n hex(sha256(payload))
 * StringToSign     = TC3-HMAC-SHA256 \n <timestamp> \n <date>/<service>/tc3_request \n hex(sha256(CanonicalRequest))
 * SecretSigning    = HMAC(HMAC(HMAC("TC3" + SecretKey, date), service), "tc3_request")
 * Signature        = hex(HMAC(SecretSigning, StringToSign))
 * ```
 *
 * `<date>` is the UTC date of the timestamp. Canonical headers are
 * `name:value` with both lowercased and trimmed, sorted by name. Hashing and
 * HMAC run on core's swappable {@link Crypto} service.
 */
import { Crypto, hex, type CryptoError } from "@distilled.cloud/core/crypto";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";

export const ALGORITHM = "TC3-HMAC-SHA256";

/** The headers a request may sign. `content-type` and `host` are required by the scheme. */
export type SignedHeader = "content-type" | "host" | "x-tc-action";

/** What the SDK signs: `content-type`, `host` and `x-tc-action`, like Tencent's own SDKs. */
export const DEFAULT_SIGNED_HEADERS: ReadonlyArray<SignedHeader> = [
  "content-type",
  "host",
  "x-tc-action",
];

export interface SignInput {
  readonly secretId: string;
  readonly secretKey: Redacted.Redacted<string>;
  /** Product service name, e.g. `cvm`. */
  readonly service: string;
  /** Request host, e.g. `cvm.tencentcloudapi.com`. */
  readonly host: string;
  /** `X-TC-Action` value. Signed when `x-tc-action` is in `signedHeaders`. */
  readonly action: string;
  /** `X-TC-Timestamp`: Unix time in seconds. */
  readonly timestamp: number;
  /** The exact `Content-Type` header the request sends. */
  readonly contentType: string;
  /** The exact request body. */
  readonly payload: string;
  /** Default {@link DEFAULT_SIGNED_HEADERS}. */
  readonly signedHeaders?: ReadonlyArray<SignedHeader>;
}

export interface Signature {
  /** The `Authorization` header value. */
  readonly authorization: string;
  readonly signature: string;
  readonly canonicalRequest: string;
  readonly stringToSign: string;
  readonly credentialScope: string;
}

/** `2019-02-25` for timestamp 1551113065 -- the UTC date, never the local one. */
export const utcDate = (timestamp: number): string =>
  new Date(timestamp * 1000).toISOString().slice(0, 10);

/** Sign one API 3.0 POST request. */
export const sign = (input: SignInput): Effect.Effect<Signature, CryptoError> =>
  Effect.gen(function* () {
    const crypto = yield* Crypto;
    const sha256Hex = (data: string) => Effect.map(crypto.sha256(data), hex);
    const hmac = (key: Uint8Array | string, data: string) =>
      Effect.flatMap(crypto.importHmacKey(key), (k) => crypto.hmacSha256(k, data));

    const values: Record<SignedHeader, string> = {
      "content-type": input.contentType,
      host: input.host,
      "x-tc-action": input.action,
    };
    const names = [...new Set(input.signedHeaders ?? DEFAULT_SIGNED_HEADERS)].sort();
    const canonicalHeaders = names
      .map((name) => `${name}:${values[name].trim().toLowerCase()}\n`)
      .join("");
    const signedHeaders = names.join(";");

    const canonicalRequest = [
      "POST",
      "/",
      "",
      canonicalHeaders,
      signedHeaders,
      yield* sha256Hex(input.payload),
    ].join("\n");

    const date = utcDate(input.timestamp);
    const credentialScope = `${date}/${input.service}/tc3_request`;
    const stringToSign = [
      ALGORITHM,
      String(input.timestamp),
      credentialScope,
      yield* sha256Hex(canonicalRequest),
    ].join("\n");

    const secretDate = yield* hmac(`TC3${Redacted.value(input.secretKey)}`, date);
    const secretService = yield* hmac(secretDate, input.service);
    const secretSigning = yield* hmac(secretService, "tc3_request");
    const signature = hex(yield* hmac(secretSigning, stringToSign));

    return {
      authorization: `${ALGORITHM} Credential=${input.secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
      signature,
      canonicalRequest,
      stringToSign,
      credentialScope,
    };
  });
