import {
  InternalServerError,
  TooManyRequests,
  type InvalidInput,
} from "@distilled.cloud/core/errors";
import { setOwnKey } from "@distilled.cloud/core/plain-values";
import type {
  DeclaredError,
  DeclaredErrorClass,
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import {
  buildRequest,
  getAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  readBinaryResponse,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { SdkError } from "@distilled.cloud/core/sdk-error";
import { httpSymbol } from "@distilled.cloud/core/trait";
/**
 * ScalewayProtocol -- JSON over HTTPS, authenticated by `X-Auth-Token`.
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
 * `float_min`, ...), so `null` properties are dropped before decoding -- the
 * same thing the official SDKs' unmarshallers do (`null` -> `undefined`).
 * Instance v1 list endpoints answer their count as `X-Total-Count` rather
 * than in the body; it is folded into the body as `total_count`
 * (scaleway-sdk-js `fixLegacyTotalCount`). A non-JSON success body (Instance user data is
 * `text/plain`) is returned as text.
 *
 * Failures are `{ type, message, ... }`; see `errors.ts` for the `type`
 * dispatch. Its classes and core's status classes are the service's errors
 * (`ScalewayServiceErrors`): the protocol builds one only from the classes
 * the operation lists.
 */
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
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
import type { ScalewayErrors, ScalewayServiceError } from "./errors.ts";
import type { ScalewayHttpTrait } from "./traits.ts";

/**
 * What every generated Scaleway operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ScalewayOpError, ScalewayOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type ScalewayOpError = ScalewayServiceError | ErrorOf<typeof ScalewayProtocol>;

/** Context (requirements) shared by every generated Scaleway operation. */
export type ScalewayOpContext = Credentials | HttpClient.HttpClient;

const GENERATIVE_APIS_HOST = "https://api.scaleway.ai";

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const str = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);

const records = (value: unknown): Json[] => (Array.isArray(value) ? value.filter(isObject) : []);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** An error Scaleway's `type` envelope names: one of its classes, or core's `TooManyRequests`. */
type EnvelopeError = ScalewayErrors | TooManyRequests;

/**
 * Scaleway's typed error for a failure body, or undefined when its `type`
 * is not one the official SDKs recognise (the caller then falls back to the
 * HTTP status). Mirrors scaleway-sdk-js `parseScalewayError`, including the
 * two legacy envelopes Instance v1 still answers with. `build` makes the
 * error from its class and fields, and can answer `undefined` too.
 */
const envelopeError = <A>(
  build: <Props>(cls: new (props: Props) => EnvelopeError, props: Props) => A,
  body: unknown,
  message: string,
  headers: Record<string, string | undefined>,
  status: number,
): A | undefined => {
  if (!isObject(body) || typeof body.type !== "string") return undefined;
  const resource = str(body.resource);
  const resource_id = str(body.resource_id);
  switch (body.type) {
    case "invalid_arguments":
      return build(InvalidArgumentsError, {
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
      return build(DeniedAuthenticationError, {
        message,
        method: str(body.method),
        reason: str(body.reason),
        body,
      });
    case "permissions_denied":
      return build(PermissionsDeniedError, {
        message,
        details: records(body.details).flatMap((d) =>
          typeof d.resource === "string" && typeof d.action === "string"
            ? [{ resource: d.resource, action: d.action }]
            : [],
        ),
        body,
      });
    case "quotas_exceeded":
      return build(QuotasExceededError, {
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
      return build(ResourceNotFoundError, { message, resource, resource_id, body });
    case "expired":
      return build(ResourceExpiredError, {
        message,
        resource,
        resource_id,
        expired_since: str(body.expired_since),
        body,
      });
    case "locked":
      return build(ResourceLockedError, { message, resource, resource_id, body });
    case "transient_state":
      return build(TransientStateError, {
        message,
        resource,
        resource_id,
        current_state: str(body.current_state),
        body,
      });
    case "already_exists":
      return build(AlreadyExistsError, {
        message,
        resource,
        resource_id,
        help_message: str(body.help_message),
        body,
      });
    case "precondition_failed":
      return build(PreconditionFailedError, {
        message,
        precondition: str(body.precondition),
        help_message: str(body.help_message),
        body,
      });
    case "out_of_stock":
      return build(OutOfStockError, { message, resource, body });
    case "too_many_requests": {
      // `reset_seconds` is the server's own wait hint when no Retry-After
      // header came with it.
      const reset = typeof body.reset_seconds === "number" ? body.reset_seconds : undefined;
      return build(TooManyRequests, {
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
        return build(ResourceNotFoundError, {
          message,
          resource: parts[0]!.trim().toLowerCase().split(" ").join("_") || undefined,
          resource_id: parts[1],
          body,
        });
      }
      return status === 404 ? build(ResourceNotFoundError, { message, body }) : undefined;
    }
    case "invalid_request_error": {
      // Legacy Instance v1: quota failures and per-field validation messages.
      if ((str(body.message) ?? "").toLowerCase().includes("quota exceeded for this resource")) {
        return build(QuotasExceededError, {
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
      return details.length > 0
        ? build(InvalidArgumentsError, { message, details, body })
        : undefined;
    }
    default:
      return undefined;
  }
};

/**
 * Scaleway's typed error for a failure body, or undefined when its `type`
 * is not one the official SDKs recognise. See {@link envelopeError}.
 */
export const scalewayError = (
  body: unknown,
  message: string,
  headers: Record<string, string | undefined>,
  status: number,
): EnvelopeError | undefined =>
  envelopeError((cls, props) => new cls(props), body, message, headers, status);

/**
 * An instance of `cls`, a class of the service's errors, built from the
 * operation's own list: `undefined` when the operation does not list the
 * class (every generated operation lists `ScalewayServiceErrors`).
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

const httpTraitOf = (inputAst: AST.AST): ScalewayHttpTrait | SdkError => {
  const http = getAnn(inputAst, httpSymbol) as ScalewayHttpTrait | undefined;
  if (http === undefined || typeof http.baseUrl !== "string" || http.baseUrl === "") {
    return new SdkError({
      message: "Scaleway operation is missing T.Http({ baseUrl }) -- regenerate from convert",
    });
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
      // setOwnKey keeps a `__proto__` key a key instead of the prototype.
      if (v !== null) setOwnKey(out, k, stripNulls(v));
    }
    return out;
  }
  return value;
};

const isJsonContentType = (contentType: string | undefined): boolean =>
  contentType === undefined || contentType === "" || /[/+]json\b/i.test(contentType);

/**
 * The HTTP request for an operation input. Resolves credentials, fills the
 * default region / zone, picks the host and sets the auth headers; a `...Raw`
 * download also asks for the file itself with `dl=1`.
 */
export const encodeRequest = (
  input: unknown,
  inputAst: AST.AST,
  extraHeaders: Record<string, string> = {},
): Effect.Effect<HttpClientRequest.HttpClientRequest, InvalidInput | SdkError, Credentials> =>
  Effect.gen(function* () {
    const resolve = yield* Credentials;
    const creds = yield* resolve;
    const http = httpTraitOf(inputAst);
    if (http instanceof SdkError) return yield* http;
    const secretKey = Redacted.value(creds.secretKey);
    const request = yield* buildRequest({
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
  errorClasses: ReadonlyArray<DeclaredErrorClass> = [],
): DeclaredError | InternalServerError | UnknownScalewayError => {
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
  const scw = nonJson
    ? undefined
    : envelopeError(
        (cls, props) => declaredError(errorClasses, cls, props),
        json,
        message,
        headers,
        status,
      );
  if (scw !== undefined) return scw;

  // 3. The HTTP status: core's class for it, which the service declares.
  const StatusErrorClass = declaredStatusClass(status, errorClasses);
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

const scalewayProtocolMethods = {
  encode: ({ input, inputAst }: EncodeArgs) => encodeRequest(input, inputAst),
  decode: ({ response, outputAst, errors: errorClasses }: DecodeArgs) =>
    Effect.gen(function* () {
      const status = response.status;
      const headers = response.headers as Record<string, string | undefined>;

      // `...Raw` downloads: the body is the file.
      const binary =
        status >= 200 && status < 300 ? readBinaryResponse(response, outputAst) : undefined;
      if (binary !== undefined) return yield* binary;

      const text = (yield* response.text) ?? "";
      if (status >= 400) {
        return yield* Effect.fail(failureFor(status, text, headers, errorClasses));
      }

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

      // Strict mode checks the mapped body against the output schema, and
      // parse errors withhold a body that can hold a secret (core
      // `validateSuccess`).
      return yield* validateSuccess(
        outputAst,
        { value: mapKeys(outputAst, body, "decode"), body: nonJson ? text : json, nonJson },
        (info) => new ScalewayParseError(info),
      );
    }),
} satisfies Protocol<unknown, unknown>;

export const ScalewayProtocol: ProtocolOf<typeof scalewayProtocolMethods> = scalewayProtocolMethods;
