import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { TurbopufferParseError } from "./errors.ts";
import type { TurbopufferOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listNamespaces } from "./services/turbopuffer.ts";

// listNamespaces declares `{ namespaces?: { id: string }[]; next_cursor?: string }`.
const run = (body: string) =>
  runValidationModes(
    listNamespaces({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("Turbopuffer response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { namespaces: [{ id: "ns-1" }], next_cursor: "c1" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { namespaces: [{}] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(TurbopufferParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(TurbopufferParseError);
  });
});

// TurbopufferParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [TurbopufferParseError] extends [TurbopufferOpError]
  ? true
  : false = true;
