import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromPassword } from "./credentials.ts";
import { OpencodeParseError } from "./errors.ts";
import type { OpencodeOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { globalHealth } from "./services/opencode.ts";

// globalHealth declares `{ healthy: boolean; version: string }`.
const run = (body: string) =>
  runValidationModes(
    globalHealth({}).pipe(Retry.none, Effect.provide(fromPassword({ password: "test" }))),
    { body },
  );

describe("Opencode response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { healthy: true, version: "1.0.0" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { healthy: true };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(OpencodeParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(OpencodeParseError);
  });
});

// OpencodeParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [OpencodeParseError] extends [OpencodeOpError] ? true : false =
  true;
