/**
 * Credential sources that need nothing but an HTTP client, so they are safe
 * to ship in the browser build as well as the Node one: the environment, the
 * HTTP / container endpoints, and the EC2 instance metadata service.
 *
 * Every source is an `Effect<AwsCredentialIdentity, CredentialSourceError>`.
 * The resolution rules (which variables are read, how responses are
 * validated, when a chain may fall through) follow the AWS SDK v3 providers
 * this module replaces.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Data from "effect/Data";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Schedule from "effect/Schedule";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";

/**
 * A single credential source could not produce credentials.
 *
 * `tryNextLink` is what a chain looks at: `false` means the failure is
 * final (e.g. a malformed URL, an MFA prompt that cannot be answered) and
 * the chain stops there instead of trying the next source.
 */
export class CredentialSourceError extends Data.TaggedError(
  "AWS::CredentialSourceError",
)<{
  message: string;
  tryNextLink?: boolean;
  cause?: unknown;
}> {}

export type CredentialSource = Effect.Effect<
  AwsCredentialIdentity,
  CredentialSourceError,
  never
>;

/** `process.env[name]`, or `undefined` where there is no `process`. */
export const env = (name: string): string | undefined =>
  typeof process !== "undefined" ? process.env?.[name] : undefined;

/**
 * Try each source in order. A source failing with `tryNextLink: false` stops
 * the chain; otherwise the next one runs. When every source fails, the last
 * failure is the chain's failure.
 */
export const chain = (
  sources: ReadonlyArray<CredentialSource>,
): CredentialSource =>
  Effect.suspend(() => {
    const step = (
      index: number,
      last: CredentialSourceError | undefined,
    ): CredentialSource => {
      if (index >= sources.length) {
        return Effect.fail(
          last ??
            new CredentialSourceError({
              message: "No credential sources configured.",
              tryNextLink: false,
            }),
        );
      }
      return sources[index].pipe(
        Effect.catch((error) =>
          error.tryNextLink === false
            ? Effect.fail(error)
            : step(index + 1, error),
        ),
      );
    };
    return step(0, undefined);
  });

/**
 * Run `effect` with the fiber's `HttpClient` when one is in scope (an
 * operation always has one), else with the platform `fetch` client. This
 * keeps every credentials layer free of requirements while still letting a
 * caller inject a client, e.g. in tests.
 */
export const withHttpClient = <A, E>(
  effect: Effect.Effect<A, E, HttpClient.HttpClient>,
): Effect.Effect<A, E> =>
  Effect.serviceOption(HttpClient.HttpClient).pipe(
    Effect.flatMap((client) =>
      Option.isSome(client)
        ? Effect.provideService(effect, HttpClient.HttpClient, client.value)
        : Effect.provide(effect, FetchHttpClient.layer),
    ),
  );

interface TextResponse {
  readonly status: number;
  readonly text: string;
}

/**
 * Execute a request and read the whole body. Non-2xx statuses are returned,
 * not failed, because IMDS in particular branches on them.
 */
export const requestText = (
  request: HttpClientRequest.HttpClientRequest,
  timeoutMs: number,
): Effect.Effect<TextResponse, CredentialSourceError> =>
  HttpClient.execute(request).pipe(
    Effect.flatMap((response) =>
      Effect.map(response.text, (text) => ({ status: response.status, text })),
    ),
    Effect.timeout(timeoutMs),
    Effect.mapError(
      (cause) =>
        new CredentialSourceError({
          message:
            cause._tag === "TimeoutError"
              ? "TimeoutError"
              : `Request to ${request.url} failed: ${String(cause)}`,
          cause,
        }),
    ),
    withHttpClient,
  );

/** Re-run `effect` up to `maxRetries` more times after a failure. */
export const retry = <A, E>(
  effect: Effect.Effect<A, E>,
  maxRetries: number,
): Effect.Effect<A, E> =>
  maxRetries > 0 ? Effect.retry(effect, { times: maxRetries }) : effect;

/**
 * The JSON document the container, HTTP and instance metadata endpoints all
 * return.
 */
interface ImdsCredentials {
  AccessKeyId: string;
  SecretAccessKey: string;
  Token: string;
  Expiration: string;
  AccountId?: string;
}

const isImdsCredentials = (arg: unknown): arg is ImdsCredentials =>
  typeof arg === "object" &&
  arg !== null &&
  typeof (arg as ImdsCredentials).AccessKeyId === "string" &&
  typeof (arg as ImdsCredentials).SecretAccessKey === "string" &&
  typeof (arg as ImdsCredentials).Token === "string" &&
  typeof (arg as ImdsCredentials).Expiration === "string";

const fromImdsCredentials = (
  creds: ImdsCredentials,
): AwsCredentialIdentity => ({
  accessKeyId: creds.AccessKeyId,
  secretAccessKey: creds.SecretAccessKey,
  sessionToken: creds.Token,
  expiration: new Date(creds.Expiration),
  ...(creds.AccountId && { accountId: creds.AccountId }),
});

const parseImdsCredentials = (
  text: string,
): Effect.Effect<AwsCredentialIdentity, CredentialSourceError> =>
  Effect.try({
    try: () => JSON.parse(text) as unknown,
    catch: (cause) =>
      new CredentialSourceError({
        message: "Invalid response received from instance metadata service.",
        cause,
      }),
  }).pipe(
    Effect.flatMap((parsed) =>
      isImdsCredentials(parsed)
        ? Effect.succeed(fromImdsCredentials(parsed))
        : Effect.fail(
            new CredentialSourceError({
              message:
                "Invalid response received from instance metadata service.",
            }),
          ),
    ),
  );

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

export const ENV_KEY = "AWS_ACCESS_KEY_ID";
export const ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
const ENV_SESSION = "AWS_SESSION_TOKEN";
const ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
const ENV_CREDENTIAL_SCOPE = "AWS_CREDENTIAL_SCOPE";
const ENV_ACCOUNT_ID = "AWS_ACCOUNT_ID";

/** `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` and friends. */
export const fromEnv: CredentialSource = Effect.suspend(() => {
  const accessKeyId = env(ENV_KEY);
  const secretAccessKey = env(ENV_SECRET);
  const sessionToken = env(ENV_SESSION);
  const expiry = env(ENV_EXPIRATION);
  const credentialScope = env(ENV_CREDENTIAL_SCOPE);
  const accountId = env(ENV_ACCOUNT_ID);
  if (accessKeyId && secretAccessKey) {
    return Effect.succeed<AwsCredentialIdentity>({
      accessKeyId,
      secretAccessKey,
      ...(sessionToken && { sessionToken }),
      ...(expiry && { expiration: new Date(expiry) }),
      ...(credentialScope && { credentialScope }),
      ...(accountId && { accountId }),
    });
  }
  return Effect.fail(
    new CredentialSourceError({
      message: "Unable to find environment variable credentials.",
    }),
  );
});

// ---------------------------------------------------------------------------
// HTTP credential endpoint (ECS / EKS pod identity / local agents)
// ---------------------------------------------------------------------------

export const ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
export const ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
const ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
const ENV_CMDS_AUTH_TOKEN_FILE = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE";
const CMDS_IP = "169.254.170.2";
const DEFAULT_LINK_LOCAL_HOST = `http://${CMDS_IP}`;

const DEFAULT_TIMEOUT_MS = 1000;

/**
 * Only HTTPS, loopback, or the ECS / EKS link-local hosts may serve
 * credentials over plain HTTP.
 */
const checkUrl = (url: URL): CredentialSourceError | undefined => {
  if (url.protocol === "https:") return;
  const host = url.hostname;
  if (
    host === CMDS_IP ||
    host === "169.254.170.23" ||
    host === "[fd00:ec2::23]"
  )
    return;
  if (host.includes("[")) {
    if (
      host === "[::1]" ||
      host === "[0000:0000:0000:0000:0000:0000:0000:0001]"
    )
      return;
  } else {
    if (host === "localhost") return;
    const parts = host.split(".");
    const inRange = (part: string) => {
      const n = parseInt(part, 10);
      return 0 <= n && n <= 255;
    };
    if (
      parts.length === 4 &&
      parts[0] === "127" &&
      inRange(parts[1]) &&
      inRange(parts[2]) &&
      inRange(parts[3])
    )
      return;
  }
  return new CredentialSourceError({
    message: `URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`,
  });
};

const validateToken = (token: string) =>
  token.includes("\r\n")
    ? Effect.fail(
        new CredentialSourceError({
          message: "Authorization token contains invalid \\r\\n sequence.",
        }),
      )
    : Effect.succeed(token);

const getHttpCredentials = (
  url: URL,
  authorization: string | undefined,
  timeoutMs: number,
): CredentialSource =>
  requestText(
    HttpClientRequest.get(url, {
      headers: authorization ? { Authorization: authorization } : undefined,
    }),
    timeoutMs,
  ).pipe(
    Effect.flatMap(({ status, text }) => {
      if (status === 200) {
        return parseImdsCredentials(text).pipe(
          Effect.mapError(
            () =>
              new CredentialSourceError({
                message:
                  "HTTP credential provider response not of the required format, an object matching: " +
                  "{ AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }",
              }),
          ),
        );
      }
      let detail = "";
      if (status >= 400 && status < 500) {
        try {
          const body = JSON.parse(text) as { Code?: string; Message?: string };
          if (body.Code || body.Message)
            detail = ` ${body.Code ?? ""} ${body.Message ?? ""}`.trimEnd();
        } catch {
          // The body is optional and need not be JSON.
        }
      }
      return Effect.fail(
        new CredentialSourceError({
          message: `Server responded with status: ${status}${detail}`,
        }),
      );
    }),
  );

export interface FromHttpOptions {
  /**
   * Reads `AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE`. Supplied by the Node
   * entry point; without it a token file cannot be used.
   */
  readonly readFile?: (path: string) => Effect.Effect<string, unknown>;
  readonly timeout?: number;
  readonly maxRetries?: number;
}

let httpWarningsEmitted = false;

/**
 * Credentials from the endpoint named by
 * `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` (resolved against the ECS
 * link-local host) or `AWS_CONTAINER_CREDENTIALS_FULL_URI`, optionally with
 * an `Authorization` token from `AWS_CONTAINER_AUTHORIZATION_TOKEN[_FILE]`.
 */
export const fromHttp = (options: FromHttpOptions = {}): CredentialSource =>
  Effect.suspend(() => {
    const relative = env(ENV_CMDS_RELATIVE_URI);
    const full = env(ENV_CMDS_FULL_URI);
    const token = env(ENV_CMDS_AUTH_TOKEN);
    const tokenFile = env(ENV_CMDS_AUTH_TOKEN_FILE);
    if (!httpWarningsEmitted) {
      if (relative && full) {
        httpWarningsEmitted = true;
        console.warn(
          `Both ${ENV_CMDS_RELATIVE_URI} and ${ENV_CMDS_FULL_URI} are set; ${ENV_CMDS_RELATIVE_URI} takes precedence.`,
        );
      }
      if (token && tokenFile) {
        httpWarningsEmitted = true;
        console.warn(
          `Both ${ENV_CMDS_AUTH_TOKEN} and ${ENV_CMDS_AUTH_TOKEN_FILE} are set; ${ENV_CMDS_AUTH_TOKEN_FILE} takes precedence.`,
        );
      }
    }
    const host = relative ? `${DEFAULT_LINK_LOCAL_HOST}${relative}` : full;
    if (!host) {
      return Effect.fail(
        new CredentialSourceError({
          message: `No HTTP credential provider host provided.
Set ${ENV_CMDS_FULL_URI} or ${ENV_CMDS_RELATIVE_URI}.`,
        }),
      );
    }
    let url: URL;
    try {
      url = new URL(host);
    } catch (cause) {
      return Effect.fail(
        new CredentialSourceError({
          message: `${host} is not a valid credential provider URL`,
          cause,
        }),
      );
    }
    const rejected = checkUrl(url);
    if (rejected) return Effect.fail(rejected);

    const timeoutMs = options.timeout ?? DEFAULT_TIMEOUT_MS;
    const authorization: Effect.Effect<
      string | undefined,
      CredentialSourceError
    > = tokenFile
      ? options.readFile
        ? options.readFile(tokenFile).pipe(
            Effect.mapError(
              (cause) =>
                new CredentialSourceError({
                  message: `Could not read ${ENV_CMDS_AUTH_TOKEN_FILE} ${tokenFile}.`,
                  cause,
                }),
            ),
            Effect.flatMap(validateToken),
          )
        : Effect.fail(
            new CredentialSourceError({
              message: `${ENV_CMDS_AUTH_TOKEN_FILE} is not supported in this runtime.`,
            }),
          )
      : token
        ? validateToken(token)
        : Effect.succeed(undefined);

    const attempt = authorization.pipe(
      Effect.flatMap((auth) => getHttpCredentials(url, auth, timeoutMs)),
    );
    // Like the SDK: up to `maxRetries` retries, waiting `timeout` between.
    const maxRetries = options.maxRetries ?? 3;
    return maxRetries > 0
      ? Effect.retry(attempt, {
          schedule: Schedule.spaced(Duration.millis(timeoutMs)).pipe(
            Schedule.upTo({ times: maxRetries }),
          ),
        })
      : attempt;
  });

/**
 * The container credential endpoint (`AWS_CONTAINER_CREDENTIALS_*`), as the
 * ECS agent serves it. Differs from {@link fromHttp} in accepting only the
 * link-local or loopback hosts, reading the token from the environment
 * only, and not retrying by default.
 */
export const fromContainerMetadata = (
  options: { timeout?: number; maxRetries?: number } = {},
): CredentialSource =>
  retry(
    Effect.suspend(() => {
      const relative = env(ENV_CMDS_RELATIVE_URI);
      const full = env(ENV_CMDS_FULL_URI);
      let url: URL;
      if (relative) {
        url = new URL(relative, DEFAULT_LINK_LOCAL_HOST);
      } else if (full) {
        try {
          url = new URL(full);
        } catch {
          return Effect.fail(
            new CredentialSourceError({
              message: `${full} is not a valid container metadata service URL`,
              tryNextLink: false,
            }),
          );
        }
        if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
          return Effect.fail(
            new CredentialSourceError({
              message: `${url.hostname} is not a valid container metadata service hostname`,
              tryNextLink: false,
            }),
          );
        }
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          return Effect.fail(
            new CredentialSourceError({
              message: `${url.protocol} is not a valid container metadata service protocol`,
              tryNextLink: false,
            }),
          );
        }
      } else {
        return Effect.fail(
          new CredentialSourceError({
            message:
              "The container metadata credential provider cannot be used unless" +
              ` the ${ENV_CMDS_RELATIVE_URI} or ${ENV_CMDS_FULL_URI} environment` +
              " variable is set",
            tryNextLink: false,
          }),
        );
      }
      return getHttpCredentials(
        url,
        env(ENV_CMDS_AUTH_TOKEN),
        options.timeout ?? DEFAULT_TIMEOUT_MS,
      );
    }),
    options.maxRetries ?? 0,
  );

// ---------------------------------------------------------------------------
// EC2 instance metadata service
// ---------------------------------------------------------------------------

const IMDS_PATH = "/latest/meta-data/iam/security-credentials/";
const IMDS_TOKEN_PATH = "/latest/api/token";
const X_AWS_EC2_METADATA_TOKEN = "x-aws-ec2-metadata-token";
const ENV_IMDS_ENDPOINT = "AWS_EC2_METADATA_SERVICE_ENDPOINT";
const ENV_IMDS_ENDPOINT_MODE = "AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE";
const ENV_IMDS_V1_DISABLED = "AWS_EC2_METADATA_V1_DISABLED";

export interface FromInstanceMetadataOptions {
  readonly timeout?: number;
  readonly maxRetries?: number;
  /** Refuse to fall back to IMDSv1 when no session token can be obtained. */
  readonly ec2MetadataV1Disabled?: boolean;
  /**
   * `~/.aws/config` values for the active profile
   * (`ec2_metadata_service_endpoint`, `ec2_metadata_service_endpoint_mode`,
   * `ec2_metadata_v1_disabled`). The Node entry point reads them; the
   * environment always wins.
   */
  readonly profileConfig?: Effect.Effect<
    Readonly<Record<string, string | undefined>> | undefined
  >;
}

const instanceMetadataEndpoint = (
  profileConfig: Readonly<Record<string, string | undefined>> | undefined,
): Effect.Effect<string, CredentialSourceError> => {
  const endpoint =
    env(ENV_IMDS_ENDPOINT) ?? profileConfig?.ec2_metadata_service_endpoint;
  if (endpoint) return Effect.succeed(endpoint);
  const mode =
    env(ENV_IMDS_ENDPOINT_MODE) ??
    profileConfig?.ec2_metadata_service_endpoint_mode ??
    "IPv4";
  switch (mode) {
    case "IPv4":
      return Effect.succeed("http://169.254.169.254");
    case "IPv6":
      return Effect.succeed("http://[fd00:ec2::254]");
    default:
      return Effect.fail(
        new CredentialSourceError({
          message: `Unsupported endpoint mode: ${mode}. Select from IPv4, IPv6`,
          tryNextLink: false,
        }),
      );
  }
};

const STATIC_STABILITY_REFRESH_INTERVAL_SECONDS = 5 * 60;
const STATIC_STABILITY_DOC_URL =
  "https://docs.aws.amazon.com/sdkref/latest/guide/feature-static-credentials.html";

/**
 * When IMDS is unreachable, keep using the last credentials it handed out
 * and retry in 5–10 minutes rather than failing the request outright.
 */
const extendCredentials = (
  credentials: AwsCredentialIdentity,
): AwsCredentialIdentity => {
  const refreshInterval =
    STATIC_STABILITY_REFRESH_INTERVAL_SECONDS +
    Math.floor(Math.random() * STATIC_STABILITY_REFRESH_INTERVAL_SECONDS);
  const expiration = new Date(Date.now() + refreshInterval * 1000);
  console.warn(
    "Attempting credential expiration extension due to a credential service availability issue. A refresh of these " +
      `credentials will be attempted after ${expiration}.\nFor more information, please visit: ` +
      STATIC_STABILITY_DOC_URL,
  );
  return { ...credentials, expiration };
};

/**
 * Credentials of the instance role, from IMDSv2 with a fall back to IMDSv1
 * unless `AWS_EC2_METADATA_V1_DISABLED` (or the profile) forbids it.
 *
 * Each call to `fromInstanceMetadata` owns its own state: whether v1 is in
 * use and the last credentials served, for static stability.
 */
export const fromInstanceMetadata = (
  options: FromInstanceMetadataOptions = {},
): CredentialSource => {
  const timeoutMs = options.timeout ?? DEFAULT_TIMEOUT_MS;
  const maxRetries = options.maxRetries ?? 0;
  let disableFetchToken = false;
  let pastCredentials: AwsCredentialIdentity | undefined;

  const imdsRequest = (
    endpoint: string,
    path: string,
    method: "GET" | "PUT",
    headers: Record<string, string>,
  ) =>
    requestText(
      HttpClientRequest.make(method)(`${endpoint}${path}`, { headers }),
      timeoutMs,
    ).pipe(
      Effect.flatMap(({ status, text }) =>
        status >= 200 && status < 300
          ? Effect.succeed(text)
          : Effect.fail(
              new CredentialSourceError({
                message: `Error response received from instance metadata service (status ${status})`,
                cause: { statusCode: status },
              }),
            ),
      ),
    );

  const statusOf = (error: CredentialSourceError): number | undefined =>
    typeof error.cause === "object" && error.cause !== null
      ? (error.cause as { statusCode?: number }).statusCode
      : undefined;

  const v1FallbackBlocked = (
    profileConfig: Readonly<Record<string, string | undefined>> | undefined,
  ): CredentialSourceError | undefined => {
    const envValue = env(ENV_IMDS_V1_DISABLED);
    const blockedByEnv = !!envValue && envValue !== "false";
    const profileValue =
      envValue === undefined
        ? profileConfig?.ec2_metadata_v1_disabled
        : undefined;
    const blockedByProfile = !!profileValue && profileValue !== "false";
    if (!options.ec2MetadataV1Disabled && !blockedByEnv && !blockedByProfile)
      return;
    const causes: string[] = [];
    if (options.ec2MetadataV1Disabled)
      causes.push(
        "credential provider initialization (runtime option ec2MetadataV1Disabled)",
      );
    if (blockedByProfile)
      causes.push("config file profile (ec2_metadata_v1_disabled)");
    if (blockedByEnv)
      causes.push(`process environment variable (${ENV_IMDS_V1_DISABLED})`);
    return new CredentialSourceError({
      message: `AWS EC2 Metadata v1 fallback has been blocked by AWS SDK configuration in the following: [${causes.join(", ")}].`,
      tryNextLink: false,
    });
  };

  const getCredentials = (
    endpoint: string,
    headers: Record<string, string>,
    profileConfig: Readonly<Record<string, string | undefined>> | undefined,
  ): CredentialSource =>
    Effect.suspend(() => {
      const isV1 =
        disableFetchToken || headers[X_AWS_EC2_METADATA_TOKEN] === undefined;
      if (isV1) {
        const blocked = v1FallbackBlocked(profileConfig);
        if (blocked) return Effect.fail(blocked);
      }
      const onUnauthorized = (error: CredentialSourceError) => {
        if (statusOf(error) === 401) disableFetchToken = false;
        return Effect.fail(error);
      };
      return retry(
        imdsRequest(endpoint, IMDS_PATH, "GET", headers).pipe(
          Effect.catch(onUnauthorized),
        ),
        maxRetries,
      ).pipe(
        Effect.flatMap((profile) =>
          retry(
            imdsRequest(
              endpoint,
              IMDS_PATH + profile.trim(),
              "GET",
              headers,
            ).pipe(
              Effect.catch(onUnauthorized),
              Effect.flatMap(parseImdsCredentials),
            ),
            maxRetries,
          ),
        ),
      );
    });

  const resolve: CredentialSource = Effect.gen(function* () {
    const profileConfig = options.profileConfig
      ? yield* options.profileConfig
      : undefined;
    const endpoint = yield* instanceMetadataEndpoint(profileConfig);
    if (disableFetchToken) {
      return yield* getCredentials(endpoint, {}, profileConfig);
    }
    const token = yield* imdsRequest(endpoint, IMDS_TOKEN_PATH, "PUT", {
      "x-aws-ec2-metadata-token-ttl-seconds": "21600",
    }).pipe(
      Effect.map((token) => Option.some(token)),
      Effect.catch((error) => {
        const status = statusOf(error);
        if (status === 400) {
          return Effect.fail(
            new CredentialSourceError({
              message: "EC2 Metadata token request returned error",
              cause: error,
            }),
          );
        }
        if (
          error.message === "TimeoutError" ||
          status === 403 ||
          status === 404 ||
          status === 405
        ) {
          disableFetchToken = true;
        }
        return Effect.succeed(Option.none<string>());
      }),
    );
    return yield* getCredentials(
      endpoint,
      Option.isSome(token) ? { [X_AWS_EC2_METADATA_TOKEN]: token.value } : {},
      profileConfig,
    );
  });

  return resolve.pipe(
    Effect.map((credentials) =>
      credentials.expiration && credentials.expiration.getTime() < Date.now()
        ? extendCredentials(credentials)
        : credentials,
    ),
    Effect.catch((error): CredentialSource =>
      pastCredentials
        ? Effect.sync(() => {
            console.warn("Credential renew failed: ", error);
            return extendCredentials(pastCredentials!);
          })
        : Effect.fail(error),
    ),
    Effect.map((credentials) => {
      pastCredentials = credentials;
      return credentials;
    }),
  );
};
