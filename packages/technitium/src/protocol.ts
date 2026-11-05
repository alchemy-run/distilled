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
 *
 * HTTP client errors keep the request they failed for. The protocol replaces it with one that
 * has only the method and URL, so neither the token nor a form body with a password can reach
 * a log or a crash report.
 */
import * as API from "@distilled.cloud/core/api";
import {
  type API_ERRORS,
  type ConfigError,
  Forbidden,
  HTTP_STATUS_MAP,
  InternalServerError,
  type InvalidInput,
  Unauthorized,
} from "@distilled.cloud/core/errors";
import { buildRequest, mapKeys, mapsVerbatim } from "@distilled.cloud/core/protocol-http";
import {
  hasSensitiveMember,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import * as Request from "effect/http/HttpClientRequest";
import * as Response from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { type Config, Credentials } from "./credentials.ts";
import {
  TechnitiumError,
  TechnitiumParseError,
  TwoFactorAuthRequired,
  UnknownTechnitiumError,
} from "./errors.ts";

/** Error channel shared by every generated Technitium operation. */
export type TechnitiumOpError =
  | TechnitiumError
  | TwoFactorAuthRequired
  | UnknownTechnitiumError
  | TechnitiumParseError
  | Unauthorized
  | Forbidden
  | InstanceType<(typeof API_ERRORS)[number]>
  | ConfigError
  | InvalidInput
  | HttpClientError.HttpClientError;

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

export type Envelope =
  | { readonly ok: true; readonly payload: unknown }
  | {
      readonly ok: false;
      readonly error:
        | TechnitiumError
        | TwoFactorAuthRequired
        | UnknownTechnitiumError
        | Unauthorized
        | Forbidden
        | InstanceType<(typeof API_ERRORS)[number]>;
    };

/**
 * Reads a response: the payload, or the error the call fails with. `withhold` replaces the body
 * in errors, for outputs with sensitive members.
 */
export function readEnvelope(httpStatus: number, body: string, withhold = false): Envelope {
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    json = undefined;
  }
  const kept = withhold ? "[REDACTED]" : (json ?? body);
  if (httpStatus < 200 || httpStatus >= 300) {
    const message = (record(json) && text(json.errorMessage)) || `HTTP ${httpStatus}`;
    const ErrorClass = STATUS_ERRORS.get(httpStatus);
    if (ErrorClass) return { ok: false, error: new ErrorClass({ message }) };
    if (httpStatus >= 500) return { ok: false, error: new InternalServerError({ message }) };
    return { ok: false, error: new UnknownTechnitiumError({ message, httpStatus, body: kept }) };
  }
  if (!record(json))
    return {
      ok: false,
      error: new UnknownTechnitiumError({
        message: "Response is not a JSON object",
        httpStatus,
        body: kept,
      }),
    };
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
      if (message === ACCESS_DENIED) return { ok: false, error: new Forbidden({ message }) };
      return {
        ok: false,
        error: new TechnitiumError({ message, innerMessage: text(json.innerErrorMessage) }),
      };
    case "invalid-token":
      return { ok: false, error: new Unauthorized({ message }) };
    case "2fa-required":
      return { ok: false, error: new TwoFactorAuthRequired({ message }) };
    default:
      return {
        ok: false,
        error: new UnknownTechnitiumError({
          message: `Unknown status ${JSON.stringify(json.status)}`,
          httpStatus,
          body: kept,
        }),
      };
  }
}

/**
 * Rebuilds an HTTP client error around a request with only the method and URL. The original
 * request carries the Authorization header and the form body, which can hold passwords.
 * Responses keep only their status and headers, because they hold the request too.
 */
export function withoutCredentials(
  error: HttpClientError.HttpClientError,
): HttpClientError.HttpClientError {
  const { reason } = error;
  const request = Request.make(reason.request.method)(reason.request.url);
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

/**
 * Core's `Protocol` erases the error channel: `encode` and `decode` return `Effect<A>`, and each
 * generated operation restores the type as `TechnitiumOpError`. Core's REST protocol bridges the
 * same way.
 */
const fail = (error: unknown): Effect.Effect<never> => Effect.fail(error) as Effect.Effect<never>;

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
  ).pipe(Effect.catch(fail));

const decode = (response: Response.HttpClientResponse, outputAst: AST.AST) =>
  Effect.flatMap(Effect.orDie(response.text), (body) => {
    const withhold = hasSensitiveMember(outputAst);
    const envelope = readEnvelope(response.status, body, withhold);
    if (!envelope.ok) return fail(envelope.error);
    const mapped = mapsVerbatim(outputAst, "decode")
      ? envelope.payload
      : mapKeys(outputAst, envelope.payload, "decode");
    return validateSuccess(
      outputAst,
      { value: mapped, body: envelope.payload, nonJson: false },
      (info) => new TechnitiumParseError(info),
    ).pipe(Effect.catch(fail));
  });

export const TechnitiumProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: ({ input, inputAst }) =>
      Effect.withFiber((fiber) => encode(fiber.context, input, inputAst)),
    decode: ({ response, outputAst }) => decode(response, outputAst),
    // Core's encode -> execute -> decode path, with credentials removed from client errors.
    // Core turns a failed body read into a defect, hence `catchDefect`.
    call: (operation, input) =>
      Effect.withFiber((fiber) =>
        Effect.flatMap(encode(fiber.context, input, operation.inputAst), (request) =>
          Context.getUnsafe(fiber.context, HttpClient.HttpClient)
            .execute(request)
            .pipe(
              Effect.catch((error) => fail(withoutCredentials(error))),
              Effect.flatMap((response) => decode(response, operation.outputAst)),
            ),
        ).pipe(
          Effect.catchDefect((defect) =>
            Effect.die(
              HttpClientError.isHttpClientError(defect) ? withoutCredentials(defect) : defect,
            ),
          ),
        ),
      ),
  }),
);
