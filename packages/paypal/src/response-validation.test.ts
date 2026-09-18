import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { PaypalParseError } from "./errors.ts";
import type { PaypalOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getWebProfile } from "./services/payment_experience_web_experience_profiles_v1.ts";

// getWebProfile declares `WebProfile`, whose `name: string` is required.
const run = (body: string) =>
  runValidationModes(
    getWebProfile({ id: "XP-1" }).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("PayPal response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { id: "XP-1", name: "checkout", temporary: false };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { id: "XP-1", temporary: false };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(PaypalParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(PaypalParseError);
  });
});

// PaypalParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [PaypalParseError] extends [PaypalOpError] ? true : false = true;
