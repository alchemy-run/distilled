import * as Coinflow from "@distilled.cloud/coinflow";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { expect, test } from "vitest";

const fromEnv = (env: Record<string, string>) =>
  Effect.gen(function* () {
    const resolve = yield* Coinflow.Credentials;
    return yield* resolve;
  }).pipe(
    Effect.provide(
      Layer.mergeAll(
        Coinflow.CredentialsFromEnv,
        Layer.succeed(ConfigProvider.ConfigProvider, ConfigProvider.fromUnknown(env)),
      ),
    ),
  );

test("defaults to the sandbox", async () => {
  const config = await Effect.runPromise(fromEnv({ COINFLOW_API_KEY: "sk-sandbox" }));
  expect(Redacted.value(config.apiKey)).toBe("sk-sandbox");
  expect(config.apiBaseUrl).toBe("https://api-sandbox.coinflow.cash/api");
});

test("COINFLOW_ENV=production selects the production API", async () => {
  const config = await Effect.runPromise(
    fromEnv({ COINFLOW_API_KEY: "sk-live", COINFLOW_ENV: "production" }),
  );
  expect(config.apiBaseUrl).toBe("https://api.coinflow.cash/api");
});

test("COINFLOW_API_BASE_URL overrides the environment", async () => {
  const config = await Effect.runPromise(
    fromEnv({
      COINFLOW_API_KEY: "sk",
      COINFLOW_ENV: "production",
      COINFLOW_API_BASE_URL: "http://localhost:4000/api/",
    }),
  );
  expect(config.apiBaseUrl).toBe("http://localhost:4000/api");
});

test("a missing API key is a ConfigError", async () => {
  const error = await Effect.runPromise(Effect.flip(fromEnv({})));
  expect(error._tag).toBe("ConfigError");
  expect(error.message).toContain("COINFLOW_API_KEY");
});

test("an unknown COINFLOW_ENV is a ConfigError, not a silent sandbox", async () => {
  const error = await Effect.runPromise(
    Effect.flip(fromEnv({ COINFLOW_API_KEY: "sk", COINFLOW_ENV: "prod" })),
  );
  expect(error._tag).toBe("ConfigError");
  expect(error.message).toContain("COINFLOW_ENV");
});

test("credentials() defaults to the sandbox and keeps the key redacted", async () => {
  const config = await Effect.runPromise(
    Effect.gen(function* () {
      const resolve = yield* Coinflow.Credentials;
      return yield* resolve;
    }).pipe(Effect.provide(Coinflow.credentials({ apiKey: Redacted.make("sk") }))),
  );
  expect(config.apiBaseUrl).toBe("https://api-sandbox.coinflow.cash/api");
  expect(String(config.apiKey)).not.toContain("sk");
});
