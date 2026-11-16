import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * PlanetScaleProtocol -- hand-written.
 *
 * PlanetScale speaks plain JSON REST (no response envelope), so the whole
 * protocol is one `restProtocol` call from `core/protocol-rest`. What is
 * PlanetScale's own is the dual-mode `Authorization` header:
 *
 *   service token -> `Authorization: <tokenId>:<token>` (non-standard scheme)
 *   OAuth         -> `Authorization: Bearer <accessToken>`
 *
 * built by {@link formatHeaders} from the credentials resolved on the
 * calling fiber for every request (rotations/refreshes Just Work -- refresh
 * itself is the caller's job, see `credentials.ts`).
 *
 * response: 2xx JSON is the payload (sensitive members like a password's
 * `plain_text` delivered as `Redacted`); non-2xx `{ code, message? }` bodies
 * map to the operation's typed error classes by status, then the shared
 * HTTP-status classes, then {@link UnknownPlanetScaleError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import { Credentials, formatHeaders, type CredentialsError } from "./credentials.ts";
import {
  UnknownPlanetScaleError,
  PlanetScaleParseError,
  type PlanetScaleServiceError,
} from "./errors.ts";

/**
 * The errors declared on PlanetScale's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link PlanetScaleParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownPlanetScaleError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type PlanetScaleProtocolError =
  | RestProtocolError
  | PlanetScaleParseError
  | UnknownPlanetScaleError;

/**
 * What every generated PlanetScale operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, PlanetScaleOpError, PlanetScaleOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type PlanetScaleOpError =
  | PlanetScaleServiceError
  | PlanetScaleProtocolError
  | CredentialsError;

/** Context (requirements) shared by every generated PlanetScale operation. */
export type PlanetScaleOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const PlanetScaleProtocol: Protocol<
  PlanetScaleProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => formatHeaders(creds),
  // PlanetScale's error body is `{ code: string, message?: string }` -- the
  // factory's default lenient envelope covers it.
  unknownError: (info) => new UnknownPlanetScaleError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new PlanetScaleParseError({ body, cause }),
});
