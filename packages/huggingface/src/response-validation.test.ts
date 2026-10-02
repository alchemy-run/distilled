import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import { HuggingFaceParseError } from "./errors.ts";
import type { HuggingFaceOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getJobHardware } from "./services/jobs.ts";

// getJobHardware declares `Array<{ name: string; prettyName: string; cpu: string; … }>`.
const run = (body: string) =>
  runValidationModes(
    getJobHardware({}).pipe(Retry.none, Effect.provide(credentials({ token: "test" }))),
    { body },
  );

describe("HuggingFace response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = [
      {
        name: "cpu-basic",
        prettyName: "CPU Basic",
        cpu: "2 vCPU",
        ram: "16 GB",
        ephemeralStorage: "50 GB",
        accelerator: null,
        unitCostMicroUSD: 167,
        unitCostUSD: 0.000167,
        unitLabel: "second",
      },
    ];
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = [{ name: "cpu-basic" }];
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(HuggingFaceParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(HuggingFaceParseError);
  });
});

// HuggingFaceParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [HuggingFaceParseError] extends [HuggingFaceOpError]
  ? true
  : false = true;
