import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import { ForgejoParseError } from "./errors.ts";
import type { ForgejoOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getVersion } from "./services/miscellaneous.ts";

// getVersion declares `{ version?: string }`; every member is optional, so the
// mismatch is a wrong primitive type.
const run = (body: string) =>
  runValidationModes(
    getVersion({}).pipe(
      Retry.none,
      Effect.provide(credentials({ token: "test", baseUrl: "https://git.example.com" })),
    ),
    { body },
  );

describe("Forgejo response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { version: "11.0.0" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { version: 11 };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ForgejoParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ForgejoParseError);
  });
});

// ForgejoParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ForgejoParseError] extends [ForgejoOpError] ? true : false =
  true;
