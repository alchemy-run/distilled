import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromToken } from "./credentials.ts";
import { Auth0ParseError } from "./errors.ts";
import type { Auth0OpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getActions } from "./services/auth0.ts";

// getActions declares only optional members (`total?: number`, `actions?: Action[]`, …),
// so the mismatch is a wrong primitive type.
const run = (body: string) =>
  runValidationModes(
    getActions({}).pipe(
      Retry.none,
      Effect.provide(
        fromToken({
          token: Redacted.make("test"),
          domain: "example.auth0.com",
        }),
      ),
    ),
    { body },
  );

describe("Auth0 response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { total: 0, page: 0, per_page: 50, actions: [] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { total: "zero" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(Auth0ParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(Auth0ParseError);
  });
});

// Auth0ParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [Auth0ParseError] extends [Auth0OpError] ? true : false = true;
