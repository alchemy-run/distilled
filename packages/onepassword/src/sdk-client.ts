/**
 * The 1Password SDK client -- hand-written. Ports the transport of
 * `@1password/sdk` (`core.ts`, `shared_lib_core.ts`, `configuration.ts`):
 *
 *   service account  `wasmTransport`     `@1password/sdk-core` (WASM), loaded on first use
 *   desktop app      `desktopTransport`  the app's `libop_sdk_ipc_client`, through `process.dlopen`
 *
 * `SdkClient` is one authenticated core client per layer: it initialises on
 * build, re-initialises once (single-flight) when the desktop app session
 * expires, and releases on scope close. Every call is the JSON string
 * `{"invocation":{"clientId":n,"parameters":{"name":"ItemsGet","parameters":{...}}}}`.
 *
 * No static `node:*` or `@1password/sdk-core` import: bundles that import the
 * package root stay clean; both load on first use.
 */
import { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { unwrapRedactedDeep } from "@distilled.cloud/core/plain-values";
import { SdkError, loadModule } from "@distilled.cloud/core/sdk-error";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Semaphore from "effect/Semaphore";
import { SdkCredentials, SdkCredentialsFromEnv, type SdkConfig } from "./credentials.ts";
import {
  AuthExpired,
  DesktopSessionExpired,
  OnepasswordSdkError,
  RateLimitExceeded,
} from "./errors.ts";
import { SDK_BUILD_NUMBER, SDK_CORE_VERSION } from "./sdk-version.ts";

// ---------------------------------------------------------------------------
// WASM core
// ---------------------------------------------------------------------------

/** The functions of `@1password/sdk-core` this package calls. */
export interface SdkCoreModule {
  init_client(config: string): Promise<string>;
  invoke(request: string): Promise<string>;
  invoke_sync(request: string): string;
  release_client(clientId: string): void;
}

const SDK_CORE_MODULE = "@1password/sdk-core";

const sdkCoreMissing = () =>
  new SdkError({
    message: `@1password/sdk-core@${SDK_CORE_VERSION} is required for 1Password SDK calls: npm install @1password/sdk-core@${SDK_CORE_VERSION}`,
  });

const isSdkCoreModule = (mod: unknown): mod is SdkCoreModule =>
  typeof mod === "object" &&
  mod !== null &&
  "init_client" in mod &&
  typeof mod.init_client === "function" &&
  "invoke" in mod &&
  typeof mod.invoke === "function" &&
  "invoke_sync" in mod &&
  typeof mod.invoke_sync === "function" &&
  "release_client" in mod &&
  typeof mod.release_client === "function";

/** Load `@1password/sdk-core` (an optional peer dependency) on first use. */
export const loadWasmCore: Effect.Effect<SdkCoreModule, SdkError> = /*@__PURE__*/ loadModule(
  () => import(/* webpackIgnore: true */ /* @vite-ignore */ SDK_CORE_MODULE),
).pipe(
  /*@__PURE__*/ Effect.flatMap((mod: { readonly default?: unknown }) => {
    const core = mod.default ?? mod;
    return isSdkCoreModule(core) ? Effect.succeed(core) : Effect.fail(sdkCoreMissing());
  }),
  /*@__PURE__*/ Effect.mapError(sdkCoreMissing),
);

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/** The errors the 1Password core reports (upstream `errors.ts` `throwError`). */
export type SdkCallError =
  | OnepasswordSdkError
  | DesktopSessionExpired
  | AuthExpired
  | RateLimitExceeded;

/** What a transport fails with: the core's errors, or a transport that cannot talk to it. */
export type SdkTransportError = SdkCallError | SdkError;

const decodeCoreErrorJson = /*@__PURE__*/ Schema.decodeUnknownOption(
  /*@__PURE__*/ Schema.fromJsonString(
    /*@__PURE__*/ Schema.Struct({ name: Schema.String, message: Schema.String }),
  ),
);

const errorText = (raw: unknown): string =>
  typeof raw === "string" ? raw : raw instanceof Error ? raw.message : String(raw);

/**
 * A failure the core raised -- a string `{"name","message"}`, or an `Error`
 * carrying one -- as a typed error. Anything that is not that JSON becomes
 * an {@link OnepasswordSdkError} with the text as its message.
 */
export const decodeCoreError = (raw: unknown): SdkCallError => {
  const text = errorText(raw);
  const decoded = Option.getOrUndefined(decodeCoreErrorJson(text));
  if (decoded === undefined) return new OnepasswordSdkError({ message: text });
  switch (decoded.name) {
    case "DesktopSessionExpired":
      return new DesktopSessionExpired({ message: decoded.message });
    case "AuthExpired":
      return new AuthExpired({ message: decoded.message });
    case "RateLimitExceeded":
      return new RateLimitExceeded({ message: decoded.message });
    default:
      return new OnepasswordSdkError({ kind: decoded.name, message: decoded.message });
  }
};

// ---------------------------------------------------------------------------
// Invocations
// ---------------------------------------------------------------------------

/** The core rejects messages above this size. */
const MAX_MESSAGE_BYTES = 50 * 1024 * 1024;

/** Whether `s` encodes to more than the message limit in UTF-8 (1 to 3 bytes per UTF-16 unit). */
const exceedsMessageLimit = (s: string): boolean =>
  s.length > MAX_MESSAGE_BYTES ||
  (s.length * 3 > MAX_MESSAGE_BYTES && new TextEncoder().encode(s).length > MAX_MESSAGE_BYTES);

/**
 * The core's request JSON for the invocation `name`. `Redacted` values in
 * `parameters` are unwrapped here, the only place a secret input leaves its
 * wrapper. Without a `clientId` the call is for `invoke_sync`.
 */
export const encodeInvocation = (
  name: string,
  parameters: unknown,
  clientId?: number,
): Effect.Effect<string, InvalidInput> =>
  Effect.try({
    try: () =>
      JSON.stringify({
        invocation: {
          ...(clientId === undefined ? {} : { clientId }),
          parameters: { name, parameters: unwrapRedactedDeep(parameters) },
        },
      }),
    catch: (cause) =>
      new InvalidInput({
        member: "input",
        message: `the input of ${name} cannot be encoded as JSON: ${errorText(cause)}`,
      }),
  }).pipe(
    Effect.flatMap((request) =>
      exceedsMessageLimit(request)
        ? Effect.fail(
            new InvalidInput({
              member: "input",
              message: "the request exceeds the 1Password SDK's 50 MiB message limit",
            }),
          )
        : Effect.succeed(request),
    ),
  );

// ---------------------------------------------------------------------------
// Transports
// ---------------------------------------------------------------------------

/** The three calls of the 1Password core, over WASM or the desktop app. */
export interface SdkTransport {
  initClient(config: string): Effect.Effect<string, SdkTransportError>;
  invoke(request: string): Effect.Effect<string, SdkTransportError>;
  releaseClient(clientId: string): Effect.Effect<void, SdkTransportError>;
}

/** Service account auth: the WASM core, in process. */
export const wasmTransport: Effect.Effect<SdkTransport, SdkError> = /*@__PURE__*/ Effect.map(
  loadWasmCore,
  (core): SdkTransport => ({
    initClient: (config) =>
      Effect.tryPromise({ try: () => core.init_client(config), catch: decodeCoreError }),
    invoke: (request) =>
      Effect.tryPromise({ try: () => core.invoke(request), catch: decodeCoreError }),
    releaseClient: (clientId) =>
      Effect.try({ try: () => core.release_client(clientId), catch: decodeCoreError }),
  }),
);

/** The slice of Node's `process` the desktop transport uses. */
interface NodeProcessLike {
  readonly platform: string;
  readonly arch: string;
  readonly dlopen?: (module: { exports: unknown }, filename: string) => void;
  readonly getBuiltinModule?: (id: string) => unknown;
}

/** The compiler's lib types do not declare `process`; this is the shape of it read here (absent outside Node-like runtimes). */
const runtime = globalThis as { readonly process?: NodeProcessLike };

interface NodeFs {
  existsSync(path: string): boolean;
}
interface NodeOs {
  homedir(): string;
}
interface NodePath {
  join(...paths: string[]): string;
}
interface NodeBufferValue extends Uint8Array {
  toString(encoding?: "utf8" | "base64"): string;
}
interface NodeBuffer {
  from(value: string, encoding: "utf8"): NodeBufferValue;
  from(value: ArrayLike<number>): NodeBufferValue;
}

/** Where the desktop app installs its IPC client library, per platform (as upstream). */
const desktopLibraryPaths = (
  platform: string,
  os: NodeOs,
  path: NodePath,
): ReadonlyArray<string> | undefined => {
  switch (platform) {
    case "darwin":
      return [
        "/Applications/1Password.app/Contents/Frameworks/libop_sdk_ipc_client.dylib",
        path.join(
          os.homedir(),
          "/Applications/1Password.app/Contents/Frameworks/libop_sdk_ipc_client.dylib",
        ),
      ];
    case "linux":
      return [
        "/usr/bin/1password/libop_sdk_ipc_client.so",
        "/opt/1Password/libop_sdk_ipc_client.so",
        "/snap/bin/1password/libop_sdk_ipc_client.so",
      ];
    case "win32":
      return [
        path.join(os.homedir(), "/AppData/Local/1Password/op_sdk_ipc_client.dll"),
        "C:/Program Files/1Password/app/8/op_sdk_ipc_client.dll",
        "C:/Program Files (x86)/1Password/app/8/op_sdk_ipc_client.dll",
        path.join(os.homedir(), "/AppData/Local/1Password/app/8/op_sdk_ipc_client.dll"),
      ];
    default:
      return undefined;
  }
};

const decodeDesktopResponse = /*@__PURE__*/ Schema.decodeUnknownOption(
  /*@__PURE__*/ Schema.fromJsonString(
    /*@__PURE__*/ Schema.Struct({
      success: Schema.Boolean,
      payload: /*@__PURE__*/ Schema.Array(Schema.Number),
    }),
  ),
);

/** Desktop app auth: the app's IPC client library, loaded with `process.dlopen`. */
export const desktopTransport = (
  accountName: string,
): Effect.Effect<SdkTransport, ConfigError | SdkError> =>
  Effect.gen(function* () {
    const proc = runtime.process;
    if (
      proc === undefined ||
      typeof proc.getBuiltinModule !== "function" ||
      typeof proc.dlopen !== "function"
    ) {
      return yield* new ConfigError({
        message: "the 1Password desktop app integration needs Node.js 20.16 or later",
      });
    }
    // `getBuiltinModule` is untyped: these are Node's own modules, narrowed to the slices used here.
    const fs = proc.getBuiltinModule("node:fs") as NodeFs | undefined;
    const os = proc.getBuiltinModule("node:os") as NodeOs | undefined;
    const path = proc.getBuiltinModule("node:path") as NodePath | undefined;
    const buffer = proc.getBuiltinModule("node:buffer") as { Buffer?: NodeBuffer } | undefined;
    const nodeBuffer = buffer?.Buffer;
    if (fs === undefined || os === undefined || path === undefined || nodeBuffer === undefined) {
      return yield* new ConfigError({
        message: "the 1Password desktop app integration needs Node.js 20.16 or later",
      });
    }

    const paths = desktopLibraryPaths(proc.platform, os, path);
    if (paths === undefined) {
      return yield* new ConfigError({
        message: `the 1Password desktop app integration does not support ${proc.platform}`,
      });
    }
    const library = paths.find((candidate) => fs.existsSync(candidate));
    if (library === undefined) {
      return yield* new ConfigError({
        message: `1Password desktop app not found; looked in ${paths.join(", ")}`,
      });
    }

    const dlopen = proc.dlopen;
    const ipc = yield* Effect.try({
      try: () => {
        const loaded: { exports: { sendMessage?: unknown } } = { exports: {} };
        dlopen.call(proc, loaded, library);
        return loaded.exports;
      },
      catch: (cause) =>
        new SdkError({
          message: `loading the 1Password desktop app library ${library} failed: ${errorText(cause)}`,
        }),
    });
    const sendMessage = ipc.sendMessage;
    if (typeof sendMessage !== "function") {
      return yield* new SdkError({
        message: `the 1Password desktop app library ${library} has no sendMessage`,
      });
    }

    const send = (kind: string, input: string): Effect.Effect<string, SdkTransportError> =>
      Effect.tryPromise({
        try: (): Promise<unknown> =>
          sendMessage(
            nodeBuffer.from(
              JSON.stringify({
                kind,
                account_name: accountName,
                payload: nodeBuffer.from(input, "utf8").toString("base64"),
              }),
              "utf8",
            ),
          ),
        catch: decodeCoreError,
      }).pipe(
        Effect.flatMap((response): Effect.Effect<string, SdkTransportError> => {
          const reply =
            response instanceof Uint8Array
              ? Option.getOrUndefined(decodeDesktopResponse(new TextDecoder().decode(response)))
              : undefined;
          if (reply === undefined) {
            return Effect.fail(
              new SdkError({
                message: "the 1Password desktop app returned an unreadable response",
              }),
            );
          }
          const text = nodeBuffer.from(reply.payload).toString("utf8");
          return reply.success ? Effect.succeed(text) : Effect.fail(decodeCoreError(text));
        }),
      );

    return {
      initClient: (config) => send("init_client", config),
      invoke: (request) => send("invoke", request),
      releaseClient: (clientId) => Effect.asVoid(send("release_client", clientId)),
    } satisfies SdkTransport;
  });

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

/**
 * The JSON `init_client` takes (upstream `configuration.ts`). The only place
 * the service account token leaves its `Redacted`.
 */
export const clientAuthConfig = (config: SdkConfig): string => {
  const proc = runtime.process;
  const platform = proc?.platform ?? "unknown";
  return JSON.stringify({
    serviceAccountToken:
      config.auth._tag === "ServiceAccount" ? Redacted.value(config.auth.token) : "",
    accountName: config.auth._tag === "DesktopApp" ? config.auth.accountName : undefined,
    programmingLanguage: "JS",
    sdkVersion: SDK_BUILD_NUMBER,
    integrationName: config.integrationName,
    integrationVersion: config.integrationVersion,
    requestLibraryName: "Fetch API",
    requestLibraryVersion: "Fetch API",
    os: platform === "win32" ? "windows" : platform,
    osVersion: "0.0.0",
    architecture: proc?.arch ?? "unknown",
  });
};

/**
 * One authenticated 1Password core client. `invoke` runs the invocation
 * `name` and returns the core's response JSON.
 */
export class SdkClient
  extends /*@__PURE__*/ Context.Service<
    SdkClient,
    {
      readonly invoke: (
        name: string,
        parameters: unknown,
      ) => Effect.Effect<string, SdkTransportError | InvalidInput>;
    }
  >()("OnepasswordSdkClient") {}

/**
 * Layer building an {@link SdkClient} over the transport `makeTransport`
 * picks for the credentials. The client is released when the layer's scope
 * closes. A `DesktopSessionExpired` call re-initialises the client and is
 * retried once; concurrent expired calls share one re-initialisation.
 */
export const sdkClientLayer = (
  makeTransport: (config: SdkConfig) => Effect.Effect<SdkTransport, ConfigError | SdkError>,
): Layer.Layer<SdkClient, ConfigError | SdkTransportError, SdkCredentials> =>
  Layer.effect(
    SdkClient,
    Effect.gen(function* () {
      const config = yield* yield* SdkCredentials;
      const transport = yield* makeTransport(config);
      const authConfig = clientAuthConfig(config);

      const init = Effect.flatMap(transport.initClient(authConfig), (id) => {
        const clientId = Number.parseInt(id, 10);
        return Number.isNaN(clientId)
          ? Effect.fail(new SdkError({ message: "init_client returned a non-numeric client id" }))
          : Effect.succeed(clientId);
      });

      let current = yield* init;
      yield* Effect.addFinalizer(() =>
        Effect.suspend(() => transport.releaseClient(JSON.stringify(current))).pipe(
          Effect.ignore({ log: "Warn", message: "releasing the 1Password SDK client failed" }),
        ),
      );

      // Concurrent calls that all saw the expired session share one re-init.
      const lock = Semaphore.makeUnsafe(1);

      const call = (name: string, parameters: unknown, clientId: number) =>
        Effect.flatMap(encodeInvocation(name, parameters, clientId), (request) =>
          transport.invoke(request),
        );

      const reinit = (expired: number) =>
        Semaphore.withPermit(
          lock,
          Effect.suspend(() =>
            current === expired
              ? Effect.map(init, (next) => {
                  current = next;
                })
              : Effect.void,
          ),
        );

      return SdkClient.of({
        invoke: (name, parameters) =>
          Effect.suspend(() => {
            const id = current;
            return call(name, parameters, id).pipe(
              Effect.catchTag("DesktopSessionExpired", () =>
                Effect.flatMap(reinit(id), () =>
                  Effect.suspend(() => call(name, parameters, current)),
                ),
              ),
            );
          }),
      });
    }),
  );

/** The transport for the credentials: WASM for a service account, IPC for the desktop app. */
export const defaultSdkTransport = (
  config: SdkConfig,
): Effect.Effect<SdkTransport, ConfigError | SdkError> =>
  config.auth._tag === "ServiceAccount" ? wasmTransport : desktopTransport(config.auth.accountName);

/** {@link SdkClient} over the default transport; needs {@link SdkCredentials}. */
export const SdkClientLive: Layer.Layer<
  SdkClient,
  ConfigError | SdkTransportError,
  SdkCredentials
> = /*@__PURE__*/ sdkClientLayer(defaultSdkTransport);

/** {@link SdkClientLive} with credentials from `OP_SERVICE_ACCOUNT_TOKEN` or `OP_ACCOUNT`. */
export const SdkClientFromEnv: Layer.Layer<SdkClient, ConfigError | SdkTransportError> =
  /*@__PURE__*/ SdkClientLive.pipe(Layer.provide(SdkCredentialsFromEnv));
