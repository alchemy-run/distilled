/**
 * Endpoint override for every GCP request — emulators (Pub/Sub,
 * Firestore, Storage) and private or proxied hosts. When set, it replaces
 * the scheme and host of the request URL; the path is kept.
 */
import * as Config from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";

export class Endpoint extends Context.Service<Endpoint, Effect.Effect<string | undefined>>()(
  "GCP::Endpoint",
) {}

/** `GOOGLE_API_ENDPOINT`; resolves `undefined` when unset. */
export const fromEnvironment = Config.String("GOOGLE_API_ENDPOINT").pipe(
  Config.option,
  Effect.map(Option.getOrUndefined),
);

/** Override the endpoint with whatever the environment names, if anything. */
export const fromEnv = () => Layer.succeed(Endpoint, fromEnvironment.pipe(Effect.orDie));

/** Override the endpoint for a scope, e.g. `Endpoint.of("http://localhost:8085")`. */
export const of = (endpoint: string) => Layer.succeed(Endpoint, Effect.succeed(endpoint));

/** Replace the origin of `baseUrl` with `endpoint`, keeping its path. */
export const withEndpoint = (baseUrl: string, endpoint: string): string => {
  const base = new URL(baseUrl);
  const target = new URL(endpoint);
  const path = `${target.pathname.replace(/\/+$/, "")}${base.pathname}`;
  return `${target.origin}${path}`;
};
