import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as S from "@distilled.cloud/core/schema-lite";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { decodeEventStreamUnion } from "../../src/eventstream/parser.ts";

const events = S.Union([
  S.Struct({ chunk: S.Struct({ text: S.String }) }),
  S.Struct({ throttlingException: S.Struct({ message: S.String }) }),
]) as any;

const run = (input: ReadonlyArray<Record<string, unknown>>) =>
  Stream.runCollect(decodeEventStreamUnion(Stream.fromIterable(input) as any, events));

describe("decodeEventStreamUnion", () => {
  const mismatched = { chunk: { text: 42 } };
  const unmodeled = { UnmodeledError: { errorCode: "x", errorMessage: "y" } };

  test("strict mode ends the stream on a modeled event that does not match", async () => {
    const error = await Effect.runPromise(
      Effect.flip(run([mismatched]).pipe(Effect.provide(ResponseValidation.strict))),
    );
    expect(error._tag).toBe("EventParseError");
  });

  test("strict mode passes an unmodeled event through", async () => {
    const out = await Effect.runPromise(
      run([unmodeled]).pipe(Effect.provide(ResponseValidation.strict)),
    );
    expect(Array.from(out)).toEqual([unmodeled]);
  });

  test("lenient mode passes a mismatched event through", async () => {
    const out = await Effect.runPromise(run([mismatched]));
    expect(Array.from(out)).toEqual([mismatched]);
  });
});
