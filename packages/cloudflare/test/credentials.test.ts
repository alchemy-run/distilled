import { describe, expect, it } from "vitest";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import {
  Credentials,
  formatHeaders,
  fromOAuth,
  resolveFromEnv,
} from "~/credentials";
import type { ResolvedCredentials } from "~/credentials";

const resolveWithEnv = (env: Record<string, string>) =>
  resolveFromEnv.pipe(
    Effect.provideService(
      ConfigProvider.ConfigProvider,
      ConfigProvider.fromEnv({ env }),
    ),
  );

describe("credentials", () => {
  describe("formatHeaders", () => {
    it("formats api token credentials as bearer auth", async () => {
      const credentials = await Effect.runPromise(
        resolveWithEnv({ CLOUDFLARE_API_TOKEN: "token-123" }),
      );

      expect(formatHeaders(credentials)).toEqual({
        Authorization: "Bearer token-123",
      });
    });

    it("formats api key credentials with key and email headers", async () => {
      const credentials = await Effect.runPromise(
        resolveWithEnv({
          CLOUDFLARE_API_KEY: "key-123",
          CLOUDFLARE_EMAIL: "sam@example.com",
        }),
      );

      expect(formatHeaders(credentials)).toEqual({
        "X-Auth-Email": "sam@example.com",
        "X-Auth-Key": "key-123",
      });
    });
  });

  describe("resolveFromEnv", () => {
    it("prefers CLOUDFLARE_API_TOKEN over api key auth", async () => {
      const credentials = await Effect.runPromise(
        resolveWithEnv({
          CLOUDFLARE_API_TOKEN: "token-123",
          CLOUDFLARE_API_KEY: "key-123",
          CLOUDFLARE_EMAIL: "sam@example.com",
        }),
      );

      expect(credentials.type).toBe("apiToken");
      expect(formatHeaders(credentials)).toEqual({
        Authorization: "Bearer token-123",
      });
    });

    it("fails when CLOUDFLARE_API_KEY is set without CLOUDFLARE_EMAIL", async () => {
      const error = await Effect.runPromise(
        Effect.flip(resolveWithEnv({ CLOUDFLARE_API_KEY: "key-123" })),
      );

      expect(error._tag).toBe("ConfigError");
      expect(error.message).toContain("CLOUDFLARE_EMAIL");
    });
  });

  describe("fromOAuth", () => {
    it("refreshes expired oauth credentials and caches the refreshed value", async () => {
      let loadCalls = 0;
      let refreshCalls = 0;

      const program = Effect.gen(function* () {
        const first = yield* yield* Credentials;
        const second = yield* yield* Credentials;
        return { first, second };
      }).pipe(
        Effect.provide(
          fromOAuth({
            load: Effect.sync(() => {
              loadCalls += 1;
              return {
                accessToken: "expired-token",
                refreshToken: "refresh-token",
                expiresAt: Date.now() - 1_000,
              };
            }),
            refresh: (credentials) =>
              Effect.sync(() => {
                refreshCalls += 1;
                return {
                  accessToken: "fresh-token",
                  refreshToken: credentials.refreshToken,
                  expiresAt: Date.now() + 60_000,
                };
              }),
          }),
        ),
      ) as Effect.Effect<
        {
          first: ResolvedCredentials;
          second: ResolvedCredentials;
        },
        unknown,
        never
      >;

      const { first, second } = await Effect.runPromise(program);

      expect(loadCalls).toBe(1);
      expect(refreshCalls).toBe(1);
      expect(first.type).toBe("oauth");
      expect(second.type).toBe("oauth");
      expect(formatHeaders(first)).toEqual({
        Authorization: "Bearer fresh-token",
      });
      expect(formatHeaders(second)).toEqual({
        Authorization: "Bearer fresh-token",
      });
    });
  });
});
