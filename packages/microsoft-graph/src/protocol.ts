import * as API from "@distilled.cloud/core/api";
import {
  type ConfigError,
  HTTP_STATUS_MAP,
  InternalServerError,
  InvalidInput,
  type API_ERRORS,
} from "@distilled.cloud/core/errors";
import { buildRequest, mapKeys } from "@distilled.cloud/core/protocol-http";
import { unwrapRedactedDeep, validateSuccess } from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * MicrosoftGraphProtocol -- hand-written.
 *
 * Speaks Microsoft Graph's bearer-authenticated JSON REST protocol:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` + base URL
 *             (default https://graph.microsoft.com/v1.0), resolved from the
 *             calling fiber on every request. A paginated operation's
 *             `nextLink` input, when set, is the whole request URL: Graph's
 *             `@odata.nextLink` already carries the query (`$skiptoken`,
 *             `$filter`, `$select`, ...), so the other query members are
 *             dropped. The link must be on the base URL's origin; the token
 *             is never sent anywhere else.
 *
 *   response: 2xx JSON is the payload (no envelope; sensitive members
 *             delivered as `Redacted`); errors carry the OData envelope
 *             `{ error: { code, message, target, details } }` and are
 *             matched in this order:
 *               1. `GRAPH_ERROR_MESSAGE_MATCHERS` (generic code + message)
 *               2. a mapped `details[].code` (the specific cause behind a
 *                  generic `Request_BadRequest`)
 *               3. `GRAPH_ERROR_CODE_MAP` on `error.code`
 *               4. core `HTTP_STATUS_MAP` by status (Retry-After honored)
 *               5. unmapped 5xx -> retryable `InternalServerError`
 *               6. `UnknownMicrosoftGraphError` catch-all
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { Credentials, type Config, type CredentialsError } from "./credentials.ts";
import {
  GRAPH_ERROR_CODE_MAP,
  matchGraphErrorMessage,
  type MicrosoftGraphApiError,
  MicrosoftGraphParseError,
  UnknownMicrosoftGraphError,
} from "./errors.ts";

/**
 * Error channel shared by every generated Microsoft Graph operation.
 * Generated service files annotate operations with `API.OperationMethod<I,
 * O, MicrosoftGraphOpError, MicrosoftGraphOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics. Errors are
 * client-level: generated operations carry no per-op unions.
 */
export type MicrosoftGraphOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | MicrosoftGraphApiError
  | UnknownMicrosoftGraphError
  | MicrosoftGraphParseError
  | ConfigError
  | CredentialsError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Microsoft Graph operation. */
export type MicrosoftGraphOpContext = Credentials | HttpClient.HttpClient;

/** Input member a paginated operation reads its `@odata.nextLink` from. */
const NEXT_LINK = "nextLink";

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel),
// but Graph failures are real typed errors surfaced through
// MicrosoftGraphOpError. Fail with the instance and erase the type here;
// the generated operation annotations reintroduce it for callers.
const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

// ---------------------------------------------------------------------------
// Error-body parsing
// ---------------------------------------------------------------------------

interface GraphError {
  code?: string;
  message?: string;
  target?: string;
  details?: ReadonlyArray<{ code?: string; message?: string; target?: string }>;
}

const str = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);

/** Extract `{ code, message, target, details }` from the OData error envelope. */
const parseGraphError = (body: unknown): GraphError | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const outer = body as Record<string, unknown>;
  const inner =
    outer.error !== null && typeof outer.error === "object"
      ? (outer.error as Record<string, unknown>)
      : outer;
  const code = str(inner.code);
  const message = str(inner.message);
  if (code === undefined && message === undefined) return undefined;
  const details = Array.isArray(inner.details)
    ? inner.details.flatMap((d: unknown) => {
        if (d === null || typeof d !== "object") return [];
        const detail = d as Record<string, unknown>;
        return [
          { code: str(detail.code), message: str(detail.message), target: str(detail.target) },
        ];
      })
    : undefined;
  return { code, message, target: str(inner.target), details };
};

// ---------------------------------------------------------------------------
// Encode
// ---------------------------------------------------------------------------

/** Whether `link` is on the same origin as the configured base URL. */
const sameOrigin = (link: string, baseUrl: string): boolean => {
  try {
    return new URL(link).origin === new URL(baseUrl).origin;
  } catch {
    // Not a URL: not on the base URL's origin either.
    return false;
  }
};

// The protocol layer is memoized per process by `API.make`, so the build
// must not capture credentials -- `encode` resolves Credentials from the
// calling fiber's context on every request instead. Its error channel is
// erased at this boundary (Protocol effects carry none) and reintroduced for
// callers by the generated MicrosoftGraphOpError annotations.
const encode = ({ input, inputAst }: { readonly input: unknown; readonly inputAst: AST.AST }) =>
  Effect.gen(function* () {
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials as Effect.Effect<Config>;
    const raw = (input ?? {}) as Record<string, unknown>;
    const nextLink = typeof raw[NEXT_LINK] === "string" ? (raw[NEXT_LINK] as string) : undefined;
    const fields: Record<string, unknown> = { ...raw };
    delete fields[NEXT_LINK];
    const request = yield* buildRequest({
      input: unwrapRedactedDeep(fields),
      inputAst,
      baseUrl: creds.apiBaseUrl.replace(/\/+$/, ""),
      headers: {
        Authorization: `Bearer ${Redacted.value(creds.bearerToken)}`,
        Accept: "application/json",
      },
    });
    if (nextLink === undefined) return request;
    if (!sameOrigin(nextLink, creds.apiBaseUrl)) {
      return yield* fail(
        new InvalidInput({
          member: NEXT_LINK,
          message: `${NEXT_LINK} must be a page link on ${creds.apiBaseUrl}; the token is only sent there`,
        }),
      );
    }
    return HttpClientRequest.setUrl(request, nextLink);
  });

// ---------------------------------------------------------------------------
// Decode
// ---------------------------------------------------------------------------

const decode = ({
  response,
  outputAst,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
}) =>
  Effect.gen(function* () {
    // Read as text and parse tolerantly -- `$count` answers in text/plain and
    // gateway error pages are HTML.
    const text = (yield* response.text.pipe(Effect.catch(fail))) ?? "";
    let json: unknown;
    let nonJson = false;
    if (text.trim().length > 0) {
      try {
        json = JSON.parse(text);
      } catch {
        nonJson = true;
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    if (status >= 400) {
      const body = nonJson ? text : json;
      const graph = nonJson ? undefined : parseGraphError(json);
      const make = (Cls: new (props: any) => unknown, code?: string, message?: string) =>
        fail(new Cls({ code, message, target: graph?.target }));

      if (graph !== undefined) {
        // 1. Generic code + message.
        const ByMessage = matchGraphErrorMessage(graph);
        if (ByMessage) return yield* make(ByMessage, graph.code, graph.message);

        // 2. The specific cause behind a generic code.
        const detail = graph.details?.find(
          (d) => d.code !== undefined && GRAPH_ERROR_CODE_MAP[d.code] !== undefined,
        );
        if (detail !== undefined) {
          return yield* make(
            GRAPH_ERROR_CODE_MAP[detail.code!]!,
            detail.code,
            detail.message ?? graph.message,
          );
        }

        // 3. The error code.
        const ByCode = graph.code !== undefined ? GRAPH_ERROR_CODE_MAP[graph.code] : undefined;
        if (ByCode) return yield* make(ByCode, graph.code, graph.message);
      }

      // 4. Standard HTTP status errors (Retry-After honored on retryable
      //    statuses).
      const StatusErrorClass = HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
      if (StatusErrorClass) {
        return yield* fail(
          new StatusErrorClass({
            message: graph?.message ?? (nonJson && text.trim() ? text.trim() : ""),
            retryAfter: parseRetryAfterForStatus(status, headers),
          } as any),
        );
      }

      // 5. Unmapped 5xx -> retryable server error.
      if (status >= 500) {
        return yield* fail(
          new InternalServerError({
            message: graph?.message ?? `HTTP ${status}`,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 6. Unknown Graph error.
      return yield* fail(
        new UnknownMicrosoftGraphError({
          status,
          code: graph?.code,
          message: graph?.message,
          target: graph?.target,
          body,
        }),
      );
    }

    // 2xx: the response body IS the payload (Graph has no success envelope).
    // Wire->TS key mapping is schema-driven (`@odata.nextLink` ->
    // `odataNextLink`); strict mode (core/response-validation) checks the
    // mapped body against the output schema. Sensitive members (an
    // `addPassword` result's `secretText`) are delivered as `Redacted`.
    // Parse errors withhold a body that can hold a secret (core
    // `validateSuccess`).
    const body: unknown = nonJson ? text : json === undefined ? {} : json;
    return yield* validateSuccess(
      outputAst,
      { value: mapKeys(outputAst, body, "decode"), body: nonJson ? text : json, nonJson },
      (info) => new MicrosoftGraphParseError(info),
    ).pipe(Effect.catch(fail));
  });

export const MicrosoftGraphProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  /*@__PURE__*/ API.Protocol.of({
    // Erase encode's Credentials requirement (resolved on the calling
    // fiber; see the note above `encode`).
    encode: (args) => encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
