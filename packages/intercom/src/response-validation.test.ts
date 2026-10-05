import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { IntercomParseError } from "./errors.ts";
import type { IntercomOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { jobsStatus2 } from "./services/intercom.ts";

// jobsStatus2 declares `Jobs`, whose `id: string` is required.
const run = (body: string) =>
  runValidationModes(
    jobsStatus2({ job_id: "job_1" }).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Intercom response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { type: "job", id: "job_1", status: "success" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { type: "job", status: "success" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(IntercomParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(IntercomParseError);
  });
});

// IntercomParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [IntercomParseError] extends [IntercomOpError] ? true : false =
  true;
