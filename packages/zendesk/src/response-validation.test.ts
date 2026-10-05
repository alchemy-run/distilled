import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiToken } from "./credentials.ts";
import { ZendeskParseError } from "./errors.ts";
import type { ZendeskOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { countTickets } from "./services/zendesk.ts";

// countTickets declares `{ count?: { value?: number; refreshed_at?: string } }`;
// every member is optional, so the mismatch is a wrong primitive type.
const run = (body: string) =>
  runValidationModes(
    countTickets({}).pipe(
      Retry.none,
      Effect.provide(
        fromApiToken({
          email: "test@example.com",
          apiToken: Redacted.make("test"),
          subdomain: "acme",
        }),
      ),
    ),
    { body },
  );

describe("Zendesk response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { count: { value: 5, refreshed_at: "2026-01-01T00:00:00Z" } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { count: { value: "five" } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ZendeskParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ZendeskParseError);
  });
});

// ZendeskParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ZendeskParseError] extends [ZendeskOpError] ? true : false =
  true;
