import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials, DEFAULT_API_BASE_URL } from "./credentials.ts";
import { AzureParseError } from "./errors.ts";
import type { AzureOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { ListServiceBySubscription } from "./services/apicenter.ts";

const TestCredentials = Layer.succeed(
  Credentials,
  Effect.succeed({
    bearerToken: Redacted.make("test"),
    subscriptionId: "00000000-0000-0000-0000-000000000000",
    apiBaseUrl: DEFAULT_API_BASE_URL,
  }),
);

// ListServiceBySubscription declares `{ value: Service[]; nextLink?: string }`.
const run = (body: string) =>
  runValidationModes(
    ListServiceBySubscription({
      subscriptionId: "00000000-0000-0000-0000-000000000000",
    }).pipe(Retry.none, Effect.provide(TestCredentials)),
    { body },
  );

describe("Azure response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { value: [{ location: "westus", name: "svc" }] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { nextLink: "https://management.azure.com/next" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(AzureParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(AzureParseError);
  });
});

// AzureParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [AzureParseError] extends [AzureOpError] ? true : false = true;
