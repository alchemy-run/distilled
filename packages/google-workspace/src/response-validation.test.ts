import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromAccessToken } from "./credentials.ts";
import { GoogleWorkspaceParseError } from "./errors.ts";
import type { GoogleWorkspaceOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getStartPageTokenChanges } from "./services/drive_v3.ts";

// Discovery schemas mark every member optional; getStartPageTokenChanges
// declares `{ startPageToken?: string; kind?: string }`, so the mismatch is a
// wrong primitive type.
const run = (body: string) =>
  runValidationModes(
    getStartPageTokenChanges({}).pipe(
      Retry.none,
      Effect.provide(fromAccessToken({ accessToken: Redacted.make("test") })),
    ),
    { body },
  );

describe("Google Workspace response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { kind: "drive#startPageToken", startPageToken: "123" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { kind: "drive#startPageToken", startPageToken: 123 };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(GoogleWorkspaceParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(GoogleWorkspaceParseError);
  });
});

// GoogleWorkspaceParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [GoogleWorkspaceParseError] extends [GoogleWorkspaceOpError]
  ? true
  : false = true;
