import * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP, InternalServerError } from "@distilled.cloud/core/errors";
import {
  getAnn,
  getProps,
  mapKeys,
  mapsVerbatim,
  matchTypedError,
  nameOf,
} from "@distilled.cloud/core/protocol-http";
import { unwrapRedactedDeep, validateSuccess } from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { SdkError } from "@distilled.cloud/core/sdk-error";
import { headerSymbol } from "@distilled.cloud/core/trait";
/**
 * TencentCloudProtocol -- hand-written.
 *
 * Speaks Tencent Cloud API 3.0 (https://www.tencentcloud.com/document/api/213/33224):
 *
 *   request:  `POST https://<service>.tencentcloudapi.com/` with the input as
 *             the JSON body, `X-TC-Action` / `X-TC-Version` from the
 *             operation's `T.Action` trait, `X-TC-Timestamp`, `X-TC-Region`
 *             (the call's `region`, else the `Region` layer, else the
 *             credentials' region, else none), `X-TC-Token` for temporary
 *             credentials, and a TC3-HMAC-SHA256 `Authorization` (signer.ts).
 *
 *   response: `{ "Response": { ...output, "RequestId": "..." } }`, HTTP 200
 *             even for failures. The `Response` object is the output.
 *             `Response.Error` makes the call fail: a per-operation typed
 *             error first (patched matcher classes), then the common code's
 *             class (errors.ts), else UnknownTencentCloudError. A response
 *             without the envelope fails by HTTP status.
 */
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { Credentials, type Config } from "./credentials.ts";
import {
  type DefaultErrors,
  TencentCloudParseError,
  UnknownTencentCloudError,
  envelopeError,
} from "./errors.ts";
import { Region } from "./region.ts";
import { sign } from "./signer.ts";
import { actionSymbol, type ActionTrait } from "./traits.ts";

/**
 * Error channel shared by every generated Tencent Cloud operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * TencentCloudOpError, TencentCloudOpContext>` explicitly so the compiler
 * never infers these back out of the schema generics.
 */
export type TencentCloudOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | SdkError;

/** Context (requirements) shared by every generated Tencent Cloud operation. */
export type TencentCloudOpContext = Credentials | HttpClient.HttpClient;

/** The `Content-Type` every request sends, and signs. */
export const CONTENT_TYPE = "application/json; charset=utf-8";

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// failures are real typed errors that an operation re-surfaces via its error
// union. Fail with the instance and erase the error type here; `API.make`'s
// signature reintroduces it for callers.
const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

/** Per-input encode facts, read from the schema once. */
interface EncodePlan {
  readonly action: ActionTrait | undefined;
  /** Input members sent as headers (the `region` member): TS key -> lowercase header. */
  readonly headers: ReadonlyMap<string, string>;
  readonly verbatim: boolean;
}

const plans = /*@__PURE__*/ new WeakMap<AST.AST, EncodePlan>();
const planFor = (inputAst: AST.AST): EncodePlan => {
  let plan = plans.get(inputAst);
  if (plan === undefined) {
    const headers = new Map<string, string>();
    for (const prop of getProps(inputAst)) {
      if (getAnn(prop.type, headerSymbol) !== undefined) {
        headers.set(String(prop.name), nameOf(prop, headerSymbol).toLowerCase());
      }
    }
    plan = {
      action: getAnn(inputAst, actionSymbol) as ActionTrait | undefined,
      headers,
      verbatim: mapsVerbatim(inputAst, "encode"),
    };
    plans.set(inputAst, plan);
  }
  return plan;
};

// The protocol layer is memoized per process by `API.make`, so the build
// must not capture credentials -- `encode` resolves Credentials (and the
// optional Region) from the calling fiber's context on every request. Like
// the error channel above, the requirement is erased at this boundary and
// reintroduced for callers by the generated `TencentCloudOpContext`.
const encode = ({ input, inputAst }: { readonly input: unknown; readonly inputAst: AST.AST }) =>
  Effect.gen(function* () {
    const plan = planFor(inputAst);
    if (plan.action === undefined) {
      return yield* Effect.fail(
        new SdkError({ message: "the operation's input schema has no T.Action trait" }),
      );
    }
    const { service, version, action } = plan.action;
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials as Effect.Effect<Config>;

    const headers: Record<string, string> = {};
    const body: Record<string, unknown> = {};
    const value = unwrapRedactedDeep(input);
    for (const [key, member] of Object.entries(isRecord(value) ? value : {})) {
      if (member === undefined) continue;
      const header = plan.headers.get(key);
      if (header !== undefined) headers[header] = String(member);
      else body[key] = member;
    }
    if (headers["x-tc-region"] === undefined) {
      const layerRegion = yield* Effect.serviceOption(Region);
      const region = Option.getOrUndefined(layerRegion) ?? creds.region;
      if (region !== undefined && region !== "") headers["x-tc-region"] = region;
    }
    const payload = JSON.stringify(plan.verbatim ? body : mapKeys(inputAst, body, "encode"));

    const host = `${service}.${creds.rootDomain}`;
    const timestamp = Math.floor((yield* Clock.currentTimeMillis) / 1000);
    const { authorization } = yield* sign({
      secretId: creds.secretId,
      secretKey: creds.secretKey,
      service,
      host,
      action,
      timestamp,
      contentType: CONTENT_TYPE,
      payload,
    });

    headers.authorization = authorization;
    headers["x-tc-action"] = action;
    headers["x-tc-version"] = version;
    headers["x-tc-timestamp"] = String(timestamp);
    if (creds.sessionToken !== undefined) {
      headers["x-tc-token"] = Redacted.value(creds.sessionToken);
    }
    return HttpClientRequest.post(`https://${host}/`).pipe(
      HttpClientRequest.setHeaders(headers),
      HttpClientRequest.bodyText(payload, CONTENT_TYPE),
    );
  });

const decode = ({
  response,
  outputAst,
  errors: errorClasses,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
}) =>
  Effect.gen(function* () {
    const text = yield* response.text.pipe(Effect.catch(fail));
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    let json: unknown;
    let nonJson = false;
    if (text.trim().length > 0) {
      try {
        json = JSON.parse(text);
      } catch {
        // Not JSON: a proxy or gateway page. Handled below as a body
        // without the envelope.
        nonJson = true;
      }
    }
    const envelope = isRecord(json) && isRecord(json.Response) ? json.Response : undefined;

    const error = envelope !== undefined && isRecord(envelope.Error) ? envelope.Error : undefined;
    if (error !== undefined) {
      const code = typeof error.Code === "string" ? error.Code : "";
      const message = typeof error.Message === "string" ? error.Message : code;
      const requestId = typeof envelope!.RequestId === "string" ? envelope!.RequestId : undefined;
      const typed = matchTypedError(errorClasses, status, [{ message }], { body: json, headers });
      if (typed !== undefined) return yield* fail(typed);
      return yield* fail(envelopeError({ code, message, requestId }, status, json));
    }

    if (status < 200 || status >= 300) {
      const message = nonJson ? text.trim().slice(0, 500) : `HTTP ${status}`;
      const StatusErrorClass = HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
      if (StatusErrorClass !== undefined) {
        return yield* fail(
          new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          } as any),
        );
      }
      if (status >= 500) {
        return yield* fail(
          new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }
      return yield* fail(
        new UnknownTencentCloudError({ message, status, body: json ?? text.slice(0, 2000) }),
      );
    }

    if (envelope === undefined) {
      return yield* fail(
        new TencentCloudParseError({
          body: json ?? text.slice(0, 2000),
          cause: "The response has no `Response` envelope",
        }),
      );
    }

    // The envelope's members are the output's, `RequestId` included.
    // Strict mode checks the mapped value against the output schema; a
    // sensitive member comes back Redacted (core `validateSuccess`).
    return yield* validateSuccess(
      outputAst,
      {
        value: mapsVerbatim(outputAst, "decode")
          ? envelope
          : mapKeys(outputAst, envelope, "decode"),
        body: json,
        nonJson: false,
      },
      (info) => new TencentCloudParseError(info),
    ).pipe(Effect.catch(fail));
  });

export const TencentCloudProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  /*@__PURE__*/ API.Protocol.of({
    // Erase encode's Credentials and CryptoError channels (see comment above).
    encode: (args) => encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
