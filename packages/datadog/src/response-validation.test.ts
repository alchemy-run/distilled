import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { fromApiKey } from "./credentials.ts";
import { DatadogParseError } from "./errors.ts";
import type { DatadogOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getAllAuthMethods } from "./services/v2.ts";

// getAllAuthMethods declares `{ data: WebhooksAuthMethodResponseData[]; included?: ... }`.
const run = (body: string) =>
  runValidationModes(
    getAllAuthMethods({}).pipe(
      Retry.none,
      Effect.provide(
        fromApiKey({
          apiKey: Redacted.make("test"),
          applicationKey: Redacted.make("test"),
        }),
      ),
    ),
    { body },
  );

describe("Datadog response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { data: [] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(DatadogParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(DatadogParseError);
  });
});

// DatadogParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [DatadogParseError] extends [DatadogOpError] ? true : false =
  true;
