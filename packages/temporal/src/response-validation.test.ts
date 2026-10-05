import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { TemporalParseError } from "./errors.ts";
import type { TemporalOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getSystemInfo } from "./services/temporal.ts";

// getSystemInfo declares only optional members (`serverVersion?: string`,
// `capabilities?: {...}`), so the mismatch is a wrong primitive type.
const run = (body: string) =>
  runValidationModes(
    getSystemInfo({}).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Temporal response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { serverVersion: "1.27.0" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { serverVersion: 127 };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(TemporalParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(TemporalParseError);
  });
});

// TemporalParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [TemporalParseError] extends [TemporalOpError] ? true : false =
  true;
