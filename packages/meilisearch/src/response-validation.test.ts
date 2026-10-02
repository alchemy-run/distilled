import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { MeilisearchParseError } from "./errors.ts";
import type { MeilisearchOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getVersion } from "./services/meilisearch.ts";

// getVersion declares `{ commitSha: string; commitDate: string; pkgVersion: string }`.
const run = (body: string) =>
  runValidationModes(
    getVersion({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("Meilisearch response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      commitSha: "b46889b5f0f2f8b91438a08a358ba8f05fc09fc1",
      commitDate: "2024-01-01T00:00:00Z",
      pkgVersion: "1.12.0",
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { pkgVersion: "1.12.0" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(MeilisearchParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(MeilisearchParseError);
  });
});

// MeilisearchParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [MeilisearchParseError] extends [MeilisearchOpError]
  ? true
  : false = true;
