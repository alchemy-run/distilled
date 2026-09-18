import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { CustomerioParseError } from "./errors.ts";
import type { CustomerioOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getWebhook } from "./services/customerio.ts";

// getWebhook declares `{ name: string; endpoint: string; events: [...]; … }`.
const run = (body: string) =>
  runValidationModes(
    getWebhook({ webhook_id: 1 }).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("Customer.io response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      id: 1,
      name: "hook",
      endpoint: "https://example.com/hook",
      events: [],
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
    expect((strict as any).failure).toBeInstanceOf(CustomerioParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(CustomerioParseError);
  });
});

// CustomerioParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [CustomerioParseError] extends [CustomerioOpError]
  ? true
  : false = true;
