import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { ModrinthParseError } from "./errors.ts";
import type { ModrinthOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getUser } from "./services/modrinth.ts";

// getUser declares required `username`, `id`, `avatar_url`, `created`, `role`.
const run = (body: string) =>
  runValidationModes(
    getUser({ id_username: "alice" }).pipe(Retry.none, Effect.provide(fromApiKey({}))),
    { body },
  );

describe("Modrinth response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      username: "alice",
      id: "EEFFGGHH",
      avatar_url: "https://cdn.modrinth.com/a.png",
      created: "2024-01-01T00:00:00Z",
      role: "developer",
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { username: "alice", role: "developer" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ModrinthParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(ModrinthParseError);
  });
});

// ModrinthParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ModrinthParseError] extends [ModrinthOpError] ? true : false =
  true;
