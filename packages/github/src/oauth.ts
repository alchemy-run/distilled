/**
 * GitHub OAuth token exchange -- hand-written.
 *
 * The web application flow
 * (https://docs.github.com/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow)
 * ends with a `POST {web host}/login/oauth/access_token` that trades the
 * `code` GitHub redirected back with for a user access token. The endpoint
 * lives on the web host, not the API host, so the REST description has no
 * operation for it. GitHub Apps that expire user tokens refresh them at the
 * same endpoint
 * (https://docs.github.com/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens).
 *
 * GitHub answers a refused exchange with HTTP 200 and an `error` field
 * (`{ "error": "bad_verification_code", "error_description": … }`). Each
 * documented `error` fails with its own tagged error; any other fails with
 * `GithubOAuthError`.
 *
 * @example
 * ```ts
 * import * as OAuth from "@distilled.cloud/github/OAuth";
 *
 * const token = yield* OAuth.exchangeWebFlowCode({
 *   client_id: "Iv1.0123456789abcdef",
 *   client_secret: Redacted.make(secret),
 *   code,
 * }).pipe(Effect.catchTag("BadVerificationCode", () => restartLogin));
 * ```
 */
import * as Category from "@distilled.cloud/core/category";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import { DEFAULT_USER_AGENT } from "./credentials.ts";
import { GithubParseError } from "./errors.ts";

/** github.com's web host. GHES uses `https://HOSTNAME`. */
export const DEFAULT_WEB_BASE_URL = "https://github.com";

const errorFields = {
  message: Schema.String,
  /** GitHub's page about the error. */
  error_uri: /*@__PURE__*/ Schema.optional(Schema.String),
};

/** The `code` is wrong, already used, or expired (codes last ten minutes). */
export class BadVerificationCode
  extends /*@__PURE__*/ Schema.TaggedError<BadVerificationCode>()(
    "BadVerificationCode",
    errorFields,
  ).pipe(Category.withBadRequestError) {}

/** The `client_id` or `client_secret` is wrong. */
export class IncorrectClientCredentials
  extends /*@__PURE__*/ Schema.TaggedError<IncorrectClientCredentials>()(
    "IncorrectClientCredentials",
    errorFields,
  ).pipe(Category.withAuthError) {}

/** The `redirect_uri` does not match the one the App registered. */
export class RedirectUriMismatch
  extends /*@__PURE__*/ Schema.TaggedError<RedirectUriMismatch>()(
    "RedirectUriMismatch",
    errorFields,
  ).pipe(Category.withBadRequestError) {}

/** The user has no verified primary email address. */
export class UnverifiedUserEmail
  extends /*@__PURE__*/ Schema.TaggedError<UnverifiedUserEmail>()(
    "UnverifiedUserEmail",
    errorFields,
  ).pipe(Category.withBadRequestError) {}

/** The `refresh_token` is wrong, already used, or expired. */
export class BadRefreshToken
  extends /*@__PURE__*/ Schema.TaggedError<BadRefreshToken>()("BadRefreshToken", errorFields).pipe(
    Category.withBadRequestError,
  ) {}

/** A refused exchange whose `error` has no class of its own. */
export class GithubOAuthError
  extends /*@__PURE__*/ Schema.TaggedError<GithubOAuthError>()("GithubOAuthError", {
    ...errorFields,
    /** GitHub's `error` code. */
    error: Schema.String,
  }).pipe(Category.withBadRequestError) {}

const ERRORS = {
  bad_verification_code: BadVerificationCode,
  incorrect_client_credentials: IncorrectClientCredentials,
  redirect_uri_mismatch: RedirectUriMismatch,
  unverified_user_email: UnverifiedUserEmail,
  bad_refresh_token: BadRefreshToken,
} as const;

/** A user access token. */
export interface UserAccessToken {
  readonly access_token: Redacted.Redacted<string>;
  /** `bearer`. */
  readonly token_type: string;
  /** Comma-separated scopes the user granted (OAuth Apps; empty for GitHub Apps). */
  readonly scope: string;
  /** Seconds until `access_token` expires, when the App expires user tokens. */
  readonly expires_in?: number;
  /** Trades for a new token with {@link refreshUserAccessToken}. */
  readonly refresh_token?: Redacted.Redacted<string>;
  /** Seconds until `refresh_token` expires. */
  readonly refresh_token_expires_in?: number;
}

export type OAuthExchangeError =
  | BadVerificationCode
  | IncorrectClientCredentials
  | RedirectUriMismatch
  | UnverifiedUserEmail
  | BadRefreshToken
  | GithubOAuthError
  | GithubParseError
  | HttpClientError.HttpClientError;

interface Endpoint {
  /** Defaults to `https://github.com`; GHES uses `https://HOSTNAME`. */
  readonly webBaseUrl?: string;
  readonly userAgent?: string;
}

export interface ExchangeWebFlowCodeRequest extends Endpoint {
  readonly client_id: string;
  readonly client_secret: string | Redacted.Redacted<string>;
  /** The `code` GitHub redirected back with. */
  readonly code: string;
  /** The `redirect_uri` the authorize request sent, if it sent one. */
  readonly redirect_uri?: string;
  /** The PKCE verifier whose challenge the authorize request sent. */
  readonly code_verifier?: string;
}

export interface RefreshUserAccessTokenRequest extends Endpoint {
  readonly client_id: string;
  readonly client_secret: string | Redacted.Redacted<string>;
  readonly refresh_token: string | Redacted.Redacted<string>;
}

const reveal = (value: string | Redacted.Redacted<string>): string =>
  Redacted.isRedacted(value) ? Redacted.value(value) : value;

const optionalNumber = (value: unknown): number | undefined =>
  typeof value === "number" ? value : undefined;

const exchange = (
  endpoint: Endpoint,
  params: Record<string, string | undefined>,
): Effect.Effect<UserAccessToken, OAuthExchangeError, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const client = (yield* HttpClient.HttpClient).pipe(HttpClient.filterStatusOk);
    const response = yield* client.execute(
      HttpClientRequest.post(
        `${endpoint.webBaseUrl ?? DEFAULT_WEB_BASE_URL}/login/oauth/access_token`,
      ).pipe(
        HttpClientRequest.setHeaders({
          Accept: "application/json",
          "User-Agent": endpoint.userAgent ?? DEFAULT_USER_AGENT,
        }),
        HttpClientRequest.bodyUrlParams(
          Object.fromEntries(
            Object.entries(params).filter((entry): entry is [string, string] => !!entry[1]),
          ),
        ),
      ),
    );
    const body = yield* response.json;
    const fields: Record<string, unknown> =
      body !== null && typeof body === "object" ? (body as Record<string, unknown>) : {};
    if (typeof fields.error === "string") {
      const message =
        typeof fields.error_description === "string" ? fields.error_description : fields.error;
      const error_uri = typeof fields.error_uri === "string" ? fields.error_uri : undefined;
      const ErrorClass = ERRORS[fields.error as keyof typeof ERRORS];
      return yield* ErrorClass
        ? Effect.fail(new ErrorClass({ message, error_uri }))
        : Effect.fail(new GithubOAuthError({ message, error_uri, error: fields.error }));
    }
    if (typeof fields.access_token !== "string") {
      return yield* Effect.fail(
        new GithubParseError({ body: "[REDACTED]", cause: "No access_token in the response" }),
      );
    }
    return {
      access_token: Redacted.make(fields.access_token),
      token_type: typeof fields.token_type === "string" ? fields.token_type : "bearer",
      scope: typeof fields.scope === "string" ? fields.scope : "",
      expires_in: optionalNumber(fields.expires_in),
      refresh_token:
        typeof fields.refresh_token === "string" ? Redacted.make(fields.refresh_token) : undefined,
      refresh_token_expires_in: optionalNumber(fields.refresh_token_expires_in),
    };
  });

/**
 * Trade the `code` from the web application flow's redirect for a user
 * access token. A wrong, used or expired code fails with
 * `BadVerificationCode`; wrong App credentials with
 * `IncorrectClientCredentials`.
 */
export const exchangeWebFlowCode = (
  request: ExchangeWebFlowCodeRequest,
): Effect.Effect<UserAccessToken, OAuthExchangeError, HttpClient.HttpClient> =>
  exchange(request, {
    client_id: request.client_id,
    client_secret: reveal(request.client_secret),
    code: request.code,
    redirect_uri: request.redirect_uri,
    code_verifier: request.code_verifier,
  });

/**
 * Trade a refresh token for a new user access token (GitHub Apps that
 * expire user tokens). A wrong, used or expired refresh token fails with
 * `BadRefreshToken`.
 */
export const refreshUserAccessToken = (
  request: RefreshUserAccessTokenRequest,
): Effect.Effect<UserAccessToken, OAuthExchangeError, HttpClient.HttpClient> =>
  exchange(request, {
    client_id: request.client_id,
    client_secret: reveal(request.client_secret),
    grant_type: "refresh_token",
    refresh_token: reveal(request.refresh_token),
  });
