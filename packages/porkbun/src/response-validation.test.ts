import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { PorkbunParseError } from "./errors.ts";
import type { PorkbunOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getPing } from "./services/porkbun.ts";

// getPing declares `{ status: string; yourIp: string; xForwardedFor?: string; credentialsValid?: boolean }`.
const run = (body: string) =>
  runValidationModes(
    getPing({}).pipe(
      Retry.none,
      Effect.provide(
        fromApiKey({
          apiKey: Redacted.make("test"),
          secretApiKey: Redacted.make("test"),
        }),
      ),
    ),
    { body },
  );

describe("Porkbun response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { status: "SUCCESS", yourIp: "203.0.113.1" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { status: "SUCCESS" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(PorkbunParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(PorkbunParseError);
  });
});

// PorkbunParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [PorkbunParseError] extends [PorkbunOpError] ? true : false =
  true;
