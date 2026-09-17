/**
 * Derive TypeSafe questions from an Effect `Schema.Struct` and decode the
 * answers back into the schema's type.
 *
 * Mapping (override with {@link questionTypeId} / {@link criteriaId}):
 *
 * - `Schema.Boolean` → noul; decoded as `noul >= 0.5` (see {@link noulThresholdId})
 * - `Schema.Number` → noul; decoded as the probability in `[0, 1]`
 * - string `Schema.Literals` / `Schema.Enum` / `Schema.Literal` unions → choice
 * - {@link Score} (or a Number/Literals field annotated as `"score"`) → score
 *
 * Field `description` (or `title`) annotations become the question
 * `instructions`. The field name is used when neither is set.
 *
 * @example
 * ```ts
 * import * as TypesafeAi from "@distilled.cloud/typesafe-ai"
 *
 * const { value, answers } = yield* TypesafeAi.query(
 *   {
 *     isUrgent: TypesafeAi.Noul("Does this convey urgency?"),
 *     department: TypesafeAi.Choice("Which team should handle this?", {
 *       billing: null,
 *       technical: null,
 *       sales: null,
 *     }),
 *     frustration: TypesafeAi.Score("How frustrated is the customer?", [
 *       "Calm",
 *       "Frustrated",
 *       "Very angry",
 *     ]),
 *   },
 *   { state: "Help! My payouts have been failing for 3 days." },
 * )
 * ```
 */
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import { getProps, resolveNode } from "@distilled.cloud/core/protocol-http";
import { Credentials } from "./credentials.ts";
import { TypesafeAiParseError } from "./errors.ts";
import type { Description } from "./questions.ts";
import { choice, noul, score } from "./questions.ts";
import type {
  Answer,
  ChoiceAnswer,
  ChoiceQuestion,
  NoulAnswer,
  NoulQuestion,
  Question,
  ScoreAnswer,
  ScoreQuestion,
  SystemOneError,
  SystemOneRequestState,
  SystemOneResponse,
  SystemOneResponseAnswersMap,
} from "./services/typesafe-ai.ts";
import { systemOne } from "./services/typesafe-ai.ts";
import type { TypesafeAiOpContext } from "./protocol.ts";

/** `"noul" | "choice" | "score"` — forces the TypeSafe question kind. */
export const questionTypeId: unique symbol = Symbol.for(
  "@distilled.cloud/typesafe-ai/questionType",
);

/**
 * Extra criteria for the derived question: `{ true, false }` for noul,
 * `{ option: description | null }` for choice, or an ordered level list
 * for score.
 */
export const criteriaId: unique symbol = Symbol.for(
  "@distilled.cloud/typesafe-ai/criteria",
);

/** Boolean-noul decode threshold. Default `0.5`. */
export const noulThresholdId: unique symbol = Symbol.for(
  "@distilled.cloud/typesafe-ai/noulThreshold",
);

/** STRUCTURED instructions (`{ question, focus, compare, … }` — see
 *  docs.typesafe.ai/primitives/advanced). Text instructions ride the
 *  standard `description` annotation instead. */
export const instructionsId: unique symbol = Symbol.for(
  "@distilled.cloud/typesafe-ai/instructions",
);

export type QuestionType = "noul" | "choice" | "score";

declare const questionKind: unique symbol;

/**
 * The schema a question builder returns, carrying the KIND of question
 * it compiles to. The kind is phantom — nothing reads it at runtime —
 * and it is what lets {@link query} hand back an answer already
 * narrowed to `choice`, `noul` or `score`, rather than the wire union
 * every caller would otherwise have to re-discriminate by hand.
 *
 * Decoding an answer is pure, so the services are pinned to `never`:
 * `Schema.Schema<T>` would inherit `unknown` from `Schema.Top` and
 * poison the requirement channel of every query built from it.
 */
export interface QuestionSchema<
  T,
  K extends QuestionType = QuestionType,
> extends Schema.Codec<T, T, never, never> {
  readonly [questionKind]?: K;
}

/** The answer a question of kind `K` produces. */
export type AnswerOf<S> =
  S extends QuestionSchema<any, infer K>
    ? K extends "choice"
      ? ChoiceAnswer
      : K extends "noul"
        ? NoulAnswer
        : K extends "score"
          ? ScoreAnswer
          : Answer
    : Answer;

/**
 * The calibrated answers of one judgment, each narrowed to its own
 * question's kind — `confidence` and `probabilities` on a choice,
 * `noul` on a noul, `score` on a score, all reachable directly.
 */
export type Answers<Q extends QuestionFields> = {
  readonly [K in keyof Q]: AnswerOf<Q[K]> | undefined;
};

const annotation = (ast: AST.AST, key: PropertyKey): unknown => {
  const direct = ast.annotations?.[key as keyof typeof ast.annotations];
  if (direct !== undefined) return direct;
  const resolved = resolveNode(ast);
  if (resolved === ast) return undefined;
  return resolved.annotations?.[key as keyof typeof resolved.annotations];
};

const instructionsOf = (ast: AST.AST, fallback: string): Description => {
  const structured = annotation(ast, instructionsId);
  if (structured !== undefined) return structured as Description;
  const description = annotation(ast, "description");
  if (typeof description === "string") return description;
  const title = annotation(ast, "title");
  if (typeof title === "string") return title;
  return fallback;
};

/** The annotations one combinator writes for its instructions. */
const instructionsAnnotations = (
  instructions: Description,
): Record<PropertyKey, unknown> =>
  typeof instructions === "string"
    ? { description: instructions }
    : { [instructionsId]: instructions };

const stringLiterals = (ast: AST.AST): string[] | undefined => {
  const node = resolveNode(ast);
  if (node._tag === "Literal" && typeof node.literal === "string") {
    return [node.literal];
  }
  if (node._tag === "Union") {
    const out: string[] = [];
    for (const member of node.types) {
      const inner = resolveNode(member);
      if (inner._tag !== "Literal" || typeof inner.literal !== "string") {
        return undefined;
      }
      out.push(inner.literal);
    }
    return out.length > 0 ? out : undefined;
  }
  if (node._tag === "Enum") {
    const out: string[] = [];
    for (const [, value] of node.enums) {
      if (typeof value !== "string") return undefined;
      out.push(value);
    }
    return out.length > 0 ? out : undefined;
  }
  return undefined;
};

const asRecord = (value: unknown): Record<string, Description> | undefined => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }
  return value as Record<string, Description>;
};

const asLevelList = (
  value: unknown,
): readonly [Description, Description, ...Description[]] | undefined => {
  if (!Array.isArray(value) || value.length < 2) return undefined;
  return value as [Description, Description, ...Description[]];
};

interface CompiledField {
  readonly name: string;
  readonly kind: QuestionType;
  readonly question: Question;
  readonly decode: (answer: Answer | undefined) => unknown;
}

const compileField = (name: string, ast: AST.AST): CompiledField => {
  const node = resolveNode(ast);
  const forced = annotation(ast, questionTypeId);
  const kind: QuestionType | undefined =
    forced === "noul" || forced === "choice" || forced === "score"
      ? forced
      : node._tag === "Boolean"
        ? "noul"
        : node._tag === "Number"
          ? annotation(ast, criteriaId) !== undefined ||
            annotation(node, criteriaId) !== undefined
            ? "score"
            : "noul"
          : stringLiterals(ast) !== undefined
            ? "choice"
            : undefined;

  if (kind === undefined) {
    throw new TypesafeAiParseError({
      body: { field: name, tag: node._tag },
      cause: `Cannot derive a TypeSafe question from field "${name}" (${node._tag}). Use Boolean (noul), Number (noul probability or Score()), or string Literals/Enum (choice).`,
    });
  }

  const instructions = instructionsOf(ast, name);

  if (kind === "noul") {
    const rawCriteria = annotation(ast, criteriaId);
    const criteria = asRecord(rawCriteria);
    const question = noul(instructions, criteria as NoulQuestion["criteria"]);
    const thresholdRaw = annotation(ast, noulThresholdId);
    const threshold =
      typeof thresholdRaw === "number" && Number.isFinite(thresholdRaw)
        ? thresholdRaw
        : 0.5;
    const asBoolean = node._tag === "Boolean";
    return {
      name,
      kind,
      question,
      decode: (answer) => {
        const noulAnswer = asNoul(answer);
        if (noulAnswer === undefined) {
          throw new TypesafeAiParseError({
            body: { field: name, answer },
            cause: `Expected a noul answer for "${name}"`,
          });
        }
        return asBoolean ? noulAnswer.noul >= threshold : noulAnswer.noul;
      },
    };
  }

  if (kind === "choice") {
    const literals = stringLiterals(ast);
    const extra = asRecord(annotation(ast, criteriaId)) ?? {};
    const keys = literals ?? Object.keys(extra);
    if (keys.length === 0) {
      throw new TypesafeAiParseError({
        body: { field: name },
        cause: `Choice field "${name}" needs string literals or a criteria map`,
      });
    }
    const criteria: Record<string, Description> = {};
    for (const key of keys) {
      criteria[key] = extra[key] ?? null;
    }
    return {
      name,
      kind,
      question: choice(instructions, criteria as ChoiceQuestion["criteria"]),
      decode: (answer) => {
        const choiceAnswer = asChoice(answer);
        if (choiceAnswer === undefined) {
          throw new TypesafeAiParseError({
            body: { field: name, answer },
            cause: `Expected a choice answer for "${name}"`,
          });
        }
        return choiceAnswer.choice;
      },
    };
  }

  const levels =
    asLevelList(annotation(ast, criteriaId)) ??
    (stringLiterals(ast) as
      | readonly [Description, Description, ...Description[]]
      | undefined);
  if (levels === undefined) {
    throw new TypesafeAiParseError({
      body: { field: name },
      cause: `Score field "${name}" needs at least two criteria levels (use Score(["low", "high"]) or annotate criteriaId)`,
    });
  }
  return {
    name,
    kind,
    question: score(instructions, [...levels] as ScoreQuestion["criteria"]),
    decode: (answer) => {
      const scoreAnswer = asScore(answer);
      if (scoreAnswer === undefined) {
        throw new TypesafeAiParseError({
          body: { field: name, answer },
          cause: `Expected a score answer for "${name}"`,
        });
      }
      return scoreAnswer.score;
    },
  };
};

/**
 * Read a raw answer as the kind of question that produced it.
 *
 * The wire union types `type` as a plain string, so an answer can't be
 * narrowed by tag; these are how a caller reaches `confidence`,
 * `probabilities`, or `noul` with types intact.
 */
export const asNoul = (answer: Answer | undefined): NoulAnswer | undefined =>
  answer !== undefined &&
  typeof answer === "object" &&
  answer !== null &&
  "noul" in answer &&
  typeof (answer as NoulAnswer).noul === "number"
    ? (answer as NoulAnswer)
    : undefined;

/** @see {@link asNoul} */
export const asChoice = (
  answer: Answer | undefined,
): ChoiceAnswer | undefined =>
  answer !== undefined &&
  typeof answer === "object" &&
  answer !== null &&
  "choice" in answer &&
  typeof (answer as ChoiceAnswer).choice === "string"
    ? (answer as ChoiceAnswer)
    : undefined;

/** @see {@link asNoul} */
export const asScore = (answer: Answer | undefined): ScoreAnswer | undefined =>
  answer !== undefined &&
  typeof answer === "object" &&
  answer !== null &&
  "score" in answer &&
  typeof (answer as ScoreAnswer).score === "number"
    ? (answer as ScoreAnswer)
    : undefined;

const compileSchema = (schema: Schema.Top): CompiledField[] => {
  const props = getProps(schema.ast);
  if (props.length === 0) {
    throw new TypesafeAiParseError({
      body: { tag: schema.ast._tag },
      cause:
        "query() expects a Schema.Struct of question fields (Boolean, Literals, Score, …)",
    });
  }
  return props.map((prop) => compileField(String(prop.name), prop.type));
};

/**
 * Number schema that becomes a TypeSafe score question — QUESTION
 * FIRST, like reading it aloud: `Score("How urgent?", [levels])`.
 * Levels are the ordered rubric (text or structured JSON); the
 * decoded value is the probability-weighted score.
 */
export const Score = <
  const Levels extends readonly [Description, Description, ...Description[]],
>(
  instructions: Description,
  levels: Levels,
): QuestionSchema<number, "score"> =>
  Schema.Number.annotate({
    ...instructionsAnnotations(instructions),
    [questionTypeId]: "score",
    [criteriaId]: levels,
  });

/**
 * Boolean schema that becomes a TypeSafe noul question — QUESTION
 * FIRST: `Noul("Is this spam?")`. Decoded as `noul >= threshold`
 * (default 0.5).
 */
export const Noul = (
  instructions: Description,
  options?: {
    readonly threshold?: number;
    readonly criteria?: {
      readonly true?: Description;
      readonly false?: Description;
    };
  },
): QuestionSchema<boolean, "noul"> =>
  Schema.Boolean.annotate({
    ...instructionsAnnotations(instructions),
    [questionTypeId]: "noul",
    ...(options?.threshold !== undefined
      ? { [noulThresholdId]: options.threshold }
      : {}),
    ...(options?.criteria !== undefined
      ? { [criteriaId]: options.criteria }
      : {}),
  });

/**
 * String-literal schema that becomes a TypeSafe choice question —
 * QUESTION FIRST: `Choice("Which team?", { billing: …, technical: … })`.
 * Keys are the options; values are rubric descriptions (`null` if the
 * name is enough, text or structured JSON otherwise).
 */
export const Choice = <const C extends Record<string, Description>>(
  instructions: Description,
  criteria: C,
): QuestionSchema<keyof C & string, "choice"> => {
  const keys = Object.keys(criteria);
  if (keys.length === 0) {
    throw new TypesafeAiParseError({
      body: {},
      cause: "Choice() requires at least one option",
    });
  }
  return Schema.Literals(keys as [string, ...string[]]).annotate({
    ...instructionsAnnotations(instructions),
    [questionTypeId]: "choice",
    [criteriaId]: criteria,
  }) as QuestionSchema<keyof C & string, "choice">;
};

const tryCompile = <A>(run: () => A): Effect.Effect<A, TypesafeAiParseError> =>
  Effect.try({
    try: run,
    catch: (cause) =>
      cause instanceof TypesafeAiParseError
        ? cause
        : new TypesafeAiParseError({
            body: {},
            cause,
          }),
  });

/** Build the `questions` map `systemOne` expects from a Struct schema. */
export const questionsFromSchema = (
  schema: Schema.Top,
): Record<string, Question> => {
  const questions: Record<string, Question> = {};
  for (const field of compileSchema(schema)) {
    questions[field.name] = field.question;
  }
  return questions;
};

/** Decode a `systemOne` answers map into the schema's type. */
export const decodeAnswers = <S extends Schema.Top>(
  schema: S,
  answers: SystemOneResponseAnswersMap,
): Effect.Effect<S["Type"], TypesafeAiParseError, S["DecodingServices"]> =>
  Effect.gen(function* () {
    const candidate = yield* tryCompile(() => {
      const value: Record<string, unknown> = {};
      for (const field of compileSchema(schema)) {
        value[field.name] = field.decode(answers[field.name]);
      }
      return value;
    });
    return yield* Schema.decodeUnknownEffect(schema)(candidate).pipe(
      Effect.mapError(
        (cause) =>
          new TypesafeAiParseError({
            body: { answers, candidate },
            cause,
          }),
      ),
    );
  });

export interface QueryOptions {
  readonly state: SystemOneRequestState;
  /** Defaults to the credentials' `defaultModel` (`jev-latest`). */
  readonly model?: string;
}

/**
 * One judgment: the raw response, `value` decoded into the questions'
 * types, and `answers` — narrowed per question when the questions were
 * built with {@link Choice} / {@link Noul} / {@link Score}, the wire
 * union when they came from a hand-written `Schema.Struct` whose kinds
 * are only known at runtime.
 */
export type QueryResult<
  A,
  Ans extends SystemOneResponseAnswersMap | object =
    SystemOneResponseAnswersMap,
> = Omit<SystemOneResponse, "answers"> & {
  readonly value: A;
  readonly answers: Ans;
};

/** A judgment as a plain record: field name → question schema. */
export type QuestionFields = Record<string, Schema.Top>;

/** A runtime Schema (a record of question fields has no `annotate`). */
const isSchemaTop = (input: object): input is Schema.Top =>
  "ast" in input &&
  typeof (input as { annotate?: unknown }).annotate === "function";

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
 * verdict.value.department // "billing" — decoded, typed
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
