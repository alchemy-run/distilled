import { Tool, Toolkit } from "@effect/ai";
import * as Chat from "@effect/ai/Chat";
import { FileSystem, Path } from "@effect/platform";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Ref from "effect/Ref";
import type * as Schema from "effect/Schema";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";
import type { Agent } from "./agent.ts";
import { spawn } from "./agent.ts";
import { CodingTools } from "./tools/index.ts";

// =============================================================================
// Agent Registry - tracks all spawned agents
// =============================================================================

interface AgentEntry {
  key: string;
  description: string;
  status: "idle" | "running" | "completed" | "error";
  lastMessage?: string;
  agent: Agent;
}

interface AgentRegistry {
  readonly agents: Ref.Ref<Map<string, AgentEntry>>;
  readonly spawn: (
    key: string,
    description: string,
  ) => Effect.Effect<Agent, any, any>;
  readonly send: (
    key: string,
    prompt: string,
  ) => Effect.Effect<string, any, any>;
  readonly query: <A, I extends Record<string, unknown>, R>(
    key: string,
    prompt: string,
    schema: Schema.Schema<A, I, R>,
  ) => Effect.Effect<A, any, any>;
  readonly list: () => Effect.Effect<AgentEntry[]>;
  readonly get: (key: string) => Effect.Effect<AgentEntry | undefined>;
}

export class AgentRegistryService extends Context.Tag("AgentRegistry")<
  AgentRegistryService,
  AgentRegistry
>() {}

export const AgentRegistryLive = Layer.effect(
  AgentRegistryService,
  Effect.gen(function* () {
    const agentsRef = yield* Ref.make(new Map<string, AgentEntry>());

    const registry: AgentRegistry = {
      agents: agentsRef,

      spawn: (key, description) =>
        Effect.gen(function* () {
          const existing = (yield* Ref.get(agentsRef)).get(key);
          if (existing) {
            return existing.agent;
          }

          const agent = yield* spawn(key);
          const entry: AgentEntry = {
            key,
            description,
            status: "idle",
            agent,
          };
          yield* Ref.update(agentsRef, (map) => new Map(map).set(key, entry));
          return agent;
        }),

      send: (key, prompt) =>
        Effect.gen(function* () {
          const agents = yield* Ref.get(agentsRef);
          const entry = agents.get(key);
          if (!entry) {
            return yield* Effect.fail(new Error(`Agent "${key}" not found`));
          }

          // Update status to running
          yield* Ref.update(agentsRef, (map) => {
            const newMap = new Map(map);
            newMap.set(key, { ...entry, status: "running" });
            return newMap;
          });

          try {
            const response = yield* entry.agent.send(prompt);

            // Update status to completed
            yield* Ref.update(agentsRef, (map) => {
              const newMap = new Map(map);
              newMap.set(key, {
                ...entry,
                status: "completed",
                lastMessage: response.slice(0, 200),
              });
              return newMap;
            });

            return response;
          } catch (error) {
            // Update status to error
            yield* Ref.update(agentsRef, (map) => {
              const newMap = new Map(map);
              newMap.set(key, { ...entry, status: "error" });
              return newMap;
            });
            throw error;
          }
        }),

      query: (key, prompt, schema) =>
        Effect.gen(function* () {
          const agents = yield* Ref.get(agentsRef);
          const entry = agents.get(key);
          if (!entry) {
            return yield* Effect.fail(new Error(`Agent "${key}" not found`));
          }

          yield* Ref.update(agentsRef, (map) => {
            const newMap = new Map(map);
            newMap.set(key, { ...entry, status: "running" });
            return newMap;
          });

          try {
            const result = yield* entry.agent.query(prompt, schema);

            yield* Ref.update(agentsRef, (map) => {
              const newMap = new Map(map);
              newMap.set(key, { ...entry, status: "completed" });
              return newMap;
            });

            return result;
          } catch (error) {
            yield* Ref.update(agentsRef, (map) => {
              const newMap = new Map(map);
              newMap.set(key, { ...entry, status: "error" });
              return newMap;
            });
            throw error;
          }
        }),

      list: () =>
        Effect.gen(function* () {
          const agents = yield* Ref.get(agentsRef);
          return Array.from(agents.values());
        }),

      get: (key) =>
        Effect.gen(function* () {
          const agents = yield* Ref.get(agentsRef);
          return agents.get(key);
        }),
    };

    return registry;
  }),
);

// =============================================================================
// Orchestrator Tools - tools for managing sub-agents
// =============================================================================

const delegateTask = Tool.make("delegate_task", {
  description: `Delegate a task to a specialized sub-agent.
- Creates a new agent if one doesn't exist for the given key
- Sends the prompt to that agent
- Returns the agent's response
- Use this when a task requires focused work that should be isolated`,
  parameters: {
    key: S.String.annotations({
      description:
        "Unique key for the agent (e.g. 'test-writer', 'api-designer')",
    }),
    description: S.String.annotations({
      description: "Brief description of what this agent specializes in",
    }),
    prompt: S.String.annotations({
      description: "The task or question to send to the agent",
    }),
  },
  success: S.String,
  failure: S.Any,
});

const listAgents = Tool.make("list_agents", {
  description: "List all active sub-agents and their status",
  parameters: {},
  success: S.Array(
    S.Struct({
      key: S.String,
      description: S.String,
      status: S.String,
      lastMessage: S.optional(S.String),
    }),
  ),
  failure: S.Any,
});

const checkAgentStatus = Tool.make("check_agent_status", {
  description: "Check the status of a specific sub-agent",
  parameters: {
    key: S.String.annotations({
      description: "The key of the agent to check",
    }),
  },
  success: S.Struct({
    key: S.String,
    description: S.String,
    status: S.String,
    lastMessage: S.optional(S.String),
  }),
  failure: S.Any,
});

export const OrchestratorTools = Toolkit.merge(
  Toolkit.make(delegateTask),
  Toolkit.make(listAgents),
  Toolkit.make(checkAgentStatus),
);

export const OrchestratorToolsLayer = OrchestratorTools.toLayer(
  Effect.gen(function* () {
    const registry = yield* AgentRegistryService;

    return {
      delegate_task: (params: {
        readonly key: string;
        readonly description: string;
        readonly prompt: string;
      }) =>
        Effect.gen(function* () {
          yield* registry.spawn(params.key, params.description);
          const response = yield* registry.send(params.key, params.prompt);
          return response;
        }) as Effect.Effect<string, any, never>,

      list_agents: () =>
        Effect.gen(function* () {
          const agents = yield* registry.list();
          return agents.map((a) => ({
            key: a.key,
            description: a.description,
            status: a.status,
            lastMessage: a.lastMessage,
          }));
        }) as Effect.Effect<
          Array<{
            key: string;
            description: string;
            status: string;
            lastMessage: string | undefined;
          }>,
          any,
          never
        >,

      check_agent_status: (params: { readonly key: string }) =>
        Effect.gen(function* () {
          const agent = yield* registry.get(params.key);
          if (!agent) {
            return yield* Effect.fail(
              new Error(`Agent "${params.key}" not found`),
            );
          }
          return {
            key: agent.key,
            description: agent.description,
            status: agent.status,
            lastMessage: agent.lastMessage,
          };
        }) as Effect.Effect<
          {
            key: string;
            description: string;
            status: string;
            lastMessage: string | undefined;
          },
          any,
          never
        >,
    };
  }),
);

// =============================================================================
// Combined Toolkit - coding tools + orchestrator tools
// =============================================================================

export const AllTools = Toolkit.merge(CodingTools, OrchestratorTools);

// =============================================================================
// Orchestrator Agent
// =============================================================================

export interface Orchestrator {
  readonly key: string;
  readonly send: (prompt: string) => Effect.Effect<string, any, any>;
  readonly query: <A, I extends Record<string, unknown>, R>(
    prompt: string,
    schema: Schema.Schema<A, I, R>,
  ) => Effect.Effect<A, any, any>;
  readonly listAgents: () => Effect.Effect<AgentEntry[]>;
  readonly getAgent: (key: string) => Effect.Effect<AgentEntry | undefined>;
  readonly focusAgent: (key: string | null) => Effect.Effect<void>;
  readonly getFocusedAgent: () => Effect.Effect<string | null>;
}

/**
 * Spawn an orchestrator that can manage multiple sub-agents.
 */
export const spawnOrchestrator = (key: string) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const pathService = yield* Path.Path;
    const registry = yield* AgentRegistryService;

    const sessionPath = pathService.join(".distilled", `${key}.json`);
    const sessionDir = pathService.dirname(sessionPath);

    // Load existing session or create empty chat
    const existingJson = yield* fs
      .readFileString(sessionPath)
      .pipe(Effect.catchAll(() => Effect.succeed(null)));

    const chat = existingJson
      ? yield* Chat.fromJson(existingJson)
      : yield* Chat.empty;

    // Track focused agent
    const focusedAgentRef = yield* Ref.make<string | null>(null);

    // Helper to persist after each interaction
    const persist = Effect.gen(function* () {
      yield* fs.makeDirectory(sessionDir, { recursive: true });
      const exported = yield* chat.exportJson;
      yield* fs.writeFileString(sessionPath, exported);
    });

    const send = (prompt: string) =>
      Effect.gen(function* () {
        let finalText = "";
        let isFirst = true;

        while (true) {
          let finishReason: string | undefined;

          const stream = chat.streamText({
            toolkit: AllTools,
            prompt: isFirst ? prompt : "Continue",
          });
          isFirst = false;

          yield* Stream.runForEach(stream, (part) =>
            Effect.sync(() => {
              switch (part.type) {
                case "text-delta":
                case "reasoning-delta":
                  finalText += part.delta;
                  break;
                case "finish":
                  finishReason = part.reason;
                  break;
              }
            }),
          );

          if (finishReason !== "tool-calls") break;
        }

        yield* persist;
        return finalText;
      });

    const query = <A, I extends Record<string, unknown>, R>(
      prompt: string,
      schema: Schema.Schema<A, I, R>,
    ) =>
      Effect.gen(function* () {
        const response = yield* chat.generateObject({
          prompt,
          schema,
        });

        yield* persist;
        return response.value;
      });

    const orchestrator: Orchestrator = {
      key,
      send,
      query,
      listAgents: () => registry.list(),
      getAgent: (agentKey) => registry.get(agentKey),
      focusAgent: (agentKey) => Ref.set(focusedAgentRef, agentKey),
      getFocusedAgent: () => Ref.get(focusedAgentRef),
    };

    return orchestrator;
  });
