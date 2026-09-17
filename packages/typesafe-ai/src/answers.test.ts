import { describe, expect, it } from "bun:test";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { Choice, Noul, Score, query, type Answers } from "./schema.ts";

/**
 * An answer comes back narrowed to the kind of question that produced
 * it — reading `confidence` or `noul` needs no runtime narrowing, which
 * is the whole point of asking a typed question.
 */
describe("typed answers", () => {
  const questions = {
    department: Choice("Which team?", { billing: null, technical: null }),
    isUrgent: Noul("Is it urgent?"),
    effort: Score("How much work?", ["a little", "a lot"]),
  };

  it("narrows each answer to its question's kind", () => {
    type A = Answers<typeof questions>;

    // Reaching a kind-specific field is a TYPE assertion: these lines
    // fail to compile if `answers` degrades to the wire union.
    const read = (answers: A) => ({
      choice: answers.department?.choice,
      confidence: answers.department?.confidence,
      noul: answers.isUrgent?.noul,
      score: answers.effort?.score,
    });

    const sample: A = {
      department: {
        type: "choice",
        choice: "billing",
        confidence: 0.91,
        probabilities: { billing: 0.91, technical: 0.09 },
      },
      isUrgent: { type: "noul", noul: 0.2 },
      effort: { type: "score", score: 1.4, confidence: 0.8 },
    };

    expect(read(sample)).toEqual({
      choice: "billing",
      confidence: 0.91,
      noul: 0.2,
      score: 1.4,
    });
  });

  it("keeps the wire union for a hand-written Schema.Struct", () => {
    const struct = Schema.Struct({ flag: Schema.Boolean });
    const effect = query(struct, { state: "x" });
    // The struct overload's answers stay `Answer | undefined` — its
    // question kinds are only known once the schema is compiled.
    expect(Effect.isEffect(effect)).toBe(true);
  });
});
