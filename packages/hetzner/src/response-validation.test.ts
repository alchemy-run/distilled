import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "./credentials.ts";
import { HetznerParseError } from "./errors.ts";
import type { HetznerOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listLocations } from "./services/locations.ts";

// listLocations declares `{ locations: Location[]; meta: { pagination } }`.
const run = (body: string) =>
  runValidationModes(
    listLocations({}).pipe(
      Retry.none,
      Effect.provide(credentials({ token: Redacted.make("test") })),
    ),
    { body },
  );

describe("Hetzner response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      locations: [],
      meta: {
        pagination: {
          page: 1,
          per_page: 25,
          previous_page: null,
          next_page: null,
          last_page: 1,
          total_entries: 0,
        },
      },
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
    expect((strict as any).failure).toBeInstanceOf(HetznerParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(HetznerParseError);
  });
});

// HetznerParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [HetznerParseError] extends [HetznerOpError] ? true : false =
  true;
