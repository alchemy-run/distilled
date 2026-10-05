import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { SquarespaceParseError } from "./errors.ts";
import type { SquarespaceOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listDiscounts } from "./services/squarespace.ts";

// listDiscounts declares `{ discounts: Discount[]; hasNextPage?; hasPreviousPage? }`.
const run = (body: string) =>
  runValidationModes(
    listDiscounts({}).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Squarespace response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { discounts: [], hasNextPage: false };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { hasNextPage: false };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(SquarespaceParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(SquarespaceParseError);
  });
});

// SquarespaceParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [SquarespaceParseError] extends [SquarespaceOpError]
  ? true
  : false = true;
