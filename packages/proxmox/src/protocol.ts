/**
 * ProxmoxProtocol: core's REST protocol, adapted to the Proxmox VE API.
 *
 * - Requests authenticate with `Authorization: PVEAPIToken=<id>=<secret>`.
 * - Request bodies are `application/x-www-form-urlencoded` with flat keys:
 *   arrays repeat their key and booleans are `1`/`0`, in the query string
 *   too. Core's form encoding uses bracket notation, so the body is
 *   re-encoded here.
 * - Every response is `{ "data": ... }`; the payload is `data`.
 * - HTTP 400 with an `errors` object is a {@link ParameterValidationError},
 *   and HTTP 500 for a missing guest configuration is {@link GuestNotFound}.
 * - HTTP client errors lose the Authorization header (see
 *   {@link withoutCredentials}).
 */
import * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import * as Telemetry from "@distilled.cloud/core/telemetry";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import * as Request from "effect/http/HttpClientRequest";
import * as Response from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import {
  GuestNotFound,
  ParameterValidationError,
  ProxmoxParseError,
  UnknownProxmoxError,
  type DefaultErrors,
} from "./errors.ts";

/**
 * Error channel shared by every generated Proxmox operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * ProxmoxOpError, ProxmoxOpContext>` explicitly.
 */
export type ProxmoxOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput;

/** Context (requirements) shared by every generated Proxmox operation. */
export type ProxmoxOpContext = Credentials | HttpClient.HttpClient;

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const wireValue = (value: unknown): string => {
  if (typeof value === "boolean") return value ? "1" : "0";
  if (typeof value === "string" || typeof value === "number") return String(value);
  throw new Error("Form parameters must be scalar values or arrays of scalar values");
};

/** Repeated keys keep array elements apart without guessing a comma-separated encoding. */
export function formEncode(input: Record<string, unknown>): string {
  const form = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    for (const item of Array.isArray(value) ? value : [value]) form.append(key, wireValue(item));
  }
  return form.toString();
}

export const authHeaders = (config: Config) => ({
  Authorization: `PVEAPIToken=${Redacted.value(config.tokenId)}=${Redacted.value(config.tokenSecret)}`,
  Accept: "application/json",
});

/** The message Proxmox sends for a guest that does not exist. */
const GUEST_NOT_FOUND =
  /^Configuration file 'nodes\/[^/\r\n']+\/(?:lxc|qemu-server)\/[0-9]+\.conf' does not exist\n$/;

// Protocol effects carry no error channel; ProxmoxOpError restores it for callers.
const fail = (error: unknown): Effect.Effect<never> => Effect.fail(error) as Effect.Effect<never>;

/**
 * Rebuilds an HTTP client error without the Authorization header. Effect
 * redacts the header only through its own inspect hooks, and Node's crash
 * output bypasses them, so the request an error keeps would print the
 * token. A response keeps the request and the raw socket as well, so only
 * its status and headers are kept.
 */
export function withoutCredentials(
  error: HttpClientError.HttpClientError,
): HttpClientError.HttpClientError {
  const { reason } = error;
  const request = Request.removeHeader(reason.request, "authorization");
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

const redact = (error: unknown): unknown =>
  HttpClientError.isHttpClientError(error) ? withoutCredentials(error) : error;

const rest = /*@__PURE__*/ makeRestProtocol<Config>({
  credentials: Credentials,
  baseUrl: (config) => config.endpoint,
  headers: authHeaders,
  transformResponse: (body) => (isObject(body) && "data" in body ? body.data : body),
  unknownError: ({ status, message, body }) => new UnknownProxmoxError({ status, message, body }),
  parseError: ({ body, cause }) => new ProxmoxParseError({ body, cause }),
});

export const ProxmoxProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.effect(
  API.Protocol,
  Effect.gen(function* () {
    const base = yield* API.Protocol;
    const encode: API.ProtocolShape["encode"] = (args) =>
      Effect.map(base.encode(args), (request) => {
        // Core puts query parameters in the URL as `true`/`false`. Rewrite
        // actual booleans only, never strings that happen to read "true".
        const url = new URL(request.url);
        if (isObject(args.input)) {
          for (const [key, value] of Object.entries(args.input)) {
            if (typeof value === "boolean" && url.searchParams.has(key))
              url.searchParams.set(key, value ? "1" : "0");
          }
        }
        const encoded = Request.setUrl(request, url.href);
        if (request.body._tag !== "Uint8Array" || request.body.contentType !== "application/json")
          return encoded;
        const body: unknown = JSON.parse(new TextDecoder().decode(request.body.body));
        if (!isObject(body)) throw new Error("Expected a JSON object body");
        return Request.bodyText(encoded, formEncode(body), "application/x-www-form-urlencoded");
      });
    const decode: API.ProtocolShape["decode"] = (args) =>
      Effect.gen(function* () {
        const { status } = args.response;
        if (status === 400 || status === 500) {
          const body = yield* args.response.json.pipe(Effect.orElseSucceed(() => undefined));
          if (
            status === 500 &&
            isObject(body) &&
            body.data === null &&
            typeof body.message === "string" &&
            GUEST_NOT_FOUND.test(body.message)
          ) {
            return yield* fail(new GuestNotFound({ message: body.message }));
          }
          if (status === 400 && isObject(body) && isObject(body.errors)) {
            const errors = Object.fromEntries(
              Object.entries(body.errors).filter(
                (entry): entry is [string, string] => typeof entry[1] === "string",
              ),
            );
            return yield* fail(
              new ParameterValidationError({
                message:
                  typeof body.message === "string" ? body.message : "Parameter verification failed",
                errors,
              }),
            );
          }
        }
        return yield* base.decode(args);
      });
    // Core's encode -> execute -> decode path through its telemetry, with the
    // token removed from HTTP client errors. Like core's own `call`, it reads
    // the HttpClient from the calling fiber.
    const call: NonNullable<API.ProtocolShape["call"]> = (operation, input) =>
      Effect.withFiber((fiber) => {
        const context = fiber.context as Context.Context<unknown>;
        const client = Context.getUnsafe(context, HttpClient.HttpClient);
        const { inputAst, outputAst, errors, config } = operation;
        return encode({ input, inputAst, config }).pipe(
          Effect.flatMap((request) => Telemetry.execute(context, client, request)),
          Effect.flatMap((response) => decode({ response, outputAst, errors, config })),
          Effect.mapError(redact),
        ) as Effect.Effect<unknown>;
      });
    return API.Protocol.of({ encode, decode, call });
  }).pipe(Effect.provide(rest)),
);
