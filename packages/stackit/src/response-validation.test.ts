import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { credentials } from "./credentials.ts";
import { StackitParseError } from "./errors.ts";
import type { StackitOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listKeyPairs } from "./services/iaas.ts";

// listKeyPairs declares `{ items: Keypair[] }`.
const run = (body: string) =>
  runValidationModes(
    listKeyPairs({}).pipe(Retry.none, Effect.provide(credentials({ token: "test" }))),
    { body },
  );

describe("STACKIT response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { items: [{ name: "key-1", publicKey: "ssh-ed25519 AAAA" }] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(StackitParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(StackitParseError);
  });
});

// StackitParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [StackitParseError] extends [StackitOpError] ? true : false =
  true;
