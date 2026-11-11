/**
 * Modal credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ tokenId, tokenSecret, apiBaseUrl }`
 * per request; the protocol layer sends them as `x-modal-token-id` /
 * `x-modal-token-secret` (the same headers the official JS/Go clients use).
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import { GrpcTransport } from "@distilled.cloud/core/grpc-transport";
import * as CloudflareHttp2 from "@distilled.cloud/core/grpc-transport-cloudflare-http2";
import * as NodeHttp2 from "@distilled.cloud/core/grpc-transport-node-http2";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";

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
  /**
   * Call as the Modal container this code runs in: no token pair, client type
   * `CLIENT_TYPE_CONTAINER`. Modal identifies the caller by the socket it
   * calls on. Set by {@link fromContainer}.
   */
  readonly container?: boolean;
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

/** Modal's API socket inside its containers, from `MODAL_SERVER_URL`. */
export const CONTAINER_SOCKET_PREFIX = "unix:";

/**
 * The path of the API socket Modal gives this container, or `undefined`
 * outside one. Modal sets `MODAL_SERVER_URL` to `unix:/run/modal.sock` in
 * every Function, Server and Sandbox container it starts with its client.
 */
export const containerSocket: Effect.Effect<string | undefined> = /*@__PURE__*/ EffectConfig.String(
  "MODAL_SERVER_URL",
).pipe(
  Effect.map((url) =>
    url.startsWith(CONTAINER_SOCKET_PREFIX) ? url.slice(CONTAINER_SOCKET_PREFIX.length) : undefined,
  ),
  Effect.orElseSucceed(() => undefined),
);

/**
 * Call Modal as the container this code runs in, as Modal's own client does
 * there: over the container's API socket (`MODAL_SERVER_URL`), with no token.
 * Modal authorizes each call as the container's App and environment, so no
 * credential is stored or passed in. Calls go over HTTP/2 with `node:http2`.
 *
 * Outside a Modal container it fails with `ConfigError`.
 *
 * @example
 * ```ts
 * const { functionId } = yield* Modal.getFunction({ appName: "inference", objectTag: "embed" }).pipe(
 *   Effect.provide(Modal.fromContainer),
 * );
 * ```
 */
export const fromContainer: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ Layer.unwrap(
  Effect.gen(function* () {
    const path = yield* containerSocket;
    if (path === undefined) {
      return yield* new ConfigError({
        message: "Not in a Modal container: MODAL_SERVER_URL isn't a unix: socket",
      });
    }
    return Layer.mergeAll(
      Layer.succeed(
        Credentials,
        Effect.succeed({
          tokenId: Redacted.make(""),
          tokenSecret: Redacted.make(""),
          // Only the `:authority`; the socket carries the call.
          apiBaseUrl: "http://localhost",
          container: true,
        } satisfies Config),
      ),
      NodeHttp2.unixLayer(path),
    );
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
 * runs with one of core's HTTP/2 gRPC transports: `node:http2`, or on a
 * Cloudflare Worker, HTTP/2 over a `cloudflare:sockets` socket.
 *
 * A server-streaming router call follows its output as it arrives with
 * `.stream` (`taskExecStdioRead.stream({ taskId, execId, offset: "0", ... })`);
 * bound any call with core's `Deadline`.
 *
 * @example
 * ```ts
 * const access = yield* Modal.sandboxGetCommandRouterAccess({ sandboxId });
 * const exec = yield* Modal.taskExecStart({ taskId, execId, commandArgs: ["ls"] }).pipe(
 *   Modal.withTaskCommandRouter(access),
 * );
 * ```
 */
export const withTaskCommandRouter =
  (access: RouterAccess) =>
  <A, E, R>(
    effect: Effect.Effect<A, E, R>,
  ): Effect.Effect<A, E, Exclude<R, Credentials | HttpClient.HttpClient>> =>
    Effect.flatMap(Effect.serviceOption(Credentials), (outer) =>
      effect.pipe(
        Effect.provideService(GrpcTransport, routerTransport()),
        Effect.provide(FetchHttpClient.layer),
        Effect.provideService(Credentials, routerCredentials(outer, access)),
      ),
    ) as Effect.Effect<A, E, Exclude<R, Credentials | HttpClient.HttpClient>>;

/**
 * {@link withTaskCommandRouter} for a server-streaming router call's
 * `.stream(...)`, which emits each message as it arrives.
 *
 * @example
 * ```ts
 * const stdout = Modal.taskExecStdioRead
 *   .stream({ taskId, execId, offset: "0", fileDescriptor: "TASK_EXEC_STDIO_FILE_DESCRIPTOR_STDOUT" })
 *   .pipe(Modal.streamTaskCommandRouter(access));
 * ```
 */
export const streamTaskCommandRouter =
  (access: RouterAccess) =>
  <A, E, R>(
    stream: Stream.Stream<A, E, R>,
  ): Stream.Stream<A, E, Exclude<R, Credentials | HttpClient.HttpClient>> =>
    Stream.unwrap(
      Effect.map(Effect.serviceOption(Credentials), (outer) =>
        stream.pipe(
          Stream.provideService(GrpcTransport, routerTransport()),
          Stream.provide(FetchHttpClient.layer),
          Stream.provideService(Credentials, routerCredentials(outer, access)),
        ),
      ),
    ) as Stream.Stream<A, E, Exclude<R, Credentials | HttpClient.HttpClient>>;

/**
 * A command router serves gRPC over HTTP/2 and nothing else. A Cloudflare
 * Worker has no working `node:http2`, so there the calls go over HTTP/2 on a
 * `cloudflare:sockets` socket.
 */
const routerTransport = (): HttpClient.HttpClient =>
  typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers"
    ? CloudflareHttp2.client
    : NodeHttp2.client;

/** Where a task's command router serves, from `sandboxGetCommandRouterAccess`. */
export interface RouterAccess {
  readonly url: string;
  readonly jwt: string | Redacted.Redacted<string>;
}

/** The caller's credentials (or none), aimed at the router with its JWT. */
const routerCredentials = (
  outer: Option.Option<Effect.Effect<Config, ConfigError>>,
  access: RouterAccess,
): Effect.Effect<Config, ConfigError> =>
  Effect.map(
    Option.isSome(outer)
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
  );
