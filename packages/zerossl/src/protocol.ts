import { InternalServerError } from "@distilled.cloud/core/errors";
import type {
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import { buildRequest, mapKeys, matchTypedError } from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
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
 * against the operation's typed error classes before trusting the status
 * (core's class for it, which the service declares: `ZeroSslServiceErrors`).
 */
import {
  failUnlessLenient,
  isValidating,
  validateResponse,
} from "@distilled.cloud/core/response-validation";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownZeroSslError, ZeroSslParseError, type ZeroSslServiceError } from "./errors.ts";

/**
 * What every generated ZeroSSL operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with.
 */
export type ZeroSslOpError = ZeroSslServiceError | ErrorOf<typeof ZeroSslProtocol>;

export type ZeroSslOpContext = Credentials | HttpClient.HttpClient;

const resolveCredentials = /*@__PURE__*/ Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

const encode = ({ input, inputAst }: EncodeArgs) =>
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

const decode = ({ response, outputAst, errors: errorClasses }: DecodeArgs) =>
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
      const StatusClass = declaredStatusClass(status, errorClasses);
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

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseError = (cause: string) =>
  new ZeroSslParseError({
    body: "[REDACTED]",
    cause,
  });

const zeroSslProtocolMethods = {
  encode,
  decode,
} satisfies Protocol<unknown, unknown>;

export const ZeroSslProtocol: ProtocolOf<typeof zeroSslProtocolMethods> = zeroSslProtocolMethods;
