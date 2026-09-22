/**
 * Credentials from an HTTP credential endpoint: ECS task roles, EKS pod
 * identity, and local credential agents.
 */
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Schedule from "effect/Schedule";
import {
  type CredentialSource,
  CredentialSourceError,
  env,
} from "./credential-source.ts";
import {
  DEFAULT_TIMEOUT_MS,
  getHttpCredentials,
} from "./metadata-credentials.ts";

export const ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
export const ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
export const ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
const ENV_CMDS_AUTH_TOKEN_FILE = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE";
const CMDS_IP = "169.254.170.2";
export const DEFAULT_LINK_LOCAL_HOST = `http://${CMDS_IP}`;

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
