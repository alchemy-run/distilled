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
 * import * as Schema from "effect/Schema"
 * import * as TypesafeAi from "@distilled.cloud/typesafe-ai"
 *
 * const Ticket = Schema.Struct({
 *   isUrgent: Schema.Boolean.annotate({
 *     description: "Does this convey urgency?",
 *   }),
 *   department: Schema.Literals(["billing", "technical", "sales"]).annotate({
 *     description: "Which team should handle this?",
 *   }),
 *   frustration: TypesafeAi.Score(["Calm", "Frustrated", "Very angry"]).annotate({
 *     description: "How frustrated is the customer?",
 *   }),
 * })
 *
 * const { value, answers } = yield* TypesafeAi.query(Ticket, {
 *   state: "Help! My payouts have been failing for 3 days.",
 * })
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

export type QuestionType = "noul" | "choice" | "score";

const annotation = (ast: AST.AST, key: PropertyKey): unknown => {
  const direct = ast.annotations?.[key as keyof typeof ast.annotations];
  if (direct !== undefined) return direct;
  const resolved = resolveNode(ast);
  if (resolved === ast) return undefined;
  return resolved.annotations?.[key as keyof typeof resolved.annotations];
};

const instructionsOf = (ast: AST.AST, fallback: string): string => {
  const description = annotation(ast, "description");
  if (typeof description === "string") return description;
  const title = annotation(ast, "title");
  if (typeof title === "string") return title;
  return fallback;
};

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

const asNoul = (answer: Answer | undefined): NoulAnswer | undefined =>
  answer !== undefined &&
  typeof answer === "object" &&
  answer !== null &&
  "noul" in answer &&
  typeof (answer as NoulAnswer).noul === "number"
    ? (answer as NoulAnswer)
    : undefined;

const asChoice = (answer: Answer | undefined): ChoiceAnswer | undefined =>
  answer !== undefined &&
  typeof answer === "object" &&
  answer !== null &&
  "choice" in answer &&
  typeof (answer as ChoiceAnswer).choice === "string"
    ? (answer as ChoiceAnswer)
    : undefined;

const asScore = (answer: Answer | undefined): ScoreAnswer | undefined =>
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
 * Number schema that becomes a TypeSafe score question. Levels are the
 * ordered rubric; the decoded value is the probability-weighted score.
 */
export const Score = <
  const Levels extends readonly [string, string, ...string[]],
>(
  levels: Levels,
): Schema.Schema<number> =>
  Schema.Number.annotate({
    [questionTypeId]: "score",
    [criteriaId]: levels,
  });

/**
 * Boolean schema that becomes a TypeSafe noul question. Decoded as
 * `noul >= threshold` (default 0.5).
 */
export const Noul = (options?: {
  readonly threshold?: number;
  readonly criteria?: {
    readonly true?: Description;
    readonly false?: Description;
  };
}): Schema.Schema<boolean> =>
  Schema.Boolean.annotate({
    [questionTypeId]: "noul",
    ...(options?.threshold !== undefined
      ? { [noulThresholdId]: options.threshold }
      : {}),
    ...(options?.criteria !== undefined
      ? { [criteriaId]: options.criteria }
      : {}),
  });

/**
 * String-literal schema that becomes a TypeSafe choice question. Keys are
 * the options; values are rubric descriptions (`null` if the name is enough).
 */
export const Choice = <const C extends Record<string, Description>>(
  criteria: C,
): Schema.Schema<keyof C & string> => {
  const keys = Object.keys(criteria);
  if (keys.length === 0) {
    throw new TypesafeAiParseError({
      body: {},
      cause: "Choice() requires at least one option",
    });
  }
  return Schema.Literals(keys as [string, ...string[]]).annotate({
    [questionTypeId]: "choice",
    [criteriaId]: criteria,
  }) as Schema.Schema<keyof C & string>;
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

export type QueryResult<A> = SystemOneResponse & { readonly value: A };

/**
 * Evaluate `state` against an Effect Schema of questions. Returns the raw
 * TypeSafe response plus `value`, the answers decoded into the schema type.
 */
export const query = <S extends Schema.Top>(
  schema: S,
  options: QueryOptions,
): Effect.Effect<
  QueryResult<S["Type"]>,
  SystemOneError | TypesafeAiParseError,
  TypesafeAiOpContext | S["DecodingServices"]
> =>
  Effect.gen(function* () {
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
  });
