/**
 * Linear credentials — hand-written.
 *
 * Linear's public API is a single GraphQL endpoint. Its two kinds of token
 * share the `Authorization` header but not its format:
 *
 *   • personal API keys  → `Authorization: <key>`
 *   • OAuth access tokens → `Authorization: Bearer <token>`
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** Default Linear API host. The endpoint path is `/graphql`. */
export const DEFAULT_API_BASE_URL = "https://api.linear.app";

/**
 * Which `Authorization` format carries the token.
 *
 * - `"apiKey"` — a personal API key from Settings → Security & access, sent
 *   bare
 * - `"oauth"` — an OAuth 2.0 access token, sent as `Bearer <token>`
 */
export type TokenKind = "apiKey" | "oauth";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly tokenKind: TokenKind;
  readonly apiBaseUrl: string;
}

/**
 * Build a {@link Config} from a raw token string. Always wraps with this
 * package's `Redacted` so protocol-side `Redacted.value` works even when
 * the caller lives in a different `effect` install.
 */
export const toConfig = (config: {
  readonly token: string;
  readonly tokenKind?: TokenKind;
  readonly apiBaseUrl?: string;
}): Config => ({
  token: Redacted.make(config.token),
  tokenKind: config.tokenKind ?? "apiKey",
  apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
});

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("LinearCredentials") {}

/** Build {@link Credentials} from an explicit token. */
export const CredentialsFromToken = (config: {
  readonly token: string | Redacted.Redacted<string>;
  /** Defaults to `"apiKey"` (the bare `Authorization` header). */
  readonly tokenKind?: TokenKind;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed(
      toConfig({
        token: Redacted.isRedacted(config.token)
          ? Redacted.value(config.token)
          : config.token,
        tokenKind: config.tokenKind,
        apiBaseUrl: config.apiBaseUrl,
      }),
    ),
  );

const envConfig = EffectConfig.all({
  apiKey: EffectConfig.option(EffectConfig.String("LINEAR_API_KEY")),
  accessToken: EffectConfig.option(EffectConfig.String("LINEAR_ACCESS_TOKEN")),
  apiBaseUrl: EffectConfig.String("LINEAR_API_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

const MISSING_TOKEN =
  "LINEAR_API_KEY (or LINEAR_ACCESS_TOKEN) environment variable is required";

/**
 * Build {@link Credentials} from environment variables.
 *
 * - `LINEAR_API_KEY` — a personal API key, sent as `Authorization: <key>`.
 * - `LINEAR_ACCESS_TOKEN` — an OAuth access token, sent as
 *   `Authorization: Bearer <token>`.
 * - `LINEAR_API_URL` (optional) — override the host. Defaults to
 *   `https://api.linear.app`.
 *
 * The API key wins when both are set.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const config = yield* envConfig.pipe(
      Effect.mapError(() => new ConfigError({ message: MISSING_TOKEN })),
    );

    const set = (value: Option.Option<string>) =>
      Option.getOrUndefined(Option.filter(value, (s) => s.length > 0));
    const apiKey = set(config.apiKey);
    const token = apiKey ?? set(config.accessToken);

    if (!token) {
      return yield* new ConfigError({ message: MISSING_TOKEN });
    }

    return {
      token: Redacted.make(token),
      tokenKind: apiKey !== undefined ? "apiKey" : "oauth",
      apiBaseUrl: config.apiBaseUrl,
    } satisfies Config;
  }).pipe(Effect.orDie),
);
