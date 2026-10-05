import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { DigitalOceanParseError } from "./errors.ts";
import type { DigitalOceanOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getBalance } from "./services/digitalocean.ts";

// getBalance declares only optional string members (`account_balance?: string`, …),
// so the mismatch is a wrong primitive type.
const run = (body: string) =>
  runValidationModes(
    getBalance({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: Redacted.make("test") }))),
    { body },
  );

describe("DigitalOcean response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      month_to_date_balance: "0.00",
      account_balance: "0.00",
      month_to_date_usage: "0.00",
      generated_at: "2026-01-01T00:00:00Z",
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { account_balance: 0 };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(DigitalOceanParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(DigitalOceanParseError);
  });
});

// DigitalOceanParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [DigitalOceanParseError] extends [DigitalOceanOpError]
  ? true
  : false = true;
