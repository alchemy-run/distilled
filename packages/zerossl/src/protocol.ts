/**
 * ZeroSslProtocol — hand-written.
 *
 * ZeroSSL's REST API is JSON at `https://api.zerossl.com` authenticated by
 * the account's access key in the `Authorization: ApiKey` header. Failures
 * arrive as `{ success: false, error: { code, type, info? } }`, usually with
 * HTTP 200, so the decoder inspects the envelope and matches `error.type`
 * against the operation's typed error classes before trusting the status.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";
import type * as AST from "effect/SchemaAST";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";
import {
  buildRequest,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import {
  HTTP_STATUS_MAP,
  InternalServerError,
  type ConfigError,
} from "@distilled.cloud/core/errors";
import {
  parseRetryAfter,
  parseRetryAfterForStatus,
} from "@distilled.cloud/core/retry-after";
import { Credentials, type Config } from "./credentials.ts";
import {
  UnknownZeroSslError,
  ZeroSslParseError,
  type DefaultErrors,
} from "./errors.ts";

export type ZeroSslOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

export type ZeroSslOpContext = Credentials | HttpClient.HttpClient;

const resolveCredentials = Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve as Effect.Effect<Config>;
});

const encode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    const creds = yield* resolveCredentials;
    return buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      headers: {
        Accept: "application/json",
        Authorization: `ApiKey ${Redacted.value(creds.accessKey)}`,
      },
    });
  });

interface ErrorEnvelope {
  readonly success?: boolean | number;
  readonly error?: {
    readonly code?: number;
    readonly type?: string;
    readonly info?: string;
  };
}

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
    const text = yield* response.text;
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;
    const json: unknown = yield* Effect.try({
      try: () => (text.trim().length > 0 ? JSON.parse(text) : {}),
      catch: () => parseError("Invalid JSON response"),
    }).pipe(
      Effect.catchTag("ZeroSslParseError", (error) =>
        status >= 400 ? Effect.succeed(undefined) : Effect.fail(error),
      ),
    );
    const envelope = (isObject(json) ? json : {}) as ErrorEnvelope;
    const failed =
      status >= 400 || envelope.success === false || envelope.success === 0;
    if (failed) {
      const type = envelope.error?.type;
      const message = envelope.error?.info ?? type ?? `HTTP ${status}`;
      // Matchers key on `error.type` (as `message`) and `error.code` (as `code`).
      const typed = matchTypedError(errorClasses, status, [
        { code: envelope.error?.code, message: type ?? message },
      ]);
      if (typed !== undefined) {
        if (
          typeof typed === "object" &&
          typed !== null &&
          Category.isThrottlingError(typed)
        ) {
          Object.assign(typed, { retryAfter: parseRetryAfter(headers) });
        }
        return yield* fail(typed);
      }
      const StatusClass = (HTTP_STATUS_MAP as Record<number, unknown>)[
        status
      ] as
        | (new (args: {
            message: string;
            retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
          }) => unknown)
        | undefined;
      if (status >= 400 && StatusClass) {
        return yield* fail(
          new StatusClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
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
        new UnknownZeroSslError({
          code: envelope.error?.code,
          type,
          message,
          body: Redacted.make(json ?? text),
        }),
      );
    }
    if (!isObject(json))
      return yield* fail(parseError("Expected a JSON object"));
    // The EAB documentation uses 1/0; the live API also returns true/false.
    const body =
      json.success === 1 || json.success === 0
        ? { ...json, success: json.success === 1 }
        : json;
    const output = yield* Schema.decodeUnknownEffect(
      Schema.make<Schema.Schema<unknown>>(outputAst),
    )(mapKeys(outputAst, body, "decode")).pipe(
      Effect.mapError(() =>
        parseError("Response does not match the output schema"),
      ),
    );
    return wrapSensitive(outputAst, output);
  });

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseError = (cause: string) =>
  new ZeroSslParseError({
    body: "[REDACTED]",
    cause,
  });

const fail = <E>(error: E) => Effect.fail(error) as Effect.Effect<never, E>;

export const ZeroSslProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: (args) => decode(args) as Effect.Effect<unknown>,
  }),
);
