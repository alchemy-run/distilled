import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { XataParseError } from "./errors.ts";
import type { XataOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listRegions } from "./services/xata.ts";

// listRegions declares `{ regions: Region[] }`.
const run = (body: string) =>
  runValidationModes(
    listRegions({ organizationID: "org-1" }).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Xata response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { regions: [] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(XataParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(XataParseError);
  });
});

// XataParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [XataParseError] extends [XataOpError] ? true : false = true;
