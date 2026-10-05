import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "./credentials.ts";
import { CloudflareParseError } from "./errors.ts";
import type { CloudflareOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { verifyToken } from "./services/user.ts";

// verifyToken declares `{ id: string; status: string; expiresOn?: string | null; notBefore?: string | null }`,
// unwrapped from the `{ success, errors, messages, result }` envelope.
const run = (body: string) =>
  runValidationModes(
    verifyToken({}).pipe(
      Retry.none,
      Effect.provide(credentials({ apiToken: Redacted.make("test") })),
    ),
    { body },
  );

const envelope = (result: unknown) =>
  JSON.stringify({ success: true, errors: [], messages: [], result });

describe("Cloudflare response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const { lenient, strict } = await run(
      envelope({
        id: "ed17574386854bf78a67040be0a770b0",
        status: "active",
        expires_on: "2030-01-01T00:00:00Z",
      }),
    );
    const expected = {
      id: "ed17574386854bf78a67040be0a770b0",
      status: "active",
      expiresOn: "2030-01-01T00:00:00Z",
    };
    expect(lenient).toMatchObject({ _tag: "Success", success: expected });
    expect(strict).toMatchObject({ _tag: "Success", success: expected });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run(envelope({ id: "ed17574386854bf78a67040be0a770b0" }));
    expect(lenient).toMatchObject({
      _tag: "Success",
      success: { id: "ed17574386854bf78a67040be0a770b0" },
    });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(CloudflareParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(CloudflareParseError);
    expect((strict as any).failure.body).toBe("not json");
  });
});

// CloudflareParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [CloudflareParseError] extends [CloudflareOpError]
  ? true
  : false = true;
