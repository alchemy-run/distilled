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
 * a single `Layer` switches every distilled SDK in a program — AWS,
 * Cloudflare, Neon, … — at once, and nests like any other Effect service:
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
import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";

export type Mode = "lenient" | "strict";

/**
 * The active validation mode. Read by protocols at call time on the calling
 * fiber; `lenient` unless a {@link strict} layer is provided.
 */
export const ResponseValidation = Context.Reference<Mode>(
  "@distilled.cloud/core/ResponseValidation",
  { defaultValue: () => "lenient" },
);

/** Decode every 2xx response against its output schema; fail on mismatch. */
export const strict: Layer.Layer<never> = Layer.succeed(ResponseValidation, "strict");

/** Return 2xx responses as read, without checking them against the schema. */
export const lenient: Layer.Layer<never> = Layer.succeed(ResponseValidation, "lenient");

/** Whether the calling fiber is in strict mode. */
export const isStrict: Effect.Effect<boolean> = Effect.map(
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

const decoders = new WeakMap<
  AST.AST,
  (input: unknown) => Effect.Effect<unknown, Schema.SchemaError>
>();

const decoderFor = (ast: AST.AST) => {
  let decode = decoders.get(ast);
  if (!decode) {
    decode = Schema.decodeUnknownEffect(Schema.make<Schema.Top>(ast)) as (
      input: unknown,
    ) => Effect.Effect<unknown, Schema.SchemaError>;
    decoders.set(ast, decode);
  }
  return decode;
};

/**
 * Check a 2xx response value against the operation's output schema.
 *
 * Lenient mode returns `value` untouched. Strict mode decodes it and, on a
 * mismatch, fails with `onError(schemaError)` — protocols pass their SDK's
 * `<Sdk>ParseError` constructor. On success the ORIGINAL value is returned
 * (members the schema does not model are kept), so switching modes never
 * changes what a successful call returns.
 *
 * `value` must already be in the schema's shape (TS member names), i.e.
 * after any wire→TS key mapping and before `Redacted` wrapping.
 */
export const validateResponse = <E>(
  outputAst: AST.AST,
  value: unknown,
  onError: (cause: Schema.SchemaError) => E,
): Effect.Effect<unknown, E> =>
  Effect.flatMap(ResponseValidation, (mode) =>
    mode === "lenient"
      ? Effect.succeed(value)
      : decoderFor(outputAst)(value).pipe(Effect.mapError(onError), Effect.as(value)),
  );
