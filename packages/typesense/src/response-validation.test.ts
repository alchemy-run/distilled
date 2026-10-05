import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "./credentials.ts";
import { TypesenseParseError } from "./errors.ts";
import type { TypesenseOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getAliases } from "./services/typesense.ts";

// getAliases declares `{ aliases: CollectionAlias[] }`.
const run = (body: string) =>
  runValidationModes(
    getAliases({}).pipe(
      Retry.none,
      Effect.provide(
        credentials({
          apiKey: Redacted.make("test"),
          apiBaseUrl: "http://localhost:8108",
        }),
      ),
    ),
    { body },
  );

describe("Typesense response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { aliases: [] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(TypesenseParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(TypesenseParseError);
  });
});

// TypesenseParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [TypesenseParseError] extends [TypesenseOpError] ? true : false =
  true;
