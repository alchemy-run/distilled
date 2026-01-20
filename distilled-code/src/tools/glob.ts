import { Tool, Toolkit } from "@effect/ai";
import { CommandExecutor } from "@effect/platform/CommandExecutor";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as S from "effect/Schema";
import * as Ripgrep from "../util/ripgrep.ts";

export const glob = Tool.make("glob", {
  description: `- Fast file pattern matching tool that works with any codebase size
- Supports glob patterns like "**/*.js" or "src/**/*.ts"
- Returns matching file paths sorted by modification time
- Use this tool when you need to find files by name patterns
- When you are doing an open-ended search that may require multiple rounds of globbing and grepping, use the Task tool instead
- You have the capability to call multiple tools in a single response. It is always better to speculatively perform multiple searches as a batch that are potentially useful.
`,
  dependencies: [CommandExecutor, FileSystem.FileSystem],
  parameters: {
    pattern: S.String.annotations({
      description: "The glob pattern to match files against",
    }),
    path: S.optional(S.String).annotations({
      description: `The directory to search in. Defaults to the current working directory if not specified.`,
    }),
  },
  success: S.String,
  failure: S.Never,
});

export const globTooklit = Toolkit.make(glob);

export const globTooklitLayer = globTooklit.toLayer(
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    return {
      glob: (params: { readonly pattern: string; readonly path?: string }) =>
        Effect.gen(function* () {
          yield* Effect.logDebug(
            `[glob] pattern=${params.pattern} path=${params.path}`,
          );

          let searchPath = params.path || process.cwd();
          searchPath = path.isAbsolute(searchPath)
            ? searchPath
            : path.resolve(process.cwd(), searchPath);
          const files: { path: string; mtime: number }[] = [];
          const limit = 100;
          let truncated = false;
          for (const filePath of yield* Ripgrep.findFiles({
            cwd: searchPath,
            glob: [params.pattern],
          })) {
            if (files.length >= limit) {
              truncated = true;
              break;
            }
            const stats = yield* fs
              .stat(filePath)
              .pipe(Effect.catchAll(() => Effect.succeed(null)));
            if (!stats) continue;
            files.push({
              path: filePath,
              mtime: stats.mtime.pipe(Option.getOrUndefined)?.getTime() || 0,
            });
          }
          files.sort((a, b) => b.mtime - a.mtime);
          const output = files.map((f) => f.path);
          if (output.length === 0) {
            return `No files found matching pattern "${params.pattern}" in ${searchPath}`;
          }
          if (truncated) {
            return `${output.join("\n")}\n\n(${output.length} files found. Results are truncated, consider using a more specific pattern.)`;
          }
          return output.join("\n");
        }).pipe(
          Effect.catchAll((e) => Effect.succeed(`Glob search failed: ${e}`)),
        ),
    };
  }),
);
