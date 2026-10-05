import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { credentials } from "./credentials.ts";
import { GithubParseError } from "./errors.ts";
import type { GithubOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getTemplate } from "./services/gitignore.ts";

// getTemplate declares `{ name: string; source: string }`.
const run = (body: string) =>
  runValidationModes(
    getTemplate({ name: "Node" }).pipe(
      Retry.none,
      Effect.provide(credentials({ token: Redacted.make("test") })),
    ),
    { body },
  );

describe("Github response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { name: "Node", source: "node_modules/\\n" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { name: "Node" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(GithubParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(GithubParseError);
  });
});

// GithubParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [GithubParseError] extends [GithubOpError] ? true : false = true;
