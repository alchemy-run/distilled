/**
 * ASKING — one judgment, from typed questions to a decoded answer.
 *
 * `schema.ts` owns the question side: what a `Choice`/`Noul`/`Score` is
 * and how a schema compiles into the wire's question map. This module
 * owns the ASK: the call, its options, and the shape of what comes
 * back.
 */
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { Credentials } from "./credentials.ts";
import { TypesafeAiParseError } from "./errors.ts";
import type { AnswerOf, QuestionSchema } from "./schema.ts";
import { decodeAnswers, questionsFromSchema } from "./schema.ts";
import type {
  SystemOneError,
  SystemOneRequestState,
  SystemOneResponse,
  SystemOneResponseAnswersMap,
} from "./services/typesafe-ai.ts";
import { systemOne, type TypesafeAiOpContext } from "./services/typesafe-ai.ts";

export interface QueryOptions {
  readonly state: SystemOneRequestState;
  /** Defaults to the credentials' `defaultModel` (`jev-latest`). */
  readonly model?: string;
}

/** A judgment as a plain record: field name → question schema. */
export type QuestionFields = Record<string, Schema.Top>;

/**
 * The calibrated answers of one judgment, each narrowed to its own
 * question's kind — `confidence` and `probabilities` on a choice,
 * `noul` on a noul, `score` on a score, all reachable directly.
 */
export type Answers<Q extends QuestionFields> = {
  readonly [K in keyof Q]: AnswerOf<Q[K]> | undefined;
};

/**
 * One judgment: the raw response, `value` decoded into the questions'
 * types, and `answers` — narrowed per question when the questions were
 * built with `Choice` / `Noul` / `Score`, the wire union when they came
 * from a hand-written `Schema.Struct` whose kinds are only known at
 * runtime.
 */
export type QueryResult<
  A,
  Ans extends SystemOneResponseAnswersMap | object =
    SystemOneResponseAnswersMap,
> = Omit<SystemOneResponse, "answers"> & {
  readonly value: A;
  readonly answers: Ans;
};

/** A runtime Schema (a record of question fields has no `annotate`). */
const isSchemaTop = (input: object): input is Schema.Top =>
  "ast" in input &&
  typeof (input as { annotate?: unknown }).annotate === "function";

const tryCompile = <A>(run: () => A): Effect.Effect<A, TypesafeAiParseError> =>
  Effect.try({
    try: run,
    catch: (cause) =>
      cause instanceof TypesafeAiParseError
        ? cause
        : new TypesafeAiParseError({ body: {}, cause }),
  });

/**
 * Evaluate `state` against typed questions. Returns the raw TypeSafe
 * response plus `value`, the answers decoded into the questions' types.
 *
 * The questions are a PLAIN RECORD of fields — no struct ceremony:
 *
 * ```ts
 * const verdict = yield* TypesafeAi.query(
 *   {
 *     isUrgent: TypesafeAi.Noul("Does this convey urgency?"),
 *     department: TypesafeAi.Choice("Which team should handle this?", {
 *       billing: null,
 *       technical: null,
 *       sales: null,
 *     }),
 *   },
 *   { state: "Help! My payouts have been failing for 3 days." },
 * );
 * verdict.value.department; // "billing" — decoded, typed
 * verdict.answers.department?.confidence; // 0.94 — narrowed to a choice
 * ```
 *
 * A full `Schema.Struct` (or any struct-shaped schema) is the advanced
 * form for reuse and derivation — both are accepted.
 */
export function query<const Q extends QuestionFields>(
  questions: Q,
  options: QueryOptions,
): Effect.Effect<
  QueryResult<{ readonly [K in keyof Q]: Q[K]["Type"] }, Answers<Q>>,
  SystemOneError | TypesafeAiParseError,
  TypesafeAiOpContext | Q[keyof Q]["DecodingServices"]
>;
export function query<S extends Schema.Top>(
  schema: S,
  options: QueryOptions,
): Effect.Effect<
  QueryResult<S["Type"]>,
  SystemOneError | TypesafeAiParseError,
  TypesafeAiOpContext | S["DecodingServices"]
>;
export function query(
  input: Schema.Top | QuestionFields,
  options: QueryOptions,
): Effect.Effect<
  QueryResult<unknown>,
  SystemOneError | TypesafeAiParseError,
  TypesafeAiOpContext
> {
  const schema = isSchemaTop(input)
    ? input
    : Schema.Struct(input as QuestionFields);
  return Effect.gen(function* () {
    const resolve = yield* Credentials;
    const creds = yield* resolve;
    const questions = yield* tryCompile(() => questionsFromSchema(schema));
    const response = yield* systemOne({
      state: options.state,
      model: options.model ?? creds.defaultModel,
      questions,
    });
    const value = yield* decodeAnswers(schema, response.answers);
    return { ...response, value };
  }) as Effect.Effect<
    QueryResult<unknown>,
    SystemOneError | TypesafeAiParseError,
    TypesafeAiOpContext
  >;
}
