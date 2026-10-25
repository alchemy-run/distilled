import * as S from "@distilled.cloud/core/schema-lite";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { makeStreamParser } from "../../src/client/stream-parser.ts";
import { ParseError } from "../../src/errors.ts";
import { encodeMessage, stringHeader } from "../../src/eventstream/codec.ts";
import * as T from "../../src/traits.ts";

/** A raw event-stream body with one `Record` event per payload. */
const eventBody = async (...payloads: string[]) => {
  const frames = await Promise.all(
    payloads.map((payload) =>
      Effect.runPromise(
        encodeMessage({
          headers: {
            ":message-type": stringHeader("event"),
            ":event-type": stringHeader("Record"),
          },
          payload: new TextEncoder().encode(payload),
        }),
      ),
    ),
  );
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(frame);
      controller.close();
    },
  });
};

const parser = makeStreamParser(S.Struct({ events: T.EventStream(S.Unknown) }).ast)!;

const events = async (body: ReadableStream<Uint8Array>) =>
  (parser({ events: body }) as { events: Stream.Stream<unknown, Error> }).events;

describe("makeStreamParser", () => {
  test("decodes JSON event payloads", async () => {
    const stream = await events(await eventBody(`{"a":1}`));
    const collected = await Effect.runPromise(Stream.runCollect(stream));
    expect(JSON.parse(JSON.stringify(collected))).toEqual([{ _tag: "Record", a: 1 }]);
  });

  test("an event payload that is not JSON fails the stream with a ParseError", async () => {
    const stream = await events(await eventBody(`{"a":1}`, "not json"));
    const error = await Effect.runPromise(Effect.flip(Stream.runCollect(stream)));
    expect(error).toBeInstanceOf(ParseError);
    expect(error.message).toMatch(/^Event Record payload is not valid JSON: /);
  });
});
