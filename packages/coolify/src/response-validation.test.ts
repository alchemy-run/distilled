import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { CoolifyParseError } from "./errors.ts";
import type { CoolifyOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getCloudToken } from "./services/coolify.ts";

// getCloudToken declares only optional members (`uuid?: string`,
// `team_id?: number`, …), so the mismatch is a wrong primitive type.
const run = (body: string) =>
  runValidationModes(
    getCloudToken({ uuid: "tok-1" }).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: "test" })),
    ),
    { body },
  );

describe("Coolify response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      uuid: "tok-1",
      name: "hetzner",
      provider: "hetzner",
      team_id: 0,
      servers_count: 2,
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a member with the wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { uuid: "tok-1", team_id: "zero" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(CoolifyParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(CoolifyParseError);
  });
});

// CoolifyParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [CoolifyParseError] extends [CoolifyOpError] ? true : false =
  true;
