import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { SpacetimeDBParseError } from "./errors.ts";
import type { SpacetimeDBOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getDatabase } from "./services/spacetimedb.ts";

// getDatabase declares `{ database_identity; owner_identity; host_type; initial_program }`.
const run = (body: string) =>
  runValidationModes(
    getDatabase({ name_or_identity: "quickstart" }).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: "test" })),
    ),
    { body },
  );

describe("SpacetimeDB response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      database_identity: "c200",
      owner_identity: "c201",
      host_type: "wasm",
      initial_program: "abc",
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
    expect((strict as any).failure).toBeInstanceOf(SpacetimeDBParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(SpacetimeDBParseError);
  });
});

// SpacetimeDBParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [SpacetimeDBParseError] extends [SpacetimeDBOpError]
  ? true
  : false = true;
