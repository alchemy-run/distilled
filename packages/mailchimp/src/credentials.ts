/**
 * Mailchimp credentials — hand-written.
 *
 * One secret, the account's API key, sent as HTTP basic auth with any
 * username. The key also names the account's data centre: `abc123-us21`
 * lives at `https://us21.api.mailchimp.com/3.0`. The document's
 * `server.api.mailchimp.com` host is a placeholder, not an origin.
 *
 * Following the core convention the `Credentials` service holds an *effect*
 * resolving the current config, which the protocol layer runs per request on
 * the calling fiber.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  /** Origin including the `/3.0` version segment. */
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config, ConfigError>
>()("MailchimpCredentials") {}

/** The data-centre suffix of an API key (`abc123-us21` → `us21`). */
export const serverPrefixFromApiKey = (apiKey: string): string | undefined => {
  const dash = apiKey.lastIndexOf("-");
  if (dash < 0) return undefined;
  const dc = apiKey.slice(dash + 1);
  return /^[a-z]+[0-9]+$/i.test(dc) ? dc.toLowerCase() : undefined;
};

export const apiBaseUrlFor = (serverPrefix: string): string =>
  `https://${serverPrefix}.api.mailchimp.com/3.0`;

const trimSlash = (url: string): string => url.replace(/\/+$/, "");

const resolve = (config: {
  readonly apiKey: string | Redacted.Redacted<string>;
  readonly serverPrefix?: string | undefined;
  readonly apiBaseUrl?: string | undefined;
}): Effect.Effect<Config, ConfigError> => {
  const apiKey = Redacted.isRedacted(config.apiKey)
    ? config.apiKey
    : Redacted.make(config.apiKey);
  if (config.apiBaseUrl !== undefined) {
    return Effect.succeed({ apiKey, apiBaseUrl: trimSlash(config.apiBaseUrl) });
  }
  const server =
    config.serverPrefix ?? serverPrefixFromApiKey(Redacted.value(apiKey));
  if (server === undefined) {
    return Effect.fail(
      new ConfigError({
        message:
          "Mailchimp API key has no data-centre suffix (expected `<key>-<dc>`, e.g. `…-us21`); pass serverPrefix",
      }),
    );
  }
  return Effect.succeed({ apiKey, apiBaseUrl: apiBaseUrlFor(server) });
};

/**
 * Layer from an API key. The data centre comes from the key's suffix unless
 * `serverPrefix` (e.g. `"us21"`) or a full `apiBaseUrl` is given.
 */
export const fromApiKey = (config: {
  readonly apiKey: string | Redacted.Redacted<string>;
  readonly serverPrefix?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> => Layer.succeed(Credentials, resolve(config));

/**
 * Reads `MAILCHIMP_API_KEY` (required) and the optional
 * `MAILCHIMP_SERVER_PREFIX` through Effect `Config`, so it follows whatever
 * `ConfigProvider` is installed — in a Worker, one built from `env`.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = yield* EffectConfig.Redacted("MAILCHIMP_API_KEY");
    const serverPrefix = yield* EffectConfig.option(
      EffectConfig.String("MAILCHIMP_SERVER_PREFIX"),
    );
    return { apiKey, serverPrefix: Option.getOrUndefined(serverPrefix) };
  }).pipe(
    Effect.mapError(
      (e) =>
        new ConfigError({
          message: `Mailchimp credentials require MAILCHIMP_API_KEY: ${e.message}`,
        }),
    ),
    Effect.flatMap(resolve),
  ),
);

// ───────────── Transactional ─────────────

/**
 * The document's `basePath` is `/api/1.3`; Mailchimp's own clients and docs
 * call `/api/1.0`, and the versions answer identically.
 */
export const DEFAULT_TRANSACTIONAL_API_BASE_URL =
  "https://mandrillapp.com/api/1.0";

export interface TransactionalConfig {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

/**
 * The Transactional API (formerly Mandrill) has its own key, issued in the
 * Transactional app, so it is a separate service from {@link Credentials}.
 */
export class TransactionalCredentials extends Context.Service<
  TransactionalCredentials,
  Effect.Effect<TransactionalConfig, ConfigError>
>()("MailchimpTransactionalCredentials") {}

const resolveTransactional = (config: {
  readonly apiKey: string | Redacted.Redacted<string>;
  readonly apiBaseUrl?: string | undefined;
}): TransactionalConfig => ({
  apiKey: Redacted.isRedacted(config.apiKey)
    ? config.apiKey
    : Redacted.make(config.apiKey),
  apiBaseUrl: trimSlash(
    config.apiBaseUrl ?? DEFAULT_TRANSACTIONAL_API_BASE_URL,
  ),
});

/** Layer from a Transactional API key. */
export const fromTransactionalApiKey = (config: {
  readonly apiKey: string | Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<TransactionalCredentials> =>
  Layer.succeed(
    TransactionalCredentials,
    Effect.succeed(resolveTransactional(config)),
  );

/**
 * Reads `MAILCHIMP_TRANSACTIONAL_API_KEY` (or the older `MANDRILL_API_KEY`)
 * through Effect `Config`.
 */
export const TransactionalCredentialsFromEnv: Layer.Layer<TransactionalCredentials> =
  Layer.succeed(
    TransactionalCredentials,
    Effect.gen(function* () {
      const apiKey = yield* EffectConfig.Redacted(
        "MAILCHIMP_TRANSACTIONAL_API_KEY",
      ).pipe(
        EffectConfig.orElse(() => EffectConfig.Redacted("MANDRILL_API_KEY")),
      );
      return resolveTransactional({ apiKey });
    }).pipe(
      Effect.mapError(
        (e) =>
          new ConfigError({
            message: `Mailchimp Transactional credentials require MAILCHIMP_TRANSACTIONAL_API_KEY: ${e.message}`,
          }),
      ),
    ),
  );
