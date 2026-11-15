import * as API from "@distilled.cloud/core/api";
import {
  HTTP_STATUS_MAP,
  InternalServerError,
  type ConfigError,
  type Conflict,
  type InvalidInput,
  type Locked,
  type UnprocessableEntity,
} from "@distilled.cloud/core/errors";
import { buildRequest, mapKeys, matchTypedError } from "@distilled.cloud/core/protocol-http";
import {
  hasSensitiveMember,
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
/**
 * ZeroSslProtocol -- hand-written.
 *
 * ZeroSSL's REST API is JSON at `https://api.zerossl.com` authenticated by
 * the account's access key in the `Authorization: ApiKey` header. Failures
 * arrive as `{ success: false, error: { code, type, info? } }`, usually with
 * HTTP 200, so the decoder inspects the envelope and matches `error.type`
 * against the operation's typed error classes before trusting the status.
 */
import {
  failUnlessLenient,
  isValidating,
  validateResponse,
} from "@distilled.cloud/core/response-validation";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { Credentials } from "./credentials.ts";
import { UnknownZeroSslError, ZeroSslParseError, type DefaultErrors } from "./errors.ts";

export type ZeroSslOpError =
  | DefaultErrors
  // Core's status map, for a non-2xx answer no typed class matches.
  | Conflict
  | UnprocessableEntity
  | Locked
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

export type ZeroSslOpContext = Credentials | HttpClient.HttpClient;

const resolveCredentials = /*@__PURE__*/ Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

const encode = ({ input, inputAst }: { readonly input: unknown; readonly inputAst: AST.AST }) =>
  Effect.gen(function* () {
    const creds = yield* resolveCredentials;
    return yield* buildRequest({
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
  readonly errors: ReadonlyArray<API.DeclaredErrorClass>;
}) =>
  Effect.gen(function* () {
    const text = yield* response.text;
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;
    const json: unknown = yield* Effect.try({
      try: () => (text.trim().length > 0 ? JSON.parse(text) : {}),
      catch: () => parseError("Invalid JSON response"),
    }).pipe(
      // A non-JSON 2xx fails unless lenient, and in every mode for an output
      // with sensitive members; otherwise lenient returns the text.
      Effect.catchTag("ZeroSslParseError", (error) =>
        status >= 400
          ? Effect.succeed(undefined)
          : hasSensitiveMember(outputAst)
            ? Effect.fail(error)
            : failUnlessLenient<unknown, typeof error>(error, text),
      ),
    );
    const envelope = (isObject(json) ? json : {}) as ErrorEnvelope;
    const failed = status >= 400 || envelope.success === false || envelope.success === 0;
    if (failed) {
      const type = envelope.error?.type;
      const message = envelope.error?.info ?? type ?? `HTTP ${status}`;
      // Matchers key on `error.type` (as `message`) and `error.code` (as `code`).
      const typed = matchTypedError(
        errorClasses,
        status,
        [{ code: envelope.error?.code, message: type ?? message }],
        { body: json === undefined ? text : json, headers },
      );
      if (typed !== undefined) return yield* Effect.fail(typed);
      const StatusClass = statusMap[status];
      if (status >= 400 && StatusClass) {
        return yield* Effect.fail(
          new StatusClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }
      if (status >= 500) {
        return yield* Effect.fail(
          new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }
      return yield* Effect.fail(
        new UnknownZeroSslError({
          status,
          code: envelope.error?.code,
          type,
          message,
          body: Redacted.make(json ?? text),
        }),
      );
    }
    if (!isObject(json)) {
      // Lenient mode returns a non-object body as read.
      if (!(yield* isValidating)) return json;
      return yield* Effect.fail(parseError("Expected a JSON object"));
    }
    // The EAB documentation uses 1/0; the live API also returns true/false.
    const body =
      json.success === 1 || json.success === 0 ? { ...json, success: json.success === 1 } : json;
    // Validating modes (core/response-validation) check the output schema.
    const output = yield* validateResponse(outputAst, mapKeys(outputAst, body, "decode"), () =>
      parseError("Response does not match the output schema"),
    );
    return wrapSensitive(outputAst, output);
  });

// A numeric view of core's status map; every class takes `{ message, retryAfter? }`.
const statusMap: Readonly<
  Record<
    number,
    | (new (args: {
        message: string;
        retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
      }) => InstanceType<(typeof HTTP_STATUS_MAP)[keyof typeof HTTP_STATUS_MAP]>)
    | undefined
  >
> = HTTP_STATUS_MAP;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseError = (cause: string) =>
  new ZeroSslParseError({
    body: "[REDACTED]",
    cause,
  });

export const ZeroSslProtocol: API.ProtocolLayer<ZeroSslOpError, ZeroSslOpContext> =
  /*@__PURE__*/ API.makeProtocol({ encode, decode });
