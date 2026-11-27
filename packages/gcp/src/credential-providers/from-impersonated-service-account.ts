/**
 * A service account impersonated with other credentials, with no key
 * file: the source credentials ask IAM Credentials for the service
 * account's token, or, to act as a Google Workspace user, ask it to sign
 * a JWT with `sub` set to that user, which is then exchanged at the OAuth
 * token endpoint. Google's Go client does the same in
 * `impersonate.CredentialsConfig.Subject`.
 */
import * as Effect from "effect/Effect";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  Credentials,
  createRefreshingProvider,
  type ProviderOverrides,
  type TokenSource,
} from "../credentials-service.ts";
import { GCPCredentialsError } from "../errors.ts";
import { impersonateServiceAccount } from "./from-workload-identity.ts";
import {
  CLOUD_PLATFORM_SCOPE,
  exchangeJwtBearer,
  iamCredentialsUrl,
  jwtBearerClaims,
  OAUTH_TOKEN_URL,
  requestJson,
} from "./oauth.ts";

export interface ImpersonatedServiceAccountConfig extends ProviderOverrides {
  /**
   * The credentials that impersonate, e.g. `fromMetadataServer()` on Cloud
   * Run or `fromWorkloadIdentity(...)`. Their token needs the
   * `cloud-platform` scope (every provider's default), and their principal
   * needs `roles/iam.serviceAccountTokenCreator` on `serviceAccountEmail`.
   */
  readonly source: Layer.Layer<Credentials>;
  /** The service account to act as. */
  readonly serviceAccountEmail: string;
  /**
   * Email of a Google Workspace user to act as (domain-wide delegation).
   * A Workspace admin must allow the service account's client ID for
   * `scopes`. Use one layer per user: each layer caches its own token.
   */
  readonly subject?: string | undefined;
  /** Defaults to `https://www.googleapis.com/auth/cloud-platform`. */
  readonly scopes?: ReadonlyArray<string> | undefined;
}

/** The token source behind {@link fromImpersonatedServiceAccount}. */
export const impersonatedServiceAccountSource = (
  config: ImpersonatedServiceAccountConfig,
): TokenSource =>
  Effect.gen(function* () {
    const resolve = yield* Credentials;
    const source = yield* resolve;
    const scopes = config.scopes ?? [CLOUD_PLATFORM_SCOPE];
    const email = config.serviceAccountEmail;
    if (config.subject === undefined) {
      const token = yield* impersonateServiceAccount(email, source, { scopes });
      return { ...token, project: source.project };
    }
    const step = `Signing a token for ${config.subject} as ${email}`;
    const url = yield* iamCredentialsUrl(email, "signJwt");
    const issuedAt = Date.now();
    const claims = jwtBearerClaims(
      { clientEmail: email, scopes, tokenUrl: OAUTH_TOKEN_URL, subject: config.subject },
      Math.floor(issuedAt / 1000),
    );
    const body = yield* requestJson(
      step,
      HttpClientRequest.post(url).pipe(
        HttpClientRequest.bearerToken(Redacted.value(source.accessToken)),
        // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `claims` is the strings and numbers that `jwtBearerClaims` builds
        HttpClientRequest.bodyJsonUnsafe({ payload: JSON.stringify(claims) }),
      ),
    );
    if (typeof body.signedJwt !== "string") {
      return yield* new GCPCredentialsError({ message: `${step} returned no signedJwt.` });
    }
    const token = yield* exchangeJwtBearer(
      `Exchanging the token signed for ${config.subject}`,
      OAUTH_TOKEN_URL,
      body.signedJwt,
      issuedAt,
    );
    return { ...token, project: source.project };
  }).pipe(Effect.provide(config.source));

/**
 * Credentials of a service account, impersonated with `source` and no key
 * file. With `subject`, the token acts as that Google Workspace user. The
 * token is cached and minted again five minutes before it expires;
 * concurrent requests share one mint.
 *
 * ```ts
 * fromImpersonatedServiceAccount({
 *   source: fromMetadataServer(),
 *   serviceAccountEmail: "workspace-bot@acme.iam.gserviceaccount.com",
 *   subject: "ana@example.com",
 *   scopes: ["https://www.googleapis.com/auth/gmail.settings.sharing"],
 * });
 * ```
 */
export const fromImpersonatedServiceAccount = (
  config: ImpersonatedServiceAccountConfig,
): Layer.Layer<Credentials> =>
  createRefreshingProvider(impersonatedServiceAccountSource(config), config);
