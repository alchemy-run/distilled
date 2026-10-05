import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { credentials } from "./credentials.ts";
import { ModalParseError } from "./errors.ts";
import type { ModalOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listEnvironment } from "./services/environment.ts";

// listEnvironment declares `{ items?: EnvironmentListItem[] }`; every member is
// optional, so the mismatch is a wrong primitive (`items` must be an array).
const run = (body: string) =>
  runValidationModes(
    listEnvironment({}).pipe(
      Retry.none,
      Effect.provide(
        credentials({
          tokenId: Redacted.make("ak-test"),
          tokenSecret: Redacted.make("as-test"),
        }),
      ),
    ),
    { body },
  );

describe("Modal response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { items: [{ name: "main", default: true }] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body with a wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { items: "main" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ModalParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ModalParseError);
  });
});

// ModalParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ModalParseError] extends [ModalOpError] ? true : false = true;
