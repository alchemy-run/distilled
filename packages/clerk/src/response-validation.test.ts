import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey, platformFromApiKey } from "./credentials.ts";
import { ClerkParseError } from "./errors.ts";
import type { ClerkOpError } from "./protocol.ts";
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
      expect((result as any).failure).toBeInstanceOf(NotFound);
      expect((result as any).failure.code).toBe("resource_not_found");
    }
  });
});

// Platform.getApplication declares `{ application_id; name; instances }`, all required.
const runPlatform = (body: string) => {
  const requests: Array<{
    readonly url: string;
    readonly headers: Record<string, string>;
  }> = [];
  const result = runValidationModes(
    Platform.getApplication({ applicationID: "app_123" }).pipe(
      Retry.none,
      Effect.provide(platformFromApiKey({ apiKey: "ak_test" })),
    ),
    (request) => {
      requests.push({ url: request.url, headers: request.headers });
      return { body };
    },
  );
  return result.then((modes) => ({ ...modes, requests }));
};

describe("Clerk Platform response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      application_id: "app_123",
      name: "my-app",
      instances: [],
    };
    const { lenient, strict, requests } = await runPlatform(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
    // Host-only base URL + `/v1`, workspace key as bearer, no API version.
    expect(requests[0]?.url).toBe("https://api.clerk.com/v1/platform/applications/app_123");
    expect(requests[0]?.headers.authorization).toBe("Bearer ak_test");
    expect(requests[0]?.headers["clerk-api-version"]).toBeUndefined();
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await runPlatform(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ClerkParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await runPlatform("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ClerkParseError);
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

// ClerkParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ClerkParseError] extends [ClerkOpError] ? true : false = true;
