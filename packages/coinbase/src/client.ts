/**
 * Coinbase CDP API Client.
 *
 * Wraps the shared REST client from sdk-core with Coinbase CDP-specific
 * error matching, JWT authentication, and credential handling.
 *
 * ## Authentication
 *
 * The Coinbase CDP API uses JWT bearer tokens for authentication. The JWT is
 * signed using your CDP API Key Secret (ES256 or Ed25519) and includes:
 *
 * - `sub`: Your CDP API Key ID
 * - `iss`: "cdp"
 * - `exp`: Current time + 120 seconds
 *
 * Some sensitive wallet operations additionally require an `X-Wallet-Auth`
 * header signed with your Wallet Secret.
 *
 * ## Error Handling
 *
 * Coinbase CDP errors have the shape:
 * ```json
 * {
 *   "errorType": "invalid_request",
 *   "errorMessage": "Invalid request.",
 *   "correlationId": "41deb8d59a9dc9a7-IAD",
 *   "errorLink": "https://docs.cdp.coinbase.com/api-reference/v2/errors#invalid-request"
 * }
 * ```
 *
 * Errors are dispatched first by `errorType`, then by HTTP status code.
 */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as crypto from "node:crypto";
import { makeAPI } from "@distilled.cloud/core/client";
import {
  HTTP_STATUS_MAP,
  COINBASE_HTTP_STATUS_MAP,
  ERROR_TYPE_MAP,
  STANDARD_ERROR_TYPE_MAP,
  UnknownCoinbaseError,
  CoinbaseParseError,
} from "./errors.ts";
import type { Config } from "./credentials.ts";
import { Credentials } from "./credentials.ts";

// Re-export for convenience
export { UnknownCoinbaseError } from "./errors.ts";

// ============================================================================
// JWT generation for Coinbase CDP API authentication
// ============================================================================

/**
 * Base64url-encode a buffer.
 */
const base64url = (buf: Buffer | Uint8Array): string =>
  Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

/**
 * Generate a random hex nonce.
 */
const randomNonce = (): string => crypto.randomBytes(16).toString("hex");

/**
 * Detect key type and return the appropriate signing algorithm and key object.
 */
const resolveSigningKey = (
  apiKeySecret: string,
): { algorithm: string; jwsAlg: string; key: crypto.KeyObject } => {
  // Try EC (ES256) first — PEM format
  if (apiKeySecret.includes("-----BEGIN")) {
    return {
      algorithm: "ES256",
      jwsAlg: "ES256",
      key: crypto.createPrivateKey(apiKeySecret),
    };
  }

  // Ed25519 — base64 encoded 64-byte key (32 seed + 32 public)
  const keyBytes = Buffer.from(apiKeySecret, "base64");
  if (keyBytes.length === 64) {
    // Extract the 32-byte seed (private key)
    const seed = keyBytes.subarray(0, 32);
    // Import as Ed25519 private key using PKCS8 DER wrapping
    // Ed25519 PKCS8 prefix: 302e020100300506032b657004220420
    const pkcs8Prefix = Buffer.from("302e020100300506032b657004220420", "hex");
    const pkcs8Der = Buffer.concat([pkcs8Prefix, seed]);
    return {
      algorithm: "EdDSA",
      jwsAlg: "EdDSA",
      key: crypto.createPrivateKey({
        key: pkcs8Der,
        format: "der",
        type: "pkcs8",
      }),
    };
  }

  throw new Error(
    "Unsupported CDP API Key Secret format. Expected EC PEM or Ed25519 base64.",
  );
};

/**
 * Generate a JWT bearer token for Coinbase CDP API authentication.
 *
 * The JWT includes:
 * - header: { alg, kid, typ: "JWT", nonce }
 * - payload: { sub, iss: "cdp", iat, nbf, exp }
 */
const generateJwt = (apiKeyId: string, apiKeySecret: string): string => {
  const { jwsAlg, key } = resolveSigningKey(apiKeySecret);

  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: jwsAlg,
    kid: apiKeyId,
    typ: "JWT",
    nonce: randomNonce(),
  };
  const payload = {
    sub: apiKeyId,
    iss: "cdp",
    iat: now,
    nbf: now,
    exp: now + 120,
  };

  const headerB64 = base64url(Buffer.from(JSON.stringify(header)));
  const payloadB64 = base64url(Buffer.from(JSON.stringify(payload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  let signature: Buffer;
  if (jwsAlg === "ES256") {
    // ES256 uses SHA-256 with ECDSA, needs IEEE P1363 format (not DER)
    const sign = crypto.createSign("SHA256");
    sign.update(signingInput);
    const derSig = sign.sign(key);
    // Convert DER signature to IEEE P1363 (raw r||s) format
    signature = derToP1363(derSig, 32);
  } else {
    // EdDSA (Ed25519) uses sign directly
    signature = Buffer.from(crypto.sign(null, Buffer.from(signingInput), key));
  }

  return `${signingInput}.${base64url(signature)}`;
};

/**
 * Convert a DER-encoded ECDSA signature to IEEE P1363 (raw r||s) format.
 * JWS requires P1363 format for ES256.
 */
const derToP1363 = (derSig: Buffer, componentLength: number): Buffer => {
  // DER format: 30 <len> 02 <rLen> <r> 02 <sLen> <s>
  let offset = 2; // skip 30 <len>
  if (derSig[1]! & 0x80) offset += derSig[1]! & 0x7f;

  // Read r
  offset++; // skip 02
  const rLen = derSig[offset++]!;
  const r = derSig.subarray(offset, offset + rLen);
  offset += rLen;

  // Read s
  offset++; // skip 02
  const sLen = derSig[offset++]!;
  const s = derSig.subarray(offset, offset + sLen);

  // Pad or trim to componentLength
  const result = Buffer.alloc(componentLength * 2);
  const rPadded =
    r.length > componentLength ? r.subarray(r.length - componentLength) : r;
  const sPadded =
    s.length > componentLength ? s.subarray(s.length - componentLength) : s;
  rPadded.copy(result, componentLength - rPadded.length);
  sPadded.copy(result, componentLength * 2 - sPadded.length);
  return result;
};

// ============================================================================
// Error response parsing
// ============================================================================

/**
 * Coinbase CDP API Error Response Schema.
 *
 * All Coinbase CDP errors have the same envelope:
 * { errorType, errorMessage, correlationId?, errorLink? }
 */
const CoinbaseErrorResponse = Schema.Struct({
  errorType: Schema.String,
  errorMessage: Schema.String,
  correlationId: Schema.optional(Schema.String),
  errorLink: Schema.optional(Schema.String),
});

/**
 * Match a Coinbase CDP API error response to the appropriate typed error class.
 *
 * Dispatches errors by:
 * 1. The `errorType` field for Coinbase-specific errors (e.g., "already_exists", "policy_violation")
 * 2. The `errorType` field for standard errors mapped to core classes (e.g., "not_found" → NotFound)
 * 3. Standard HTTP status codes mapped from core (400, 401, 403, 404, etc.)
 * 4. Coinbase-specific HTTP status codes (402)
 * 5. Falls back to UnknownCoinbaseError for unrecognized errors
 */
const matchError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<never, unknown> => {
  try {
    const parsed = Schema.decodeUnknownSync(CoinbaseErrorResponse)(errorBody);
    const errorProps = {
      errorType: parsed.errorType,
      errorMessage: parsed.errorMessage,
      correlationId: parsed.correlationId,
      errorLink: parsed.errorLink,
    };

    // 1. Match by Coinbase-specific error type first
    const TypedErrorClass = ERROR_TYPE_MAP[parsed.errorType];
    if (TypedErrorClass) {
      return Effect.fail(new TypedErrorClass(errorProps));
    }

    // 2. Match standard error types to core HTTP error classes
    // Maps error types like "not_found", "forbidden", "unauthorized", "invalid_request",
    // "rate_limit_exceeded", "internal_server_error", "bad_gateway", "service_unavailable"
    // to their corresponding core HTTP error classes.
    const StandardErrorClass = STANDARD_ERROR_TYPE_MAP[parsed.errorType];
    if (StandardErrorClass) {
      return Effect.fail(
        new StandardErrorClass({ message: parsed.errorMessage ?? "" }),
      );
    }

    // 3. Fall back to HTTP status code mapping from core
    const CoreErrorClass = (HTTP_STATUS_MAP as any)[status];
    if (CoreErrorClass) {
      return Effect.fail(
        new CoreErrorClass({ message: parsed.errorMessage ?? "" }),
      );
    }

    // 4. Coinbase-specific HTTP status codes (402)
    const CoinbaseErrorClass = (COINBASE_HTTP_STATUS_MAP as any)[status];
    if (CoinbaseErrorClass) {
      return Effect.fail(new CoinbaseErrorClass(errorProps));
    }

    // 5. Fall back to unknown error
    return Effect.fail(
      new UnknownCoinbaseError({
        ...errorProps,
        body: errorBody,
      }),
    );
  } catch {
    return Effect.fail(new UnknownCoinbaseError({ body: errorBody }));
  }
};

// ============================================================================
// API client factory
// ============================================================================

/**
 * Coinbase CDP API client.
 *
 * Uses JWT bearer token authentication signed with your CDP API Key Secret.
 */
export const API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => (creds as Config).apiBaseUrl,
  getAuthHeaders: (creds: any) => {
    const c = creds as Config;
    const jwt = generateJwt(c.apiKeyId, Redacted.value(c.apiKeySecret));
    return {
      Authorization: `Bearer ${jwt}`,
    };
  },
  matchError,
  ParseError: CoinbaseParseError as any,
});
