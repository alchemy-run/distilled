/**
 * Mailchimp protocols — hand-written.
 *
 * Marketing (`MailchimpProtocol`) is plain JSON REST with no response
 * envelope. Failures are RFC 7807 problem documents:
 *
 *     { "type": "https://mailchimp.com/developer/marketing/docs/errors/",
 *       "title": "Resource Not Found", "status": 404,
 *       "detail": "The requested resource could not be found.",
 *       "instance": "995c5cb0-3280-4a6e-808b-3b096d0bb219" }
 *
 * A 400 from a write adds `errors: [{ field, message }]`, which is folded into
 * the message because the core status classes carry nothing else.
 *
 * Transactional (`MailchimpTransactionalProtocol`) is JSON-RPC over POST:
 * every call carries the key in its body, and failures are
 *
 *     { "status": "error", "code": 401, "name": "Invalid_Key",
 *       "message": "Invalid API key" }
 *
 * under a real HTTP status, so they map by status too; `name` is kept in
 * the message (`Invalid_Key: Invalid API key`) because the core classes
 * carry nothing else. Which statuses each route declares comes from the
 * OpenAPI 3.1 document at convert time, so the operations are typed
 * per route.
 */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Layer from "effect/Layer";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as API from "@distilled.cloud/core/api";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type {
  API_ERRORS,
  ConfigError,
  DefaultErrors,
} from "@distilled.cloud/core/errors";
import {
  Credentials,
  TransactionalCredentials,
  type Config,
  type TransactionalConfig,
} from "./credentials.ts";
import {
  MailchimpApiError,
  MailchimpTransactionalError,
  UnknownMailchimpError,
} from "./errors.ts";

export type MailchimpOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | MailchimpApiError
  | UnknownMailchimpError
  | ConfigError
  | HttpClientError.HttpClientError;

export type MailchimpOpContext = Credentials | HttpClient.HttpClient;

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const str = (v: unknown): string | undefined =>
  typeof v === "string" && v !== "" ? v : undefined;

const fieldErrors = (body: Record<string, unknown>): string[] =>
  Array.isArray(body.errors)
    ? body.errors.flatMap((e) =>
        isRecord(e) && str(e.message)
          ? [str(e.field) ? `${e.field}: ${e.message}` : String(e.message)]
          : [],
      )
    : [];

const problemMessage = (body: unknown): string | undefined => {
  if (!isRecord(body)) return undefined;
  const head = str(body.detail) ?? str(body.title);
  if (head === undefined) return undefined;
  const fields = fieldErrors(body);
  return fields.length ? `${head} (${fields.join("; ")})` : head;
};

export const MailchimpProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    // Basic auth: Mailchimp ignores the username.
    headers: (creds) => ({
      Authorization: `Basic ${btoa(`anystring:${Redacted.value(creds.apiKey)}`)}`,
    }),
    errorEnvelope: (body) => {
      const message = problemMessage(body);
      return message === undefined ? undefined : { message };
    },
    unknownError: ({ status, message, body }) => {
      const problem = isRecord(body) ? body : undefined;
      const fields = {
        status,
        type: str(problem?.type),
        title: str(problem?.title),
        message,
        instance: str(problem?.instance),
        body,
      };
      return problemMessage(body) !== undefined
        ? new MailchimpApiError(fields)
        : new UnknownMailchimpError(fields);
    },
  });

// ───────────── Transactional ─────────────

/**
 * Only the always-possible failures. Each operation adds the classes its
 * declared statuses map to (`NotFound`, `PaymentRequired`, …), so a status
 * the document does not declare for a route still arrives as the shared
 * class at runtime, outside that route's type.
 */
export type MailchimpTransactionalOpError =
  | DefaultErrors
  | MailchimpTransactionalError
  | UnknownMailchimpError
  | ConfigError
  | HttpClientError.HttpClientError;

export type MailchimpTransactionalOpContext =
  | TransactionalCredentials
  | HttpClient.HttpClient;

const resolveTransactional = Effect.gen(function* () {
  const resolve = yield* TransactionalCredentials;
  return yield* resolve;
});

const transactionalFailure = (
  body: unknown,
): Record<string, unknown> | undefined =>
  isRecord(body) && body.status === "error" ? body : undefined;

const transactionalMessage = (
  failure: Record<string, unknown>,
): string | undefined => {
  const name = str(failure.name);
  const message = str(failure.message);
  return name !== undefined && message !== undefined
    ? `${name}: ${message}`
    : (name ?? message);
};

const TransactionalRest: Layer.Layer<API.Protocol> =
  makeRestProtocol<TransactionalConfig>({
    credentials: resolveTransactional,
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: () => ({}),
    errorEnvelope: (body) => {
      const failure = transactionalFailure(body);
      if (failure === undefined) return undefined;
      const message = transactionalMessage(failure);
      return message === undefined
        ? undefined
        : {
            message,
            code: typeof failure.code === "number" ? failure.code : undefined,
          };
    },
    unknownError: ({ status, code, message, body }) => {
      const failure = transactionalFailure(body);
      return failure !== undefined
        ? new MailchimpTransactionalError({
            status,
            code: typeof code === "number" ? code : undefined,
            name: str(failure.name),
            message,
            body,
          })
        : new UnknownMailchimpError({ status, message, body });
    },
  });

/**
 * The key rides in the JSON body, not a header. It is added to the input
 * here so the generated request shapes never carry it; `buildRequest` sends
 * members the schema does not know as body fields.
 */
export const MailchimpTransactionalProtocol: Layer.Layer<API.Protocol> =
  Layer.effect(
    API.Protocol,
    Effect.gen(function* () {
      const rest = yield* API.Protocol;
      return API.Protocol.of({
        encode: (args) =>
          Effect.gen(function* () {
            const creds = yield* resolveTransactional;
            return yield* rest.encode({
              ...args,
              input: {
                ...(isRecord(args.input) ? args.input : {}),
                key: creds.apiKey,
              },
            });
          }) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
        decode: rest.decode,
      });
    }),
  ).pipe(Layer.provide(TransactionalRest));
