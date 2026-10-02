import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, DEFAULT_API_BASE_URL } from "./credentials.ts";
import { EasParseError } from "./errors.ts";
import type { ExpoEasOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { accessTokenDeleteAccessToken } from "./services/eas.ts";

const TestCredentials = Layer.succeed(
  Credentials,
  Effect.succeed({
    accessToken: Redacted.make("test"),
    apiBaseUrl: DEFAULT_API_BASE_URL,
  }),
);

// accessTokenDeleteAccessToken declares `{ id: string }`, unwrapped from
// `data.accessToken.deleteAccessToken`.
const run = (body: string) =>
  runValidationModes(
    accessTokenDeleteAccessToken({ id: "tok_1" }).pipe(Retry.none, Effect.provide(TestCredentials)),
    { body },
  );

const envelope = (payload: unknown) =>
  JSON.stringify({ data: { accessToken: { deleteAccessToken: payload } } });

describe("EAS response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const payload = { id: "tok_1" };
    const { lenient, strict } = await run(envelope(payload));
    expect(lenient).toMatchObject({ _tag: "Success", success: payload });
    expect(strict).toMatchObject({ _tag: "Success", success: payload });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run(envelope({}));
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(EasParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(EasParseError);
  });
});

// EasParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [EasParseError] extends [ExpoEasOpError] ? true : false = true;
