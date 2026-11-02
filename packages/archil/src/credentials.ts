import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * Archil credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Archil Control Plane API keys are sent as
 * `Authorization: {API_KEY}` (no Bearer prefix).
 *
 * Archil runs one control plane per region, each with its own S3-compatible
 * data plane; disks, sandboxes and images live in exactly one region.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** The regions Archil serves, keyed by Archil's own region id. */
export const REGIONS = {
  "aws-us-east-1": "https://control.green.us-east-1.aws.prod.archil.com",
  "aws-us-west-2": "https://control.green.us-west-2.aws.prod.archil.com",
  "aws-eu-west-1": "https://control.green.eu-west-1.aws.prod.archil.com",
  "gcp-us-central1": "https://control.blue.us-central1.gcp.prod.archil.com",
} as const;

/** An Archil region id (`aws-us-east-1`, `gcp-us-central1`, ...). */
export type Region = keyof typeof REGIONS | (string & {});

export const DEFAULT_REGION = "aws-us-east-1";

export const DEFAULT_API_BASE_URL = REGIONS[DEFAULT_REGION];

/** The control-plane base URL of a region. */
export const controlPlaneUrl = (region: Region): string | undefined =>
  (REGIONS as Record<string, string>)[region];

/**
 * The S3-compatible data-plane base URL paired with a control-plane URL:
 * `control.<color>.<region>…` becomes `s3.<color>.<region>…`.
 */
export const s3BaseUrl = (apiBaseUrl: string): string =>
  apiBaseUrl.replace(/^https:\/\/control\./, "https://s3.");

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /** The Archil region the base URL serves, when known. */
  readonly region?: Region;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "ArchilCredentials",
  ) {}

const resolveBaseUrl = (
  region: Region | undefined,
  apiBaseUrl: string | undefined,
): Effect.Effect<string, ConfigError> => {
  if (apiBaseUrl) return Effect.succeed(apiBaseUrl);
  const url = controlPlaneUrl(region ?? DEFAULT_REGION);
  return url
    ? Effect.succeed(url)
    : Effect.fail(
        new ConfigError({
          message: `Unknown Archil region "${region}". Valid regions: ${Object.keys(REGIONS).join(", ")}`,
        }),
      );
};

/** Layer from a redacted API key, plus a region or an explicit base URL. */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly region?: Region;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    resolveBaseUrl(config.region, config.apiBaseUrl).pipe(
      Effect.map((apiBaseUrl) => ({
        apiKey: config.apiKey,
        apiBaseUrl,
        region: config.region ?? (config.apiBaseUrl ? undefined : DEFAULT_REGION),
      })),
    ),
  );

/**
 * Reads ARCHIL_API_KEY (required), ARCHIL_REGION (optional, defaults to
 * `aws-us-east-1`) and ARCHIL_API_BASE_URL (optional, overrides the region).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ Effect.gen(function* () {
    const apiKey = process.env.ARCHIL_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "ARCHIL_API_KEY environment variable is required",
      });
    }
    const region = process.env.ARCHIL_REGION;
    const apiBaseUrl = yield* resolveBaseUrl(region, process.env.ARCHIL_API_BASE_URL);
    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl,
      region: region ?? (process.env.ARCHIL_API_BASE_URL ? undefined : DEFAULT_REGION),
    };
  }),
);
