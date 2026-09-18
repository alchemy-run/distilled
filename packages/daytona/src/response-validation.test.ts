import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import { DaytonaParseError } from "./errors.ts";
import type { DaytonaOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getSnapshotBuildLogsUrl } from "./services/snapshots.ts";

// getSnapshotBuildLogsUrl declares `{ url: string }`.
const run = (body: string) =>
  runValidationModes(
    getSnapshotBuildLogsUrl({ id: "snap-1" }).pipe(
      Retry.none,
      Effect.provide(credentials({ apiKey: "test" })),
    ),
    { body },
  );

describe("Daytona response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { url: "https://logs.example/snap-1" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(DaytonaParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(DaytonaParseError);
  });
});

// DaytonaParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [DaytonaParseError] extends [DaytonaOpError] ? true : false =
  true;
