import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { OnepasswordParseError } from "./errors.ts";
import type { OnepasswordOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getVaults } from "./services/onepassword.ts";

// getVaults declares `Vault[]` with every Vault member optional, so the mismatch is a wrong primitive.
const run = (body: string) =>
  runValidationModes(
    getVaults({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: Redacted.make("test") }))),
    { body },
  );

describe("Onepassword response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = [{ id: "v1", name: "Private", items: 3 }];
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = [{ id: 1, name: "Private" }];
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(OnepasswordParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(OnepasswordParseError);
  });
});

// OnepasswordParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [OnepasswordParseError] extends [OnepasswordOpError]
  ? true
  : false = true;
