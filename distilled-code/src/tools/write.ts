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
  success: S.Void,
  failure: S.Any,
});

export const writeTooklit = Toolkit.make(write);

export const writeTooklitLayer = writeTooklit.toLayer(
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    return {
      write: Effect.fn(function* ({ filePath: _filePath, content }) {
        const filePath = path.isAbsolute(_filePath)
          ? _filePath
          : path.join(process.cwd(), _filePath);
        yield* fs.writeFileString(filePath, content);
      }),
    };
  }),
);
