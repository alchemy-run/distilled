import * as NetBird from "@distilled.cloud/netbird";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";

const credentials = (env: Record<string, string>) =>
  Effect.runPromiseExit(
    Effect.gen(function* () {
      const resolve = yield* NetBird.Credentials;
      const config = yield* resolve;
      return { token: Redacted.value(config.apiToken), apiBaseUrl: config.apiBaseUrl };
    }).pipe(
      Effect.provide(
        Layer.mergeAll(
          NetBird.CredentialsFromEnv,
          Layer.succeed(ConfigProvider.ConfigProvider, ConfigProvider.fromUnknown(env)),
        ),
      ),
    ),
  );

describe("CredentialsFromEnv", () => {
  test("defaults to NetBird Cloud", async () => {
    expect(await credentials({ NETBIRD_API_TOKEN: "nbp_test" })).toEqual(
      Exit.succeed({ token: "nbp_test", apiBaseUrl: "https://api.netbird.io" }),
    );
  });

  test("reaches a self-hosted server at its origin", async () => {
    expect(
      await credentials({
        NETBIRD_API_TOKEN: "nbp_test",
        NETBIRD_API_URL: "https://netbird.example.com/",
      }),
    ).toEqual(Exit.succeed({ token: "nbp_test", apiBaseUrl: "https://netbird.example.com" }));
  });

  test("fails without a token", async () => {
    expect(Exit.isFailure(await credentials({}))).toBe(true);
  });
});

describe("normalizeApiBaseUrl", () => {
  test.each(["http://127.0.0.1:8080", "http://localhost:8080", "https://netbird.example.com:8443"])(
    "accepts %s",
    async (url) => {
      expect(Exit.isSuccess(await Effect.runPromiseExit(NetBird.normalizeApiBaseUrl(url)))).toBe(
        true,
      );
    },
  );

  test.each([
    "http://netbird.example.com",
    "https://netbird.example.com/api",
    "https://user:secret@netbird.example.com",
    "not a url",
  ])("rejects %s", async (url) => {
    expect(Exit.isFailure(await Effect.runPromiseExit(NetBird.normalizeApiBaseUrl(url)))).toBe(
      true,
    );
  });
});
