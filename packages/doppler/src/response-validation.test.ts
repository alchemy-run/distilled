import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { DopplerParseError } from "./errors.ts";
import type { DopplerOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { generateCliAuth } from "./services/doppler.ts";

// generateCliAuth declares required `code`, `polling_code` (sensitive), and
// `auth_url`. It uses the unauthenticated protocol, so no credentials.
const run = (body: string) =>
  runValidationModes(
    generateCliAuth({
      hostname: "host",
      version: "3.0.0",
      os: "linux",
      arch: "x64",
    }).pipe(Retry.none),
    { body },
  );

describe("Doppler response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      code: "abc",
      polling_code: "secret",
      auth_url: "https://dashboard.doppler.com/workplace/auth/cli",
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    for (const result of [lenient, strict]) {
      expect(result).toMatchObject({
        _tag: "Success",
        success: { code: body.code, auth_url: body.auth_url },
      });
      const pollingCode: Redacted.Redacted<string> = (result as any).success.polling_code;
      expect(Redacted.value(pollingCode)).toBe("secret");
    }
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { code: "abc" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(DopplerParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(DopplerParseError);
  });
});

// DopplerParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [DopplerParseError] extends [DopplerOpError] ? true : false =
  true;
