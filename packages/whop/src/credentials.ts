/**
 * Whop credentials — hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, apiBaseUrl, apiVersionDate }`
 * per request; the protocol layer formats the `Authorization: Bearer
 * <apiKey>` and `Api-Version-Date` headers from it.
 *
 * `apiKey` is whatever Whop's bearer scheme accepts:
 *   • an **Account API key** — acts on one account and the accounts connected
 *     to it;
 *   • an **App API key** — acts on the accounts that installed your app;
 *   • a **user OAuth access token** — acts as that user, scoped to what they
 *     granted.
 *
 * All three go in the same header, so the SDK does not distinguish them. Keep
 * them server-side: none belong in browser code, a mobile app, or a repo.
 *
 * @see https://docs.whop.com/developer/api/getting-started
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";
import { API_VERSION_DATE } from "./api-version.ts";

export { API_VERSION_DATE };

/** Production. Every operation path in this SDK hangs off it. */
export const DEFAULT_API_BASE_URL = "https://api.whop.com/api/v1";

/**
 * Whop's sandbox: the same API over test data, with its own keys. Pass it as
 * `apiBaseUrl` (or set `WHOP_API_BASE_URL`) to point the SDK at it.
 *
 * @see https://docs.whop.com/developer/guides/sandbox
 */
export const SANDBOX_API_BASE_URL = "https://sandbox-api.whop.com/api/v1";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /**
   * The dated API version to pin requests to. Defaults to
   * {@link API_VERSION_DATE} — the version these services were generated
   * from, and the only one whose shapes match the generated schemas.
   *
   * Override it only to reproduce an older account's behavior; a different
   * date can return different field sets than the schemas here decode.
   *
   * @see https://docs.whop.com/developer/api/versioning
   */
  readonly apiVersionDate: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("WhopCredentials") {}

const envConfig = EffectConfig.all({
  // `WHOP_API_KEY` is what Whop's dashboard, CLI and app templates emit.
  apiKey: EffectConfig.String("WHOP_API_KEY"),
  apiBaseUrl: EffectConfig.String("WHOP_API_BASE_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
  apiVersionDate: EffectConfig.String("WHOP_API_VERSION_DATE").pipe(
    EffectConfig.withDefault(API_VERSION_DATE),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "WHOP_API_KEY environment variable is required",
        }),
    ),
    Effect.map(({ apiKey, apiBaseUrl, apiVersionDate }) => ({
      apiKey: Redacted.make(apiKey),
      apiBaseUrl,
      apiVersionDate,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain API key + optional base URL / version pin. */
export const credentials = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
  readonly apiVersionDate?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      apiVersionDate: config.apiVersionDate ?? API_VERSION_DATE,
    }),
  );
