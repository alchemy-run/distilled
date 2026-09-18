import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import { SlackParseError } from "./errors.ts";
import type { SlackOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { billingInfo } from "./services/team.ts";

// team.billing.info declares `{ ok: boolean; plan: string }`; the payload
// shares the level of Slack's `{ ok: true, ... }` envelope.
const run = (body: string, headers?: Record<string, string>) =>
  runValidationModes(
    billingInfo({}).pipe(Retry.none, Effect.provide(credentials({ token: "xoxb-test" }))),
    { body, headers },
  );

describe("Slack response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { ok: true, plan: "free" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { ok: true };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(SlackParseError);
  });

  // A non-JSON 2xx body is read as raw bytes (the admin.analytics.getFile
  // download); lenient returns them, strict fails them for a struct output.
  test("a non-JSON body: lenient returns the raw bytes, strict fails", async () => {
    const { lenient, strict } = await run("not json", {
      "content-type": "application/gzip",
    });
    expect(lenient._tag).toBe("Success");
    const bytes = (lenient as any).success;
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(new TextDecoder().decode(bytes)).toBe("not json");
    expect((strict as any).failure).toBeInstanceOf(SlackParseError);
  });
});

// SlackParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [SlackParseError] extends [SlackOpError] ? true : false = true;
