import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { InngestParseError } from "./errors.ts";
import type { InngestOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { fetchV2Account } from "./services/inngest.ts";

// fetchV2Account declares `{ data?: V2Account; metadata?: … }`; every member is
// optional, so the mismatch is a wrong primitive (`data.email` must be a string).
const run = (body: string) =>
  runValidationModes(
    fetchV2Account({}).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Inngest response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { data: { id: "acct_1", email: "a@example.com" } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body with a wrong primitive type: lenient returns it, strict fails", async () => {
    const body = { data: { email: 42 } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(InngestParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(InngestParseError);
  });
});

// InngestParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [InngestParseError] extends [InngestOpError] ? true : false =
  true;
