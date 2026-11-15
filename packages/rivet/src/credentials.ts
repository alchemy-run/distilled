/**
 * Rivet credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ token, endpoint }` per request; the
 * protocol formats `Authorization: Bearer <token>` from it. The token is a
 * control plane's admin token (`auth.admin_token`) or a namespace JWT minted
 * by `auth.createAuthToken`.
 *
 * Rivet is self-hostable, so the endpoint is part of the configuration: Rivet
 * Cloud by default, or your own control plane's URL. `RIVET_ENDPOINT` may
 * carry the token in its userinfo (`https://<namespace>:<token>@host`), the
 * same form RivetKit nodes read, in which case `RIVET_TOKEN` is optional.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** Rivet Cloud's API (the spec's `servers` entry). */
export const DEFAULT_ENDPOINT = "https://api.rivet.dev";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  /** Control plane base URL, without credentials or a trailing slash. */
  readonly endpoint: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "RivetCredentials",
  ) {}

/**
 * Split an endpoint URL into its base URL and the token in its userinfo
 * password, if any (`https://<namespace>:<token>@host`).
 */
const parseEndpoint = (
  raw: string,
): { readonly endpoint: string; readonly token: Option.Option<Redacted.Redacted<string>> } => {
  const url = new URL(raw);
  const token =
    url.password === ""
      ? Option.none()
      : Option.some(Redacted.make(decodeURIComponent(url.password)));
  url.username = "";
  url.password = "";
  return { endpoint: url.toString().replace(/\/+$/, ""), token };
};

const envConfig = /*@__PURE__*/ EffectConfig.all({
  token: /*@__PURE__*/ EffectConfig.Redacted("RIVET_TOKEN").pipe(EffectConfig.option),
  endpoint: /*@__PURE__*/ EffectConfig.String("RIVET_ENDPOINT").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_ENDPOINT),
  ),
});

export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () => new ConfigError({ message: "RIVET_ENDPOINT must be a valid URL" }),
    ),
    /*@__PURE__*/ Effect.flatMap(({ token, endpoint }) =>
      Effect.try({
        try: () => parseEndpoint(endpoint),
        catch: () => new ConfigError({ message: "RIVET_ENDPOINT must be a valid URL" }),
      }).pipe(
        Effect.flatMap((parsed) => {
          const resolved = Option.orElse(token, () => parsed.token);
          return Option.isSome(resolved)
            ? Effect.succeed({ token: resolved.value, endpoint: parsed.endpoint })
            : Effect.fail(
                new ConfigError({
                  message:
                    "RIVET_TOKEN is required (or put the token in RIVET_ENDPOINT's userinfo)",
                }),
              );
        }),
      ),
    ),
  ),
);

/** Credentials for a known control plane. */
export const credentials = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly endpoint?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: config.token,
      endpoint: (config.endpoint ?? DEFAULT_ENDPOINT).replace(/\/+$/, ""),
    }),
  );
