import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { RenderParseError } from "./errors.ts";
import type { RenderOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getUser } from "./services/render.ts";

// getUser declares `{ email: string; name: string }`.
const run = (body: string) =>
  runValidationModes(getUser({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))), {
    body,
  });

describe("Render response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { email: "test@example.com", name: "Test" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(RenderParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(RenderParseError);
  });
});

// RenderParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [RenderParseError] extends [RenderOpError] ? true : false = true;
