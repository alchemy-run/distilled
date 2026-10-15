/**
 * Response validation mode, shared by every distilled SDK.
 *
 * Generated SDKs carry a schema for every operation's output. What a
 * protocol does with it on a 2xx response depends on the mode:
 *
 *   lenient (default): the response is returned as the protocol read it.
 *                      A body that does not match the declared output type
 *                      (a missing member, a wrong primitive, a non-JSON
 *                      body) still succeeds.
 *   strict:            the response is decoded against the output schema,
 *                      and a mismatch fails the call with the SDK's
 *                      `<Sdk>ParseError` (AWS: `ParseError`).
 *
 * The mode is one {@link ResponseValidation} reference keyed by a string, so
 * a single `Layer` switches every distilled SDK in a program -- AWS,
 * Cloudflare, Neon, ... -- at once, and nests like any other Effect service:
 *
 * ```ts
 * import { ResponseValidation } from "@distilled.cloud/core";
 *
 * // whole program
 * program.pipe(Effect.provide(ResponseValidation.strict));
 *
 * // one call back to lenient inside a strict program
 * Neon.getProject({ projectId }).pipe(Effect.provide(ResponseValidation.lenient));
 * ```
 *
 * The mode is set only by these layers; without one, every call is lenient.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as AST from "effect/SchemaAST";
import { type Decode, decoderFor, type SchemaMismatch } from "./response-validation-strict.ts";

export { SchemaMismatch } from "./response-validation-strict.ts";

export type Mode = "lenient" | "strict";

/**
 * The active validation mode. Read by protocols at call time on the calling
 * fiber; `lenient` unless a {@link strict} layer is provided.
 */
export const ResponseValidation = /*@__PURE__*/ Context.Reference<Mode>(
  "@distilled.cloud/core/ResponseValidation",
  { defaultValue: () => "lenient" },
);

/** Decode every 2xx response against its output schema; fail on mismatch. */
/**
 * The checker strict mode uses. The `strict` layer provides it, so the
 * checker is bundled only with programs that use `strict`.
 */
export const StrictDecoder = /*@__PURE__*/ Context.Reference<
  ((ast: AST.AST) => Decode) | undefined
>("@distilled.cloud/core/ResponseValidation/StrictDecoder", { defaultValue: () => undefined });

/**
 * A layer that is also the `Context` it provides. `Effect.provide` treats a
 * `Context` as a plain `provideContext`, so `Effect.provide(strict)` around
 * a single call costs a context merge instead of a layer build (scope, memo
 * map and a few fibers steps per call); every other use sees an ordinary
 * `Layer`. The context state is read through the prototype.
 */
const layerOfContext = (context: Context.Context<never>): Layer.Layer<never> => {
  const layer = Layer.succeedContext(context);
  const both = Object.create(context);
  const layerProto = Object.getPrototypeOf(layer);
  for (const key of Reflect.ownKeys(layerProto)) {
    if (key !== "pipe") both[key] = layerProto[key];
  }
  both.build = (layer as unknown as { build: unknown }).build;
  return both;
};

export const strict: Layer.Layer<never> = /*@__PURE__*/ layerOfContext(
  /*@__PURE__*/ Context.add(
    /*@__PURE__*/ Context.make(ResponseValidation, "strict"),
    StrictDecoder,
    decoderFor,
  ),
);

/** Return 2xx responses as read, without checking them against the schema. */
export const lenient: Layer.Layer<never> = /*@__PURE__*/ layerOfContext(
  /*@__PURE__*/ Context.make(ResponseValidation, "lenient"),
);

/** Whether the calling fiber is in strict mode. */
export const isStrict: Effect.Effect<boolean> = /*@__PURE__*/ Effect.map(
  ResponseValidation,
  (mode) => mode === "strict",
);

/**
 * For a 2xx body the protocol could not read into the shape it transforms
 * (e.g. invalid JSON): fail with `error` in strict mode, succeed with
 * `asRead` (usually the body text) in lenient mode.
 */
export const failIfStrict = <A, E>(error: E, asRead: A): Effect.Effect<A, E> =>
  Effect.flatMap(ResponseValidation, (mode) =>
    mode === "strict" ? Effect.fail(error) : Effect.succeed(asRead),
  );

/**
 * The schema error for `value` against `outputAst` in strict mode, `undefined`
 * when it matches or the mode is lenient. Synchronous, for protocols that
 * already hold the calling fiber's context.
 */
export const checkResponse = (
  context: Context.Context<any>,
  outputAst: AST.AST,
  value: unknown,
): SchemaMismatch | undefined => {
  if (Context.get(context, ResponseValidation) === "lenient") return undefined;
  const decoderOf = Context.get(context, StrictDecoder);
  if (!decoderOf) {
    throw new Error("strict response validation needs the ResponseValidation.strict layer");
  }
  return decoderOf(outputAst)(value);
};

export const validateResponse = <E>(
  outputAst: AST.AST,
  value: unknown,
  onError: (cause: SchemaMismatch) => E,
): Effect.Effect<unknown, E> =>
  Effect.withFiber((fiber) => {
    const error = checkResponse(fiber.context as Context.Context<any>, outputAst, value);
    return error === undefined ? Effect.succeed(value) : Effect.fail(onError(error));
  });
