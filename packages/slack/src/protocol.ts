import {
  GatewayTimeout,
  InternalServerError,
  ServiceUnavailable,
  Unauthorized,
} from "@distilled.cloud/core/errors";
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
  getProps,
  hasPropAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus, parseServerRetryHint } from "@distilled.cloud/core/retry-after";
import { httpSymbol, querySymbol, type HttpTrait } from "@distilled.cloud/core/trait";
/**
 * SlackProtocol -- hand-written.
 *
 * Speaks the Slack Web API convention. The generic request/response machinery
 * (trait-driven request building, recursive wire-name mapping, typed-error
 * matcher evaluation) lives in `@distilled.cloud/core/protocol-http`; this
 * module supplies what is Slack's own:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` (omitted for an
 *             empty token -- the OAuth exchange methods authenticate with
 *             `client_id`/`client_secret` args instead), and array-valued
 *             query args joined with commas (`channel_ids=C1,C2` -- Slack
 *             reads comma-separated lists, not repeated params)
 *
 *   response: `{ "ok": true, ...payload }` -- the payload shares the envelope's
 *             level, so a successful body maps onto the output schema
 *             directly (`ok` is a modeled member).
 *             `{ "ok": false, "error": "<slug>" }` -- usually WITH HTTP 200 --
 *             becomes a typed error: per-op matcher classes first, then the
 *             infrastructure slugs (auth -> Unauthorized, throttling ->
 *             SlackRateLimited, server hiccups -> retryable 5xx classes),
 *             then {@link SlackError} carrying the slug. Those classes
 *             and core's status classes are the service's errors
 *             (`SlackServiceErrors`): the protocol builds one only from the
 *             classes the operation lists.
 *             A successful NON-JSON body is returned as raw bytes -- the one
 *             method that answers this way (`admin.analytics.getFile`) sends
 *             a gzipped NDJSON file.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { Credentials } from "./credentials.ts";
import {
  SlackError,
  SlackHttpError,
  SlackParseError,
  SlackRateLimited,
  type SlackServiceError,
} from "./errors.ts";

/**
 * What every generated Slack operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, SlackOpError, SlackOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type SlackOpError = SlackServiceError | ErrorOf<typeof SlackProtocol>;

/** Context (requirements) shared by every generated Slack operation. */
export type SlackOpContext = Credentials | HttpClient.HttpClient;

/**
 * An instance of `cls`, a class of the service's errors, built from the
 * operation's own list: `undefined` when the operation does not list the
 * class (every generated operation lists `SlackServiceErrors`).
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
 * Envelope slugs that mean "the token is no good" on ANY method -- mapped to
 * the shared Unauthorized class so one catch handles credential problems
 * across the SDK. Permission-shaped slugs (`missing_scope`, `no_permission`,
 * `access_denied`, ...) stay {@link SlackError}: they carry method-specific
 * detail (`needed`/`provided`) the shared class would drop.
 */
const AUTH_SLUGS = /*@__PURE__*/ new Set([
  "not_authed",
  "invalid_auth",
  "account_inactive",
  "token_revoked",
  "token_expired",
]);

/**
 * Envelope slugs that are Slack-side hiccups -- retryable server errors. An
 * entry answers `undefined` when the operation does not list the class it
 * maps to.
 */
const SERVER_SLUGS: Record<
  string,
  (
    errors: ReadonlyArray<DeclaredErrorClass>,
    message: string,
  ) => DeclaredError | InternalServerError | undefined
> = {
  internal_error: (_errors, message) => new InternalServerError({ message }),
  fatal_error: (_errors, message) => new InternalServerError({ message }),
  service_unavailable: (errors, message) => declaredError(errors, ServiceUnavailable, { message }),
  request_timeout: (errors, message) => declaredError(errors, GatewayTimeout, { message }),
};

/**
 * Serialize input members the way Slack's wire wants them, before the
 * generic request builder runs:
 *
 *   * Array-valued QUERY args join with commas (`channel_ids=C1,C2`) --
 *     core's default would repeat the param instead.
 *   * On form-urlencoded operations, every non-scalar body member is
 *     flattened to the string Slack's form convention reads: ID lists
 *     comma-joined, rich values (blocks, barrier subjects, datastore items)
 *     JSON-encoded -- core's default is Stripe-style bracket notation, which
 *     Slack does not speak.
 */
const serializeForWire = (input: unknown, inputAst: AST.AST): unknown => {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return input;
  }
  const isForm =
    (getAnn(inputAst, httpSymbol) as HttpTrait | undefined)?.contentType === "form-urlencoded";
  const props = getProps(inputAst);
  if (props.length === 0) return input;
  let out: Record<string, unknown> | undefined;
  for (const prop of props) {
    const key = String(prop.name);
    const value = (input as Record<string, unknown>)[key];
    if (value === null || typeof value !== "object") continue;
    const isQuery = hasPropAnn(prop, querySymbol);
    if (Array.isArray(value) && (isQuery || isForm)) {
      out ??= { ...(input as Record<string, unknown>) };
      out[key] = value.every((v) => typeof v !== "object" || v === null)
        ? value.join(",")
        : // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- the value is the caller's input, and the defect boundary reports one JSON cannot carry as `SdkError`
          JSON.stringify(value);
    } else if (isForm && !isQuery) {
      out ??= { ...(input as Record<string, unknown>) };
      // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- the value is the caller's input, and the defect boundary reports one JSON cannot carry as `SdkError`
      out[key] = JSON.stringify(value);
    }
  }
  return out ?? input;
};

// The protocol is one module-level value shared by every operation, so it
// must not capture credentials -- `encode` resolves Credentials from the
// calling fiber's context on every request instead.
const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials;
    const token = Redacted.value(creds.token);
    return yield* buildRequest({
      input: serializeForWire(unwrapRedactedDeep(input), inputAst),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      // An empty token means a credential-less call (the OAuth exchange
      // methods) -- no Authorization header at all.
      headers: token === "" ? {} : { authorization: `Bearer ${token}` },
    });
  });

const decode = ({ response, outputAst, errors: errorClasses }: DecodeArgs) =>
  Effect.gen(function* () {
    // Read as BYTES first: the analytics export answers a successful call
    // with a gzipped file, which a text read would corrupt. Everything else
    // decodes from the same buffer.
    const bytes = new Uint8Array(yield* response.arrayBuffer);
    const text = new TextDecoder().decode(bytes);

    let json: Record<string, unknown> | undefined;
    let nonJson = false;
    if (text.trim().length > 0) {
      try {
        const parsed = JSON.parse(text);
        if (parsed !== null && typeof parsed === "object") {
          json = parsed as Record<string, unknown>;
        }
      } catch {
        // non-JSON -- a binary success payload or an HTML error page
        nonJson = true;
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    // Slack reports failures as `ok: false`, usually WITH HTTP 200 -- a
    // non-2xx status without an envelope (proxy pages) is also a failure.
    const failed = status >= 400 || json?.ok === false;
    if (failed) {
      const slug = typeof json?.error === "string" ? json.error : undefined;
      // `response_metadata.messages` carries per-field validation detail
      // (e.g. `invalid_arguments`); some envelopes use a bare `errors` list.
      const detailMessages = (
        [
          ...((json?.response_metadata as { messages?: unknown[] } | undefined)?.messages ?? []),
          ...((Array.isArray(json?.errors) ? json.errors : []) as unknown[]),
        ] as unknown[]
      ).filter((m): m is string => typeof m === "string");
      const message =
        detailMessages[0] ??
        slug ??
        (json === undefined && text.trim() ? text.trim() : `HTTP ${status}`);

      // 1. Per-operation typed error (matcher metadata on the class -- none
      //    are generated today, but model patches can add them). Slack's
      //    error codes are string slugs, and matcher `code`s are numeric --
      //    a patch-declared class matches on `status`/`message` instead
      //    (`message` is the slug when the envelope carries no detail).
      const typed = matchTypedError(errorClasses, status, [{ message }], {
        body: json === undefined ? text : json,
        headers,
      });
      if (typed !== undefined) return yield* Effect.fail(typed);

      // 2. Throttling -- the 429 or its envelope spellings.
      if (status === 429 || slug === "rate_limited" || slug === "ratelimited") {
        const throttled = declaredError(errorClasses, SlackRateLimited, {
          code: slug ?? "rate_limited",
          message,
          retryAfter: parseServerRetryHint(headers),
        });
        if (throttled !== undefined) return yield* Effect.fail(throttled);
      }

      // 3. Infrastructure slugs: credential problems and Slack-side hiccups.
      if (slug !== undefined && AUTH_SLUGS.has(slug)) {
        const unauthorized = declaredError(errorClasses, Unauthorized, { message: slug });
        if (unauthorized !== undefined) return yield* Effect.fail(unauthorized);
      }
      if (slug !== undefined && slug in SERVER_SLUGS) {
        const server = SERVER_SLUGS[slug]!(errorClasses, message);
        if (server !== undefined) return yield* Effect.fail(server);
      }

      // 4. Any other envelope slug -> SlackError, the slug preserved.
      if (slug !== undefined) {
        const slackError = declaredError(errorClasses, SlackError, {
          code: slug,
          ...(message !== slug ? { message } : {}),
          ...(typeof json?.needed === "string" ? { needed: json.needed } : {}),
          ...(typeof json?.provided === "string" ? { provided: json.provided } : {}),
          ...(detailMessages.length > 0 ? { messages: detailMessages } : {}),
        });
        if (slackError !== undefined) return yield* Effect.fail(slackError);
      }

      // 5. No envelope at all: core's class for the status (which the
      //    service declares) / retryable 5xx / raw.
      const StatusErrorClass = declaredStatusClass(status, errorClasses);
      if (StatusErrorClass) {
        return yield* Effect.fail(
          new StatusErrorClass({
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
      return yield* Effect.fail(new SlackHttpError({ status, message, body: text.slice(0, 2000) }));
    }

    // Successful non-JSON body: raw bytes (the analytics file download --
    // modeled as a Document output, so the bytes pass through verbatim).
    // Strict mode fails them for every other (struct) output.
    //
    // 2xx envelope: the body IS the payload (`ok` rides along as a modeled
    // member). Wire->TS key mapping is schema-driven; sensitive members
    // (OAuth access/refresh tokens) wrap in Redacted. Strict mode checks the
    // mapped payload against the output schema first.
    //
    // Either way, parse errors withhold a body that can hold a secret, and a
    // body that is not JSON at all fails for such an output in every mode
    // (core `validateSuccess`).
    return yield* validateSuccess(
      outputAst,
      json === undefined
        ? { value: bytes, body: text, nonJson }
        : { value: mapKeys(outputAst, json, "decode"), body: json, nonJson },
      (info) => new SlackParseError(info),
    );
  });

const slackProtocolMethods = {
  encode,
  decode,
} satisfies Protocol<unknown, unknown>;

export const SlackProtocol: ProtocolOf<typeof slackProtocolMethods> = slackProtocolMethods;
