import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { GrowthBookParseError } from "./errors.ts";
import type { GrowthBookOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getCodeRefs } from "./services/growthbook.ts";

// getCodeRefs declares `{ codeRefs: CodeRef[] }`.
const run = (body: string) =>
  runValidationModes(
    getCodeRefs({ id: "feature-a" }).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("GrowthBook response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { codeRefs: [] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(GrowthBookParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(GrowthBookParseError);
  });
});

// GrowthBookParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [GrowthBookParseError] extends [GrowthBookOpError]
  ? true
  : false = true;
