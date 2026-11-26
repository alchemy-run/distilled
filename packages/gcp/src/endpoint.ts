/**
 * Endpoint override for every GCP request -- emulators (Pub/Sub,
 * Firestore, Storage) and private or proxied hosts. When set, it replaces
 * the scheme and host of the request URL; the path is kept.
 */
import * as Config from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";

/**
 * The override, already parsed. A layer checks its endpoint when it is
 * built, so a value that is not a URL fails there, at setup, and no call
 * can fail for it.
 */
export class Endpoint
  extends /*@__PURE__*/ Context.Service<Endpoint, Option.Option<URL>>()("GCP::Endpoint") {}

// `localhost:8085` parses as a URL with the scheme `localhost:`, so the
// scheme is checked too.
const isHttpUrl = (value: string): boolean =>
  URL.canParse(value) && /^https?:$/.test(new URL(value).protocol);

const parse = (endpoint: string): Effect.Effect<URL, ConfigError> =>
  isHttpUrl(endpoint)
    ? Effect.succeed(new URL(endpoint))
    : Effect.fail(
        new ConfigError({
          message: `GCP endpoint override must be an absolute http(s) URL (e.g. http://localhost:8085), got ${JSON.stringify(endpoint)}`,
        }),
      );

/** `GOOGLE_API_ENDPOINT`; resolves `undefined` when unset. */
export const fromEnvironment = /*@__PURE__*/ Config.String("GOOGLE_API_ENDPOINT").pipe(
  Config.option,
  /*@__PURE__*/ Effect.map(Option.getOrUndefined),
);

/**
 * Override the endpoint with whatever the environment names, if anything.
 * The environment is read, and the value checked, once: when the layer is
 * built.
 */
export const fromEnv = () =>
  Layer.effect(
    Endpoint,
    Effect.flatMap(fromEnvironment, (endpoint) =>
      endpoint === undefined
        ? Effect.succeed(Option.none<URL>())
        : Effect.map(parse(endpoint), Option.some),
    ),
  );

/**
 * Override the endpoint for a scope, e.g. `Endpoint.of("http://localhost:8085")`.
 * Building the layer fails with `ConfigError` when `endpoint` is not an
 * absolute http(s) URL.
 */
export const of = (endpoint: string) =>
  Layer.effect(Endpoint, Effect.map(parse(endpoint), Option.some));

/** Replace the origin of `baseUrl` with `endpoint`'s, keeping its path. */
export const withEndpoint = (baseUrl: string, endpoint: URL): string => {
  const base = new URL(baseUrl);
  const path = `${endpoint.pathname.replace(/\/+$/, "")}${base.pathname}`;
  return `${endpoint.origin}${path}`;
};
