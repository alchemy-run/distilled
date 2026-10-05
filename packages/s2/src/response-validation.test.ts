import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "./credentials.ts";
import { S2ParseError } from "./errors.ts";
import type { S2OpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listBasins } from "./services/basins.ts";

// listBasins declares `{ basins: BasinInfo[]; has_more: boolean }`.
const run = (body: string) =>
  runValidationModes(
    listBasins({}).pipe(Retry.none, Effect.provide(credentials({ token: Redacted.make("test") }))),
    { body },
  );

describe("S2 response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { basins: [], has_more: false };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(S2ParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(S2ParseError);
  });
});

// S2ParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [S2ParseError] extends [S2OpError] ? true : false = true;
