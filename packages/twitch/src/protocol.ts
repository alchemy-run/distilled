import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * TwitchProtocol -- the shared bearer-REST protocol instantiated for Helix.
 *
 * Helix speaks plain JSON with no success envelope. Every call carries the
 * access token as `Authorization: Bearer` and the app's `Client-Id`. A failure
 * is `{ "error": "Bad Request", "status": 400, "message": "<why>" }`, which the
 * factory's default extractor reads (`message` first).
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { TwitchParseError, UnknownTwitchError, type TwitchServiceError } from "./errors.ts";

/**
 * What every generated Twitch operation fails with besides its own errors: the
 * errors declared on the service, and the errors declared on the protocol.
 * Nobody lists the protocol's: its type carries what its code fails with (a
 * response that does not match its schema, a failed response nothing declares,
 * core's REST errors, and what resolving the credentials fails with).
 * Generated service files annotate operations with `API.OperationMethod<I, O,
 * TwitchOpError, TwitchOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type TwitchOpError = TwitchServiceError | ErrorOf<typeof TwitchProtocol>;

/** Context (requirements) shared by every generated Twitch operation. */
export type TwitchOpContext = Credentials | HttpClient.HttpClient;

export const TwitchProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a refreshed token is
  // picked up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl.replace(/\/+$/, ""),
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
    "Client-Id": creds.clientId,
  }),
  unknownError: (info) => new UnknownTwitchError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new TwitchParseError({ body, cause }),
});
