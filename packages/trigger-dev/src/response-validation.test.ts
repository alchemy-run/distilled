import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { TriggerDevParseError } from "./errors.ts";
import type { TriggerDevOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getQueueV1 } from "./services/trigger-dev.ts";

// getQueueV1 declares QueueObject: `{ id; name; type; running; queued; paused; … }`.
const run = (body: string) =>
  runValidationModes(
    getQueueV1({ queueParam: "default" }).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Trigger.dev response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      id: "queue_1",
      name: "default",
      type: "task",
      running: 0,
      queued: 0,
      paused: false,
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(TriggerDevParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(TriggerDevParseError);
  });
});

// TriggerDevParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [TriggerDevParseError] extends [TriggerDevOpError]
  ? true
  : false = true;
