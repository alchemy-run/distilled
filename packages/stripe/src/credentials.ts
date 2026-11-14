import * as EffectConfig from "@distilled.cloud/core/config";
/**
 * Stripe credentials -- hand-written.
 *
 * API-compatible port of the distilled v0 stripe credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request. `CredentialsFromEnv` reads `STRIPE_API_KEY`.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.stripe.com";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /**
   * The account calls act on, sent as the `Stripe-Context` header: a
   * connected account (`acct_123`), an account in your organization, or a
   * path to a nested one (`acct_platform/acct_connected`). An organization
   * key (`sk_org_...`) needs it for every call that targets one account.
   * Unset, calls act on the API key's own account.
   * See https://docs.stripe.com/context.
   */
  readonly context?: string | undefined;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "StripeCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.String("STRIPE_API_KEY"),
});

export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "STRIPE_API_KEY environment variable is required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ apiKey }) => ({
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: DEFAULT_API_BASE_URL,
    })),
  ),
);

/**
 * Convenience layer from a redacted API key, an optional base URL and an
 * optional account context ({@link Config.context}).
 *
 * @example
 * ```ts
 * Stripe.credentials({ apiKey, context: "acct_123" });
 * ```
 */
export const credentials = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly context?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      context: config.context,
    }),
  );
