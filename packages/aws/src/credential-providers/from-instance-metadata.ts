/**
 * Credentials of the EC2 instance role, from the instance metadata service.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import {
  type CredentialSource,
  CredentialSourceError,
  env,
  retry,
} from "./credential-source.ts";
import { requestText } from "./http-client.ts";
import {
  DEFAULT_TIMEOUT_MS,
  parseImdsCredentials,
} from "./metadata-credentials.ts";

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
