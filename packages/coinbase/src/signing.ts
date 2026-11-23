/**
 * The CDP API Key Secret as a signing key -- hand-written.
 *
 * The secret is parsed, and proven to sign, once: when the credentials layer
 * is built (./credentials.ts). A secret that is not a usable key is a setup
 * error (`ConfigError`) there, so the protocol never meets one.
 */
import * as crypto from "node:crypto";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";

/** A parsed CDP API Key Secret and the JWS algorithm it signs with. */
export interface SigningKey {
  readonly jwsAlg: "ES256" | "EdDSA";
  readonly key: crypto.KeyObject;
}

const invalidKey = (detail: string, cause: unknown) =>
  new ConfigError({
    message: `${detail}: ${cause instanceof Error ? cause.message : String(cause)}`,
  });

/**
 * Detect key type and return the appropriate signing algorithm and key object.
 * A secret that is not a key fails with `ConfigError`.
 */
const parseSigningKey = (apiKeySecret: string): Effect.Effect<SigningKey, ConfigError> => {
  // Try EC (ES256) first -- PEM format
  if (apiKeySecret.includes("-----BEGIN")) {
    return Effect.try({
      try: (): SigningKey => ({ jwsAlg: "ES256", key: crypto.createPrivateKey(apiKeySecret) }),
      catch: (cause) =>
        invalidKey("The CDP API Key Secret is not a valid EC PEM private key", cause),
    });
  }

  // Ed25519 -- base64 encoded 64-byte key (32 seed + 32 public)
  const keyBytes = Buffer.from(apiKeySecret, "base64");
  if (keyBytes.length === 64) {
    // Extract the 32-byte seed (private key)
    const seed = keyBytes.subarray(0, 32);
    // Import as Ed25519 private key using PKCS8 DER wrapping
    // Ed25519 PKCS8 prefix: 302e020100300506032b657004220420
    const pkcs8Prefix = Buffer.from("302e020100300506032b657004220420", "hex");
    const pkcs8Der = Buffer.concat([pkcs8Prefix, seed]);
    return Effect.try({
      try: (): SigningKey => ({
        jwsAlg: "EdDSA",
        key: crypto.createPrivateKey({
          key: pkcs8Der,
          format: "der",
          type: "pkcs8",
        }),
      }),
      catch: (cause) =>
        invalidKey("The CDP API Key Secret is not a valid Ed25519 private key", cause),
    });
  }

  return Effect.fail(
    new ConfigError({
      message: "Unsupported CDP API Key Secret format. Expected EC PEM or Ed25519 base64.",
    }),
  );
};

/**
 * `apiKeySecret` as a key that signs. A key that parses but cannot sign with
 * its algorithm (for example an Ed25519 key in PEM form, which is routed to
 * ES256) fails here too, on a trial signature.
 */
export const signingKey = (apiKeySecret: string): Effect.Effect<SigningKey, ConfigError> =>
  Effect.flatMap(parseSigningKey(apiKeySecret), (key) =>
    Effect.try({
      try: () => {
        sign(key, "distilled");
        return key;
      },
      catch: (cause) => invalidKey(`The CDP API Key Secret cannot sign a ${key.jwsAlg} JWT`, cause),
    }),
  );

/**
 * The JWS signature of `signingInput`. Throws what `node:crypto` throws:
 * call it inside `Effect.try`.
 */
export const sign = ({ jwsAlg, key }: SigningKey, signingInput: string): Buffer => {
  if (jwsAlg === "ES256") {
    // ES256 uses SHA-256 with ECDSA, needs IEEE P1363 format (not DER)
    const signer = crypto.createSign("SHA256");
    signer.update(signingInput);
    // Convert DER signature to IEEE P1363 (raw r||s) format
    return derToP1363(signer.sign(key), 32);
  }
  // EdDSA (Ed25519) uses sign directly
  return Buffer.from(crypto.sign(null, Buffer.from(signingInput), key));
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
  const rPadded = r.length > componentLength ? r.subarray(r.length - componentLength) : r;
  const sPadded = s.length > componentLength ? s.subarray(s.length - componentLength) : s;
  rPadded.copy(result, componentLength - rPadded.length);
  sPadded.copy(result, componentLength * 2 - sPadded.length);
  return result;
};
