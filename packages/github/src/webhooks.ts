import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import {
  GitHubWebhookPayloadParseError,
  GitHubWebhookSignatureError,
} from "./errors.ts";
import {
  WebhookEventName,
  WebhookPayloadSchemas,
  type WebhookEvent,
  type WebhookPayloads,
} from "./webhook-events.ts";

export type {
  WebhookEvent,
  WebhookEventName,
  WebhookPayloads,
} from "./webhook-events.ts";

export type WebhookPayload = string | Uint8Array | ArrayBuffer;
export type WebhookSecret = string | Redacted.Redacted<string>;

export interface VerifySignatureOptions {
  /** Raw body exactly as delivered. Do not parse or reserialize before verification. */
  readonly payload: WebhookPayload;
  /** X-Hub-Signature-256 header. */
  readonly signature: string | null | undefined;
  /** The secret configured on the webhook. */
  readonly secret: WebhookSecret;
}

export interface ParseEventOptions {
  /** X-GitHub-Delivery header. */
  readonly id: string | null | undefined;
  /** X-GitHub-Event header. */
  readonly name: string | null | undefined;
  /** JSON request body. */
  readonly payload: WebhookPayload;
}

export interface ConstructEventOptions
  extends VerifySignatureOptions, ParseEventOptions {}

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8", { fatal: true });

// Snapshot byte inputs so the body cannot change between verification and parsing.
const payloadBytes = (payload: WebhookPayload): Uint8Array<ArrayBuffer> =>
  typeof payload === "string"
    ? encoder.encode(payload)
    : payload instanceof ArrayBuffer
      ? new Uint8Array(payload.slice(0))
      : new Uint8Array(payload);

/** Verify GitHub's HMAC-SHA256 signature using WebCrypto's native verifier. */
export const verifySignature = ({
  payload,
  signature,
  secret,
}: VerifySignatureOptions): Effect.Effect<void, GitHubWebhookSignatureError> =>
  Effect.gen(function* () {
    const match = /^sha256=([0-9a-fA-F]{64})$/.exec(signature ?? "");
    const value = Redacted.isRedacted(secret) ? Redacted.value(secret) : secret;
    if (!match || value.length === 0) {
      return yield* Effect.fail(
        new GitHubWebhookSignatureError({
          message:
            "A webhook secret and valid X-Hub-Signature-256 header are required",
        }),
      );
    }
    const bytes = payloadBytes(payload);
    const digest = Uint8Array.from(match[1]!.match(/../g)!, (pair) =>
      Number.parseInt(pair, 16),
    );
    const valid = yield* Effect.tryPromise({
      try: async () => {
        const key = await crypto.subtle.importKey(
          "raw",
          encoder.encode(value),
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["verify"],
        );
        return crypto.subtle.verify("HMAC", key, digest, bytes);
      },
      catch: (cause) =>
        new GitHubWebhookSignatureError({
          message: "Unable to verify GitHub webhook signature",
          cause,
        }),
    });
    if (!valid) {
      return yield* Effect.fail(
        new GitHubWebhookSignatureError({
          message: "GitHub webhook signature does not match the payload",
        }),
      );
    }
  });

const DeliveryHeaders = Schema.Struct({
  id: Schema.NonEmptyString,
  name: WebhookEventName,
});

/**
 * Parse a JSON delivery against its generated event schema without verifying
 * its signature. Use constructEvent for signed deliveries. Unknown event names,
 * malformed JSON, and payloads that do not match the event schema fail explicitly.
 */
export const parseEvent = (
  options: ParseEventOptions,
): Effect.Effect<WebhookEvent, GitHubWebhookPayloadParseError> =>
  Effect.gen(function* () {
    const { id, name } = yield* Schema.decodeUnknownEffect(DeliveryHeaders)({
      id: options.id,
      name: options.name,
    }).pipe(
      Effect.mapError(
        (cause) =>
          new GitHubWebhookPayloadParseError({
            message: "Invalid GitHub webhook delivery headers",
            cause,
          }),
      ),
    );
    const json = yield* Effect.try({
      try: () =>
        JSON.parse(
          typeof options.payload === "string"
            ? options.payload
            : decoder.decode(payloadBytes(options.payload)),
        ) as unknown,
      catch: (cause) =>
        new GitHubWebhookPayloadParseError({
          message: "GitHub webhook payload must be valid UTF-8 JSON",
          cause,
        }),
    });
    const schema: Schema.Codec<WebhookPayloads[WebhookEventName]> =
      WebhookPayloadSchemas[name];
    const payload = yield* Schema.decodeUnknownEffect(schema)(json).pipe(
      Effect.mapError(
        (cause) =>
          new GitHubWebhookPayloadParseError({
            message: `Invalid ${name} webhook payload`,
            cause,
          }),
      ),
    );
    // The schema was selected by name; TypeScript cannot express that
    // correlation after indexing a heterogeneous schema registry.
    return { id, name, payload } as WebhookEvent;
  });

/** Verify the raw delivery body, then decode its headers and event payload. */
export const constructEvent = (
  options: ConstructEventOptions,
): Effect.Effect<
  WebhookEvent,
  GitHubWebhookSignatureError | GitHubWebhookPayloadParseError
> =>
  Effect.suspend(() => {
    const payload = payloadBytes(options.payload);
    return verifySignature({ ...options, payload }).pipe(
      Effect.andThen(() => parseEvent({ ...options, payload })),
    );
  });
