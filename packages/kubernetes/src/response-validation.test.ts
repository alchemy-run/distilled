import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromToken } from "./credentials.ts";
import { KubernetesParseError } from "./errors.ts";
import type { KubernetesOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getAppsAPIGroup } from "./services/apps.ts";

// getAppsAPIGroup declares an APIGroup: `{ name: string; versions: [...] }`.
const run = (body: string) =>
  runValidationModes(
    getAppsAPIGroup({}).pipe(
      Retry.none,
      Effect.provide(fromToken({ token: "test", apiBaseUrl: "https://k8s.test" })),
    ),
    { body },
  );

describe("Kubernetes response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      kind: "APIGroup",
      apiVersion: "v1",
      name: "apps",
      versions: [{ groupVersion: "apps/v1", version: "v1" }],
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(KubernetesParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(KubernetesParseError);
  });
});

// KubernetesParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [KubernetesParseError] extends [KubernetesOpError]
  ? true
  : false = true;
