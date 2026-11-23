import { ConfigError } from "@distilled.cloud/core/errors";
import { originFromConfig } from "@distilled.cloud/core/protocol-http";
/**
 * Zendesk credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol resolves it per request
 * on the calling fiber).
 *
 * Zendesk Support authenticates as HTTP Basic with `{email}/token:{apiToken}`
 * or as `Authorization: Bearer <oauth access token>`. Paths in the published
 * OpenAPI document already include the `/api/v2` prefix, so `apiBaseUrl` is
 * the account origin (`https://{subdomain}.zendesk.com`).
 *
 * A layer here reads and checks its configuration when it is built: a
 * missing value or a subdomain that is more than a host is a `ConfigError`
 * at setup, and no call fails for it.
 *
 * @see https://developer.zendesk.com/api-reference/introduction/security-and-auth/
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Base64 from "effect/encoding/Base64";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export interface Config {
  readonly authorization: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "ZendeskCredentials",
  ) {}

const stripTrailingSlash = (url: string): string => url.replace(/\/+$/, "");

/** Account origin from a subdomain (`acme`) or host (`acme.zendesk.com`). */
export const originFromSubdomain = (subdomain: string): string => {
  const host = subdomain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
  if (host.includes(".")) return `https://${host}`;
  return `https://${host}.zendesk.com`;
};

const basicToken = (
  email: string,
  apiToken: Redacted.Redacted<string>,
): Redacted.Redacted<string> =>
  Redacted.make(`Basic ${Base64.encode(`${email}/token:${Redacted.value(apiToken)}`)}`);

const bearerToken = (accessToken: Redacted.Redacted<string>): Redacted.Redacted<string> =>
  Redacted.make(`Bearer ${Redacted.value(accessToken)}`);

/**
 * {@link originFromSubdomain}, failing with `ConfigError` when the subdomain
 * or host carries more than a host (a path, query or user).
 */
const checkedOrigin = (subdomain: string): Effect.Effect<string, ConfigError> => {
  const origin = originFromConfig(
    "Zendesk subdomain",
    originFromSubdomain(subdomain).slice("https://".length),
  );
  return typeof origin === "string" ? Effect.succeed(origin) : Effect.fail(origin);
};

const resolveBaseUrl = (config: {
  readonly subdomain?: string;
  readonly apiBaseUrl?: string;
}): Effect.Effect<string, ConfigError> => {
  if (config.apiBaseUrl) return Effect.succeed(stripTrailingSlash(config.apiBaseUrl));
  if (config.subdomain) return checkedOrigin(config.subdomain);
  return Effect.fail(new ConfigError({ message: "Zendesk subdomain or apiBaseUrl is required" }));
};

/** A layer that resolves and checks `config` once, when it is built. */
const layer = (config: Effect.Effect<Config, ConfigError>): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(config, (resolved) => Effect.succeed(resolved)),
  );

/**
 * Layer from an API token (`{email}/token`) + subdomain, which is checked
 * when the layer is built.
 */
export const fromApiToken = (config: {
  readonly email: string;
  readonly apiToken: Redacted.Redacted<string>;
  readonly subdomain?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials, ConfigError> =>
  layer(
    Effect.map(resolveBaseUrl(config), (apiBaseUrl) => ({
      authorization: basicToken(config.email, config.apiToken),
      apiBaseUrl,
    })),
  );

/**
 * Layer from an OAuth access token + subdomain, which is checked when the
 * layer is built.
 */
export const fromAccessToken = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly subdomain?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials, ConfigError> =>
  layer(
    Effect.map(resolveBaseUrl(config), (apiBaseUrl) => ({
      authorization: bearerToken(config.accessToken),
      apiBaseUrl,
    })),
  );

/**
 * Reads ZENDESK_SUBDOMAIN (or ZENDESK_API_BASE_URL) plus either
 * ZENDESK_EMAIL + ZENDESK_API_TOKEN or ZENDESK_ACCESS_TOKEN. The environment
 * is read, and the subdomain checked, once: when the layer is built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ layer(
  /*@__PURE__*/ Effect.gen(function* () {
    const subdomain = process.env.ZENDESK_SUBDOMAIN;
    const apiBaseUrl = process.env.ZENDESK_API_BASE_URL;
    const email = process.env.ZENDESK_EMAIL;
    const apiTokenEnv = process.env.ZENDESK_API_TOKEN;
    const apiToken = apiTokenEnv ? Redacted.make(apiTokenEnv) : undefined;
    const accessTokenEnv = process.env.ZENDESK_ACCESS_TOKEN;
    const accessToken = accessTokenEnv ? Redacted.make(accessTokenEnv) : undefined;

    if (!subdomain && !apiBaseUrl) {
      return yield* new ConfigError({
        message: "ZENDESK_SUBDOMAIN (or ZENDESK_API_BASE_URL) environment variable is required",
      });
    }

    const origin = apiBaseUrl ? stripTrailingSlash(apiBaseUrl) : yield* checkedOrigin(subdomain!);

    if (accessToken) {
      return {
        authorization: bearerToken(accessToken),
        apiBaseUrl: origin,
      };
    }

    if (!email || !apiToken) {
      return yield* new ConfigError({
        message:
          "ZENDESK_EMAIL and ZENDESK_API_TOKEN (or ZENDESK_ACCESS_TOKEN) environment variables are required",
      });
    }

    return {
      authorization: basicToken(email, apiToken),
      apiBaseUrl: origin,
    };
  }),
);
