import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { AdyenParseError } from "./errors.ts";
import type { AdyenOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getPaymentLink } from "./services/adyen.ts";

// getPaymentLink declares required `amount`, `id`, `merchantAccount`,
// `reference`, `status`, and `url`.
const run = (body: string) =>
  runValidationModes(
    getPaymentLink({ linkId: "PL123" }).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Adyen response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      amount: { currency: "EUR", value: 1000 },
      id: "PL123",
      merchantAccount: "TestMerchant",
      reference: "order-1",
      status: "active",
      url: "https://test.adyen.link/PL123",
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { id: "PL123" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(AdyenParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(AdyenParseError);
  });
});

// AdyenParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [AdyenParseError] extends [AdyenOpError] ? true : false = true;
