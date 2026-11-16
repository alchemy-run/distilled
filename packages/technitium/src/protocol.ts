/**
 * TechnitiumProtocol -- hand-written.
 *
 *   request:  POST with a form-encoded body (core's `buildRequest`, driven by the generated
 *             `T.Http({ contentType: "form-urlencoded" })`), `Authorization: Bearer <token>` and
 *             the origin from the credentials, resolved on the calling fiber for every request.
 *   response: a JSON envelope. `status` decides the outcome even though the HTTP status is 200
 *             for failures too (see `errors.ts`). The payload is the `response` member, or, for
 *             the few calls without one (`user/login`, `user/createToken`, ...), the envelope
 *             without its `status` and `server` members. Then core's key mapping, response
 *             validation and `Redacted` wrapping of sensitive members, as in core's REST protocol.
 *             The classes a failure maps to are the service's errors (`TechnitiumServiceErrors`):
 *             the protocol builds one only from the classes the operation lists.
 *
 * HTTP client errors keep the request they failed for. The protocol replaces it with one that
 * has only the method and URL, so neither the token nor a form body with a password can reach
 * a log or a crash report.
 */
import {
  Forbidden,
  HTTP_STATUS_MAP,
  InternalServerError,
  type InvalidInput,
  Unauthorized,
} from "@distilled.cloud/core/errors";
import type {
  DeclaredError,
  DeclaredErrorClass,
  Operation,
  Protocol,
} from "@distilled.cloud/core/protocol";
import { buildRequest, mapKeys, mapsVerbatim } from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  hasSensitiveMember,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import * as Send from "@distilled.cloud/core/send";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Headers from "effect/http/Headers";
import * as HttpBody from "effect/http/HttpBody";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import * as Request from "effect/http/HttpClientRequest";
import * as Response from "effect/http/HttpClientResponse";
import * as UrlParams from "effect/http/UrlParams";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { type Config, Credentials, type CredentialsError } from "./credentials.ts";
import {
  TechnitiumError,
  TechnitiumParseError,
  type TechnitiumServiceError,
  TwoFactorAuthRequired,
  UnknownTechnitiumError,
} from "./errors.ts";

/**
 * The errors declared on Technitium's protocol: what the code that builds requests and reads
 * responses fails with. A response that does not match its schema ({@link TechnitiumParseError}),
 * a response the protocol cannot interpret or a failure that neither the operation nor the
 * service declares ({@link UnknownTechnitiumError}, and `InternalServerError` for a 5xx), a bad
 * path label (`InvalidInput`), a request that can't be built (`SdkError`), and the transport or
 * a body read (`HttpClientError`, without the credentials).
 */
export type TechnitiumProtocolError =
  | TechnitiumParseError
  | UnknownTechnitiumError
  | InternalServerError
  | InvalidInput
  | SdkError
  | HttpClientError.HttpClientError;

/**
 * What every generated Technitium operation fails with besides its own errors: the service's
 * errors, the protocol's, and what resolving the credentials fails with.
 */
export type TechnitiumOpError = TechnitiumServiceError | TechnitiumProtocolError | CredentialsError;

/** Requirements shared by every generated Technitium operation. */
export type TechnitiumOpContext = Credentials | HttpClient.HttpClient;

/** Members of the envelope around a payload. */
const ENVELOPE = new Set(["status", "server", "errorMessage", "stackTrace", "innerErrorMessage"]);
/** Core's error classes by HTTP status, for non-2xx responses from proxies in front of the server. */
const STATUS_ERRORS = new Map(
  Object.entries(HTTP_STATUS_MAP).map(([status, type]) => [Number(status), type]),
);
/** The message every handler uses for a missing permission. */
const ACCESS_DENIED = "Access was denied.";

const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const text = (value: unknown) => (typeof value === "string" ? value : undefined);

/** A response as the protocol reads it: the payload, or the error the call fails with. */
type EnvelopeOf<Failure> =
  | { readonly ok: true; readonly payload: unknown }
  | {
      readonly ok: false;
      readonly error: Failure | InternalServerError | UnknownTechnitiumError;
    };

export type Envelope = EnvelopeOf<TechnitiumServiceError>;

/**
 * Reads a response: the payload, or the error the call fails with. `withhold` replaces the body
 * in errors, for outputs with sensitive members. A class of the service's errors is built by
 * `build` from its class and fields, and by `statusClass` for an HTTP status; either can answer
 * `undefined`, and the failure is then an {@link UnknownTechnitiumError} (or an
 * `InternalServerError` for a 5xx).
 */
function readEnvelopeWith<Failure>(
  build: <Props>(
    cls: new (props: Props) => TechnitiumServiceError,
    props: Props,
  ) => Failure | undefined,
  statusClass: (
    httpStatus: number,
  ) => (new (props: { readonly message: string }) => Failure) | undefined,
  httpStatus: number,
  body: string,
  withhold: boolean,
): EnvelopeOf<Failure> {
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    json = undefined;
  }
  const kept = withhold ? "[REDACTED]" : (json ?? body);
  const unknownError = (message: string): EnvelopeOf<Failure> => ({
    ok: false,
    error: new UnknownTechnitiumError({ message, httpStatus, body: kept }),
  });
  /** The failure `build` made, or the unknown error when the operation does not list its class. */
  const failed = (error: Failure | undefined, message: string): EnvelopeOf<Failure> =>
    error === undefined ? unknownError(message) : { ok: false, error };
  if (httpStatus < 200 || httpStatus >= 300) {
    const message = (record(json) && text(json.errorMessage)) || `HTTP ${httpStatus}`;
    const ErrorClass = statusClass(httpStatus);
    if (ErrorClass) return { ok: false, error: new ErrorClass({ message }) };
    if (httpStatus >= 500) return { ok: false, error: new InternalServerError({ message }) };
    return unknownError(message);
  }
  if (!record(json)) return unknownError("Response is not a JSON object");
  const message = text(json.errorMessage) ?? "";
  switch (json.status) {
    case "ok":
      return {
        ok: true,
        payload:
          "response" in json
            ? json.response
            : Object.fromEntries(Object.entries(json).filter(([key]) => !ENVELOPE.has(key))),
      };
    case "error":
      if (message === ACCESS_DENIED) return failed(build(Forbidden, { message }), message);
      return failed(
        build(TechnitiumError, { message, innerMessage: text(json.innerErrorMessage) }),
        message,
      );
    case "invalid-token":
      return failed(build(Unauthorized, { message }), message);
    case "2fa-required":
      return failed(build(TwoFactorAuthRequired, { message }), message);
    default:
      return unknownError(`Unknown status ${JSON.stringify(json.status)}`);
  }
}

/**
 * Reads a response: the payload, or the error the call fails with. `withhold` replaces the body
 * in errors, for outputs with sensitive members.
 */
export function readEnvelope(httpStatus: number, body: string, withhold = false): Envelope {
  return readEnvelopeWith(
    (cls, props) => new cls(props),
    (status) => STATUS_ERRORS.get(status),
    httpStatus,
    body,
    withhold,
  );
}

/**
 * An instance of `cls`, a class of the service's errors, built from the operation's own list:
 * `undefined` when the operation does not list the class (every generated operation lists
 * `TechnitiumServiceErrors`).
 */
const declaredError = <Props>(
  errors: ReadonlyArray<DeclaredErrorClass>,
  cls: new (props: Props) => unknown,
  props: Props,
): DeclaredError | undefined => {
  const known: unknown = cls;
  const Declared = errors.find((declared) => declared === known);
  return Declared === undefined ? undefined : new Declared(props);
};

/**
 * Rebuilds an HTTP client error around a request with only the method and URL. The original
 * request carries the Authorization header and the form body, which can hold passwords.
 * Responses keep only their status and headers, because they hold the request too.
 */
export function withoutCredentials(
  error: HttpClientError.HttpClientError,
): HttpClientError.HttpClientError {
  const { reason } = error;
  const request = Request.makeWith(
    reason.request.method,
    reason.request.url,
    UrlParams.empty,
    Option.none(),
    Headers.empty,
    HttpBody.empty,
  );
  const fields = { request, cause: reason.cause, description: reason.description };
  const statusOnly = (response: Response.HttpClientResponse) =>
    Response.fromWeb(
      request,
      new globalThis.Response(null, { status: response.status, headers: response.headers }),
    );
  const rebuilt = (): HttpClientError.HttpClientErrorReason => {
    switch (reason._tag) {
      case "TransportError":
        return new HttpClientError.TransportError(fields);
      case "EncodeError":
        return new HttpClientError.EncodeError(fields);
      case "InvalidUrlError":
        return new HttpClientError.InvalidUrlError(fields);
      case "StatusCodeError":
        return new HttpClientError.StatusCodeError({
          ...fields,
          response: statusOnly(reason.response),
        });
      case "DecodeError":
        return new HttpClientError.DecodeError({
          ...fields,
          response: statusOnly(reason.response),
        });
      case "EmptyBodyError":
        return new HttpClientError.EmptyBodyError({
          ...fields,
          response: statusOnly(reason.response),
        });
    }
  };
  return new HttpClientError.HttpClientError({ reason: rebuilt() });
}

const encode = (context: Context.Context<never>, input: unknown, inputAst: AST.AST) =>
  Effect.flatMap(Context.getUnsafe(context, Credentials), (config: Config) =>
    buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: config.apiUrl,
      headers: {
        Authorization: `Bearer ${Redacted.value(config.apiToken)}`,
        Accept: "application/json",
      },
    }),
  );

const decode = (
  response: Response.HttpClientResponse,
  outputAst: AST.AST,
  errors: ReadonlyArray<DeclaredErrorClass>,
) =>
  // A body read that fails (a reset mid-body) fails the call with its client error.
  Effect.flatMap(
    Effect.catch(response.text, (error) => Effect.fail(withoutCredentials(error))),
    (
      body,
    ): Effect.Effect<
      unknown,
      DeclaredError | InternalServerError | UnknownTechnitiumError | TechnitiumParseError
    > => {
      const withhold = hasSensitiveMember(outputAst);
      const envelope = readEnvelopeWith(
        (cls, props) => declaredError(errors, cls, props),
        (status) => declaredStatusClass(status, errors),
        response.status,
        body,
        withhold,
      );
      if (!envelope.ok) return Effect.fail(envelope.error);
      const mapped = mapsVerbatim(outputAst, "decode")
        ? envelope.payload
        : mapKeys(outputAst, envelope.payload, "decode");
      return validateSuccess(
        outputAst,
        { value: mapped, body: envelope.payload, nonJson: false },
        (info) => new TechnitiumParseError(info),
      );
    },
  );

// The annotation is the check: everything the protocol fails with, besides the errors an
// operation and the service declare, must be listed here.
export const TechnitiumProtocol: Protocol<TechnitiumProtocolError | CredentialsError, Credentials> =
  {
    encode: ({ input, inputAst }) =>
      Effect.withFiber((fiber) => encode(fiber.context, input, inputAst)),
    decode: ({ response, outputAst, errors }) => decode(response, outputAst, errors),
    // Core's encode -> execute -> decode path (with its telemetry), with credentials removed
    // from client errors.
    call: (operation: Operation, input) =>
      Effect.withFiber((fiber) => {
        const context = fiber.context as Context.Context<any>;
        return Effect.flatMap(encode(context, input, operation.inputAst), (request) =>
          Send.send(context, Context.getUnsafe(context, HttpClient.HttpClient), request).pipe(
            Effect.catch((error) => Effect.fail(withoutCredentials(error))),
            Effect.flatMap((response) => decode(response, operation.outputAst, operation.errors)),
          ),
        );
      }),
  };
