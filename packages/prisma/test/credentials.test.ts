import { expect, test } from "bun:test";
import * as Prisma from "@distilled.cloud/prisma";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

const credentials = (env: Record<string, string>) =>
  Effect.gen(function* () {
    const resolve = yield* Prisma.Credentials;
    return yield* resolve;
  }).pipe(
    Effect.provide(
      Layer.mergeAll(
        Prisma.CredentialsFromEnv,
        Layer.succeed(
          ConfigProvider.ConfigProvider,
          ConfigProvider.fromUnknown(env),
        ),
      ),
    ),
  );

test("reads PRISMA_API_TOKEN through the renamed package", () =>
  Effect.runPromise(
    credentials({ PRISMA_API_TOKEN: "primary-token" }).pipe(
      Effect.tap((config) =>
        Effect.sync(() => {
          expect(Redacted.value(config.apiToken)).toBe("primary-token");
          expect(config.apiBaseUrl).toBe("https://api.prisma.io");
        }),
      ),
    ),
  ));

test("preserves the legacy token environment variable", () =>
  Effect.runPromise(
    credentials({ PRISMA_POSTGRES_API_TOKEN: "legacy-token" }).pipe(
      Effect.tap((config) =>
        Effect.sync(() => {
          expect(Redacted.value(config.apiToken)).toBe("legacy-token");
        }),
      ),
    ),
  ));

test("prefers the Prisma token when both names are configured", () =>
  Effect.runPromise(
    credentials({
      PRISMA_API_TOKEN: "primary-token",
      PRISMA_POSTGRES_API_TOKEN: "legacy-token",
    }).pipe(
      Effect.tap((config) =>
        Effect.sync(() => {
          expect(Redacted.value(config.apiToken)).toBe("primary-token");
        }),
      ),
    ),
  ));

test("reports both supported token names when credentials are missing", () =>
  Effect.runPromise(
    credentials({}).pipe(
      Effect.flip,
      Effect.tap((error) =>
        Effect.sync(() => {
          expect(error._tag).toBe("ConfigError");
          expect(error.message).toContain("PRISMA_API_TOKEN");
          expect(error.message).toContain("PRISMA_POSTGRES_API_TOKEN");
        }),
      ),
    ),
  ));
