import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * OpenSearch credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the cluster's
 * endpoint and how to authenticate; the protocol layer resolves it per
 * request on the calling fiber, so the effect can refresh credentials.
 *
 * A cluster authenticates in one of these ways:
 *
 *   - `basic`: HTTP basic auth, the security plugin's internal users
 *     (self-hosted clusters, Amazon OpenSearch Service with fine-grained
 *     access control and the internal user database).
 *   - `bearer`: `Authorization: Bearer <token>`, the security plugin's JWT
 *     authentication.
 *   - `sigv4`: AWS Signature Version 4, for Amazon OpenSearch Service
 *     (service `es`) and Amazon OpenSearch Serverless (service `aoss`).
 *   - `none`: no `Authorization` header (a local cluster without the
 *     security plugin).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as Redacted from "effect/Redacted";

/** The default endpoint of a local cluster. */
export const DEFAULT_ENDPOINT = "http://localhost:9200";

/** An AWS access key pair, plus the session token of temporary credentials. */
export interface AwsCredentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: Redacted.Redacted<string>;
  readonly sessionToken?: Redacted.Redacted<string> | undefined;
}

/** How requests authenticate. */
export type Auth =
  | { readonly type: "none" }
  | {
      readonly type: "basic";
      readonly username: string;
      readonly password: Redacted.Redacted<string>;
    }
  | { readonly type: "bearer"; readonly token: Redacted.Redacted<string> }
  | {
      readonly type: "sigv4";
      /** `es` for Amazon OpenSearch Service, `aoss` for OpenSearch Serverless. */
      readonly service: "es" | "aoss";
      readonly region: string;
      readonly credentials: AwsCredentials;
    };

export interface Config {
  /** The cluster's base URL, such as `https://search-logs-abc.us-east-1.es.amazonaws.com`. */
  readonly endpoint: string;
  readonly auth: Auth;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "OpenSearchCredentials",
  ) {}

const layerOf = (config: Effect.Effect<Config, ConfigError>): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, config);

/** A cluster without authentication (no security plugin). */
export const fromEndpoint = (config?: { readonly endpoint?: string }): Layer.Layer<Credentials> =>
  layerOf(
    Effect.succeed({ endpoint: config?.endpoint ?? DEFAULT_ENDPOINT, auth: { type: "none" } }),
  );

/** HTTP basic auth with a security plugin user. */
export const fromBasicAuth = (config: {
  readonly endpoint?: string;
  readonly username: string;
  readonly password: Redacted.Redacted<string>;
}): Layer.Layer<Credentials> =>
  layerOf(
    Effect.succeed({
      endpoint: config.endpoint ?? DEFAULT_ENDPOINT,
      auth: { type: "basic", username: config.username, password: config.password },
    }),
  );

/** `Authorization: Bearer <token>`, for the security plugin's JWT authentication. */
export const fromBearerToken = (config: {
  readonly endpoint?: string;
  readonly token: Redacted.Redacted<string>;
}): Layer.Layer<Credentials> =>
  layerOf(
    Effect.succeed({
      endpoint: config.endpoint ?? DEFAULT_ENDPOINT,
      auth: { type: "bearer", token: config.token },
    }),
  );

/**
 * AWS SigV4 for Amazon OpenSearch Service (`service: "es"`, the default) or
 * OpenSearch Serverless (`service: "aoss"`). `credentials` can be an effect;
 * it runs on every request, so it can return refreshed temporary credentials.
 */
export const fromSigV4 = (config: {
  readonly endpoint: string;
  readonly region: string;
  readonly service?: "es" | "aoss";
  readonly credentials: AwsCredentials | Effect.Effect<AwsCredentials, ConfigError>;
}): Layer.Layer<Credentials> => {
  const credentials = Effect.isEffect(config.credentials)
    ? config.credentials
    : Effect.succeed(config.credentials);
  return layerOf(
    Effect.map(credentials, (keys) => ({
      endpoint: config.endpoint,
      auth: {
        type: "sigv4",
        service: config.service ?? "es",
        region: config.region,
        credentials: keys,
      },
    })),
  );
};

const optional = (name: string) => EffectConfig.option(EffectConfig.String(name));
const optionalRedacted = (name: string) => EffectConfig.option(EffectConfig.Redacted(name));

const fromEnv: Effect.Effect<Config, ConfigError> = /*@__PURE__*/ Effect.gen(function* () {
  const endpoint = Option.getOrElse(yield* optional("OPENSEARCH_URL"), () => DEFAULT_ENDPOINT);

  const awsService = Option.getOrUndefined(yield* optional("OPENSEARCH_AWS_SERVICE"));
  if (awsService !== undefined) {
    if (awsService !== "es" && awsService !== "aoss") {
      return yield* new ConfigError({
        key: "OPENSEARCH_AWS_SERVICE",
        message: `OPENSEARCH_AWS_SERVICE must be "es" or "aoss", got "${awsService}"`,
      });
    }
    const region =
      Option.getOrUndefined(yield* optional("AWS_REGION")) ??
      Option.getOrUndefined(yield* optional("AWS_DEFAULT_REGION"));
    if (region === undefined) {
      return yield* new ConfigError({
        key: "AWS_REGION",
        message: "AWS_REGION environment variable is required for SigV4",
      });
    }
    return {
      endpoint,
      auth: {
        type: "sigv4",
        service: awsService,
        region,
        credentials: {
          accessKeyId: yield* EffectConfig.String("AWS_ACCESS_KEY_ID"),
          secretAccessKey: yield* EffectConfig.Redacted("AWS_SECRET_ACCESS_KEY"),
          sessionToken: Option.getOrUndefined(yield* optionalRedacted("AWS_SESSION_TOKEN")),
        },
      },
    } satisfies Config;
  }

  const token = Option.getOrUndefined(yield* optionalRedacted("OPENSEARCH_TOKEN"));
  if (token !== undefined) return { endpoint, auth: { type: "bearer", token } } satisfies Config;

  const username = Option.getOrUndefined(yield* optional("OPENSEARCH_USERNAME"));
  if (username !== undefined) {
    return {
      endpoint,
      auth: {
        type: "basic",
        username,
        password: yield* EffectConfig.Redacted("OPENSEARCH_PASSWORD"),
      },
    } satisfies Config;
  }

  return { endpoint, auth: { type: "none" } } satisfies Config;
}).pipe(
  // A provided ConfigProvider that cannot read its source fails with its
  // SourceError; report it as a configuration error like a missing value.
  Effect.mapError((error) =>
    error instanceof ConfigError
      ? error
      : new ConfigError({ message: `Cannot read OpenSearch configuration: ${error.message}` }),
  ),
);

/**
 * Reads the environment on every request:
 *
 *   - `OPENSEARCH_URL`: the endpoint (default `http://localhost:9200`).
 *   - `OPENSEARCH_AWS_SERVICE` (`es` or `aoss`): sign with SigV4, using
 *     `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN` and
 *     `AWS_REGION` (or `AWS_DEFAULT_REGION`).
 *   - else `OPENSEARCH_TOKEN`: `Authorization: Bearer <token>`.
 *   - else `OPENSEARCH_USERNAME` and `OPENSEARCH_PASSWORD`: basic auth.
 *   - else no authentication.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ layerOf(fromEnv);
