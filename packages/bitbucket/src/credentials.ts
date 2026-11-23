/**
 * Bitbucket Cloud credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ authorization, baseUrl }`; the
 * protocol sends `authorization` as the `Authorization` header. Bitbucket
 * Cloud accepts two kinds of credential on its REST API
 * (https://developer.atlassian.com/cloud/bitbucket/rest/intro/#authentication):
 *
 * - an API token, a personal token sent as HTTP Basic with the Atlassian
 *   account email as the username: `Basic base64(email:apiToken)`;
 * - an access token, sent as `Bearer <token>`: a repository, project or
 *   workspace access token, or an OAuth 2.0 access token.
 *
 * App passwords are deprecated in favour of API tokens and have no layer here.
 *
 * A layer here reads and checks its configuration when it is built: a
 * missing token is a `ConfigError` at setup, and no call fails for it.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Base64 from "effect/encoding/Base64";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** Bitbucket Cloud's REST API root (the spec's `servers` entry). */
export const DEFAULT_BASE_URL = "https://api.bitbucket.org/2.0";

export interface Config {
  /** The whole `Authorization` header value: `Basic ...` or `Bearer ...`. */
  readonly authorization: Redacted.Redacted<string>;
  /** API base URL, without a trailing slash. */
  readonly baseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "BitbucketCredentials",
  ) {}

const stripTrailingSlash = (url: string): string => url.replace(/\/+$/, "");

const basic = (email: string, apiToken: Redacted.Redacted<string>): Redacted.Redacted<string> =>
  Redacted.make(`Basic ${Base64.encode(`${email}:${Redacted.value(apiToken)}`)}`);

const bearer = (accessToken: Redacted.Redacted<string>): Redacted.Redacted<string> =>
  Redacted.make(`Bearer ${Redacted.value(accessToken)}`);

/** A layer that resolves `config` once, when it is built. */
const layer = (config: Effect.Effect<Config, ConfigError>): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(config, (resolved) => Effect.succeed(resolved)),
  );

/**
 * Credentials from an API token and the Atlassian account email it belongs
 * to, sent as HTTP Basic.
 */
export const fromApiToken = (config: {
  readonly email: string;
  readonly apiToken: Redacted.Redacted<string>;
  readonly baseUrl?: string;
}): Layer.Layer<Credentials, ConfigError> =>
  layer(
    config.email === ""
      ? Effect.fail(new ConfigError({ message: "Bitbucket API token credentials need an email" }))
      : Effect.succeed({
          authorization: basic(config.email, config.apiToken),
          baseUrl: stripTrailingSlash(config.baseUrl ?? DEFAULT_BASE_URL),
        }),
  );

/**
 * Credentials from a repository, project or workspace access token, or an
 * OAuth 2.0 access token, sent as `Bearer`.
 */
export const fromAccessToken = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly baseUrl?: string;
}): Layer.Layer<Credentials, ConfigError> =>
  layer(
    Effect.succeed({
      authorization: bearer(config.accessToken),
      baseUrl: stripTrailingSlash(config.baseUrl ?? DEFAULT_BASE_URL),
    }),
  );

const optionalString = (name: string) =>
  EffectConfig.option(EffectConfig.String(name)).pipe(EffectConfig.map(Option.getOrUndefined));

const optionalRedacted = (name: string) =>
  EffectConfig.option(EffectConfig.Redacted(name)).pipe(EffectConfig.map(Option.getOrUndefined));

const envConfig = /*@__PURE__*/ EffectConfig.all({
  accessToken: /*@__PURE__*/ optionalRedacted("BITBUCKET_ACCESS_TOKEN"),
  email: /*@__PURE__*/ optionalString("BITBUCKET_EMAIL"),
  apiToken: /*@__PURE__*/ optionalRedacted("BITBUCKET_API_TOKEN"),
  baseUrl: /*@__PURE__*/ EffectConfig.String("BITBUCKET_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_BASE_URL),
  ),
});

/**
 * Reads `BITBUCKET_ACCESS_TOKEN`, or `BITBUCKET_EMAIL` and
 * `BITBUCKET_API_TOKEN`, plus an optional `BITBUCKET_BASE_URL`. An access
 * token wins when both are set. The environment is read once: when the layer
 * is built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ layer(
  /*@__PURE__*/ Effect.gen(function* () {
    const env = yield* envConfig.pipe(
      Effect.mapError(
        () => new ConfigError({ message: "Bitbucket credentials could not be read" }),
      ),
    );
    const baseUrl = stripTrailingSlash(env.baseUrl);
    if (env.accessToken !== undefined) {
      return { authorization: bearer(env.accessToken), baseUrl };
    }
    if (env.email !== undefined && env.email !== "" && env.apiToken !== undefined) {
      return { authorization: basic(env.email, env.apiToken), baseUrl };
    }
    return yield* new ConfigError({
      message:
        "BITBUCKET_ACCESS_TOKEN, or BITBUCKET_EMAIL and BITBUCKET_API_TOKEN, environment variables are required",
    });
  }),
);
