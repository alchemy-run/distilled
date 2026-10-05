import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { DockerParseError } from "./errors.ts";
import type { DockerOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { systemVersion2 } from "./services/docker.ts";

// systemVersion2 declares `{ Platform?: { Name: string }; Version?: string; … }`.
const run = (body: string) =>
  runValidationModes(
    systemVersion2({}).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Docker response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { Platform: { Name: "Docker Engine" }, Version: "27.0.0" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { Platform: {}, Version: "27.0.0" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(DockerParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(DockerParseError);
  });
});

// DockerParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [DockerParseError] extends [DockerOpError] ? true : false = true;
