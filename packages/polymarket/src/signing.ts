/**
 * CLOB L2 request signing -- hand-written.
 *
 * Polymarket authenticates private CLOB (and Combos RFQ) requests with five
 * headers. `POLY_SIGNATURE` is HMAC-SHA256 over
 * `timestamp + METHOD + path + body`, keyed with the base64-decoded API
 * secret and encoded as URL-safe base64 that keeps its `=` padding
 * (https://docs.polymarket.com/getting-started/api.md, "Create a CLOB L2
 * Signature"). `path` is the route path without the query string, and
 * `body` is the exact serialized request body, left out when empty --
 * the same rules as Polymarket's own `clob-client` (`buildPolyHmacSignature`).
 */
import * as Crypto from "@distilled.cloud/core/crypto";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as Base64 from "effect/encoding/Base64";
import * as Base64Url from "effect/encoding/Base64Url";
import * as Result from "effect/Result";

/**
 * Decode an API secret the way the official client does: base64url is
 * read as base64, characters outside the alphabet are dropped, and missing
 * padding is restored.
 */
const decodeSecret = (secret: string): Effect.Effect<Uint8Array, ConfigError> => {
  const stripped = secret
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/[^A-Za-z0-9+/]/g, "");
  const padded = stripped + "=".repeat((4 - (stripped.length % 4)) % 4);
  const decoded = Base64.decode(padded);
  return Result.isSuccess(decoded)
    ? Effect.succeed(decoded.success)
    : Effect.fail(new ConfigError({ message: "The Polymarket CLOB secret is not base64" }));
};

/** `POLY_SIGNATURE` for one request. */
export const signL2 = (args: {
  readonly secret: string;
  readonly timestamp: number | string;
  readonly method: string;
  readonly requestPath: string;
  readonly body?: string | undefined;
}): Effect.Effect<string, ConfigError | Crypto.CryptoError> =>
  Effect.gen(function* () {
    const key = yield* decodeSecret(args.secret);
    const crypto = yield* Crypto.Crypto;
    const hmacKey = yield* crypto.importHmacKey(key);
    const message = `${args.timestamp}${args.method}${args.requestPath}${args.body ?? ""}`;
    const digest = yield* crypto.hmacSha256(hmacKey, message);
    return Base64Url.encodePadded(digest);
  });
