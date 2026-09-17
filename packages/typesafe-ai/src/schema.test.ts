import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { TypesafeAiParseError } from "./errors.ts";
import {
  Choice,
  Noul,
  Score,
  decodeAnswers,
  questionsFromSchema,
} from "./schema.ts";

describe("questionsFromSchema", () => {
  test("maps Boolean → noul, Literals → choice, Score → score", () => {
    const Ticket = Schema.Struct({
      isUrgent: Schema.Boolean.annotate({
        description: "Does this convey urgency?",
      }),
      department: Schema.Literals(["billing", "technical", "sales"]).annotate({
        description: "Which team should handle this?",
      }),
      frustration: Score(["Calm", "Frustrated", "Very angry"]).annotate({
        description: "How frustrated is the customer?",
      }),
    });

    expect(questionsFromSchema(Ticket)).toEqual({
      isUrgent: {
        type: "noul",
        instructions: "Does this convey urgency?",
      },
      department: {
        type: "choice",
        instructions: "Which team should handle this?",
        criteria: {
          billing: null,
          technical: null,
          sales: null,
        },
      },
      frustration: {
        type: "score",
        instructions: "How frustrated is the customer?",
        criteria: ["Calm", "Frustrated", "Very angry"],
      },
    });
  });

  test("Noul/Choice helpers attach criteria and keep the field name as fallback instructions", () => {
    const Questions = Schema.Struct({
      spam: Noul({
        criteria: {
          true: "Unsolicited advertising",
          false: "A legitimate conversation",
        },
      }),
      tone: Choice({
        angry: "An upset or hostile message",
        calm: "A neutral or polite message",
      }),
    });

    expect(questionsFromSchema(Questions)).toEqual({
      spam: {
        type: "noul",
        instructions: "spam",
        criteria: {
          true: "Unsolicited advertising",
          false: "A legitimate conversation",
        },
      },
      tone: {
        type: "choice",
        instructions: "tone",
        criteria: {
          angry: "An upset or hostile message",
          calm: "A neutral or polite message",
        },
      },
    });
  });

  test("Schema.Number without score annotation is a noul probability", () => {
    const Questions = Schema.Struct({
      likely: Schema.Number.annotate({
        description: "Is this about billing?",
      }),
    });
    expect(questionsFromSchema(Questions)).toEqual({
      likely: {
        type: "noul",
        instructions: "Is this about billing?",
      },
    });
  });

  test("Schema.Enum of strings becomes a choice", () => {
    enum Dept {
      Billing = "billing",
      Technical = "technical",
    }
    const Questions = Schema.Struct({
      department: Schema.Enum(Dept).annotate({
        description: "Which team?",
      }),
    });
    expect(questionsFromSchema(Questions)).toEqual({
      department: {
        type: "choice",
        instructions: "Which team?",
        criteria: {
          billing: null,
          technical: null,
        },
      },
    });
  });

  test("rejects schemas that are not a struct of supported fields", () => {
    expect(() => questionsFromSchema(Schema.String)).toThrow(
      TypesafeAiParseError,
    );
    expect(() =>
      questionsFromSchema(
        Schema.Struct({ nested: Schema.Struct({ a: Schema.Boolean }) }),
      ),
    ).toThrow(TypesafeAiParseError);
  });
});

describe("decodeAnswers", () => {
  const Mixed = Schema.Struct({
    isUrgent: Schema.Boolean,
    department: Schema.Literals(["billing", "technical", "sales"]),
    frustration: Score(["Calm", "Frustrated", "Very angry"]),
    likely: Schema.Number,
  });

  test("decodes noul to boolean / probability, choice to the option, score to the weighted value", () => {
    const value = Effect.runSync(
      decodeAnswers(Mixed, {
        isUrgent: { type: "noul", noul: 0.92 },
        department: {
          type: "choice",
          choice: "technical",
          confidence: 0.82,
          probabilities: { billing: 0.08, technical: 0.85, sales: 0.07 },
        },
        frustration: {
          type: "score",
          score: 1.6,
          confidence: 0.78,
          legend: { "0": "Calm", "1": "Frustrated", "2": "Very angry" },
          probabilities: { "0": 0.05, "1": 0.3, "2": 0.65 },
        },
        likely: { type: "noul", noul: 0.31 },
      }),
    );
    expect(value).toEqual({
      isUrgent: true,
      department: "technical",
      frustration: 1.6,
      likely: 0.31,
    });
  });

  test("boolean noul uses 0.5 as the default threshold", () => {
    const Q = Schema.Struct({ flag: Schema.Boolean });
    expect(
      Effect.runSync(decodeAnswers(Q, { flag: { type: "noul", noul: 0.49 } })),
    ).toEqual({ flag: false });
    expect(
      Effect.runSync(decodeAnswers(Q, { flag: { type: "noul", noul: 0.5 } })),
    ).toEqual({ flag: true });
  });

  test("fails when the answer kind does not match the field", () => {
    const Q = Schema.Struct({ flag: Schema.Boolean });
    const result = Effect.runSync(
      decodeAnswers(Q, {
        flag: {
          type: "choice",
          choice: "yes",
          confidence: 1,
          probabilities: { yes: 1 },
        },
      }).pipe(Effect.result),
    );
    expect(result._tag).toBe("Failure");
    if (result._tag === "Failure") {
      expect(result.failure).toBeInstanceOf(TypesafeAiParseError);
    }
  });
});
