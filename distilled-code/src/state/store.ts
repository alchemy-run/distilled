import type { MessageEncoded } from "@effect/ai/Prompt";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as PubSub from "effect/PubSub";
import * as Stream from "effect/Stream";
import type { MessagePart, Thread } from "./thread.ts";

/**
 * Error that occurs when a StateStore operation fails.
 */
export class StateStoreError extends Data.TaggedError("StateStoreError")<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

export const StateStore = Context.GenericTag<StateStore>("StateStore");

/**
 * StateStorePersistence provides low-level storage operations for agent state.
 * This is the abstraction layer that can be swapped for different backends
 * (FileSystem, SQLite, PostgreSQL, etc.).
 *
 * This interface does NOT include streaming/PubSub - that's handled by StateStore.
 */
export interface StateStore {
  /**
   * Read messages for an agent.
   */
  readMessages(
    agentKey: string,
  ): Effect.Effect<readonly MessageEncoded[], StateStoreError>;

  /**
   * Write messages for an agent.
   */
  writeMessages(
    agentKey: string,
    messages: readonly MessageEncoded[],
  ): Effect.Effect<void, StateStoreError>;

  /**
   * Read all parts for an agent.
   */
  readParts(agentKey: string): Effect.Effect<MessagePart[], StateStoreError>;

  /**
   * Append a part to storage.
   */
  appendPart(
    agentKey: string,
    part: MessagePart,
  ): Effect.Effect<void, StateStoreError>;

  /**
   * Clear all parts.
   */
  truncateParts(agentKey: string): Effect.Effect<void, StateStoreError>;

  /**
   * List all agent keys.
   */
  listAgents(): Effect.Effect<readonly string[], StateStoreError>;

  /**
   * Delete all data for an agent.
   */
  deleteAgent(agentKey: string): Effect.Effect<void, StateStoreError>;

  /**
   * Subscribe to thread stream (replays history + live updates).
   */
  subscribeThread(
    agentKey: string,
  ): Effect.Effect<Stream.Stream<MessagePart, never, never>, StateStoreError>;
}

export const createStateStore = (
  persistence: Omit<StateStore, "subscribeThread">,
) => {
  // Map of PubSubs per agent key for thread streaming
  const threads = new Map<string, Thread>();

  const getThread = Effect.fnUntraced(function* (agentKey: string) {
    const existing = threads.get(agentKey);
    if (existing) {
      return existing;
    }

    const pubsub = yield* PubSub.unbounded<MessagePart>({ replay: Infinity });

    // Daemon that persists parts as they are published
    const daemon = yield* Stream.fromPubSub(pubsub).pipe(
      Stream.mapEffect((part) => persistence.appendPart(agentKey, part)),
      Stream.runDrain,
      Effect.forkDaemon,
    );

    const thread = { pubsub, daemon } satisfies Thread;
    threads.set(agentKey, thread);
    return thread;
  });

  const getPubSub = Effect.fnUntraced(function* (agentKey) {
    return (yield* getThread(agentKey)).pubsub;
  });

  return {
    // Delegate to persistence
    ...persistence,

    // Override appendPart to publish to PubSub (daemon persists)
    appendPart: Effect.fnUntraced(function* (agentKey, part) {
      yield* Effect.all(
        [
          persistence.appendPart(agentKey, part),
          PubSub.publish(yield* getPubSub(agentKey), part),
        ],
        { concurrency: "unbounded" },
      );
    }),

    // Override deleteAgent to also clean up thread
    deleteAgent: Effect.fnUntraced(function* (agentKey) {
      yield* persistence.deleteAgent(agentKey);
      threads.delete(agentKey);
    }),

    // Streaming is handled here, not in persistence
    subscribeThread: Effect.fnUntraced(function* (agentKey) {
      return Stream.fromPubSub(yield* getPubSub(agentKey));
    }),
  } satisfies StateStore;
};
