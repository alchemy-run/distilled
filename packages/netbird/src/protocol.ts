import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
/**
 * NetBirdProtocol -- hand-written.
 *
 * NetBird speaks token-authenticated JSON REST (no response envelope), so the
 * whole protocol is one `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Token <apiToken>` + base URL
 *             (default https://api.netbird.io), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message, code }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownNetBirdError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownNetBirdError, NetBirdParseError } from "./errors.ts";

/**
 * Error channel shared by every generated NetBird operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * NetBirdOpError, NetBirdOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type NetBirdOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownNetBirdError
  | ConfigError
  | HttpClientError.HttpClientError
  | NetBirdParseError
  | InvalidInput;

/** Context (requirements) shared by every generated NetBird operation. */
export type NetBirdOpContext = Credentials | HttpClient.HttpClient;

export const NetBirdProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Token ${Redacted.value(creds.apiToken)}`,
  }),
  // NetBird's error body is `{ message, code }` -- the factory's default
  // lenient envelope covers it.
  unknownError: ({ code, message, body }) =>
    new UnknownNetBirdError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new NetBirdParseError({ body, cause }),
});
