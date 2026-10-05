import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiToken } from "./credentials.ts";
import { OktaParseError } from "./errors.ts";
import type { OktaOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getDRStatus } from "./services/okta.ts";

// getDRStatus declares `{ status?: { domain?: string; isFailedOver?: boolean }[] }`.
// Its members are all optional, so the mismatch is a wrong primitive.
const run = (body: string) =>
  runValidationModes(
    getDRStatus({}).pipe(
      Retry.none,
      Effect.provide(
        fromApiToken({
          apiToken: Redacted.make("test"),
          apiBaseUrl: "https://example.okta.com",
        }),
      ),
    ),
    { body },
  );

describe("Okta response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      status: [{ domain: "example.okta.com", isFailedOver: false }],
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = {
      status: [{ domain: "example.okta.com", isFailedOver: "no" }],
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(OktaParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(OktaParseError);
  });
});

// OktaParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [OktaParseError] extends [OktaOpError] ? true : false = true;
