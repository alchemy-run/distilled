import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Endpoint from "./endpoint.ts";
import { CelldParseError } from "./errors.ts";
import type { CelldOpError } from "./protocol.ts";
import { evictCell } from "./services/node.ts";

// evictCell declares `{ ok: boolean }`.
const run = (body: string) =>
  runValidationModes(
    evictCell({ scope: "cell-a" }).pipe(Effect.provide(Endpoint.of("http://celld.test"))),
    { body },
  );

describe("Celld response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { ok: true };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(CelldParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(CelldParseError);
  });
});

// CelldParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [CelldParseError] extends [CelldOpError] ? true : false = true;
