import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import { FlyIoParseError } from "./errors.ts";
import type { FlyIoOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listApps } from "./services/machines.ts";

// listApps (Machines REST) declares `{ apps?: App[]; total_apps?: number }`.
const run = (body: string) =>
  runValidationModes(
    listApps({ org_slug: "personal" }).pipe(
      Retry.none,
      Effect.provide(credentials({ apiKey: "test" })),
    ),
    { body },
  );

describe("Fly.io Machines response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { apps: [{ id: "app-1", name: "my-app" }], total_apps: 1 };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong type: lenient returns it, strict fails", async () => {
    const body = { apps: [], total_apps: "one" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(FlyIoParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(FlyIoParseError);
  });
});

// FlyIoParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [FlyIoParseError] extends [FlyIoOpError] ? true : false = true;
