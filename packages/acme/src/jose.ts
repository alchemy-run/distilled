/**
 * JOSE helpers for ACME — hand-written, WebCrypto only (no native code).
 *
 * - account keys (ES256 P-256 by default, RS256 accepted)
 * - JWS in the flattened JSON serialization every ACME POST carries
 *   (RFC 8555 §6.2), including the HS256 External Account Binding
 * - RFC 7638 JWK thumbprints, key authorizations and the DNS-01 TXT value
 */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { JoseError } from "./errors.ts";

export type Algorithm = "ES256" | "RS256";

export interface Jwk {
  readonly kty: string;
  readonly crv?: string;
  readonly x?: string;
  readonly y?: string;
  readonly n?: string;
  readonly e?: string;
  readonly d?: string;
  readonly [key: string]: unknown;
}

const encoder = new TextEncoder();

export const base64url = (bytes: Uint8Array | ArrayBuffer): string => {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
};

export const base64urlDecode = (text: string): Uint8Array => {
  const padded = text.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
};

const base64urlJson = (value: unknown): string =>
  base64url(encoder.encode(JSON.stringify(value)));

const sha256 = (data: Uint8Array | string): Effect.Effect<Uint8Array> =>
  Effect.promise(async () => {
    const bytes = typeof data === "string" ? encoder.encode(data) : data;
    return new Uint8Array(
      await crypto.subtle.digest("SHA-256", bytes as Uint8Array<ArrayBuffer>),
    );
  });

/** Detect the JWS algorithm for a JWK. */
export const algorithmOf = (jwk: Jwk): Algorithm =>
  jwk.kty === "RSA" ? "RS256" : "ES256";

const importAlgorithm = (alg: Algorithm) =>
  alg === "RS256"
    ? { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }
    : { name: "ECDSA", namedCurve: "P-256" };

const signAlgorithm = (alg: Algorithm) =>
  alg === "RS256"
    ? { name: "RSASSA-PKCS1-v1_5" }
    : { name: "ECDSA", hash: "SHA-256" };

/** Generate a fresh account key as a private JWK (JSON text, Redacted). */
export const generateAccountKey = (
  alg: Algorithm = "ES256",
): Effect.Effect<Redacted.Redacted<string>> =>
  Effect.promise(async () => {
    const pair = await crypto.subtle.generateKey(
      alg === "RS256"
        ? {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
          }
        : { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["sign", "verify"],
    );
    const jwk = await crypto.subtle.exportKey("jwk", pair.privateKey);
    return Redacted.make(JSON.stringify(jwk));
  });

/** Parse a private JWK from its JSON text. */
export const parseJwk = (
  key: Redacted.Redacted<string> | string,
): Effect.Effect<Jwk, JoseError> =>
  Effect.try({
    try: () =>
      JSON.parse(Redacted.isRedacted(key) ? Redacted.value(key) : key) as Jwk,
    catch: (cause) =>
      new JoseError({
        message: "The account key is not a JSON Web Key.",
        cause,
      }),
  });

/** The public half of a JWK, with members in RFC 7638 canonical order. */
export const publicJwk = (jwk: Jwk): Jwk =>
  jwk.kty === "RSA"
    ? { e: jwk.e, kty: "RSA", n: jwk.n }
    : { crv: jwk.crv, kty: "EC", x: jwk.x, y: jwk.y };

/** RFC 7638 JWK thumbprint (base64url SHA-256 of the canonical public JWK). */
export const thumbprint = (jwk: Jwk): Effect.Effect<string> =>
  sha256(JSON.stringify(publicJwk(jwk))).pipe(Effect.map(base64url));

/** `<token>.<thumbprint>` — what a challenge proves the client holds. */
export const keyAuthorization = (
  token: string,
  jwk: Jwk,
): Effect.Effect<string> =>
  thumbprint(jwk).pipe(Effect.map((print) => `${token}.${print}`));

/** The TXT record value for a DNS-01 challenge: base64url(SHA-256(keyAuthorization)). */
export const dnsChallengeValue = (
  token: string,
  jwk: Jwk,
): Effect.Effect<string> =>
  keyAuthorization(token, jwk).pipe(
    Effect.flatMap(sha256),
    Effect.map(base64url),
  );

export interface FlattenedJws {
  readonly protected: string;
  readonly payload: string;
  readonly signature: string;
}

export interface SignOptions {
  readonly jwk: Jwk;
  readonly url: string;
  readonly nonce: string;
  /** Sent as `kid` when known; otherwise the public JWK is embedded. */
  readonly kid?: string | undefined;
  /** `undefined` produces a POST-as-GET (empty payload). */
  readonly payload?: unknown;
}

/** Sign an ACME request body (RFC 8555 §6.2) with the account key. */
export const signRequest = (
  options: SignOptions,
): Effect.Effect<FlattenedJws, JoseError> =>
  Effect.tryPromise({
    try: async () => {
      const alg = algorithmOf(options.jwk);
      const header = {
        alg,
        nonce: options.nonce,
        url: options.url,
        ...(options.kid !== undefined
          ? { kid: options.kid }
          : { jwk: publicJwk(options.jwk) }),
      };
      const protectedB64 = base64urlJson(header);
      const payloadB64 =
        options.payload === undefined ? "" : base64urlJson(options.payload);
      const key = await crypto.subtle.importKey(
        "jwk",
        options.jwk as JsonWebKey,
        importAlgorithm(alg),
        false,
        ["sign"],
      );
      const signature = await crypto.subtle.sign(
        signAlgorithm(alg),
        key,
        encoder.encode(`${protectedB64}.${payloadB64}`),
      );
      return {
        protected: protectedB64,
        payload: payloadB64,
        signature: base64url(signature),
      };
    },
    catch: (cause) =>
      new JoseError({ message: "Signing the ACME request failed.", cause }),
  });

/**
 * The External Account Binding JWS (RFC 8555 §7.3.4): HS256 over the
 * account's public JWK, keyed by the CA-issued HMAC key, with the CA's key
 * id as `kid`.
 */
export const signExternalAccountBinding = (options: {
  readonly jwk: Jwk;
  readonly url: string;
  readonly keyId: string;
  readonly hmacKey: Redacted.Redacted<string> | string;
}): Effect.Effect<FlattenedJws, JoseError> =>
  Effect.tryPromise({
    try: async () => {
      const raw = Redacted.isRedacted(options.hmacKey)
        ? Redacted.value(options.hmacKey)
        : options.hmacKey;
      const key = await crypto.subtle.importKey(
        "raw",
        base64urlDecode(raw) as Uint8Array<ArrayBuffer>,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const protectedB64 = base64urlJson({
        alg: "HS256",
        kid: options.keyId,
        url: options.url,
      });
      const payloadB64 = base64urlJson(publicJwk(options.jwk));
      const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(`${protectedB64}.${payloadB64}`),
      );
      return {
        protected: protectedB64,
        payload: payloadB64,
        signature: base64url(signature),
      };
    },
    catch: (cause) =>
      new JoseError({
        message: "Signing the External Account Binding failed.",
        cause,
      }),
  });
