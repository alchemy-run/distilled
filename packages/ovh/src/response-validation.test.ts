import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { OvhParseError } from "./errors.ts";
import type { OvhOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getIamPermissionsGroup } from "./services/iam.ts";

// getIamPermissionsGroup declares `{ description: string; name: string; permissions: { … }; … }`.
const run = (body: string) =>
  runValidationModes(
    getIamPermissionsGroup({
      permissionsGroupURN: "urn:v1:eu:permissionsGroup:test",
    }).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: Redacted.make("test") }))),
    { body },
  );

describe("OVH response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      name: "readers",
      description: "read only",
      permissions: { allow: [] },
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(OvhParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(OvhParseError);
  });
});

// OvhParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [OvhParseError] extends [OvhOpError] ? true : false = true;
