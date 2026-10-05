import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { credentials } from "./credentials.ts";
import { VercelParseError } from "./errors.ts";
import type { VercelOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listAiGatewayRules } from "./services/ai_gateway.ts";

// listAiGatewayRules declares `{ rules: AiGatewayRule[] }`.
const run = (body: string) =>
  runValidationModes(
    listAiGatewayRules({}).pipe(
      Retry.none,
      Effect.provide(credentials({ token: Redacted.make("test") })),
    ),
    { body },
  );

describe("Vercel response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { rules: [] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(VercelParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(VercelParseError);
  });
});

// VercelParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [VercelParseError] extends [VercelOpError] ? true : false = true;
