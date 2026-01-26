import type { MessageEncoded } from "@effect/ai/Prompt";
import * as Prompt from "@effect/ai/Prompt";
import type { AnyPart } from "@effect/ai/Response";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import type { Fiber } from "effect/Fiber";
import * as Layer from "effect/Layer";
import * as PubSub from "effect/PubSub";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
export type { MessageEncoded };

// =============================================================================
// Thread Stream Types
// =============================================================================

/**
 * Represents a user input message in the thread stream.
 * This allows user messages to be part of the unified stream alongside AI responses.
 */
export interface UserInputPart {
  readonly type: "user-input";
  readonly content: string;
  readonly timestamp: number;
}

/**
 * Union type representing all parts that can appear in a thread stream.
 * Includes both user input and AI response stream parts.
 */
export type ThreadPart = UserInputPart | AnyPart;

/**
 * Persisted agent state data.
 * All agent state is consolidated into a single file.
 */
export interface AgentStateData {
  /** Chat messages for this agent (compacted from parts at boundaries) */
  messages: MessageEncoded[];
  /** Raw thread parts for replay and durability */
  parts: ThreadPart[];
  /** Last updated timestamp */
  updatedAt: number;
}

/**
 * Default empty state for a new agent.
 */
const emptyState = (): AgentStateData => ({
  messages: [],
  parts: [],
  updatedAt: Date.now(),
});

/**
 * Error that occurs when reading or writing agent state fails.
 */
export class AgentStateError extends Data.TaggedError("AgentStateError")<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

/**
 * AgentState service interface for managing all agent state.
 * Consolidates todos, file tracking, chat history, and other agent metadata.
 *
 * Agent keys can be scoped to support hierarchical state management:
 * - Root agent: `agentKey = "agentId"` → stored at `.distilled/state/agentId.state.json`
 * - Child agent: `agentKey = "scope/agentId"` → stored at `.distilled/state/scope/agentId.state.json`
 *
 * This allows the caller (scope owner) to manage conversation threads with agents it interacts with.
 */
export interface AgentState {
  /**
   * Get full state for an agent.
   * @param agentKey - Agent identifier, may include scope prefix (e.g., "scope/agentId")
   */
  get(agentKey: string): Effect.Effect<AgentStateData, AgentStateError>;

  /**
   * Get chat messages for an agent.
   * @param agentKey - Agent identifier, may include scope prefix
   */
  getMessages(
    agentKey: string,
  ): Effect.Effect<readonly MessageEncoded[], AgentStateError>;

  /**
   * List all agent keys, including scoped keys (e.g., "scope/agentId").
   */
  listAgents(): Effect.Effect<readonly string[], AgentStateError>;

  /**
   * Delete all state for an agent.
   * @param agentKey - Agent identifier, may include scope prefix
   */
  delete(agentKey: string): Effect.Effect<void, AgentStateError>;

  /**
   * Subscribe to an agent's thread stream.
   * Returns a Stream that replays all historical parts and receives new ones.
   * @param agentKey - Agent identifier, may include scope prefix
   */
  subscribeThread(
    agentKey: string,
  ): Effect.Effect<Stream.Stream<ThreadPart, never, never>, AgentStateError>;

  /**
   * Append a stream part to the thread.
   * Publishes to subscribers and handles persistence internally.
   * @param agentKey - Agent identifier, may include scope prefix
   * @param part - The stream part to append
   */
  appendPart(
    agentKey: string,
    part: ThreadPart,
  ): Effect.Effect<void, AgentStateError>;
}

export const AgentState = Context.GenericTag<AgentState>("AgentState");

/**
 * FileSystem implementation of AgentState.
 *
 * State is stored in .distilled/state/{agent-key}.state.json files.
 * Scoped keys like "scope/agentId" result in nested paths:
 * - `.distilled/state/scope/agentId.state.json`
 *
 * Uses semaphores to ensure exclusive write access per agent.
 */
export const FileSystemAgentState = Layer.effect(
  AgentState,
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    // Map of semaphores per agent key to ensure exclusive write access
    const locks = new Map<string, Effect.Semaphore>();

    type Thread = {
      pubsub: PubSub.PubSub<ThreadPart>;
      daemon: Fiber<void, AgentStateError>;
      parts: ThreadPart[];
    };

    // Map of PubSubs per agent key for thread streaming
    const threads = new Map<string, Thread>();

    /**
     * Flush any partial parts from a previous session (e.g., after a crash).
     * Creates messages from whatever parts exist and persists them, then truncates.
     */
    const flush = Effect.fnUntraced(function* (agentKey: string) {
      const state = yield* readState(agentKey);
      const parts = state.parts;
      if (parts.length > 0) {
        if (parts.length === 0) return [];

        // Check for user-input first (not a Response part)
        const firstPart = parts[0];
        if (firstPart.type === "user-input") {
          return [
            {
              role: "user" as const,
              content: firstPart.content,
            },
          ];
        }

        // Use @effect/ai's Prompt.fromResponseParts for all AI response parts
        // It handles all the streaming accumulation logic properly
        const prompt = Prompt.fromResponseParts(
          parts.filter((p) => p.type !== "user-input") as any[],
        );

        const encode = Schema.encode(Prompt.Message);

        // Extract messages from the Prompt
        // Prompt.content contains the Message objects
        const messages = yield* Effect.all(
          prompt.content.map((msg) => encode(msg).pipe(Effect.orDie)),
        );

        // const messages = yield* createMessages(state.parts);
        if (messages.length > 0) {
          yield* writeState(agentKey, {
            messages: [...state.messages, ...messages],
            updatedAt: Date.now(),
          });
        }
        yield* fs.truncate(getPartsPath(agentKey), 0).pipe(
          Effect.catchAll(
            (e) =>
              new AgentStateError({
                message: `Failed to truncate parts file: ${e.message}`,
                cause: e,
              }),
          ),
        );
      }
    });

    const getOrCreateThread = Effect.fnUntraced(function* (agentKey: string) {
      const existing = threads.get(agentKey);
      if (existing) {
        return existing;
      }

      // Recover from crash: flush any partial parts from previous session
      yield* withLock(agentKey, flush(agentKey));

      /**
       * Process a part: append to file, and when a message is complete,
       * persist it to state.messages and truncate the parts file.
       */
      const processPart = Effect.fnUntraced(function* (part: ThreadPart) {
        // Append-only: just append to JSONL file, no need to read/rewrite
        yield* appendPart(agentKey, part);

        // Check if this part completes a message
        const isMessageComplete =
          part.type === "user-input" ||
          part.type === "text-end" ||
          part.type === "reasoning-end" ||
          part.type === "tool-call" ||
          part.type === "tool-result";

        if (isMessageComplete) {
          yield* flush(agentKey);
        }
      });

      const pubsub = yield* PubSub.unbounded<ThreadPart>({ replay: Infinity });
      const daemon = yield* Stream.fromPubSub(pubsub).pipe(
        Stream.flatMap((part) => withLock(agentKey, processPart(part))),
        Stream.mapError(
          (error) =>
            new AgentStateError({
              message: "Failed to append part",
              cause: error,
            }),
        ),
        Stream.runDrain,
        Effect.forkDaemon, // Runs in background, survives scope
      );
      const thread = {
        pubsub,
        daemon,
        parts: [],
      } satisfies Thread;
      threads.set(agentKey, thread);
      return thread;
    });

    const stateCache = new Map<string, AgentStateData>();

    // Get or create a semaphore for an agent
    const getLock = (agentKey: string) =>
      Effect.gen(function* () {
        let lock = locks.get(agentKey);
        if (!lock) {
          lock = yield* Effect.makeSemaphore(1);
          locks.set(agentKey, lock);
        }
        return lock;
      });

    // Helper to run an effect with exclusive lock
    const withLock = <A, E, R>(
      agentKey: string,
      effect: Effect.Effect<A, E, R>,
    ): Effect.Effect<A, E, R> =>
      Effect.gen(function* () {
        const lock = yield* getLock(agentKey);
        return yield* lock.withPermits(1)(effect);
      });

    const getStatePath = (agentKey: string) =>
      path.join(".distilled", "state", `${agentKey}.state.json`);

    const getPartsPath = (agentKey: string) =>
      path.join(".distilled", "state", `${agentKey}.parts.jsonl`);

    const readParts = Effect.fnUntraced(function* (agentKey: string) {
      const partsPath = getPartsPath(agentKey);
      const content = yield* fs
        .readFileString(partsPath)
        .pipe(Effect.catchAll(() => Effect.succeed("")));

      if (!content.trim()) {
        return [] as ThreadPart[];
      }

      const parts: ThreadPart[] = [];
      for (const line of content.split("\n")) {
        if (line.trim()) {
          try {
            parts.push(JSON.parse(line));
          } catch {
            // Skip malformed lines
          }
        }
      }
      return parts;
    });

    const appendPart = Effect.fnUntraced(function* (
      agentKey: string,
      part: ThreadPart,
    ) {
      const partsPath = getPartsPath(agentKey);
      const dir = path.dirname(partsPath);

      yield* fs.makeDirectory(dir, { recursive: true }).pipe(
        Effect.catchAll(
          (e) =>
            new AgentStateError({
              message: `Failed to create directory: ${e.message}`,
              cause: e,
            }),
        ),
      );

      yield* fs.writeFileString(partsPath, JSON.stringify(part) + "\n", {
        flag: "a",
      });
    });

    const readState = Effect.fnUntraced(function* (agentKey: string) {
      const readStateFromDisk = Effect.fnUntraced(function* () {
        const filePath = getStatePath(agentKey);
        const content = yield* fs
          .readFileString(filePath)
          .pipe(Effect.catchAll(() => Effect.succeed("")));

        // Read parts from separate JSONL file
        const parts = yield* readParts(agentKey);

        if (!content) {
          return {
            ...emptyState(),
            parts,
          };
        }

        try {
          const parsed = JSON.parse(content);
          // Validate and provide defaults for missing fields
          return {
            parts,
            messages: Array.isArray(parsed.messages) ? parsed.messages : [],
            updatedAt:
              typeof parsed.updatedAt === "number"
                ? parsed.updatedAt
                : Date.now(),
          };
        } catch (e) {
          return yield* new AgentStateError({
            message: `Failed to parse agent state: ${e}`,
            cause: e,
          });
        }
      });

      let state = stateCache.get(agentKey);
      if (state) {
        // Re-read parts since they may have been appended
        const parts = yield* readParts(agentKey);
        return { ...state, parts };
      } else {
        state = yield* readStateFromDisk();
        stateCache.set(agentKey, state);
        return state;
      }
    });

    const writeState = Effect.fnUntraced(function* (
      agentKey: string,
      state: Omit<AgentStateData, "parts">,
    ) {
      const filePath = getStatePath(agentKey);
      const dir = path.dirname(filePath);

      yield* fs.makeDirectory(dir, { recursive: true }).pipe(
        Effect.catchAll(
          (e) =>
            new AgentStateError({
              message: `Failed to create directory: ${e.message}`,
              cause: e,
            }),
        ),
      );

      const stateWithTimestamp = {
        messages: state.messages,
        updatedAt: Date.now(),
      };

      yield* fs
        .writeFileString(filePath, JSON.stringify(stateWithTimestamp, null, 2))
        .pipe(
          Effect.catchAll(
            (e) =>
              new AgentStateError({
                message: `Failed to write agent state: ${e.message}`,
                cause: e,
              }),
          ),
        );
    });

    return {
      get: readState,

      getMessages: (agentKey) =>
        withLock(agentKey, readState(agentKey)).pipe(
          Effect.map((state) => state.messages as readonly MessageEncoded[]),
        ),

      listAgents: Effect.fnUntraced(function* () {
        const stateDir = path.join(".distilled", "state");
        const exists = yield* fs
          .exists(stateDir)
          .pipe(Effect.catchAll(() => Effect.succeed(false)));
        if (!exists) {
          return [];
        }

        // Recursively find all .state.json and .parts.jsonl files in .distilled/state/
        // Use a Set to avoid double counting agents with both files
        const agentSet = new Set<string>();
        const scanDir = (dir: string, prefix: string): Effect.Effect<void> =>
          Effect.gen(function* () {
            const entries = yield* fs
              .readDirectory(dir)
              .pipe(Effect.catchAll(() => Effect.succeed([] as string[])));

            for (const entry of entries) {
              const entryPath = path.join(dir, entry);
              const stat = yield* fs
                .stat(entryPath)
                .pipe(Effect.catchAll(() => Effect.succeed(null)));

              if (stat?.type === "Directory") {
                // Recurse into subdirectory
                const newPrefix = prefix ? `${prefix}/${entry}` : entry;
                yield* scanDir(entryPath, newPrefix);
              } else if (entry.endsWith(".state.json")) {
                const baseName = entry.slice(0, -".state.json".length);
                const agentKey = prefix ? `${prefix}/${baseName}` : baseName;
                agentSet.add(agentKey);
              } else if (entry.endsWith(".parts.jsonl")) {
                const baseName = entry.slice(0, -".parts.jsonl".length);
                const agentKey = prefix ? `${prefix}/${baseName}` : baseName;
                agentSet.add(agentKey);
              }
            }
          });

        yield* scanDir(stateDir, "");
        return Array.from(agentSet);
      }),

      delete: Effect.fnUntraced(function* (agentKey) {
        // Delete the state file and parts file
        yield* fs
          .remove(getStatePath(agentKey))
          .pipe(Effect.catchAll(() => Effect.void));
        yield* fs
          .remove(getPartsPath(agentKey))
          .pipe(Effect.catchAll(() => Effect.void));

        // Remove from caches
        stateCache.delete(agentKey);
        locks.delete(agentKey);

        // Clean up the PubSub if it exists
        threads.delete(agentKey);
      }),

      subscribeThread: (agentKey) =>
        getOrCreateThread(agentKey).pipe(
          Effect.map((thread) => Stream.fromPubSub(thread.pubsub)),
        ),

      appendPart: (agentKey, part) =>
        getOrCreateThread(agentKey).pipe(
          Effect.flatMap((thread) => PubSub.publish(thread.pubsub, part)),
          Effect.asVoid,
        ),
    } satisfies AgentState;
  }),
);
