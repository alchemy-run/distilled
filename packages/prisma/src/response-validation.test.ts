import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiToken } from "./credentials.ts";
import { PrismaParseError } from "./errors.ts";
import type { PrismaOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getDatabaseUsage } from "./services/management.ts";

// getDatabaseUsage declares `{ period: { start; end }; metrics: { … }; generatedAt: string }`.
const run = (body: string) =>
  runValidationModes(
    getDatabaseUsage({ databaseId: "db_1" }).pipe(
      Retry.none,
      Effect.provide(fromApiToken({ apiToken: Redacted.make("test") })),
    ),
    { body },
  );

describe("Prisma response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      period: { start: "2026-09-01", end: "2026-09-29" },
      metrics: {
        operations: { used: 10, unit: "ops" },
        storage: { used: 1, unit: "GiB" },
      },
      generatedAt: "2026-09-29T00:00:00Z",
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
    expect((strict as any).failure).toBeInstanceOf(PrismaParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(PrismaParseError);
  });
});

// PrismaParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [PrismaParseError] extends [PrismaOpError] ? true : false = true;
