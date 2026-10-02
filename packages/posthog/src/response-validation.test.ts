import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import { PosthogParseError } from "./errors.ts";
import type { PosthogOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getAccountRelationshipDefinition } from "./services/account_relationship_definitions.ts";

// getAccountRelationshipDefinition declares required `id` and `name`.
const run = (body: string) =>
  runValidationModes(
    getAccountRelationshipDefinition({ project_id: "1", id: "rel-1" }).pipe(
      Retry.none,
      Effect.provide(credentials({ apiKey: "phx_test" })),
    ),
    { body },
  );

describe("PostHog response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { id: "rel-1", name: "owner", is_single_holder: true };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { id: "rel-1" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(PosthogParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(PosthogParseError);
  });
});

// PosthogParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [PosthogParseError] extends [PosthogOpError] ? true : false =
  true;
