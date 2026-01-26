import type { AiError } from "@effect/ai/AiError";
import * as Chat from "@effect/ai/Chat";
import type {
  GenerateObjectResponse,
  LanguageModel,
} from "@effect/ai/LanguageModel";
import type { Handler } from "@effect/ai/Tool";
import type { FileSystem } from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";
import { createContext } from "./context.ts";
import type { Fragment } from "./fragment.ts";
import { input } from "./input.ts";
import { output } from "./output.ts";
import {
  AgentState,
  AgentStateError,
  type MessageEncoded,
  type ThreadPart,
} from "./state.ts";
import { toText } from "./stream.ts";
import { tool } from "./tool/tool.ts";
import { Toolkit } from "./toolkit/toolkit.ts";
import {
  schemaFromJsonSchema,
  type JsonSchema7Root,
} from "./util/json-schema.ts";

type _ = MessageEncoded;

export const isAgent = (x: any): x is Agent => x?.type === "agent";

export interface IAgent<
  Name extends string,
  References extends any[],
> extends Fragment<"agent", Name, References> {}

export type Agent<
  Name extends string = string,
  References extends any[] = any[],
> = IAgent<Name, References> & {
  new (_: never): IAgent<Name, References>;
};

export const Agent =
  <ID extends string>(id: ID) =>
  <References extends any[]>(
    template: TemplateStringsArray,
    ...references: References
  ) =>
    class {
      static readonly type = "agent";
      static readonly id = id;
      static readonly references = references;
      static readonly template = template;
      constructor(_: never) {}
    } as Agent<ID, References>;

export interface AgentInstance<A extends Agent<string, any[]>> {
  agent: A;
  send: (
    prompt: string,
  ) => Stream.Stream<
    ThreadPart,
    AiError | AgentStateError,
    LanguageModel | Handler<string> | AgentState
  >;
  query: <A>(
    prompt: string,
    schema: S.Schema<A, any>,
  ) => Effect.Effect<
    GenerateObjectResponse<{}, A>,
    AiError | AgentStateError,
    LanguageModel | Handler<string> | AgentState
  >;
}

export const spawn: <A extends Agent<string, any[]>>(
  agent: A,
  scope?: string,
) => Effect.Effect<
  AgentInstance<A>,
  AiError | AgentStateError,
  LanguageModel | Handler<string> | AgentState | FileSystem
> = Effect.fn(function* <A extends Agent<string, any[]>>(
  agent: A,
  scope: string = agent.id,
) {
  const state = yield* AgentState;

  // Compute scoped key: root agent uses scope directly, children use scope/agentId
  const agentKey = scope === agent.id ? scope : `${scope}/${agent.id}`;

  const agentState = yield* state.get(agentKey);

  const chat = yield* Chat.fromPrompt(agentState.messages);

  // TODO(sam): support interrupts/parallel threads
  const sem = yield* Effect.makeSemaphore(1);
  const locked = <A, E, R>(fn: Effect.Effect<A, E, R>) =>
    sem.withPermits(1)(fn);
  const self = agent;

  // Build a map of agent ID -> Agent for O(1) lookups
  const agents = new Map<string, Agent>();
  (function collectAgents(agent: Agent): void {
    if (agents.has(agent.id) || agent.id === self.id) return;
    agents.set(agent.id, agent);
    agent.references.filter(isAgent).forEach(collectAgents);
  })(agent);

  // Map of spawned agent instances (lazy - spawned on first use)
  const spawned = new Map<string, AgentInstance<any>>();

  // Get or spawn a child agent by ID
  const lookupAgent = Effect.fn(function* (recipient: string) {
    if (!spawned.has(recipient)) {
      const childAgent = agents.get(recipient);
      if (!childAgent) {
        return yield* Effect.fail(
          `Agent "${recipient}" not found. Available agents: ${[...agents.keys()].join(", ")}`,
        );
      }
      spawned.set(recipient, yield* spawn(childAgent, scope));
    }
    return spawned.get(recipient)!;
  });

  const message = input("message")`The message to send`;
  const recipient = input(
    "recipient",
    // we shouldn't do this because more agents can be discovered later
    // S.Literal(...children.map((a) => a.agent.id)),
  )`The recipient agent.`;
  const send = tool(
    "send",
  )`Send a ${message} to ${recipient}, receive a response as a ${S.String}`(
    function* ({ message, recipient }) {
      const childAgent = yield* lookupAgent(recipient);
      return yield* toText("last-message", childAgent.send(message));
    },
  );

  const schema = input("schema")`The expected schema of the query response`;
  const object = output("object", S.Any);
  const query = tool(
    "query",
  )`Send a query ${message} to the ${recipient} agent and receive back a structured ${object} with the expected schema ${schema}`(
    function* ({ recipient, message, schema: jsonSchema }) {
      return {
        object: (yield* (yield* lookupAgent(recipient)).query(
          message,
          schemaFromJsonSchema(
            JSON.parse(jsonSchema) as JsonSchema7Root,
          ) as any,
        )).value,
      };
    },
  );

  class Comms extends Toolkit(
    "Comms",
  )`Tools for communicating with other agents. Use these tools to coordinate work with other agents.
${[send, query]}` {}

  const context = yield* createContext(agent, {
    tools: [Comms],
  });

  return {
    agent,
    send: (prompt: string) =>
      Stream.unwrap(
        locked(
          Effect.gen(function* () {
            // Append user input part
            yield* state.appendPart(agentKey, {
              type: "user-input",
              content: prompt,
              timestamp: Date.now(),
            });

            return chat
              .streamText({
                toolkit: context.toolkit,
                prompt: [
                  ...context.messages,
                  {
                    role: "user" as const,
                    content: prompt,
                  },
                ],
              })
              .pipe(
                // Forward parts to state (which handles PubSub + persistence)
                Stream.tap((part) =>
                  state.appendPart(agentKey, part as ThreadPart),
                ),
                Stream.map((part) => part as ThreadPart),
              );
          }),
        ),
      ),
    query: <A>(prompt: string, schema: S.Schema<A, any>) =>
      locked(
        chat.generateObject({
          toolkit: context.toolkit,
          schema,
          prompt: [
            ...context.messages,
            {
              role: "user" as const,
              content: prompt,
            },
          ],
        }),
      ),
  } satisfies AgentInstance<A>;
});
