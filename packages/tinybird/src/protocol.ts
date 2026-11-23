import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * TinybirdProtocol -- the shared bearer-REST protocol instantiated for
 * Tinybird.
 *
 * Tinybird speaks plain JSON with no success envelope; a failure is
 * `{ "error": "<message>" }`, which the factory's default extractor reads.
 * The API version is part of each route (`/v0/...`), and the host is the
 * workspace region's (see credentials.ts).
 *
 * Non-JSON bodies follow the operation's model: the data endpoints
 * (`queryPipe`, `querySql`, ...) answer in the format the caller picks and
 * return the raw bytes, and a JSON body the reference does not type comes
 * back as read.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { TinybirdParseError, UnknownTinybirdError, type TinybirdServiceError } from "./errors.ts";

/**
 * What every generated Tinybird operation fails with besides its own errors:
 * the errors declared on the service, and the errors declared on the protocol.
 * Nobody lists the protocol's: its type carries what its code fails with (a
 * response that does not match its schema, a failed response nothing declares,
 * core's REST errors, and what resolving the credentials fails with).
 * Generated service files annotate operations with `API.OperationMethod<I, O,
 * TinybirdOpError, TinybirdOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type TinybirdOpError = TinybirdServiceError | ErrorOf<typeof TinybirdProtocol>;

/** Context (requirements) shared by every generated Tinybird operation. */
export type TinybirdOpContext = Credentials | HttpClient.HttpClient;

export const TinybirdProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a rotated token is
  // picked up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl.replace(/\/+$/, ""),
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
  }),
  unknownError: (info) => new UnknownTinybirdError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new TinybirdParseError({ body, cause }),
});
