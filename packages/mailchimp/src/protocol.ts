import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
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
import * as Redacted from "effect/Redacted";
import {
  Credentials,
  TransactionalCredentials,
  type CredentialsError,
  type TransactionalCredentialsError,
} from "./credentials.ts";
import {
  MailchimpApiError,
  MailchimpParseError,
  MailchimpTransactionalError,
  UnknownMailchimpError,
  type MailchimpServiceError,
} from "./errors.ts";

/**
 * The errors declared on the Marketing protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match
 * its schema ({@link MailchimpParseError}), a failed response that neither
 * the operation nor the service declares ({@link MailchimpApiError} when it
 * is a problem document, {@link UnknownMailchimpError} when it is not), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type MailchimpProtocolError =
  | RestProtocolError
  | MailchimpParseError
  | MailchimpApiError
  | UnknownMailchimpError;

/**
 * What every generated Marketing operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, MailchimpOpError, MailchimpOpContext>`
 * explicitly.
 */
export type MailchimpOpError = MailchimpServiceError | MailchimpProtocolError | CredentialsError;

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

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const MailchimpProtocol: Protocol<MailchimpProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the calling fiber per request.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
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
 * The errors declared on the Transactional protocol: as
 * {@link MailchimpProtocolError}, with {@link MailchimpTransactionalError}
 * for a failed response in the Transactional envelope that neither the
 * operation nor the service declares.
 */
export type MailchimpTransactionalProtocolError =
  | RestProtocolError
  | MailchimpParseError
  | MailchimpTransactionalError
  | UnknownMailchimpError;

/**
 * What every generated Transactional operation fails with besides its own
 * errors (the classes its declared statuses map to: `NotFound`,
 * `PaymentRequired`, ...): the service's errors, the protocol's, and what
 * resolving the Transactional credentials fails with.
 */
export type MailchimpTransactionalOpError =
  | MailchimpServiceError
  | MailchimpTransactionalProtocolError
  | TransactionalCredentialsError;

export type MailchimpTransactionalOpContext = TransactionalCredentials | HttpClient.HttpClient;

const resolveTransactional = /*@__PURE__*/ Effect.flatten(TransactionalCredentials);

const transactionalFailure = (body: unknown): Record<string, unknown> | undefined =>
  isRecord(body) && body.status === "error" ? body : undefined;

const transactionalMessage = (failure: Record<string, unknown>): string | undefined => {
  const name = str(failure.name);
  const message = str(failure.message);
  return name !== undefined && message !== undefined ? `${name}: ${message}` : (name ?? message);
};

const TransactionalRest = /*@__PURE__*/ restProtocol({
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
// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const MailchimpTransactionalProtocol: Protocol<
  MailchimpTransactionalProtocolError | TransactionalCredentialsError,
  TransactionalCredentials
> = {
  encode: (args) =>
    Effect.gen(function* () {
      const creds = yield* resolveTransactional;
      return yield* TransactionalRest.encode({
        ...args,
        input: { ...(isRecord(args.input) ? args.input : {}), key: creds.apiKey },
      });
    }),
  decode: TransactionalRest.decode,
};
