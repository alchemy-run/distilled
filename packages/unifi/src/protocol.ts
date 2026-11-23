/**
 * UniFi protocols -- hand-written.
 *
 * Every UniFi API speaks API-key-authenticated JSON REST (no response
 * envelope), so each protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  the key -> `X-API-KEY: <apiKey>`, and for the console-hosted apps
 *             the console -> base URL, both resolved from the calling fiber
 *             on every request. Paths in the specs start at `/v1`; the base
 *             URL carries everything before it.
 *
 *   response: 2xx JSON is the payload; non-2xx `{ message? }` bodies map to
 *             the shared HTTP-status classes, then {@link UnknownUniFiError}.
 *             A console answers `{ code, message, statusCode, statusName,
 *             requestId, requestPath, timestamp }`; `api.ui.com` answers
 *             `{ code, message, httpStatusCode, traceId }`. Both carry
 *             `message`, which the default envelope reads.
 *
 * The console-hosted apps (Network, Protect, InnerSpace) share a protocol
 * shape that differs only in the `/proxy/<app>/integration` segment of the
 * base URL. Their operations take an optional `console` member that is not
 * sent: it replaces the {@link Console} layer for that call. The cloud-only
 * APIs share {@link UniFiCloudProtocol}.
 */
import type { Checked } from "@distilled.cloud/core/config";
import { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import type { ErrorOf } from "@distilled.cloud/core/protocol";
import type { EncodeArgs, Operation } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import {
  ApiKey,
  Console,
  DEFAULT_CLOUD_BASE_URL,
  checkConsoleLocation,
  consoleBaseUrl,
  type ConsoleApp,
  type ConsoleLocation,
} from "./credentials.ts";
import { UnknownUniFiError, UniFiParseError, type UniFiServiceError } from "./errors.ts";

/**
 * What every generated UniFi operation fails with besides its own errors: the
 * errors declared on the service, and the errors declared on the protocols.
 * Nobody lists the protocols': their types carry what their code fails with
 * (a response that does not match its schema, a failed response nothing
 * declares, core's REST errors, and what resolving the key and the console
 * fails with). Generated service files annotate operations with
 * `API.OperationMethod<I, O, UniFiOpError, <context>>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type UniFiOpError =
  | UniFiServiceError
  | ErrorOf<
      | typeof UniFiNetworkProtocol
      | typeof UniFiProtectProtocol
      | typeof UniFiInnerSpaceProtocol
      | typeof UniFiCloudProtocol
    >;

/**
 * Context of every Network, Protect and InnerSpace operation. {@link Console}
 * is optional and not listed: a call's `console` member can stand in for it.
 */
export type UniFiConsoleOpContext = ApiKey | HttpClient.HttpClient;

/** Context of every Site Manager, Mobility and Carrier Fabric operation. */
export type UniFiCloudOpContext = ApiKey | HttpClient.HttpClient;

/** The input member that picks the console for one call (scripts/generate.ts adds it). */
const CONSOLE_MEMBER = "console";

/**
 * The call's own console and the input without it; `undefined` when the call
 * names none, and {@link InvalidInput} when what it names is not a console.
 */
const ownConsole = (
  input: unknown,
):
  | { readonly location: Checked<ConsoleLocation>; readonly input: unknown }
  | InvalidInput
  | undefined => {
  if (input === null || typeof input !== "object") return undefined;
  // Read before copying: most calls name no console and skip the copy.
  const value = (input as Record<string, unknown>)[CONSOLE_MEMBER];
  if (value === undefined) return undefined;
  const { [CONSOLE_MEMBER]: _, ...rest } = input as Record<string, unknown>;
  const location = checkConsoleLocation(value);
  return location instanceof InvalidInput ? location : { location, input: rest };
};

const consoleProtocol = (app: ConsoleApp) => {
  const rest = restProtocol({
    // Each service holds an effect -- resolving them here (per request, on the
    // calling fiber) picks up context-provided layers.
    credentials: Effect.gen(function* () {
      const apiKey = yield* yield* ApiKey;
      // An optional service, like AWS's `Region`: a call's own `console`
      // provides it, and without either the call fails.
      const fromLayer = yield* Effect.serviceOption(Console);
      if (Option.isNone(fromLayer)) {
        return yield* new ConfigError({
          message:
            "No UniFi console: set the call's `console` or provide a Console layer (consoleLayer, localConsole, remoteConsole or ConsoleFromEnv)",
        });
      }
      const location = yield* fromLayer.value;
      return { apiKey, location };
    }),
    // A console ID that can't be a path segment is refused earlier, when the
    // `Console` layer is built (`check` in ./credentials.ts).
    baseUrl: (creds) => consoleBaseUrl(creds.location, app),
    // JSON first. The camera snapshot and the floor-plan assets answer
    // `image/jpeg` or `image/png`, so the header accepts images too.
    headers: (creds) => ({
      "X-API-KEY": Redacted.value(creds.apiKey),
      Accept: "application/json, image/*",
    }),
    unknownError: (info) => new UnknownUniFiError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new UniFiParseError({ body, cause }),
  });
  const { call, stream } = rest;
  // A call's `console` member, when set, is the Console for that call and is
  // not sent; a malformed one fails the call with InvalidInput.
  const methods = {
    encode: (args: EncodeArgs) => {
      const own = ownConsole(args.input);
      return own === undefined
        ? rest.encode(args)
        : own instanceof InvalidInput
          ? Effect.fail(own)
          : Effect.provideService(
              rest.encode({ ...args, input: own.input }),
              Console,
              Effect.succeed(own.location),
            );
    },
    decode: rest.decode,
    ...(call === undefined
      ? {}
      : {
          call: (operation: Operation, input: unknown) => {
            const own = ownConsole(input);
            return own === undefined
              ? call(operation, input)
              : own instanceof InvalidInput
                ? Effect.fail(own)
                : Effect.provideService(
                    call(operation, own.input),
                    Console,
                    Effect.succeed(own.location),
                  );
          },
        }),
    ...(stream === undefined
      ? {}
      : {
          stream: (operation: Operation, input: unknown) => {
            const own = ownConsole(input);
            return own === undefined
              ? stream(operation, input)
              : own instanceof InvalidInput
                ? Stream.fail(own)
                : Stream.provideService(
                    stream(operation, own.input),
                    Console,
                    Effect.succeed(own.location),
                  );
          },
        }),
  };
  return methods;
};

export const UniFiNetworkProtocol = /*@__PURE__*/ consoleProtocol("network");

export const UniFiProtectProtocol = /*@__PURE__*/ consoleProtocol("protect");

export const UniFiInnerSpaceProtocol = /*@__PURE__*/ consoleProtocol("innerspace");

// A const of its own: written inside the options, its callback would leave
// the credentials typed `unknown`.
const cloudCredentials = /*@__PURE__*/ Effect.map(
  /*@__PURE__*/ Effect.flatten(ApiKey),
  (apiKey) => ({ apiKey }),
);

export const UniFiCloudProtocol = /*@__PURE__*/ restProtocol({
  credentials: cloudCredentials,
  baseUrl: () => DEFAULT_CLOUD_BASE_URL,
  headers: (creds) => ({ "X-API-KEY": Redacted.value(creds.apiKey), Accept: "application/json" }),
  unknownError: (info) => new UnknownUniFiError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new UniFiParseError({ body, cause }),
});
