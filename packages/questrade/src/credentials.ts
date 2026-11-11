/**
 * Questrade credentials -- hand-written.
 *
 * Every Questrade call carries an OAuth 2.0 access token and goes to the API
 * server the token was issued for (`api_server`, e.g.
 * `https://api01.iq.questrade.com`). A personal app gets both by redeeming a
 * refresh token generated in the API Centre
 * (https://www.questrade.com/api/documentation/getting-started):
 *
 *   GET https://login.questrade.com/oauth2/token?grant_type=refresh_token&refresh_token=…
 *   → { access_token, token_type, expires_in, refresh_token, api_server }
 *
 * The access token lives 30 minutes, and each refresh token redeems ONCE:
 * the answer carries the next one. {@link fromRefreshToken} redeems on first
 * use, reuses the access token until shortly before it expires, then redeems
 * the refresh token it was last given. One redemption runs at a time, so
 * concurrent calls never spend the same refresh token twice. Pass
 * `onRefresh` to store each new refresh token: a program that does not keep
 * it cannot start again from the one it was given.
 *
 * {@link fromAccessToken} takes a token and API server you already hold
 * (no refresh), and {@link CredentialsFromEnv} reads either form from the
 * environment.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Semaphore from "effect/Semaphore";

/** The live login server; `https://practicelogin.questrade.com` serves practice accounts. */
export const DEFAULT_LOGIN_URL = "https://login.questrade.com";

/** Redeem again this long before the access token's reported expiry. */
const REFRESH_WINDOW_MS = 60_000;

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  /** The API server the token was issued for, without a trailing `/v1`. */
  readonly apiServer: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "QuestradeCredentials",
  ) {}

/** One redemption of a refresh token. */
export interface Tokens {
  readonly accessToken: Redacted.Redacted<string>;
  /** The refresh token to redeem next; the one just spent no longer works. */
  readonly refreshToken: Redacted.Redacted<string>;
  readonly apiServer: string;
  readonly expiresInSeconds: number;
}

export interface RefreshTokenConfig {
  readonly refreshToken: Redacted.Redacted<string>;
  /** Default {@link DEFAULT_LOGIN_URL}. */
  readonly loginUrl?: string;
  /** Called with every redemption, to store `tokens.refreshToken`. */
  readonly onRefresh?: (tokens: Tokens) => Effect.Effect<void>;
}

/** `https://api01.iq.questrade.com/` and `…/v1` → `https://api01.iq.questrade.com`. */
const normalizeApiServer = (url: string): string => url.replace(/\/+$/, "").replace(/\/v1$/, "");

const tokenError = (message: string) =>
  new ConfigError({ message: `Questrade refresh token redemption failed: ${message}` });

/** Redeem a refresh token at the login server. */
export const redeemRefreshToken = (
  refreshToken: Redacted.Redacted<string>,
  loginUrl: string = DEFAULT_LOGIN_URL,
): Effect.Effect<Tokens, ConfigError> =>
  Effect.gen(function* () {
    const url = new URL("/oauth2/token", loginUrl);
    url.searchParams.set("grant_type", "refresh_token");
    url.searchParams.set("refresh_token", Redacted.value(refreshToken));
    const response = yield* Effect.tryPromise({
      try: () => fetch(url, { headers: { accept: "application/json" } }),
      catch: (cause) => tokenError(`request to ${loginUrl} failed: ${String(cause)}`),
    });
    if (!response.ok) {
      // The body of a refused redemption is an HTML page or a bare message;
      // the status says enough, and the request URL holds the token.
      return yield* tokenError(
        `${loginUrl} answered ${response.status} ${response.statusText} ` +
          `(a refresh token redeems once — use the one the last redemption returned)`,
      );
    }
    const body = (yield* Effect.tryPromise({
      try: () => response.json(),
      catch: () => tokenError(`${loginUrl} answered with a body that is not JSON`),
    })) as Record<string, unknown> | null;
    const { access_token, refresh_token, api_server, expires_in } = body ?? {};
    if (
      typeof access_token !== "string" ||
      typeof refresh_token !== "string" ||
      typeof api_server !== "string"
    ) {
      return yield* tokenError("the answer has no access_token, refresh_token or api_server");
    }
    return {
      accessToken: Redacted.make(access_token),
      refreshToken: Redacted.make(refresh_token),
      apiServer: normalizeApiServer(api_server),
      expiresInSeconds: typeof expires_in === "number" && expires_in > 0 ? expires_in : 1800,
    };
  });

/**
 * A resolver that redeems `load`'s refresh token on first use, caches the
 * access token until shortly before it expires, and then redeems the
 * refresh token the last redemption returned.
 */
const refreshing = (
  load: Effect.Effect<RefreshTokenConfig, ConfigError>,
): Effect.Effect<Config, ConfigError> => {
  const lock = Semaphore.makeUnsafe(1);
  let next: Redacted.Redacted<string> | undefined;
  let cached: Config | undefined;
  let refreshAt = 0;
  const fresh = (): Config | undefined =>
    cached !== undefined && Date.now() < refreshAt ? cached : undefined;
  return Effect.suspend(() => {
    const hit = fresh();
    if (hit !== undefined) return Effect.succeed(hit);
    return Semaphore.withPermit(
      lock,
      Effect.gen(function* () {
        // Another fiber may have redeemed while this one waited.
        const raced = fresh();
        if (raced !== undefined) return raced;
        const config = yield* load;
        const tokens = yield* redeemRefreshToken(next ?? config.refreshToken, config.loginUrl);
        next = tokens.refreshToken;
        cached = { accessToken: tokens.accessToken, apiServer: tokens.apiServer };
        refreshAt =
          Date.now() +
          Math.max(tokens.expiresInSeconds * 1000 - REFRESH_WINDOW_MS, REFRESH_WINDOW_MS);
        if (config.onRefresh) yield* config.onRefresh(tokens);
        return cached;
      }),
    );
  });
};

/** Credentials from a refresh token, redeemed on first use and again before each expiry. */
export const fromRefreshToken = (config: RefreshTokenConfig): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, refreshing(Effect.succeed(config)));

/** Credentials from an access token and the API server it was issued for (no refresh). */
export const fromAccessToken = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiServer: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: config.accessToken,
      apiServer: normalizeApiServer(config.apiServer),
    }),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  accessToken: /*@__PURE__*/ EffectConfig.Redacted("QUESTRADE_ACCESS_TOKEN").pipe(
    EffectConfig.option,
  ),
  apiServer: /*@__PURE__*/ EffectConfig.String("QUESTRADE_API_SERVER").pipe(EffectConfig.option),
  refreshToken: /*@__PURE__*/ EffectConfig.Redacted("QUESTRADE_REFRESH_TOKEN").pipe(
    EffectConfig.option,
  ),
  loginUrl: /*@__PURE__*/ EffectConfig.String("QUESTRADE_LOGIN_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_LOGIN_URL),
  ),
});

const MISSING =
  "QUESTRADE_REFRESH_TOKEN, or QUESTRADE_ACCESS_TOKEN with QUESTRADE_API_SERVER, is required";

const fromEnvRefreshToken = /*@__PURE__*/ refreshing(
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(() => new ConfigError({ message: MISSING })),
    /*@__PURE__*/ Effect.flatMap(({ refreshToken, loginUrl }) =>
      Option.isSome(refreshToken)
        ? Effect.succeed({ refreshToken: refreshToken.value, loginUrl })
        : Effect.fail(new ConfigError({ message: MISSING })),
    ),
  ),
);

/**
 * `QUESTRADE_ACCESS_TOKEN` + `QUESTRADE_API_SERVER` when both are set;
 * otherwise `QUESTRADE_REFRESH_TOKEN`, redeemed at `QUESTRADE_LOGIN_URL`
 * (default {@link DEFAULT_LOGIN_URL}) on first use. The rotated refresh
 * tokens are kept in memory only — use {@link fromRefreshToken} with
 * `onRefresh` to store them.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(() => new ConfigError({ message: MISSING })),
    /*@__PURE__*/ Effect.flatMap(({ accessToken, apiServer }) =>
      Option.isSome(accessToken) && Option.isSome(apiServer)
        ? Effect.succeed({
            accessToken: accessToken.value,
            apiServer: normalizeApiServer(apiServer.value),
          })
        : fromEnvRefreshToken,
    ),
  ),
);
