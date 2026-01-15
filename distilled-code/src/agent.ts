import * as Chat from "@effect/ai/Chat";
import { FileSystem, Path } from "@effect/platform";
import * as Effect from "effect/Effect";
import type * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { CodingTools } from "./tools/index.ts";

/**
 * A spawned agent that can receive multiple commands.
 * State persists to .distilled/{key}.json
 */
export interface Agent {
  readonly key: string;
  /**
   * Send a command to the agent and get the response text.
   */
  readonly send: (prompt: string) => Effect.Effect<string, any, any>;
  /**
   * Query the agent for structured data matching the given schema.
   */
  readonly query: <A, I extends Record<string, unknown>, R>(
    prompt: string,
    schema: Schema.Schema<A, I, R>,
  ) => Effect.Effect<A, any, any>;
}

/**
 * Spawn a persistent agent that can receive multiple commands.
 * Session state is persisted to .distilled/{key}.json
 *
 * @example
 * ```ts
 * const a = yield* Agent.spawn("test/math");
 * yield* a.send("read test/fixtures/math.ts");
 * yield* a.send("generate tests");
 * yield* a.send("run tests and fix failures");
 * ```
 */
export const spawn = (key: string) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const pathService = yield* Path.Path;

    const sessionPath = pathService.join(".distilled", `${key}.json`);
    const sessionDir = pathService.dirname(sessionPath);

    // Load existing session or create empty chat
    const existingJson = yield* fs
      .readFileString(sessionPath)
      .pipe(Effect.catchAll(() => Effect.succeed(null)));

    const chat = existingJson
      ? yield* Chat.fromJson(existingJson)
      : yield* Chat.empty;

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
            toolkit: CodingTools,
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

    const agent: Agent = {
      key,
      send,
      query,
    };

    return agent;
  });

/**
 * Run a one-shot agent command.
 * Messages persist to .distilled/{key}.json
 *
 * @example
 * ```ts
 * const response = yield* agent("test/math", "generate tests for math.ts");
 * ```
 */
export const agent = (key: string, prompt: string) =>
  Effect.gen(function* () {
    const a = yield* spawn(key);
    return yield* a.send(prompt);
  });

/**
 * Agent module - use Agent.spawn for persistent agents
 */
export const Agent = {
  spawn,
};
