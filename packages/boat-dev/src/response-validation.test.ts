import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { BoatParseError } from "./errors.ts";
import type { BoatOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getCurrentUser } from "./services/boat.ts";

// getCurrentUser declares `{ ok: boolean; type: string; user: { … } }`.
const run = (body: string) =>
  runValidationModes(
    getCurrentUser({}).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Boat response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { ok: true, type: "user", user: { login: "octocat" } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(BoatParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(BoatParseError);
  });
});

// BoatParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [BoatParseError] extends [BoatOpError] ? true : false = true;
