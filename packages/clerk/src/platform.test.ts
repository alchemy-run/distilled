import { ConfigError } from "@distilled.cloud/core/errors";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import { mockHttpClient, type MockResponse } from "@distilled.cloud/core/testing";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import { describe, expect, test } from "vitest";
import {
  platformFromApiKey,
  PlatformCredentialsFromEnv,
  type PlatformCredentials,
} from "./credentials.ts";
import * as Retry from "./retry.ts";
import * as Platform from "./services/platform.ts";

interface Sent {
  readonly url: string;
  readonly headers: Record<string, string>;
}

/** Run one Platform operation in strict mode against a canned response. */
const run = <A, E>(
  effect: Effect.Effect<A, E, Platform.ClerkPlatformOpContext>,
  response: MockResponse,
  credentials: Layer.Layer<PlatformCredentials> = platformFromApiKey({
    apiKey: Redacted.make("ak_test"),
  }),
): Promise<{ readonly exit: Result.Result<A, E>; readonly sent: Sent[] }> => {
  const sent: Sent[] = [];
  return Effect.runPromise(
    effect.pipe(
      Retry.none,
      Effect.provide(credentials),
      Effect.provide(
        mockHttpClient((request) => {
          sent.push({ url: request.url, headers: request.headers });
          return response;
        }),
      ),
      Effect.provide(ResponseValidation.strict),
      Effect.result,
    ),
  ).then((exit) => ({ exit, sent }));
};

const clerkErrors = (code: string, message: string) =>
  JSON.stringify({
    errors: [{ message, long_message: message, code }],
    clerk_trace_id: "trace",
  });

describe("Platform requests", () => {
  const listApplications = (credentials?: Layer.Layer<PlatformCredentials>) =>
    run(Platform.listApplications({}), { body: "[]" }, credentials).then(({ sent }) => sent[0]!);

  test("sends a Bearer key to /v1/platform with no Clerk-API-Version", async () => {
    const sent = await listApplications();
    expect(sent.url).toBe("https://api.clerk.com/v1/platform/applications");
    expect(sent.headers["authorization"]).toBe("Bearer ak_test");
    expect(sent.headers["clerk-api-version"]).toBeUndefined();
  });

  test.each([
    ["https://x.test/", "https://x.test/v1/platform/applications"],
    ["https://x.test/proxy", "https://x.test/proxy/v1/platform/applications"],
    ["https://api.clerk.com/v1", "https://api.clerk.com/v1/platform/applications"],
    ["", "https://api.clerk.com/v1/platform/applications"],
  ])("apiBaseUrl %p sends to %s", async (apiBaseUrl, url) => {
    const sent = await listApplications(
      platformFromApiKey({ apiKey: Redacted.make("ak_test"), apiBaseUrl }),
    );
    expect(sent.url).toBe(url);
  });
});

describe("PlatformCredentialsFromEnv", () => {
  const withEnv = async <A>(
    env: Record<string, string | undefined>,
    f: () => Promise<A>,
  ): Promise<A> => {
    const saved = Object.fromEntries(Object.keys(env).map((k) => [k, process.env[k]]));
    const assign = (values: Record<string, string | undefined>) => {
      for (const [k, v] of Object.entries(values)) {
        if (v === undefined) delete process.env[k];
        else process.env[k] = v;
      }
    };
    assign(env);
    try {
      return await f();
    } finally {
      assign(saved);
    }
  };

  test("an empty CLERK_PLATFORM_API_URL falls back to the default host", () =>
    withEnv({ CLERK_PLATFORM_API_KEY: "ak_env", CLERK_PLATFORM_API_URL: "" }, async () => {
      const { sent } = await run(
        Platform.listApplications({}),
        { body: "[]" },
        PlatformCredentialsFromEnv,
      );
      expect(sent[0]?.url).toBe("https://api.clerk.com/v1/platform/applications");
      expect(sent[0]?.headers["authorization"]).toBe("Bearer ak_env");
    }));

  test("an unset CLERK_PLATFORM_API_KEY is a ConfigError", () =>
    withEnv({ CLERK_PLATFORM_API_KEY: undefined }, async () => {
      const exit = await Effect.runPromiseExit(
        Platform.listApplications({}).pipe(
          Effect.provide(PlatformCredentialsFromEnv),
          Effect.provide(mockHttpClient(() => ({ body: "[]" }))),
        ),
      );
      expect(Exit.isFailure(exit)).toBe(true);
      if (Exit.isSuccess(exit)) return;
      expect(Cause.squash(exit.cause)).toBeInstanceOf(ConfigError);
    }));
});

describe("Platform typed error codes", () => {
  test("a typed error carries the envelope's string code", async () => {
    const { exit } = await run(Platform.getApplication({ applicationID: "app_missing" }), {
      status: 404,
      body: clerkErrors("resource_not_found", "Resource not found"),
    });
    if (!Result.isFailure(exit)) throw new Error("Expected a typed error");
    expect(exit.failure).toBeInstanceOf(Platform.NotFound);
    if (!(exit.failure instanceof Platform.NotFound)) throw new Error("Expected NotFound");
    expect(exit.failure.code).toBe("resource_not_found");
  });
});
