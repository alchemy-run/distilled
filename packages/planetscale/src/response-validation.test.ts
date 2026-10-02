import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromOAuth } from "./credentials.ts";
import { PlanetScaleParseError } from "./errors.ts";
import type { PlanetScaleOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getCurrentUser } from "./services/planetscale.ts";

// getCurrentUser declares `User`: `{ id; display_name; email; avatar_url; … }`.
const run = (body: string) =>
  runValidationModes(
    getCurrentUser({}).pipe(
      Retry.none,
      Effect.provide(fromOAuth({ accessToken: "test", organization: "org" })),
    ),
    { body },
  );

describe("PlanetScale response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      id: "u1",
      display_name: "Test",
      email: "test@example.com",
      avatar_url: "https://example.com/a.png",
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
      two_factor_auth_configured: false,
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
    expect((strict as any).failure).toBeInstanceOf(PlanetScaleParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(PlanetScaleParseError);
  });
});

// PlanetScaleParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [PlanetScaleParseError] extends [PlanetScaleOpError]
  ? true
  : false = true;
