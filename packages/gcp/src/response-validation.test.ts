import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromAccessToken } from "./credentials.ts";
import { GCPParseError } from "./errors.ts";
import type { GcpOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getProjects } from "./services/cloudresourcemanager_v3.ts";

// getProjects declares `Project`, whose members are all optional (as in most
// discovery documents), so the mismatch is a wrong primitive.
const run = (body: string) =>
  runValidationModes(
    getProjects({ name: "projects/415104041262" }).pipe(
      Retry.none,
      Effect.provide(fromAccessToken({ accessToken: "test" })),
    ),
    { body },
  );

describe("GCP response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      name: "projects/415104041262",
      projectId: "my-project",
      state: "ACTIVE",
      isManagementProject: false,
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { name: "projects/415104041262", isManagementProject: "no" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(GCPParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(GCPParseError);
  });
});

// GCPParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [GCPParseError] extends [GcpOpError] ? true : false = true;
