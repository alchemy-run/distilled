/**
 * LIVE smoke — auth, latency, decode, against the REAL API.
 *
 * Gated on `TYPESAFE_API_KEY`; skips clean anywhere the key is
 * absent. Pins the schema layer's contract end to end: the
 * question-first record DX round-trips into typed, decoded values
 * with the raw calibrated answers riding along.
 */
import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { CredentialsFromEnv } from "../src/credentials.ts";
import { query } from "../src/query.ts";
import { Choice, Noul, Score } from "../src/schema.ts";

const key = process.env.TYPESAFE_API_KEY;

describe.skipIf(!key)("typesafe live", () => {
  test("query: question-first record in, typed judgment out", async () => {
    const started = Date.now();
    const verdict = await Effect.runPromise(
      query(
        {
          disposition: Choice(
            "Should `message` get a short inline reply, or become a " +
              "work THREAD with dedicated people?",
            {
              inline: {
                what: "A short factual question answerable in one message",
                notFor: "Anything needing investigation or code changes",
                examples: ["What port does the dev server use?"],
              },
              thread: {
                what: "A work request: investigation, coding, or many steps",
                notFor: "Greetings or quick factual questions",
                examples: ["Please investigate the session leak in the driver"],
              },
            },
          ),
          urgency: Noul("Does `message` convey urgency or time pressure?"),
          complexity: Score("How much work is a good response to `message`?", [
            "Answerable from general knowledge in one message",
            "Needs looking at the repository",
            "Needs building, testing, or multiple steps",
          ]),
        },
        {
          state: {
            channel: "engineering",
            message:
              "The dev worker keeps OOMing when I import the distilled " +
              "repo — can someone dig into the pack ingest path today? " +
              "It's blocking the demo.",
          },
        },
      ).pipe(Effect.provide([CredentialsFromEnv, FetchHttpClient.layer])),
    );
    const elapsed = Date.now() - started;

    // decoded, typed values callers branch on
    expect(verdict.value.disposition).toBe("thread");
    expect(verdict.value.urgency).toBe(true);
    expect(verdict.value.complexity).toBeGreaterThan(0.5);

    // the raw calibrated layer rides along for confidence gates
    // asked as a Choice, so the answer IS a choice answer
    const disposition = verdict.answers.disposition;
    if (disposition === undefined) throw new Error("expected an answer");
    expect(disposition.confidence).toBeGreaterThan(0.5);
    const total = Object.values(disposition.probabilities).reduce(
      (sum: number, value) => sum + (value ?? 0),
      0,
    );
    expect(total).toBeCloseTo(1, 1);

    // the reflex-layer promise — generous bound for CI jitter
    expect(elapsed).toBeLessThan(10_000);
    console.log(
      `typesafe live: ${elapsed}ms, model ${verdict.model}, ` +
        `disposition ${verdict.value.disposition} @ ${disposition.confidence.toFixed(2)}`,
    );
  }, 30_000);
});
