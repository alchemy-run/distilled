import { Tool, Toolkit } from "@effect/ai";

import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";

export const read = Tool.make("read", {
  description: `Reads a file from the local filesystem.

Usage:
- Use relative paths from the current working directory (e.g., "src/index.ts", "test/fixtures/math.ts")
- Do NOT use paths starting with "/" - use relative paths instead
- By default, it reads up to 2000 lines starting from the beginning of the file
- You can optionally specify a line offset and limit for long files
`,
  parameters: {
    filePath: S.String.annotations({
      description: "The path to the file to read",
    }),
    offset: S.Number.annotations({
      description: "The line number to start reading from (0-based)",
    }),
    limit: S.Number.annotations({
      description: "The number of lines to read (defaults to 2000)",
    }),
  },
  success: S.String,
  failure: S.Never,
});

export const readTooklit = Toolkit.make(read);

export const readTooklitLayer = readTooklit.toLayer(
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    return {
      read: Effect.fn(function* ({
        filePath: _filePath,
        // offset = 0,
        // limit = 2000,
      }) {
        yield* Effect.logDebug(`[read] filePath=${_filePath}`);

        const offset = 0;
        const limit = 2000;

        if (_filePath.includes(".env")) {
          return "Environment files (.env) are not readable for security reasons";
        }

        const filePath = path.isAbsolute(_filePath)
          ? _filePath
          : path.join(process.cwd(), _filePath);

        const exists = yield* fs
          .exists(filePath)
          .pipe(Effect.catchAll(() => Effect.succeed(false)));

        if (!exists) {
          // Try to get suggestions from parent directory
          const dir = path.dirname(filePath);
          const base = path.basename(filePath);
          const dirExists = yield* fs
            .exists(dir)
            .pipe(Effect.catchAll(() => Effect.succeed(false)));

          if (dirExists) {
            const files = yield* fs
              .readDirectory(dir)
              .pipe(Effect.catchAll(() => Effect.succeed([] as string[])));
            const suggestions = files
              .filter(
                (entry) =>
                  entry.toLowerCase().includes(base.toLowerCase()) ||
                  base.toLowerCase().includes(entry.toLowerCase()),
              )
              .map((entry) => path.join(dir, entry))
              .slice(0, 3);

            if (suggestions.length > 0) {
              return `File not found: ${filePath}. Did you mean one of these?\n${suggestions.join("\n")}`;
            }
          }
          return `File not found: ${filePath}`;
        }

        // Check if it's a directory
        const stat = yield* fs
          .stat(filePath)
          .pipe(Effect.catchAll(() => Effect.succeed(null)));

        if (stat?.type === "Directory") {
          const entries = yield* fs
            .readDirectory(filePath)
            .pipe(Effect.catchAll(() => Effect.succeed([] as string[])));
          return `Cannot read directory as a file: ${filePath}\nThis is a directory. Contents:\n${entries.slice(0, 10).join("\n")}${entries.length > 10 ? "\n..." : ""}`;
        }

        const content = yield* fs
          .readFileString(filePath)
          .pipe(
            Effect.catchAll((e) =>
              Effect.succeed(`Failed to read file ${filePath}: ${e}`),
            ),
          );

        return content
          .split("\n")
          .slice(offset, offset + limit)
          .join("\n");
      }),
    };
  }),
);
