import { InternalServerError, InvalidInput } from "@distilled.cloud/core/errors";
import type {
  DeclaredErrorClass,
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import { buildRequest, mapKeys } from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
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
 *               4. core's class for the status (Retry-After honored)
 *               5. any other 5xx -> retryable `InternalServerError`
 *               6. `UnknownMicrosoftGraphError` catch-all
 *             The classes of steps 1 to 4 are the service's errors
 *             (`MicrosoftGraphServiceErrors`): the protocol builds one only
 *             from the classes the operation lists.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  GRAPH_ERROR_CODE_MAP,
  matchGraphErrorMessage,
  MicrosoftGraphParseError,
  type MicrosoftGraphServiceError,
  UnknownMicrosoftGraphError,
} from "./errors.ts";

/**
 * What every generated Microsoft Graph operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, MicrosoftGraphOpError,
 * MicrosoftGraphOpContext>` explicitly so the compiler never infers these
 * back out of the schema generics.
 */
export type MicrosoftGraphOpError =
  | MicrosoftGraphServiceError
  | ErrorOf<typeof MicrosoftGraphProtocol>;

/** Context (requirements) shared by every generated Microsoft Graph operation. */
export type MicrosoftGraphOpContext = Credentials | HttpClient.HttpClient;

/** Input member a paginated operation reads its `@odata.nextLink` from. */
const NEXT_LINK = "nextLink";

/**
 * The class a Graph error code maps to. Only the map's own keys count: a
 * code named like a member of `Object.prototype` (`constructor`, `toString`)
 * maps to nothing.
 */
const classForCode = (code: string | undefined) =>
  code !== undefined && Object.hasOwn(GRAPH_ERROR_CODE_MAP, code)
    ? GRAPH_ERROR_CODE_MAP[code]
    : undefined;

/**
 * `cls`, a class of the service's errors, as the operation declares it:
 * `undefined` when `cls` is `undefined` or the operation does not list it
 * (every generated operation lists `MicrosoftGraphServiceErrors`).
 */
const declaredClass = (
  errors: ReadonlyArray<DeclaredErrorClass>,
  cls: (new (props: any) => unknown) | undefined,
): DeclaredErrorClass | undefined => {
  const known: unknown = cls;
  return known === undefined ? undefined : errors.find((declared) => declared === known);
};

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

// The protocol is one module-level value shared by every operation, so it
// must not capture credentials -- `encode` resolves Credentials from the
// calling fiber's context on every request.
const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials;
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
      return yield* Effect.fail(
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

const decode = ({ response, outputAst, errors }: DecodeArgs) =>
  Effect.gen(function* () {
    // Read as text and parse tolerantly -- `$count` answers in text/plain and
    // gateway error pages are HTML. A body read that fails (reset or abort
    // mid-body) fails the call with its `HttpClientError`.
    const text = (yield* response.text) ?? "";
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
      const make = (Cls: DeclaredErrorClass, code?: string, message?: string) =>
        Effect.fail(new Cls({ code, message, target: graph?.target }));

      if (graph !== undefined) {
        // 1. Generic code + message.
        const ByMessage = declaredClass(errors, matchGraphErrorMessage(graph));
        if (ByMessage) return yield* make(ByMessage, graph.code, graph.message);

        // 2. The specific cause behind a generic code.
        for (const detail of graph.details ?? []) {
          const ByDetail = declaredClass(errors, classForCode(detail.code));
          if (ByDetail) return yield* make(ByDetail, detail.code, detail.message ?? graph.message);
        }

        // 3. The error code.
        const ByCode = declaredClass(errors, classForCode(graph.code));
        if (ByCode) return yield* make(ByCode, graph.code, graph.message);
      }

      // 4. Core's class for the status, which the service declares
      //    (Retry-After honored on retryable statuses).
      const StatusErrorClass = declaredStatusClass(status, errors);
      if (StatusErrorClass) {
        return yield* Effect.fail(
          new StatusErrorClass({
            message: graph?.message ?? (nonJson && text.trim() ? text.trim() : ""),
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 5. Any other 5xx -> retryable server error.
      if (status >= 500) {
        return yield* Effect.fail(
          new InternalServerError({
            message: graph?.message ?? `HTTP ${status}`,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 6. Unknown Graph error.
      return yield* Effect.fail(
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
    );
  });

const microsoftGraphProtocolMethods = {
  encode,
  decode,
} satisfies Protocol<unknown, unknown>;

export const MicrosoftGraphProtocol: ProtocolOf<typeof microsoftGraphProtocolMethods> =
  microsoftGraphProtocolMethods;
