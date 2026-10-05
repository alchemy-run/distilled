import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { LaunchDarklyParseError } from "./errors.ts";
import type { LaunchDarklyOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getIps } from "./services/launchdarkly.ts";

// getIps declares `{ addresses: string[]; outboundAddresses: string[] }`.
const run = (body: string) =>
  runValidationModes(
    getIps({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: Redacted.make("test") }))),
    { body },
  );

describe("LaunchDarkly response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { addresses: ["192.0.2.0/24"], outboundAddresses: [] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(LaunchDarklyParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(LaunchDarklyParseError);
  });
});

// LaunchDarklyParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [LaunchDarklyParseError] extends [LaunchDarklyOpError]
  ? true
  : false = true;
