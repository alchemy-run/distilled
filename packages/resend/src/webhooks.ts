/**
 * Resend webhook verification -- hand-written.
 *
 * Resend signs deliveries with Standard Webhooks (Svix): the `svix-id`,
 * `svix-timestamp` and `svix-signature` headers (the `webhook-*` names are
 * accepted too), an HMAC-SHA256 over `${id}.${timestamp}.${body}` keyed by
 * the base64 part of the endpoint's `whsec_...` signing secret, and a
 * space-separated `v1,<base64>` signature list. Uses WebCrypto only, so it
 * runs on Node, Bun and workerd alike.
 *
 * @example
 * ```ts
 * import * as Resend from "@distilled.cloud/resend";
 *
 * const event = yield* Resend.Webhooks.constructEvent({
 *   payload: yield* request.text,
 *   headers: request.headers,
 *   secret: signingSecret,
 * });
 * if (event.type === "email.bounced") event.data.bounce.type;
 * ```
 */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { ResendWebhookPayloadParseError, ResendWebhookSignatureError } from "./errors.ts";
import type { WebhookEvent } from "./services/webhook_events.ts";

export type { WebhookEvent, WebhookEvents, WebhookEventType } from "./services/webhook_events.ts";

/** Standard Webhooks' default: deliveries older or newer than this are refused. */
export const DEFAULT_WEBHOOK_TOLERANCE_SECONDS = 300;

export type WebhookPayload = string | Uint8Array | ArrayBuffer;
export type WebhookSecret = string | Redacted.Redacted<string>;

/** The three signature headers, already read off the request. */
export interface WebhookHeaders {
  readonly id: string | null | undefined;
  readonly timestamp: string | null | undefined;
  readonly signature: string | null | undefined;
}

/** A fetch `Headers` or a plain header record, read case-insensitively. */
export type WebhookHeaderSource =
  | WebhookHeaders
  | { readonly get: (name: string) => string | null }
  | Readonly<Record<string, string | ReadonlyArray<string> | undefined>>;

export interface VerifySignatureOptions {
  /** Raw request body exactly as Resend sent it. Do not pass parsed or reserialized JSON. */
  readonly payload: WebhookPayload;
  readonly headers: WebhookHeaderSource;
  /** The endpoint's signing secret (`whsec_...`), as createWebhook or getWebhook return it. */
  readonly secret: WebhookSecret;
  /**
   * Maximum allowed distance from now, in seconds, of `svix-timestamp`. Pass
   * `0` to skip the check for tests or offline reprocessing.
   */
  readonly toleranceSeconds?: number | undefined;
}

export interface ConstructEventOptions extends VerifySignatureOptions {}

const textEncoder = /*@__PURE__*/ new TextEncoder();
const textDecoder = /*@__PURE__*/ new TextDecoder("utf-8", { fatal: true });

const signatureError = (message: string, cause?: unknown) =>
  new ResendWebhookSignatureError({ message, cause });

const payloadToBytes = (payload: WebhookPayload): Uint8Array =>
  typeof payload === "string"
    ? textEncoder.encode(payload)
    : payload instanceof ArrayBuffer
      ? new Uint8Array(payload)
      : payload;

const payloadToString = (payload: WebhookPayload): string =>
  typeof payload === "string" ? payload : textDecoder.decode(payloadToBytes(payload));

const isWebhookHeaders = (source: WebhookHeaderSource): source is WebhookHeaders =>
  "id" in source && "timestamp" in source && "signature" in source;

const readHeaders = (source: WebhookHeaderSource): WebhookHeaders => {
  if (isWebhookHeaders(source)) return source;
  const get = (name: string): string | undefined => {
    if (typeof source.get === "function") return source.get(name) ?? undefined;
    const record = source as Readonly<Record<string, string | ReadonlyArray<string> | undefined>>;
    const key = Object.keys(record).find((k) => k.toLowerCase() === name);
    const value = key === undefined ? undefined : record[key];
    return typeof value === "string" ? value : value?.join(" ");
  };
  return {
    id: get("svix-id") ?? get("webhook-id"),
    timestamp: get("svix-timestamp") ?? get("webhook-timestamp"),
    signature: get("svix-signature") ?? get("webhook-signature"),
  };
};

const base64ToBytes = (base64: string): Uint8Array<ArrayBuffer> | undefined => {
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  } catch {
    return undefined;
  }
};

const secretKeyBytes = (secret: WebhookSecret): Uint8Array<ArrayBuffer> | undefined => {
  const value = Redacted.isRedacted(secret) ? Redacted.value(secret) : secret;
  const key = base64ToBytes(value.startsWith("whsec_") ? value.slice("whsec_".length) : value);
  return key === undefined || key.byteLength === 0 ? undefined : key;
};

const hmacSha256 = (
  key: Uint8Array<ArrayBuffer>,
  content: Uint8Array<ArrayBuffer>,
): Effect.Effect<Uint8Array, ResendWebhookSignatureError> =>
  Effect.tryPromise({
    try: async () => {
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      return new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, content));
    },
    catch: (cause) => signatureError("Unable to compute the Resend webhook signature", cause),
  });

const signedContent = (
  id: string,
  timestamp: string,
  payload: WebhookPayload,
): Uint8Array<ArrayBuffer> => {
  const prefix = textEncoder.encode(`${id}.${timestamp}.`);
  const body = payloadToBytes(payload);
  const content = new Uint8Array(prefix.byteLength + body.byteLength);
  content.set(prefix, 0);
  content.set(body, prefix.byteLength);
  return content;
};

const constantTimeEqual = (expected: Uint8Array, candidate: Uint8Array): boolean => {
  // JavaScript cannot guarantee CPU-level constant time, but length mismatches
  // are folded into the accumulator so a matching prefix can never succeed.
  let difference = expected.byteLength ^ candidate.byteLength;
  const byteLength = Math.max(expected.byteLength, candidate.byteLength);
  for (let index = 0; index < byteLength; index += 1) {
    difference |= (expected[index] ?? 0) ^ (candidate[index] ?? 0);
  }
  return difference === 0;
};

/** `v1,<base64>` entries of the space-separated signature header. */
const v1Signatures = (header: string): ReadonlyArray<Uint8Array> =>
  header
    .split(" ")
    .map((entry) => entry.trim())
    .filter((entry) => entry.startsWith("v1,"))
    .map((entry) => base64ToBytes(entry.slice("v1,".length)) ?? new Uint8Array(0));

/** Fails with {@link ResendWebhookSignatureError} unless the delivery is signed with `secret`. */
export const verifySignature = ({
  payload,
  headers,
  secret,
  toleranceSeconds = DEFAULT_WEBHOOK_TOLERANCE_SECONDS,
}: VerifySignatureOptions): Effect.Effect<void, ResendWebhookSignatureError> =>
  Effect.gen(function* () {
    const { id, timestamp, signature } = readHeaders(headers);
    if (!id || !timestamp || !signature) {
      return yield* signatureError(
        "svix-id, svix-timestamp and svix-signature headers are required",
      );
    }

    const timestampSeconds = Number(timestamp);
    if (!Number.isSafeInteger(timestampSeconds) || String(timestampSeconds) !== timestamp) {
      return yield* signatureError("svix-timestamp header is invalid");
    }
    if (!Number.isFinite(toleranceSeconds) || toleranceSeconds < 0) {
      return yield* signatureError("Resend webhook tolerance must be a non-negative number");
    }
    if (
      toleranceSeconds > 0 &&
      Math.abs(Math.floor(Date.now() / 1000) - timestampSeconds) > toleranceSeconds
    ) {
      return yield* signatureError(
        `Resend webhook timestamp is outside the tolerance window of ${toleranceSeconds} seconds`,
      );
    }

    const key = secretKeyBytes(secret);
    if (key === undefined) {
      return yield* signatureError("Resend webhook secret is not a whsec_ base64 secret");
    }
    const candidates = v1Signatures(signature);
    if (candidates.length === 0) {
      return yield* signatureError("svix-signature header has no v1 signature");
    }

    const expected = yield* hmacSha256(key, signedContent(id, timestamp, payload));
    let matched = false;
    for (const candidate of candidates) matched = constantTimeEqual(expected, candidate) || matched;
    if (!matched) {
      return yield* signatureError("No v1 signature matches the expected Resend webhook signature");
    }
  });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Verifies the signature, then parses the body as a {@link WebhookEvent}.
 * The payload is typed from the spec, not decoded: an event type newer than
 * this SDK still arrives, with a `type` outside the union.
 */
export const constructEvent = (
  options: ConstructEventOptions,
): Effect.Effect<WebhookEvent, ResendWebhookSignatureError | ResendWebhookPayloadParseError> =>
  verifySignature(options).pipe(
    Effect.flatMap(() =>
      Effect.try({
        try: () => {
          const parsed = JSON.parse(payloadToString(options.payload)) as unknown;
          if (!isRecord(parsed) || typeof parsed.type !== "string") {
            throw new Error("Resend webhook payload must be a JSON object with a string `type`");
          }
          return parsed as unknown as WebhookEvent;
        },
        catch: (cause) =>
          new ResendWebhookPayloadParseError({
            message: "Unable to parse the Resend webhook payload as JSON",
            cause,
          }),
      }),
    ),
  );
