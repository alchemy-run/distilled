import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { ParseError } from "../../src/errors.ts";
import {
  readEffectStreamAsText,
  readStreamAsBytes,
  readStreamAsText,
} from "../../src/util/stream.ts";

/** A body that sends one chunk, then fails like a reset connection. */
const resetBody = () =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"partial":'));
    },
    pull(controller) {
      controller.error(new Error("socket hang up"));
    },
  });

class SourceError extends Data.TaggedError("SourceError")<{}> {}

describe("reading a body stream that errors", () => {
  test("readStreamAsText fails with a ParseError", async () => {
    const error = await Effect.runPromise(Effect.flip(readStreamAsText(resetBody())));
    expect(error).toBeInstanceOf(ParseError);
    expect(error.message).toBe("Failed to read the response body: socket hang up");
  });

  test("readStreamAsBytes fails with a ParseError", async () => {
    const error = await Effect.runPromise(Effect.flip(readStreamAsBytes(resetBody())));
    expect(error).toBeInstanceOf(ParseError);
    expect(error.message).toBe("Failed to read the response body: socket hang up");
  });

  test("readEffectStreamAsText fails with the stream's own error", async () => {
    const stream = Stream.concat(
      Stream.make(new TextEncoder().encode("a")),
      Stream.fail(new SourceError()),
    );
    const error = await Effect.runPromise(Effect.flip(readEffectStreamAsText(stream)));
    expect(error).toBeInstanceOf(SourceError);
  });

  test("the readers still read a body that does not error", async () => {
    const body = () =>
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("hé"));
          controller.close();
        },
      });
    expect(await Effect.runPromise(readStreamAsText(body()))).toBe("hé");
    expect(await Effect.runPromise(readStreamAsBytes(body()))).toEqual(
      new TextEncoder().encode("hé"),
    );
    expect(
      await Effect.runPromise(readEffectStreamAsText(Stream.make(new TextEncoder().encode("hé")))),
    ).toBe("hé");
  });
});
