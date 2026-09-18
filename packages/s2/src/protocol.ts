/**
 * S2Protocol — the shared bearer-REST protocol instantiated for S2 (s2.dev).
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
 * operations (`/streams`, `/streams/{stream}`, `/streams/{stream}/records…`)
 * go to the basin's own host — `https://{basin}.b.s2.dev/v1` in the spec's
 * per-path `servers` — with the configured `basin` substituted. A
 * basin-scoped call without a configured basin fails with `ConfigError`.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import { ConfigError } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import { Credentials, type Config } from "./credentials.ts";
import {
  PreconditionFailed,
  RangeNotSatisfiable,
  RequestTimeout,
  UnknownS2Error,
  type DefaultErrors,
} from "./errors.ts";

/**
 * Error channel shared by every generated S2 operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, S2OpError,
 * S2OpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type S2OpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated S2 operation. */
export type S2OpContext = Credentials | HttpClient.HttpClient;

/**
 * The routes the spec's per-path `servers` point at the basin host: the
 * streams and records collections. Every other route is account-level.
 * (`/metrics/{basin}/{stream}` names a basin in its PATH but stays on the
 * account endpoint.)
 */
const isBasinScoped = (uri: string): boolean =>
  uri === "/streams" || uri.startsWith("/streams/");

const baseUrlFor = (creds: Config, uri: string): string => {
  if (!isBasinScoped(uri)) return creds.accountBaseUrl;
  if (creds.basin === undefined || creds.basin === "") {
    throw new ConfigError({
      message:
        `S2 operation on ${uri} is basin-scoped (${creds.basinBaseUrl}) — ` +
        `configure a basin (S2_BASIN or credentials({ basin })) to call it`,
    });
  }
  return creds.basinBaseUrl.replace("{basin}", creds.basin);
};

export const S2Protocol: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
  // Resolved on the CALLING fiber per request (the layer is memoized per
  // process); the Credentials service holds an effect, so a token rotated
  // between calls is picked up without rebuilding the layer.
  credentials: Effect.gen(function* () {
    const resolve = yield* Credentials;
    return yield* resolve;
  }),
  baseUrl: (creds, target) => baseUrlFor(creds, target.uri),
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
  }),
  // S2's error body IS the envelope: `{ code, message }` at the top level,
  // which the factory's default extractor already reads.
  statusMap: {
    ...HTTP_STATUS_MAP,
    408: RequestTimeout,
    412: PreconditionFailed,
    416: RangeNotSatisfiable,
  },
  unknownError: ({ code, message, body }) =>
    new UnknownS2Error({
      code:
        typeof code === "string"
          ? code
          : code !== undefined
            ? String(code)
            : undefined,
      message,
      body,
    }),
});
