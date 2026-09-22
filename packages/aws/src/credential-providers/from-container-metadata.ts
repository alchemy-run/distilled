/**
 * Credentials from the container credential endpoint, as the ECS agent
 * serves it.
 */
import * as Effect from "effect/Effect";
import {
  type CredentialSource,
  CredentialSourceError,
  env,
  retry,
} from "./credential-source.ts";
import {
  DEFAULT_LINK_LOCAL_HOST,
  ENV_CMDS_AUTH_TOKEN,
  ENV_CMDS_FULL_URI,
  ENV_CMDS_RELATIVE_URI,
} from "./from-http.ts";
import {
  DEFAULT_TIMEOUT_MS,
  getHttpCredentials,
} from "./metadata-credentials.ts";

/**
 * The container credential endpoint (`AWS_CONTAINER_CREDENTIALS_*`). Differs
 * from `fromHttp` in accepting only the link-local or loopback hosts,
 * reading the token from the environment only, and not retrying by default.
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
