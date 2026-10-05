import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { ApacheSupersetParseError } from "./errors.ts";
import type { ApacheSupersetOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getMe } from "./services/superset.ts";

// getMe declares `{ result?: UserResponseSchema }`; every member is optional,
// so the mismatch is a wrong primitive (`result.id` must be a number).
const run = (body: string) =>
  runValidationModes(
    getMe({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: Redacted.make("test") }))),
    { body },
  );

describe("Apache Superset response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { result: { id: 1, username: "admin", is_active: true } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body with a wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { result: { id: "one" } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ApacheSupersetParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ApacheSupersetParseError);
  });
});

// ApacheSupersetParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ApacheSupersetParseError] extends [ApacheSupersetOpError]
  ? true
  : false = true;
