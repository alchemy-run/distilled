import { Tool, Toolkit } from "@effect/ai";
import * as S from "effect/Schema";
import * as Path from "@effect/platform/Path";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";

export const write = Tool.make("write", {
  description: `Writes a file to the local filesystem.

Usage:
- Use relative paths from the current working directory (e.g., "src/index.ts", "test/fixtures/math.test.ts")
- Do NOT use paths starting with "/" - use relative paths instead
- This tool will overwrite the existing file if there is one at the provided path.
- Parent directories are created automatically if they don't exist.
`,
  parameters: {
    filePath: S.String.annotations({
      description: "The path to the file to write",
    }),
    content: S.String.annotations({
      description: "The content to write to the file",
    }),
  },
  success: S.String,
  failure: S.Never,
});

export const writeTooklit = Toolkit.make(write);

export const writeTooklitLayer = writeTooklit.toLayer(
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    return {
      write: Effect.fn(function* ({ filePath: _filePath, content }) {
        yield* Effect.logDebug(
          `[write] filePath=${_filePath} content.length=${content.length}`,
        );

        const filePath = path.isAbsolute(_filePath)
          ? _filePath
          : path.join(process.cwd(), _filePath);

        // Ensure parent directory exists
        const dir = path.dirname(filePath);
        yield* fs
          .makeDirectory(dir, { recursive: true })
          .pipe(Effect.catchAll(() => Effect.void));

        const result = yield* fs.writeFileString(filePath, content).pipe(
          Effect.map(() => `Wrote file: ${filePath}`),
          Effect.catchAll((e) =>
            Effect.succeed(`Failed to write file ${filePath}: ${e}`),
          ),
        );

        return result;
      }),
    };
  }),
);
