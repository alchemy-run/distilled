import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { RedisCloudParseError } from "./errors.ts";
import type { RedisCloudOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getAccountPaymentMethods } from "./services/redisCloud.ts";

// getAccountPaymentMethods declares `{ accountId?: number; links?: ... }` (every member optional).
const run = (body: string) =>
  runValidationModes(
    getAccountPaymentMethods({}).pipe(
      Retry.none,
      Effect.provide(
        fromApiKey({
          apiKey: Redacted.make("test"),
          apiSecretKey: Redacted.make("test"),
        }),
      ),
    ),
    { body },
  );

describe("Redis Cloud response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      accountId: 42,
      links: [{ rel: "self", href: "https://api.redislabs.com/v1/payment-methods" }],
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body with a wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { accountId: "42" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(RedisCloudParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(RedisCloudParseError);
  });
});

// RedisCloudParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [RedisCloudParseError] extends [RedisCloudOpError]
  ? true
  : false = true;
