import { AnthropicClient, AnthropicLanguageModel } from "@effect/ai-anthropic";
import * as Chat from "@effect/ai/Chat";
import * as Persistence from "@effect/experimental/Persistence";
import { FetchHttpClient, FileSystem } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import * as PlatformConfigProvider from "@effect/platform/PlatformConfigProvider";
import { it, type TestContext } from "@effect/vitest";
import { ConfigProvider, LogLevel } from "effect";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import { LSPManagerLive } from "../src/lsp/index.ts";
import { LibsqlSqlite, sqliteStateStore } from "../src/state/index.ts";

const lspLayer = LSPManagerLive([]);

const platform = Layer.mergeAll(
  Layer.provideMerge(
    Layer.provide(sqliteStateStore(), LibsqlSqlite),
    NodeContext.layer,
  ),
  FetchHttpClient.layer,
  Logger.pretty,
  Persistence.layerMemory,
  lspLayer,
);

// Use any for requirements since we provide everything
type TestCase =
  | Effect.Effect<void, any, any>
  | ((ctx: TestContext) => Effect.Effect<void, any, any>);

export function test(
  name: string,
  options: { timeout?: number },
  testCase: TestCase,
): void;

export function test(name: string, testCase: TestCase): void;

export function test(
  name: string,
  ...args: [{ timeout?: number }, TestCase] | [TestCase]
) {
  const [options = {}, testCase] =
    args.length === 1 ? [undefined, args[0]] : args;

  return it.scopedLive(
    name,
    (ctx) => {
      const effect = typeof testCase === "function" ? testCase(ctx) : testCase;
      return provideTestEnv(effect);
    },
    options.timeout ?? 120_000,
  );
}

test.skip = function (
  name: string,
  ...args: [{ timeout?: number }, TestCase] | [TestCase]
) {
  const [options = {}] = args.length === 1 ? [undefined] : args;
  return it.skip(name, () => {}, options.timeout ?? 120_000);
};

/** Provide common layers and services to an effect */
function provideTestEnv(effect: Effect.Effect<void, any, any>) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;

    // Load .env if it exists
    let configProvider = ConfigProvider.fromEnv();
    if (yield* fs.exists(".env")) {
      configProvider = ConfigProvider.orElse(
        yield* PlatformConfigProvider.fromDotEnv(".env"),
        ConfigProvider.fromEnv,
      );
    }

    // Model setup - needs to be inside the effect so config is available
    const Anthropic = AnthropicClient.layerConfig({
      apiKey: Config.redacted("ANTHROPIC_API_KEY"),
    });
    const claude = AnthropicLanguageModel.model("claude-haiku-4-5");
    const modelLayer = Layer.provideMerge(claude, Anthropic);

    const chatLayer = Chat.layerPersisted({
      storeId: "test",
    });

    return yield* effect.pipe(
      Effect.provide(chatLayer),
      Effect.provide(modelLayer),
      Effect.withConfigProvider(configProvider),
    );
  }).pipe(
    Effect.provide(platform),
    Logger.withMinimumLogLevel(
      process.env.DEBUG ? LogLevel.Debug : LogLevel.Info,
    ),
  );
}
