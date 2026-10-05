import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { UnkeyParseError } from "./errors.ts";
import type { UnkeyOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { apisGetApi } from "./services/unkey.ts";

// apisGetApi declares `{ meta: { requestId: string }; data: { id: string; name: string } }`;
// Unkey success bodies keep their `{ meta, data }` envelope.
const run = (body: string) =>
  runValidationModes(
    apisGetApi({ apiId: "api_123" }).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Unkey response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      meta: { requestId: "req_123" },
      data: { id: "api_123", name: "payment-service-production" },
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { meta: { requestId: "req_123" }, data: { id: "api_123" } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(UnkeyParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(UnkeyParseError);
  });
});

// UnkeyParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [UnkeyParseError] extends [UnkeyOpError] ? true : false = true;
