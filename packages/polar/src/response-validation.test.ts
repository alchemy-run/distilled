import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { PolarParseError } from "./errors.ts";
import type { PolarOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { eventsListNames } from "./services/polar.ts";

// eventsListNames declares `{ items: EventName[]; pagination: { total_count: number; max_page: number } }`.
const run = (body: string) =>
  runValidationModes(
    eventsListNames({}).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Polar response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      items: [
        {
          name: "api_call",
          label: "API call",
          source: "user",
          occurrences: 3,
          first_seen: "2024-01-01T00:00:00Z",
          last_seen: "2024-01-02T00:00:00Z",
        },
      ],
      pagination: { total_count: 1, max_page: 1 },
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { items: [] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(PolarParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(PolarParseError);
  });
});

// PolarParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [PolarParseError] extends [PolarOpError] ? true : false = true;
