/**
 * 1Password SDK protocols -- hand-written. The SDK operations are not HTTP:
 * each one is a named invocation of the 1Password core, so both protocols
 * provide `call` and nothing else:
 *
 *   SdkProtocol       the authenticated operations (`generated/sdk`), through the
 *                     `SdkClient` in the calling fiber's context
 *   SdkLocalProtocol  the operations that need no account (`generated/sdk-local`),
 *                     through the WASM core's `invoke_sync`
 *
 *   request:  `{"invocation":{"clientId"?,"parameters":{"name","parameters"}}}`, with the
 *             operation's `operationName` as the invocation name and `Redacted`
 *             input members unwrapped
 *
 *   response: the core's JSON is the payload (sensitive members delivered as
 *             `Redacted`); a core failure is {@link OnepasswordSdkError}, or
 *             the typed session / auth / rate-limit error it names.
 */
import * as API from "@distilled.cloud/core/api";
import type { InvalidInput } from "@distilled.cloud/core/errors";
import { failUnlessLenient, validateResponse } from "@distilled.cloud/core/response-validation";
import { SdkError } from "@distilled.cloud/core/sdk-error";
import { isSensitive, redactPlain, wrapSensitive } from "@distilled.cloud/core/sensitive";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import {
  OnepasswordParseError,
  type AuthExpired,
  type DesktopSessionExpired,
  type OnepasswordSdkError,
  type RateLimitExceeded,
} from "./errors.ts";
import { SdkClient, decodeCoreError, encodeInvocation, loadWasmCore } from "./sdk-client.ts";

/**
 * Error channel shared by every generated SDK operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, OnepasswordSdkOpError | ...>`.
 */
export type OnepasswordSdkOpError =
  | OnepasswordSdkError
  | DesktopSessionExpired
  | AuthExpired
  | RateLimitExceeded
  | OnepasswordParseError
  | InvalidInput
  | SdkError;

/** Context (requirements) of every generated authenticated SDK operation. */
export type SdkOpContext = SdkClient;
/** Context (requirements) of every generated local SDK operation. */
export type SdkLocalOpContext = never;

/** `Protocol` fields are typed without an error channel; these fail with {@link OnepasswordSdkOpError}. */
const typed = <A>(effect: Effect.Effect<A, OnepasswordSdkOpError>): Effect.Effect<A> =>
  effect as Effect.Effect<A>;

const callOnly = () =>
  typed(
    Effect.suspend(() =>
      Effect.fail(
        new SdkError({ message: "the 1Password SDK protocol runs operations only through call" }),
      ),
    ),
  );

const operationNameOf = (operation: API.PreparedOperation): Effect.Effect<string, SdkError> => {
  const name = operation.config.operationName;
  return name === undefined
    ? Effect.fail(new SdkError({ message: "this operation has no operationName" }))
    : Effect.succeed(name);
};

/**
 * The core's response text as the operation's output: an empty or `null`
 * response is `{}`; the JSON is checked against the output schema when the
 * caller validates responses; sensitive values are wrapped in `Redacted`.
 */
const decodeResult = (
  operation: API.PreparedOperation,
  text: string,
): Effect.Effect<unknown, OnepasswordParseError> => {
  const outputAst = operation.outputAst;
  const trimmed = text.trim();
  const parsed: Effect.Effect<unknown, OnepasswordParseError> =
    trimmed === "" || trimmed === "null"
      ? Effect.succeed({})
      : Effect.try({ try: (): unknown => JSON.parse(text), catch: (cause) => cause }).pipe(
          Effect.catch((cause) =>
            failUnlessLenient(
              new OnepasswordParseError({ body: redactPlain(outputAst, text), cause }),
              text,
            ),
          ),
        );
  return parsed.pipe(
    Effect.flatMap((value) =>
      validateResponse(
        outputAst,
        value,
        (cause) => new OnepasswordParseError({ body: redactPlain(outputAst, value), cause }),
      ),
    ),
    Effect.map((value) =>
      typeof value === "string" && isSensitive(outputAst)
        ? Redacted.make(value)
        : wrapSensitive(outputAst, value),
    ),
  );
};

/** The authenticated SDK operations, through the {@link SdkClient} the caller provides. */
export const SdkProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: callOnly,
    decode: callOnly,
    call: (operation, input) =>
      typed(
        Effect.withFiber((fiber): Effect.Effect<unknown, OnepasswordSdkOpError> => {
          const client = Context.getOption(fiber.context, SdkClient);
          if (Option.isNone(client)) {
            return Effect.fail(
              new SdkError({
                message: "SdkClient is not provided: provide SdkClientFromEnv or SdkClientLive",
              }),
            );
          }
          return operationNameOf(operation).pipe(
            Effect.flatMap((name) => client.value.invoke(name, input)),
            Effect.flatMap((text) => decodeResult(operation, text)),
          );
        }),
      ),
  }),
);

/** The SDK operations that need no account (secret reference validation, password generation), through the WASM core. */
export const SdkLocalProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: callOnly,
    decode: callOnly,
    call: (operation, input) =>
      typed(
        Effect.gen(function* () {
          const name = yield* operationNameOf(operation);
          const core = yield* loadWasmCore;
          const request = yield* encodeInvocation(name, input);
          const text = yield* Effect.try({
            try: () => core.invoke_sync(request),
            catch: decodeCoreError,
          });
          return yield* decodeResult(operation, text);
        }),
      ),
  }),
);
