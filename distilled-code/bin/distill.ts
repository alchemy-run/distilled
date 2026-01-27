#!/usr/bin/env bun
/**
 * distilled CLI
 *
 * Launches the Agent Browser TUI.
 *
 * Usage:
 *   distilled                          # launch TUI with ./distilled.config.ts
 *   distilled ./path/to/config.ts      # launch TUI with custom config
 *   distilled --model claude-opus      # use a specific model
 *   distilled --cwd ../distilled-cloudflare  # run from another directory
 */
import { AnthropicClient, AnthropicLanguageModel } from "@effect/ai-anthropic";
import { Args, Command, Options } from "@effect/cli";
import { FileSystem, Path } from "@effect/platform";
import {
  NodeContext,
  NodeHttpClient,
  NodeRuntime,
} from "@effect/platform-node";
import * as PlatformConfigProvider from "@effect/platform/PlatformConfigProvider";
import { LogLevel } from "effect";
import * as Config from "effect/Config";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import * as Option from "effect/Option";
import { isAgent, type Agent } from "../src/agent.ts";
import { BunSqlite, sqliteStateStore } from "../src/state/index.ts";
import { tui } from "../src/tui/index.tsx";
import { logError } from "../src/util/log.ts";

const DEFAULT_CONFIG_FILE = "distilled.config.ts";

const Anthropic = AnthropicClient.layerConfig({
  apiKey: Config.redacted("ANTHROPIC_API_KEY"),
});

/**
 * Recursively collect all agents from an agent's references.
 * Walks the agent tree and returns a flat list of all agents.
 * Handles nested arrays of agents (from .map() in template literals).
 */
const collectAgents = (agent: Agent, visited = new Set<string>()): Agent[] => {
  if (visited.has(agent.id)) return [];
  visited.add(agent.id);

  // Flatten references - they may contain nested arrays from .map() calls
  const flattenRefs = (refs: any[]): any[] => {
    const result: any[] = [];
    for (const ref of refs) {
      if (Array.isArray(ref)) {
        result.push(...flattenRefs(ref));
      } else {
        result.push(ref);
      }
    }
    return result;
  };

  const flatRefs = flattenRefs(agent.references);

  const nested = flatRefs
    .filter(isAgent)
    .flatMap((ref) => collectAgents(ref, visited));

  return [agent, ...nested];
};

/**
 * Load the agent config from a file path.
 * Validates that the default export is an Agent class.
 */
const loadAgentConfig = async (configPath: string): Promise<Agent> => {
  const configModule = await import(configPath);
  const defaultExport = configModule.default;

  if (!isAgent(defaultExport)) {
    throw new Error(
      `Config must export a default Agent class. Got: ${typeof defaultExport}`,
    );
  }

  return defaultExport;
};

/**
 * Resolve the config path from user input.
 */
const resolveConfigPath = Effect.fn(function* (inputPath: string | undefined) {
  const fs = yield* FileSystem.FileSystem;
  const pathService = yield* Path.Path;

  const targetPath = !inputPath || inputPath === "." ? "." : inputPath;

  const isDir = yield* fs.stat(targetPath).pipe(
    Effect.map((stat) => stat.type === "Directory"),
    Effect.catchAll(() => Effect.succeed(false)),
  );

  if (isDir) {
    const configPath = pathService.join(targetPath, DEFAULT_CONFIG_FILE);
    const exists = yield* fs.exists(configPath);
    if (!exists) {
      return undefined;
    }
    return pathService.resolve(configPath);
  }

  const exists = yield* fs.exists(targetPath);
  if (!exists) {
    return yield* Effect.fail(
      new Error(`Config file not found: ${targetPath}`),
    );
  }
  return pathService.resolve(targetPath);
});

const getModelLayer = (modelName: string) => {
  const modelMap: Record<string, string> = {
    "claude-sonnet": "claude-sonnet-4-20250514",
    "claude-haiku": "claude-haiku-4-5",
    "claude-opus": "claude-opus-4-20250514",
  };
  const resolvedModel = modelMap[modelName] || modelName;
  return AnthropicLanguageModel.model(resolvedModel as any);
};

const mainCommand = Command.make(
  "distilled",
  {
    config: Args.text({ name: "config" }).pipe(
      Args.withDescription(
        "Path to config file (default: ./distilled.config.ts)",
      ),
      Args.optional,
    ),
    model: Options.text("model").pipe(
      Options.withAlias("m"),
      Options.withDescription("Model to use (default: claude-sonnet)"),
      Options.withDefault("claude-sonnet"),
    ),
    cwd: Options.directory("cwd").pipe(
      Options.withAlias("C"),
      Options.withDescription("Change to this directory before running"),
      Options.optional,
    ),
  },
  Effect.fn(function* ({ config, model, cwd }) {
    // Change to the specified directory if provided
    const cwdPath = Option.getOrUndefined(cwd);
    if (cwdPath) {
      process.chdir(cwdPath);
    }

    const configPath = Option.getOrUndefined(config);

    // Resolve config path
    const resolvedPath = yield* resolveConfigPath(configPath);

    if (!resolvedPath) {
      yield* Console.error("No distilled.config.ts found.");
      yield* Console.error(
        "Create a distilled.config.ts with a default Agent export.",
      );
      return;
    }

    // Load the root agent from config
    const rootAgent = yield* Effect.tryPromise(() =>
      loadAgentConfig(resolvedPath),
    ).pipe(
      Effect.tapError((err) =>
        Effect.sync(() => logError("CLI", "Failed to load config", err)),
      ),
    );

    // Collect all agents from the tree
    const allAgents = collectAgents(rootAgent);

    // Create the layer with model + state store
    const modelLayer = getModelLayer(model);
    const stateStoreLayer = Layer.provideMerge(
      sqliteStateStore(),
      Layer.merge(BunSqlite, NodeContext.layer),
    );
    // The model layer needs AnthropicClient, which needs HttpClient
    const anthropicLayer = Layer.provideMerge(Anthropic, NodeHttpClient.layer);
    const fullModelLayer = Layer.provideMerge(modelLayer, anthropicLayer);
    const layer = Layer.merge(fullModelLayer, stateStoreLayer);

    // Launch the TUI
    yield* Effect.tryPromise(() =>
      tui({
        agents: allAgents,
        layer: layer as any,
      }),
    ).pipe(
      Effect.tapError((err) =>
        Effect.sync(() => logError("CLI", "TUI failed", err)),
      ),
    );
  }),
);

const cli = Command.run(mainCommand, {
  name: "distilled",
  version: "0.1.0",
});

// Global error handlers
process.on("uncaughtException", (err) => {
  logError("PROCESS", "Uncaught exception", err);
  console.error("Uncaught exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logError("PROCESS", "Unhandled rejection", reason);
  console.error("Unhandled rejection:", reason);
  process.exit(1);
});

Effect.gen(function* () {
  const dotEnvProvider = yield* PlatformConfigProvider.fromDotEnv(".env").pipe(
    Effect.catchAll(() => Effect.succeed(ConfigProvider.fromEnv())),
  );
  yield* cli(process.argv).pipe(Effect.withConfigProvider(dotEnvProvider));
}).pipe(
  Logger.withMinimumLogLevel(
    process.env.DEBUG ? LogLevel.Debug : LogLevel.Info,
  ),
  Effect.scoped,
  Effect.provide(
    Layer.mergeAll(
      Layer.provideMerge(Anthropic, NodeHttpClient.layer),
      NodeContext.layer,
    ),
  ),
  NodeRuntime.runMain,
);
