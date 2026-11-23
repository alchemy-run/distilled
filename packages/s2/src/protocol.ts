import { ConfigError } from "@distilled.cloud/core/errors";
import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { invalidHostLabelConfig } from "@distilled.cloud/core/protocol-http";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * S2Protocol -- the shared bearer-REST protocol instantiated for S2 (s2.dev).
 *
 * S2 speaks plain JSON with no success envelope. FAILURES are enveloped,
 * and uniformly so: `{ "code": "...", "message": "..." }`, where `code` is
 * the machine-readable half. The API version is part of the base URL's PATH
 * (`/v1`), not a header, so the generated operations carry version-less
 * routes.
 *
 * S2 serves TWO endpoints, and the route picks between them: account-level
 * operations (`/basins`, `/access-tokens`, `/locations`, `/metrics`) go to
 * `accountBaseUrl` (`https://a.s2.dev/v1`), while stream and record
 * operations (`/streams`, `/streams/{stream}`, `/streams/{stream}/records...`)
 * go to the basin's own host -- `https://{basin}.b.s2.dev/v1` in the spec's
 * per-path `servers` -- with the configured `basin` substituted. A
 * basin-scoped call without a configured basin fails with `ConfigError`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownS2Error, S2ParseError, type S2ServiceError } from "./errors.ts";

/**
 * What every generated S2 operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, S2OpError, S2OpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type S2OpError = S2ServiceError | ErrorOf<typeof S2Protocol>;

/** Context (requirements) shared by every generated S2 operation. */
export type S2OpContext = Credentials | HttpClient.HttpClient;

/**
 * The routes the spec's per-path `servers` point at the basin host: the
 * streams and records collections. Every other route is account-level.
 * (`/metrics/{basin}/{stream}` names a basin in its PATH but stays on the
 * account endpoint.)
 */
const isBasinScoped = (uri: string): boolean => uri === "/streams" || uri.startsWith("/streams/");

/** The route's base URL; credentials without a usable basin refuse a basin route. */
const baseUrlFor = (creds: Config, uri: string): string | Effect.Effect<never, ConfigError> => {
  if (!isBasinScoped(uri)) return creds.accountBaseUrl;
  if (creds.basin === undefined || creds.basin === "") {
    return Effect.fail(
      new ConfigError({
        message:
          `S2 operation on ${uri} is basin-scoped (${creds.basinBaseUrl}) \u2014 ` +
          `configure a basin (S2_BASIN or credentials({ basin })) to call it`,
      }),
    );
  }
  // The basin becomes a label of the host name.
  const invalid = invalidHostLabelConfig("S2 basin", creds.basin);
  if (invalid !== undefined) return Effect.fail(invalid);
  return creds.basinBaseUrl.replace("{basin}", creds.basin);
};

export const S2Protocol = /*@__PURE__*/ restProtocol({
  // Resolved on the CALLING fiber per request; the Credentials service holds
  // an effect, so a token rotated between calls is picked up.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds, target) => baseUrlFor(creds, target.uri),
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
  }),
  // S2's error body IS the envelope: `{ code, message }` at the top level,
  // which the factory's default extractor already reads.
  unknownError: (info) => new UnknownS2Error(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new S2ParseError({ body, cause }),
});
