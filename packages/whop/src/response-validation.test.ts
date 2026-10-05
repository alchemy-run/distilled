import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "./credentials.ts";
import { WhopParseError } from "./errors.ts";
import type { WhopOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getDisputeSummary } from "./services/disputes.ts";

// getDisputeSummary declares `{ groups: { … }; total: number }`.
const run = (body: string) =>
  runValidationModes(
    getDisputeSummary({}).pipe(
      Retry.none,
      Effect.provide(credentials({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Whop response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { groups: {}, total: 0 };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(WhopParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(WhopParseError);
  });
});

// WhopParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [WhopParseError] extends [WhopOpError] ? true : false = true;
