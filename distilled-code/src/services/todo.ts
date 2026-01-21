import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as S from "effect/Schema";

/**
 * Todo item schema matching opencode's structure.
 */
export const Todo = S.Struct({
  id: S.String,
  content: S.String,
  status: S.Literal("pending", "in_progress", "completed", "cancelled"),
  priority: S.optional(S.Literal("high", "medium", "low")),
});
export type Todo = S.Schema.Type<typeof Todo>;

/**
 * Error that occurs when reading or writing todos fails.
 */
export class TodoError extends Data.TaggedError("TodoError")<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

/**
 * TodoBackend service interface for storing and retrieving todos.
 */
export interface TodoBackend {
  readonly get: (agentKey: string) => Effect.Effect<Todo[], TodoError>;
  readonly update: (
    agentKey: string,
    todos: Todo[],
  ) => Effect.Effect<void, TodoError>;
}

export const TodoBackend = Context.GenericTag<TodoBackend>("TodoBackend");

/**
 * In-memory implementation of TodoBackend.
 * Todos are stored in a Map and do not persist across sessions.
 */
export const InMemoryTodoBackend: Layer.Layer<TodoBackend> = Layer.sync(
  TodoBackend,
  () => {
    const state = new Map<string, Todo[]>();
    return {
      get: (agentKey) => Effect.succeed(state.get(agentKey) ?? []),
      update: (agentKey, todos) =>
        Effect.sync(() => {
          state.set(agentKey, todos);
        }),
    };
  },
);

/**
 * FileSystem implementation of TodoBackend.
 * Todos are stored in .distilled/{agent-key}.plan.json files.
 */
export const FileSystemTodoBackend: Layer.Layer<
  TodoBackend,
  never,
  FileSystem.FileSystem | Path.Path
> = Layer.effect(
  TodoBackend,
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const getPath = (agentKey: string) =>
      path.join(".distilled", `${agentKey}.plan.json`);

    return {
      get: (agentKey) =>
        Effect.gen(function* () {
          const filePath = getPath(agentKey);
          const content = yield* fs
            .readFileString(filePath)
            .pipe(Effect.catchAll(() => Effect.succeed("[]")));
          try {
            return JSON.parse(content) as Todo[];
          } catch (e) {
            return yield* new TodoError({
              message: `Failed to parse todos: ${e}`,
              cause: e,
            });
          }
        }),
      update: (agentKey, todos) =>
        Effect.gen(function* () {
          const filePath = getPath(agentKey);
          const dir = path.dirname(filePath);
          yield* fs
            .makeDirectory(dir, { recursive: true })
            .pipe(
              Effect.catchAll(
                (e) =>
                  new TodoError({
                    message: `Failed to create directory: ${e.message}`,
                    cause: e,
                  }),
              ),
            );
          yield* fs
            .writeFileString(filePath, JSON.stringify(todos, null, 2))
            .pipe(
              Effect.catchAll(
                (e) =>
                  new TodoError({
                    message: `Failed to write todos: ${e.message}`,
                    cause: e,
                  }),
              ),
            );
        }),
    };
  }),
);
