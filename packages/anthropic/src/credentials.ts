/**
 * Anthropic credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol resolves it per request on the
 * calling fiber). The protocol picks the credential per operation:
 *
 *   • Admin API routes (`/v1/organizations/*`) send the ADMIN key
 *     (`sk-ant-admin…`) as `x-api-key`, falling back to the OAuth bearer
 *     token. Neither configured → `MissingAnthropicCredentials`.
 *   • Every other route sends the API key as `x-api-key`, falling back to the
 *     OAuth bearer token (`Authorization: Bearer`). Neither configured →
 *     `MissingAnthropicCredentials`.
 *
 * Every request also carries `anthropic-version` (default
 * {@link DEFAULT_API_VERSION}) and, when `betas` is set, a default
 * `anthropic-beta` header — an operation's own `anthropicBeta` input member
 * overrides it per call.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.anthropic.com";
export const DEFAULT_API_VERSION = "2023-06-01";

export interface Config {
  /** Inference API key (`sk-ant-api…`), sent as `x-api-key`. */
  readonly apiKey?: Redacted.Redacted<string>;
  /** Admin API key (`sk-ant-admin…`), sent as `x-api-key` on `/v1/organizations/*`. */
  readonly adminKey?: Redacted.Redacted<string>;
  /** OAuth access token, sent as `Authorization: Bearer` when no key applies. */
  readonly authToken?: Redacted.Redacted<string>;
  /** API root. Default {@link DEFAULT_API_BASE_URL}. */
  readonly apiBaseUrl: string;
  /** `anthropic-version` header. Default {@link DEFAULT_API_VERSION}. */
  readonly apiVersion: string;
  /** Default `anthropic-beta` flags, joined with `,`. */
  readonly betas?: ReadonlyArray<string>;
}

export class Credentials extends Context.Service<Credentials, Effect.Effect<Config>>()(
  "AnthropicCredentials",
) {}

export interface CredentialsOptions {
  readonly apiKey?: Redacted.Redacted<string>;
  readonly adminKey?: Redacted.Redacted<string>;
  readonly authToken?: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly apiVersion?: string;
  readonly betas?: ReadonlyArray<string>;
}

const toConfig = (o: CredentialsOptions): Config => ({
  apiKey: o.apiKey,
  adminKey: o.adminKey,
  authToken: o.authToken,
  apiBaseUrl: o.apiBaseUrl ?? DEFAULT_API_BASE_URL,
  apiVersion: o.apiVersion ?? DEFAULT_API_VERSION,
  betas: o.betas,
});

/** Layer from any combination of API key, admin key and OAuth token. */
export const credentials = (options: CredentialsOptions): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, Effect.succeed(toConfig(options)));

/** Layer from an inference API key. */
export const fromApiKey = (
  apiKey: Redacted.Redacted<string>,
  options: Omit<CredentialsOptions, "apiKey"> = {},
): Layer.Layer<Credentials> => credentials({ ...options, apiKey });

/** Layer from an Admin API key (for `/v1/organizations/*`). */
export const fromAdminKey = (
  adminKey: Redacted.Redacted<string>,
  options: Omit<CredentialsOptions, "adminKey"> = {},
): Layer.Layer<Credentials> => credentials({ ...options, adminKey });

/** Layer from an OAuth access token (`Authorization: Bearer`). */
export const fromAuthToken = (
  authToken: Redacted.Redacted<string>,
  options: Omit<CredentialsOptions, "authToken"> = {},
): Layer.Layer<Credentials> => credentials({ ...options, authToken });

const optionalRedacted = (name: string) =>
  EffectConfig.Redacted(name).pipe(EffectConfig.option, EffectConfig.map(Option.getOrUndefined));

const envConfig = EffectConfig.all({
  apiKey: optionalRedacted("ANTHROPIC_API_KEY"),
  adminKey: optionalRedacted("ANTHROPIC_ADMIN_KEY"),
  authToken: optionalRedacted("ANTHROPIC_AUTH_TOKEN"),
  apiBaseUrl: EffectConfig.String("ANTHROPIC_BASE_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/**
 * Reads `ANTHROPIC_API_KEY`, `ANTHROPIC_ADMIN_KEY` and `ANTHROPIC_AUTH_TOKEN`
 * (each optional — an operation whose credential is missing fails with
 * `MissingAnthropicCredentials`), and `ANTHROPIC_BASE_URL` (default
 * {@link DEFAULT_API_BASE_URL}).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.map((env) => toConfig(env)),
    // Every key is optional and the base URL has a default, so the only way
    // to fail here is a malformed ConfigProvider — a defect, not a typed
    // API error.
    Effect.orDie,
  ),
);
