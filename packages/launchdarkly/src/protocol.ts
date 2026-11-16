import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * LaunchDarklyProtocol -- hand-written.
 *
 * LaunchDarkly speaks access-token-authenticated JSON REST (no response
 * envelope), so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: <apiKey>` (not Bearer) +
 *             `LD-API-Version` + base URL (default
 *             https://app.launchdarkly.com), resolved from the calling fiber
 *             on every request. Paths already include `/api/v2`.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message, id? }` bodies map to
 *             the operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownLaunchDarklyError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  UnknownLaunchDarklyError,
  LaunchDarklyParseError,
  type LaunchDarklyServiceError,
} from "./errors.ts";

/**
 * The errors declared on LaunchDarkly's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link LaunchDarklyParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownLaunchDarklyError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type LaunchDarklyProtocolError =
  | RestProtocolError
  | LaunchDarklyParseError
  | UnknownLaunchDarklyError;

/**
 * What every generated LaunchDarkly operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, LaunchDarklyOpError, LaunchDarklyOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type LaunchDarklyOpError =
  | LaunchDarklyServiceError
  | LaunchDarklyProtocolError
  | CredentialsError;

/** Context (requirements) shared by every generated LaunchDarkly operation. */
export type LaunchDarklyOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const LaunchDarklyProtocol: Protocol<
  LaunchDarklyProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: Redacted.value(creds.apiKey),
    "LD-API-Version": creds.apiVersion,
  }),
  // LaunchDarkly's error body is `{ code?: string, message: string, id?:
  // string }` -- the factory's default lenient envelope covers it.
  unknownError: (info) => new UnknownLaunchDarklyError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new LaunchDarklyParseError({ body, cause }),
});
