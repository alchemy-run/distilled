import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { ArchilParseError } from "./errors.ts";
import type { ArchilOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listApiTokens } from "./services/archil.ts";

// listApiTokens declares `{ success: boolean; data: { tokens?: ApiTokenResponse[] } }`.
const run = (body: string) =>
  runValidationModes(
    listApiTokens({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("Archil response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      success: true,
      data: { tokens: [{ id: "tok_1", name: "ci", tokenSuffix: "abcd" }] },
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ArchilParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(ArchilParseError);
  });
});

// ArchilParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ArchilParseError] extends [ArchilOpError] ? true : false = true;
