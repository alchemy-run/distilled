import { Tool, Toolkit } from "@effect/ai";

import * as S from "effect/Schema";
import * as Path from "@effect/platform/Path";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";

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
  failure: S.Any,
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
        const offset = 0;
        const limit = 2000;
        if (_filePath.includes(".env")) {
          return yield* Effect.fail("Environment variables are not readable");
        }
        const filePath = path.isAbsolute(_filePath)
          ? _filePath
          : path.join(process.cwd(), _filePath);

        if (!(yield* fs.exists(filePath))) {
          const dir = path.dirname(filePath);
          const base = path.basename(filePath);
          const files = yield* fs.readDirectory(dir);
          const suggestions = files
            .filter(
              (entry) =>
                entry.toLowerCase().includes(base.toLowerCase()) ||
                base.toLowerCase().includes(entry.toLowerCase()),
            )
            .map((entry) => path.join(dir, entry))
            .slice(0, 3);

          if (suggestions.length > 0) {
            return yield* Effect.fail(
              `File not found: ${filePath}. Did you mean one of these files? ${suggestions.join(", ")}`,
            );
          }
          return yield* Effect.fail(`File not found: ${filePath}`);
        }
        return (yield* fs.readFileString(filePath))
          .split("\n")
          .slice(offset, offset + limit)
          .join("\n");
      }),
    };
  }),
);
