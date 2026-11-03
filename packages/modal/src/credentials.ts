/**
 * Modal credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ tokenId, tokenSecret, apiBaseUrl }`
 * per request; the protocol layer sends them as `x-modal-token-id` /
 * `x-modal-token-secret` (the same headers the official JS/Go clients use).
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { http2Fetch } from "./http2.ts";

/**
 * Modal production control-plane URL.
 *
 * Override with `MODAL_SERVER_URL` (the spelling the official SDKs use) or
 * `MODAL_API_URL`.
 */
export const DEFAULT_API_BASE_URL = "https://api.modal.com";

export interface Config {
  readonly tokenId: Redacted.Redacted<string>;
  readonly tokenSecret: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /**
   * Sent as `authorization: Bearer <token>` instead of the token pair. Set by
   * {@link withTaskCommandRouter} for a sandbox's task command router.
   */
  readonly bearerToken?: Redacted.Redacted<string>;
  /**
   * Sent as `x-modal-auth-token` with the token pair: the short-lived JWT
   * Modal's V2 sandbox RPCs and input plane need. Set by `withAuthToken`.
   */
  readonly authToken?: Redacted.Redacted<string>;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "ModalCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  tokenId: /*@__PURE__*/ EffectConfig.Redacted("MODAL_TOKEN_ID"),
  tokenSecret: /*@__PURE__*/ EffectConfig.Redacted("MODAL_TOKEN_SECRET"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("MODAL_SERVER_URL").pipe(
    /*@__PURE__*/ EffectConfig.orElse(() =>
      EffectConfig.String("MODAL_API_URL").pipe(EffectConfig.withDefault(DEFAULT_API_BASE_URL)),
    ),
  ),
});

export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "MODAL_TOKEN_ID and MODAL_TOKEN_SECRET environment variables are required",
        }),
    ),
  ),
);

/** Convenience layer from a token pair + optional base URL. */
export const credentials = (config: {
  readonly tokenId: Redacted.Redacted<string>;
  readonly tokenSecret: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      tokenId: config.tokenId,
      tokenSecret: config.tokenSecret,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/**
 * Credentials with no token, for the calls Modal serves before one exists:
 * the browser token flow (`createTokenFlow` / `waitTokenFlow`), which is how
 * `modal token new` gets a token pair.
 *
 * @example
 * ```ts
 * const flow = yield* Modal.createTokenFlow({}).pipe(Effect.provide(Modal.anonymous()));
 * ```
 */
export const anonymous = (apiBaseUrl?: string): Layer.Layer<Credentials> =>
  credentials({
    tokenId: Redacted.make(""),
    tokenSecret: Redacted.make(""),
    apiBaseUrl,
  });

/**
 * Run `effect` against a sandbox's task command router: the
 * `modal.task_command_router.TaskCommandRouter` operations (exec, stdio,
 * filesystem, snapshots, mounts) are served at a per-task URL with a JWT,
 * both returned by `sandboxGetCommandRouterAccess` /
 * `taskGetCommandRouterAccess`. The router speaks only HTTP/2, so `effect`
 * runs with an HTTP/2 `HttpClient` (`node:http2`; not available on
 * Cloudflare Workers).
 *
 * @example
 * ```ts
 * const access = yield* Modal.sandboxGetCommandRouterAccess({ sandboxId });
 * const exec = yield* Modal.taskExecStart({ taskId, execId, commandArgs: ["ls"] }).pipe(
 *   Modal.withTaskCommandRouter({ url: access.url!, jwt: access.jwt! }),
 * );
 * ```
 */
export const withTaskCommandRouter =
  (access: { readonly url: string; readonly jwt: string | Redacted.Redacted<string> }) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R> =>
    Effect.flatMap(Effect.serviceOption(Credentials), (outer) =>
      Effect.provideService(
        effect.pipe(
          Effect.provide(FetchHttpClient.layer),
          Effect.provideService(FetchHttpClient.Fetch, http2Fetch as typeof globalThis.fetch),
        ),
        Credentials,
        Effect.map(
          outer._tag === "Some"
            ? outer.value
            : Effect.succeed({
                tokenId: Redacted.make(""),
                tokenSecret: Redacted.make(""),
                apiBaseUrl: DEFAULT_API_BASE_URL,
              }),
          (config): Config => ({
            ...config,
            apiBaseUrl: access.url.replace(/\/$/, ""),
            bearerToken: Redacted.isRedacted(access.jwt) ? access.jwt : Redacted.make(access.jwt),
          }),
        ),
      ),
    ) as Effect.Effect<A, E, R>;
