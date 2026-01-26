import type { MessageEncoded } from "@effect/ai/Prompt";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { createStateStore, StateStore, StateStoreError } from "./store.ts";
import type { MessagePart } from "./thread.ts";

/**
 * FileSystem implementation of StateStorePersistence.
 *
 * State is stored in .distilled/state/{agent-key}.state.json files.
 * Parts are stored in .distilled/state/{agent-key}.parts.jsonl files.
 *
 * Scoped keys like "scope/agentId" result in nested paths:
 * - `.distilled/state/scope/agentId.state.json`
 * - `.distilled/state/scope/agentId.parts.jsonl`
 */
export const FileSystemStateStore = Layer.effect(
  StateStore,
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const getStatePath = (agentKey: string) =>
      path.join(".distilled", "state", `${agentKey}.state.json`);

    const getPartsPath = (agentKey: string) =>
      path.join(".distilled", "state", `${agentKey}.parts.jsonl`);

    const ensureDir = (filePath: string) =>
      fs.makeDirectory(path.dirname(filePath), { recursive: true }).pipe(
        Effect.catchAll(
          (e) =>
            new StateStoreError({
              message: `Failed to create directory: ${e.message}`,
              cause: e,
            }),
        ),
      );

    return createStateStore({
      readMessages: Effect.fnUntraced(function* (agentKey) {
        const filePath = getStatePath(agentKey);
        const content = yield* fs
          .readFileString(filePath)
          .pipe(Effect.catchAll(() => Effect.succeed("")));

        if (!content.trim()) {
          return [] as readonly MessageEncoded[];
        }

        try {
          const parsed = JSON.parse(content);
          return (
            Array.isArray(parsed.messages) ? parsed.messages : []
          ) as readonly MessageEncoded[];
        } catch (e) {
          return yield* new StateStoreError({
            message: `Failed to parse state file: ${e}`,
            cause: e,
          });
        }
      }),

      writeMessages: Effect.fnUntraced(function* (agentKey, messages) {
        const filePath = getStatePath(agentKey);
        yield* ensureDir(filePath);

        const stateData = {
          messages,
          updatedAt: Date.now(),
        };

        yield* fs
          .writeFileString(filePath, JSON.stringify(stateData, null, 2))
          .pipe(
            Effect.catchAll(
              (e) =>
                new StateStoreError({
                  message: `Failed to write state file: ${e.message}`,
                  cause: e,
                }),
            ),
          );
      }),

      readParts: Effect.fnUntraced(function* (agentKey) {
        const partsPath = getPartsPath(agentKey);
        const content = yield* fs
          .readFileString(partsPath)
          .pipe(Effect.catchAll(() => Effect.succeed("")));

        if (!content.trim()) {
          return [] as MessagePart[];
        }

        const parts: MessagePart[] = [];
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
      }),

      appendPart: Effect.fnUntraced(function* (agentKey, part) {
        const partsPath = getPartsPath(agentKey);
        yield* ensureDir(partsPath);
        yield* fs
          .writeFileString(partsPath, JSON.stringify(part) + "\n", {
            flag: "a",
          })
          .pipe(
            Effect.catchAll(
              (e) =>
                new StateStoreError({
                  message: `Failed to append part: ${e.message}`,
                  cause: e,
                }),
            ),
          );
      }),

      truncateParts: Effect.fnUntraced(function* (agentKey) {
        const partsPath = getPartsPath(agentKey);
        yield* fs.truncate(partsPath, 0).pipe(
          Effect.catchAll(
            (e) =>
              new StateStoreError({
                message: `Failed to truncate parts file: ${e.message}`,
                cause: e,
              }),
          ),
        );
      }),

      listAgents: Effect.fnUntraced(function* () {
        const stateDir = path.join(".distilled", "state");
        const exists = yield* fs
          .exists(stateDir)
          .pipe(Effect.catchAll(() => Effect.succeed(false)));

        if (!exists) {
          return [] as readonly string[];
        }

        // Recursively find all .state.json and .parts.jsonl files
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
        return Array.from(agentSet) as readonly string[];
      }),

      deleteAgent: Effect.fnUntraced(function* (agentKey) {
        yield* fs
          .remove(getStatePath(agentKey))
          .pipe(Effect.catchAll(() => Effect.void));
        yield* fs
          .remove(getPartsPath(agentKey))
          .pipe(Effect.catchAll(() => Effect.void));
      }),
    });
  }),
);
