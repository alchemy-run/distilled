import type { AiError } from "@effect/ai/AiError";
import * as Chat from "@effect/ai/Chat";
import type {
  GenerateObjectResponse,
  LanguageModel,
} from "@effect/ai/LanguageModel";
import * as EffectTool from "@effect/ai/Tool";
import * as EffectToolkit from "@effect/ai/Toolkit";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";
import type { Fragment } from "./fragment.ts";
import { AgentState } from "./state.ts";

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

export interface SpawnedAgent {
  send: (prompt: string) => Effect.Effect<void, AiError, LanguageModel>;
  query: <A>(
    prompt: string,
    schema: S.Schema<A, any>,
  ) => Effect.Effect<GenerateObjectResponse<{}, A>, AiError, LanguageModel>;
}

export const spawn: (
  agent: Agent,
) => Effect.Effect<SpawnedAgent, AiError, LanguageModel> = Effect.fn(function* (
  agent: Agent,
) {
  const state = yield* AgentState;

  const agentState = yield* state.get(agent.id);

  const chat = yield* Chat.fromPrompt(agentState.messages);

  // TODO(sam): support interrupts/parallel threads
  const sem = yield* Effect.makeSemaphore(1);
  const locked = <A, E, R>(fn: Effect.Effect<A, E, R>) =>
    sem.withPermits(1)(fn);

  const children = yield* Effect.all(
    agent.references.filter(isAgent).map(spawn),
  );

  const send = EffectTool.make("send", {
    description: "Send a message to the agent",
    parameters: {
      glob: S.String.annotations({
        description:
          "A glob pattern describing which agents to send this message to",
      }),
      message: S.String.annotations({
        description: "The message to send to the agents",
      }),
    },
  });

  const toolkit = EffectToolkit.make();

  return {
    send: (prompt: string) =>
      locked(
        Effect.gen(function* () {
          yield* Stream.runForEach(
            chat.streamText({
              prompt: [
                {
                  role: "system",
                  content: "TODO(sam): generate context from the references",
                },
                {
                  role: "user",
                  content: prompt,
                },
              ],
              // toolkit
            }),
            (part) =>
              Effect.sync(() => {
                switch (part.type) {
                  case "text-delta":
                    process.stdout.write(part.delta);
                    break;
                }
              }),
          );
        }),
      ),
    query: <A>(prompt: string, schema: S.Schema<A, any>) =>
      locked(
        chat.generateObject({
          schema,
          prompt: [
            {
              role: "system",
              content: "TODO(sam): generate context from the references",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      ),
  } satisfies SpawnedAgent;
});
