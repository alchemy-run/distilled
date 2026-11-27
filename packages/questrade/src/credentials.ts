/**
 * Questrade credentials -- hand-written.
 *
 * Every Questrade call carries an OAuth 2.0 access token and goes to the API
 * server the token was issued for (`api_server`, e.g.
 * `https://api01.iq.questrade.com`). A personal app gets both by redeeming a
 * refresh token generated in the API Centre
 * (https://www.questrade.com/api/documentation/security):
 *
 *   POST https://login.questrade.com/oauth2/token
 *   grant_type=refresh_token&refresh_token=...
 *   -> { access_token, token_type, expires_in, refresh_token, api_server }
 *
 * The refresh token goes in the form body, so proxies and access logs that
 * keep URLs never see it. The getting-started page shows the same parameters
 * in a GET query; the security page documents the POST. The redemption goes
 * through the caller's `HttpClient`, like every other request the SDK makes.
 *
 * Every later call sends the access token to `api_server`, so the SDK takes
 * it only when it is `https:` on a `questrade.com` host.
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
import { refreshing } from "@distilled.cloud/core/token-cache";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Equal from "effect/Equal";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { TokenRequestFailed } from "./errors.ts";

/** The live login server; `https://practicelogin.questrade.com` serves practice accounts. */
export const DEFAULT_LOGIN_URL = "https://login.questrade.com";

/** Redeem again this long before the access token's reported expiry. */
const REFRESH_WINDOW_MS = 60_000;

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  /** The API server the token was issued for, without a trailing `/v1`. */
  readonly apiServer: string;
}

/**
 * Resolves the current credentials on every request. A layer reads its
 * configuration when it is built, so the effect fails only when redeeming
 * the refresh token at run time fails, with {@link TokenRequestFailed}.
 */
export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, TokenRequestFailed>>()(
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

/** `https://api01.iq.questrade.com/` and `.../v1` -> `https://api01.iq.questrade.com`. */
const normalizeApiServer = (url: string): string => url.replace(/\/+$/, "").replace(/\/v1$/, "");

/**
 * Whether `url` is an API server the access token may go to: `https:`, a
 * host under `questrade.com`, and no credentials in the URL. Questrade picks
 * the server per redemption (`api01`, `api05`, ...), so the host itself is
 * not fixed.
 */
const isQuestradeApiServer = (url: string): boolean => {
  const parsed = URL.parse(url);
  return (
    parsed !== null &&
    parsed.protocol === "https:" &&
    parsed.hostname.endsWith(".questrade.com") &&
    parsed.username === "" &&
    parsed.password === ""
  );
};

const tokenError = (message: string, status?: number) =>
  new TokenRequestFailed({
    message: `Questrade refresh token redemption failed: ${message}`,
    status,
  });

/**
 * Redeem a refresh token at the login server, through the caller's
 * `HttpClient`, as a form body. Fails with {@link TokenRequestFailed}, also
 * when the answer names an `api_server` that is not `https:` on a
 * `questrade.com` host.
 */
export const redeemRefreshToken = (
  refreshToken: Redacted.Redacted<string>,
  loginUrl: string = DEFAULT_LOGIN_URL,
): Effect.Effect<Tokens, TokenRequestFailed, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const response = yield* client
      .execute(
        HttpClientRequest.post(`${loginUrl.replace(/\/+$/, "")}/oauth2/token`).pipe(
          HttpClientRequest.acceptJson,
          HttpClientRequest.bodyUrlParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          }),
        ),
      )
      .pipe(
        Effect.mapError((cause) => tokenError(`request to ${loginUrl} failed: ${cause.message}`)),
      );
    if (response.status < 200 || response.status >= 300) {
      // The body of a refused redemption is an HTML page or a bare message;
      // the status says enough.
      return yield* tokenError(
        `${loginUrl} answered ${response.status} ` +
          `(a refresh token redeems once -- use the one the last redemption returned)`,
        response.status,
      );
    }
    const body = (yield* response.json.pipe(
      Effect.mapError(() =>
        tokenError(`${loginUrl} answered with a body that is not JSON`, response.status),
      ),
    )) as Record<string, unknown> | null;
    const { access_token, refresh_token, api_server, expires_in } = body ?? {};
    if (
      typeof access_token !== "string" ||
      typeof refresh_token !== "string" ||
      typeof api_server !== "string"
    ) {
      return yield* tokenError(
        "the answer has no access_token, refresh_token or api_server",
        response.status,
      );
    }
    if (!isQuestradeApiServer(api_server)) {
      return yield* tokenError(
        `the answer names api_server ${JSON.stringify(String(api_server))}, ` +
          "which is not an https: URL on a questrade.com host",
        response.status,
      );
    }
    return {
      accessToken: Redacted.make(access_token),
      refreshToken: Redacted.make(refresh_token),
      apiServer: normalizeApiServer(api_server),
      expiresInSeconds: typeof expires_in === "number" && expires_in > 0 ? expires_in : 1800,
    };
  });

/**
 * A resolver that redeems `config`'s refresh token on first use, caches the
 * access token until shortly before it expires, and then redeems the
 * refresh token the last redemption returned. The cache and the rotated
 * refresh token belong to the resolver; each layer build only supplies the
 * `HttpClient` to redeem with.
 */
const redeemingResolver = (
  config: RefreshTokenConfig,
): ((client: HttpClient.HttpClient) => Effect.Effect<Config, TokenRequestFailed>) => {
  let next: Redacted.Redacted<string> | undefined;
  const redeem = Effect.gen(function* () {
    const tokens = yield* redeemRefreshToken(next ?? config.refreshToken, config.loginUrl);
    next = tokens.refreshToken;
    if (config.onRefresh) yield* config.onRefresh(tokens);
    return {
      config: { accessToken: tokens.accessToken, apiServer: tokens.apiServer } satisfies Config,
      refreshAt:
        Date.now() +
        Math.max(tokens.expiresInSeconds * 1000 - REFRESH_WINDOW_MS, REFRESH_WINDOW_MS),
    };
  });
  const cached = refreshing(redeem, (redeemed) => redeemed.refreshAt, {
    onTimeout: (timeoutMs) =>
      new TokenRequestFailed({
        message: `Questrade refresh token redemption timed out after ${timeoutMs / 1000} s`,
      }),
  }).pipe(Effect.map((redeemed) => redeemed.config));
  return (client) => Effect.provideService(cached, HttpClient.HttpClient, client);
};

/**
 * Credentials from a refresh token, redeemed on first use and again before
 * each expiry, through the `HttpClient` the layer is built with.
 */
export const fromRefreshToken = (
  config: RefreshTokenConfig,
): Layer.Layer<Credentials, never, HttpClient.HttpClient> => {
  const resolveWith = redeemingResolver(config);
  return Layer.effect(
    Credentials,
    Effect.gen(function* () {
      return resolveWith(yield* HttpClient.HttpClient);
    }),
  );
};

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

/**
 * `QUESTRADE_ACCESS_TOKEN` + `QUESTRADE_API_SERVER` when both are set;
 * otherwise `QUESTRADE_REFRESH_TOKEN`, redeemed at `QUESTRADE_LOGIN_URL`
 * (default {@link DEFAULT_LOGIN_URL}) on first use. The environment is read
 * once, when the layer is built: with neither set, the layer fails with
 * `ConfigError`. The refresh token is redeemed through the `HttpClient` the
 * layer is built with. The rotated refresh tokens are kept in memory only --
 * use {@link fromRefreshToken} with `onRefresh` to store them.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError, HttpClient.HttpClient> =
  /*@__PURE__*/ (() => {
    // A refresh token redeems once, so every build of this layer that reads
    // the same token shares one resolver, and with it the rotated tokens.
    let kept:
      | {
          readonly refreshToken: Redacted.Redacted<string>;
          readonly loginUrl: string;
          readonly resolveWith: ReturnType<typeof redeemingResolver>;
        }
      | undefined;
    return Layer.effect(
      Credentials,
      Effect.gen(function* () {
        const { accessToken, apiServer, refreshToken, loginUrl } = yield* envConfig.pipe(
          Effect.mapError(() => new ConfigError({ message: MISSING })),
        );
        if (Option.isSome(accessToken) && Option.isSome(apiServer)) {
          return Effect.succeed({
            accessToken: accessToken.value,
            apiServer: normalizeApiServer(apiServer.value),
          });
        }
        if (Option.isNone(refreshToken)) return yield* new ConfigError({ message: MISSING });
        if (
          kept === undefined ||
          kept.loginUrl !== loginUrl ||
          !Equal.equals(kept.refreshToken, refreshToken.value)
        ) {
          kept = {
            refreshToken: refreshToken.value,
            loginUrl,
            resolveWith: redeemingResolver({ refreshToken: refreshToken.value, loginUrl }),
          };
        }
        return kept.resolveWith(yield* HttpClient.HttpClient);
      }),
    );
  })();
