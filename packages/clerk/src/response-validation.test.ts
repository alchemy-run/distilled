import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { ClerkParseError } from "./errors.ts";
import type { ClerkOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getInstance } from "./services/clerk.ts";

// getInstance declares `{ object; id; environment_type; allowed_origins; workspace_id }`, all required.
const run = (body: string) =>
  runValidationModes(
    getInstance({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: Redacted.make("test") }))),
    { body },
  );

describe("Clerk response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      object: "instance",
      id: "ins_123",
      environment_type: "development",
      allowed_origins: null,
      workspace_id: null,
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
    expect((strict as any).failure).toBeInstanceOf(ClerkParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ClerkParseError);
  });
});

// ClerkParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ClerkParseError] extends [ClerkOpError] ? true : false = true;
