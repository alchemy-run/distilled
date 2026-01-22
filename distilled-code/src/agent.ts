import type { Toolkit as EffectToolkit } from "@effect/ai";
import * as Chat from "@effect/ai/Chat";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import type * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { getSystemPrompt } from "./prompt.ts";
import { AgentState } from "./services/state.ts";
import { ToolCallFormatter } from "./services/tool-call-formatter.ts";
import {
  CodingTools,
  CodingToolsLayer,
  type CodingTools as CodingToolsType,
  PlanningTools,
  PlanningToolsLayer,
  type PlanningTools as PlanningToolsType,
  ReadOnlyTools,
  ReadOnlyToolsLayer,
  type ReadOnlyTools as ReadOnlyToolsType,
  type ToolLayerOptions,
} from "./tools/index.ts";
import { formatToolCall } from "./util/format-tool-call.ts";

// ============================================================================
// AgentScope - Context for nested agent keys in workflows
// ============================================================================

export interface AgentScope {
  readonly path: string;
  readonly todoScope?: string;
}

export const AgentScope = Context.GenericTag<AgentScope>("AgentScope");

// ============================================================================
// AgentError - Tagged error for agent interface
// ============================================================================

export class AgentError extends Data.TaggedError("AgentError")<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

// ============================================================================
// Toolkit Types
// ============================================================================

/**
 * Union of all available toolkit types.
 */
export type ToolkitType =
  | CodingToolsType
  | PlanningToolsType
  | ReadOnlyToolsType;

// ============================================================================
// Agent Interface - returned when you yield* agent(...)
// ============================================================================

export interface Agent<
  TReturn = string,
  TToolkit extends ToolkitType = CodingToolsType,
  SendReq = never,
  SendErr = AgentError,
  QueryReq = never,
  QueryErr = AgentError,
> {
  readonly key: string;
  readonly tags?: string[];
  readonly description?: string;
  readonly toolkit: TToolkit;
  readonly send: (prompt: string) => Effect.Effect<TReturn, SendErr, SendReq>;
  readonly query: <A, I extends Record<string, unknown>, R>(
    prompt: string,
    schema: Schema.Schema<A, I, R>,
  ) => Effect.Effect<A, QueryErr, R | QueryReq>;
}

// ============================================================================
// Agent Options
// ============================================================================

export interface AgentOptions<TToolkit extends ToolkitType = CodingToolsType> {
  toolkit?: TToolkit;
  tags?: string[];
  description?: string;
  todoScope?: "parent" | "agent" | string;
  onText?: (delta: string) => void;
  modelId?: string;
}

export type WorkflowFn<
  Args = string,
  Out = string,
  Err = never,
  Req = never,
> = (args: Args) => Effect.Effect<Out, Err, Req | AgentScope>;

// ============================================================================
// Toolkit resolution
// ============================================================================

const getLayerForToolkit = <T extends ToolkitType>(
  toolkit: T,
  opts: ToolLayerOptions,
) => {
  if (toolkit === PlanningTools) {
    return PlanningToolsLayer(opts);
  }
  if (toolkit === ReadOnlyTools) {
    return ReadOnlyToolsLayer(opts);
  }
  return CodingToolsLayer(opts);
};

// ============================================================================
// agent() - Single function for all agent types
// ============================================================================

/**
 * Create an agent. Returns an Effect that spawns when yielded.
 *
 * @example Leaf agent
 * ```ts
 * import { agent, CodingTools } from "distilled-code";
 *
 * const myAgent = yield* agent("api/getTodo", {
 *   toolkit: CodingTools,
 *   tags: ["api"],
 *   description: "Implement GET /todos/:id",
 * });
 * yield* myAgent.send("implement it");
 * ```
 *
 * @example Workflow agent
 * ```ts
 * import { agent, PlanningTools, CodingTools } from "distilled-code";
 *
 * const workflow = yield* agent(
 *   "feature/implement",
 *   Effect.fn(function* (prompt) {
 *     const planner = yield* agent("planner", { toolkit: PlanningTools });
 *     const executor = yield* agent("executor", { toolkit: CodingTools });
 *     yield* planner.send(prompt);
 *     yield* executor.send("complete todos");
 *   }),
 *   { tags: ["feature"] },
 * );
 * yield* workflow.send("add auth");
 * ```
 */
export function agent<TToolkit extends ToolkitType = CodingToolsType>(
  key: string,
  options?: AgentOptions<TToolkit>,
): Effect.Effect<
  Agent<string, TToolkit, never, AgentError, never, AgentError>,
  AgentError,
  AgentState
>;

export function agent<
  Out,
  Err,
  Req,
  TToolkit extends ToolkitType = CodingToolsType,
>(
  key: string,
  workflow: WorkflowFn<string, Out, Err, Req>,
  options?: AgentOptions<TToolkit>,
): Effect.Effect<
  Agent<Out, TToolkit, Req, Err | AgentError, never, AgentError>,
  AgentError,
  AgentState | Req
>;

export function agent<Out, Err, Req, TToolkit extends ToolkitType>(
  key: string,
  workflowOrOptions?:
    | WorkflowFn<string, Out, Err, Req>
    | AgentOptions<TToolkit>,
  maybeOptions?: AgentOptions<TToolkit>,
): Effect.Effect<Agent, AgentError, AgentState | Req> {
  // Parse overloaded arguments
  const isWorkflow = typeof workflowOrOptions === "function";
  const workflow = isWorkflow
    ? (workflowOrOptions as WorkflowFn<string, Out, Err, Req>)
    : undefined;
  const options: AgentOptions<TToolkit> = isWorkflow
    ? (maybeOptions ?? {})
    : ((workflowOrOptions as AgentOptions<TToolkit>) ?? {});

  // @ts-expect-error
  return Effect.gen(function* () {
    // Check for parent scope (nested agent in workflow)
    const parentScope = yield* Effect.serviceOption(AgentScope);
    const hasParent = Option.isSome(parentScope);

    // Construct agent key
    const agentKey = hasParent ? `${parentScope.value.path}/${key}` : key;

    // Resolve todo scope
    let todoScope: string;
    if (options.todoScope === "parent" && hasParent) {
      todoScope = parentScope.value.todoScope ?? parentScope.value.path;
    } else if (
      options.todoScope === "agent" ||
      options.todoScope === undefined
    ) {
      todoScope = agentKey;
    } else {
      todoScope = options.todoScope;
    }

    // Get toolkit and layer
    const toolkit = (options.toolkit ?? CodingTools) as TToolkit;
    const layer = getLayerForToolkit(toolkit, {
      agentKey,
      todoScope,
    });

    // ========================================================================
    // Spawn the agent inline
    // ========================================================================

    const state = yield* AgentState;

    const customFormatter = yield* Effect.serviceOption(ToolCallFormatter).pipe(
      Effect.map(Option.getOrUndefined),
    );

    const format = (name: string, params: unknown): string => {
      const custom = customFormatter?.format(name, params);
      if (custom !== undefined) {
        return custom;
      }
      return formatToolCall(name, params);
    };

    const modelId = options.modelId;
    const systemPrompt = getSystemPrompt(modelId);
    const contextPrompt = options.description
      ? `${systemPrompt}\n\nContext: ${options.description}`
      : systemPrompt;

    const chat = yield* Chat.fromPrompt([
      { role: "system", content: contextPrompt },
      ...(yield* state.getMessages(agentKey).pipe(
        Effect.map((messages) => messages.filter((m) => m.role !== "system")),
        Effect.catchAll(() => Effect.succeed([])),
      )),
    ]);

    const persist = Effect.gen(function* () {
      const exported = yield* chat.exportJson;
      yield* state.saveMessages(agentKey, exported);
      yield* Effect.logDebug(`[agent:${agentKey}] Session persisted`);
    });

    const onText = options.onText;

    // Send implementation
    const send = (prompt: string) =>
      Effect.gen(function* () {
        // If workflow, run it with AgentScope and return its result
        if (workflow) {
          yield* Effect.logInfo(`[workflow:${agentKey}] Starting`);
          const result = yield* workflow(prompt).pipe(
            Effect.provideService(AgentScope, {
              path: agentKey,
              todoScope: agentKey,
            }),
          );
          yield* Effect.logInfo(`[workflow:${agentKey}] Complete`);
          return result as string;
        }

        // Regular agent - agentic loop
        yield* Effect.logInfo(
          `[agent:${agentKey}] Sending prompt: ${prompt.slice(0, 100).split("\n")[0]}...`,
        );

        let finalText = "";
        let isFirst = true;
        let loopCount = 0;

        while (true) {
          loopCount++;
          let finishReason: string | undefined;

          const stream = chat.streamText({
            toolkit: toolkit as EffectToolkit.Toolkit<any>,
            prompt: isFirst ? prompt : "Continue",
          });
          isFirst = false;

          yield* Stream.runForEach(stream, (part) =>
            Effect.gen(function* () {
              yield* persist;
              switch (part.type) {
                case "text-delta":
                case "reasoning-delta":
                  finalText += part.delta;
                  if (onText) onText(part.delta);
                  break;
                case "tool-call":
                  yield* Effect.logInfo(
                    `[agent:${agentKey}] ${format(part.name, part.params)}`,
                  );
                  break;
                case "tool-result":
                  yield* Effect.logDebug(
                    `[agent:${agentKey}] Tool result received`,
                  );
                  break;
                case "finish":
                  finishReason = part.reason;
                  break;
              }
            }),
          );

          if (finishReason !== "tool-calls") {
            yield* Effect.log(
              `[agent:${agentKey}] Done after ${loopCount} loops`,
            );
            break;
          }
        }

        yield* persist;
        return finalText;
      }).pipe(
        Effect.provide(layer),
        Effect.scoped,
        Effect.mapError(
          (cause) => new AgentError({ message: "Agent send failed", cause }),
        ),
      );

    // Query implementation
    const query = <A, I extends Record<string, unknown>, R>(
      prompt: string,
      schema: Schema.Schema<A, I, R>,
    ) =>
      Effect.gen(function* () {
        yield* Effect.logInfo(
          `[agent:${agentKey}] Query: ${prompt.slice(0, 100)}...`,
        );
        const response = yield* chat.generateObject({
          prompt,
          schema,
          toolkit: toolkit as EffectToolkit.Toolkit<any>,
        });
        yield* persist;
        return response.value;
      }).pipe(
        Effect.provide(layer),
        Effect.scoped,
        Effect.mapError(
          (cause) => new AgentError({ message: "Agent query failed", cause }),
        ),
      );

    return {
      key: agentKey,
      tags: options.tags,
      description: options.description,
      toolkit,
      send,
      query,
    };
  }).pipe(
    Effect.mapError(
      (cause) =>
        new AgentError({ message: "Agent initialization failed", cause }),
    ),
  );
}
