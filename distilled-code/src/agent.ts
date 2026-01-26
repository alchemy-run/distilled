import type { AiError } from "@effect/ai/AiError";
import * as Chat from "@effect/ai/Chat";
import type {
  GenerateObjectResponse,
  LanguageModel,
} from "@effect/ai/LanguageModel";
import * as Prompt from "@effect/ai/Prompt";
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
  StateStore,
  StateStoreError,
  type MessagePart,
} from "./state/index.ts";
import { toText } from "./stream.ts";
import { tool } from "./tool/tool.ts";
import { Toolkit } from "./toolkit/toolkit.ts";
import {
  schemaFromJsonSchema,
  type JsonSchema7Root,
} from "./util/json-schema.ts";

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
    MessagePart,
    AiError | StateStoreError,
    LanguageModel | Handler<string> | StateStore
  >;
  query: <A>(
    prompt: string,
    schema: S.Schema<A, any>,
  ) => Effect.Effect<
    GenerateObjectResponse<{}, A>,
    AiError | StateStoreError,
    LanguageModel | Handler<string> | StateStore
  >;
}

export const spawn: <A extends Agent<string, any[]>>(
  agent: A,
  scope?: string,
) => Effect.Effect<
  AgentInstance<A>,
  AiError | StateStoreError,
  LanguageModel | Handler<string> | StateStore | FileSystem
> = Effect.fn(function* <A extends Agent<string, any[]>>(
  agent: A,
  scope: string = agent.id,
) {
  const store = yield* StateStore;

  // Compute scoped key: root agent uses scope directly, children use scope/agentId
  const agentKey = scope === agent.id ? scope : `${scope}/${agent.id}`;

  // Recover from crash: flush any partial parts from previous session
  yield* flush(store, agentKey);

  // Get messages to hydrate chat
  const messages = yield* store.readMessages(agentKey);
  const chat = yield* Chat.fromPrompt(messages);

  // Semaphore for exclusive access
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
            yield* store.appendPart(agentKey, {
              type: "user-input",
              content: prompt,
              timestamp: Date.now(),
            });

            // Flush user input immediately
            yield* flush(store, agentKey);

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
                // Forward parts to store
                Stream.tap((part) => {
                  const threadPart = part as MessagePart;
                  return Effect.gen(function* () {
                    yield* store.appendPart(agentKey, threadPart);
                    // Check if message boundary reached
                    if (isMessageBoundary(threadPart)) {
                      yield* flush(store, agentKey);
                    }
                  });
                }),
                Stream.map((part) => part as MessagePart),
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

/**
 * Check if a part completes a message boundary.
 */
const isMessageBoundary = (part: MessagePart): boolean =>
  part.type === "user-input" ||
  part.type === "text-end" ||
  part.type === "reasoning-end" ||
  part.type === "tool-call" ||
  part.type === "tool-result";

/**
 * Flush parts to messages: reads accumulated parts, converts them to messages
 * using Prompt.fromResponseParts, writes messages, and truncates parts.
 */
const flush = (
  store: StateStore,
  agentKey: string,
): Effect.Effect<void, StateStoreError> =>
  Effect.gen(function* () {
    const parts = yield* store.readParts(agentKey);
    if (parts.length === 0) return;

    // Check for user-input first (not a Response part)
    const firstPart = parts[0];
    if (firstPart.type === "user-input") {
      // User input becomes a user message
      const currentMessages = yield* store.readMessages(agentKey);
      yield* store.writeMessages(agentKey, [
        ...currentMessages,
        {
          role: "user" as const,
          content: firstPart.content,
        },
      ]);
      yield* store.truncateParts(agentKey);
      return;
    }

    // Use @effect/ai's Prompt.fromResponseParts for all AI response parts
    // It handles all the streaming accumulation logic properly
    const prompt = Prompt.fromResponseParts(
      parts.filter((p) => p.type !== "user-input") as any[],
    );

    const encode = S.encode(Prompt.Message);

    // Extract messages from the Prompt
    const messages = yield* Effect.all(
      prompt.content.map((msg) => encode(msg).pipe(Effect.orDie)),
    );

    if (messages.length > 0) {
      const currentMessages = yield* store.readMessages(agentKey);
      yield* store.writeMessages(agentKey, [...currentMessages, ...messages]);
    }

    yield* store.truncateParts(agentKey);
  });
