import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { ClerkParseError } from "./errors.ts";
import * as Retry from "./retry.ts";
import { getInstance } from "./services/clerk.ts";
import type { ClerkOpError } from "./protocol.ts";

// getInstance declares `{ object; id; environment_type; allowed_origins; allowed_subdomains;
// subdomain_allowlist_enabled; workspace_id }`, all required.
const run = (body: string) =>
  runValidationModes(
    getInstance({}).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: "test" })),
    ),
    { body },
  );

describe("Clerk response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      object: "instance",
      id: "ins_123",
      environment_type: "development",
      allowed_origins: null,
      allowed_subdomains: [],
      subdomain_allowlist_enabled: false,
      workspace_id: null,
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
    expect((strict as any).failure).toBeInstanceOf(ClerkParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ClerkParseError);
  });
});

// ClerkParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ClerkParseError] extends [ClerkOpError]
  ? true
  : false = true;
