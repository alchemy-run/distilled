#!/usr/bin/env bun
import { AnthropicClient, AnthropicLanguageModel } from "@effect/ai-anthropic";
import { Args, Command, Options } from "@effect/cli";
import * as Persistence from "@effect/experimental/Persistence";
import {
  NodeContext,
  NodeHttpClient,
  NodeRuntime,
} from "@effect/platform-node";
import * as PlatformConfigProvider from "@effect/platform/PlatformConfigProvider";
import { LogLevel } from "effect";
import * as Config from "effect/Config";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import * as Option from "effect/Option";
import * as Queue from "effect/Queue";
import type { ConfiguredAgent, DistilledConfig } from "./config.ts";
import { loadConfig } from "./config.ts";
import {
  AgentRegistryLive,
  AgentRegistryService,
  OrchestratorToolsLayer,
  spawnOrchestrator,
} from "./orchestrator.ts";
import { CodingToolsLayer } from "./tools/index.ts";
import { createTui } from "./tui/index.tsx";
import {
  ChatBridge,
  chatBridgeLayer,
  connectTuiController,
  InterruptController,
  interruptControllerLayer,
  TuiEventQueue,
} from "./tui/services/index.ts";
import { log, logError } from "./util/log.ts";

// =============================================================================
// Model Setup
// =============================================================================

const Anthropic = AnthropicClient.layerConfig({
  apiKey: Config.redacted("ANTHROPIC_API_KEY"),
});

const getModelLayer = (modelName: string) => {
  // Map model names to Anthropic models
  const modelMap: Record<string, string> = {
    "claude-sonnet": "claude-sonnet-4-20250514",
    "claude-haiku": "claude-haiku-4-5",
    "claude-opus": "claude-opus-4-20250514",
  };
  const resolvedModel = modelMap[modelName] || modelName;
  return AnthropicLanguageModel.model(resolvedModel as any);
};

// =============================================================================
// TUI Command
// =============================================================================

const tuiCommand = (config: DistilledConfig, agents: ConfiguredAgent[]) =>
  Effect.gen(function* () {
    const interruptController = yield* InterruptController;
    const chatBridge = yield* ChatBridge;
    const registry = yield* AgentRegistryService;

    // Register agents from config
    for (const { path, metadata } of agents) {
      yield* registry.spawn(path, metadata?.description || `Agent at ${path}`);
    }

    const modelLayer = getModelLayer(config.model || "claude-sonnet");

    // Create TUI
    log("TUI", "Creating TUI controller");
    const controller = createTui({
      onMessage: (message) => {
        log("TUI", "onMessage called", { message: message.slice(0, 100) });
        const effect = chatBridge.sendUserMessage(message).pipe(
          Effect.tap(() =>
            Effect.sync(() => log("TUI", "sendUserMessage completed")),
          ),
          Effect.tapError((e) =>
            Effect.sync(() => logError("TUI", "sendUserMessage failed", e)),
          ),
          Effect.provide(OrchestratorToolsLayer),
          Effect.provide(AgentRegistryLive),
          Effect.provide(CodingToolsLayer),
          Effect.provide(modelLayer),
          Effect.provide(Anthropic),
          Effect.provide(NodeHttpClient.layer),
          Effect.provide(NodeContext.layer),
          Effect.scoped,
        ) as Effect.Effect<void>;
        Effect.runFork(interruptController.run(effect));
      },
      onInterrupt: () => {
        log("TUI", "onInterrupt called");
        Effect.runFork(interruptController.interrupt());
      },
    });

    // Connect TUI controller to event stream
    yield* Effect.fork(connectTuiController(controller));

    // Keep the process running
    yield* Effect.never;
  }).pipe(
    Effect.provide(Layer.mergeAll(chatBridgeLayer, interruptControllerLayer)),
    Effect.provideServiceEffect(TuiEventQueue, Queue.unbounded()),
    Logger.withMinimumLogLevel(LogLevel.None),
  );

// =============================================================================
// CLI (Non-Interactive) Command
// =============================================================================

const cliCommand = (
  config: DistilledConfig,
  agents: ConfiguredAgent[],
  options: { prompt: string; agent?: string },
) =>
  Effect.gen(function* () {
    const registry = yield* AgentRegistryService;

    // Register agents from config
    for (const { path, metadata } of agents) {
      yield* registry.spawn(path, metadata?.description || `Agent at ${path}`);
    }

    const orchestrator = yield* spawnOrchestrator("cli-session");

    // If targeting a specific agent, route to it
    if (options.agent) {
      const agentExists = agents.some((a) => a.path === options.agent);

      if (!agentExists && agents.length > 0) {
        console.error(`Agent "${options.agent}" not found in config`);
        console.error(
          "Available agents:",
          agents.map((a) => a.path).join(", "),
        );
        return;
      }

      const response = yield* orchestrator.send(
        `Delegate to agent "${options.agent}": ${options.prompt}`,
      );
      console.log(response);
    } else {
      // Stream response to stdout
      const response = yield* orchestrator.send(options.prompt);
      console.log(response);
    }
  });

// =============================================================================
// Main CLI
// =============================================================================

const mainCommand = Command.make(
  "distilled",
  {
    configPath: Args.file({ name: "config", exists: "yes" }).pipe(
      Args.withDescription("Path to config file (e.g., distilled.config.ts)"),
      Args.optional,
    ),
    prompt: Options.text("prompt").pipe(
      Options.withAlias("p"),
      Options.withDescription("Run a single prompt (non-interactive mode)"),
      Options.optional,
    ),
    agent: Options.text("agent").pipe(
      Options.withAlias("a"),
      Options.withDescription("Target a specific agent"),
      Options.optional,
    ),
    model: Options.text("model").pipe(
      Options.withAlias("m"),
      Options.withDescription("Model to use (default: claude-sonnet)"),
      Options.withDefault("claude-sonnet"),
    ),
    listAgents: Options.boolean("list-agents").pipe(
      Options.withAlias("l"),
      Options.withDescription("List configured agents"),
      Options.withDefault(false),
    ),
  },
  ({ configPath, prompt, agent, model, listAgents }) =>
    Effect.gen(function* () {
      // Unwrap Option types
      const configPathValue = Option.getOrUndefined(configPath);
      const promptValue = Option.getOrUndefined(prompt);
      const agentValue = Option.getOrUndefined(agent);

      // Load config
      const config: DistilledConfig = configPathValue
        ? yield* Effect.tryPromise(() => loadConfig(configPathValue))
        : { name: "distilled", model };

      // Override model if provided
      if (model !== "claude-sonnet") {
        config.model = model;
      }

      const modelLayer = getModelLayer(config.model || "claude-sonnet");

      // Load agents from config effect
      const agents: ConfiguredAgent[] = config.agents
        ? yield* config.agents.pipe(
            Effect.provide(CodingToolsLayer),
            Effect.provide(modelLayer),
            Effect.provide(Anthropic),
            Effect.provide(NodeHttpClient.layer),
            Effect.provide(NodeContext.layer),
          )
        : [];

      // List agents mode
      if (listAgents) {
        if (agents.length === 0) {
          console.log("No agents configured.");
        } else {
          console.log("Configured agents:\n");
          for (const { path, metadata } of agents) {
            console.log(`  ${path}`);
            if (metadata?.description) {
              console.log(`    ${metadata.description}`);
            }
            if (metadata?.tags?.length) {
              console.log(`    tags: ${metadata.tags.join(", ")}`);
            }
            console.log();
          }
        }
        return;
      }

      // Non-interactive mode with prompt
      if (promptValue) {
        yield* cliCommand(config, agents, {
          prompt: promptValue,
          agent: agentValue,
        }).pipe(
          Effect.provide(OrchestratorToolsLayer),
          Effect.provide(AgentRegistryLive),
          Effect.provide(CodingToolsLayer),
          Effect.provide(modelLayer),
          Effect.provide(Anthropic),
        );
        return;
      }

      // Interactive TUI mode
      yield* tuiCommand(config, agents).pipe(
        Effect.provide(OrchestratorToolsLayer),
        Effect.provide(AgentRegistryLive),
        Effect.provide(CodingToolsLayer),
        Effect.provide(modelLayer),
        Effect.provide(Anthropic),
      );
    }),
);

// =============================================================================
// Run CLI
// =============================================================================

const cli = Command.run(mainCommand, {
  name: "distilled",
  version: "0.1.0",
});

await Effect.gen(function* () {
  // Try to load .env file
  const dotEnvProvider = yield* PlatformConfigProvider.fromDotEnv(".env").pipe(
    Effect.catchAll(() => Effect.succeed(ConfigProvider.fromEnv())),
  );

  yield* cli(process.argv).pipe(Effect.withConfigProvider(dotEnvProvider));
}).pipe(
  Logger.withMinimumLogLevel(
    process.env.DEBUG ? LogLevel.Debug : LogLevel.Info,
  ),
  Effect.scoped,
  Effect.provide(NodeContext.layer),
  Effect.provide(NodeHttpClient.layer),
  Effect.provide(Persistence.layerMemory) as any,
  NodeRuntime.runMain,
);
