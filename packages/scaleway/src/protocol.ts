import * as API from "@distilled.cloud/core/api";
import {
  HTTP_STATUS_MAP,
  InternalServerError,
  TooManyRequests,
  type ConfigError,
} from "@distilled.cloud/core/errors";
import {
  buildRequest,
  getAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  binaryResponseSymbol,
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import { validateResponse } from "@distilled.cloud/core/response-validation";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { httpSymbol } from "@distilled.cloud/core/trait";
/**
 * ScalewayProtocol — JSON over HTTPS, authenticated by `X-Auth-Token`.
 *
 * Every Scaleway API lives under one host (`https://api.scaleway.com`,
 * overridable with `SCW_API_URL`) with the product and version in the path
 * (`/instance/v1/zones/{zone}/servers`); Generative APIs alone answer on
 * `https://api.scaleway.ai` and take the key as `Authorization: Bearer`.
 * The host is baked into each generated operation's `T.Http({ baseUrl })`.
 *
 * Requests: a `{region}` / `{zone}` path segment the caller leaves out is
 * filled from the credentials' default, as the official SDKs do with
 * `SCW_DEFAULT_REGION` / `SCW_DEFAULT_ZONE`. Arrays in the query string
 * repeat the key (`tags=a&tags=b`), which core's request builder already
 * does.
 *
 * Responses: success bodies are the payload, no envelope. Scaleway's
 * proto3 JSON writes every unset message or wrapper field as `null` where
 * the specs declare a plain optional member (`gpu_info`, `price_per_month`,
 * `float_min`, …), so `null` properties are dropped before decoding — the
 * same thing the official SDKs' unmarshallers do (`null` → `undefined`).
 * Instance v1 list endpoints answer their count as `X-Total-Count` rather
 * than in the body; it is folded into the body as `total_count`
 * (scaleway-sdk-js `fixLegacyTotalCount`). A non-JSON success body (Instance user data is
 * `text/plain`) is returned as text.
 *
 * Failures are `{ type, message, ... }`; see `errors.ts` for the `type`
 * dispatch.
 */
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { Credentials, DEFAULT_API_URL, type Config } from "./credentials.ts";
import {
  AlreadyExistsError,
  DeniedAuthenticationError,
  InvalidArgumentsError,
  OutOfStockError,
  PermissionsDeniedError,
  PreconditionFailedError,
  QuotasExceededError,
  ResourceExpiredError,
  ResourceLockedError,
  ResourceNotFoundError,
  ScalewayParseError,
  TransientStateError,
  UnknownScalewayError,
} from "./errors.ts";
import type { DefaultErrors } from "./errors.ts";
import type { ScalewayHttpTrait } from "./traits.ts";

/**
 * Error channel shared by every generated Scaleway operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * ScalewayOpError, ScalewayOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type ScalewayOpError = DefaultErrors | ConfigError | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Scaleway operation. */
export type ScalewayOpContext = Credentials | HttpClient.HttpClient;

const GENERATIVE_APIS_HOST = "https://api.scaleway.ai";

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const str = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);

const records = (value: unknown): Json[] => (Array.isArray(value) ? value.filter(isObject) : []);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Scaleway's typed error for a failure body, or undefined when its `type`
 * is not one the official SDKs recognise (the caller then falls back to the
 * HTTP status). Mirrors scaleway-sdk-js `parseScalewayError`, including the
 * two legacy envelopes Instance v1 still answers with.
 */
export const scalewayError = (
  body: unknown,
  message: string,
  headers: Record<string, string | undefined>,
  status: number,
): unknown => {
  if (!isObject(body) || typeof body.type !== "string") return undefined;
  const resource = str(body.resource);
  const resource_id = str(body.resource_id);
  switch (body.type) {
    case "invalid_arguments":
      return new InvalidArgumentsError({
        message,
        details: records(body.details).flatMap((d) =>
          typeof d.argument_name === "string" && typeof d.reason === "string"
            ? [
                {
                  argument_name: d.argument_name,
                  reason: d.reason,
                  help_message: str(d.help_message),
                },
              ]
            : [],
        ),
        body,
      });
    case "denied_authentication":
      return new DeniedAuthenticationError({
        message,
        method: str(body.method),
        reason: str(body.reason),
        body,
      });
    case "permissions_denied":
      return new PermissionsDeniedError({
        message,
        details: records(body.details).flatMap((d) =>
          typeof d.resource === "string" && typeof d.action === "string"
            ? [{ resource: d.resource, action: d.action }]
            : [],
        ),
        body,
      });
    case "quotas_exceeded":
      return new QuotasExceededError({
        message,
        details: records(body.details).flatMap((d) =>
          typeof d.resource === "string" &&
          typeof d.quota === "number" &&
          typeof d.current === "number"
            ? [{ resource: d.resource, quota: d.quota, current: d.current }]
            : [],
        ),
        body,
      });
    case "not_found":
      return new ResourceNotFoundError({ message, resource, resource_id, body });
    case "expired":
      return new ResourceExpiredError({
        message,
        resource,
        resource_id,
        expired_since: str(body.expired_since),
        body,
      });
    case "locked":
      return new ResourceLockedError({ message, resource, resource_id, body });
    case "transient_state":
      return new TransientStateError({
        message,
        resource,
        resource_id,
        current_state: str(body.current_state),
        body,
      });
    case "already_exists":
      return new AlreadyExistsError({
        message,
        resource,
        resource_id,
        help_message: str(body.help_message),
        body,
      });
    case "precondition_failed":
      return new PreconditionFailedError({
        message,
        precondition: str(body.precondition),
        help_message: str(body.help_message),
        body,
      });
    case "out_of_stock":
      return new OutOfStockError({ message, resource, body });
    case "too_many_requests": {
      // `reset_seconds` is the server's own wait hint when no Retry-After
      // header came with it.
      const reset = typeof body.reset_seconds === "number" ? body.reset_seconds : undefined;
      return new TooManyRequests({
        message,
        retryAfter:
          parseRetryAfterForStatus(429, headers) ??
          (reset !== undefined ? Duration.seconds(reset) : undefined),
      });
    }
    case "unknown_resource": {
      // Legacy Instance v1: `"<uuid>" not found` / `Security group '<uuid>' not found`.
      const parts = (str(body.message) ?? "").split(/["']/);
      if (parts.length === 3 && UUID.test(parts[1]!)) {
        return new ResourceNotFoundError({
          message,
          resource: parts[0]!.trim().toLowerCase().split(" ").join("_") || undefined,
          resource_id: parts[1],
          body,
        });
      }
      return status === 404 ? new ResourceNotFoundError({ message, body }) : undefined;
    }
    case "invalid_request_error": {
      // Legacy Instance v1: quota failures and per-field validation messages.
      if ((str(body.message) ?? "").toLowerCase().includes("quota exceeded for this resource")) {
        return new QuotasExceededError({
          message,
          details: [{ resource: resource ?? "", quota: 0, current: 0 }],
          body,
        });
      }
      const fields = isObject(body.fields) ? Object.entries(body.fields) : [];
      const details = fields.flatMap(([argument_name, messages]) =>
        (Array.isArray(messages) ? messages : [])
          .filter((m): m is string => typeof m === "string")
          .map((help_message) => ({ argument_name, reason: "constraint", help_message })),
      );
      return details.length > 0 ? new InvalidArgumentsError({ message, details, body }) : undefined;
    }
    default:
      return undefined;
  }
};

/**
 * Human-readable message for a failure body. Scaleway's `message` is often
 * generic (`"invalid argument(s)"`), so the per-argument `help_message`s
 * are appended when present.
 */
const failureMessage = (body: unknown, status: number, text: string): string => {
  if (!isObject(body)) return text.trim() !== "" ? text.trim() : `HTTP ${status}`;
  const base = str(body.message) ?? str(body.help_message) ?? str(body.type) ?? `HTTP ${status}`;
  const help = records(body.details)
    .map((d) =>
      typeof d.argument_name === "string"
        ? `${d.argument_name}: ${str(d.help_message) ?? str(d.reason) ?? "invalid"}`
        : undefined,
    )
    .filter((s): s is string => s !== undefined);
  return help.length > 0 ? `${base} (${help.join("; ")})` : base;
};

const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

const httpTraitOf = (inputAst: AST.AST): ScalewayHttpTrait => {
  const http = getAnn(inputAst, httpSymbol) as ScalewayHttpTrait | undefined;
  if (http === undefined || typeof http.baseUrl !== "string" || http.baseUrl === "") {
    throw new Error("Scaleway operation is missing T.Http({ baseUrl }) — regenerate from convert");
  }
  return http;
};

const baseUrlFor = (creds: Config, http: ScalewayHttpTrait): string =>
  http.baseUrl === DEFAULT_API_URL && creds.apiUrl !== undefined && creds.apiUrl !== ""
    ? creds.apiUrl.replace(/\/+$/, "")
    : http.baseUrl;

/** Fill `region` / `zone` the caller left out from the configured defaults. */
const withLocality = (input: unknown, uri: string, creds: Config): unknown => {
  const obj = isObject(input) ? input : {};
  const missing = (key: string) =>
    uri.includes(`{${key}}`) && (obj[key] === undefined || obj[key] === null || obj[key] === "");
  if (!missing("region") && !missing("zone")) return input;
  return {
    ...obj,
    ...(missing("region") ? { region: creds.region } : {}),
    ...(missing("zone") ? { zone: creds.zone } : {}),
  };
};

/** Drop `null` properties, recursively (array elements are kept). */
export const stripNulls = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripNulls);
  if (isObject(value)) {
    const out: Json = {};
    for (const [k, v] of Object.entries(value)) {
      if (v !== null) out[k] = stripNulls(v);
    }
    return out;
  }
  return value;
};

const isJsonContentType = (contentType: string | undefined): boolean =>
  contentType === undefined || contentType === "" || /[/+]json\b/i.test(contentType);

/**
 * The HTTP request for an operation input — shared by the protocol and the
 * streaming helpers (`streaming.ts`). Resolves credentials, fills the
 * default region / zone, picks the host and sets the auth headers; a `…Raw`
 * download also asks for the file itself with `dl=1`.
 */
export const encodeRequest = (
  input: unknown,
  inputAst: AST.AST,
  extraHeaders: Record<string, string> = {},
): Effect.Effect<HttpClientRequest.HttpClientRequest, never, Credentials> =>
  Effect.gen(function* () {
    const resolve = yield* Credentials;
    const creds = yield* resolve;
    const http = httpTraitOf(inputAst);
    const secretKey = Redacted.value(creds.secretKey);
    const request = buildRequest({
      input: withLocality(unwrapRedactedDeep(input), http.uri, creds),
      inputAst,
      baseUrl: baseUrlFor(creds, http),
      headers: {
        "X-Auth-Token": secretKey,
        ...(http.baseUrl === GENERATIVE_APIS_HOST ? { Authorization: `Bearer ${secretKey}` } : {}),
        ...extraHeaders,
      },
    });
    return http.rawDownload === true
      ? HttpClientRequest.appendUrlParam(request, "dl", "1")
      : request;
  });

/**
 * The typed error for a failed response: per-operation matchers (from
 * patches), then Scaleway's `type` envelope, then the HTTP status, then
 * {@link UnknownScalewayError}.
 */
export const failureFor = (
  status: number,
  text: string,
  headers: Record<string, string | undefined>,
  errorClasses: ReadonlyArray<unknown> = [],
): unknown => {
  let json: unknown;
  let nonJson = false;
  if (text.trim().length > 0) {
    try {
      json = JSON.parse(text);
    } catch {
      nonJson = true;
    }
  }
  const body = nonJson ? text : json;
  const message = failureMessage(json, status, text);

  // 1. Per-operation typed error (matcher metadata from patches).
  const typed = matchTypedError(errorClasses, status, [{ code: undefined, message }], {
    body,
    headers,
  });
  if (typed !== undefined) return typed;

  // 2. Scaleway's `type` envelope.
  const scw = nonJson ? undefined : scalewayError(json, message, headers, status);
  if (scw !== undefined) return scw;

  // 3. The HTTP status.
  const StatusErrorClass = (
    HTTP_STATUS_MAP as Record<
      number,
      (new (args: { message: string; retryAfter?: unknown }) => unknown) | undefined
    >
  )[status];
  if (StatusErrorClass) {
    return new StatusErrorClass({ message, retryAfter: parseRetryAfterForStatus(status, headers) });
  }
  if (status >= 500) {
    return new InternalServerError({
      message,
      retryAfter: parseRetryAfterForStatus(status, headers),
    });
  }

  // 4. Fallback.
  return new UnknownScalewayError({
    code: isObject(json) ? str(json.type) : undefined,
    message,
    body,
  });
};

export const ScalewayProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: ({ input, inputAst }: { readonly input: unknown; readonly inputAst: AST.AST }) =>
      encodeRequest(input, inputAst) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: ({
      response,
      outputAst,
      errors: errorClasses,
    }: {
      readonly response: HttpClientResponse.HttpClientResponse;
      readonly outputAst: AST.AST;
      readonly errors: ReadonlyArray<unknown>;
    }) =>
      Effect.gen(function* () {
        const status = response.status;
        const headers = response.headers as Record<string, string | undefined>;

        // `…Raw` downloads: the body is the file.
        if (
          status >= 200 &&
          status < 300 &&
          getAnn(outputAst, binaryResponseSymbol) !== undefined
        ) {
          return new Uint8Array(yield* response.arrayBuffer.pipe(Effect.orDie));
        }

        const text = (yield* response.text.pipe(Effect.orDie)) ?? "";
        if (process.env.DISTILLED_DEBUG_HTTP) {
          console.error(`[distilled] <- ${status} ${text.slice(0, 400)}`);
        }
        if (status >= 400) return yield* fail(failureFor(status, text, headers, errorClasses));

        // A success body is JSON only when it says so (user data is
        // `text/plain`).
        let json: unknown;
        let nonJson = false;
        if (text.trim().length > 0) {
          if (isJsonContentType(headers["content-type"])) {
            try {
              json = JSON.parse(text);
            } catch {
              nonJson = true;
            }
          } else {
            nonJson = true;
          }
        }

        let body: unknown = nonJson ? text : stripNulls(json ?? {});
        const totalCount = headers["x-total-count"];
        if (isObject(body) && !("total_count" in body) && totalCount !== undefined) {
          const n = Math.trunc(Number(totalCount));
          if (!Number.isNaN(n)) body = { ...body, total_count: n };
        }

        // Strict mode checks the mapped body against the output schema.
        const mapped = yield* validateResponse(
          outputAst,
          mapKeys(outputAst, body, "decode"),
          (cause) => new ScalewayParseError({ body: nonJson ? text : json, cause }),
        ).pipe(Effect.catch(fail));
        return wrapSensitive(outputAst, mapped);
      }),
  }),
);
