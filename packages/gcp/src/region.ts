/**
 * The default GCP region, and how requests pick a regional endpoint.
 *
 * GCP regions differ from AWS regions: most APIs are served from one
 * global host, and a resource's location is part of its name
 * (`projects/p/locations/us-east1/...`). {@link Region} is therefore the
 * DEFAULT location callers use when they create or list regional
 * resources. It is optional — generated operations do not list it in
 * their requirements — and never changes which host a request goes to.
 *
 * Hosts are chosen per request by {@link RegionalEndpoints}:
 *
 * - `"required"` (default): send a request to the regional host of the
 *   location in its resource name only where the global host rejects
 *   regional resources (Secret Manager, Parameter Manager).
 * - `"prefer"`: send every request whose resource name has a location
 *   to that location's regional host whenever Google publishes one — the
 *   data-residency mode (TLS terminates in the region).
 * - `"never"`: always use the global host.
 */
import * as Config from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import { REGIONAL_ENDPOINTS } from "./regional-endpoints.ts";

/** A GCP region (`us-central1`) or multi-region (`us`, `eu`). */
export type RegionName = string;

export class Region extends Context.Service<
  Region,
  Effect.Effect<RegionName | undefined>
>()("GCP::Region") {}

/**
 * `GOOGLE_CLOUD_REGION`, then `CLOUDSDK_COMPUTE_REGION` (what `gcloud`
 * reads), then `GOOGLE_REGION`. Resolves `undefined` when none is set.
 */
export const fromEnvironment = Config.String("GOOGLE_CLOUD_REGION").pipe(
  Config.orElse(() => Config.String("CLOUDSDK_COMPUTE_REGION")),
  Config.orElse(() => Config.String("GOOGLE_REGION")),
  Config.option,
  Effect.map(Option.getOrUndefined),
);

/** Default region from the environment, if any. */
export const fromEnv = () =>
  Layer.succeed(Region, fromEnvironment.pipe(Effect.orDie));

/** Default region for a scope, e.g. `Region.of("europe-west1")`. */
export const of = (region: RegionName) =>
  Layer.succeed(Region, Effect.succeed(region));

/** The ambient default region, or `undefined` when none is provided. */
export const current = Effect.serviceOption(Region).pipe(
  Effect.flatMap((region) =>
    Option.isSome(region) ? region.value : Effect.succeed(undefined),
  ),
);

export type RegionalEndpointMode = "required" | "prefer" | "never";

export class RegionalEndpoints extends Context.Service<
  RegionalEndpoints,
  RegionalEndpointMode
>()("GCP::RegionalEndpoints") {}

/** Route requests to regional hosts, e.g. `RegionalEndpoints.of("prefer")`. */
export const regionalEndpoints = (mode: RegionalEndpointMode) =>
  Layer.succeed(RegionalEndpoints, mode);

/**
 * Services whose global host rejects regional resources, so a request for
 * `projects/p/locations/{region}/…` must go to the regional host.
 */
const REGION_REQUIRED = new Set([
  "https://secretmanager.googleapis.com/",
  "https://parametermanager.googleapis.com/",
]);

const LOCATION = /(?:^|\/)locations\/([a-z0-9-]+)(?:\/|$)/;

/**
 * The host for one request: the regional host of the location in its path
 * when `mode` calls for it and Google publishes one, else `baseUrl`.
 */
export const endpointFor = (
  baseUrl: string,
  uri: string,
  mode: RegionalEndpointMode,
): string => {
  if (mode === "never") return baseUrl;
  if (mode === "required" && !REGION_REQUIRED.has(baseUrl)) return baseUrl;
  const location = LOCATION.exec(uri)?.[1];
  if (location === undefined || location === "global" || location === "-") {
    return baseUrl;
  }
  const hosts = REGIONAL_ENDPOINTS[baseUrl];
  const host = hosts?.find((entry) => entry.locations.includes(location));
  return host ? host.template.replace("{location}", location) : baseUrl;
};
