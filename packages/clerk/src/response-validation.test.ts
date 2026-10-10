import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import { mockHttpClient, runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import { describe, expect, test } from "vitest";
import { fromApiKey, platformFromApiKey } from "./credentials.ts";
import { ClerkParseError } from "./errors.ts";
import * as Retry from "./retry.ts";
import { getUser, NotFound } from "./services/clerk.ts";
import * as Platform from "./services/platform.ts";

describe("Clerk typed error codes", () => {
  test("a typed error carries the envelope's string code in both modes", async () => {
    const { lenient, strict } = await runValidationModes(
      getUser({ user_id: "user_missing" }).pipe(
        Retry.none,
        Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
      ),
      {
        status: 404,
        body: JSON.stringify({
          errors: [
            {
              message: "not found",
              long_message: "Resource not found",
              code: "resource_not_found",
            },
          ],
        }),
      },
    );
    for (const result of [lenient, strict]) {
      if (!Result.isFailure(result)) throw new Error("Expected a typed error");
      expect(result.failure).toBeInstanceOf(NotFound);
      if (!(result.failure instanceof NotFound)) throw new Error("Expected NotFound");
      expect(result.failure.code).toBe("resource_not_found");
    }
  });
});

describe("Clerk Platform protocol", () => {
  test("strict validation uses the Clerk ParseError hook", async () => {
    const result = await Effect.runPromise(
      Platform.getApplication({ applicationID: "app_123" }).pipe(
        Retry.none,
        Effect.provide(platformFromApiKey({ apiKey: Redacted.make("ak_test") })),
        Effect.provide(mockHttpClient(() => ({ body: "{}" }))),
        Effect.provide(ResponseValidation.strict),
        Effect.result,
      ),
    );
    if (!Result.isFailure(result)) throw new Error("Expected a parse error");
    expect(result.failure).toBeInstanceOf(ClerkParseError);
  });
});

// Platform operations require Platform credentials: Backend credentials
// alone leave `PlatformCredentials` unsatisfied.
// @ts-expect-error — PlatformCredentials is missing from the context.
export const backendCredentialsDoNotSatisfyPlatform: Effect.Effect<
  unknown,
  unknown,
  HttpClient.HttpClient
> = Platform.getApplication({ applicationID: "app_123" }).pipe(
  Effect.provide(fromApiKey({ apiKey: Redacted.make("sk_test") })),
);
