import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { SentryParseError } from "./errors.ts";
import type { SentryOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listSeerModels } from "./services/sentry.ts";

// listSeerModels declares `{ models: string[] }`.
const run = (body: string) =>
  runValidationModes(
    listSeerModels({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("Sentry response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { models: ["gpt-4o"] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(SentryParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(SentryParseError);
  });
});

// SentryParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [SentryParseError] extends [SentryOpError] ? true : false = true;
