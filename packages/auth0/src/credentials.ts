import { ConfigError } from "@distilled.cloud/core/errors";
import { invalidHostLabelConfig } from "@distilled.cloud/core/protocol-http";
/**
 * Auth0 credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol resolves it per request
 * on the calling fiber). Management API auth is a bearer token sent as
 * `Authorization: Bearer <token>` against `https://{domain}/api/v2`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** Build the Management API base URL for a tenant domain. */
export const apiBaseUrlForDomain = (domain: string): string => {
  const host = domain.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  return `https://${host}/api/v2`;
};

/**
 * `apiBaseUrl` when given, else the tenant domain's Management API root. The
 * domain is the host name, so it must be DNS labels.
 */
const resolveApiBaseUrl = (
  domain: string,
  apiBaseUrl: string | undefined,
): Effect.Effect<string, ConfigError> => {
  if (apiBaseUrl !== undefined) return Effect.succeed(apiBaseUrl);
  const invalid = invalidHostLabelConfig(
    "Auth0 domain",
    domain.replace(/^https?:\/\//, "").replace(/\/+$/, ""),
    true,
  );
  return invalid === undefined ? Effect.succeed(apiBaseUrlForDomain(domain)) : Effect.fail(invalid);
};

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly domain: string;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "Auth0Credentials",
  ) {}

/** Layer from a Management API token + tenant domain. */
export const fromToken = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly domain: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.map(resolveApiBaseUrl(config.domain, config.apiBaseUrl), (apiBaseUrl) => ({
      token: config.token,
      domain: config.domain,
      apiBaseUrl,
    })),
  );

/**
 * Reads AUTH0_DOMAIN and AUTH0_MANAGEMENT_TOKEN (required) and
 * AUTH0_API_BASE_URL (optional override of `https://{domain}/api/v2`).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ Effect.gen(function* () {
    const domain = process.env.AUTH0_DOMAIN;
    const token = process.env.AUTH0_MANAGEMENT_TOKEN;

    if (!domain || !token) {
      return yield* new ConfigError({
        message: "AUTH0_DOMAIN and AUTH0_MANAGEMENT_TOKEN environment variables are required",
      });
    }

    return {
      token: Redacted.make(token),
      domain,
      apiBaseUrl: yield* resolveApiBaseUrl(domain, process.env.AUTH0_API_BASE_URL),
    };
  }),
);
