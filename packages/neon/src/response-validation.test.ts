import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { NeonParseError } from "./errors.ts";
import type { NeonOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getActiveRegions } from "./services/neon.ts";

// getActiveRegions declares `{ regions: RegionResponse[] }`.
const run = (body: string) =>
  runValidationModes(
    getActiveRegions({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("Neon response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { regions: [] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(NeonParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(NeonParseError);
  });
});

// NeonParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [NeonParseError] extends [NeonOpError] ? true : false = true;
