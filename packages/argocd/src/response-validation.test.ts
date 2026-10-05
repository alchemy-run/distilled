import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromToken } from "./credentials.ts";
import { ArgocdParseError } from "./errors.ts";
import type { ArgocdOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { versionServiceVersion } from "./services/argocd.ts";

// versionServiceVersion declares `{ Version?: string; ... }` (all optional).
const run = (body: string) =>
  runValidationModes(
    versionServiceVersion({}).pipe(
      Retry.none,
      Effect.provide(fromToken({ token: Redacted.make("test") })),
    ),
    { body },
  );

describe("Argo CD response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { Version: "v2.13.0", Platform: "linux/amd64" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong type: lenient returns it, strict fails", async () => {
    const body = { Version: 2 };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ArgocdParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(ArgocdParseError);
  });
});

// ArgocdParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ArgocdParseError] extends [ArgocdOpError] ? true : false = true;
