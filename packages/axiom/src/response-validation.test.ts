import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { AxiomParseError } from "./errors.ts";
import type { AxiomOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getCurrentUser } from "./services/v2.ts";

// getCurrentUser declares `{ email: string; id: string; name: string; role?: … }`.
const run = (body: string) =>
  runValidationModes(
    getCurrentUser({}).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Axiom response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { email: "a@example.com", id: "u1", name: "Ada" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { id: "u1" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(AxiomParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(AxiomParseError);
  });
});

// AxiomParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [AxiomParseError] extends [AxiomOpError] ? true : false = true;
