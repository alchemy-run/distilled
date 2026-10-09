/**
 * A user's OAuth refresh token (AIP-4113) — what
 * `gcloud auth application-default login` writes as an `authorized_user`
 * file — exchanged for access tokens at Google's OAuth endpoint.
 */
import * as Effect from "effect/Effect";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  type Credentials,
  createRefreshingProvider,
  type ProviderOverrides,
  type TokenSource,
} from "../credentials-service.ts";
import { GCPCredentialsError } from "../errors.ts";
import { OAUTH_TOKEN_URL, oauthToken, requestJson } from "./oauth.ts";

export interface AuthorizedUserConfig extends ProviderOverrides {
  readonly clientId: string;
  readonly clientSecret: Redacted.Redacted<string>;
  readonly refreshToken: Redacted.Redacted<string>;
  /**
   * Scopes to request. Leave unset to get the scopes the user granted at
   * login (`cloud-platform` for gcloud); a scope they did not grant fails.
   */
  readonly scopes?: ReadonlyArray<string>;
  /** Defaults to `https://oauth2.googleapis.com/token`. */
  readonly tokenUrl?: string;
}

/** The token source behind {@link fromAuthorizedUser}. */
export const authorizedUserSource = (config: AuthorizedUserConfig): TokenSource =>
  Effect.gen(function* () {
    const step = "Refreshing the user's access token";
    const issuedAt = Date.now();
    const body = yield* requestJson(
      step,
      HttpClientRequest.post(config.tokenUrl ?? OAUTH_TOKEN_URL).pipe(
        HttpClientRequest.bodyUrlParams({
          grant_type: "refresh_token",
          client_id: config.clientId,
          client_secret: Redacted.value(config.clientSecret),
          refresh_token: Redacted.value(config.refreshToken),
          ...(config.scopes?.length ? { scope: config.scopes.join(" ") } : {}),
        }),
      ),
    ).pipe(
      Effect.mapError(
        (error) =>
          new GCPCredentialsError({
            message: `${error.message.replace(/\.?$/, ".")} Run \`gcloud auth application-default login\` if the login has expired or needs reauthentication.`,
            status: error.status,
            cause: error.cause,
          }),
      ),
    );
    return yield* oauthToken(step, body, issuedAt);
  });

/**
 * Credentials from a user's OAuth refresh token, refreshed five minutes
 * before each access token expires. `fromApplicationDefault` reads these
 * values from the file `gcloud auth application-default login` writes.
 */
export const fromAuthorizedUser = (config: AuthorizedUserConfig): Layer.Layer<Credentials> =>
  createRefreshingProvider(authorizedUserSource(config), config);
