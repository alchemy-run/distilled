import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { credentials } from "./credentials.ts";
import { DiscordParseError } from "./errors.ts";
import type { DiscordOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getGateway } from "./services/discord.ts";

// getGateway declares `{ url: string }`.
const run = (body: string) =>
  runValidationModes(
    getGateway({}).pipe(Retry.none, Effect.provide(credentials({ token: Redacted.make("test") }))),
    { body },
  );

describe("Discord response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { url: "wss://gateway.discord.gg" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(DiscordParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(DiscordParseError);
  });
});

// DiscordParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [DiscordParseError] extends [DiscordOpError] ? true : false =
  true;
