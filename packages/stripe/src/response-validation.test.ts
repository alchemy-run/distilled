import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import { StripeParseError } from "./errors.ts";
import type { StripeOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { GetBalance } from "./services/stripe.ts";

// GetBalance declares `{ object; available; pending; livemode; … }`.
const run = (body: string) =>
  runValidationModes(
    GetBalance({}).pipe(Retry.none, Effect.provide(credentials({ apiKey: "sk_test_123" }))),
    { body },
  );

describe("Stripe response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      object: "balance",
      available: [],
      pending: [],
      livemode: false,
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
    expect((strict as any).failure).toBeInstanceOf(StripeParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(StripeParseError);
  });
});

// StripeParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [StripeParseError] extends [StripeOpError] ? true : false = true;
