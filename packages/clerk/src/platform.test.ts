import { describe, expect, test } from "bun:test";
import {
  mockHttpClient,
  type MockResponse,
} from "@distilled.cloud/core/testing";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import {
  platformFromApiKey,
  PlatformCredentialsFromEnv,
  type PlatformCredentials,
} from "./credentials.ts";
import * as Retry from "./retry.ts";
import * as Platform from "./services/platform.ts";

interface Sent {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly contentType: string | undefined;
  readonly body: unknown;
}

const record = (request: HttpClientRequest.HttpClientRequest): Sent => {
  const body = request.body as any;
  return {
    method: request.method,
    url: request.url,
    headers: request.headers,
    contentType: body.contentType,
    body:
      body._tag === "Uint8Array"
        ? JSON.parse(new TextDecoder().decode(body.body))
        : undefined,
  };
};

/** Run one Platform operation in strict mode against a canned response. */
const run = <A, E>(
  effect: Effect.Effect<A, E, Platform.ClerkPlatformOpContext>,
  response: MockResponse,
  credentials: Layer.Layer<PlatformCredentials> = platformFromApiKey({
    apiKey: "ak_test",
  }),
): Promise<{ readonly exit: unknown; readonly sent: Sent[] }> => {
  const sent: Sent[] = [];
  return Effect.runPromise(
    effect.pipe(
      Retry.none,
      Effect.provide(credentials),
      Effect.provide(
        mockHttpClient((request) => {
          sent.push(record(request));
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

const config = { applicationID: "app_1", envOrInsID: "development" };

// Observed live 2026-10-02: a non-matching If-Match on a config write.
const versionConflict: MockResponse = {
  status: 409,
  body: clerkErrors("config_version_conflict", "Config version conflict"),
};

describe("Platform requests", () => {
  const listApplications = (credentials?: Layer.Layer<PlatformCredentials>) =>
    run(Platform.listApplications({}), { body: "[]" }, credentials).then(
      ({ sent }) => sent[0]!,
    );

  test("sends a Bearer key to /v1/platform with no Clerk-API-Version", async () => {
    const sent = await listApplications();
    expect(sent.url).toBe("https://api.clerk.com/v1/platform/applications");
    expect(sent.headers["authorization"]).toBe("Bearer ak_test");
    expect(sent.headers["clerk-api-version"]).toBeUndefined();
  });

  test.each([
    ["https://x.test/", "https://x.test/v1/platform/applications"],
    ["https://x.test/proxy", "https://x.test/proxy/v1/platform/applications"],
    [
      "https://api.clerk.com/v1",
      "https://api.clerk.com/v1/platform/applications",
    ],
    ["", "https://api.clerk.com/v1/platform/applications"],
  ])("apiBaseUrl %p sends to %s", async (apiBaseUrl, url) => {
    const sent = await listApplications(
      platformFromApiKey({ apiKey: "ak_test", apiBaseUrl }),
    );
    expect(sent.url).toBe(url);
  });
});

describe("PlatformCredentialsFromEnv", () => {
  const withEnv = async <A>(
    env: Record<string, string | undefined>,
    f: () => Promise<A>,
  ): Promise<A> => {
    const saved = Object.fromEntries(
      Object.keys(env).map((k) => [k, process.env[k]]),
    );
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
    withEnv(
      { CLERK_PLATFORM_API_KEY: "ak_env", CLERK_PLATFORM_API_URL: "" },
      async () => {
        const { sent } = await run(
          Platform.listApplications({}),
          { body: "[]" },
          PlatformCredentialsFromEnv,
        );
        expect(sent[0]?.url).toBe(
          "https://api.clerk.com/v1/platform/applications",
        );
        expect(sent[0]?.headers["authorization"]).toBe("Bearer ak_env");
      },
    ));

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

describe("Platform config writes", () => {
  test("patchConfig sends If-Match and types a stale version as ConfigVersionConflict", async () => {
    const { exit, sent } = await run(
      Platform.patchConfig({
        ...config,
        ifMatch: "v1_54fe44e5",
        body: { auth_username: { min_length: 5 } },
      }),
      versionConflict,
    );
    expect(sent[0]?.headers["if-match"]).toBe("v1_54fe44e5");
    expect((exit as any).failure).toBeInstanceOf(
      Platform.ConfigVersionConflict,
    );
    expect((exit as any).failure.code).toBe("config_version_conflict");
  });

  test("putConfig types a stale version as ConfigVersionConflict", async () => {
    const { exit } = await run(
      Platform.putConfig({ ...config, ifMatch: "v1_deadbeef", body: {} }),
      versionConflict,
    );
    expect((exit as any).failure).toBeInstanceOf(
      Platform.ConfigVersionConflict,
    );
  });

  test("a stale version can be caught by tag", async () => {
    const { exit } = await run(
      Platform.patchConfig({ ...config, ifMatch: "v1_x", body: {} }).pipe(
        Effect.catchTag("ConfigVersionConflict", () => Effect.succeed("retry")),
      ),
      versionConflict,
    );
    expect(exit).toMatchObject({ _tag: "Success", success: "retry" });
  });

  test("any other 409 stays a generic Conflict", async () => {
    const { exit } = await run(Platform.patchConfig({ ...config, body: {} }), {
      status: 409,
      body: clerkErrors("some_other_conflict", "Conflict"),
    });
    expect((exit as any).failure).toBeInstanceOf(Platform.Conflict);
    expect((exit as any).failure.code).toBe("some_other_conflict");
    expect((exit as any).failure).not.toBeInstanceOf(
      Platform.ConfigVersionConflict,
    );
  });
});

describe("Platform typed error codes", () => {
  test("a typed error carries the envelope's string code", async () => {
    const { exit } = await run(
      Platform.getApplication({ applicationID: "app_missing" }),
      {
        status: 404,
        body: clerkErrors("resource_not_found", "Resource not found"),
      },
    );
    expect((exit as any).failure).toBeInstanceOf(Platform.NotFound);
    expect((exit as any).failure.code).toBe("resource_not_found");
  });
});

describe("Platform getConfig", () => {
  test("returns every config key, config_version included", async () => {
    const body = {
      config_version: "v1_45593ba3",
      auth_username: { min_length: 4 },
      session: null,
    };
    const { exit } = await run(Platform.getConfig(config), {
      body: JSON.stringify(body),
    });
    expect(exit).toMatchObject({ _tag: "Success", success: body });
  });
});

describe("Platform request-side secrets", () => {
  test("createJWTTemplate accepts a Redacted signing_key and sends its value", async () => {
    const { sent } = await run(
      Platform.createJWTTemplate({
        ...config,
        name: "t",
        claims: {},
        custom_signing_key: true,
        signing_key: Redacted.make("-----BEGIN PRIVATE KEY-----"),
      }),
      { body: "{}" },
    );
    expect((sent[0]!.body as any).signing_key).toBe(
      "-----BEGIN PRIVATE KEY-----",
    );
  });

  test("claimAccountlessApplication accepts a Redacted token and sends its value", async () => {
    const { sent } = await run(
      Platform.claimAccountlessApplication({
        token: Redacted.make("claim_token"),
        name: "claimed",
      }),
      { body: "{}" },
    );
    expect(sent[0]?.body).toEqual({ token: "claim_token", name: "claimed" });
  });
});

describe("Platform createApplicationTransfer", () => {
  test("sends a JSON body and returns the claim code Redacted", async () => {
    const transfer = {
      object: "application_transfer",
      id: "appxfr_1",
      code: "550e8400-e29b-41d4-a716-446655440000",
      application_id: "app_1",
      status: "pending",
      expires_at: "2026-10-03T15:31:52Z",
      created_at: "2026-10-02T15:31:52Z",
      canceled_at: null,
      completed_at: null,
    };
    const { exit, sent } = await run(
      Platform.createApplicationTransfer({ applicationID: "app_1" }),
      { status: 201, body: JSON.stringify(transfer) },
    );
    // Clerk answers a POST without `Content-Type: application/json` with 415.
    expect(sent[0]?.contentType).toBe("application/json");
    expect(sent[0]?.body).toEqual({});
    const code: Redacted.Redacted<string> = (exit as any).success.code;
    expect(Redacted.isRedacted(code)).toBe(true);
    expect(Redacted.value(code)).toBe(transfer.code);
  });
});
