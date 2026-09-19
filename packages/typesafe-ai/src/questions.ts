/**
 * Wire-level TypeSafe question constructors.
 *
 * These match the official JS SDK helpers (`noul` / `choice` / `score`) and
 * produce the objects `systemOne` sends as `questions`. For Effect Schema
 * structs, see {@link query} in `schema.ts`.
 */
import type {
  ChoiceQuestion,
  NoulQuestion,
  ScoreQuestion,
} from "./services/typesafe-ai.ts";

/** Instructions and criteria accept text, JSON, or null — same as the API. */
export type Description = NonNullable<NoulQuestion["instructions"]>;

/** Yes/no question; the answer is a probability in `[0, 1]`. */
export const noul = (
  instructions: NoulQuestion["instructions"],
  criteria?: NoulQuestion["criteria"],
): NoulQuestion =>
  criteria === undefined
    ? { type: "noul", instructions }
    : { type: "noul", instructions, criteria };

/** Select one named option; `null` criteria means "the name is enough". */
export const choice = (
  instructions: ChoiceQuestion["instructions"],
  criteria: ChoiceQuestion["criteria"],
): ChoiceQuestion => ({ type: "choice", instructions, criteria });

/** Ordered rubric; the answer is a probability-weighted score. */
export const score = (
  instructions: ScoreQuestion["instructions"],
  criteria: ScoreQuestion["criteria"],
): ScoreQuestion => ({ type: "score", instructions, criteria });
