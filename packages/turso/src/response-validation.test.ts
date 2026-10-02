import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, DEFAULT_API_BASE_URL } from "./credentials.ts";
import { TursoParseError } from "./errors.ts";
import type { TursoOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { validateAPIToken } from "./services/turso.ts";

const TestCredentials = Layer.succeed(
  Credentials,
  Effect.succeed({
    apiKey: Redacted.make("test"),
    apiBaseUrl: DEFAULT_API_BASE_URL,
  }),
);

// validateAPIToken declares `{ exp?: number }` (all optional).
const run = (body: string) =>
  runValidationModes(validateAPIToken({}).pipe(Retry.none, Effect.provide(TestCredentials)), {
    body,
  });

describe("Turso response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { exp: 1_900_000_000 };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong type: lenient returns it, strict fails", async () => {
    const body = { exp: "never" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(TursoParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(TursoParseError);
  });
});

// TursoParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [TursoParseError] extends [TursoOpError] ? true : false = true;
