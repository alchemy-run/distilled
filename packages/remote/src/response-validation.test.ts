import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { RemoteParseError } from "./errors.ts";
import type { RemoteOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getPayItems } from "./services/remote.ts";

// getPayItems declares `{ data: { current_page, data, total_count, total_pages } }`.
const run = (body: string) =>
  runValidationModes(
    getPayItems({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: Redacted.make("test") }))),
    { body },
  );

describe("Remote response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      data: { current_page: 1, data: [], total_count: 0, total_pages: 0 },
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(RemoteParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(RemoteParseError);
  });
});

// RemoteParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [RemoteParseError] extends [RemoteOpError] ? true : false = true;
