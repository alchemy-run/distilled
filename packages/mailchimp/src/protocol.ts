import * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * MailchimpProtocol -- hand-written.
 *
 * Plain JSON REST with no response envelope. Failures are RFC 7807 problem
 * documents:
 *
 *     { "type": "https://mailchimp.com/developer/marketing/docs/errors/",
 *       "title": "Resource Not Found", "status": 404,
 *       "detail": "The requested resource could not be found.",
 *       "instance": "995c5cb0-3280-4a6e-808b-3b096d0bb219" }
 *
 * A 400 from a write adds `errors: [{ field, message }]`, which is folded into
 * the message because the core status classes carry nothing else.
 *
 * MailchimpTransactionalProtocol is JSON over POST: every call carries the
 * key in its body, and failures are
 *
 *     { "status": "error", "code": 401, "name": "Invalid_Key",
 *       "message": "Invalid API key" }
 *
 * under a real HTTP status, so they map by status too; `name` is kept in the
 * message (`Invalid_Key: Invalid API key`).
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as Redacted from "effect/Redacted";
import { Credentials, TransactionalCredentials } from "./credentials.ts";
import {
  MailchimpApiError,
  MailchimpParseError,
  MailchimpTransactionalError,
  UnknownMailchimpError,
} from "./errors.ts";

export type MailchimpOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | MailchimpApiError
  | UnknownMailchimpError
  | MailchimpParseError
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

export type MailchimpOpContext = Credentials | HttpClient.HttpClient;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

const str = (v: unknown): string | undefined => (typeof v === "string" && v !== "" ? v : undefined);

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

const resolveCredentials = /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve);

export const MailchimpProtocol: API.ProtocolLayer<MailchimpOpError, MailchimpOpContext> =
  /*@__PURE__*/ makeRestProtocol({
    // Resolved on the calling fiber per request.
    credentials: resolveCredentials,
    baseUrl: (creds) => creds.apiBaseUrl,
    // Basic auth: Mailchimp ignores the username.
    headers: (creds) => ({
      Authorization: `Basic ${btoa(`anystring:${Redacted.value(creds.apiKey)}`)}`,
    }),
    errorEnvelope: (body) => {
      const message = problemMessage(body);
      return message === undefined ? undefined : { message };
    },
    unknownError: (info) => {
      const problem = isRecord(info.body) ? info.body : undefined;
      const fields = {
        ...unknownErrorProps(info),
        type: str(problem?.type),
        title: str(problem?.title),
        instance: str(problem?.instance),
      };
      return problemMessage(info.body) !== undefined
        ? new MailchimpApiError(fields)
        : new UnknownMailchimpError(fields);
    },
    parseError: ({ body, cause }) => new MailchimpParseError({ body, cause }),
  });

// ------------- Transactional -------------

/**
 * Every failure the protocol can build, including core's status classes for
 * any HTTP status. Each operation adds the classes its declared statuses map
 * to (`PaymentRequired`, ...).
 */
export type MailchimpTransactionalOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | MailchimpTransactionalError
  | UnknownMailchimpError
  | MailchimpParseError
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

export type MailchimpTransactionalOpContext = TransactionalCredentials | HttpClient.HttpClient;

const resolveTransactional = /*@__PURE__*/ Effect.flatMap(
  TransactionalCredentials,
  (resolve) => resolve,
);

const transactionalFailure = (body: unknown): Record<string, unknown> | undefined =>
  isRecord(body) && body.status === "error" ? body : undefined;

const transactionalMessage = (failure: Record<string, unknown>): string | undefined => {
  const name = str(failure.name);
  const message = str(failure.message);
  return name !== undefined && message !== undefined ? `${name}: ${message}` : (name ?? message);
};

const TransactionalRest: API.ProtocolLayer<
  MailchimpTransactionalOpError,
  MailchimpTransactionalOpContext
> = /*@__PURE__*/ makeRestProtocol({
  credentials: resolveTransactional,
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: () => ({}),
  errorEnvelope: (body) => {
    const failure = transactionalFailure(body);
    if (failure === undefined) return undefined;
    const message = transactionalMessage(failure);
    return message === undefined
      ? undefined
      : { message, code: typeof failure.code === "number" ? failure.code : undefined };
  },
  unknownError: ({ status, code, message, body, headers }) => {
    const failure = transactionalFailure(body);
    return failure !== undefined
      ? new MailchimpTransactionalError({
          status,
          code: typeof code === "number" ? code : undefined,
          name: str(failure.name),
          message,
          body,
        })
      : new UnknownMailchimpError(unknownErrorProps({ status, code, message, body, headers }));
  },
  parseError: ({ body, cause }) => new MailchimpParseError({ body, cause }),
});

/**
 * The key rides in the JSON body, not a header. It is added to the input
 * here so the generated request shapes never carry it; the REST encoder
 * sends members the schema does not know as body fields, and unwraps the
 * `Redacted` key on the way out.
 */
export const MailchimpTransactionalProtocol: API.ProtocolLayer<
  MailchimpTransactionalOpError,
  MailchimpTransactionalOpContext
> = /*@__PURE__*/ API.extendProtocol(TransactionalRest, (rest) => ({
  encode: (args: API.ProtocolEncodeArgs) =>
    Effect.gen(function* () {
      const creds = yield* resolveTransactional;
      return yield* rest.encode({
        ...args,
        input: { ...(isRecord(args.input) ? args.input : {}), key: creds.apiKey },
      });
    }),
  decode: rest.decode,
}));
