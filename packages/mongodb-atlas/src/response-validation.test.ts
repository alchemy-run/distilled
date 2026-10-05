import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromAccessToken } from "./credentials.ts";
import { MongodbAtlasParseError } from "./errors.ts";
import type { MongodbAtlasOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getOrg } from "./services/atlas.ts";

// getOrg declares an organization with a required `name: string`.
const run = (body: string) =>
  runValidationModes(
    getOrg({ orgId: "org-1" }).pipe(
      Retry.none,
      Effect.provide(fromAccessToken({ accessToken: Redacted.make("test") })),
    ),
    { body },
  );

describe("MongoDB Atlas response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { id: "org-1", name: "Acme" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(MongodbAtlasParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(MongodbAtlasParseError);
  });
});

// MongodbAtlasParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [MongodbAtlasParseError] extends [MongodbAtlasOpError]
  ? true
  : false = true;
