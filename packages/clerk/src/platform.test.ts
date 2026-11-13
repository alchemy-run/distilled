import { ConfigError } from "@distilled.cloud/core/errors";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import {
  Credentials,
  DEFAULT_PLATFORM_API_BASE_URL,
  fromApiKey,
  PlatformCredentials,
  PlatformCredentialsFromEnv,
  platformFromApiKey,
} from "./credentials.ts";
import * as Retry from "./retry.ts";
import { getInstance } from "./services/clerk.ts";
import { getMe } from "./services/platform.ts";

const resolvePlatform = Effect.flatMap(PlatformCredentials, (resolve) => resolve);
const withEnv = (env: Record<string, string>) =>
  Effect.provideService(ConfigProvider.ConfigProvider, ConfigProvider.fromUnknown(env));

const principal = {
  object: "platform_principal",
  auth_strategy: "oat",
  subject: "org_test",
  actor: "user_test",
  scopes: [],
};

const instance = {
  object: "instance",
  id: "ins_test",
  environment_type: "development",
  allowed_origins: null,
  allowed_subdomains: [],
  subdomain_allowlist_enabled: false,
  workspace_id: "org_test",
  max_allowed_users: null,
};

const fakeClient = (respond: (request: HttpClientRequest.HttpClientRequest) => unknown) => {
  const requests: HttpClientRequest.HttpClientRequest[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        requests.push(request);
        return HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(respond(request)), {
            headers: { "content-type": "application/json" },
          }),
        );
      }),
    ),
  );
  return { requests, layer };
};

describe("Platform credentials", () => {
  test("resolves an arbitrary redacted bearer token without Backend credentials", async () => {
    const apiKey = Redacted.make("arbitrary-access-token");
    const config = await Effect.runPromise(
      resolvePlatform.pipe(Effect.provide(platformFromApiKey({ apiKey }))),
    );

    expect(config.apiKey).toBe(apiKey);
    expect(Redacted.value(config.apiKey)).toBe("arbitrary-access-token");
    expect(String(config.apiKey)).not.toContain("arbitrary-access-token");
    expect(config.apiBaseUrl).toBe(DEFAULT_PLATFORM_API_BASE_URL);
    expect(config.apiBaseUrl).toBe("https://api.clerk.com");
  });

  test.each([
    ["", "https://api.clerk.com"],
    ["https://platform.test/v1/", "https://platform.test/v1/"],
  ])("platformFromApiKey URL %j resolves to %s", async (apiBaseUrl, expected) => {
    const config = await Effect.runPromise(
      resolvePlatform.pipe(
        Effect.provide(platformFromApiKey({ apiKey: Redacted.make("token"), apiBaseUrl })),
      ),
    );
    expect(config.apiBaseUrl).toBe(expected);
  });

  test("Backend and Platform credential services resolve independently in one scope", async () => {
    const [backend, platform] = await Effect.runPromise(
      Effect.all([Effect.flatMap(Credentials, (resolve) => resolve), resolvePlatform]).pipe(
        Effect.provide(
          Layer.mergeAll(
            fromApiKey({ apiKey: Redacted.make("backend-token"), apiVersion: "backend-version" }),
            platformFromApiKey({ apiKey: Redacted.make("platform-token") }),
          ),
        ),
      ),
    );
    expect(Redacted.value(backend.apiKey)).toBe("backend-token");
    expect(backend.apiVersion).toBe("backend-version");
    expect(Redacted.value(platform.apiKey)).toBe("platform-token");
  });

  test.each([
    [{ CLERK_PLATFORM_API_KEY: "env-platform-token" }, "https://api.clerk.com"],
    [
      { CLERK_PLATFORM_API_KEY: "env-platform-token", CLERK_PLATFORM_API_URL: "" },
      "https://api.clerk.com",
    ],
    [
      {
        CLERK_PLATFORM_API_KEY: "env-platform-token",
        CLERK_PLATFORM_API_URL: "https://platform.test/v1/",
      },
      "https://platform.test/v1/",
    ],
  ])("reads isolated Platform config %j", async (env, expectedUrl) => {
    const config = await Effect.runPromise(
      resolvePlatform.pipe(Effect.provide(PlatformCredentialsFromEnv), withEnv(env)),
    );
    expect(Redacted.isRedacted(config.apiKey)).toBe(true);
    expect(Redacted.value(config.apiKey)).toBe("env-platform-token");
    expect(config.apiBaseUrl).toBe(expectedUrl);
  });

  test("a missing Platform key is a typed ConfigError, not a Backend key fallback or defect", async () => {
    const error = await Effect.runPromise(
      resolvePlatform.pipe(
        Effect.provide(PlatformCredentialsFromEnv),
        withEnv({ CLERK_SECRET_KEY: "backend-only-token" }),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(ConfigError);
    expect(error.message).toContain("CLERK_PLATFORM_API_KEY");
  });

  test("an unreadable config provider fails with a typed ConfigError, not a defect", async () => {
    const provider = ConfigProvider.make(() =>
      Effect.fail(new ConfigProvider.SourceError({ message: "test provider unavailable" })),
    );
    const error = await Effect.runPromise(
      resolvePlatform.pipe(
        Effect.provide(PlatformCredentialsFromEnv),
        Effect.provideService(ConfigProvider.ConfigProvider, provider),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(ConfigError);
  });
});

describe("Platform operation wiring", () => {
  test.each([
    "https://platform.test",
    "https://platform.test/",
    "https://platform.test/v1",
    "https://platform.test/v1/",
    "https://platform.test/v1///",
  ])("getMe normalizes %s and sends only Platform authentication", async (apiBaseUrl) => {
    const { requests, layer } = fakeClient(() => principal);
    await Effect.runPromise(
      getMe({}).pipe(
        Retry.none,
        Effect.provide(
          Layer.mergeAll(
            layer,
            platformFromApiKey({ apiKey: Redacted.make("arbitrary-bearer-token"), apiBaseUrl }),
          ),
        ),
      ),
    );

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toBe("GET");
    expect(requests[0]!.url).toBe("https://platform.test/v1/platform/me");
    expect(requests[0]!.headers.authorization).toBe("Bearer arbitrary-bearer-token");
    expect(requests[0]!.headers["clerk-api-version"]).toBeUndefined();
  });

  test("concurrent Backend and Platform operations keep credentials and version headers separate", async () => {
    const { requests, layer } = fakeClient((request) =>
      request.url.endsWith("/platform/me") ? principal : instance,
    );
    await Effect.runPromise(
      Effect.all([getInstance({}), getMe({})], { concurrency: "unbounded" }).pipe(
        Retry.none,
        Effect.provide(
          Layer.mergeAll(
            layer,
            fromApiKey({
              apiKey: Redacted.make("backend-token"),
              apiBaseUrl: "https://backend.test/v1",
              apiVersion: "backend-version",
            }),
            platformFromApiKey({
              apiKey: Redacted.make("platform-token"),
              apiBaseUrl: "https://platform.test",
            }),
          ),
        ),
      ),
    );

    expect(requests).toHaveLength(2);
    const backend = requests.find((request) => request.url === "https://backend.test/v1/instance");
    const platform = requests.find(
      (request) => request.url === "https://platform.test/v1/platform/me",
    );
    expect(backend?.headers.authorization).toBe("Bearer backend-token");
    expect(backend?.headers["clerk-api-version"]).toBe("backend-version");
    expect(platform?.headers.authorization).toBe("Bearer platform-token");
    expect(platform?.headers["clerk-api-version"]).toBeUndefined();
  });
});
